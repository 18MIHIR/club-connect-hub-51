import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EventDetailModal } from '@/components/EventDetailModal';

export const NewAdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);

    const { data: eventsData } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    setEvents(eventsData || []);

    if (eventsData && eventsData.length > 0) {
      const eventIds = eventsData.map(e => e.id);
      const { data: regsData } = await supabase
        .from('registrations')
        .select('*, profiles(name)')
        .in('event_id', eventIds);

      setRegistrations(regsData || []);
    }

    setLoading(false);
  };

  const handleApprove = async (eventId: string) => {
    const { error } = await supabase
      .from('events')
      .update({ status: 'approved' })
      .eq('id', eventId);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Event Approved',
        description: 'The event has been approved successfully.',
      });
      setModalOpen(false);
      fetchData();
    }
  };

  const handleReject = async (eventId: string) => {
    const { error } = await supabase
      .from('events')
      .update({ status: 'rejected' })
      .eq('id', eventId);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Event Rejected',
        description: 'The event has been rejected.',
      });
      setModalOpen(false);
      fetchData();
    }
  };

  const getEventRegistrations = (eventId: string) => {
    return registrations.filter(r => r.event_id === eventId);
  };

  const pendingEvents = events.filter(e => e.status === 'pending');
  const approvedEvents = events.filter(e => e.status === 'approved');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingEvents.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Approved Events</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedEvents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registrations.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Review and approve/reject event submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading events...</p>
            ) : pendingEvents.length === 0 ? (
              <p className="text-muted-foreground">No pending approvals</p>
            ) : (
              <div className="space-y-4">
                {pendingEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          By {event.conducting_body} • {new Date(event.start_date).toLocaleDateString()}
                        </p>
                        <Badge className="mt-2" variant="secondary">Pending</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedEvent(event);
                            setModalOpen(true);
                          }}
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(event.id)}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleReject(event.id)}
                        >
                          <XCircle className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Events</CardTitle>
            <CardDescription>View all events and their registrations</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading events...</p>
            ) : events.length === 0 ? (
              <p className="text-muted-foreground">No events yet</p>
            ) : (
              <div className="space-y-4">
                {events.map((event) => {
                  const eventRegs = getEventRegistrations(event.id);
                  return (
                    <div key={event.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.start_date).toLocaleDateString()} • {eventRegs.length} registered
                          </p>
                          <Badge className="mt-2" variant={
                            event.status === 'approved' ? 'default' : 
                            event.status === 'rejected' ? 'destructive' : 'secondary'
                          }>
                            {event.status}
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedEvent(event);
                            setModalOpen(true);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                      {eventRegs.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm font-medium mb-2">Registered Students ({eventRegs.length}):</p>
                          <div className="flex flex-wrap gap-2">
                            {eventRegs.slice(0, 10).map((reg: any) => (
                              <Badge key={reg.id} variant="secondary">
                                {reg.profiles?.name || 'Unknown'}
                              </Badge>
                            ))}
                            {eventRegs.length > 10 && (
                              <Badge variant="outline">+{eventRegs.length - 10} more</Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <EventDetailModal
        event={selectedEvent}
        open={modalOpen}
        onOpenChange={setModalOpen}
        showActions={selectedEvent?.status === 'pending'}
        onApprove={() => selectedEvent && handleApprove(selectedEvent.id)}
        onReject={() => selectedEvent && handleReject(selectedEvent.id)}
        registrations={selectedEvent ? getEventRegistrations(selectedEvent.id) : []}
      />
    </div>
  );
};

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Users, BarChart } from 'lucide-react';
import { EventDetailModal } from '@/components/EventDetailModal';

export const NewOrganizerDashboard = () => {
  const { user } = useAuth();
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
      .eq('organizer_id', user?.id)
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

  const getEventRegistrations = (eventId: string) => {
    return registrations.filter(r => r.event_id === eventId);
  };

  const totalRegistrations = registrations.length;
  const pendingApprovals = events.filter(e => e.status === 'pending').length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
          <Button asChild>
            <Link to="/create-event">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
              <p className="text-xs text-muted-foreground">
                {events.filter(e => e.status === 'approved').length} approved
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRegistrations}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Registrations</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {events.length > 0 ? Math.round(totalRegistrations / events.length) : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Events</CardTitle>
            <CardDescription>Manage your events and view registrations</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading events...</p>
            ) : events.length === 0 ? (
              <p className="text-muted-foreground">No events created yet</p>
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
        registrations={selectedEvent ? getEventRegistrations(selectedEvent.id) : []}
      />
    </div>
  );
};

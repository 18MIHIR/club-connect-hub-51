import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EventDetailModal } from '@/components/EventDetailModal';

export const NewStudentDashboard = () => {
  const { user, profile } = useAuth();
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

    // Fetch approved events
    const { data: eventsData } = await supabase
      .from('events')
      .select('*')
      .in('status', ['approved', 'published'])
      .order('start_date', { ascending: true });

    // Fetch user's registrations
    const { data: regsData } = await supabase
      .from('registrations')
      .select('*, events(*)')
      .eq('user_id', user?.id);

    setEvents(eventsData || []);
    setRegistrations(regsData || []);
    setLoading(false);
  };

  const handleRegister = async (eventId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('registrations')
      .insert({
        event_id: eventId,
        user_id: user.id,
        status: 'registered',
      });

    if (error) {
      toast({
        title: 'Registration Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success!',
        description: 'You have been registered for this event.',
      });
      fetchData();
    }
  };

  const isRegistered = (eventId: string) => {
    return registrations.some(r => r.event_id === eventId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Available Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Registered Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registrations.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {events.filter(e => new Date(e.start_date) > new Date()).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>My Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            {registrations.length === 0 ? (
              <p className="text-muted-foreground">No registrations yet</p>
            ) : (
              <div className="space-y-4">
                {registrations.map((reg) => (
                  <div key={reg.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{reg.events.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(reg.events.start_date).toLocaleDateString()}
                        </p>
                        <Badge className="mt-2" variant="secondary">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Registered
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedEvent(reg.events);
                          setModalOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Events</CardTitle>
            <CardDescription>Browse and register for upcoming events</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading events...</p>
            ) : events.length === 0 ? (
              <p className="text-muted-foreground">No events available</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {events.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(event.start_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelectedEvent(event);
                          setModalOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                      {!isRegistered(event.id) ? (
                        <Button size="sm" className="flex-1" onClick={() => handleRegister(event.id)}>
                          Register
                        </Button>
                      ) : (
                        <Button size="sm" variant="secondary" className="flex-1" disabled>
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Registered
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <EventDetailModal
        event={selectedEvent}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

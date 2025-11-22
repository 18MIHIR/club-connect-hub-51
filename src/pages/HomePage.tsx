import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Users, Trophy, Bell } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to FusionFest
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Your one-stop platform for managing and participating in college events, 
            contests, and club activities
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/events">Browse Events</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-secondary">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Event Management</h3>
              <p className="text-muted-foreground">
                Create, manage, and track all college events in one place
              </p>
            </Card>
            <Card className="p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Club Activities</h3>
              <p className="text-muted-foreground">
                Organize and promote club activities across campus
              </p>
            </Card>
            <Card className="p-6">
              <Trophy className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Contests & Competitions</h3>
              <p className="text-muted-foreground">
                Host and participate in various college competitions
              </p>
            </Card>
            <Card className="p-6">
              <Bell className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground">
                Get notifications for upcoming events and deadlines
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join FusionFest today and never miss an event again
          </p>
          <Button asChild size="lg">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

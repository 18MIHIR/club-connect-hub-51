import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Users, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrganizerDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
          <Button asChild>
            <Link to="/organizer/create-event">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">197</div>
              <p className="text-xs text-muted-foreground">+23 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Last 3 events</p>
            </CardContent>
          </Card>
        </div>

        {/* My Events */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>My Events</CardTitle>
            <CardDescription>Manage your club's events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">LNCT Carnival 2025</h3>
                    <p className="text-sm text-muted-foreground">Dec 10, 2025 • 45/100 registered</p>
                    <span className="inline-block mt-1 text-xs bg-success/10 text-success px-2 py-1 rounded">Published</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm font-medium mb-2">Registered Students (Sample):</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-secondary px-2 py-1 rounded">Arjun Sharma</span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">Priya Gupta</span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">Rahul Verma</span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">Anita Singh</span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">Vikram Patel</span>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">CodeFiesta LNCT</h3>
                    <p className="text-sm text-muted-foreground">Dec 15, 2025 • 0/50 registered</p>
                    <span className="inline-block mt-1 text-xs bg-warning/10 text-warning px-2 py-1 rounded">Pending Approval</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-muted-foreground">No registrations yet</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button asChild className="h-20">
                <Link to="/organizer/create-event">Create New Event</Link>
              </Button>
              <Button asChild variant="outline" className="h-20">
                <Link to="/organizer/registrations">View Registrations</Link>
              </Button>
              <Button asChild variant="outline" className="h-20">
                <Link to="/organizer/analytics">Event Analytics</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

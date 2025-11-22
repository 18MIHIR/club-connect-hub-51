import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Building, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+45 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">15 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Clubs</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">2 pending verification</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Requires action</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Events and clubs awaiting your review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Hackathon Spring 2024</h3>
                  <p className="text-sm text-muted-foreground">by Computer Science Club</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-destructive">Reject</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Photography Club</h3>
                  <p className="text-sm text-muted-foreground">New club registration</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-destructive">Reject</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button asChild className="h-20">
                <Link to="/admin/users">Manage Users</Link>
              </Button>
              <Button asChild className="h-20">
                <Link to="/admin/clubs">Manage Clubs</Link>
              </Button>
              <Button asChild className="h-20">
                <Link to="/admin/events">Manage Events</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, FileText } from 'lucide-react';

export const FacultyDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Faculty Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Events Reviewed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Reviews */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Events Pending Review</CardTitle>
            <CardDescription>Academic events requiring faculty approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">National Seminar on AI</h3>
                  <p className="text-sm text-muted-foreground">Dept. of Computer Science • Mar 25, 2024</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline" className="text-destructive">Reject</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Project Expo 2024</h3>
                  <p className="text-sm text-muted-foreground">Engineering Dept. • Apr 15, 2024</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline" className="text-destructive">Reject</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Approved Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Approved Events</CardTitle>
            <CardDescription>Events you've approved this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Tech Symposium 2024</h3>
                  <p className="text-sm text-muted-foreground">Computer Science Club • Feb 15, 2024</p>
                </div>
                <span className="text-sm text-success">Approved</span>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Workshop on IoT</h3>
                  <p className="text-sm text-muted-foreground">Electronics Club • Feb 28, 2024</p>
                </div>
                <span className="text-sm text-success">Approved</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

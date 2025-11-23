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
            <CardDescription>Events requiring faculty approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">CodeFiesta LNCT</h3>
                    <p className="text-sm text-muted-foreground">Dec 15, 2025 • E-cell LNCTS</p>
                    <p className="text-xs text-muted-foreground mt-1">Venue: LNCTS S21 Seminar Hall</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-destructive">Reject</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm font-medium mb-2">Expected Participants:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-secondary px-2 py-1 rounded">Karan Joshi</span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">Neha Mishra</span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">Amit Dubey</span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">Sanjay Tiwari</span>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">LNCT Debate Championship</h3>
                    <p className="text-sm text-muted-foreground">Dec 20, 2025 • Orators Club</p>
                    <p className="text-xs text-muted-foreground mt-1">Venue: Aryabhatt Auditorium</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-destructive">Reject</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm font-medium mb-2">Expected Participants:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-secondary px-2 py-1 rounded">Rohan Kumar</span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">Divya Rao</span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">Priya Gupta</span>
                  </div>
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
                  <h3 className="font-semibold">LNCT Carnival 2025</h3>
                  <p className="text-sm text-muted-foreground">Dec 10, 2025 • Aryabhatt Auditorium</p>
                </div>
                <span className="text-sm text-success">Approved</span>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">LNCT Olympics</h3>
                  <p className="text-sm text-muted-foreground">Dec 22, 2025 • LNCT Sports Complex</p>
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

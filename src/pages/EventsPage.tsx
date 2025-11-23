import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCollege } from '@/context/CollegeContext';

// Mock data
const mockEvents = [
  {
    id: '1',
    title: 'LNCT Carnival',
    description: 'Annual cultural carnival with games, performances, and exhibitions',
    category: 'Cultural',
    startDate: '2025-12-15',
    location: 'Aryabhatt Auditorium',
    currentParticipants: 450,
    maxParticipants: 600,
    clubName: 'Cultural Committee',
    college: 'LNCT Main',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
  },
  {
    id: '2',
    title: 'LnUniverse Tech Fest',
    description: 'Inter-college technical fest showcasing innovations and projects',
    category: 'Technical',
    startDate: '2025-12-20',
    location: 'LNCTS S21 Seminar Hall',
    currentParticipants: 320,
    maxParticipants: 400,
    clubName: 'Tech Club',
    college: 'LNCT & S',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
  },
  {
    id: '3',
    title: 'LNCT Olympics',
    description: 'Annual sports meet with various indoor and outdoor competitions',
    category: 'Sports',
    startDate: '2025-12-08',
    location: 'Sports Complex',
    currentParticipants: 550,
    maxParticipants: 700,
    clubName: 'Sports Club',
    college: 'LNCT Main',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
  },
  {
    id: '4',
    title: 'CodeFiesta LNCT',
    description: '24-hour coding marathon and hackathon',
    category: 'Technical',
    startDate: '2025-12-12',
    location: 'LNCTS T28 Seminar Hall',
    currentParticipants: 180,
    maxParticipants: 200,
    clubName: 'Coding Club',
    college: 'LNCT & S',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
  },
  {
    id: '5',
    title: 'LNCT Talent Show',
    description: 'Showcase your talent in singing, dancing, and performing arts',
    category: 'Cultural',
    startDate: '2025-12-18',
    location: 'Aryabhatt Auditorium',
    currentParticipants: 280,
    maxParticipants: 350,
    clubName: 'Cultural Committee',
    college: 'LNCT Main',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400',
  },
  {
    id: '6',
    title: 'E-Summit LNCT',
    description: 'Entrepreneurship summit with startup pitches and workshops',
    category: 'Technical',
    startDate: '2025-12-22',
    location: 'LNCTE Seminar Hall',
    currentParticipants: 220,
    maxParticipants: 300,
    clubName: 'E-Cell LNCTS',
    college: 'LNCTE',
    imageUrl: 'https://images.unsplash.com/photo-1559223607-a43c990d63e0?w=400',
  },
  {
    id: '7',
    title: 'LNCT Debate Championship',
    description: 'Inter-college debate competition on contemporary topics',
    category: 'Literary',
    startDate: '2025-12-10',
    location: 'LNCTS S21 Seminar Hall',
    currentParticipants: 95,
    maxParticipants: 120,
    clubName: 'Debate Club',
    college: 'LNCT & S',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400',
  },
];

export const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedCollege } = useCollege();

  const filteredEvents = mockEvents
    .filter(event => event.college === selectedCollege)
    .filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Events - {selectedCollege}</h1>
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <Card key={event.id}>
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <Badge>{event.category}</Badge>
                </div>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(event.startDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  {event.currentParticipants}/{event.maxParticipants} registered
                </div>
                <p className="text-sm text-muted-foreground">by {event.clubName}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/events/${event.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

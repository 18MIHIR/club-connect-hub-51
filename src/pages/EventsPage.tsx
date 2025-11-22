import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const mockEvents = [
  {
    id: '1',
    title: 'Tech Symposium 2024',
    description: 'Annual technical symposium featuring workshops, paper presentations, and competitions',
    category: 'Technical',
    startDate: '2024-02-15',
    location: 'Main Auditorium',
    currentParticipants: 45,
    maxParticipants: 100,
    clubName: 'Computer Science Club',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
  },
  {
    id: '2',
    title: 'Cultural Night',
    description: 'Celebrate diversity through music, dance, and cultural performances',
    category: 'Cultural',
    startDate: '2024-02-20',
    location: 'Open Air Theatre',
    currentParticipants: 120,
    maxParticipants: 200,
    clubName: 'Cultural Committee',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
  },
  {
    id: '3',
    title: 'Debate Competition',
    description: 'Inter-college debate competition on contemporary issues',
    category: 'Literary',
    startDate: '2024-02-18',
    location: 'Seminar Hall',
    currentParticipants: 32,
    maxParticipants: 50,
    clubName: 'Literary Society',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400',
  },
];

export const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = mockEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Events</h1>
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

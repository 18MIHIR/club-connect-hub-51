import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, MessageCircle, Briefcase, Trophy, Camera, Mic, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCollege } from '@/context/CollegeContext';

const allClubs = [
  {
    id: 1,
    name: 'Orators Club',
    icon: Mic,
    description: 'Develop public speaking and communication skills through debates, speeches, and presentations.',
    members: 45,
    category: 'Cultural',
    college: 'LNCT Main',
    upcomingEvents: [
      { name: 'Public Speaking Workshop', date: '2025-12-05' },
      { name: 'Inter-College Debate', date: '2025-12-12' }
    ]
  },
  {
    id: 2,
    name: 'E-Cell LNCTS',
    icon: Briefcase,
    description: 'Entrepreneurship Cell fostering innovation and startup culture among LNCT students.',
    members: 67,
    category: 'Technical',
    college: 'LNCT & S',
    upcomingEvents: [
      { name: 'Startup Pitch Competition', date: '2025-12-08' },
      { name: 'Business Plan Workshop', date: '2025-12-15' }
    ]
  },
  {
    id: 3,
    name: 'Sports Club',
    icon: Trophy,
    description: 'Promoting physical fitness and competitive sports across various disciplines.',
    members: 120,
    category: 'Sports',
    college: 'LNCT Main',
    upcomingEvents: [
      { name: 'LNCT Olympics', date: '2025-12-08' },
      { name: 'Basketball Tournament', date: '2025-12-18' }
    ]
  },
  {
    id: 4,
    name: 'Photography Club',
    icon: Camera,
    description: 'Capturing moments and developing photography skills through workshops and photo walks.',
    members: 38,
    category: 'Cultural',
    college: 'LNCT Main',
    upcomingEvents: [
      { name: 'Campus Photo Walk', date: '2025-12-07' },
      { name: 'Photography Exhibition', date: '2025-12-20' }
    ]
  },
  {
    id: 5,
    name: 'Debate Club',
    icon: MessageCircle,
    description: 'Enhancing critical thinking and argumentation skills through structured debates.',
    members: 52,
    category: 'Cultural',
    college: 'LNCT & S',
    upcomingEvents: [
      { name: 'Parliamentary Debate', date: '2025-12-06' },
      { name: 'MUN Conference', date: '2025-12-14' }
    ]
  },
  {
    id: 6,
    name: 'Coding Club',
    icon: Code,
    description: 'Building coding skills through workshops, competitions, and collaborative projects.',
    members: 85,
    category: 'Technical',
    college: 'LNCT & S',
    upcomingEvents: [
      { name: 'CodeFiesta LNCT', date: '2025-12-12' },
      { name: 'Web Development Workshop', date: '2025-12-16' }
    ]
  },
  {
    id: 7,
    name: 'Robotics Club',
    icon: Trophy,
    description: 'Design, build, and program robots for competitions and innovation challenges.',
    members: 42,
    category: 'Technical',
    college: 'LNCTE',
    upcomingEvents: [
      { name: 'Robo Wars Competition', date: '2025-12-19' },
      { name: 'Arduino Workshop', date: '2025-12-22' }
    ]
  },
  {
    id: 8,
    name: 'Music Club',
    icon: Mic,
    description: 'Explore various music genres through performances, jam sessions, and band formation.',
    members: 63,
    category: 'Cultural',
    college: 'LNCTE',
    upcomingEvents: [
      { name: 'LNCT Talent Show', date: '2025-12-18' },
      { name: 'Band Night', date: '2025-12-25' }
    ]
  }
];

export const ClubsPage = () => {
  const { selectedCollege } = useCollege();

  const clubs = allClubs.filter(club => club.college === selectedCollege);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Clubs - {selectedCollege}</h1>
          <p className="text-muted-foreground">
            Explore and join various clubs at {selectedCollege}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {clubs.map((club) => {
            const IconComponent = club.icon;
            return (
              <Card key={club.id} className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{club.name}</h3>
                      <Badge variant="secondary">{club.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {club.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{club.members} members</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Upcoming Events
                  </h4>
                  <div className="space-y-2">
                    {club.upcomingEvents.map((event, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-foreground">{event.name}</span>
                        <span className="text-muted-foreground">{event.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Join Club
                </Button>
              </Card>
            );
          })}
        </div>

        <Card className="p-6 mt-8 bg-muted">
          <h2 className="text-xl font-semibold mb-2">Want to Start a New Club?</h2>
          <p className="text-muted-foreground mb-4">
            Have an idea for a new club? Contact the student affairs office to get started.
          </p>
          <Button asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
};

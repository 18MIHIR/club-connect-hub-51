export type UserRole = 'student' | 'organizer' | 'admin' | 'faculty';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  profileImage?: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  logo?: string;
  category: string;
  organizerId: string;
  verified: boolean;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  clubId: string;
  clubName?: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl?: string;
  registrationDeadline: string;
  maxParticipants?: number;
  currentParticipants: number;
  ticketPrice?: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'published' | 'completed';
  organizerId: string;
  tags?: string[];
  createdAt: string;
}

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: 'registered' | 'checked-in' | 'cancelled';
  ticketCode: string;
  registeredAt: string;
  paymentStatus?: 'pending' | 'completed' | 'failed';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'event' | 'registration' | 'reminder' | 'approval' | 'general';
  read: boolean;
  eventId?: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface DashboardStats {
  totalEvents?: number;
  upcomingEvents?: number;
  totalRegistrations?: number;
  totalClubs?: number;
  totalUsers?: number;
  pendingApprovals?: number;
}

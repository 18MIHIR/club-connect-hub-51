import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Award, CheckCircle, XCircle } from 'lucide-react';

interface EventDetailModalProps {
  event: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove?: () => void;
  onReject?: () => void;
  showActions?: boolean;
  registrations?: any[];
}

export const EventDetailModal = ({ 
  event, 
  open, 
  onOpenChange, 
  onApprove, 
  onReject,
  showActions = false,
  registrations = []
}: EventDetailModalProps) => {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{event.title}</DialogTitle>
          <DialogDescription>{event.conducting_body}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {event.demo_poster_url && (
            <div className="w-full h-64 bg-muted rounded-lg overflow-hidden">
              <img 
                src={event.demo_poster_url} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div>
            <h3 className="font-semibold text-lg mb-2">Event Description</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{event.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Date & Time</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.start_date).toLocaleString()} - {new Date(event.end_date).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Venue</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Participants</p>
                <p className="text-sm text-muted-foreground">
                  {event.max_participants ? `Max ${event.max_participants}` : 'Unlimited'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Award className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Certificate</p>
                <p className="text-sm text-muted-foreground">
                  {event.certification_provided 
                    ? `${event.certification_type || 'Yes'}` 
                    : 'Not provided'}
                </p>
              </div>
            </div>
          </div>

          {event.eligibility_criteria && event.eligibility_criteria.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Eligibility Criteria</h3>
              <ul className="space-y-1">
                {event.eligibility_criteria.map((criteria: string, index: number) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {registrations.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Registered Participants ({registrations.length})</h3>
              <div className="flex flex-wrap gap-2">
                {registrations.map((reg: any) => (
                  <Badge key={reg.id} variant="secondary">
                    {reg.profiles?.name || 'Unknown'}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <Badge variant={event.status === 'approved' ? 'default' : event.status === 'rejected' ? 'destructive' : 'secondary'}>
              {event.status}
            </Badge>
          </div>

          {showActions && event.status === 'pending' && (
            <div className="flex gap-4 pt-4 border-t">
              <Button onClick={onApprove} className="flex-1" size="lg">
                <CheckCircle className="mr-2 h-5 w-5" />
                Approve Event
              </Button>
              <Button onClick={onReject} variant="destructive" className="flex-1" size="lg">
                <XCircle className="mr-2 h-5 w-5" />
                Reject Event
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

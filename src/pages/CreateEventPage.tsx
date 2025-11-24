import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, X } from 'lucide-react';
import { useCollege } from '@/context/CollegeContext';

export const CreateEventPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedCollege } = useCollege();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    conducting_body: '',
    demo_poster_url: '',
    category: 'technical',
    start_date: '',
    end_date: '',
    location: '',
    registration_deadline: '',
    max_participants: '',
    certification_provided: false,
    certification_type: '',
  });

  const [eligibilityCriteria, setEligibilityCriteria] = useState<string[]>(['']);

  const addCriteria = () => {
    setEligibilityCriteria([...eligibilityCriteria, '']);
  };

  const removeCriteria = (index: number) => {
    setEligibilityCriteria(eligibilityCriteria.filter((_, i) => i !== index));
  };

  const updateCriteria = (index: number, value: string) => {
    const updated = [...eligibilityCriteria];
    updated[index] = value;
    setEligibilityCriteria(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    const { error } = await supabase.from('events').insert({
      ...formData,
      college: selectedCollege,
      max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
      eligibility_criteria: eligibilityCriteria.filter(c => c.trim() !== ''),
      organizer_id: user.id,
      status: 'pending',
    });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success!',
        description: 'Event submitted for approval.',
      });
      navigate('/organizer/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
            <CardDescription>Fill in the details to submit an event for approval</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conducting_body">Conducting Body *</Label>
                  <Input
                    id="conducting_body"
                    placeholder="E-Cell LNCTS, Orators Club, etc."
                    value={formData.conducting_body}
                    onChange={(e) => setFormData({ ...formData, conducting_body: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what the event is about, core activities, objectives..."
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo_poster_url">Demo Poster URL</Label>
                <Input
                  id="demo_poster_url"
                  type="url"
                  placeholder="https://example.com/poster.jpg"
                  value={formData.demo_poster_url}
                  onChange={(e) => setFormData({ ...formData, demo_poster_url: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="seminar">Seminar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Venue *</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => setFormData({ ...formData, location: value })}
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select venue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aryabhatt Auditorium">Aryabhatt Auditorium</SelectItem>
                      <SelectItem value="LNCTS S21 Seminar Hall">LNCTS S21 Seminar Hall</SelectItem>
                      <SelectItem value="LNCTS T28 Seminar Hall">LNCTS T28 Seminar Hall</SelectItem>
                      <SelectItem value="LNCTE Seminar Hall">LNCTE Seminar Hall</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date *</Label>
                  <Input
                    id="start_date"
                    type="datetime-local"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date *</Label>
                  <Input
                    id="end_date"
                    type="datetime-local"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registration_deadline">Registration Deadline *</Label>
                  <Input
                    id="registration_deadline"
                    type="datetime-local"
                    value={formData.registration_deadline}
                    onChange={(e) => setFormData({ ...formData, registration_deadline: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max_participants">Maximum Participants (Optional)</Label>
                <Input
                  id="max_participants"
                  type="number"
                  min="1"
                  value={formData.max_participants}
                  onChange={(e) => setFormData({ ...formData, max_participants: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Eligibility Criteria</Label>
                {eligibilityCriteria.map((criteria, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="e.g., 2nd Year Only, 75% Attendance Mandatory"
                      value={criteria}
                      onChange={(e) => updateCriteria(index, e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeCriteria(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addCriteria}>
                  <Plus className="h-4 w-4 mr-2" /> Add Criteria
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="certification_provided"
                    checked={formData.certification_provided}
                    onChange={(e) => setFormData({ ...formData, certification_provided: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="certification_provided">Certificate of Participation Provided</Label>
                </div>

                {formData.certification_provided && (
                  <div className="space-y-2">
                    <Label htmlFor="certification_type">Certificate Type</Label>
                    <Select
                      value={formData.certification_type}
                      onValueChange={(value) => setFormData({ ...formData, certification_type: value })}
                    >
                      <SelectTrigger id="certification_type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="digital">Digital</SelectItem>
                        <SelectItem value="physical">Physical</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Submitting...' : 'Submit for Approval'}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

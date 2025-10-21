import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { toast } from "sonner@2.0.3";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  experienceTitle: string;
}

export function BookingDialog({ isOpen, onClose, experienceTitle }: BookingDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    date: "",
    guests: "",
    specialRequests: "",
    termsAccepted: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-131307ce/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            experienceTitle,
            fullName: formData.fullName,
            email: formData.email,
            date: formData.date,
            guests: formData.guests,
            specialRequests: formData.specialRequests
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Booking submitted successfully!");
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          date: "",
          guests: "",
          specialRequests: "",
          termsAccepted: false
        });
        onClose();
      } else {
        toast.error(result.error || "Failed to submit booking");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("An error occurred while submitting your booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border rounded-lg max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col gap-6 p-6">
          <DialogHeader>
            <DialogTitle className="text-foreground">{experienceTitle}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Complete your booking details below
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
              <Input 
                id="fullName"
                placeholder="Enter your name"
                className="bg-input-background border-border text-foreground placeholder:text-muted-foreground rounded-lg"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-foreground">Email Address</Label>
              <Input 
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="bg-input-background border-border text-foreground placeholder:text-muted-foreground rounded-lg"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="date" className="text-foreground">Preferred Date</Label>
              <div className="relative">
                <Input 
                  id="date"
                  type="date"
                  className="bg-input-background border-border text-foreground rounded-lg"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="guests" className="text-foreground">Number of Guests</Label>
              <Select 
                value={formData.guests}
                onValueChange={(value) => setFormData({ ...formData, guests: value })}
              >
                <SelectTrigger className="bg-input-background border-border text-foreground rounded-lg">
                  <SelectValue placeholder="Select number of guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                  <SelectItem value="5">5+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="specialRequests" className="text-foreground">Special Requests</Label>
              <Textarea 
                id="specialRequests"
                placeholder="Any dietary restrictions, preferences, or special arrangements..."
                className="bg-input-background border-border text-foreground placeholder:text-muted-foreground rounded-lg min-h-[100px] resize-none"
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="terms" 
                  className="mt-1"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked as boolean })}
                />
                <div className="flex flex-col gap-1">
                  <Label htmlFor="terms" className="text-foreground cursor-pointer">
                    I accept the terms and conditions
                  </Label>
                  <p className="text-sm text-muted-foreground underline cursor-pointer">
                    Read our Terms & Conditions
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                type="submit"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

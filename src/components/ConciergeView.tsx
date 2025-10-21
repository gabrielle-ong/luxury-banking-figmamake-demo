import { motion } from "motion/react";
import { ArrowLeft, Star, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { LifestyleCard } from "./LifestyleCard";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { BookingDialog } from "./BookingDialog";
import { useState } from "react";

interface ConciergeViewProps {
  onBack: () => void;
}

export function ConciergeView({ onBack }: ConciergeViewProps) {
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState("");
  const lifestyleOffers = [
    {
      title: "Le Normandie by Alain Roux",
      description: "Michelin-starred French cuisine with breathtaking river views at Mandarin Oriental",
      category: "Fine Dining",
      image: "https://images.unsplash.com/photo-1757096028963-b22ffea47ed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjAzNzg0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      exclusiveOffer: "25% Off"
    },
    {
      title: "Luxury Yacht Charter",
      description: "Private yacht experience in Phuket with premium catering and personal crew",
      category: "Travel & Leisure",
      image: "https://images.unsplash.com/photo-1603377817563-5ccd33e57d05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMGNoYXJ0ZXJ8ZW58MXx8fHwxNzYwMzc4NDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      exclusiveOffer: "Exclusive"
    },
    {
      title: "Banyan Tree Spa Retreat",
      description: "5-day wellness package with traditional Thai treatments and meditation sessions",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1667235195726-a7c440bca9bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjAzNTE0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      exclusiveOffer: "20% Off"
    },
    {
      title: "Private Jet to Maldives",
      description: "Seamless luxury travel with private jet service and resort arrangements",
      category: "Travel & Leisure",
      image: "https://images.unsplash.com/photo-1635649477735-1b44cb397034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwamV0JTIwdHJhdmVsfGVufDF8fHx8MTc2MDM3ODQ2NHww&ixlib=rb-4.1.0&q=80&w=1080",
      exclusiveOffer: "Exclusive"
    },
    {
      title: "Alpine Golf Resort",
      description: "Championship golf course with luxury accommodations in Khao Yai",
      category: "Golf & Sport",
      image: "https://images.unsplash.com/photo-1733776721836-10cc2c7a38e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnb2xmJTIwcmVzb3J0fGVufDF8fHx8MTc2MDI5OTc0OHww&ixlib=rb-4.1.0&q=80&w=1080",
      exclusiveOffer: "15% Off"
    }
  ];

  const categories = [
    "All", "Fine Dining", "Travel & Leisure", "Wellness", "Golf & Sport", "Entertainment"
  ];

  const tierBenefits = [
    "Priority restaurant reservations",
    "Complimentary airport transfers",
    "Exclusive event invitations",
    "Personal lifestyle concierge",
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F1] pb-20">
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] text-white p-6 pb-12">
        <Button 
          variant="ghost" 
          className="text-white hover:bg-white/10 mb-4 -ml-2"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Lifestyle Concierge
          </h1>
          <p className="text-gray-300">Exclusive privileges & experiences</p>
        </motion.div>
      </div>

      <div className="px-6 -mt-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#C6A664] to-[#B69654] rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl mb-1">Platinum Member</h3>
              <p className="text-white/90 text-sm">Your Banking Privileges Tier</p>
            </div>
            <Badge className="bg-white/20 text-white border-0">
              <Star className="w-3 h-3 mr-1 fill-white" />
              Elite
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {tierBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white/90">{benefit}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-2">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={index === 0 ? "default" : "outline"}
                  className={index === 0 ? "bg-[#1A1A1A] whitespace-nowrap" : "whitespace-nowrap border-[#C6A664]"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl text-[#1A1A1A] mb-4">Featured Experiences</h3>
          <div className="w-full overflow-x-auto scrollbar-hide -mx-6 px-6">
            <div className="flex gap-4 pb-4">
              {lifestyleOffers.map((offer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <LifestyleCard 
                    {...offer}
                    onBook={() => {
                      setSelectedExperience(offer.title);
                      setIsBookingDialogOpen(true);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-border"
        >
          <h3 className="text-xl text-[#1A1A1A] mb-4">How It Works</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#C6A664] text-white flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-[#1A1A1A] mb-1">Browse & Select</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Explore curated luxury experiences tailored to your preferences
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#C6A664] text-white flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-[#1A1A1A] mb-1">Book Instantly</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Your dedicated concierge handles all arrangements seamlessly
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#C6A664] text-white flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-[#1A1A1A] mb-1">Enjoy Premium Service</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Experience VIP treatment with exclusive member benefits
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <BookingDialog 
        isOpen={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
        experienceTitle={selectedExperience}
      />
    </div>
  );
}

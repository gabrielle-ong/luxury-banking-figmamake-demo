import { motion } from "motion/react";
import { ArrowLeft, MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { InteractiveMap } from "./InteractiveMap";

interface BankMapViewProps {
  onBack: () => void;
}

export function BankMapView({ onBack }: BankMapViewProps) {
  const locations = [
    {
      name: "Private Banking Lounge - Silom",
      address: "191 Silom Road, Bangrak, Bangkok 10500",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM",
      phone: "+66 2 234 5678",
      services: ["Wealth Advisory", "Concierge", "Meeting Rooms"],
      coordinates: { lat: 13.7245, lng: 100.5322 }
    },
    {
      name: "Private Banking Center - Sukhumvit",
      address: "98 Sukhumvit Road, Watthana, Bangkok 10110",
      hours: "Mon-Fri: 9:00 AM - 7:00 PM, Sat: 10:00 AM - 4:00 PM",
      phone: "+66 2 345 6789",
      services: ["Portfolio Review", "Estate Planning", "Safe Deposit"],
      coordinates: { lat: 13.7367, lng: 100.5583 }
    },
    {
      name: "Exclusive Lounge - Sathon",
      address: "89 North Sathorn Road, Silom, Bangkok 10500",
      hours: "Mon-Sat: 8:30 AM - 6:30 PM",
      phone: "+66 2 456 7890",
      services: ["Private Consultations", "Investment Advisory"],
      coordinates: { lat: 13.7227, lng: 100.5273 }
    }
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
            Private Bank Locations
          </h1>
          <p className="text-gray-300">Find our exclusive banking centers</p>
        </motion.div>
      </div>

      <div className="px-6 -mt-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg border border-border p-4"
        >
          <InteractiveMap locations={locations} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl text-[#1A1A1A] mb-4">Our Locations</h3>
          <div className="space-y-4">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="p-5 border-[#C6A664]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#C6A664] flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-[#1A1A1A] mb-1">{location.name}</h4>
                        <p className="text-sm text-[#6B6B6B] mb-2">{location.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                      <Clock className="w-4 h-4" />
                      <span>{location.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                      <Phone className="w-4 h-4" />
                      <span>{location.phone}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-[#6B6B6B] mb-2">Available Services</p>
                    <div className="flex flex-wrap gap-2">
                      {location.services.map((service, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-[#F8F5F1]">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="border-[#C6A664]">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button size="sm" className="bg-[#1A1A1A]">
                      <Navigation className="w-4 h-4 mr-2" />
                      Directions
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-[#1F6652] to-[#155243] rounded-2xl p-6 text-white"
        >
          <h3 className="text-xl mb-2">Need Assistance?</h3>
          <p className="text-white/90 mb-4">
            Our concierge team is available 24/7 to help you find the nearest location or arrange a private consultation.
          </p>
          <Button className="bg-white text-[#1F6652] hover:bg-gray-100">
            Contact Concierge
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

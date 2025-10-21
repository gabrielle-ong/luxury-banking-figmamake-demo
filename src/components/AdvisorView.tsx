import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { AdvisorCard } from "./AdvisorCard";

interface AdvisorViewProps {
  onBack: () => void;
}

export function AdvisorView({ onBack }: AdvisorViewProps) {
  const advisors = [
    {
      name: "Khun Surasak Wisetphan",
      title: "Senior Wealth Advisor",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Surasak",
      isOnline: true,
      specialties: ["Portfolio Management", "Tax Planning", "Estate Planning"],
      yearsOfExperience: 15
    },
    {
      name: "Khun Nanticha Srisawat",
      title: "Private Banking Specialist",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nanticha",
      isOnline: true,
      specialties: ["Investment Advisory", "Offshore Services", "Family Wealth"],
      yearsOfExperience: 12
    },
    {
      name: "Khun Apirak Thongchai",
      title: "Senior Investment Advisor",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Apirak",
      isOnline: false,
      specialties: ["Alternative Investments", "Risk Management", "Asset Allocation"],
      yearsOfExperience: 18
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
            Your Advisors
          </h1>
          <p className="text-gray-300">Connect with your dedicated wealth team</p>
        </motion.div>
      </div>

      <div className="px-6 -mt-6 space-y-4">
        {advisors.map((advisor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AdvisorCard {...advisor} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Shield, Crown } from "lucide-react";

interface OnboardingViewProps {
  onComplete: () => void;
}

export function OnboardingView({ onComplete }: OnboardingViewProps) {
  const [step, setStep] = useState(0);

  const screens = [
    {
      icon: <Crown className="w-16 h-16 text-[#C6A664]" />,
      title: "Welcome to Private Banking",
      subtitle: "Excellence in wealth management for distinguished clients",
      description: "Experience personalized financial guidance with dedicated advisors committed to your prosperity."
    },
    {
      icon: <Sparkles className="w-16 h-16 text-[#C6A664]" />,
      title: "Holistic Wealth Services",
      subtitle: "Beyond banking, a lifestyle partnership",
      description: "Access exclusive concierge services, lifestyle privileges, and bespoke financial solutions."
    },
    {
      icon: <Shield className="w-16 h-16 text-[#C6A664]" />,
      title: "Your Trusted Advisor",
      subtitle: "Dedicated expertise at your service",
      description: "Connect with experienced wealth advisors who understand your unique financial goals and aspirations."
    }
  ];

  const handleNext = () => {
    if (step < screens.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F5F1] to-[#E8E5E1] flex flex-col items-center justify-center p-6">
      <div className="absolute top-6 right-6">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground hover:bg-transparent"
          onClick={onComplete}
        >
          Skip
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-8 flex justify-center"
          >
            {screens[step].icon}
          </motion.div>

          <h1 className="text-3xl text-[#1A1A1A] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            {screens[step].title}
          </h1>
          
          <p className="text-lg text-[#C6A664] mb-4">
            {screens[step].subtitle}
          </p>
          
          <p className="text-[#6B6B6B] mb-8 leading-relaxed">
            {screens[step].description}
          </p>

          <div className="flex gap-2 justify-center mb-8">
            {screens.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === step ? 'w-8 bg-[#C6A664]' : 'w-1.5 bg-[#E8E5E1]'
                }`}
              />
            ))}
          </div>

          <Button
            size="lg"
            className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white"
            onClick={handleNext}
          >
            {step < screens.length - 1 ? 'Continue' : 'Get Started'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

import { Home, TrendingUp, Users, Gift, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'wealth', label: 'Wealth', icon: TrendingUp },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'concierge', label: 'Lifestyle', icon: Gift },
    { id: 'map', label: 'Locations', icon: MapPin },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-2xl z-40">
      <div className="max-w-2xl mx-auto px-2 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#F8F5F1] rounded-xl"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <Icon 
                  className={`w-5 h-5 relative z-10 transition-colors ${
                    isActive ? 'text-[#C6A664]' : 'text-[#6B6B6B]'
                  }`}
                />
                <span 
                  className={`text-xs relative z-10 transition-colors ${
                    isActive ? 'text-[#C6A664]' : 'text-[#6B6B6B]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

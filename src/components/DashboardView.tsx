import { motion } from "motion/react";
import { ArrowUpRight, Calendar, Gift, TrendingUp } from "lucide-react";
import { WealthSummaryWidget } from "./WealthSummaryWidget";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface DashboardViewProps {
  userName: string;
  onNavigate: (view: string) => void;
}

export function DashboardView({ userName, onNavigate }: DashboardViewProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  const wealthData = [
    { name: 'Equities', value: 45000000, color: '#C6A664' },
    { name: 'Fixed Income', value: 28000000, color: '#1F6652' },
    { name: 'Real Estate', value: 35000000, color: '#8B7355' },
    { name: 'Alternative Assets', value: 17000000, color: '#D4AF37' },
  ];

  const totalWealth = wealthData.reduce((sum, item) => sum + item.value, 0);

  const quickStats = [
    { label: 'Portfolio Growth', value: '+8.4%', period: 'This Quarter', positive: true },
    { label: 'Active Goals', value: '4', period: 'In Progress' },
    { label: 'YTD Return', value: '+12.7%', period: '2025', positive: true },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F1] pb-20">
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] text-white p-6 pb-20 rounded-b-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm text-gray-300 mb-1">{greeting},</p>
          <h1 className="text-3xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            {userName}
          </h1>
          
          <Button 
            size="lg"
            className="w-full bg-[#C6A664] hover:bg-[#B69654] text-white"
            onClick={() => onNavigate('advisor')}
          >
            Talk to Your Advisor
            <ArrowUpRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>

      <div className="px-6 -mt-16 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <WealthSummaryWidget 
            totalWealth={totalWealth}
            data={wealthData}
            currency="THB"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-border">
              <p className="text-sm text-[#6B6B6B] mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl text-[#1A1A1A]">{stat.value}</p>
                {stat.positive && <TrendingUp className="w-4 h-4 text-emerald-600" />}
              </div>
              <p className="text-xs text-[#6B6B6B] mt-1">{stat.period}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl text-[#1A1A1A]">Upcoming Events</h3>
            <Badge className="bg-[#C6A664] text-white">
              Exclusive
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-[#F8F5F1] rounded-lg">
              <Calendar className="w-5 h-5 text-[#C6A664] mt-0.5" />
              <div>
                <h4 className="text-[#1A1A1A] mb-1">Private Bank Gala</h4>
                <p className="text-sm text-[#6B6B6B]">Saturday, October 18, 2025 • 7:00 PM</p>
                <p className="text-sm text-[#6B6B6B]">Mandarin Oriental Bangkok</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-[#F8F5F1] rounded-lg">
              <Gift className="w-5 h-5 text-[#C6A664] mt-0.5" />
              <div>
                <h4 className="text-[#1A1A1A] mb-1">New Lifestyle Offer</h4>
                <p className="text-sm text-[#6B6B6B]">Exclusive Banyan Tree wellness retreat - 20% off</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Button
            variant="outline"
            className="h-24 border-[#C6A664] text-[#1A1A1A] hover:bg-[#F8F5F1]"
            onClick={() => onNavigate('wealth')}
          >
            <div className="text-left">
              <h4 className="mb-1">Wealth Advisory</h4>
              <p className="text-sm text-[#6B6B6B]">View portfolio details</p>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="h-24 border-[#C6A664] text-[#1A1A1A] hover:bg-[#F8F5F1]"
            onClick={() => onNavigate('concierge')}
          >
            <div className="text-left">
              <h4 className="mb-1">Lifestyle Concierge</h4>
              <p className="text-sm text-[#6B6B6B]">Explore exclusive offers</p>
            </div>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

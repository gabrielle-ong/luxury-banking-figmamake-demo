import { motion } from "motion/react";
import { ArrowLeft, Building2, TrendingUp, DollarSign, Home, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { PortfolioItem } from "./PortfolioItem";
import { Card } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WealthAdvisoryViewProps {
  onBack: () => void;
}

export function WealthAdvisoryView({ onBack }: WealthAdvisoryViewProps) {
  const performanceData = [
    { month: 'Apr', value: 118 },
    { month: 'May', value: 122 },
    { month: 'Jun', value: 119 },
    { month: 'Jul', value: 126 },
    { month: 'Aug', value: 125 },
    { month: 'Sep', value: 130 },
    { month: 'Oct', value: 134 },
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
            Wealth Advisory
          </h1>
          <p className="text-gray-300">Comprehensive portfolio overview</p>
        </motion.div>
      </div>

      <div className="px-6 -mt-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-border"
        >
          <h3 className="text-xl text-[#1A1A1A] mb-4">Portfolio Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E5E1" />
              <XAxis dataKey="month" stroke="#6B6B6B" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6B6B6B" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid rgba(26, 26, 26, 0.08)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#C6A664" 
                strokeWidth={3}
                dot={{ fill: '#C6A664', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-2 mt-4">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <p className="text-sm text-[#6B6B6B]">+13.6% growth over 6 months</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#C6A664] to-[#B69654] rounded-2xl p-6 text-white shadow-lg"
        >
          <h3 className="text-xl mb-2">Advisor Recommendation</h3>
          <p className="text-white/90 mb-4">
            Based on current market conditions, we recommend rebalancing your offshore portfolio to increase exposure to emerging Asian markets.
          </p>
          <Button className="bg-white text-[#1A1A1A] hover:bg-gray-100">
            Schedule Wealth Session
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl text-[#1A1A1A] mb-4">Portfolio Holdings</h3>
          <div className="space-y-4">
            <PortfolioItem
              assetType="Equities"
              assetName="Global Equity Fund"
              value={45000000}
              returnPercentage={12.4}
              lastUpdate="2 hours ago"
              icon={<TrendingUp className="w-5 h-5" />}
            />
            <PortfolioItem
              assetType="Fixed Income"
              assetName="Government Bonds Portfolio"
              value={28000000}
              returnPercentage={5.2}
              lastUpdate="1 day ago"
              icon={<Building2 className="w-5 h-5" />}
            />
            <PortfolioItem
              assetType="Real Estate"
              assetName="Premium Property Fund"
              value={35000000}
              returnPercentage={8.7}
              lastUpdate="3 days ago"
              icon={<Home className="w-5 h-5" />}
            />
            <PortfolioItem
              assetType="Alternative Assets"
              assetName="Private Equity & Hedge Funds"
              value={17000000}
              returnPercentage={15.3}
              lastUpdate="1 week ago"
              icon={<Briefcase className="w-5 h-5" />}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card className="p-4 border-[#C6A664]">
            <DollarSign className="w-8 h-8 text-[#C6A664] mb-2" />
            <p className="text-sm text-[#6B6B6B] mb-1">Total Dividends</p>
            <p className="text-xl text-[#1A1A1A]">2.4M THB</p>
            <p className="text-xs text-[#6B6B6B]">This year</p>
          </Card>
          <Card className="p-4 border-[#C6A664]">
            <TrendingUp className="w-8 h-8 text-emerald-600 mb-2" />
            <p className="text-sm text-[#6B6B6B] mb-1">Annualized Return</p>
            <p className="text-xl text-[#1A1A1A]">9.8%</p>
            <p className="text-xs text-[#6B6B6B]">Since inception</p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

import { TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "./ui/badge";

interface PortfolioItemProps {
  assetType: string;
  assetName: string;
  value: number;
  returnPercentage: number;
  lastUpdate: string;
  currency?: string;
  icon?: React.ReactNode;
}

export function PortfolioItem({
  assetType,
  assetName,
  value,
  returnPercentage,
  lastUpdate,
  currency = "THB",
  icon
}: PortfolioItemProps) {
  const isPositive = returnPercentage >= 0;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-full bg-[#F8F5F1] flex items-center justify-center text-[#C6A664]">
              {icon}
            </div>
          )}
          <div>
            <p className="text-sm text-[#6B6B6B]">{assetType}</p>
            <h4 className="text-[#1A1A1A]">{assetName}</h4>
          </div>
        </div>
        <Badge 
          variant="secondary" 
          className={`${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}
        >
          {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {isPositive ? '+' : ''}{returnPercentage.toFixed(2)}%
        </Badge>
      </div>
      
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-2xl text-[#1A1A1A]">{formatCurrency(value)}</p>
          <p className="text-xs text-[#6B6B6B] mt-1">{currency}</p>
        </div>
        <p className="text-xs text-[#6B6B6B]">Updated {lastUpdate}</p>
      </div>
    </div>
  );
}

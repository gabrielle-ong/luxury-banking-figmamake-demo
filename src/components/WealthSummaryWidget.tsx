import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface WealthData {
  name: string;
  value: number;
  color: string;
}

interface WealthSummaryWidgetProps {
  totalWealth: number;
  data: WealthData[];
  currency?: string;
}

export function WealthSummaryWidget({ totalWealth, data, currency = "THB" }: WealthSummaryWidgetProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
      <h3 className="text-xl text-[#1A1A1A] mb-2">Total Net Worth</h3>
      <div className="text-3xl mb-6 text-[#1A1A1A]" style={{ fontFamily: 'Playfair Display, serif' }}>
        {formatCurrency(totalWealth)} <span className="text-lg text-[#6B6B6B]">{currency}</span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `${formatCurrency(value)} ${currency}`}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid rgba(26, 26, 26, 0.08)',
              borderRadius: '8px'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span className="text-sm text-[#1A1A1A]">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

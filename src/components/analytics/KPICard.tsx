import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  trendUp?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, trend, icon: Icon, trendUp }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <Icon className="text-blue-500" size={24} />
        {trend && (
          <span className={`text-sm ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
};
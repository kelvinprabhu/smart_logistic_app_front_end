import React from 'react';
import { BarChart2, Package, TrendingUp, Users } from 'lucide-react';
import KPICard from '../../components/analytics/KPICard';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  const kpis = [
    {
      title: 'Total Users',
      value: '156',
      trend: '+12% this month',
      icon: Users,
      trendUp: true,
    },
    {
      title: 'Active Warehouses',
      value: '8',
      trend: '+1 this week',
      icon: Package,
      trendUp: true,
    },
    {
      title: 'Pending Shipments',
      value: '47',
      trend: '-5% from last week',
      icon: TrendingUp,
      trendUp: false,
    },
    {
      title: 'System Usage',
      value: '89%',
      trend: '+7% this month',
      icon: BarChart2,
      trendUp: true,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          {/* Activity log will be implemented in the next iteration */}
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">System Health</h2>
          {/* System metrics will be implemented in the next iteration */}
        </div>
      </div>
    </div>
  );
};
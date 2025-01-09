// import React from 'react';
import { BarChart2, Package, TrendingUp, Users } from 'lucide-react';
import {KPICard} from '../components/analytics/KPICard';
import {InventoryChart} from '../components/analytics/InventoryChart';
import { ShipmentChart } from '../components/analytics/ShipmentChart';
import { WarehouseUsageChart } from '../components/analytics/WarehouseUsageChart';

const Dashboard = () => {
  const stats = [
    { title: 'Total Warehouses', value: '8', icon: Package, trend: '+2 this month', trendUp: true },
    { title: 'Active Orders', value: '245', icon: TrendingUp, trend: '+12% from last week', trendUp: true },
    { title: 'Total Users', value: '48', icon: Users, trend: '+5 this week', trendUp: true },
    { title: 'Storage Usage', value: '76%', icon: BarChart2, trend: '2% less than last month', trendUp: false },
  ];

  // Sample data for charts
  const inventoryData = {
    labels: ['Laptops', 'Phones', 'Tablets', 'Accessories'],
    current: [150, 200, 180, 300],
    minimum: [100, 150, 120, 200],
  };

  const shipmentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    delivered: [65, 75, 70, 90, 85, 95],
    pending: [30, 25, 35, 28, 32, 28],
  };

  const warehouseData = {
    labels: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
    usage: [75, 65, 80, 70],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <KPICard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <InventoryChart data={inventoryData} />
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <ShipmentChart data={shipmentData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Sample activity items */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">New shipment created</p>
                <p className="text-sm text-gray-500">Order #12345 to Los Angeles</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Low stock alert</p>
                <p className="text-sm text-gray-500">Wireless Headphones (SKU: WH-123)</p>
              </div>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <WarehouseUsageChart data={warehouseData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
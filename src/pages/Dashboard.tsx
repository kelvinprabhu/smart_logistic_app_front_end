// // import React from 'react';
// import { BarChart2, Package, TrendingUp, Users } from 'lucide-react';
// import {KPICard} from '../components/analytics/KPICard';
// import {InventoryChart} from '../components/analytics/InventoryChart';
// import { ShipmentChart } from '../components/analytics/ShipmentChart';
// import { WarehouseUsageChart } from '../components/analytics/WarehouseUsageChart';

// const Dashboard = () => {
//   const stats = [
//     { title: 'Total Warehouses', value: '8', icon: Package, trend: '+2 this month', trendUp: true },
//     { title: 'Active Orders', value: '245', icon: TrendingUp, trend: '+12% from last week', trendUp: true },
//     { title: 'Total Users', value: '48', icon: Users, trend: '+5 this week', trendUp: true },
//     { title: 'Storage Usage', value: '76%', icon: BarChart2, trend: '2% less than last month', trendUp: false },
//   ];

//   // Sample data for charts
//   const inventoryData = {
//     labels: ['Laptops', 'Phones', 'Tablets', 'Accessories'],
//     current: [150, 200, 180, 300],
//     minimum: [100, 150, 120, 200],
//   };

//   const shipmentData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     delivered: [65, 75, 70, 90, 85, 95],
//     pending: [30, 25, 35, 28, 32, 28],
//   };

//   const warehouseData = {
//     labels: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
//     usage: [75, 65, 80, 70],
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <KPICard key={index} {...stat} />
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white rounded-lg p-6 shadow-sm">
//           <InventoryChart data={inventoryData} />
//         </div>
//         <div className="bg-white rounded-lg p-6 shadow-sm">
//           <ShipmentChart data={shipmentData} />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white rounded-lg p-6 shadow-sm lg:col-span-2">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
//           <div className="space-y-4">
//             {/* Sample activity items */}
//             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//               <div>
//                 <p className="font-medium">New shipment created</p>
//                 <p className="text-sm text-gray-500">Order #12345 to Los Angeles</p>
//               </div>
//               <span className="text-sm text-gray-500">2 hours ago</span>
//             </div>
//             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//               <div>
//                 <p className="font-medium">Low stock alert</p>
//                 <p className="text-sm text-gray-500">Wireless Headphones (SKU: WH-123)</p>
//               </div>
//               <span className="text-sm text-gray-500">5 hours ago</span>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg p-6 shadow-sm">
//           <WarehouseUsageChart data={warehouseData} />
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Pie, Doughnut, Bar } from 'react-chartjs-2';
import { fetchAnalyticsData } from '../services/analyticsService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

interface OrderTrend {
  orderDate: string;
  totalOrders: number;
  totalQuantity: number;
}

interface CustomerFrequency {
  customerId: number;
  customerName: string;
  totalOrders: number;
}

interface WarehouseUtilization {
  warehouseId: number;
  warehouseLocation: string;
  warehouseCapacity: number;
  currentInventory: number;
  utilizationPercentage: number | null;
}

interface DeliveryPerformance {
  agentId: number;
  agentName: string;
  totalOrdersHandled: number;
}

interface OrderStatus {
  status: string;
  totalOrders: number;
}

const AnalyticsDashboard: React.FC = () => {
  const [orderTrends, setOrderTrends] = useState<OrderTrend[]>([]);
  const [customerFrequency, setCustomerFrequency] = useState<CustomerFrequency[]>([]);
  const [warehouseUtilization, setWarehouseUtilization] = useState<WarehouseUtilization[]>([]);
  const [deliveryPerformance, setDeliveryPerformance] = useState<DeliveryPerformance[]>([]);
  const [orderStatus, setOrderStatus] = useState<OrderStatus[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          orderTrendsData,
          customerFrequencyData,
          warehouseUtilizationData,
          deliveryPerformanceData,
          orderStatusData,
        ] = await Promise.all([
          fetchAnalyticsData('/api/analytics/order-trends'),
          fetchAnalyticsData('/api/analytics/customer-frequency'),
          fetchAnalyticsData('/api/analytics/warehouse-utilization'),
          fetchAnalyticsData('/api/analytics/delivery-performance'),
          fetchAnalyticsData('/api/analytics/order-status'),
        ]);
        setOrderTrends(orderTrendsData);
        console.log(orderTrendsData);
        setCustomerFrequency(customerFrequencyData);
        setWarehouseUtilization(warehouseUtilizationData);
        setDeliveryPerformance(deliveryPerformanceData);
        setOrderStatus(orderStatusData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>

      {/* Order Trends */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Trends Over Time</h2>
        <Line
        height={60}
          data={{
            labels: orderTrends.map((o) => o.orderDate),
            datasets: [
              {
                label: 'Total Orders',
                data: orderTrends.map((o) => o.totalOrders),
                borderColor: '#4CAF50',
                borderWidth: 2,
                fill: false,
              },
              {
                label: 'Total Quantity',
                data: orderTrends.map((o) => o.totalQuantity),
                borderColor: '#FFC107',
                borderWidth: 2,
                fill: false,
              },
            ],
          }}
        />
      </div>

      {/* Order Status & Warehouse Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Status Breakdown</h2>
          <Pie
          height={50}
            data={{
              labels: orderStatus.map((status) => status.status),
              datasets: [
                {
                  data: orderStatus.map((status) => status.totalOrders),
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
              ],
            }}
          />
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Warehouse Inventory Utilization</h2>
          <Doughnut
          height={50}
            data={{
              labels: warehouseUtilization.map((warehouse) => warehouse.warehouseLocation),
              datasets: [
                {
                  data: warehouseUtilization.map((warehouse) => warehouse.utilizationPercentage || 0),
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                },
              ],
            }}
          />
        </div>
      </div>

      {/* Delivery Performance & Customer Frequency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Delivery Agent Performance</h2>
          <Bar
            data={{
              labels: deliveryPerformance.map((agent) => agent.agentName),
              datasets: [
                {
                  label: 'Orders Handled',
                  data: deliveryPerformance.map((agent) => agent.totalOrdersHandled),
                  backgroundColor: '#2196F3',
                },
              ],
            }}
            options={{
              indexAxis: 'y',
            }}
          />
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Order Frequency</h2>
          <Bar
            data={{
              labels: customerFrequency.map((customer) => customer.customerName),
              datasets: [
                {
                  label: 'Total Orders',
                  data: customerFrequency.map((customer) => customer.totalOrders),
                  backgroundColor: '#4CAF50',
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

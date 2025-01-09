import React from 'react';
import { NavLink } from 'react-router-dom';
// import { Person } from '@mui/icons-material';
import { 
  LayoutDashboard, 
  Warehouse, 
  Package,
  Truck,
  ShoppingCart, 
  BarChart2, 
  Users,
  User,
  Clock,
  Briefcase,  
  Menu
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/warehouses', icon: Warehouse, label: 'Warehouses' },
    { path: '/inventory', icon: Package, label: 'Inventory' },
    { path: '/shipments', icon: Truck, label: 'Shipments' },
    { path: '/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/customers', icon: User, label: 'Customers' },
    { path: '/reports', icon: BarChart2, label: 'Reports' },
    // { path: '/users', icon: Users, label: 'Users' },
    { path: '/delivery-schedule', icon: Clock, label: 'Delevery Schedule' },
    { path: '/delivery-Agents', icon: Briefcase, label: 'Delevery Agents' },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} min-h-screen bg-gray-900 text-white transition-all duration-300`}>
      <div className="flex items-center justify-between p-4">
        <h1 className={`${!isOpen && 'hidden'} font-bold text-xl`}>Smart Logistics</h1>
        <button
          title="Toggle Sidebar"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-800"
        >
          <Menu size={24} />
        </button>
      </div>
      
      <nav className="mt-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 ${
                isActive ? 'bg-gray-800 text-blue-400' : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            <item.icon size={20} />
            <span className={`ml-4 ${!isOpen && 'hidden'}`}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
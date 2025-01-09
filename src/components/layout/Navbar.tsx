// import React from 'react';
import { Bell, User } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="text-xl font-semibold text-gray-800">
      Smart Logistics
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100" title="Notifications">
          <Bell size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          <span className="text-sm font-medium">Admin: KelvinPrabhu</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
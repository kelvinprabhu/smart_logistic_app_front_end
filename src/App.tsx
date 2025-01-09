import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Warehouses = React.lazy(() => import('./pages/Warehouses'));
const Inventory = React.lazy(() => import('./pages/Inventory'));
const Shipments = React.lazy(() => import('./pages/Shipments'));
const Orders = React.lazy(() => import('./pages/Orders'));
const Customers = React.lazy(() => import('./pages/Customers'));
const Reports = React.lazy(() => import('./pages/Reports'));
const Users = React.lazy(() => import('./pages/Users'));
const DeliverySchedules = React.lazy(() => import('./pages/DeliverySchedules'));
const DeliveryAgents = React.lazy(() => import('./pages/DeliveryAgentPage'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </React.Suspense>
          } />
          <Route path="warehouses" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Warehouses />
            </React.Suspense>
          } />
          <Route path="inventory" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Inventory />
            </React.Suspense>
          } />
          <Route path="shipments" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Shipments />
            </React.Suspense>
          } />
          <Route path="orders" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Orders />
            </React.Suspense>
          } />
           <Route path="customers" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Customers />
            </React.Suspense>
          } />
          <Route path="reports" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Reports />
            </React.Suspense>
          } />
          <Route path="users" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Users />
            </React.Suspense>
            } />
            <Route path="delivery-schedule" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <DeliverySchedules />
              </React.Suspense>
               } />
               <Route path="delivery-agents" element={
                 <React.Suspense fallback={<div>Loading...</div>}>
                   <DeliveryAgents />
                 </React.Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
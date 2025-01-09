import React, { useState } from 'react';
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

function Login({ setAuthenticated }: { setAuthenticated: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'KelvinPrabhu' && password === 'password') {
      setAuthenticated(true);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
  
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <Login setAuthenticated={setAuthenticated} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
              </React.Suspense>
            }
          />
          <Route
            path="warehouses"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Warehouses />
              </React.Suspense>
            }
          />
          <Route
            path="inventory"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Inventory />
              </React.Suspense>
            }
          />
          <Route
            path="shipments"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Shipments />
              </React.Suspense>
            }
          />
          <Route
            path="orders"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Orders />
              </React.Suspense>
            }
          />
          <Route
            path="customers"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Customers />
              </React.Suspense>
            }
          />
          <Route
            path="reports"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Reports />
              </React.Suspense>
            }
          />
          <Route
            path="users"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Users />
              </React.Suspense>
            }
          />
          <Route
            path="delivery-schedule"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <DeliverySchedules />
              </React.Suspense>
            }
          />
          <Route
            path="delivery-agents"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <DeliveryAgents />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

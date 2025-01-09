// pages/DeliveryAgentPage.tsx

import React, { useEffect, useState } from 'react';
import { DeliveryAgent } from '../types/DeliveryAgent';
import { getDeliveryAgents, createDeliveryAgent, updateDeliveryAgent, deleteDeliveryAgent } from '../services/deliveryAgentService';

const DeliveryAgentPage: React.FC = () => {
  const [agents, setAgents] = useState<DeliveryAgent[]>([]);
  const [formData, setFormData] = useState<DeliveryAgent>({
    agentId: 0,
    name: '',
    phone: '',
    assignedRoute: '',
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    const agents = await getDeliveryAgents();
    setAgents(agents);
  };

  const handleAddClick = () => {
    setFormData({ agentId: 0, name: '', phone: '', assignedRoute: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (agent: DeliveryAgent) => {
    setFormData(agent);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (agentId: number) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      await deleteDeliveryAgent(agentId);
      fetchAgents();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditing) {
      await updateDeliveryAgent(formData.agentId, formData);
    } else {
      await createDeliveryAgent(formData);
    }
    fetchAgents();
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Delivery Agents</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-3" onClick={handleAddClick}>Add New Agent</button>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Phone</th>
            <th className="px-4 py-2 border-b">Assigned Route</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.agentId}>
              <td className="px-4 py-2 border-b">{agent.name}</td>
              <td className="px-4 py-2 border-b">{agent.phone}</td>
              <td className="px-4 py-2 border-b">{agent.assignedRoute}</td>
              <td className="px-4 py-2 border-b">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2" onClick={() => handleEditClick(agent)}>Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => handleDeleteClick(agent.agentId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit Agent */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-xl font-semibold">{isEditing ? 'Edit Agent' : 'Add New Agent'}</h5>
              <button className="text-gray-600" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  id="phone"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="assignedRoute" className="block text-sm font-medium text-gray-700">Assigned Route</label>
                <input
                  type="text"
                  id="assignedRoute"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={formData.assignedRoute}
                  onChange={(e) => setFormData({ ...formData, assignedRoute: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setIsModalOpen(false)}>Close</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{isEditing ? 'Update' : 'Add'} Agent</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryAgentPage;

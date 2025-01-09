// services/deliveryAgentService.ts

import { DeliveryAgent } from '../types/DeliveryAgent';

const baseUrl = 'http://localhost:8081/api/delivery_agents';

export const getDeliveryAgents = async (): Promise<DeliveryAgent[]> => {
  const response = await fetch(baseUrl);
  const data = await response.json();
  return data;
};

export const createDeliveryAgent = async (agent: DeliveryAgent): Promise<DeliveryAgent> => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(agent),
  });
  const data = await response.json();
  return data;
};

export const updateDeliveryAgent = async (agentId: number, agent: DeliveryAgent): Promise<DeliveryAgent> => {
  const response = await fetch(`${baseUrl}/${agentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(agent),
  });
  const data = await response.json();
  return data;
};

export const deleteDeliveryAgent = async (agentId: number): Promise<void> => {
  await fetch(`${baseUrl}/${agentId}`, {
    method: 'DELETE',
  });
};

import { InventoryItem } from '../types/inventory';

const API_URL = 'http://localhost:8081/api/inventory';

export const inventoryService = {
  getAll: async (): Promise<InventoryItem[]> => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  },

  create: async (newItem: Omit<InventoryItem, 'id' | 'createdAt'>) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
    const data = await response.json();
    return data;
  },

  update: async (id: number, updatedItem: Omit<InventoryItem, 'id' | 'createdAt'>) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    return data;
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return true;
    }
    throw new Error('Failed to delete item');
  },
};

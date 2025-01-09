import axios from 'axios';
import { Warehouse } from '../types/warehouse';

const BASE_URL = 'http://localhost:8081/api/warehouses'; // Base URL for your API

export const warehouseService = {
  // Fetch all warehouses
  getAll: async (): Promise<Warehouse[]> => {
    const response = await axios.get<Warehouse[]>(`${BASE_URL}`);
    return response.data;
  },

  // Fetch a warehouse by ID
  getById: async (id: number): Promise<Warehouse> => {
    const response = await axios.get<Warehouse>(`${BASE_URL}/${id}`);
    return response.data;
  },

  // Create a new warehouse
  create: async (warehouse: Omit<Warehouse, 'id'>): Promise<Warehouse> => {
    const response = await axios.post<Warehouse>(`${BASE_URL}`, warehouse);
    return response.data;
  },

  // Update an existing warehouse
  update: async (id: number, warehouse: Partial<Warehouse>): Promise<Warehouse> => {
    const response = await axios.put<Warehouse>(`${BASE_URL}/${id}`, warehouse);
    return response.data;
  },

  // Delete a warehouse
  delete: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};

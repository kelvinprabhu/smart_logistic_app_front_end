import axios from "axios";
import { Customer } from "../types/customer";

const baseUrl = "http://localhost:8081/api/customers";

export const customerService = {
  getAll: async (): Promise<Customer[]> => {
    const response = await axios.get(baseUrl);
    return response.data;
  },
  
  create: async (customer: Omit<Customer, "id" | "createdAt">): Promise<Customer> => {
    const response = await axios.post(baseUrl, customer);
    return response.data;
  },
  
  update: async (id: number, customer: Partial<Customer>): Promise<Customer> => {
    const response = await axios.put(`${baseUrl}/${id}`, customer);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}`);
  },
};

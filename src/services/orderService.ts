// src/services/orderService.ts
import { Order } from "../types/order";

const API_BASE_URL = "http://localhost:8081/api/orders";

export const orderService = {
  async getAll(): Promise<Order[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch orders");
    return response.json();
  },

  async create(order: Omit<Order, "id" | "createdAt">): Promise<Order> {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error("Failed to create order");
    return response.json();
  },

  async update(id: number, order: Partial<Order>): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error("Failed to update order");
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete order");
  },
};

// src/types/order.ts
export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
  }
  
  export interface Warehouse {
    id: number;
    location: string;
    capacity: number;
    currentInventory: number;
  }
  
  export interface Order {
    id: number;
    customer: Customer;
    warehouse: Warehouse;
    status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    orderDate: string;
    deliveryDate: string | null;
    quantity: number;
    createdAt: string;
  }
  
// types/deliverySchedule.ts
export interface Order {
    id: number;
    customer: {
      id: number;
      name: string;
      email: string;
      phone: string;
      address: string;
      createdAt: string;
    };
    warehouse: {
      id: number;
      location: string;
      capacity: number;
      currentInventory: number;
    };
    status: string;
    orderDate: string;
    deliveryDate: string | null;
    quantity: number;
    createdAt: string;
  }
  
  export interface Agent {
    agentId: number;
    name: string;
    phone: string;
    assignedRoute: string;
  }
  
  export interface DeliverySchedule {
    scheduleId: number;
    order: Order;
    agent: Agent;
    expectedDeliveryDate: string;
    status: string;
  }
  
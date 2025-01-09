// types/OrderReport.ts

export interface OrderReport {
    orderId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    orderStatus: string;
    orderDate: string;
    deliveryDate: string;
    orderQuantity: number;
    warehouseLocation: string;
    warehouseCapacity: number;
    warehouseCurrentInventory: number;
    deliveryAgentName: string;
    deliveryAgentPhone: string;
    deliveryAgentRoute: string;
  }
  
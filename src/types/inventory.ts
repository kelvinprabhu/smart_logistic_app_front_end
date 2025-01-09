// src/types/inventory.ts
export interface Warehouse {
  id: number;
  location: string;
  capacity: number;
  currentInventory: number;
}

export interface InventoryItem {
  id: number;
  warehouse: Warehouse;
  productName: string;
  quantity: number;
  minThreshold: number;
  createdAt: string;
}

// shipmentTypes.ts
export interface Shipment {
  trackingId: number;
  orderId: number;
  shipmentStatus: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'DELAYED';
  shippedDate: string;
  expectedDeliveryDate: string;
  actualDeliveryDate: string;
  carrier: string;
  createdAt: string;
}
// export interface TrackingEvent {
//   trackingId: number;
//   orderId: number;
//   shipmentStatus: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'DELAYED';
//   shippedDate: string;
//   expectedDeliveryDate: string;
//   actualDeliveryDate: string;
//   carrier: string;
//   createdAt: string;
// }


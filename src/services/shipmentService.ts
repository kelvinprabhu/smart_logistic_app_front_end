import { Shipment } from '../types/shipment';

const BASE_URL = 'http://localhost:8081/api/shipments';

export const shipmentService = {
  // Create a new shipment
  create: (shipment: Omit<Shipment, 'trackingId' | 'createdAt'>) => {
    return fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shipment),
    })
      .then((response) => response.json())
      .then((data) => ({ data }))
      .catch((error) => {
        console.error('Error creating shipment:', error);
        throw error;
      });
  },

  // Get all shipments
  getAll: () => {
    return fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => ({ data }))
      .catch((error) => {
        console.error('Error fetching shipments:', error);
        throw error;
      });
  },

  // Get shipment by ID (trackingId)
  getById: (trackingId: number) => {
    return fetch(`${BASE_URL}/${trackingId}`)
      .then((response) => response.json())
      .then((data) => ({ data }))
      .catch((error) => {
        console.error('Error fetching shipment by ID:', error);
        throw error;
      });
  },

  // Update shipment status
  updateStatus: (trackingId: number, status: string) => {
    return fetch(`${BASE_URL}/${trackingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shipmentStatus: status }),
    })
      .then((response) => response.json())
      .then((data) => ({ data }))
      .catch((error) => {
        console.error('Error updating shipment status:', error);
        throw error;
      });
  },

  // Delete shipment by ID (trackingId)
  delete: (trackingId: number) => {
    return fetch(`${BASE_URL}/${trackingId}`, {
      method: 'DELETE',
    })
      .then(() => ({ data: null }))
      .catch((error) => {
        console.error('Error deleting shipment:', error);
        throw error;
      });
  },
};

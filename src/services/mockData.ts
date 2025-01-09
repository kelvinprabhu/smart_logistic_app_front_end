import axios from 'axios';
import { useState, useEffect } from 'react';
import { Warehouse } from '../types/warehouse';
import { InventoryItem } from '../types/inventory';
import { Shipment } from '../types/shipment';

// API Base URL
const API_BASE_URL = 'http://localhost:8080/api';

export const useWarehouseData = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [warehouseRes, inventoryRes, shipmentRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/warehouses`),
        axios.get(`${API_BASE_URL}/inventory`),
        axios.get(`${API_BASE_URL}/shipments`),
      ]);

      setWarehouses(warehouseRes.data);
      setInventory(inventoryRes.data);
      setShipments(shipmentRes.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    warehouses,
    inventory,
    shipments,
    loading,
    error,
    refetch: fetchData,
  };
};

// services/orderReportService.ts

import { OrderReport } from '../types/OrderReport';

const baseUrl = 'http://localhost:8081/api/reports/orders';

export const fetchOrderReports = async (): Promise<OrderReport[]> => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch order reports');
  }
  const data = await response.json();
  return data;
};

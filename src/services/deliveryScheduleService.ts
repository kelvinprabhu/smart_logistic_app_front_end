// services/deliveryScheduleService.ts
import axios from 'axios';
import { DeliverySchedule } from '../types/deliverySchedule';

const API_URL = 'http://localhost:8081/api/delivery_schedule';

export const deliveryScheduleService = {
  getAll: async (): Promise<DeliverySchedule[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  create: async (schedule: Omit<DeliverySchedule, 'scheduleId'>): Promise<DeliverySchedule> => {
    const response = await axios.post(API_URL, schedule);
    return response.data;
  },

  update: async (scheduleId: number, schedule: Partial<DeliverySchedule>): Promise<DeliverySchedule> => {
    const response = await axios.put(`${API_URL}/${scheduleId}`, schedule);
    return response.data;
  },

  delete: async (scheduleId: number): Promise<void> => {
    await axios.delete(`${API_URL}/${scheduleId}`);
  },
};


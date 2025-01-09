import api from './api';
import { User } from '../types/user';

export const userService = {
  getAll: () => api.get<User[]>('/users'),
  getById: (id: string) => api.get<User>(`/users/${id}`),
  create: (user: Omit<User, 'id'>) => api.post<User>('/users', user),
  update: (id: string, user: Partial<User>) => api.put<User>(`/users/${id}`, user),
  delete: (id: string) => api.delete(`/users/${id}`),
};
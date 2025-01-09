export type UserRole = 'admin' | 'manager' | 'operator';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  active: boolean;
  lastLogin: string;
  createdAt: string;
}
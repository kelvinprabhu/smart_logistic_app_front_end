import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { userService } from '../../services/userService';
import { User } from '../../types/user';
import Button from '../../components/ui/Button';
import UserTable from '../../components/users/UserTable';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin, loading: authLoading } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userService.getAll();
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    // Will implement edit modal in next iteration
    console.log('Edit user:', user);
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await userService.delete(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  if (authLoading) return <div>Loading...</div>;
  if (!isAdmin) return <Navigate to="/" replace />;
  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Add User
        </Button>
      </div>

      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
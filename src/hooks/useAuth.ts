import { useState, useEffect } from 'react';
import { User } from '../types/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would verify the session with your backend
    const checkAuth = async () => {
      try {
        // Simulate auth check
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager';

  return { user, loading, isAdmin, isManager };
}
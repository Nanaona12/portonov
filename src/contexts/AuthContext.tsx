import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';

interface AuthUser {
  id: number;
  email: string;
  display_name?: string | null;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: any | null }>;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  resetPassword: (email: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem('PORTONOV_TOKEN');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const body = await apiRequest<{ user: AuthUser }>('auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(body.user);
    } catch (error) {
      localStorage.removeItem('PORTONOV_TOKEN');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      const body = await apiRequest<{ token: string; user: AuthUser }>('auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, displayName }),
      });
      localStorage.setItem('PORTONOV_TOKEN', body.token);
      setUser(body.user);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const body = await apiRequest<{ token: string; user: AuthUser }>('auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('PORTONOV_TOKEN', body.token);
      setUser(body.user);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await apiRequest('auth/request-reset', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('PORTONOV_TOKEN');
    setUser(null);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    resetPassword,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
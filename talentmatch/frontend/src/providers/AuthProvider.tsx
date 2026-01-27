// src/providers/AuthProvider.tsx
'use client';

import { apiClient } from '@/services/api';
import { getAuthToken, getUserId, getUserRole, removeAuthToken, setAuthToken } from '@/services/auth.service';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthUser {
  id: string;
  role: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  authToken?: string;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = getUserId();
    const role = getUserRole();
    const token = getAuthToken();

    if (userId && role && token) {
      setUser({ id: userId, role, email: localStorage.getItem('userEmail') || '' });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiClient.login({ email, password });

    setAuthToken(data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('userId', data.user.id);
    localStorage.setItem('userRole', data.user.role);
    localStorage.setItem('userEmail', data.user.email);

    setUser({
      id: data.user.id,
      role: data.user.role,
      email: data.user.email
    });
  };

  const logout = () => {
    removeAuthToken();
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!getAuthToken();
  };

  const register = async (email: string, password: string, name: string, role: string) => {
    const data = await apiClient.register({ email, password, name, role: role as any });

    setAuthToken(data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('userId', data.user.id);
    localStorage.setItem('userRole', data.user.role);
    localStorage.setItem('userEmail', data.user.email);

    setUser({
      id: data.user.id,
      role: data.user.role,
      email: data.user.email
    });
  };


  return (
    <AuthContext.Provider value={{ user, authToken: getAuthToken() ?? undefined, isLoading, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

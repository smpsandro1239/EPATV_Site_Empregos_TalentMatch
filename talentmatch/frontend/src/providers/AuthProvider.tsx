// src/providers/AuthProvider.tsx
'use client';

import { getAuthToken, getUserId, getUserRole, removeAuthToken } from '@/services/auth.service';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthUser {
  id: string;
  role: string;
  email: string; // Assuming email is available, if not, adjust
}

interface AuthContextType {
  user: AuthUser | null;
  authToken?: string; // Add authToken here
  login: (token: string, userId: string, role: string, email: string) => void;
  register: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const userId = getUserId();
    const role = getUserRole();
    const token = getAuthToken();

    if (userId && role && token) {
      // In a real app, you'd probably verify the token with the backend here
      setUser({ id: userId, role, email: localStorage.getItem('userEmail') || '' });
    }
  }, []);

  const login = (token: string, userId: string, role: string, email: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    setUser({ id: userId, role, email });
  };

  const logout = () => {
    removeAuthToken();
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!getAuthToken();
  };


  return (
    <AuthContext.Provider value={{ user, authToken: getAuthToken(), login, logout, isAuthenticated }}>
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

// src/services/auth.service.ts

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// You would also have functions to get user info, like ID and role
export const getUserId = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId');
    }
    return null;
};

export const getUserRole = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('userRole');
    }
    return null;
}

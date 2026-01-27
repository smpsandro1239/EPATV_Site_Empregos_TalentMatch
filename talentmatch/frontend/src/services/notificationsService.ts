import { axiosInstance } from './api';

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export const notificationsService = {
  getNotifications: async (): Promise<Notification[]> => {
    const response = await axiosInstance.get('/notifications');
    return response.data;
  },

  getUnreadCount: async (): Promise<{ count: number }> => {
    const response = await axiosInstance.get('/notifications/unread-count');
    return response.data;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const response = await axiosInstance.put(`/notifications/${id}/read`);
    return response.data;
  },
};

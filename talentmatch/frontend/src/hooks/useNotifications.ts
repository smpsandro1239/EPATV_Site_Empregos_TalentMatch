'use client';

import { useEffect, useState, useCallback } from 'react';
import { notificationsService, Notification } from '@/services/notificationsService';
import { useAuth } from '@/providers/AuthProvider';
import { io } from 'socket.io-client';

export function useNotifications() {
  const { authToken, user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await notificationsService.getNotifications();
      setNotifications(data);
      const { count } = await notificationsService.getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await notificationsService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationsService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  useEffect(() => {
    if (user && authToken) {
      fetchNotifications();

      const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', {
        auth: { token: authToken },
      });

      socket.on('newNotification', (notification: Notification) => {
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user, authToken, fetchNotifications]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refresh: fetchNotifications,
  };
}

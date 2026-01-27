'use client';

import Header from '@/components/Header';
import { useNotifications } from '@/hooks/useNotifications';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotificationsPage() {
  const { user, isLoading } = useAuth();
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Notificações</h1>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
              >
                Marcar todas como lidas
              </button>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {notifications.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <p className="text-lg">Não tens notificações de momento.</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-6 transition hover:bg-gray-50 flex items-start justify-between ${!n.read ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          n.type === 'application' ? 'bg-blue-100 text-blue-800' :
                          n.type === 'status' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {n.type}
                        </span>
                        <h3 className={`text-lg ${!n.read ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                          {n.title}
                        </h3>
                      </div>
                      <p className="text-gray-600">{n.body}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(n.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {!n.read && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="text-xs text-primary-600 font-bold hover:underline"
                      >
                        Marcar como lida
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

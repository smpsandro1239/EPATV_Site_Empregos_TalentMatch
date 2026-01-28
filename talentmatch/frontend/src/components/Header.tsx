'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/hooks/useNotifications';
import { useI18n } from '@/providers/I18nProvider';

export default function Header() {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const { locale, changeLocale, t } = useI18n();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          TalentMatch
        </Link>

        <nav className="flex items-center gap-6">
          {user.role === 'CANDIDATE' && (
            <>
              <Link href="/candidate" className="text-gray-700 hover:text-primary-600 font-medium">
                {t('common.dashboard') || 'Painel'}
              </Link>
              <Link href="/candidate/profile" className="text-gray-700 hover:text-primary-600 font-medium">
                {t('common.profile') || 'Perfil'}
              </Link>
              <Link href="/jobs" className="text-gray-700 hover:text-primary-600 font-medium">
                {t('common.jobs') || 'Vagas'}
              </Link>
            </>
          )}

          {user.role === 'ADMIN' && (
            <>
              <Link href="/admin/dashboard" className="text-gray-700 hover:text-primary-600 font-medium">
                Painel
              </Link>
              <Link href="/admin/users" className="text-gray-700 hover:text-primary-600 font-medium">
                Utilizadores
              </Link>
              <Link href="/admin/jobs" className="text-gray-700 hover:text-primary-600 font-medium">
                Vagas
              </Link>
            </>
          )}

          {user.role === 'COMPANY' && (
            <>
              <Link href="/company" className="text-gray-700 hover:text-primary-600 font-medium">
                Painel
              </Link>
              <Link href="/company/profile" className="text-gray-700 hover:text-primary-600 font-medium">
                Empresa
              </Link>
              <Link href="/company/jobs" className="text-gray-700 hover:text-primary-600 font-medium">
                Vagas
              </Link>
            </>
          )}

          <div className="flex items-center gap-4 border-l border-gray-300 pl-6">
            <select
                value={locale}
                onChange={(e) => changeLocale(e.target.value)}
                className="text-xs font-bold border rounded p-1 bg-gray-50"
            >
                <option value="pt">PT</option>
                <option value="en">EN</option>
                <option value="es">ES</option>
            </select>

            <Link href="/notifications" className="relative text-gray-600 hover:text-primary-600">
              <span className="text-2xl">🔔</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-bold"
              >
                Sair
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, logout } = useAuth();
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
              <Link href="/candidate" className="text-gray-700 hover:text-primary-600">
                Dashboard
              </Link>
              <Link href="/candidate/profile" className="text-gray-700 hover:text-primary-600">
                My Profile
              </Link>
              <Link href="/jobs" className="text-gray-700 hover:text-primary-600">
                Jobs
              </Link>
            </>
          )}

          {user.role === 'ADMIN' && (
            <>
              <Link href="/admin/dashboard" className="text-gray-700 hover:text-primary-600">
                Dashboard
              </Link>
              <Link href="/admin/users" className="text-gray-700 hover:text-primary-600">
                Users
              </Link>
              <Link href="/admin/jobs" className="text-gray-700 hover:text-primary-600">
                Jobs
              </Link>
            </>
          )}

          {user.role === 'COMPANY' && (
            <>
              <Link href="/company" className="text-gray-700 hover:text-primary-600">
                Dashboard
              </Link>
              <Link href="/company/profile" className="text-gray-700 hover:text-primary-600">
                Company
              </Link>
              <Link href="/company/jobs" className="text-gray-700 hover:text-primary-600">
                Jobs
              </Link>
            </>
          )}

          <div className="flex items-center gap-3 border-l border-gray-300 pl-6">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

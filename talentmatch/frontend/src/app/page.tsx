'use client';

import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { useEffect, useRouter } from 'next/navigation';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === 'CANDIDATE') {
        router.push('/candidate/dashboard');
      } else if (user.role === 'COMPANY') {
        router.push('/company/dashboard');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary-600 mb-4">
          TalentMatch
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Recruitment Platform with Intelligent Matching
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/login"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}

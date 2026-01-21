'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function CompanyDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'COMPANY')) {
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

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Welcome Card */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Recruiter Dashboard!</h1>
            <p className="text-gray-600 mb-6">
              Post jobs, review candidates, and find the perfect talent for your company.
            </p>
            <div className="flex gap-4">
              <Link
                href="/company/profile"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Setup Company Profile
              </Link>
              <Link
                href="/company/jobs/new"
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Post a Job
              </Link>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-primary-50 rounded-lg shadow-lg p-6 border-l-4 border-primary-600">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Recruiting Stats</h3>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-primary-600">0</p>
                <p className="text-sm text-gray-600">Active Jobs</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-600">0</p>
                <p className="text-sm text-gray-600">Applications</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-600">0</p>
                <p className="text-sm text-gray-600">Hired</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/company/profile"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition text-center"
            >
              <div className="text-2xl mb-2">🏢</div>
              <p className="font-semibold text-gray-900">Company</p>
              <p className="text-xs text-gray-600">Manage company info</p>
            </Link>

            <Link
              href="/company/jobs"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition text-center"
            >
              <div className="text-2xl mb-2">💼</div>
              <p className="font-semibold text-gray-900">Jobs</p>
              <p className="text-xs text-gray-600">Manage your job posts</p>
            </Link>

            <Link
              href="/company/candidates"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition text-center"
            >
              <div className="text-2xl mb-2">👥</div>
              <p className="font-semibold text-gray-900">Candidates</p>
              <p className="text-xs text-gray-600">Review applicants</p>
            </Link>

            <Link
              href="/notifications"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition text-center"
            >
              <div className="text-2xl mb-2">📧</div>
              <p className="font-semibold text-gray-900">Messages</p>
              <p className="text-xs text-gray-600">Talk with candidates</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

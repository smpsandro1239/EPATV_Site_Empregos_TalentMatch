'use client';

import Header from '@/components/Header';
import JobsSection from '@/components/company/JobsSection';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

export default function CompanyJobsPage() {
  const { user, isLoading, authToken } = useAuth();
  const router = useRouter();
  const [companyId, setCompanyId] = useState('');

  const fetchCompanyProfile = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/by-user/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const profile = await response.json();
        setCompanyId(profile.id);
      }
    } catch (err) {
      console.error('Falha ao carregar o perfil da empresa', err);
    }
  }, [user?.id, authToken]);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'COMPANY')) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user && user.id && user.role === 'COMPANY') {
      fetchCompanyProfile();
    }
  }, [user, fetchCompanyProfile]);

  if (isLoading || !companyId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">As Minhas Vagas</h1>
            <Link
              href="/company/jobs/new"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Publicar Nova Vaga
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md">
            <JobsSection token={authToken!} companyId={companyId} />
          </div>
        </div>
      </main>
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { adminService } from '@/services/adminService';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

export default function AdminJobsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchJobs();
    }
  }, [user]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await adminService.getJobs();
      setJobs(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar vagas');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await adminService.updateJobStatus(id, status);
      setJobs(jobs.map(j => j.id === id ? { ...j, status } : j));
    } catch (err: any) {
      alert(err.message || 'Erro ao atualizar status');
    }
  };

  if (isLoading || loading) {
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
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <Link href="/admin" className="text-primary-600 hover:underline text-sm font-semibold">← Voltar Dashboard</Link>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Gestão de Vagas</h1>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr className="text-gray-400 text-xs uppercase font-bold">
                  <th className="px-6 py-4">Vaga</th>
                  <th className="px-6 py-4">Empresa</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Candidaturas</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {jobs.map((j) => (
                  <tr key={j.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900">{j.title}</p>
                      <p className="text-xs text-gray-400">{j.location} • {j.level}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {j.company.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        j.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                        j.status === 'PAUSED' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {j.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-primary-600">
                      {j._count.applications}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleStatusChange(j.id, j.status === 'PUBLISHED' ? 'PAUSED' : 'PUBLISHED')}
                        className="text-primary-600 hover:text-primary-800 text-sm font-bold underline"
                      >
                        {j.status === 'PUBLISHED' ? 'Pausar' : 'Ativar'}
                      </button>
                      <button
                        onClick={() => handleStatusChange(j.id, 'CLOSED')}
                        className="text-red-600 hover:text-red-800 text-sm font-bold underline"
                      >
                        Fechar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

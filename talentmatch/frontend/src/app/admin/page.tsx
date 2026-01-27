'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { adminService } from '@/services/adminService';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition';
import DashboardChart from '@/components/DashboardChart';

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await adminService.getDashboardStats();
      setStats(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar estatísticas');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || (loading && !stats)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') return null;

  return (
    <>
      <Header />
      <PageTransition>
        <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Painel de Administração</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <p className="text-gray-500 text-sm uppercase font-bold">Total Utilizadores</p>
              <p className="text-3xl font-bold">{stats.stats.totalUsers}</p>
              <div className="mt-2 text-xs text-gray-400">
                {stats.stats.totalCandidates} Candidatos | {stats.stats.totalCompanies} Empresas
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <p className="text-gray-500 text-sm uppercase font-bold">Total Vagas</p>
              <p className="text-3xl font-bold">{stats.stats.totalJobs}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <p className="text-gray-500 text-sm uppercase font-bold">Candidaturas</p>
              <p className="text-3xl font-bold">{stats.stats.totalApplications}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <p className="text-gray-500 text-sm uppercase font-bold">Ações Pendentes</p>
              <p className="text-3xl font-bold">0</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="mb-8">
            <DashboardChart
                data={stats.jobsByMonth}
                title="Crescimento de Vagas (Últimos 6 meses)"
                color="#10b981"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Users */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-gray-800">Utilizadores Recentes</h2>
                <Link href="/admin/users" className="text-primary-600 text-sm hover:underline">Ver Todos</Link>
              </div>
              <div className="p-0">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase bg-gray-50">
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Role</th>
                      <th className="px-6 py-3">Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {stats.recentUsers.map((u: any) => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            u.role === 'CANDIDATE' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Jobs */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-gray-800">Últimas Vagas</h2>
                <Link href="/admin/jobs" className="text-primary-600 text-sm hover:underline">Ver Todas</Link>
              </div>
              <div className="p-0">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase bg-gray-50">
                      <th className="px-6 py-3">Título</th>
                      <th className="px-6 py-3">Empresa</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {stats.recentJobs.map((j: any) => (
                      <tr key={j.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium">{j.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{j.company.name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            j.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {j.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
            </div>
          </main>
        </PageTransition>
    </>
  );
}

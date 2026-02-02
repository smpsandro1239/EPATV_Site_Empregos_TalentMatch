'use client';

import Header from '@/components/Header';
import Chat from '@/components/Chat';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Application {
  id: string;
  jobId: string;
  status:
    | 'SUBMITTED'
    | 'IN_REVIEW'
    | 'INTERVIEW'
    | 'REJECTED'
    | 'OFFER'
    | 'HIRED';
  message?: string;
  createdAt: string;
  job?: {
    id: string;
    title: string;
    location: string;
    company: {
      id: string;
      name: string;
      logoUrl?: string;
    };
  };
}

const statusColors: { [key: string]: string } = {
  SUBMITTED: 'bg-blue-100 text-blue-800',
  IN_REVIEW: 'bg-yellow-100 text-yellow-800',
  INTERVIEW: 'bg-purple-100 text-purple-800',
  OFFER: 'bg-green-100 text-green-800',
  HIRED: 'bg-emerald-100 text-emerald-800',
  REJECTED: 'bg-red-100 text-red-800',
};

const statusLabels: { [key: string]: string } = {
  SUBMITTED: 'Submetida',
  IN_REVIEW: 'Em Revisão',
  INTERVIEW: 'Entrevista',
  OFFER: 'Proposta',
  HIRED: 'Contratado',
  REJECTED: 'Rejeitada',
};

export default function ApplicationsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeChat, setActiveChat] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'CANDIDATE')) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user && user.id) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      // Note: user.id é o ID do usuário, mas a API espera o candidateId (profile.id)
      // Vamos usar o serviço de candidatos para obter o perfil primeiro
      const candidateProfile = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/candidates/profile/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!candidateProfile.ok) {
        throw new Error('Perfil de candidato não encontrado');
      }

      const profileData = await candidateProfile.json();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/applications/candidate/${profileData.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Falha ao procurar candidaturas');
      }

      const data = await response.json();
      setApplications(Array.isArray(data) ? data : data.data || []);
      setError('');
    } catch (err) {
      console.error('Erro ao procurar candidaturas:', err);
      // Não exibir erro se o candidato não tem perfil ou não há candidaturas
      // Apenas logar o erro e deixar a lista vazia
      setError('');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

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
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              As Minhas Candidaturas
            </h1>
            <p className="text-lg text-gray-600">
              Acompanha todas as tuas candidaturas num só lugar
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm mb-1">Total</p>
              <p className="text-3xl font-bold text-gray-900">
                {applications.length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm mb-1">Em Revisão</p>
              <p className="text-3xl font-bold text-yellow-600">
                {applications.filter((a) => a.status === 'IN_REVIEW').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm mb-1">Propostas</p>
              <p className="text-3xl font-bold text-green-600">
                {applications.filter((a) => a.status === 'OFFER').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm mb-1">Rejeitadas</p>
              <p className="text-3xl font-bold text-red-600">
                {applications.filter((a) => a.status === 'REJECTED').length}
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          )}

          {/* Applications List */}
          {!loading && applications.length > 0 && (
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {application.job && (
                        <>
                          <div className="flex items-center gap-4 mb-3">
                            {application.job.company.logoUrl && (
                              <img
                                src={application.job.company.logoUrl}
                                alt={application.job.company.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                {application.job.title}
                              </h3>
                              <p className="text-gray-600">
                                {application.job.company.name}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span>📍 {application.job.location}</span>
                            <span>
                              📅{' '}
                              {new Date(
                                application.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </>
                      )}

                      {application.message && (
                        <p className="text-gray-700 text-sm mb-3">
                          {application.message}
                        </p>
                      )}
                    </div>

                    <div className="ml-4">
                      <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                          statusColors[application.status] ||
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {statusLabels[application.status] || application.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-6 items-center">
                    {application.job && (
                      <Link
                        href={`/jobs/${application.job.id}`}
                        className="text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        Ver Detalhes da Vaga →
                      </Link>
                    )}
                    <button
                      onClick={() =>
                        setActiveChat(
                          activeChat === application.id ? null : application.id
                        )
                      }
                      className="text-primary-600 hover:text-primary-700 font-semibold"
                    >
                      {activeChat === application.id
                        ? 'Fechar Chat'
                        : 'Conversar com Empresa'}
                    </button>
                  </div>
                  {activeChat === application.id && (
                    <div className="mt-6 border-t pt-6">
                      <Chat applicationId={application.id} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* No Applications */}
          {!loading && applications.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-lg text-gray-600 mb-6">
                Ainda não te candidataste a nenhuma vaga.
              </p>
              <Link
                href="/jobs"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Procurar Vagas
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

'use client';

import Header from '@/components/Header';
import { useAuth } from '@/providers/AuthProvider';
import { matchingService, MatchResult } from '@/services/matchingService';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const { user, isLoading, authToken } = useAuth();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [candidates, setCandidates] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJobDetails = useCallback(async () => {
    try {
      setLoading(true);
      const [jobRes, candidatesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        matchingService.getCandidatesForJob(params.id)
      ]);

      if (!jobRes.ok) throw new Error('Falha ao carregar detalhes da vaga');

      const jobData = await jobRes.json();
      setJob(jobData);
      setCandidates(candidatesRes);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [params.id, authToken]);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'COMPANY')) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user && authToken) {
      fetchJobDetails();
    }
  }, [user, authToken, fetchJobDetails]);

  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Link href="/company/jobs" className="text-primary-600 hover:underline">Voltar para Vagas</Link>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/company/jobs" className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block">
              ← Voltar para as minhas vagas
            </Link>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-lg text-gray-600">{job.location} • {job.level} • {job.contractType}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                job.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {job.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Job Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição da Vaga</h2>
                <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                  {job.description}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Responsabilidades</h3>
                <div className="text-gray-700 whitespace-pre-wrap">{job.responsibilities}</div>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Requisitos Obrigatórios</h3>
                <div className="text-gray-700 whitespace-pre-wrap">{job.requirementsMust}</div>
              </div>

              {/* Candidates List */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Candidatos Recomendados (Matching)</h2>
                {candidates.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Ainda não há candidaturas para esta vaga.</p>
                ) : (
                  <div className="space-y-6">
                    {candidates.map((candidate) => (
                      <div key={candidate.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{candidate.name}</h3>
                            <p className="text-gray-600">{candidate.headline}</p>
                            <p className="text-sm text-gray-500">{candidate.location}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary-600">{candidate.matchScore}%</div>
                            <div className="text-xs text-gray-500 uppercase font-semibold text-center">Match</div>
                          </div>
                        </div>
                        <div className="mt-3 bg-blue-50 text-blue-700 p-2 rounded text-sm">
                          <strong>Razão:</strong> {candidate.matchReason}
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            candidate.applicationStatus === 'SUBMITTED' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {candidate.applicationStatus}
                          </span>
                          <button className="text-primary-600 hover:text-primary-700 font-medium">Ver Perfil Completo</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Stats Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Estatísticas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Candidaturas Totais</span>
                    <span className="font-bold">{candidates.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Visualizações</span>
                    <span className="font-bold">0</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Ações</h3>
                <div className="space-y-3">
                  <Link
                    href={`/company/jobs/${params.id}/edit`}
                    className="block w-full text-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Editar Vaga
                  </Link>
                  <button className="w-full py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                    Fechar Vaga
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

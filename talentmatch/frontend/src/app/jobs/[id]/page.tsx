'use client';

import Header from '@/components/Header';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { matchingService } from '@/services/matchingService';
import { useCandidate } from '@/hooks/useCandidate';

interface JobDetail {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirementsMust: string;
  requirementsNice?: string;
  location: string;
  level: string;
  contractType: string;
  remoteType: string;
  salaryMin?: number;
  salaryMax?: number;
  company: {
    id: string;
    name: string;
    logoUrl?: string;
    website?: string;
    description?: string;
    location: string;
  };
  createdAt: string;
  applications: { id: string; status: string }[];
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { profile, getProfileByUserId } = useCandidate();
  const jobId = params.id as string;

  const [job, setJob] = useState<JobDetail | null>(null);
  const [matchInfo, setMatchInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [appliedSuccessfully, setAppliedSuccessfully] = useState(false);

  const fetchJobDetail = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}`);
      if (!response.ok) throw new Error('Failed to fetch job');

      const data = await response.json();
      setJob(data);

      if (user?.role === 'CANDIDATE' && profile?.id) {
        const recommended = await matchingService.getJobsForCandidate(profile.id);
        const currentMatch = recommended.find(m => m.id === jobId);
        if (currentMatch) {
            setMatchInfo(currentMatch);
        }
      }

      setError('');
    } catch (err) {
      console.error('Error fetching job:', err);
      setError('Failed to load job details');
      setJob(null);
    } finally {
      setLoading(false);
    }
  }, [jobId, user, profile]);

  useEffect(() => {
    if (jobId) {
      fetchJobDetail();
    }
  }, [jobId, fetchJobDetail]);

  useEffect(() => {
    if (user?.id && user.role === 'CANDIDATE' && !profile) {
      getProfileByUserId(user.id);
    }
  }, [user, profile, getProfileByUserId]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (user.role !== 'CANDIDATE') {
      setError('Only candidates can apply for jobs');
      return;
    }

    try {
      setApplying(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          jobId,
          coverLetter,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      setAppliedSuccessfully(true);
      setCoverLetter('');
      setTimeout(() => {
        router.push('/candidate/applications');
      }, 2000);
    } catch (err: any) {
      console.error('Error applying for job:', err);
      setError(err.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </>
    );
  }

  if (error || !job) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
              {error || 'Job not found'}
            </div>
            <Link href="/jobs" className="mt-4 text-primary-600 hover:text-primary-700 font-semibold">
              ← Back to jobs
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/jobs" className="text-primary-600 hover:text-primary-700 font-semibold mb-6 inline-block">
            ← Back to jobs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Header */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
                    <p className="text-lg text-gray-600">{job.company.name}</p>
                  </div>
                  {job.company.logoUrl && (
                    <img
                      src={job.company.logoUrl}
                      alt={job.company.name}
                      className="w-20 h-20 rounded-lg object-cover border"
                    />
                  )}
                </div>

                {matchInfo && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-green-800 font-bold text-lg">Compatibilidade Inteligente</h3>
                      <p className="text-green-700 text-sm">{matchInfo.matchReason}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-green-600">{matchInfo.matchScore}%</div>
                      <div className="text-xs text-green-600 uppercase font-bold text-center">Score</div>
                    </div>
                  </div>
                )}

                {/* Job Meta Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nível</p>
                    <p className="font-semibold text-gray-900">{job.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Contrato</p>
                    <p className="font-semibold text-gray-900">{job.contractType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tipo</p>
                    <p className="font-semibold text-gray-900">{job.remoteType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Localização</p>
                    <p className="font-semibold text-gray-900">{job.location}</p>
                  </div>
                </div>

                {/* Salary */}
                {job.salaryMin && job.salaryMax && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-1">Faixa Salarial</p>
                    <p className="text-2xl font-bold text-primary-600">
                      €{job.salaryMin.toLocaleString()} - €{job.salaryMax.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição da Vaga</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  {job.description.split('\n').map((line, idx) => (
                    <p key={idx} className="mb-4">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsabilidades</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  {job.responsibilities.split('\n').map((line, idx) => (
                    <p key={idx} className="mb-2">
                      {line.startsWith('-') ? (
                        <span>• {line.substring(1).trim()}</span>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requisitos</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <h3 className="font-semibold text-gray-900 mb-2">Obrigatório:</h3>
                  <ul className="list-disc list-inside space-y-1 mb-6">
                    {job.requirementsMust.split('\n').map((line, idx) => (
                      <li key={idx} className="text-gray-700">
                        {line.replace(/^[-•]\s/, '')}
                      </li>
                    ))}
                  </ul>

                  {job.requirementsNice && (
                    <>
                      <h3 className="font-semibold text-gray-900 mb-2">Desejável:</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {job.requirementsNice.split('\n').map((line, idx) => (
                          <li key={idx} className="text-gray-700">
                            {line.replace(/^[-•]\s/, '')}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre a {job.company.name}</h2>
                <p className="text-gray-700 mb-4">{job.company.description || 'Sem descrição disponível'}</p>
                {job.company.website && (
                  <a
                    href={job.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Visitar website da empresa →
                  </a>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Apply Card */}
              <div className="bg-white rounded-lg shadow-md p-8 sticky top-20">
                {appliedSuccessfully ? (
                  <div className="text-center py-8">
                    <div className="text-green-500 text-4xl mb-4">✓</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Candidatura Enviada!</h3>
                    <p className="text-gray-600">A redirecionar para as tuas candidaturas...</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Candidata-te</h3>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                      </div>
                    )}

                    {!user ? (
                      <div className="text-center">
                        <p className="text-gray-600 mb-4">Inicia sessão para te candidatares</p>
                        <Link
                          href="/auth/login"
                          className="block w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition text-center"
                        >
                          Entrar
                        </Link>
                      </div>
                    ) : user.role !== 'CANDIDATE' ? (
                      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
                        <p className="text-sm">Apenas candidatos se podem candidatar</p>
                      </div>
                    ) : (
                      <form onSubmit={handleApply} className="space-y-6">
                        <div>
                          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                            Carta de Apresentação (Opcional)
                          </label>
                          <textarea
                            id="coverLetter"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Explica à empresa porque és o candidato ideal..."
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={applying}
                          className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {applying ? 'A enviar...' : 'Submeter Candidatura'}
                        </button>
                      </form>
                    )}
                  </>
                )}
              </div>

              {/* Job Info Card */}
              <div className="bg-gray-50 rounded-lg p-6 mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Informação da Vaga</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <span className="block font-medium text-gray-700 mb-1">Publicada</span>
                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-gray-700 mb-1">Candidaturas</span>
                    <span>{job.applications.length} submetidas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

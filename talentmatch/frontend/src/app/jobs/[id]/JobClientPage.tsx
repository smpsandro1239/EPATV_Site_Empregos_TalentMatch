'use client';

import Header from '@/components/Header';
import ReviewsSection from '@/components/company/ReviewsSection';
import { useAuth } from '@/providers/AuthProvider';
import { useBranding } from '@/providers/BrandingProvider';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
    branding?: {
      primaryColor?: string;
      secondaryColor?: string;
      logoUrl?: string;
    };
  };
  createdAt: string;
  applications: { id: string; status: string }[];
}

export default function JobDetailPage({ params: initialParams }: { params: { id: string } }) {
  const params = useParams();
  const router = useRouter();
  const { user, authToken } = useAuth();
  const { profile, getProfileByUserId } = useCandidate();
  const { setBranding } = useBranding();
  const jobId = (initialParams?.id || params.id) as string;

  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState('');
  const [appliedSuccessfully, setAppliedSuccessfully] = useState(false);

  // Use React Query for Job Details
  const { data: job, isLoading: jobLoading, error: jobError } = useQuery<JobDetail>({
    queryKey: ['job', jobId],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/jobs/${jobId}`);
      if (!res.ok) throw new Error('Falha ao carregar vaga');
      return res.json();
    }
  });

  // Use React Query for Matching Info
  const { data: matchInfo } = useQuery({
    queryKey: ['job-match', jobId, profile?.id],
    queryFn: () => matchingService.getMatchScore(jobId, profile!.id),
    enabled: !!jobId && !!profile?.id && user?.role === 'CANDIDATE',
  });

  useEffect(() => {
    if (user?.id && user.role === 'CANDIDATE') {
      getProfileByUserId(user.id);
    }
  }, [user, getProfileByUserId]);

  useEffect(() => {
    if (job?.company?.branding) {
      setBranding({
        primaryColor: job.company.branding.primaryColor,
        secondaryColor: job.company.branding.secondaryColor,
        logoUrl: job.company.branding.logoUrl,
      });
    } else {
        setBranding(null);
    }
    return () => setBranding(null);
  }, [job, setBranding]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'CANDIDATE') return;

    try {
      setApplying(true);
      setError('');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          jobId,
          coverLetter,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Falha ao submeter candidatura');
      }

      setAppliedSuccessfully(true);
      setTimeout(() => {
        router.push('/candidate/applications');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setApplying(false);
    }
  };

  if (jobLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (jobError || !job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800">Vaga não encontrada</h2>
        <Link href="/jobs" className="mt-4 text-primary-600 hover:underline">
          Voltar para a lista de vagas
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Header Card */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {job.company.logoUrl ? (
                      <img
                        src={job.company.logoUrl}
                        alt={job.company.name}
                        className="w-16 h-16 rounded-lg object-contain bg-gray-50 p-2"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 text-2xl font-bold">
                        {job.company.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                      <p className="text-lg text-gray-600">{job.company.name}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Aberta
                  </span>
                </div>

                {/* AI Matching Banner */}
                {matchInfo && (
                  <div className="bg-dynamic-secondary-transparent border-l-4 border-dynamic-secondary p-4 rounded-r-lg mb-8 flex items-center justify-between">
                    <div>
                      <h3 className="text-dynamic-secondary font-bold text-lg">Compatibilidade Inteligente</h3>
                      <p className="text-gray-700 text-sm">{matchInfo.matchReason}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-dynamic-secondary">{matchInfo.matchScore}%</div>
                      <div className="text-xs text-dynamic-secondary uppercase font-bold text-center">Score</div>
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
                    <p className="text-2xl font-bold text-dynamic-primary">
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
                    className="text-dynamic-primary hover:opacity-80 font-semibold"
                  >
                    Visitar website da empresa →
                  </a>
                )}

                <div className="mt-8 border-t pt-8">
                  <ReviewsSection companyId={job.company.id} />
                </div>
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
                          className="block w-full bg-dynamic-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition text-center"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dynamic-primary"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={applying}
                          className="w-full bg-dynamic-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
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

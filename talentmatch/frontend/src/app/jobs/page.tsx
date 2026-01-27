'use client';

import Header from '@/components/Header';
import JobList from '@/components/JobList';
import { useAuth } from '@/providers/AuthProvider';
import { matchingService } from '@/services/matchingService';
import { jobsService } from '@/services/jobsService';
import { useEffect, useState, useCallback } from 'react';
import { useCandidate } from '@/hooks/useCandidate';

export default function JobsPage() {
  const { user } = useAuth();
  const { profile, getProfileByUserId } = useCandidate();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      if (user?.role === 'CANDIDATE' && profile?.id) {
        // Se for candidato, usar matching service para ter scores
        const matchedJobs = await matchingService.getJobsForCandidate(profile.id);
        setJobs(matchedJobs);
      } else {
        // Caso contrário, apenas listar todas as vagas
        const response = await jobsService.listJobs();
        setJobs(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar vagas');
    } finally {
      setLoading(false);
    }
  }, [user, profile]);

  useEffect(() => {
    if (user?.id && user.role === 'CANDIDATE' && !profile) {
      getProfileByUserId(user.id);
    }
  }, [user, profile, getProfileByUserId]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Explorar Vagas</h1>
            <p className="text-lg text-gray-600">Encontra a tua próxima oportunidade profissional</p>
          </div>

          <JobList
            jobs={jobs}
            loading={loading}
            error={error}
            onClearFilters={() => fetchJobs()}
          />
        </div>
      </main>
    </>
  );
}

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useCandidate } from '@/hooks/useCandidate';
import ProfileSummary from '@/components/candidate/ProfileSummary';
import QuickActions from '@/components/candidate/QuickActions';
import RecentApplications from '@/components/candidate/RecentApplications';
import RecommendedJobs from '@/components/candidate/RecommendedJobs';
import Header from '@/components/Header';
import PageTransition from '@/components/PageTransition';
import DashboardChart from '@/components/DashboardChart';

export default function CandidateDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const {
    profile,
    loading: candidateLoading,
    getProfileByUserId,
    applications,
    recommendedJobs,
    getApplications,
    getRecommendedJobs
  } = useCandidate();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'CANDIDATE')) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && user.id && user.role === 'CANDIDATE') {
      getProfileByUserId(user.id);
    }
  }, [user, getProfileByUserId]);

  useEffect(() => {
    if (profile) {
      getApplications(profile.id);
      getRecommendedJobs(profile.id);
    }
  }, [profile, getApplications, getRecommendedJobs]);

  if (authLoading || (candidateLoading && !profile)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!profile && !candidateLoading) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">Perfil não encontrado.</p>
        <button
          onClick={() => router.push('/candidate/profile')}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg"
        >
          Criar Perfil
        </button>
      </div>
    );
  }

  if (!profile) return null;

  // Cálculo de completitude do perfil
  const calculateCompleteness = () => {
    let score = 0;
    if (profile.headline) score += 20;
    if (profile.about) score += 20;
    if (profile.experiences && profile.experiences.length > 0) score += 20;
    if (profile.educations && profile.educations.length > 0) score += 20;
    if (profile.skills && profile.skills.length > 0) score += 20;
    return score;
  };

  return (
    <>
      <Header />
      <PageTransition>
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
          <h1 className="text-3xl font-bold mb-6">O Meu Painel</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileSummary name={profile.name} profileCompleteness={calculateCompleteness()} />
            <QuickActions />

            {/* Dashboard Chart - Application Stats */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <DashboardChart
                title="Histórico de Candidaturas"
                data={[
                  { name: 'Jan', total: 2 },
                  { name: 'Fev', total: 5 },
                  { name: 'Mar', total: 3 },
                  { name: 'Abr', total: 8 },
                  { name: 'Mai', total: 12 },
                  { name: 'Jun', total: applications.length },
                ]}
                color="#4f46e5"
              />
            </div>

            <RecentApplications applications={applications.map(app => ({
              id: app.id,
              title: app.job?.title || 'Posição Desconhecida',
              company: app.job?.company?.name || 'Empresa Desconhecida',
              status: app.status
            }))} />
          </div>

          <div className="space-y-6">
            <RecommendedJobs jobs={recommendedJobs.map(job => ({
              id: job.id,
              title: job.title || 'Posição Desconhecida',
              company: job.company?.name || 'Empresa Desconhecida',
              matchScore: job.matchScore
            }))} />
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}

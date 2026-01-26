// src/app/candidate/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import ProfileSummary from '@/components/candidate/ProfileSummary';
import QuickActions from '@/components/candidate/QuickActions';
import RecentApplications from '@/components/candidate/RecentApplications';
import RecommendedJobs from '@/components/candidate/RecommendedJobs';
import { Application, Job, Candidate } from '@/types/candidate';
import { fetchCandidateData, fetchRecentApplications, fetchRecommendedJobs } from '@/services/candidate.service';
import { getUserId } from '@/services/auth.service';

export default function CandidateDashboard() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = getUserId();
        if (!userId) {
          throw new Error("User not logged in");
        }

        const candidateData = await fetchCandidateData(userId);
        setCandidate(candidateData);
        
        if (candidateData && candidateData.id) {
            const candidateId = candidateData.id;
            const [applicationsData, jobsData] = await Promise.all([
              fetchRecentApplications(candidateId),
              fetchRecommendedJobs(candidateId),
            ]);
            setApplications(applicationsData);
            setJobs(jobsData);
        } else {
            // If the candidate data doesn't contain an ID, we can't fetch the other data.
            // This might happen if the API response for candidate is different than expected.
            console.warn("Could not retrieve applications or recommended jobs because candidate ID is missing.");
            setApplications([]);
            setJobs([]);
        }

      } catch (error: any) {
        console.error("Failed to load candidate dashboard:", error);
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (!candidate) {
    return <div className="p-8 text-center text-red-500">Failed to load candidate data. Please try again later.</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Candidate Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfileSummary name={candidate.name} profileCompleteness={candidate.profileCompleteness} />
          <QuickActions />
          <RecentApplications applications={applications} />
        </div>
        
        <div className="space-y-6">
          <RecommendedJobs jobs={jobs} />
        </div>
      </div>
    </div>
  );
}
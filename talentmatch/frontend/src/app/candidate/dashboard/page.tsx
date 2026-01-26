"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCandidate } from '@/hooks/useCandidate';
import ProfileSummary from '@/components/candidate/dashboard/ProfileSummary';
import QuickActions from '@/components/candidate/dashboard/QuickActions';
import RecentApplications from '@/components/candidate/dashboard/RecentApplications';
import RecommendedJobs from '@/components/candidate/dashboard/RecommendedJobs';

// Placeholder data for sections that are not yet implemented
const recentApplicationsData = [
  { id: 1, title: "Senior Frontend Developer", company: "TechCorp", status: "In Review" },
  { id: 2, title: "Full-Stack Engineer", company: "Innovate Inc.", status: "Interviewing" },
];

const recommendedJobsData = [
  { id: 1, title: "UI/UX Designer", company: "Creative Minds" },
  { id: 2, title: "Next.js Developer", company: "WebApp Builders" },
];

export default function CandidateDashboard() {
  const { profile, loading, error, getProfileByUserId } = useCandidate();
  const router = useRouter();

  useEffect(() => {
    // If there is an error fetching the profile (e.g., not found), redirect to the profile creation/editing page.
    if (!loading && error) {
      router.push('/candidate/profile');
    }
  }, [loading, error, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    // This can be a brief state before the useEffect redirect happens, or if the profile is null for other reasons.
    return <div>No profile found, redirecting...</div>;
  }
  
  // Calculate profile completeness (simple example)
  const profileCompleteness = () => {
    let score = 0;
    if (profile.headline) score += 20;
    if (profile.about) score += 20;
    if (profile.experiences && profile.experiences.length > 0) score += 20;
    if (profile.educations && profile.educations.length > 0) score += 20;
    if (profile.skills && profile.skills.length > 0) score += 20;
    return score;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Candidate Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfileSummary name={profile.name} profileCompleteness={profileCompleteness()} />
          <QuickActions />
          <RecentApplications applications={recentApplicationsData} />
        </div>
        
        <div className="space-y-6">
          <RecommendedJobs jobs={recommendedJobsData} />
        </div>
      </div>
    </div>
  );
}
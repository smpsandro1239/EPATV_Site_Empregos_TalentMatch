// src/app/candidate/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import ProfileSummary from '@/components/candidate/dashboard/ProfileSummary';
import QuickActions from '@/components/candidate/dashboard/QuickActions';
import RecentApplications from '@/components/candidate/dashboard/RecentApplications';
import RecommendedJobs from '@/components/candidate/dashboard/RecommendedJobs';
import { getCandidateProfile } from '@/services/candidateService';
import { getApplications } from '@/services/applicationService';
import { getJobs } from '@/services/jobService';

// Placeholder data - replace with actual data from your API
const candidateData = {
  name: "John Doe",
  profileCompleteness: 75,
};

const recentApplicationsData = [
  { id: 1, title: "Senior Frontend Developer", company: "TechCorp", status: "In Review" },
  { id: 2, title: "Full-Stack Engineer", company: "Innovate Inc.", status: "Interviewing" },
  { id: 3, title: "React Developer", company: "Solutions Co.", status: "Rejected" },
];

const recommendedJobsData = [
  { id: 1, title: "UI/UX Designer", company: "Creative Minds" },
  { id: 2, title: "Next.js Developer", company: "WebApp Builders" },
  { id: 3, title: "GraphQL Specialist", company: "DataFirst" },
];


export default function CandidateDashboard() {
  // const [candidate, setCandidate] = useState(null);
  // const [applications, setApplications] = useState([]);
  // const [recommendedJobs, setRecommendedJobs] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const profile = await getCandidateProfile();
  //       setCandidate(profile);

  //       const apps = await getApplications({ candidateId: profile.id, limit: 3 });
  //       setApplications(apps.data);

  //       // This would likely be a more sophisticated recommendation endpoint
  //       const jobs = await getJobs({ limit: 5 });
  //       setRecommendedJobs(jobs.data);

  //     } catch (error) {
  //       console.error("Failed to fetch dashboard data:", error);
  //       // Handle error state in the UI
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (!candidate) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Candidate Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfileSummary name={candidateData.name} profileCompleteness={candidateData.profileCompleteness} />
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
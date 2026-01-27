'use client';

import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import ProfileForm from '@/components/candidate/ProfileForm';
import ExperienceSection from '@/components/candidate/ExperienceSection';
import EducationSection from '@/components/candidate/EducationSection';
import SkillsSection from '@/components/candidate/SkillsSection';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header'; // Assuming a common Header component

export default function CandidateProfilePage() {
  const { user, isLoading, authToken } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Redirect if not logged in or not a candidate
  if (!user || user.role !== 'CANDIDATE') {
    router.push('/auth/login');
    return null;
  }

  if (!authToken) {
    // This case should ideally not happen if user is logged in, but as a safeguard
    router.push('/auth/login');
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Your Profile</h1>
            <ProfileForm token={authToken} userId={user.id} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <ExperienceSection token={authToken} userId={user.id} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <EducationSection token={authToken} userId={user.id} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <SkillsSection token={authToken} userId={user.id} />
          </div>
        </div>
      </main>
    </>
  );
}

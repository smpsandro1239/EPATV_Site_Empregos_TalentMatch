'use client';

import Header from '@/components/Header';
import EducationSection from '@/components/candidate/EducationSection';
import ExperienceSection from '@/components/candidate/ExperienceSection';
import ProfileForm from '@/components/candidate/ProfileForm';
import SkillsSection from '@/components/candidate/SkillsSection';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CandidateProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'CANDIDATE')) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user || !token) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Your Profile</h1>
          <p className="text-gray-600">Complete your professional profile to stand out to employers</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium transition ${
                activeTab === 'profile'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`py-4 px-1 border-b-2 font-medium transition ${
                activeTab === 'experience'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`py-4 px-1 border-b-2 font-medium transition ${
                activeTab === 'education'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`py-4 px-1 border-b-2 font-medium transition ${
                activeTab === 'skills'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Skills
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg">
          {activeTab === 'profile' && <ProfileForm token={token} userId={user.id} />}
          {activeTab === 'experience' && <ExperienceSection token={token} userId={user.id} />}
          {activeTab === 'education' && <EducationSection token={token} userId={user.id} />}
          {activeTab === 'skills' && <SkillsSection token={token} userId={user.id} />}
        </div>
      </div>
    </>
  );
}

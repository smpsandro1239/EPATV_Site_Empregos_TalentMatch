// src/components/candidate/ProfileSummary.tsx
import React from 'react';

interface ProfileSummaryProps {
  name: string;
  profileCompleteness: number;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({ name, profileCompleteness }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-bold">Welcome back, {name}!</h2>
    <p className="text-gray-600 mt-2">Your profile is {profileCompleteness}% complete.</p>
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${profileCompleteness}%` }}></div>
    </div>
  </div>
);

export default ProfileSummary;

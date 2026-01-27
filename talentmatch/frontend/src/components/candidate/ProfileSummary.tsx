// src/components/candidate/dashboard/ProfileSummary.tsx
"use client";

import Link from 'next/link';

interface ProfileSummaryProps {
  name: string;
  profileCompleteness: number;
}

const ProfileSummary = ({ name, profileCompleteness }: ProfileSummaryProps) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-bold">Bem-vindo, {name}!</h2>
    <p className="text-gray-600 mt-2">O teu perfil está {profileCompleteness}% completo.</p>
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${profileCompleteness}%` }}></div>
    </div>
    <Link href="/candidate/profile" className="text-blue-600 hover:underline mt-4 inline-block font-medium">
      Completar perfil
    </Link>
  </div>
);

export default ProfileSummary;

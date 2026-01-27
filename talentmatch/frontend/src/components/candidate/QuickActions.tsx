// src/components/candidate/dashboard/QuickActions.tsx
"use client";

import Link from 'next/link';

const QuickActions = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
    <div className="flex flex-col sm:flex-row gap-4">
      <Link href="/candidate/profile" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
        Edit Profile
      </Link>
      <Link href="/candidate/applications" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded text-center">
        View Applications
      </Link>
      <Link href="/jobs" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center">
        Find New Jobs
      </Link>
    </div>
  </div>
);

export default QuickActions;

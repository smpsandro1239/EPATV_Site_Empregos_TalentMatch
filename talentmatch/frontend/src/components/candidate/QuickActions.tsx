// src/components/candidate/QuickActions.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

const QuickActions: React.FC = () => {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push('/candidate/profile');
  };

  const handleViewApplications = () => {
    router.push('/candidate/applications');
  };

  const handleFindNewJobs = () => {
    router.push('/jobs');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleEditProfile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit Profile
        </button>
        <button
          onClick={handleViewApplications}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
        >
          View Applications
        </button>
        <button
          onClick={handleFindNewJobs}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Find New Jobs
        </button>
      </div>
    </div>
  );
};

export default QuickActions;

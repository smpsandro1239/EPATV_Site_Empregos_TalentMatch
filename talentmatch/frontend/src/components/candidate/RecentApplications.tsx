// src/components/candidate/RecentApplications.tsx
import React from 'react';
import { Application } from '@/types/candidate'; // Import from shared types

interface RecentApplicationsProps {
  applications: Application[];
}

const RecentApplications: React.FC<RecentApplicationsProps> = ({ applications }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-xl font-semibold mb-4">Recent Applications</h3>
    <ul className="space-y-4">
      {applications.map(app => (
        <li key={app.id} className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{app.title}</p>
            <p className="text-sm text-gray-500">{app.company}</p>
          </div>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            app.status === 'In Review' ? 'bg-yellow-200 text-yellow-800' :
            app.status === 'Interviewing' ? 'bg-blue-200 text-blue-800' :
            'bg-red-200 text-red-800'
          }`}>
            {app.status}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentApplications;

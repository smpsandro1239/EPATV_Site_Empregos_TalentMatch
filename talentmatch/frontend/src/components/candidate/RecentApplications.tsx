// src/components/candidate/dashboard/RecentApplications.tsx
"use client";

import Link from 'next/link';

interface Application {
    id: string | number;
    title: string;
    company: string;
    status: string;
}

interface RecentApplicationsProps {
    applications: Application[];
}

const RecentApplications = ({ applications }: RecentApplicationsProps) => (
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
            app.status === 'SUBMITTED' || app.status === 'IN_REVIEW' ? 'bg-yellow-100 text-yellow-800' :
            app.status === 'INTERVIEW' ? 'bg-blue-100 text-blue-800' :
            app.status === 'ACCEPTED' || app.status === 'HIRED' || app.status === 'OFFER' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {app.status.replace('_', ' ')}
          </span>
        </li>
      ))}
    </ul>
    <Link href="/candidate/applications" className="text-blue-500 hover:underline mt-4 inline-block">
      View all applications
    </Link>
  </div>
);

export default RecentApplications;

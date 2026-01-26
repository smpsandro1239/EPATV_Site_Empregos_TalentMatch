// src/components/candidate/dashboard/RecentApplications.tsx
"use client";

import Link from 'next/link';

interface Application {
    id: number;
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
            app.status === 'In Review' ? 'bg-yellow-200 text-yellow-800' :
            app.status === 'Interviewing' ? 'bg-blue-200 text-blue-800' :
            'bg-red-200 text-red-800'
          }`}>
            {app.status}
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

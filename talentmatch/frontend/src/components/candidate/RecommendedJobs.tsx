// src/components/candidate/RecommendedJobs.tsx
import React from 'react';
import { Job } from '@/types/candidate'; // Import from shared types

interface RecommendedJobsProps {
  jobs: Job[];
}

const RecommendedJobs: React.FC<RecommendedJobsProps> = ({ jobs }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recommended Jobs</h3>
        <ul className="space-y-4">
            {jobs.map(job => (
                <li key={job.id} className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{job.title}</p>
                        <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                    <button className="text-blue-500 hover:underline">View</button>
                </li>
            ))}
        </ul>
    </div>
);

export default RecommendedJobs;

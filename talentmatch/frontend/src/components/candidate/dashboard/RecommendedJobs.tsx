// src/components/candidate/dashboard/RecommendedJobs.tsx
"use client";

import Link from 'next/link';

interface Job {
    id: number;
    title: string;
    company: string;
}

interface RecommendedJobsProps {
    jobs: Job[];
}

const RecommendedJobs = ({ jobs }: RecommendedJobsProps) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recommended Jobs</h3>
        <ul className="space-y-4">
            {jobs.map(job => (
                <li key={job.id} className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{job.title}</p>
                        <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                    <Link href={`/jobs/${job.id}`} className="text-blue-500 hover:underline">
                        View
                    </Link>
                </li>
            ))}
        </ul>
        <Link href="/jobs" className="text-blue-500 hover:underline mt-4 inline-block">
            Browse all jobs
        </Link>
    </div>
);

export default RecommendedJobs;

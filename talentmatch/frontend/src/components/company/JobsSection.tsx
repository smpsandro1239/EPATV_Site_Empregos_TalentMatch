'use client';

import { useCallback, useEffect, useState } from 'react';

interface Job {
  id: string;
  title: string;
  location: string;
  level: string;
  contractType: string;
  status: string;
  createdAt: string;
}

interface JobsSectionProps {
  token: string;
  companyId: string;
}

export default function JobsSection({ token, companyId }: JobsSectionProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch jobs for this company
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs?companyId=${companyId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data.data || []);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, [token, companyId]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update job');
      await fetchJobs();
    } catch (err: any) {
      setError(err.message || 'Failed to update job status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven't posted any jobs yet</p>
          <a
            href="/company/jobs/new"
            className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700"
          >
            Post a Job
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                  <p className="text-sm text-gray-600">{job.location} • {job.level}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  job.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {job.status}
                </span>
              </div>

              <div className="flex gap-2">
                <a
                  href={`/company/jobs/${job.id}/edit`}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Edit
                </a>
                <button
                  onClick={() => handleStatusChange(job.id, job.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE')}
                  className="text-sm font-medium hover:text-primary-700 text-primary-600"
                >
                  {job.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import Header from '@/components/Header';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Job {
  id: string;
  title: string;
  location: string;
  status: 'DRAFT' | 'PUBLISHED' | 'PAUSED' | 'CLOSED';
  createdAt: string;
  _count?: {
    applications: number;
  };
}

const statusColors: { [key: string]: string } = {
  DRAFT: 'bg-gray-100 text-gray-800',
  PUBLISHED: 'bg-green-100 text-green-800',
  PAUSED: 'bg-yellow-100 text-yellow-800',
  CLOSED: 'bg-red-100 text-red-800',
};

const statusLabels: { [key: string]: string } = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  PAUSED: 'Paused',
  CLOSED: 'Closed',
};

export default function CompanyJobsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [companyId, setCompanyId] = useState('');

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'COMPANY')) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user && user.id) {
      fetchCompanyProfile();
    }
  }, [user]);

  const fetchCompanyProfile = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/by-user/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const profile = await response.json();
        setCompanyId(profile.id);
        fetchJobs(profile.id);
      }
    } catch (err) {
      setError('Failed to load company profile');
      setLoading(false);
    }
  };

  const fetchJobs = async (compId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${compId}/jobs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (err) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      const endpoint = newStatus === 'PUBLISHED' ? 'publish' :
                      newStatus === 'PAUSED' ? 'pause' : 'close';

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/jobs/${jobId}/${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        // Refresh jobs
        fetchJobs(companyId);
      }
    } catch (err) {
      setError('Failed to update job status');
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        fetchJobs(companyId);
      }
    } catch (err) {
      setError('Failed to delete job');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Jobs</h1>
              <p className="text-lg text-gray-600">Manage your job postings</p>
            </div>
            <Link
              href="/company/jobs/new"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Post New Job
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          )}

          {/* Jobs List */}
          {!loading && jobs.length > 0 && (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            statusColors[job.status] || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {statusLabels[job.status] || job.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>📍 {job.location}</span>
                        <span>📅 {new Date(job.createdAt).toLocaleDateString()}</span>
                        {job._count && (
                          <span>👥 {job._count.applications} applications</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/jobs/${job.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View
                      </Link>

                      {job.status === 'DRAFT' && (
                        <button
                          onClick={() => handleStatusChange(job.id, 'PUBLISHED')}
                          className="text-green-600 hover:text-green-700 font-medium"
                        >
                          Publish
                        </button>
                      )}

                      {job.status === 'PUBLISHED' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(job.id, 'PAUSED')}
                            className="text-yellow-600 hover:text-yellow-700 font-medium"
                          >
                            Pause
                          </button>
                          <button
                            onClick={() => handleStatusChange(job.id, 'CLOSED')}
                            className="text-red-600 hover:text-red-700 font-medium"
                          >
                            Close
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Jobs */}
          {!loading && jobs.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-lg text-gray-600 mb-6">You haven't posted any jobs yet</p>
              <Link
                href="/company/jobs/new"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Post Your First Job
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

'use client';

import Header from '@/components/Header';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Application {
  id: string;
  status: 'SUBMITTED' | 'IN_REVIEW' | 'INTERVIEW' | 'REJECTED' | 'OFFER' | 'HIRED';
  message?: string;
  createdAt: string;
  candidate: {
    id: string;
    name: string;
    email?: string;
    headline?: string;
    location?: string;
  };
  job: {
    id: string;
    title: string;
  };
}

const statusColors: { [key: string]: string } = {
  SUBMITTED: 'bg-blue-100 text-blue-800',
  IN_REVIEW: 'bg-yellow-100 text-yellow-800',
  INTERVIEW: 'bg-purple-100 text-purple-800',
  OFFER: 'bg-green-100 text-green-800',
  HIRED: 'bg-emerald-100 text-emerald-800',
  REJECTED: 'bg-red-100 text-red-800',
};

const statusLabels: { [key: string]: string } = {
  SUBMITTED: 'Submitted',
  IN_REVIEW: 'In Review',
  INTERVIEW: 'Interview',
  OFFER: 'Offer',
  HIRED: 'Hired',
  REJECTED: 'Rejected',
};

export default function CompanyCandidatesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

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

  useEffect(() => {
    if (companyId) {
      fetchApplications();
    }
  }, [companyId, filterStatus]);

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
      }
    } catch (err) {
      setError('Failed to load company profile');
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_API_URL}/companies/${companyId}/applications`;

      if (filterStatus) {
        url += `?status=${filterStatus}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch applications');

      const data = await response.json();
      setApplications(Array.isArray(data) ? data : data.data || []);
      setError('');
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to load applications');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchApplications();
      }
    } catch (err) {
      setError('Failed to update application status');
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
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/company/dashboard" className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block">
              ← Back to dashboard
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Candidate Applications</h1>
            <p className="text-lg text-gray-600">Review and manage applications to your job postings</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {applications.filter(a => a.status === 'SUBMITTED').length}
              </p>
              <p className="text-sm text-gray-600">Submitted</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {applications.filter(a => a.status === 'IN_REVIEW').length}
              </p>
              <p className="text-sm text-gray-600">In Review</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">
                {applications.filter(a => a.status === 'INTERVIEW').length}
              </p>
              <p className="text-sm text-gray-600">Interview</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {applications.filter(a => a.status === 'OFFER').length}
              </p>
              <p className="text-sm text-gray-600">Offers</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <p className="text-2xl font-bold text-red-600">
                {applications.filter(a => a.status === 'REJECTED').length}
              </p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex gap-4 items-center">
              <label htmlFor="statusFilter" className="font-medium text-gray-700">
                Filter by status:
              </label>
              <select
                id="statusFilter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Applications</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="HIRED">Hired</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
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

          {/* Applications List */}
          {!loading && applications.length > 0 && (
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {application.candidate.name}
                          </h3>
                          <p className="text-gray-600">{application.candidate.headline || 'No headline'}</p>
                          <p className="text-sm text-gray-500">{application.candidate.location || 'Location not specified'}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-600">
                          Applied to: <span className="font-semibold">{application.job.title}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Applied on {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {application.message && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">Cover Letter:</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {application.message}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="ml-6 flex flex-col items-end gap-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          statusColors[application.status] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {statusLabels[application.status] || application.status}
                      </span>

                      <div className="flex gap-2">
                        {application.status === 'SUBMITTED' && (
                          <button
                            onClick={() => handleStatusChange(application.id, 'IN_REVIEW')}
                            className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                          >
                            Move to Review
                          </button>
                        )}

                        {application.status === 'IN_REVIEW' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(application.id, 'INTERVIEW')}
                              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                            >
                              Schedule Interview
                            </button>
                            <button
                              onClick={() => handleStatusChange(application.id, 'REJECTED')}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {application.status === 'INTERVIEW' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(application.id, 'OFFER')}
                              className="text-green-600 hover:text-green-700 text-sm font-medium"
                            >
                              Make Offer
                            </button>
                            <button
                              onClick={() => handleStatusChange(application.id, 'REJECTED')}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {application.status === 'OFFER' && (
                          <button
                            onClick={() => handleStatusChange(application.id, 'HIRED')}
                            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                          >
                            Mark as Hired
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Applications */}
          {!loading && applications.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-lg text-gray-600 mb-6">
                {filterStatus ? `No applications with status "${filterStatus}"` : 'No applications received yet'}
              </p>
              {!filterStatus && (
                <Link
                  href="/company/jobs/new"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  Post Your First Job
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

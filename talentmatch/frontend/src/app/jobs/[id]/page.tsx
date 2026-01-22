'use client';

import Header from '@/components/Header';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface JobDetail {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirementsMust: string;
  requirementsNice?: string;
  location: string;
  level: string;
  contractType: string;
  remoteType: string;
  salaryMin?: number;
  salaryMax?: number;
  company: {
    id: string;
    name: string;
    logoUrl?: string;
    website?: string;
    description?: string;
    location: string;
  };
  createdAt: string;
  applications: { id: string; status: string }[];
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const jobId = params.id as string;

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [appliedSuccessfully, setAppliedSuccessfully] = useState(false);

  useEffect(() => {
    if (jobId) {
      fetchJobDetail();
    }
  }, [jobId]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}`);
      if (!response.ok) throw new Error('Failed to fetch job');

      const data = await response.json();
      setJob(data);
      setError('');
    } catch (err) {
      console.error('Error fetching job:', err);
      setError('Failed to load job details');
      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (user.role !== 'CANDIDATE') {
      setError('Only candidates can apply for jobs');
      return;
    }

    try {
      setApplying(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          jobId,
          coverLetter,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      setAppliedSuccessfully(true);
      setCoverLetter('');
      setTimeout(() => {
        router.push('/candidate/applications');
      }, 2000);
    } catch (err: any) {
      console.error('Error applying for job:', err);
      setError(err.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </>
    );
  }

  if (error || !job) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
              {error || 'Job not found'}
            </div>
            <Link href="/jobs" className="mt-4 text-primary-600 hover:text-primary-700 font-semibold">
              ← Back to jobs
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/jobs" className="text-primary-600 hover:text-primary-700 font-semibold mb-6 inline-block">
            ← Back to jobs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Header */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
                    <p className="text-lg text-gray-600">{job.company.name}</p>
                  </div>
                  {job.company.logoUrl && (
                    <img
                      src={job.company.logoUrl}
                      alt={job.company.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  )}
                </div>

                {/* Job Meta Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Level</p>
                    <p className="font-semibold text-gray-900">{job.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Contract</p>
                    <p className="font-semibold text-gray-900">{job.contractType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Remote</p>
                    <p className="font-semibold text-gray-900">{job.remoteType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Location</p>
                    <p className="font-semibold text-gray-900">{job.location}</p>
                  </div>
                </div>

                {/* Salary */}
                {job.salaryMin && job.salaryMax && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-1">Salary Range</p>
                    <p className="text-2xl font-bold text-primary-600">
                      ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  {job.description.split('\n').map((line, idx) => (
                    <p key={idx} className="mb-4">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  {job.responsibilities.split('\n').map((line, idx) => (
                    <p key={idx} className="mb-2">
                      {line.startsWith('-') ? (
                        <span>• {line.substring(1).trim()}</span>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <h3 className="font-semibold text-gray-900 mb-2">Must Have:</h3>
                  <ul className="list-disc list-inside space-y-1 mb-6">
                    {job.requirementsMust.split('\n').map((line, idx) => (
                      <li key={idx} className="text-gray-700">
                        {line.replace(/^[-•]\s/, '')}
                      </li>
                    ))}
                  </ul>

                  {job.requirementsNice && (
                    <>
                      <h3 className="font-semibold text-gray-900 mb-2">Nice to Have:</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {job.requirementsNice.split('\n').map((line, idx) => (
                          <li key={idx} className="text-gray-700">
                            {line.replace(/^[-•]\s/, '')}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {job.company.name}</h2>
                <p className="text-gray-700 mb-4">{job.company.description || 'No description available'}</p>
                {job.company.website && (
                  <a
                    href={job.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Visit company website →
                  </a>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Apply Card */}
              <div className="bg-white rounded-lg shadow-md p-8 sticky top-20">
                {appliedSuccessfully ? (
                  <div className="text-center py-8">
                    <div className="text-green-500 text-4xl mb-4">✓</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Application Sent!</h3>
                    <p className="text-gray-600">Redirecting to your applications...</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Apply Now</h3>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                      </div>
                    )}

                    {!user ? (
                      <div className="text-center">
                        <p className="text-gray-600 mb-4">Sign in to apply for this job</p>
                        <Link
                          href="/auth/login"
                          className="block w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition text-center"
                        >
                          Sign In
                        </Link>
                      </div>
                    ) : user.role !== 'CANDIDATE' ? (
                      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
                        <p className="text-sm">Only candidates can apply for jobs</p>
                      </div>
                    ) : (
                      <form onSubmit={handleApply} className="space-y-6">
                        <div>
                          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                            Cover Letter (Optional)
                          </label>
                          <textarea
                            id="coverLetter"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Tell the company why you're a great fit..."
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={applying}
                          className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {applying ? 'Submitting...' : 'Submit Application'}
                        </button>
                      </form>
                    )}
                  </>
                )}
              </div>

              {/* Job Info Card */}
              <div className="bg-gray-50 rounded-lg p-6 mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Job Info</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <span className="block font-medium text-gray-700 mb-1">Posted</span>
                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-gray-700 mb-1">Applications</span>
                    <span>{job.applications.length} submitted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

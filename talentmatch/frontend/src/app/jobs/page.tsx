'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Job {
  id: string;
  title: string;
  description: string;
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
  };
  createdAt: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    level: '',
    contractType: '',
    location: '',
  });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchJobs();
  }, [currentPage, filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: String(itemsPerPage),
        offset: String(currentPage * itemsPerPage),
        ...(filters.level && { level: filters.level }),
        ...(filters.contractType && { contractType: filters.contractType }),
        ...(filters.location && { location: filters.location }),
      });

      const url = searchQuery.length > 0
        ? `${process.env.NEXT_PUBLIC_API_URL}/jobs/search?query=${encodeURIComponent(searchQuery)}&${params}`
        : `${process.env.NEXT_PUBLIC_API_URL}/jobs?${params}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch jobs');

      const data = await response.json();
      setJobs(data.data || []);
      setError('');
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(0);
    fetchJobs();
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(0);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Opportunities</h1>
            <p className="text-lg text-gray-600">Find your next great opportunity</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleSearch} className="space-y-6">
              {/* Search Bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search by job title, company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  Search
                </button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={filters.level}
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Levels</option>
                  <option value="JUNIOR">Junior</option>
                  <option value="MID">Mid-Level</option>
                  <option value="SENIOR">Senior</option>
                </select>

                <select
                  value={filters.contractType}
                  onChange={(e) => handleFilterChange('contractType', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Contract Types</option>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="FREELANCE">Freelance</option>
                  <option value="CONTRACT">Contract</option>
                </select>

                <input
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </form>
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

          {/* Jobs Grid */}
          {!loading && jobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {jobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 h-full cursor-pointer">
                    {/* Company Info */}
                    <div className="flex items-start justify-between mb-4">
                      {job.company.logoUrl && (
                        <img
                          src={job.company.logoUrl}
                          alt={job.company.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded">
                        {job.level}
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>

                    {/* Company Name */}
                    <p className="text-gray-600 text-sm mb-3">{job.company.name}</p>

                    {/* Job Description Snippet */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Job Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-20">📍 Location:</span>
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-20">💼 Type:</span>
                        <span>{job.contractType}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-20">🌐 Remote:</span>
                        <span>{job.remoteType}</span>
                      </div>
                      {job.salaryMin && job.salaryMax && (
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="w-20">💰 Salary:</span>
                          <span>${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Posted Date */}
                    <p className="text-xs text-gray-500">
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* No Jobs Found */}
          {!loading && jobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No jobs found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilters({ level: '', contractType: '', location: '' });
                  setCurrentPage(0);
                }}
                className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {!loading && jobs.length > 0 && (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage + 1}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={jobs.length < itemsPerPage}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

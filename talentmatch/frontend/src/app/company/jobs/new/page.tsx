'use client';

import Header from '@/components/Header';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function NewJobPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [companyId, setCompanyId] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [improving, setImproving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    responsibilities: '',
    requirementsMust: '',
    requirementsNice: '',
    location: '',
    remoteType: 'ON_SITE',
    contractType: 'FULL_TIME',
    level: 'MID',
    salaryMin: '',
    salaryMax: '',
  });

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
      }
    } catch (err) {
      setError('Failed to load company profile');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAiImprove = async () => {
    if (!formData.description) {
      toast.error('Escreve uma descrição primeiro!');
      return;
    }

    try {
      setImproving(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/improve-job-description`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ description: formData.description }),
      });

      if (!response.ok) throw new Error('Falha ao melhorar descrição');

      const data = await response.json();
      setFormData(prev => ({ ...prev, description: data.description }));
      toast.success('Descrição melhorada com IA!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setImproving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const data = {
        title: formData.title,
        description: formData.description,
        responsibilities: formData.responsibilities,
        requirementsMust: formData.requirementsMust,
        requirementsNice: formData.requirementsNice,
        location: formData.location,
        remoteType: formData.remoteType,
        contractType: formData.contractType,
        level: formData.level,
        salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : undefined,
        salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : undefined,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${companyId}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create job');
      }

      router.push('/company/jobs');
    } catch (err: any) {
      setError(err.message || 'Failed to create job');
    } finally {
      setSaving(false);
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
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/company/jobs" className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block">
              ← Back to jobs
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Post New Job</h1>
            <p className="text-lg text-gray-600">Create a compelling job posting to attract top talent</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      id="location"
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Lisbon, Portugal"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Descrição da Vaga *
                    </label>
                    <button
                      type="button"
                      onClick={handleAiImprove}
                      disabled={improving}
                      className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition font-bold"
                    >
                      {improving ? 'A melhorar...' : '✨ Melhorar com IA'}
                    </button>
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Descreve a função, a equipa e o que o candidato irá fazer..."
                  />
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Responsibilities</h2>
                <div>
                  <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700 mb-2">
                    Key Responsibilities *
                  </label>
                  <textarea
                    id="responsibilities"
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="List the main responsibilities and duties..."
                  />
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="requirementsMust" className="block text-sm font-medium text-gray-700 mb-2">
                      Must Have Requirements *
                    </label>
                    <textarea
                      id="requirementsMust"
                      name="requirementsMust"
                      value={formData.requirementsMust}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Essential skills and experience..."
                    />
                  </div>

                  <div>
                    <label htmlFor="requirementsNice" className="block text-sm font-medium text-gray-700 mb-2">
                      Nice to Have Requirements
                    </label>
                    <textarea
                      id="requirementsNice"
                      name="requirementsNice"
                      value={formData.requirementsNice}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Additional skills that would be beneficial..."
                    />
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level *
                    </label>
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="JUNIOR">Junior</option>
                      <option value="MID">Mid-Level</option>
                      <option value="SENIOR">Senior</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contractType" className="block text-sm font-medium text-gray-700 mb-2">
                      Contract Type *
                    </label>
                    <select
                      id="contractType"
                      name="contractType"
                      value={formData.contractType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="FULL_TIME">Full Time</option>
                      <option value="PART_TIME">Part Time</option>
                      <option value="FREELANCE">Freelance</option>
                      <option value="CONTRACT">Contract</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="remoteType" className="block text-sm font-medium text-gray-700 mb-2">
                      Remote Work *
                    </label>
                    <select
                      id="remoteType"
                      name="remoteType"
                      value={formData.remoteType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="FULLY_REMOTE">Fully Remote</option>
                      <option value="HYBRID">Hybrid</option>
                      <option value="ON_SITE">On-Site</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Compensation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="salaryMin" className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Salary (€)
                    </label>
                    <input
                      id="salaryMin"
                      type="number"
                      name="salaryMin"
                      value={formData.salaryMin}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., 30000"
                    />
                  </div>

                  <div>
                    <label htmlFor="salaryMax" className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Salary (€)
                    </label>
                    <input
                      id="salaryMax"
                      type="number"
                      name="salaryMax"
                      value={formData.salaryMax}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., 50000"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
                <Link
                  href="/company/jobs"
                  className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Creating Job...' : 'Create Job Posting'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

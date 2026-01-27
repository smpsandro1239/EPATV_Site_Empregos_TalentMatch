'use client';

import { useEffect, useState } from 'react';
import { CandidateProfileDetail } from '@/types/candidate'; // Import the shared interface
import { apiClient } from '@/services/api';

interface ProfileFormProps {
  token: string;
  userId: string;
}

export default function ProfileForm({ token, userId }: ProfileFormProps) {
  const [profile, setProfile] = useState<CandidateProfileDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    headline: '',
    location: '',
    about: '',
    cvUrl: '',
    salaryMin: '', // Should be string for input
    salaryMax: '', // Should be string for input
    remotePreference: '', // Should be string for select
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates/by-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData({
          name: data.name,
          headline: data.headline || '',
          location: data.location,
          about: data.about || '',
          cvUrl: data.cvUrl || '',
          salaryMin: data.salaryMin?.toString() || '',
          salaryMax: data.salaryMax?.toString() || '',
          remotePreference: data.remotePreference || '',
        });
      } else if (response.status === 404) {
        // Profile doesn't exist yet, create a new one
        setProfile(null);
      }
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError('');
      const { url } = await apiClient.uploadFile('/uploads/cv', file);
      setFormData(prev => ({ ...prev, cvUrl: `${process.env.NEXT_PUBLIC_API_URL}${url}` }));
      setSuccess('CV carregado com sucesso!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Erro no upload do CV');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const data = {
        name: formData.name,
        headline: formData.headline,
        location: formData.location,
        about: formData.about,
        cvUrl: formData.cvUrl,
        salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : undefined,
        salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : undefined,
        remotePreference: formData.remotePreference || undefined,
      };

      const method = profile ? 'PUT' : 'POST';
      const url = profile ? `${process.env.NEXT_PUBLIC_API_URL}/candidates/${profile.id}` : `${process.env.NEXT_PUBLIC_API_URL}/candidates`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save profile');
      }

      const result = await response.json();
      setProfile(result);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="John Doe"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="City, Country"
            />
          </div>
        </div>

        {/* Headline */}
        <div>
          <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-2">Professional Headline</label>
          <input
            id="headline"
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            placeholder="e.g., Senior Software Engineer"
          />
        </div>

        {/* About */}
        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* CV Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Curriculum Vitae (PDF)</label>
          <div className="flex items-center gap-4">
            {formData.cvUrl && (
              <a
                href={formData.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline text-sm font-medium"
              >
                Ver CV Atual
              </a>
            )}
            <label className="cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              {uploading ? 'A carregar...' : 'Fazer Upload de CV'}
              <input type="file" className="hidden" onChange={handleCvUpload} accept=".pdf,.doc,.docx" disabled={uploading} />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Salary Min */}
          <div>
            <label htmlFor="salaryMin" className="block text-sm font-medium text-gray-700 mb-2">Minimum Salary (€)</label>
            <input
              id="salaryMin"
              type="number"
              name="salaryMin"
              value={formData.salaryMin}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="20000"
            />
          </div>

          {/* Salary Max */}
          <div>
            <label htmlFor="salaryMax" className="block text-sm font-medium text-gray-700 mb-2">Maximum Salary (€)</label>
            <input
              id="salaryMax"
              type="number"
              name="salaryMax"
              value={formData.salaryMax}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="60000"
            />
          </div>
        </div>

        {/* Remote Preference */}
        <div>
          <label htmlFor="remotePreference" className="block text-sm font-medium text-gray-700 mb-2">Remote Preference</label>
          <select
            id="remotePreference"
            name="remotePreference"
            value={formData.remotePreference}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">No preference</option>
            <option value="FULLY_REMOTE">Fully Remote</option>
            <option value="HYBRID">Hybrid</option>
            <option value="ON_SITE">On-Site</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:bg-gray-400"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import { companyService } from '@/services/companyService';
import { useCallback, useEffect, useState } from 'react';

interface CompanyProfile {
  id: string;
  name: string;
  location: string;
  website?: string;
  description?: string;
  industry?: string;
  size?: string;
  logoUrl?: string;
}

interface ProfileFormProps {
  token: string;
  userId: string;
}

export default function CompanyProfileForm({ token, userId }: ProfileFormProps) {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<Partial<CompanyProfile>>({});

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await companyService.getProfile(token);
      setProfile(data);
      setFormData(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await companyService.updateProfile(formData as CompanyProfile, token);
      setProfile(formData as CompanyProfile);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
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
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          Profile updated successfully!
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Company Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
          Website
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
          Industry
        </label>
        <select
          id="industry"
          name="industry"
          value={formData.industry || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select industry</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Retail">Retail</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
          Company Size
        </label>
        <select
          id="size"
          name="size"
          value={formData.size || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select size</option>
          <option value="1-50">1-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-500">201-500 employees</option>
          <option value="500+">500+ employees</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Tell us about your company..."
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}

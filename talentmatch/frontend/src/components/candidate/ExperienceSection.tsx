'use client';

import { useEffect, useState } from 'react';

interface ExperienceSectionProps {
  token: string;
  userId: string;
}

interface Experience {
  id: string;
  companyName: string;
  role: string;
  description?: string;
  startDate: string;
  endDate?: string;
}

export default function ExperienceSection({ token, userId }: ExperienceSectionProps) {
  const [candidateId, setCandidateId] = useState('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates/by-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const profile = await response.json();
        setCandidateId(profile.id);
        fetchExperiences(profile.id);
      }
    } catch (err) {
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  const fetchExperiences = async (candId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates/${candId}/experiences`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (err) {
      setError('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      role: '',
      description: '',
      startDate: '',
      endDate: '',
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const data = {
        companyName: formData.companyName,
        role: formData.role,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate || null,
      };

      const url = editingId
        ? `${process.env.NEXT_PUBLIC_API_URL}/candidates/${candidateId}/experiences/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/candidates/${candidateId}/experiences`;

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save experience');
      }

      await fetchExperiences(candidateId);
      resetForm();
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || 'Failed to save experience');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (expId: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates/${candidateId}/experiences/${expId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete experience');
      }

      await fetchExperiences(candidateId);
    } catch (err: any) {
      setError(err.message || 'Failed to delete experience');
    }
  };

  const handleEdit = (exp: Experience) => {
    setFormData({
      companyName: exp.companyName,
      role: exp.role,
      description: exp.description || '',
      startDate: exp.startDate.split('T')[0],
      endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
    });
    setEditingId(exp.id);
    setShowForm(true);
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
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Professional Experience</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) resetForm();
          }}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          {showForm ? 'Cancel' : 'Add Experience'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Company Ltd."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Software Engineer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
              <small className="text-gray-500">Leave empty if still working here</small>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:bg-gray-400"
            >
              {saving ? 'Saving...' : editingId ? 'Update Experience' : 'Add Experience'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {experiences.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No experiences yet. Add one to get started!</p>
        ) : (
          experiences.map((exp) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-gray-600">{exp.companyName}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
              </p>
              {exp.description && <p className="text-gray-700">{exp.description}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

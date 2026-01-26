'use client';

import { useEffect, useState } from 'react';
import { Education } from '@/types/candidate'; // Import the shared interface

interface EducationSectionProps {
  token: string;
  userId: string;
}

export default function EducationSection({ token, userId }: EducationSectionProps) {
  const [candidateId, setCandidateId] = useState('');
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
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
        fetchEducations(profile.id);
      }
    } catch (err) {
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  const fetchEducations = async (candId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates/${candId}/educations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEducations(data);
      }
    } catch (err) {
      setError('Failed to load educations');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field: '',
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
        institution: formData.institution,
        degree: formData.degree,
        field: formData.field,
        startDate: formData.startDate,
        endDate: formData.endDate || null,
      };

      const url = editingId
        ? `${process.env.NEXT_PUBLIC_API_URL}/candidates/${candidateId}/educations/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/candidates/${candidateId}/educations`;

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
        throw new Error(error.message || 'Failed to save education');
      }

      await fetchEducations(candidateId);
      resetForm();
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || 'Failed to save education');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (eduId: string) => {
    if (!confirm('Are you sure you want to delete this education?')) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates/${candidateId}/educations/${eduId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete education');
      }

      await fetchEducations(candidateId);
    } catch (err: any) {
      setError(err.message || 'Failed to delete education');
    }
  };

  const handleEdit = (edu: Education) => {
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field || '',
      startDate: edu.startDate.split('T')[0],
      endDate: edu.endDate ? edu.endDate.split('T')[0] : '',
    });
    setEditingId(edu.id);
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
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) resetForm();
          }}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          {showForm ? 'Cancel' : 'Add Education'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Institution *</label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="University Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Bachelor's, Master's, etc."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
            <input
              type="text"
              name="field"
              value={formData.field}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="Computer Science, Business Administration, etc."
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
              <small className="text-gray-500">Leave empty if still studying</small>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:bg-gray-400"
            >
              {saving ? 'Saving...' : editingId ? 'Update Education' : 'Add Education'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {educations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No education entries yet. Add one to get started!</p>
        ) : (
          educations.map((edu) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.field && <p className="text-sm text-gray-500">{edu.field}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(edu.startDate).toLocaleDateString()} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

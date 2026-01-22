'use client';

import { useEffect, useState } from 'react';

interface SkillsSectionProps {
  token: string;
  userId: string;
}

interface Skill {
  id: string;
  skillId: string;
  level: 'JUNIOR' | 'MID' | 'SENIOR';
  yearsExp?: number;
  skill: {
    id: string;
    name: string;
  };
}

interface AvailableSkill {
  id: string;
  name: string;
}

export default function SkillsSection({ token, userId }: SkillsSectionProps) {
  const [candidateId, setCandidateId] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [availableSkills, setAvailableSkills] = useState<AvailableSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [selectedSkill, setSelectedSkill] = useState('');
  const [level, setLevel] = useState<'JUNIOR' | 'MID' | 'SENIOR'>('MID');
  const [yearsExp, setYearsExp] = useState('');

  useEffect(() => {
    fetchProfile();
    fetchAvailableSkills();
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
        fetchCandidateSkills(profile.id);
      }
    } catch (err) {
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  const fetchAvailableSkills = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAvailableSkills(data);
      }
    } catch (err) {
      console.log('Failed to load available skills');
    }
  };

  const fetchCandidateSkills = async (candId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates/${candId}/skills`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch (err) {
      setError('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSkill) return;

    setSaving(true);
    setError('');

    try {
      const data = {
        skillId: selectedSkill,
        level,
        yearsExp: yearsExp ? parseInt(yearsExp) : undefined,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates/${candidateId}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add skill');
      }

      await fetchCandidateSkills(candidateId);
      setSelectedSkill('');
      setLevel('MID');
      setYearsExp('');
    } catch (err: any) {
      setError(err.message || 'Failed to add skill');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveSkill = async (skillId: string) => {
    if (!confirm('Are you sure you want to remove this skill?')) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates/${candidateId}/skills/${skillId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove skill');
      }

      await fetchCandidateSkills(candidateId);
    } catch (err: any) {
      setError(err.message || 'Failed to remove skill');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const alreadyAddedSkills = new Set(skills.map((s) => s.skillId));
  const availableToAdd = availableSkills.filter((s) => !alreadyAddedSkills.has(s.id));

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'JUNIOR':
        return 'bg-blue-100 text-blue-800';
      case 'MID':
        return 'bg-yellow-100 text-yellow-800';
      case 'SENIOR':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Skills</h2>

      {availableToAdd.length > 0 && (
        <form onSubmit={handleAddSkill} className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Skill *</label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Choose a skill...</option>
                {availableToAdd.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level *</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as 'JUNIOR' | 'MID' | 'SENIOR')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="JUNIOR">Junior</option>
                <option value="MID">Mid-Level</option>
                <option value="SENIOR">Senior</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <input
                type="number"
                min="0"
                max="50"
                value={yearsExp}
                onChange={(e) => setYearsExp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., 3"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={saving || !selectedSkill}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:bg-gray-400"
              >
                {saving ? 'Adding...' : 'Add Skill'}
              </button>
            </div>
          </div>
        </form>
      )}

      <div>
        {skills.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No skills added yet. Add one to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{skill.skill.name}</h3>
                  <button
                    onClick={() => handleRemoveSkill(skill.skillId)}
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                  {skill.yearsExp && (
                    <span className="text-sm text-gray-500">{skill.yearsExp} years</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { candidateService, type CandidateEducation, type CandidateExperience, type CandidateProfile, type CandidateSkill } from '@/services/candidateService';
import { useCallback, useState } from 'react';
import { useAuth } from './useAuth';

interface UseCandidateReturn {
  profile: CandidateProfile | null;
  experiences: CandidateExperience[];
  educations: CandidateEducation[];
  skills: CandidateSkill[];
  loading: boolean;
  error: string | null;
  createProfile: (data: Partial<CandidateProfile>) => Promise<CandidateProfile | null>;
  updateProfile: (id: string, data: Partial<CandidateProfile>) => Promise<CandidateProfile | null>;
  getProfile: (id: string) => Promise<CandidateProfile | null>;
  addExperience: (profileId: string, data: Partial<CandidateExperience>) => Promise<void>;
  updateExperience: (expId: string, data: Partial<CandidateExperience>) => Promise<void>;
  deleteExperience: (expId: string) => Promise<void>;
  addEducation: (profileId: string, data: Partial<CandidateEducation>) => Promise<void>;
  updateEducation: (eduId: string, data: Partial<CandidateEducation>) => Promise<void>;
  deleteEducation: (eduId: string) => Promise<void>;
  addSkill: (profileId: string, skillId: string, level: string) => Promise<void>;
  removeSkill: (profileId: string, skillId: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const useCandidate = (): UseCandidateReturn => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [experiences, setExperiences] = useState<CandidateExperience[]>([]);
  const [educations, setEducations] = useState<CandidateEducation[]>([]);
  const [skills, setSkills] = useState<CandidateSkill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfile = useCallback(async (id: string): Promise<CandidateProfile | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await candidateService.getProfile(id);
      setProfile(data);
      setExperiences(data.experiences || []);
      setEducations(data.educations || []);
      setSkills(data.skills || []);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProfile = useCallback(async (data: Partial<CandidateProfile>): Promise<CandidateProfile | null> => {
    setLoading(true);
    setError(null);
    try {
      const newProfile = await candidateService.createProfile(data);
      setProfile(newProfile);
      return newProfile;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (id: string, data: Partial<CandidateProfile>): Promise<CandidateProfile | null> => {
    setLoading(true);
    setError(null);
    try {
      const updated = await candidateService.updateProfile(id, data);
      setProfile(updated);
      return updated;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const addExperience = useCallback(async (profileId: string, data: Partial<CandidateExperience>) => {
    try {
      const exp = await candidateService.addExperience(profileId, data);
      setExperiences([...experiences, exp]);
    } catch (err: any) {
      setError(err.message);
    }
  }, [experiences]);

  const updateExperience = useCallback(async (expId: string, data: Partial<CandidateExperience>) => {
    try {
      const updated = await candidateService.updateExperience(expId, data);
      setExperiences(experiences.map(e => e.id === expId ? updated : e));
    } catch (err: any) {
      setError(err.message);
    }
  }, [experiences]);

  const deleteExperience = useCallback(async (expId: string) => {
    try {
      await candidateService.deleteExperience(expId);
      setExperiences(experiences.filter(e => e.id !== expId));
    } catch (err: any) {
      setError(err.message);
    }
  }, [experiences]);

  const addEducation = useCallback(async (profileId: string, data: Partial<CandidateEducation>) => {
    try {
      const edu = await candidateService.addEducation(profileId, data);
      setEducations([...educations, edu]);
    } catch (err: any) {
      setError(err.message);
    }
  }, [educations]);

  const updateEducation = useCallback(async (eduId: string, data: Partial<CandidateEducation>) => {
    try {
      const updated = await candidateService.updateEducation(eduId, data);
      setEducations(educations.map(e => e.id === eduId ? updated : e));
    } catch (err: any) {
      setError(err.message);
    }
  }, [educations]);

  const deleteEducation = useCallback(async (eduId: string) => {
    try {
      await candidateService.deleteEducation(eduId);
      setEducations(educations.filter(e => e.id !== eduId));
    } catch (err: any) {
      setError(err.message);
    }
  }, [educations]);

  const addSkill = useCallback(async (profileId: string, skillId: string, level: string) => {
    try {
      const skill = await candidateService.addSkill(profileId, skillId, level);
      setSkills([...skills, skill]);
    } catch (err: any) {
      setError(err.message);
    }
  }, [skills]);

  const removeSkill = useCallback(async (profileId: string, skillId: string) => {
    try {
      await candidateService.removeSkill(profileId, skillId);
      setSkills(skills.filter(s => s.skillId !== skillId));
    } catch (err: any) {
      setError(err.message);
    }
  }, [skills]);

  const refreshProfile = useCallback(async () => {
    if (profile) {
      await getProfile(profile.id);
    }
  }, [profile, getProfile]);

  return {
    profile,
    experiences,
    educations,
    skills,
    loading,
    error,
    createProfile,
    updateProfile,
    getProfile,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    removeSkill,
    refreshProfile,
  };
};

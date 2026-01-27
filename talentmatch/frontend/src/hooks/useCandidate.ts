'use client';

import { candidateService, type CandidateEducation, type CandidateExperience, type CandidateProfile, type CandidateSkill } from '@/services/candidateService';
import { applicationsService, type Application } from '@/services/applicationsService';
import { matchingService, type MatchResult } from '@/services/matchingService';
import { useCallback, useState } from 'react';

interface UseCandidateReturn {
  profile: CandidateProfile | null;
  experiences: CandidateExperience[];
  educations: CandidateEducation[];
  skills: CandidateSkill[];
  applications: Application[];
  recommendedJobs: MatchResult[];
  loading: boolean;
  error: string | null;
  createProfile: (data: Partial<CandidateProfile>) => Promise<CandidateProfile | null>;
  updateProfile: (id: string, data: Partial<CandidateProfile>) => Promise<CandidateProfile | null>;
  getProfile: (id: string) => Promise<CandidateProfile | null>;
  getProfileByUserId: (userId: string) => Promise<CandidateProfile | null>;
  addExperience: (profileId: string, data: Partial<CandidateExperience>) => Promise<void>;
  updateExperience: (profileId: string, expId: string, data: Partial<CandidateExperience>) => Promise<void>;
  deleteExperience: (profileId: string, expId: string) => Promise<void>;
  addEducation: (profileId: string, data: Partial<CandidateEducation>) => Promise<void>;
  updateEducation: (profileId: string, eduId: string, data: Partial<CandidateEducation>) => Promise<void>;
  deleteEducation: (profileId: string, eduId: string) => Promise<void>;
  addSkill: (profileId: string, skillId: string, level: 'JUNIOR' | 'MID' | 'SENIOR') => Promise<void>;
  removeSkill: (profileId: string, skillId: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  getApplications: (candidateId: string) => Promise<void>;
  getRecommendedJobs: (candidateId: string) => Promise<void>;
}

export const useCandidate = (): UseCandidateReturn => {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [experiences, setExperiences] = useState<CandidateExperience[]>([]);
  const [educations, setEducations] = useState<CandidateEducation[]>([]);
  const [skills, setSkills] = useState<CandidateSkill[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<MatchResult[]>([]);
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

  const getProfileByUserId = useCallback(async (userId: string): Promise<CandidateProfile | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await candidateService.getProfileByUserId(userId);
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

  const updateExperience = useCallback(async (profileId: string, expId: string, data: Partial<CandidateExperience>) => {
    try {
      const updated = await candidateService.updateExperience(profileId, expId, data);
      setExperiences(experiences.map(e => e.id === expId ? updated : e));
    } catch (err: any) {
      setError(err.message);
    }
  }, [experiences]);

  const deleteExperience = useCallback(async (profileId: string, expId: string) => {
    try {
      await candidateService.deleteExperience(profileId, expId);
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

  const updateEducation = useCallback(async (profileId: string, eduId: string, data: Partial<CandidateEducation>) => {
    try {
      const updated = await candidateService.updateEducation(profileId, eduId, data);
      setEducations(educations.map(e => e.id === eduId ? updated : e));
    } catch (err: any) {
      setError(err.message);
    }
  }, [educations]);

  const deleteEducation = useCallback(async (profileId: string, eduId: string) => {
    try {
      await candidateService.deleteEducation(profileId, eduId);
      setEducations(educations.filter(e => e.id !== eduId));
    } catch (err: any) {
      setError(err.message);
    }
  }, [educations]);

  const addSkill = useCallback(async (profileId: string, skillId: string, level: 'JUNIOR' | 'MID' | 'SENIOR') => {
    try {
      const skill = await candidateService.addSkill(profileId, { skillId, level });
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

  const getApplications = useCallback(async (candidateId: string) => {
    try {
      const data = await applicationsService.getCandidateApplications(candidateId, 5);
      setApplications(data);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  const getRecommendedJobs = useCallback(async (candidateId: string) => {
    try {
      const data = await matchingService.getJobsForCandidate(candidateId, 5);
      setRecommendedJobs(data);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  return {
    profile,
    experiences,
    educations,
    skills,
    applications,
    recommendedJobs,
    loading,
    error,
    createProfile,
    updateProfile,
    getProfile,
    getProfileByUserId,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    removeSkill,
    refreshProfile,
    getApplications,
    getRecommendedJobs,
  };
};

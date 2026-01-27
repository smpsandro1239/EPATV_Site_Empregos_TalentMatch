'use client';

import { companiesService as companyService, type Company, type Job } from '@/services/companiesService';
import { useCallback, useState } from 'react';

interface UseCompanyReturn {
  company: Company | null;
  jobs: Job[];
  loading: boolean;
  error: string | null;
  createProfile: (data: Partial<Company>) => Promise<Company | null>;
  updateProfile: (id: string, data: Partial<Company>) => Promise<Company | null>;
  getProfile: (id: string) => Promise<Company | null>;
  createJob: (companyId: string, data: Partial<Job>) => Promise<Job | null>;
  updateJob: (jobId: string, data: Partial<Job>) => Promise<Job | null>;
  deleteJob: (jobId: string) => Promise<void>;
  publishJob: (jobId: string) => Promise<void>;
  pauseJob: (jobId: string) => Promise<void>;
  closeJob: (jobId: string) => Promise<void>;
  getCompanyJobs: (companyId: string) => Promise<void>;
  refreshJobs: () => Promise<void>;
}

export const useCompany = (): UseCompanyReturn => {
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfile = useCallback(async (id: string): Promise<Company | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await companyService.getProfileById(id);
      setCompany(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProfile = useCallback(async (data: Partial<Company>): Promise<Company | null> => {
    setLoading(true);
    setError(null);
    try {
      const newCompany = await companyService.createProfile(data);
      setCompany(newCompany);
      return newCompany;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (id: string, data: Partial<Company>): Promise<Company | null> => {
    setLoading(true);
    setError(null);
    try {
      const updated = await companyService.updateProfile(id, data);
      setCompany(updated);
      return updated;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createJob = useCallback(async (companyId: string, data: Partial<Job>): Promise<Job | null> => {
    try {
      const job = await companyService.createJob(companyId, data);
      setJobs([...jobs, job]);
      return job;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  }, [jobs]);

  const updateJob = useCallback(async (jobId: string, data: Partial<Job>): Promise<Job | null> => {
    try {
      const updated = await companyService.updateJob(jobId, data);
      setJobs(jobs.map(j => j.id === jobId ? updated : j));
      return updated;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  }, [jobs]);

  const deleteJob = useCallback(async (jobId: string) => {
    try {
      await companyService.deleteJob(jobId);
      setJobs(jobs.filter(j => j.id !== jobId));
    } catch (err: any) {
      setError(err.message);
    }
  }, [jobs]);

  const publishJob = useCallback(async (jobId: string) => {
    try {
      const updated = await companyService.publishJob(jobId);
      setJobs(jobs.map(j => j.id === jobId ? updated : j));
    } catch (err: any) {
      setError(err.message);
    }
  }, [jobs]);

  const pauseJob = useCallback(async (jobId: string) => {
    try {
      const updated = await companyService.pauseJob(jobId);
      setJobs(jobs.map(j => j.id === jobId ? updated : j));
    } catch (err: any) {
      setError(err.message);
    }
  }, [jobs]);

  const closeJob = useCallback(async (jobId: string) => {
    try {
      const updated = await companyService.closeJob(jobId);
      setJobs(jobs.map(j => j.id === jobId ? updated : j));
    } catch (err: any) {
      setError(err.message);
    }
  }, [jobs]);

  const getCompanyJobs = useCallback(async (companyId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await companyService.getCompanyJobs(companyId);
      setJobs(response.data || response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshJobs = useCallback(async () => {
    if (company) {
      await getCompanyJobs(company.id);
    }
  }, [company, getCompanyJobs]);

  return {
    company,
    jobs,
    loading,
    error,
    createProfile,
    updateProfile,
    getProfile,
    createJob,
    updateJob,
    deleteJob,
    publishJob,
    pauseJob,
    closeJob,
    getCompanyJobs,
    refreshJobs,
  };
};

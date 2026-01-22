'use client';

import { useState, useEffect, useCallback } from 'react';
import { jobsService, type Job, type JobSearchParams, type JobsResponse } from '@/services/jobsService';

interface UseJobsReturn {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  total: number;
  hasMore: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchJobs: (params: JobSearchParams) => Promise<void>;
  getJobDetails: (id: string) => Promise<Job | null>;
  refetch: () => Promise<void>;
}

export const useJobs = (initialParams?: JobSearchParams): UseJobsReturn => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [params, setParams] = useState<JobSearchParams>(initialParams || { limit: 20, offset: 0 });

  const fetchJobs = useCallback(async (searchParams: JobSearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await jobsService.listJobs(
        searchParams.limit || 20,
        searchParams.offset || 0
      );
      setJobs(response.data);
      setTotal(response.pagination.total);
      setHasMore(response.pagination.hasMore);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar vagas');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchJobs = useCallback(async (searchParams: JobSearchParams) => {
    setLoading(true);
    setError(null);
    try {
      if (searchParams.query) {
        const response = await jobsService.searchJobs(searchParams);
        setJobs(response.data);
        setTotal(response.pagination.total);
        setHasMore(response.pagination.hasMore);
      } else {
        await fetchJobs(searchParams);
      }
      setParams(searchParams);
      setCurrentPage(0);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar vagas');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [fetchJobs]);

  const getJobDetails = useCallback(async (id: string): Promise<Job | null> => {
    try {
      return await jobsService.getJobById(id);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar detalhes da vaga');
      return null;
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchJobs(params);
  }, [params, fetchJobs]);

  useEffect(() => {
    fetchJobs(params);
  }, []);

  return {
    jobs,
    loading,
    error,
    total,
    hasMore,
    currentPage,
    setCurrentPage,
    searchJobs,
    getJobDetails,
    refetch,
  };
};

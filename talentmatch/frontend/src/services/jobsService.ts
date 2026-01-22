import { axiosInstance } from './api';

export interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirementsMust: string;
  requirementsNice?: string;
  location: string;
  level: string;
  contractType: string;
  remoteType: string;
  salaryMin?: number;
  salaryMax?: number;
  status: string;
  companyId: string;
  company?: {
    id: string;
    name: string;
    logoUrl?: string;
    location: string;
    website?: string;
    description?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface JobSearchParams {
  query?: string;
  level?: string;
  contractType?: string;
  location?: string;
  remoteType?: string;
  limit?: number;
  offset?: number;
}

export interface JobsResponse {
  data: Job[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export const jobsService = {
  // Listar todas as vagas
  listJobs: async (limit = 20, offset = 0): Promise<JobsResponse> => {
    try {
      const response = await axiosInstance.get('/jobs', {
        params: { limit, offset },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error listing jobs:', error);
      throw error;
    }
  },

  // Buscar vagas com filtros
  searchJobs: async (params: JobSearchParams): Promise<JobsResponse> => {
    try {
      const response = await axiosInstance.get('/jobs/search', { params });
      return response.data;
    } catch (error: any) {
      console.error('Error searching jobs:', error);
      throw error;
    }
  },

  // Obter detalhes de uma vaga
  getJob: async (jobId: string): Promise<Job> => {
    try {
      const response = await axiosInstance.get(`/jobs/${jobId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting job:', error);
      throw error;
    }
  },

  // Obter vagas recomendadas para candidato
  getRecommendedJobs: async (candidateId: string, limit = 10): Promise<Job[]> => {
    try {
      const response = await axiosInstance.get(`/jobs/recommended/${candidateId}`, {
        params: { limit },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error getting recommended jobs:', error);
      throw error;
    }
  },

  // Obter vagas que combinam com skills do candidato
  getJobsBySkillsMatch: async (
    candidateId: string,
    limit = 20,
    offset = 0
  ): Promise<JobsResponse> => {
    try {
      const response = await axiosInstance.get(`/jobs/match/${candidateId}`, {
        params: { limit, offset },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error getting jobs by skills match:', error);
      throw error;
    }
  },

  // Obter vagas por empresa
  getJobsByCompanyId: async (
    companyId: string,
    limit = 20,
    offset = 0
  ): Promise<JobsResponse> => {
    try {
      const response = await axiosInstance.get(`/jobs/company/${companyId}`, {
        params: { limit, offset },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error getting jobs by company:', error);
      throw error;
    }
  },
};

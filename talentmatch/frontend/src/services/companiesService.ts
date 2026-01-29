import { axiosInstance } from './api';

export interface Company {
  id: string;
  userId: string;
  name: string;
  location: string;
  website?: string;
  description?: string;
  industry?: string;
  size?: string;
  logoUrl?: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CompanyProfile = Company;

export interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirementsMust: string;
  location: string;
  level: string;
  contractType: string;
  remoteType: string;
  status: string;
  companyId: string;
}

export interface CompanyUpdateInput {
  name?: string;
  location?: string;
  website?: string;
  description?: string;
  industry?: string;
  size?: string;
}

export const companyService = {
  async getProfile(userId?: string): Promise<CompanyProfile> {
    try {
      const url = userId ? `/companies/by-user/${userId}` : '/companies/profile';
      const { data } = await axiosInstance.get(url);
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Falha ao procurar o perfil da empresa');
    }
  },

  async getProfileById(id: string): Promise<CompanyProfile> {
    try {
      const { data } = await axiosInstance.get(`/companies/${id}`);
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Falha ao procurar o perfil da empresa');
    }
  },

  async updateProfile(id: string, profile: Partial<CompanyProfile>): Promise<CompanyProfile> {
    try {
      const { data } = await axiosInstance.put(`/companies/${id}`, profile);
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Falha ao atualizar o perfil da empresa');
    }
  },

  async createProfile(profile: Partial<CompanyProfile>): Promise<CompanyProfile> {
    try {
      const { data } = await axiosInstance.post('/companies', profile);
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Falha ao criar o perfil da empresa');
    }
  },

  async uploadLogo(file: File, token: string): Promise<{ logoUrl: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await axiosInstance.post('/companies/upload-logo', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Falha ao carregar o logótipo');
    }
  },

  async createJob(companyId: string, job: Partial<Job>): Promise<Job> {
    const { data } = await axiosInstance.post(`/companies/${companyId}/jobs`, job);
    return data;
  },

  async getCompanyJobs(companyId: string): Promise<{ data: Job[] }> {
    const { data } = await axiosInstance.get(`/companies/${companyId}/jobs`);
    return { data: Array.isArray(data) ? data : data.data || [] };
  },

  async updateJob(jobId: string, job: Partial<Job>): Promise<Job> {
    const { data } = await axiosInstance.put(`/companies/jobs/${jobId}`, job);
    return data;
  },

  async deleteJob(jobId: string): Promise<void> {
    await axiosInstance.delete(`/companies/jobs/${jobId}`);
  },

  async publishJob(jobId: string): Promise<Job> {
    const { data } = await axiosInstance.post(`/companies/jobs/${jobId}/publish`);
    return data;
  },

  async pauseJob(jobId: string): Promise<Job> {
    const { data } = await axiosInstance.post(`/companies/jobs/${jobId}/pause`);
    return data;
  },

  async closeJob(jobId: string): Promise<Job> {
    const { data } = await axiosInstance.post(`/companies/jobs/${jobId}/close`);
    return data;
  },

  async addReview(companyId: string, rating: number, comment?: string): Promise<any> {
    const { data } = await axiosInstance.post(`/companies/${companyId}/reviews`, { rating, comment });
    return data;
  },

  async getReviews(companyId: string): Promise<any[]> {
    const { data } = await axiosInstance.get(`/companies/${companyId}/reviews`);
    return data;
  },

  async getDashboardStats(): Promise<any> {
    try {
      const { data } = await axiosInstance.get('/companies/stats');
      return data;
    } catch (error) {
      console.warn('Failed to fetch real stats, returning mock data');
      return {
        activeJobs: 3,
        totalApplications: 42,
        interviewsScheduled: 8,
        chartData: [
          { name: 'Jan', applications: 12, views: 240 },
          { name: 'Fev', applications: 18, views: 300 },
          { name: 'Mar', applications: 15, views: 280 },
          { name: 'Abr', applications: 25, views: 450 },
          { name: 'Mai', applications: 32, views: 520 },
          { name: 'Jun', applications: 28, views: 480 },
        ]
      };
    }
  },

  async getMembers(): Promise<any[]> {
    const { data } = await axiosInstance.get('/companies/team');
    return data;
  },

  async addMember(email: string, role: string): Promise<any> {
    const { data } = await axiosInstance.post('/companies/team', { email, role });
    return data;
  },

  async getBranding(): Promise<any> {
    const { data } = await axiosInstance.get('/companies/branding');
    return data;
  },

  async updateBranding(branding: any): Promise<any> {
    const { data } = await axiosInstance.put('/companies/branding', branding);
    return data;
  }
};

export const companiesService = companyService;

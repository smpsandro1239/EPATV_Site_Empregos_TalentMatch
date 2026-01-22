import { axiosInstance } from './api';

export interface Application {
  id: string;
  candidateId: string;
  jobId: string;
  status: 'SUBMITTED' | 'IN_REVIEW' | 'INTERVIEW' | 'REJECTED' | 'OFFER' | 'HIRED';
  cvUrl?: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
  job?: {
    id: string;
    title: string;
    company?: {
      name: string;
      logoUrl?: string;
      location: string;
    };
  };
  candidate?: {
    id: string;
    name: string;
    headline?: string;
    location: string;
  };
}

export interface CreateApplicationDto {
  jobId: string;
  cvUrl?: string;
  coverLetter?: string;
}

export interface UpdateApplicationStatusDto {
  status: 'SUBMITTED' | 'IN_REVIEW' | 'INTERVIEW' | 'REJECTED' | 'OFFER' | 'HIRED';
  notes?: string;
}

export const applicationsService = {
  // Criar candidatura
  createApplication: async (data: CreateApplicationDto): Promise<Application> => {
    try {
      const response = await axiosInstance.post('/applications', data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating application:', error);
      throw error;
    }
  },

  // Obter candidatura
  getApplication: async (applicationId: string): Promise<Application> => {
    try {
      const response = await axiosInstance.get(`/applications/${applicationId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting application:', error);
      throw error;
    }
  },

  // Listar todas candidaturas
  listApplications: async (limit = 20, offset = 0): Promise<Application[]> => {
    try {
      const response = await axiosInstance.get('/applications', {
        params: { limit, offset },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error listing applications:', error);
      throw error;
    }
  },

  // Obter candidaturas do candidato
  getCandidateApplications: async (
    candidateId: string,
    limit = 20,
    offset = 0
  ): Promise<Application[]> => {
    try {
      const response = await axiosInstance.get(`/applications/candidate/${candidateId}`, {
        params: { limit, offset },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error getting candidate applications:', error);
      throw error;
    }
  },

  // Obter candidaturas de uma vaga
  getJobApplications: async (
    jobId: string,
    limit = 20,
    offset = 0
  ): Promise<Application[]> => {
    try {
      const response = await axiosInstance.get(`/applications/job/${jobId}`, {
        params: { limit, offset },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error getting job applications:', error);
      throw error;
    }
  },

  // Atualizar status de candidatura
  updateApplicationStatus: async (
    applicationId: string,
    data: UpdateApplicationStatusDto
  ): Promise<Application> => {
    try {
      const response = await axiosInstance.put(`/applications/${applicationId}/status`, data);
      return response.data;
    } catch (error: any) {
      console.error('Error updating application status:', error);
      throw error;
    }
  },

  // Rejeitar candidatura
  rejectApplication: async (applicationId: string, notes?: string): Promise<Application> => {
    try {
      const response = await axiosInstance.put(
        `/applications/${applicationId}/reject`,
        { notes }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error rejecting application:', error);
      throw error;
    }
  },

  // Aceitar candidatura
  acceptApplication: async (applicationId: string, notes?: string): Promise<Application> => {
    try {
      const response = await axiosInstance.put(`/applications/${applicationId}/accept`, {
        notes,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error accepting application:', error);
      throw error;
    }
  },

  // Obter estatísticas de candidaturas de uma vaga
  getJobApplicationStats: async (jobId: string): Promise<any> => {
    try {
      const response = await axiosInstance.get(`/applications/job/${jobId}/stats`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting job application stats:', error);
      throw error;
    }
  },
};

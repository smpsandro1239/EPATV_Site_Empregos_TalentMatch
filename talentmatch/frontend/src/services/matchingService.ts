import { axiosInstance } from './api';

export interface MatchResult {
  id: string;
  title?: string;
  name?: string;
  company?: {
    name: string;
    logoUrl?: string;
    location: string;
  };
  location?: string;
  level?: string;
  salaryMax?: number;
  matchScore: number;
  matchReason: string;
  applicationId?: string;
  applicationStatus?: string;
  headline?: string;
}

export const matchingService = {
  // Obter matching score entre um candidato e uma vaga
  getMatchScore: async (jobId: string, candidateId: string): Promise<MatchResult> => {
    try {
      // Nota: No backend isto pode ser calculado on-the-fly ou vir de MatchScore model
      // Usaremos o endpoint que retorna candidatos para vaga e filtramos, ou se houver um específico
      const response = await axiosInstance.get(`/matching/candidates-for-job/${jobId}`);
      const candidates = response.data;
      return candidates.find((c: any) => c.id === candidateId) || { matchScore: 0, matchReason: 'Match não disponível' };
    } catch (error: any) {
      console.error('Error getting match score:', error);
      throw error;
    }
  },

  // Obter vagas recomendadas para um candidato
  getJobsForCandidate: async (candidateId: string, limit = 10, offset = 0): Promise<MatchResult[]> => {
    try {
      const response = await axiosInstance.get(`/matching/jobs-for-candidate/${candidateId}`, {
        params: { limit, offset },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error getting recommended jobs:', error);
      throw error;
    }
  },

  // Obter candidatos recomendados para uma vaga
  getCandidatesForJob: async (jobId: string, limit = 10, offset = 0): Promise<MatchResult[]> => {
    try {
      const response = await axiosInstance.get(`/matching/candidates-for-job/${jobId}`, {
        params: { limit, offset },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error getting recommended candidates:', error);
      throw error;
    }
  },
};

import { axiosInstance } from './api';

export interface CandidateProfile {
  id: string;
  userId: string;
  name: string;
  location: string;
  headline?: string;
  about?: string;
  cvUrl?: string;
  availabilityStatus?: string;
  remotePreference?: string;
  salaryMin?: number;
  salaryMax?: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    email: string;
  };
  experiences?: CandidateExperience[];
  educations?: CandidateEducation[];
  skills?: CandidateSkill[];
}

export interface CandidateExperience {
  id: string;
  candidateId: string;
  companyName: string;
  role: string;
  description?: string;
  startDate: string;
  endDate?: string;
  createdAt: string;
}

export interface CandidateEducation {
  id: string;
  candidateId: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  createdAt: string;
}

export interface CandidateSkill {
  id: string;
  candidateId: string;
  skillId: string;
  level: 'JUNIOR' | 'MID' | 'SENIOR';
  yearsExp?: number;
  createdAt: string;
  skill?: {
    id: string;
    name: string;
    category?: string;
  };
}

export const candidateService = {
  // Criar perfil de candidato
  createProfile: async (data: Partial<CandidateProfile>): Promise<CandidateProfile> => {
    try {
      const response = await axiosInstance.post('/candidates', data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating candidate profile:', error);
      throw error;
    }
  },

  // Obter perfil de candidato
  getProfile: async (candidateId: string): Promise<CandidateProfile> => {
    try {
      const response = await axiosInstance.get(`/candidates/${candidateId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting candidate profile:', error);
      throw error;
    }
  },

  // Obter perfil por user ID
  getProfileByUserId: async (userId: string): Promise<CandidateProfile> => {
    try {
      const response = await axiosInstance.get(`/candidates/by-user/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting candidate profile by user ID:', error);
      throw error;
    }
  },

  // Atualizar perfil de candidato
  updateProfile: async (
    candidateId: string,
    data: Partial<CandidateProfile>
  ): Promise<CandidateProfile> => {
    try {
      const response = await axiosInstance.put(`/candidates/${candidateId}`, data);
      return response.data;
    } catch (error: any) {
      console.error('Error updating candidate profile:', error);
      throw error;
    }
  },

  // Adicionar experiência
  addExperience: async (
    candidateId: string,
    data: Partial<CandidateExperience>
  ): Promise<CandidateExperience> => {
    try {
      const response = await axiosInstance.post(`/candidates/${candidateId}/experiences`, data);
      return response.data;
    } catch (error: any) {
      console.error('Error adding experience:', error);
      throw error;
    }
  },

  // Listar experiências
  getExperiences: async (candidateId: string): Promise<CandidateExperience[]> => {
    try {
      const response = await axiosInstance.get(`/candidates/${candidateId}/experiences`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting experiences:', error);
      throw error;
    }
  },

  // Atualizar experiência
  updateExperience: async (
    candidateId: string,
    experienceId: string,
    data: Partial<CandidateExperience>
  ): Promise<CandidateExperience> => {
    try {
      const response = await axiosInstance.put(
        `/candidates/${candidateId}/experiences/${experienceId}`,
        data
      );
      return response.data;
    } catch (error: any) {
      console.error('Error updating experience:', error);
      throw error;
    }
  },

  // Deletar experiência
  deleteExperience: async (
    candidateId: string,
    experienceId: string
  ): Promise<void> => {
    try {
      await axiosInstance.delete(`/candidates/${candidateId}/experiences/${experienceId}`);
    } catch (error: any) {
      console.error('Error deleting experience:', error);
      throw error;
    }
  },

  // Adicionar educação
  addEducation: async (
    candidateId: string,
    data: Partial<CandidateEducation>
  ): Promise<CandidateEducation> => {
    try {
      const response = await axiosInstance.post(`/candidates/${candidateId}/educations`, data);
      return response.data;
    } catch (error: any) {
      console.error('Error adding education:', error);
      throw error;
    }
  },

  // Listar educações
  getEducations: async (candidateId: string): Promise<CandidateEducation[]> => {
    try {
      const response = await axiosInstance.get(`/candidates/${candidateId}/educations`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting educations:', error);
      throw error;
    }
  },

  // Atualizar educação
  updateEducation: async (
    candidateId: string,
    educationId: string,
    data: Partial<CandidateEducation>
  ): Promise<CandidateEducation> => {
    try {
      const response = await axiosInstance.put(
        `/candidates/${candidateId}/educations/${educationId}`,
        data
      );
      return response.data;
    } catch (error: any) {
      console.error('Error updating education:', error);
      throw error;
    }
  },

  // Deletar educação
  deleteEducation: async (candidateId: string, educationId: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/candidates/${candidateId}/educations/${educationId}`);
    } catch (error: any) {
      console.error('Error deleting education:', error);
      throw error;
    }
  },

  // Adicionar skill
  addSkill: async (
    candidateId: string,
    data: Partial<CandidateSkill>
  ): Promise<CandidateSkill> => {
    try {
      const response = await axiosInstance.post(`/candidates/${candidateId}/skills`, data);
      return response.data;
    } catch (error: any) {
      console.error('Error adding skill:', error);
      throw error;
    }
  },

  // Listar skills
  getSkills: async (candidateId: string): Promise<CandidateSkill[]> => {
    try {
      const response = await axiosInstance.get(`/candidates/${candidateId}/skills`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting skills:', error);
      throw error;
    }
  },

  // Remover skill
  removeSkill: async (candidateId: string, skillId: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/candidates/${candidateId}/skills/${skillId}`);
    } catch (error: any) {
      console.error('Error removing skill:', error);
      throw error;
    }
  },
};

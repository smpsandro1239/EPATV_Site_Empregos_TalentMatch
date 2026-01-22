import { axiosInstance } from './api';

export interface CompanyProfile {
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

export interface CompanyUpdateInput {
  name?: string;
  location?: string;
  website?: string;
  description?: string;
  industry?: string;
  size?: string;
}

export const companyService = {
  async getProfile(token: string): Promise<CompanyProfile> {
    try {
      const { data } = await axiosInstance.get('/company/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch company profile');
    }
  },

  async updateProfile(profile: Partial<CompanyProfile>, token: string): Promise<CompanyProfile> {
    try {
      const { data } = await axiosInstance.patch('/company/profile', profile, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update company profile');
    }
  },

  async uploadLogo(file: File, token: string): Promise<{ logoUrl: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await axiosInstance.post('/company/upload-logo', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to upload logo');
    }
  },
};

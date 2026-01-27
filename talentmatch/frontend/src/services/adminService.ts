import { axiosInstance } from './api';

export const adminService = {
  getDashboardStats: async () => {
    const response = await axiosInstance.get('/admin/dashboard');
    return response.data;
  },

  getUsers: async (limit = 50, offset = 0) => {
    const response = await axiosInstance.get('/admin/users', {
      params: { limit, offset },
    });
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await axiosInstance.delete(`/admin/users/${id}`);
    return response.data;
  },

  getJobs: async (limit = 50, offset = 0) => {
    const response = await axiosInstance.get('/admin/jobs', {
      params: { limit, offset },
    });
    return response.data;
  },

  updateJobStatus: async (id: string, status: string) => {
    const response = await axiosInstance.put(`/admin/jobs/${id}/status`, { status });
    return response.data;
  },
};

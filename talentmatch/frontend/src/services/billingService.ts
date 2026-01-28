import { axiosInstance } from './api';

export const billingService = {
  createCheckoutSession: async (plan: string) => {
    const { data } = await axiosInstance.post('/billing/checkout', { plan });
    return data;
  },

  getSubscription: async () => {
    const { data } = await axiosInstance.get('/billing/subscription');
    return data;
  },
};

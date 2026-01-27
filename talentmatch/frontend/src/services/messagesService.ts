import { axiosInstance } from './api';

export interface Message {
  id: string;
  applicationId: string;
  senderType: 'CANDIDATE' | 'COMPANY';
  senderId: string;
  content: string;
  createdAt: string;
}

export const messagesService = {
  sendMessage: async (applicationId: string, content: string): Promise<Message> => {
    const response = await axiosInstance.post(`/messages/${applicationId}`, { content });
    return response.data;
  },

  getMessages: async (applicationId: string): Promise<Message[]> => {
    const response = await axiosInstance.get(`/messages/${applicationId}`);
    return response.data;
  },
};

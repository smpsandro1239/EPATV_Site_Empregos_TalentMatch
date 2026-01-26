// src/services/candidate.service.ts
import { Application, Job, Candidate } from '@/types/candidate';
import { getAuthToken } from './auth.service'; // Assuming you have this service

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const fetchCandidateData = async (userId: string): Promise<Candidate> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/candidates/by-user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

export const fetchRecentApplications = async (candidateId: string): Promise<Application[]> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/applications/candidate/${candidateId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

export const fetchRecommendedJobs = async (candidateId: string): Promise<Job[]> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/jobs/recommended/${candidateId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

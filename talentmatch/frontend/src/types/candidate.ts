// src/types/candidate.ts

export interface Candidate {
  id: string;
  name: string;
  profileCompleteness: number;
}

export interface CandidateProfileDetail {
  id: string;
  name: string;
  headline?: string;
  location: string;
  about?: string;
  cvUrl?: string;
  salaryMin?: number;
  salaryMax?: number;
  remotePreference?: 'FULLY_REMOTE' | 'HYBRID' | 'ON_SITE';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
}

export interface Application {
  id: number;
  title: string;
  company: string;
  status: 'In Review' | 'Interviewing' | 'Rejected';
}

export interface Job {
  id: number;
  title: string;
  company: string;
}

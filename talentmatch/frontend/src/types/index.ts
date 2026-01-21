export enum UserRole {
  CANDIDATE = 'CANDIDATE',
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN',
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  VIEWED = 'VIEWED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  INTERVIEW = 'INTERVIEW',
}

export enum JobStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface CandidateProfile {
  id: string;
  userId: string;
  headline?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  profileImage?: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

export interface Experience {
  id: string;
  candidateId: string;
  company: string;
  position: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
}

export interface Education {
  id: string;
  candidateId: string;
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  grade?: string;
}

export interface Skill {
  id: string;
  name: string;
  endorsements: number;
}

export interface Job {
  id: string;
  companyId: string;
  title: string;
  description: string;
  salary?: number;
  location?: string;
  workType: 'REMOTE' | 'HYBRID' | 'ONSITE';
  level: 'JUNIOR' | 'SENIOR' | 'MID';
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  appliedAt: Date;
  reviewedAt?: Date;
  notes?: string;
}

import { PrismaService } from '@database/prisma/prisma.service';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

export interface CreateApplicationDto {
  candidateId: string;
  jobId: string;
  cvUrl?: string;
  coverLetter?: string;
}

export interface UpdateApplicationStatusDto {
  status: string;
  notes?: string;
}

@Injectable()
export class ApplicationsService {
  constructor(
    private _prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  // Create Application
  async createApplication(dto: CreateApplicationDto) {
    // Check if candidate has already applied to this job
    const existingApplication = await this._prisma.application.findFirst({
      where: {
        candidateId: dto.candidateId,
        jobId: dto.jobId,
      },
    });

    if (existingApplication) {
      throw new BadRequestException('You have already applied to this job');
    }

    // Check if job exists
    const job = await this._prisma.job.findUnique({
      where: { id: dto.jobId },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    // Check if candidate exists
    const candidate = await this._prisma.candidateProfile.findUnique({
      where: { id: dto.candidateId },
    });

    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }

    const application = await this._prisma.application.create({
      data: {
        candidateId: dto.candidateId,
        jobId: dto.jobId,
        cvUrl: dto.cvUrl,
        message: dto.coverLetter,
        status: 'SUBMITTED',
      },
      include: {
        job: { include: { company: { include: { user: { select: { email: true } } } } } },
        candidate: true,
      },
    });

    // Notify company
    await this.notificationsService.notifyNewApplication(
        application.candidate.name,
        application.job.title,
        application.job.company.user.email
    );

    return application;
  }

  // Get Application
  async getApplication(applicationId: string) {
    const application = await this._prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: {
          include: {
            company: {
              select: { name: true, logoUrl: true, location: true },
            },
          },
        },
        candidate: true,
      },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return application;
  }

  // List All Applications
  async listApplications(limit: number = 20, offset: number = 0) {
    // Ensure parameters are valid numbers
    const validLimit = Math.min(Math.max(1, limit || 20), 100); // Max 100 items
    const validOffset = Math.max(0, offset || 0);

    const applications = await this._prisma.application.findMany({
      skip: validOffset,
      take: validLimit,
      orderBy: { createdAt: 'desc' },
    });
    return applications;
  }

  // List Candidate Applications
  async getCandidateApplications(candidateId: string, limit: number = 20, offset: number = 0) {
    return this._prisma.application.findMany({
      where: { candidateId },
      skip: offset,
      take: limit,
      include: {
        job: {
          include: {
            company: {
              select: { name: true, logoUrl: true, location: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // List Job Applications (for company)
  async getJobApplications(jobId: string, limit: number = 20, offset: number = 0) {
    return this._prisma.application.findMany({
      where: { jobId },
      skip: offset,
      take: limit,
      include: {
        candidate: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Update Application Status
  async updateApplicationStatus(applicationId: string, dto: UpdateApplicationStatusDto) {
    const application = await this._prisma.application.update({
      where: { id: applicationId },
      data: {
        status: dto.status as any,
      },
      include: {
        job: true,
        candidate: { include: { user: { select: { email: true } } } },
      },
    });

    // Notify candidate
    await this.notificationsService.notifyStatusChange(
        application.candidate.user.email,
        application.job.title,
        dto.status
    );

    return application;
  }

  // Count Applications for Job
  async getJobApplicationCount(jobId: string) {
    return this._prisma.application.count({
      where: { jobId },
    });
  }

  // Get Applications by Status
  async getApplicationsByStatus(jobId: string, status: string) {
    return this._prisma.application.findMany({
      where: {
        jobId,
        status: status as any,
      },
      include: {
        candidate: true,
      },
    });
  }

  // Reject Application
  async rejectApplication(applicationId: string, notes?: string) {
    return this._prisma.application.update({
      where: { id: applicationId },
      data: {
        status: 'REJECTED',
      },
    });
  }

  // Accept Application
  async acceptApplication(applicationId: string, notes?: string) {
    return this._prisma.application.update({
      where: { id: applicationId },
      data: {
        status: 'OFFER',
      },
    });
  }

  // Get Application Stats
  async getJobApplicationStats(jobId: string) {
    const total = await this._prisma.application.count({ where: { jobId } });
    const submitted = await this._prisma.application.count({
      where: { jobId, status: 'SUBMITTED' },
    });
    const inReview = await this._prisma.application.count({
      where: { jobId, status: 'IN_REVIEW' },
    });
    const interview = await this._prisma.application.count({
      where: { jobId, status: 'INTERVIEW' },
    });
    const offer = await this._prisma.application.count({
      where: { jobId, status: 'OFFER' },
    });
    const rejected = await this._prisma.application.count({
      where: { jobId, status: 'REJECTED' },
    });

    return {
      total,
      submitted,
      inReview,
      interview,
      offer,
      rejected,
    };
  }
}

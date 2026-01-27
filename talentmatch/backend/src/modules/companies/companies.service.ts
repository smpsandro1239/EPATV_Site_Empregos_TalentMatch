import { PrismaService } from '@database/prisma/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EmbeddingsService } from '@modules/embeddings/embeddings.service';

export interface CreateCompanyProfileDto {
  userId: string;
  name: string;
  description?: string;
  location: string;
  website?: string;
  logoUrl?: string;
  industry?: string;
  size?: string;
}

export interface UpdateCompanyProfileDto {
  name?: string;
  description?: string;
  location?: string;
  website?: string;
  logoUrl?: string;
  industry?: string;
  size?: string;
}

export interface CreateJobDto {
  companyId: string;
  title: string;
  description: string;
  responsibilities: string;
  requirementsMust: string;
  requirementsNice?: string;
  location: string;
  remoteType: string;
  contractType: string;
  level: string;
  salaryMin?: number;
  salaryMax?: number;
}

export interface UpdateJobDto {
  title?: string;
  description?: string;
  responsibilities?: string;
  requirementsMust?: string;
  requirementsNice?: string;
  location?: string;
  remoteType?: string;
  contractType?: string;
  level?: string;
  salaryMin?: number;
  salaryMax?: number;
  status?: string;
}

@Injectable()
export class CompaniesService {
  constructor(
    private _prisma: PrismaService,
    private _embeddingsService: EmbeddingsService,
  ) {}

  private async updateJobEmbedding(jobId: string) {
    try {
        const job = await this.getJob(jobId);
        const text = `${job.title}. ${job.description}. Responsibilities: ${job.responsibilities}. Requirements: ${job.requirementsMust}`;
        await this._embeddingsService.saveEmbedding('job', jobId, text);
    } catch (error) {
        console.error('Falha ao atualizar embedding da vaga:', error);
    }
  }

  // Company Profile Management
  async createProfile(dto: CreateCompanyProfileDto) {
    // Check if company already exists
    const existingCompany = await this._prisma.company.findUnique({
      where: { userId: dto.userId },
    });

    if (existingCompany) {
      throw new BadRequestException('Company profile already exists');
    }

    return this._prisma.company.create({
      data: {
        userId: dto.userId,
        name: dto.name,
        description: dto.description,
        location: dto.location,
        website: dto.website,
        logoUrl: dto.logoUrl,
        industry: dto.industry,
        size: dto.size,
      },
      include: {
        user: {
          select: { email: true },
        },
      },
    });
  }

  async getProfile(companyId: string) {
    const company = await this._prisma.company.findUnique({
      where: { id: companyId },
      include: {
        user: {
          select: { email: true },
        },
        jobs: {
          where: { status: 'PUBLISHED' },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async getCompanyByUserId(userId: string) {
    const company = await this._prisma.company.findUnique({
      where: { userId },
      include: {
        user: {
          select: { email: true },
        },
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async updateProfile(companyId: string, dto: UpdateCompanyProfileDto) {
    return this._prisma.company.update({
      where: { id: companyId },
      data: dto,
    });
  }

  async listCompanies(limit: number = 10, offset: number = 0) {
    try {
      return await this._prisma.company.findMany({
        skip: offset,
        take: limit,
        include: {
          _count: {
            select: { jobs: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error: any) {
      console.error('[Companies.listCompanies] Error:', error.message);
      return [];
    }
  }

  // Job Management
  async createJob(dto: CreateJobDto) {
    const job = await this._prisma.job.create({
      data: {
        companyId: dto.companyId,
        title: dto.title,
        description: dto.description,
        responsibilities: dto.responsibilities,
        requirementsMust: dto.requirementsMust,
        requirementsNice: dto.requirementsNice,
        location: dto.location,
        remoteType: dto.remoteType as any, // Using 'as any' for compatibility if Prisma expects an Enum
        contractType: dto.contractType as any,
        level: dto.level as any,
        salaryMin: dto.salaryMin,
        salaryMax: dto.salaryMax,
      },
    });

    await this.updateJobEmbedding(job.id);
    return job;
  }

  async getJob(jobId: string) {
    const job = await this._prisma.job.findUnique({
      where: { id: jobId },
      include: {
        company: {
          select: {
            name: true,
            logoUrl: true,
            location: true,
          },
        },
        applications: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }

  async updateJob(jobId: string, dto: UpdateJobDto) {
    const updateData: any = {};
    if (dto.title) updateData.title = dto.title;
    if (dto.description) updateData.description = dto.description;
    if (dto.responsibilities) updateData.responsibilities = dto.responsibilities;
    if (dto.requirementsMust) updateData.requirementsMust = dto.requirementsMust;
    if (dto.requirementsNice) updateData.requirementsNice = dto.requirementsNice;
    if (dto.location) updateData.location = dto.location;
    if (dto.remoteType) updateData.remoteType = dto.remoteType;
    if (dto.contractType) updateData.contractType = dto.contractType;
    if (dto.level) updateData.level = dto.level;
    if (dto.salaryMin) updateData.salaryMin = dto.salaryMin;
    if (dto.salaryMax) updateData.salaryMax = dto.salaryMax;
    if (dto.status) updateData.status = dto.status;

    const job = await this._prisma.job.update({
      where: { id: jobId },
      data: updateData,
    });

    await this.updateJobEmbedding(jobId);
    return job;
  }

  async deleteJob(jobId: string) {
    return this._prisma.job.delete({
      where: { id: jobId },
    });
  }

  async getCompanyJobs(companyId: string, limit: number = 20, offset: number = 0) {
    return this._prisma.job.findMany({
      where: {
        companyId,
      },
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });
  }

  async listJobs(limit: number = 20, offset: number = 0, filter?: { level?: string; contractType?: string; location?: string }) {
    const where: any = { status: 'PUBLISHED' };

    if (filter?.level) where.level = filter.level;
    if (filter?.contractType) where.contractType = filter.contractType;
    if (filter?.location) where.location = { contains: filter.location, mode: 'insensitive' };

    return this._prisma.job.findMany({
      where,
      skip: offset,
      take: limit,
      include: {
        company: {
          select: {
            name: true,
            logoUrl: true,
            location: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async searchJobs(query: string, limit: number = 20) {
    return this._prisma.job.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { company: { name: { contains: query, mode: 'insensitive' } } },
        ],
      },
      take: limit,
      include: {
        company: {
          select: {
            name: true,
            logoUrl: true,
            location: true,
          },
        },
      },
    });
  }

  // Job Status Management
  async publishJob(jobId: string) {
    return this._prisma.job.update({
      where: { id: jobId },
      data: { status: 'PUBLISHED' },
    });
  }

  async pauseJob(jobId: string) {
    return this._prisma.job.update({
      where: { id: jobId },
      data: { status: 'PAUSED' },
    });
  }

  async closeJob(jobId: string) {
    return this._prisma.job.update({
      where: { id: jobId },
      data: { status: 'CLOSED' },
    });
  }

  // Application Management
  // Reviews
  async addReview(companyId: string, candidateId: string, rating: number, comment?: string) {
    return this._prisma.review.upsert({
      where: {
        companyId_candidateId: {
          companyId,
          candidateId,
        },
      },
      update: {
        rating,
        comment,
      },
      create: {
        companyId,
        candidateId,
        rating,
        comment,
      },
    });
  }

  async getCompanyReviews(companyId: string) {
    return this._prisma.review.findMany({
      where: { companyId },
      include: {
        candidate: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCompanyStats(companyId: string) {
    const [activeJobs, totalApplications, hired] = await Promise.all([
      this._prisma.job.count({ where: { companyId, status: 'PUBLISHED' } }),
      this._prisma.application.count({ where: { job: { companyId } } }),
      this._prisma.application.count({ where: { job: { companyId }, status: 'HIRED' } }),
    ]);

    // Candidaturas por vaga para o gráfico
    const jobs = await this._prisma.job.findMany({
        where: { companyId },
        include: { _count: { select: { applications: true } } },
        take: 5,
        orderBy: { createdAt: 'desc' }
    });

    const applicationsByJob = jobs.map(j => ({ name: j.title.substring(0, 15), total: j._count.applications }));

    return {
      activeJobs,
      totalApplications,
      hired,
      applicationsByJob
    };
  }

  async getCompanyApplications(companyId: string, status?: string, limit: number = 20, offset: number = 0) {
    const where: any = {
      job: {
        companyId,
      },
    };

    if (status) {
      where.status = status;
    }

    return this._prisma.application.findMany({
      where,
      skip: offset,
      take: limit,
      include: {
        candidate: {
          select: {
            id: true,
            name: true,
            headline: true,
            location: true,
          },
        },
        job: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

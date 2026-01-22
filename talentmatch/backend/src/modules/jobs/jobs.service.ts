import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface SearchJobsDto {
  query?: string;
  level?: string;
  contractType?: string;
  location?: string;
  remoteType?: string;
  limit?: number;
  offset?: number;
}

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  /**
   * List all jobs with pagination
   */
  async listJobs(limit: number = 20, offset: number = 0) {
    try {
      const jobs = await this.prisma.job.findMany({
        take: limit,
        skip: offset,
        include: {
          company: {
            select: {
              id: true,
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
        orderBy: {
          createdAt: 'desc',
        },
      });

      const total = await this.prisma.job.count();

      return {
        data: jobs,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      };
    } catch (error) {
      console.error('[JobsService.listJobs] Error:', error);
      throw error;
    }
  }

  /**
   * Get job by ID
   */
  async getJobById(jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            location: true,
            website: true,
            description: true,
          },
        },
        applications: {
          select: {
            id: true,
            candidateId: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }

  /**
   * Search jobs by query, filters
   */
  async searchJobs(filters: SearchJobsDto) {
    try {
      const where: any = {
        AND: [],
      };

      // Full-text search
      if (filters.query) {
        where.AND.push({
          OR: [
            { title: { contains: filters.query, mode: 'insensitive' } },
            { description: { contains: filters.query, mode: 'insensitive' } },
            { company: { name: { contains: filters.query, mode: 'insensitive' } } },
          ],
        });
      }

      // Filter by level
      if (filters.level) {
        where.AND.push({ level: filters.level });
      }

      // Filter by contract type
      if (filters.contractType) {
        where.AND.push({ contractType: filters.contractType });
      }

      // Filter by location
      if (filters.location) {
        where.AND.push({ location: { contains: filters.location, mode: 'insensitive' } });
      }

      // Filter by remote type
      if (filters.remoteType) {
        where.AND.push({ remoteType: filters.remoteType });
      }

      const limit = filters.limit || 20;
      const offset = filters.offset || 0;

      const jobs = await this.prisma.job.findMany({
        where: where.AND.length > 0 ? where : undefined,
        take: limit,
        skip: offset,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
              location: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const total = await this.prisma.job.count({
        where: where.AND.length > 0 ? where : undefined,
      });

      return {
        data: jobs,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      };
    } catch (error) {
      console.error('[JobsService.searchJobs] Error:', error);
      throw error;
    }
  }

  /**
   * Get jobs by company ID
   */
  async getJobsByCompanyId(companyId: string, limit: number = 20, offset: number = 0) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const jobs = await this.prisma.job.findMany({
      where: { companyId },
      take: limit,
      skip: offset,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
          },
        },
        applications: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.prisma.job.count({ where: { companyId } });

    return {
      data: jobs,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
  }

  /**
   * Get jobs filtered by candidate skills
   */
  async getJobsBySkillsMatch(candidateId: string, limit: number = 20, offset: number = 0) {
    try {
      const candidateProfile = await this.prisma.candidateProfile.findUnique({
        where: { id: candidateId },
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
        },
      });

      if (!candidateProfile) {
        throw new NotFoundException('Candidate profile not found');
      }

      const candidateSkillIds = candidateProfile.skills.map((s: any) => s.skillId);

      const jobs = await this.prisma.job.findMany({
        take: limit,
        skip: offset,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        data: jobs,
        candidateSkills: candidateSkillIds,
        pagination: {
          limit,
          offset,
        },
      };
    } catch (error) {
      console.error('[JobsService.getJobsBySkillsMatch] Error:', error);
      throw error;
    }
  }

  /**
   * Get recommended jobs for a candidate based on profile
   */
  async getRecommendedJobs(candidateId: string, limit: number = 10) {
    try {
      const candidateProfile = await this.prisma.candidateProfile.findUnique({
        where: { id: candidateId },
        include: {
          skills: true,
          experiences: true,
        },
      });

      if (!candidateProfile) {
        throw new NotFoundException('Candidate profile not found');
      }

      // Get jobs that match candidate's location and experience level
      const jobs = await this.prisma.job.findMany({
        where: {
          location: {
            contains: candidateProfile.location,
            mode: 'insensitive',
          },
        },
        take: limit,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return jobs;
    } catch (error) {
      console.error('[JobsService.getRecommendedJobs] Error:', error);
      throw error;
    }
  }

  /**
   * Count total jobs
   */
  async countJobs() {
    return this.prisma.job.count();
  }

  /**
   * Count jobs by status
   */
  async countJobsByStatus() {
    const active = await this.prisma.job.count({
      where: { status: 'PUBLISHED' },
    });

    const closed = await this.prisma.job.count({
      where: { status: 'CLOSED' },
    });

    return { active, closed };
  }
}

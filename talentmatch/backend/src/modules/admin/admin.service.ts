import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [totalUsers, totalJobs, totalApplications, totalCompanies, totalCandidates] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.job.count(),
      this.prisma.application.count(),
      this.prisma.company.count(),
      this.prisma.candidateProfile.count(),
    ]);

    const recentUsers = await this.prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, email: true, role: true, createdAt: true },
    });

    const recentJobs = await this.prisma.job.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { company: { select: { name: true } } },
    });

    return {
      stats: {
        totalUsers,
        totalJobs,
        totalApplications,
        totalCompanies,
        totalCandidates,
      },
      recentUsers,
      recentJobs,
    };
  }

  async getUsers(limit: number = 50, offset: number = 0) {
    return this.prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        lastLogin: true,
      },
    });
  }

  async deleteUser(userId: string) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async getJobs(limit: number = 50, offset: number = 0) {
    return this.prisma.job.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      include: {
        company: { select: { name: true } },
        _count: { select: { applications: true } },
      },
    });
  }

  async updateJobStatus(jobId: string, status: any) {
    return this.prisma.job.update({
      where: { id: jobId },
      data: { status },
    });
  }
}

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

    // Dados reais para o gráfico (vagas por mês - últimos 6 meses)
    const jobsByMonth = [];
    for (let i = 5; i >= 0; i--) {
      const startOfMonth = new Date();
      startOfMonth.setMonth(startOfMonth.getMonth() - i);
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);

      const count = await this.prisma.job.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lt: endOfMonth,
          },
        },
      });

      jobsByMonth.push({
        name: startOfMonth.toLocaleString('pt-PT', { month: 'short' }),
        total: count,
      });
    }

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
      jobsByMonth,
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

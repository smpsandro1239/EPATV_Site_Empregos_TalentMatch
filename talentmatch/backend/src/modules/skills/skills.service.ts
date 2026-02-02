import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.skill.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.skill.findUnique({
      where: { id },
    });
  }

  async create(data: { name: string; category?: string }) {
    return this.prisma.skill.create({
      data,
    });
  }

  async update(id: string, data: { name?: string; category?: string }) {
    return this.prisma.skill.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.skill.delete({
      where: { id },
    });
  }
}

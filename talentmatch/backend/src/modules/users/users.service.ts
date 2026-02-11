import { PrismaService } from '@database/prisma/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UpdateUserDto, UpdatePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        candidateProfile: true,
        companyProfile: true,
      },
    });

    if (!user) throw new NotFoundException('Utilizador não encontrado');
    return user;
  }

  async updateMe(userId: string, dto: UpdateUserDto) {
    const data: any = {};
    if (dto.email) {
      const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (existing && existing.id !== userId) {
        throw new BadRequestException('Email já em uso');
      }
      data.email = dto.email;
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
    });

    // Update profile name if provided
    if (dto.name) {
      if (user.role === 'CANDIDATE') {
        await this.prisma.candidateProfile.update({
          where: { userId },
          data: { name: dto.name },
        });
      } else if (user.role === 'COMPANY') {
        await this.prisma.company.update({
          where: { userId },
          data: { name: dto.name },
        });
      }
    }

    return this.getMe(userId);
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Utilizador não encontrado');

    const isValid = await argon2.verify(user.passwordHash, dto.oldPassword);
    if (!isValid) throw new BadRequestException('Palavra-passe atual incorreta');

    const passwordHash = await argon2.hash(dto.newPassword);
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    return { success: true };
  }
}

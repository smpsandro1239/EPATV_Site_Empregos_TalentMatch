import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  // TODO: Implement skills methods
}

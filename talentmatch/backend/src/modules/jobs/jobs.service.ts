import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  // TODO: Implement jobs methods
}

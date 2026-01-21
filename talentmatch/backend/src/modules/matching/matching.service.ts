import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MatchingService {
  constructor(private prisma: PrismaService) {}

  // TODO: Implement matching methods
}

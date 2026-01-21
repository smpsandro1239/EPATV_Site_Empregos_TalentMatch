import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) {}

  // TODO: Implement AI methods
}

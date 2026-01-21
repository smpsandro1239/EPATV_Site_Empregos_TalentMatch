import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmbeddingsService {
  constructor(private prisma: PrismaService) {}

  // TODO: Implement embeddings methods
}

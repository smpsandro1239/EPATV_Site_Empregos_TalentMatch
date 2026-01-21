import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  // TODO: Implement messages methods
}

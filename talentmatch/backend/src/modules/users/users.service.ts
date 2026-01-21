import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // TODO: Implement users methods
}

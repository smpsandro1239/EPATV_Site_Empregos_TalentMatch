import { PrismaModule } from '@database/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CandidatesModule } from '../candidates/candidates.module';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

@Module({
  imports: [PrismaModule, CandidatesModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}

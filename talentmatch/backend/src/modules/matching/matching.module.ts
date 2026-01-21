import { PrismaModule } from '@database/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { MatchingController } from './matching.controller';
import { MatchingService } from './matching.service';

@Module({
  imports: [PrismaModule],
  controllers: [MatchingController],
  providers: [MatchingService],
})
export class MatchingModule {}

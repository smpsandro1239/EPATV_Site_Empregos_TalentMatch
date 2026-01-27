import { PrismaModule } from '@database/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import { EmbeddingsModule } from '@modules/embeddings/embeddings.module';

@Module({
  imports: [PrismaModule, EmbeddingsModule],
  controllers: [CandidatesController],
  providers: [CandidatesService],
  exports: [CandidatesService],
})
export class CandidatesModule {}

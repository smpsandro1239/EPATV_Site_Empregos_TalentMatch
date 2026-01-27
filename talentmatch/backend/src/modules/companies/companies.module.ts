import { PrismaModule } from '@database/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { EmbeddingsModule } from '@modules/embeddings/embeddings.module';

@Module({
  imports: [PrismaModule, EmbeddingsModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}

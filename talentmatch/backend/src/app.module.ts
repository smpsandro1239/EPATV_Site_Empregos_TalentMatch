import { PrismaModule } from '@database/prisma/prisma.module';
import { AiModule } from '@modules/ai/ai.module';
import { ApplicationsModule } from '@modules/applications/applications.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CandidatesModule } from '@modules/candidates/candidates.module';
import { CompaniesModule } from '@modules/companies/companies.module';
import { EmbeddingsModule } from '@modules/embeddings/embeddings.module';
import { JobsModule } from '@modules/jobs/jobs.module';
import { MatchingModule } from '@modules/matching/matching.module';
import { MessagesModule } from '@modules/messages/messages.module';
import { SkillsModule } from '@modules/skills/skills.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CandidatesModule,
    CompaniesModule,
    SkillsModule,
    JobsModule,
    ApplicationsModule,
    MessagesModule,
    MatchingModule,
    EmbeddingsModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

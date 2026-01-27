import { PrismaModule } from '@database/prisma/prisma.module';
import { AdminModule } from '@modules/admin/admin.module';
import { AiModule } from '@modules/ai/ai.module';
import { ApplicationsModule } from '@modules/applications/applications.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CandidatesModule } from '@modules/candidates/candidates.module';
import { CompaniesModule } from '@modules/companies/companies.module';
import { EmbeddingsModule } from '@modules/embeddings/embeddings.module';
import { JobsModule } from '@modules/jobs/jobs.module';
import { MatchingModule } from '@modules/matching/matching.module';
import { MessagesModule } from '@modules/messages/messages.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { SkillsModule } from '@modules/skills/skills.module';
import { UploadsModule } from '@modules/uploads/uploads.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CandidatesModule,
    AdminModule,
    CompaniesModule,
    SkillsModule,
    JobsModule,
    ApplicationsModule,
    MessagesModule,
    NotificationsModule,
    MatchingModule,
    EmbeddingsModule,
    AiModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

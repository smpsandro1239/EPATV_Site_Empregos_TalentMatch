import { PrismaModule } from '@database/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

@Module({
  imports: [PrismaModule],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}

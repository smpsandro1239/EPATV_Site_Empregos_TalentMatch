import { PrismaModule } from '@database/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

import { JwtModule } from '@nestjs/jwt';
import { MessagesGateway } from './messages.gateway';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway],
  exports: [MessagesService],
})
export class MessagesModule {}

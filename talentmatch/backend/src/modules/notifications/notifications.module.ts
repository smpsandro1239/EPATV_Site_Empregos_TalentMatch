import { MessagesModule } from '@modules/messages/messages.module';
import { Global, Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

// CAMINHO CORRIGIDO:
import { PrismaModule } from '../../database/prisma/prisma.module';

@Global()
@Module({
  imports: [
    MessagesModule,
    PrismaModule, // Adicionei aqui
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}

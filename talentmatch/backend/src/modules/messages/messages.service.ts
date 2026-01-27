import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { MessagesGateway } from './messages.gateway';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private gateway: MessagesGateway,
  ) {}

  async sendMessage(applicationId: string, senderId: string, senderType: 'CANDIDATE' | 'COMPANY', content: string) {
    const message = await this.prisma.applicationMessage.create({
      data: {
        applicationId,
        senderId,
        senderType,
        content,
      },
    });

    // Notify other participant via WebSocket
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        candidate: { select: { userId: true } },
        job: { include: { company: { select: { userId: true } } } }
      },
    });

    if (application) {
      const recipientId = senderType === 'CANDIDATE'
        ? application.job.company.userId
        : application.candidate.userId;

      this.gateway.sendToUser(recipientId, 'newMessage', message);
    }

    return message;
  }

  async getMessages(applicationId: string) {
    return this.prisma.applicationMessage.findMany({
      where: { applicationId },
      orderBy: { createdAt: 'asc' },
    });
  }
}

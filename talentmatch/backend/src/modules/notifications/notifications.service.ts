import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@database/prisma/prisma.service';
import { MessagesGateway } from '@modules/messages/messages.gateway';
import { Resend } from 'resend';

@Injectable()
export class NotificationsService {
  private resend: Resend | null = null;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private gateway: MessagesGateway,
  ) {
    const apiKey = this.configService.get('RESEND_API_KEY');
    if (apiKey) {
      this.resend = new Resend(apiKey);
    }
  }

  async createNotification(userId: string, type: string, title: string, body: string) {
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        type,
        title,
        body,
      },
    });

    this.gateway.sendToUser(userId, 'newNotification', notification);
    return notification;
  }

  async getNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(notificationId: string) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  }

  async getUnreadCount(userId: string) {
    return this.prisma.notification.count({
      where: { userId, read: false },
    });
  }

  async sendEmail(to: string, subject: string, body: string) {
    if (!this.resend) {
      console.log('--- MOCK EMAIL (Set RESEND_API_KEY for real emails) ---');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body: ${body}`);
      console.log('------------------------------------------------------');
      return;
    }

    try {
      await this.resend.emails.send({
        from: 'TalentMatch <onboarding@resend.dev>',
        to,
        subject,
        html: `<p>${body}</p>`,
      });
      console.log(`Email enviado com sucesso para ${to}`);
    } catch (error) {
      console.error('Falha ao enviar email via Resend:', error);
    }
  }

  async notifyNewApplication(candidateName: string, jobTitle: string, companyEmail: string) {
    await this.sendEmail(
      companyEmail,
      'Nova Candidatura Recebida',
      `O candidato ${candidateName} candidatou-se à vaga "${jobTitle}".`,
    );
  }

  async notifyStatusChange(candidateEmail: string, jobTitle: string, newStatus: string) {
    await this.sendEmail(
      candidateEmail,
      'Atualização na sua Candidatura',
      `O estado da sua candidatura à vaga "${jobTitle}" foi alterado para: ${newStatus}.`,
    );
  }
}

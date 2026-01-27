import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private configService: ConfigService) {}

  async sendEmail(to: string, subject: string, body: string) {
    const apiKey = this.configService.get('RESEND_API_KEY');

    if (!apiKey) {
      console.log('--- MOCK EMAIL ---');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body: ${body}`);
      console.log('------------------');
      return;
    }

    // Actual Resend implementation would go here
    console.log(`Sending real email to ${to} via Resend...`);
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

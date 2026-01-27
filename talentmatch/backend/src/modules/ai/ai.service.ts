import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async improveJobDescription(description: string) {
    if (!this.configService.get('OPENAI_API_KEY')) {
      return description + "\n\n(AI improvement is disabled because OPENAI_API_KEY is not set)";
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'És um especialista em recrutamento. Melhora a descrição da vaga fornecida para torná-la mais apelativa e profissional em Português de Portugal.',
          },
          {
            role: 'user',
            content: description,
          },
        ],
      });

      return response.choices[0].message.content;
    } catch (error: any) {
      throw new InternalServerErrorException('Falha ao processar IA: ' + error.message);
    }
  }

  async improveResumeHeadline(headline: string, about: string) {
    if (!this.configService.get('OPENAI_API_KEY')) {
      return headline;
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'És um consultor de carreira. Com base no resumo profissional, sugere um headline (título) mais impactante para o perfil do candidato em Português de Portugal.',
          },
          {
            role: 'user',
            content: `Headline atual: ${headline}\nResumo: ${about}`,
          },
        ],
      });

      return response.choices[0].message.content;
    } catch (error: any) {
      throw new InternalServerErrorException('Falha ao processar IA: ' + error.message);
    }
  }
}

import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class EmbeddingsService {
  private openai: OpenAI;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.configService.get('OPENAI_API_KEY')) {
      return new Array(1536).fill(0);
    }

    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
      });

      return response.data[0].embedding;
    } catch (error: any) {
      throw new InternalServerErrorException('Falha ao gerar embedding: ' + error.message);
    }
  }

  async saveEmbedding(entityType: 'job' | 'candidate', entityId: string, text: string) {
    const vector = await this.generateEmbedding(text);

    return this.prisma.embedding.upsert({
      where: { id: `${entityType}_${entityId}` }, // Assuming we use a composite ID or similar
      update: {
        vector: JSON.stringify(vector),
      },
      create: {
        id: `${entityType}_${entityId}`,
        entityType,
        entityId,
        vector: JSON.stringify(vector),
      },
    });
  }

  // Cosine similarity in JS (since we store as string for now)
  calculateSimilarity(v1: number[], v2: number[]): number {
    let dotProduct = 0;
    let mA = 0;
    let mB = 0;
    for (let i = 0; i < v1.length; i++) {
      dotProduct += v1[i] * v2[i];
      mA += v1[i] * v1[i];
      mB += v2[i] * v2[i];
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    return dotProduct / (mA * mB);
  }
}

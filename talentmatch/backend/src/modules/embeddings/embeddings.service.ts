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
    const apiKey = this.configService.get('OPENAI_API_KEY');
    if (!apiKey || apiKey === 'your_openai_api_key') {
      console.warn('OPENAI_API_KEY not set, using dummy embedding');
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
    const vectorString = `[${vector.join(',')}]`;
    const id = `${entityType}_${entityId}`;

    // Use raw SQL to insert vector since Prisma doesn't support vector type natively for writing easily
    return this.prisma.$executeRawUnsafe(
      `INSERT INTO "Embedding" (id, "entityType", "entityId", vector, "createdAt")
       VALUES ($1, $2, $3, $4::vector, NOW())
       ON CONFLICT (id) DO UPDATE SET vector = $4::vector`,
      id, entityType, entityId, vectorString
    );
  }

  /**
   * Calcula a similaridade entre duas entidades usando pgvector no banco de dados
   */
  async getSimilarity(id1: string, id2: string): Promise<number> {
    try {
        const result: any[] = await this.prisma.$queryRawUnsafe(
            `SELECT (1 - (e1.vector <=> e2.vector)) as similarity
             FROM "Embedding" e1, "Embedding" e2
             WHERE e1.id = $1 AND e2.id = $2`,
            id1, id2
        );

        if (result.length > 0) {
            return result[0].similarity;
        }
        return 0;
    } catch (error) {
        console.error('Erro ao calcular similaridade no DB:', error);
        return 0;
    }
  }

  // Fallback Cosine similarity in JS if needed
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
    if (mA === 0 || mB === 0) return 0;
    return dotProduct / (mA * mB);
  }
}

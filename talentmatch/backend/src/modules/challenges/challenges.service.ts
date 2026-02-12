import { PrismaService } from '@database/prisma/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SubmitQuizDto, CreateChallengeDto } from './dto/challenge.dto';

@Injectable()
export class ChallengesService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string) {
    return this.prisma.challenge.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id },
    });
    if (!challenge) throw new NotFoundException('Desafio não encontrado');
    return challenge;
  }

  async create(dto: CreateChallengeDto) {
    return this.prisma.challenge.create({ data: dto });
  }

  async submitQuiz(userId: string, challengeId: string, dto: SubmitQuizDto) {
    const candidate = await this.prisma.candidateProfile.findUnique({
      where: { userId },
    });
    if (!candidate) throw new BadRequestException('Apenas candidatos podem participar');

    const challenge = await this.findOne(challengeId);
    if (challenge.type !== 'QUIZ') throw new BadRequestException('Não é um quiz');

    const content = JSON.parse(challenge.content);
    const questions = content.questions;

    let correct = 0;
    dto.answers.forEach(ans => {
      const q = questions.find((q: any) => q.id === ans.questionId);
      if (q && q.correctOption === ans.selectedOption) {
        correct++;
      }
    });

    const score = (correct / questions.length) * 100;
    const passed = score >= 70; // 70% to pass

    return this.prisma.challengeResult.upsert({
      where: {
        challengeId_candidateId: {
          challengeId,
          candidateId: candidate.id,
        },
      },
      update: {
        score,
        passed,
        completedAt: new Date(),
      },
      create: {
        challengeId,
        candidateId: candidate.id,
        score,
        passed,
      },
    });
  }

  async getCandidateResults(userId: string) {
    const candidate = await this.prisma.candidateProfile.findUnique({
      where: { userId },
    });
    if (!candidate) return [];

    return this.prisma.challengeResult.findMany({
      where: { candidateId: candidate.id },
      include: { challenge: true },
    });
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { MatchingService } from './matching.service';
import { PrismaService } from '@database/prisma/prisma.service';
import { EmbeddingsService } from '../embeddings/embeddings.service';

describe('MatchingService', () => {
  let service: MatchingService;
  let prisma: PrismaService;

  const mockEmbeddingsService = {
    generateEmbedding: jest.fn().mockResolvedValue(new Array(1536).fill(0)),
    calculateSimilarity: jest.fn().mockReturnValue(0.8),
  };

  const mockPrismaService = {
    job: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    application: {
      findMany: jest.fn(),
    },
    candidateProfile: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchingService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: EmbeddingsService, useValue: mockEmbeddingsService },
      ],
    }).compile();

    service = module.get<MatchingService>(MatchingService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateMatchScore (via private method check)', () => {
    it('should calculate a score correctly', async () => {
      // Since calculateMatchScore is private, we test it through public methods
      // or we can cast to any for direct testing of logic
      const result = await (service as any).calculateMatchScore(
        'candidate-id',
        'job-id',
        ['React', 'Node.js'],
        ['React', 'Node.js', 'TypeScript'],
        'Lisboa',
        'Lisboa',
        'MID',
        'MID',
        5000,
        5000,
        'ON_SITE'
      );

      expect(result.score).toBeGreaterThan(50);
      expect(result.reason).toContain('✅ Location match');
    });
  });
});

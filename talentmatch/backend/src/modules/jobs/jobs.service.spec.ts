import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { PrismaService } from '@database/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('JobsService', () => {
  let service: JobsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    job: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      groupBy: jest.fn(),
    },
    candidateProfile: {
        findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getJobById', () => {
    it('should throw NotFoundException if job not found', async () => {
      mockPrismaService.job.findUnique.mockResolvedValue(null);

      await expect(service.getJobById('1')).rejects.toThrow(NotFoundException);
    });

    it('should return job if found', async () => {
      const mockJob = { id: '1', title: 'Test Job' };
      mockPrismaService.job.findUnique.mockResolvedValue(mockJob);

      const result = await service.getJobById('1');
      expect(result).toEqual(mockJob);
    });
  });
});

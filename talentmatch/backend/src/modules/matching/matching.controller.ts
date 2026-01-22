import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MatchingService } from './matching.service';

@ApiTags('Matching')
@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  /**
   * Obtém candidatos ordenados por matching score para uma vaga específica
   * GET /matching/candidates-for-job/:jobId?limit=50&offset=0
   */
  @Get('candidates-for-job/:jobId')
  @ApiOperation({ summary: 'Get candidates for job sorted by match score' })
  async getCandidatesForJob(
    @Param('jobId') jobId: string,
    @Query('limit') limit: number = 50,
    @Query('offset') offset: number = 0,
  ) {
    try {
      return await this.matchingService.getCandidatesForJob(jobId, limit, offset);
    } catch (error: any) {
      console.error('[MatchingController.getCandidatesForJob] Error:', error);
      return { error: error.message };
    }
  }

  /**
   * Obtém vagas ordenadas por matching score para um candidato específico
   * GET /matching/jobs-for-candidate/:candidateId?limit=50&offset=0
   */
  @Get('jobs-for-candidate/:candidateId')
  @ApiOperation({ summary: 'Get jobs for candidate sorted by match score' })
  async getJobsForCandidate(
    @Param('candidateId') candidateId: string,
    @Query('limit') limit: number = 50,
    @Query('offset') offset: number = 0,
  ) {
    try {
      return await this.matchingService.getJobsForCandidate(candidateId, limit, offset);
    } catch (error: any) {
      console.error('[MatchingController.getJobsForCandidate] Error:', error);
      return { error: error.message };
    }
  }
}

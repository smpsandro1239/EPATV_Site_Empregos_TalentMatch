import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JobsService } from './jobs.service';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  /**
   * Get all jobs with pagination
   * GET /jobs?limit=20&offset=0
   */
  @Get()
  @ApiOperation({ summary: 'List all jobs' })
  async listJobs(
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0',
  ) {
    const limitNum = parseInt(limit, 10) || 20;
    const offsetNum = parseInt(offset, 10) || 0;
    try {
      return await this.jobsService.listJobs(limitNum, offsetNum);
    } catch (error: any) {
      console.error('[JobsController.listJobs] Error:', error);
      return { data: [], pagination: { total: 0, limit: limitNum, offset: offsetNum, hasMore: false } };
    }
  }

  /**
   * Search jobs with filters
   * GET /jobs/search?query=developer&level=SENIOR&location=São Paulo
   */
  @Get('search')
  @ApiOperation({ summary: 'Search jobs with filters' })
  async searchJobs(
    @Query('query') query?: string,
    @Query('level') level?: string,
    @Query('contractType') contractType?: string,
    @Query('location') location?: string,
    @Query('remoteType') remoteType?: string,
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0',
  ) {
    const limitNum = parseInt(limit, 10) || 20;
    const offsetNum = parseInt(offset, 10) || 0;
    try {
      return await this.jobsService.searchJobs({
        query,
        level,
        contractType,
        location,
        remoteType,
        limit: limitNum,
        offset: offsetNum,
      });
    } catch (error: any) {
      console.error('[JobsController.searchJobs] Error:', error);
      return { data: [], pagination: { total: 0, limit: limitNum, offset: offsetNum, hasMore: false } };
    }
  }

  /**
   * Get job details by ID
   * GET /jobs/:id
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get job details' })
  async getJob(@Param('id') id: string) {
    try {
      return await this.jobsService.getJobById(id);
    } catch (error: any) {
      console.error('[JobsController.getJob] Error:', error);
      throw error;
    }
  }

  /**
   * Get jobs by company ID
   * GET /jobs/company/:companyId
   */
  @Get('company/:companyId')
  @ApiOperation({ summary: 'Get jobs by company' })
  async getJobsByCompany(
    @Param('companyId') companyId: string,
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0',
  ) {
    const limitNum = parseInt(limit, 10) || 20;
    const offsetNum = parseInt(offset, 10) || 0;
    try {
      return await this.jobsService.getJobsByCompanyId(companyId, limitNum, offsetNum);
    } catch (error: any) {
      console.error('[JobsController.getJobsByCompany] Error:', error);
      throw error;
    }
  }

  /**
   * Get recommended jobs for candidate based on skills
   * GET /jobs/recommended/:candidateId
   */
  @Get('recommended/:candidateId')
  @ApiOperation({ summary: 'Get recommended jobs for candidate' })
  async getRecommendedJobs(
    @Param('candidateId') candidateId: string,
    @Query('limit') limit: string = '10',
  ) {
    try {
      const limitNum = parseInt(limit, 10) || 10;
      return await this.jobsService.getRecommendedJobs(candidateId, limitNum);
    } catch (error: any) {
      console.error('[JobsController.getRecommendedJobs] Error:', error);
      throw error;
    }
  }

  /**
   * Get jobs matching candidate's skills
   * GET /jobs/match/:candidateId
   */
  @Get('match/:candidateId')
  @ApiOperation({ summary: 'Get jobs matching candidate skills' })
  async getJobsBySkillsMatch(
    @Param('candidateId') candidateId: string,
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0',
  ) {
    try {
      const limitNum = parseInt(limit, 10) || 20;
      const offsetNum = parseInt(offset, 10) || 0;

      return await this.jobsService.getJobsBySkillsMatch(candidateId, limitNum, offsetNum);
    } catch (error: any) {
      console.error('[JobsController.getJobsBySkillsMatch] Error:', error);
      throw error;
    }
  }

  /**
   * Get jobs statistics
   * GET /jobs/stats
   */
  @Get('stats')
  @ApiOperation({ summary: 'Get jobs statistics' })
  async getJobsStats() {
    try {
      const total = await this.jobsService.countJobs();
      const byStatus = await this.jobsService.countJobsByStatus();

      return {
        total,
        byStatus,
      };
    } catch (error: any) {
      console.error('[JobsController.getJobsStats] Error:', error);
      throw error;
    }
  }
}

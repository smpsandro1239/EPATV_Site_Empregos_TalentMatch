import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto, CreateJobDto, UpdateCompanyDto } from './dto';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  // Company Profile Endpoints
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create company profile' })
  async createProfile(@Request() req: any, @Body() dto: CreateCompanyDto) {
    return this.companiesService.createProfile({
      userId: req.user.userId,
      ...dto,
    });
  }

  @Get()
  @ApiOperation({ summary: 'List all companies' })
  async listCompanies(@Query('limit') limit: number = 10, @Query('offset') offset: number = 0) {
    try {
      return await this.companiesService.listCompanies(limit, offset);
    } catch (error: any) {
      console.error('[CompaniesController.listCompanies] Error:', error);
      return [];
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company profile' })
  async getProfile(@Param('id') id: string) {
    return this.companiesService.getProfile(id);
  }

  @Get('by-user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get company profile by user ID' })
  async getCompanyByUserId(@Param('userId') userId: string) {
    return this.companiesService.getCompanyByUserId(userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update company profile' })
  async updateProfile(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return this.companiesService.updateProfile(id, dto);
  }

  // Job Endpoints
  @Post(':id/jobs')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create job posting' })
  async createJob(@Param('id') companyId: string, @Body() dto: CreateJobDto) {
    return this.companiesService.createJob({
      companyId,
      ...dto,
    });
  }

  @Get(':id/jobs')
  @ApiOperation({ summary: 'List company jobs' })
  async getCompanyJobs(
    @Param('id') companyId: string,
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
  ) {
    return this.companiesService.getCompanyJobs(companyId, limit, offset);
  }

  @Get('jobs/search')
  @ApiOperation({ summary: 'Search jobs' })
  async searchJobs(@Query('q') query: string, @Query('limit') limit: number = 20) {
    if (!query) {
      return this.companiesService.listJobs(limit);
    }
    return this.companiesService.searchJobs(query, limit);
  }

  @Get('jobs')
  @ApiOperation({ summary: 'List all jobs with filters' })
  async listJobs(
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
    @Query('level') level?: string,
    @Query('contractType') contractType?: string,
    @Query('location') location?: string,
  ) {
    return this.companiesService.listJobs(limit, offset, { level, contractType, location });
  }

  @Get('jobs/:jobId')
  @ApiOperation({ summary: 'Get job details' })
  async getJob(@Param('jobId') jobId: string) {
    return this.companiesService.getJob(jobId);
  }

  @Put('jobs/:jobId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update job posting' })
  async updateJob(@Param('jobId') jobId: string, @Body() dto: CreateJobDto) {
    return this.companiesService.updateJob(jobId, dto);
  }

  @Delete('jobs/:jobId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete job posting' })
  async deleteJob(@Param('jobId') jobId: string) {
    return this.companiesService.deleteJob(jobId);
  }

  // Job Status Management
  @Post('jobs/:jobId/publish')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publish job posting' })
  async publishJob(@Param('jobId') jobId: string) {
    return this.companiesService.publishJob(jobId);
  }

  @Post('jobs/:jobId/pause')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Pause job posting' })
  async pauseJob(@Param('jobId') jobId: string) {
    return this.companiesService.pauseJob(jobId);
  }

  @Post('jobs/:jobId/close')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Close job posting' })
  async closeJob(@Param('jobId') jobId: string) {
    return this.companiesService.closeJob(jobId);
  }

  // Application Management
  // Reviews
  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a review to a company' })
  async addReview(
    @Param('id') companyId: string,
    @Request() req: any,
    @Body('rating') rating: number,
    @Body('comment') comment?: string,
  ) {
    const candidate = await this.companiesService.getCandidateByUserId(req.user.userId);
    if (!candidate) throw new BadRequestException('Only candidates can leave reviews');

    return this.companiesService.addReview(companyId, candidate.id, rating, comment);
  }

  @Get(':id/reviews')
  @ApiOperation({ summary: 'Get all reviews for a company' })
  async getCompanyReviews(@Param('id') companyId: string) {
    return this.companiesService.getCompanyReviews(companyId);
  }

  @Get(':id/stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get company dashboard statistics' })
  async getCompanyStats(@Param('id') id: string) {
    return this.companiesService.getCompanyStats(id);
  }

  @Get(':id/applications')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List applications for company jobs' })
  async getCompanyApplications(
    @Param('id') companyId: string,
    @Query('status') status?: string,
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
  ) {
    return this.companiesService.getCompanyApplications(companyId, status, limit, offset);
  }
}

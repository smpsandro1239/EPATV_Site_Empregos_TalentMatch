import { Body, Controller, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto, UpdateApplicationStatusDto } from './dto';
// FIX: Add the missing import here
import { CandidatesService } from '@modules/candidates/candidates.service';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly candidatesService: CandidatesService,
  ) {}

  // List All Applications
  @Get()
  @ApiOperation({ summary: 'List all applications' })
  async listApplications(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    try {
      const limitNum = limit && !isNaN(parseInt(limit, 10)) ? parseInt(limit, 10) : 20;
      const offsetNum = offset && !isNaN(parseInt(offset, 10)) ? parseInt(offset, 10) : 0;
      return await this.applicationsService.listApplications(limitNum, offsetNum);
    } catch (error: any) {
      console.error('[ApplicationsController.listApplications] Error:', error);
      return [];
    }
  }

  // Create Application
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit job application' })
  async createApplication(@Request() req: any, @Body() dto: CreateApplicationDto) {
    // Get candidate profile by user ID
    const candidateProfile = await this.candidatesService.getProfileByUserId(req.user.userId);
    if (!candidateProfile) {
      throw new Error('Candidate profile not found');
    }

    return this.applicationsService.createApplication({
      candidateId: candidateProfile.id,
      ...dto,
    });
  }

  // Get Single Application
  @Get(':id')
  @ApiOperation({ summary: 'Get application details' })
  async getApplication(@Param('id') id: string) {
    return this.applicationsService.getApplication(id);
  }

  // Get Candidate Applications
  @Get('candidate/:candidateId')
  @ApiOperation({ summary: 'List candidate applications' })
  async getCandidateApplications(
    @Param('candidateId') candidateId: string,
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
  ) {
    return this.applicationsService.getCandidateApplications(candidateId, limit, offset);
  }

  // Get Job Applications
  @Get('job/:jobId')
  @ApiOperation({ summary: 'List job applications' })
  async getJobApplications(
    @Param('jobId') jobId: string,
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
  ) {
    return this.applicationsService.getJobApplications(jobId, limit, offset);
  }

  // Get Job Application Stats
  @Get('job/:jobId/stats')
  @ApiOperation({ summary: 'Get application statistics for job' })
  async getJobApplicationStats(@Param('jobId') jobId: string) {
    return this.applicationsService.getJobApplicationStats(jobId);
  }

  // Update Application Status
  @Put(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update application status' })
  async updateApplicationStatus(@Param('id') id: string, @Body() dto: UpdateApplicationStatusDto) {
    return this.applicationsService.updateApplicationStatus(id, dto);
  }

  // Reject Application
  @Put(':id/reject')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reject application' })
  async rejectApplication(@Param('id') id: string, @Body('notes') notes?: string) {
    return this.applicationsService.rejectApplication(id, notes);
  }

  // Accept Application
  @Put(':id/accept')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Accept application' })
  async acceptApplication(@Param('id') id: string, @Body('notes') notes?: string) {
    return this.applicationsService.acceptApplication(id, notes);
  }
}

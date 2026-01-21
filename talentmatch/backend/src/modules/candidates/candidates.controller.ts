import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CandidatesService } from './candidates.service';
import { AddEducationDto, AddExperienceDto, AddSkillDto, CreateCandidateDto } from './dto';

@ApiTags('Candidates')
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create candidate profile' })
  async createProfile(@Request() req: any, @Body() dto: CreateCandidateDto) {
    return this.candidatesService.createProfile({
      userId: req.user.userId,
      ...dto,
    });
  }

  @Get()
  @ApiOperation({ summary: 'List all candidates' })
  async listCandidates(@Query('limit') limit: number = 10, @Query('offset') offset: number = 0) {
    try {
      return await this.candidatesService.listCandidates(limit, offset);
    } catch (error: any) {
      console.error('[CandidatesController.listCandidates] Error:', error);
      return [];
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get candidate profile' })
  async getProfile(@Param('id') id: string) {
    return this.candidatesService.getProfile(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update candidate profile' })
  async updateProfile(@Param('id') id: string, @Body() dto: CreateCandidateDto) {
    return this.candidatesService.updateProfile(id, dto);
  }

  // Experience endpoints
  @Post(':id/experiences')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add experience to candidate' })
  async addExperience(@Param('id') id: string, @Body() dto: AddExperienceDto) {
    return this.candidatesService.addExperience({
      candidateId: id,
      ...dto,
    });
  }

  @Get(':id/experiences')
  @ApiOperation({ summary: 'Get candidate experiences' })
  async getExperiences(@Param('id') id: string) {
    return this.candidatesService.getExperiences(id);
  }

  @Put(':id/experiences/:expId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update experience' })
  async updateExperience(@Param('id') id: string, @Param('expId') expId: string, @Body() dto: AddExperienceDto) {
    return this.candidatesService.updateExperience(expId, {
      candidateId: id,
      ...dto,
    });
  }

  @Delete(':id/experiences/:expId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete experience' })
  async deleteExperience(@Param('expId') expId: string) {
    return this.candidatesService.deleteExperience(expId);
  }

  // Education endpoints
  @Post(':id/educations')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add education to candidate' })
  async addEducation(@Param('id') id: string, @Body() dto: AddEducationDto) {
    return this.candidatesService.addEducation({
      candidateId: id,
      ...dto,
    });
  }

  @Get(':id/educations')
  @ApiOperation({ summary: 'Get candidate educations' })
  async getEducations(@Param('id') id: string) {
    return this.candidatesService.getEducations(id);
  }

  @Put(':id/educations/:eduId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update education' })
  async updateEducation(@Param('id') id: string, @Param('eduId') eduId: string, @Body() dto: AddEducationDto) {
    return this.candidatesService.updateEducation(eduId, {
      candidateId: id,
      ...dto,
    });
  }

  @Delete(':id/educations/:eduId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete education' })
  async deleteEducation(@Param('eduId') eduId: string) {
    return this.candidatesService.deleteEducation(eduId);
  }

  // Skills endpoints
  @Post(':id/skills')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add skill to candidate' })
  async addSkill(@Param('id') id: string, @Body() dto: AddSkillDto) {
    return this.candidatesService.addSkill({
      candidateId: id,
      ...dto,
    });
  }

  @Get(':id/skills')
  @ApiOperation({ summary: 'Get candidate skills' })
  async getCandidateSkills(@Param('id') id: string) {
    return this.candidatesService.getCandidateSkills(id);
  }

  @Delete(':id/skills/:skillId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove skill from candidate' })
  async removeSkill(@Param('id') id: string, @Param('skillId') skillId: string) {
    return this.candidatesService.removeSkill(id, skillId);
  }
}

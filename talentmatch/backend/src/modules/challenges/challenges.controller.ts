import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChallengesService } from './challenges.service';
import { SubmitQuizDto, CreateChallengeDto } from './dto/challenge.dto';

@ApiTags('Challenges')
@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  @ApiOperation({ summary: 'List all challenges' })
  async findAll(@Query('category') category?: string) {
    return this.challengesService.findAll(category);
  }

  @Get('my-results')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user challenge results' })
  async getMyResults(@Request() req: any) {
    return this.challengesService.getCandidateResults(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get challenge details' })
  async findOne(@Param('id') id: string) {
    return this.challengesService.findOne(id);
  }

  @Post(':id/submit')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit quiz answers' })
  async submitQuiz(@Param('id') id: string, @Request() req: any, @Body() dto: SubmitQuizDto) {
    return this.challengesService.submitQuiz(req.user.userId, id, dto);
  }

  @Post()
  @ApiOperation({ summary: 'Create challenge (Admin only)' })
  async create(@Body() dto: CreateChallengeDto) {
    return this.challengesService.create(dto);
  }
}

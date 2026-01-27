import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AiService } from './ai.service';

@ApiTags('AI')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('improve-job-description')
  @ApiOperation({ summary: 'Improve job description using AI' })
  async improveJobDescription(@Body('description') description: string) {
    return { description: await this.aiService.improveJobDescription(description) };
  }

  @Post('improve-headline')
  @ApiOperation({ summary: 'Improve candidate headline using AI' })
  async improveHeadline(@Body('headline') headline: string, @Body('about') about: string) {
    return { headline: await this.aiService.improveResumeHeadline(headline, about) };
  }
}

import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessagesService } from './messages.service';

@ApiTags('Messages')
@Controller('messages')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post(':applicationId')
  @ApiOperation({ summary: 'Send a message' })
  async sendMessage(
    @Param('applicationId') applicationId: string,
    @Request() req: any,
    @Body('content') content: string,
  ) {
    return this.messagesService.sendMessage(
      applicationId,
      req.user.userId,
      req.user.role,
      content,
    );
  }

  @Get(':applicationId')
  @ApiOperation({ summary: 'Get messages for an application' })
  async getMessages(@Param('applicationId') applicationId: string) {
    return this.messagesService.getMessages(applicationId);
  }
}

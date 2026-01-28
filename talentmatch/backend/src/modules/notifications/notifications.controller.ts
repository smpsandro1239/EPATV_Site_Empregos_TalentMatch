import { Controller, Get, Param, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user notifications' })
  async getNotifications(@Request() req: any) {
    return this.notificationsService.getNotifications(req.user.userId);
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Get unread notifications count' })
  async getUnreadCount(@Request() req: any) {
    return { count: await this.notificationsService.getUnreadCount(req.user.userId) };
  }

  @Put('mark-all-read')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  async markAllRead(@Request() req: any) {
    return this.notificationsService.markAllRead(req.user.userId);
  }

  @Put(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }
}

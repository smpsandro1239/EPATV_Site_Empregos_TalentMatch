import { Body, Controller, Delete, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DevicesService } from './devices.service';

@Controller('devices')
@UseGuards(JwtAuthGuard)
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('register')
  async register(@Request() req: any, @Body() body: { fcmToken: string, platform: string }) {
    return this.devicesService.registerDevice(req.user.userId, body.fcmToken, body.platform);
  }

  @Delete('unregister')
  async unregister(@Body() body: { fcmToken: string }) {
    return this.devicesService.unregisterDevice(body.fcmToken);
  }

  @Get()
  async getMyDevices(@Request() req: any) {
    return this.devicesService.getUserDevices(req.user.userId);
  }
}

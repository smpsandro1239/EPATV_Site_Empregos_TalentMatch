import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  async registerDevice(userId: string, fcmToken: string, platform: string) {
    return this.prisma.device.upsert({
      where: { fcmToken },
      update: { userId, platform },
      create: { userId, fcmToken, platform },
    });
  }

  async unregisterDevice(fcmToken: string) {
    return this.prisma.device.delete({
      where: { fcmToken },
    });
  }

  async getUserDevices(userId: string) {
    return this.prisma.device.findMany({
      where: { userId },
    });
  }
}

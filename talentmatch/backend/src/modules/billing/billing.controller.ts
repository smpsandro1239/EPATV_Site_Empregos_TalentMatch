import { Controller, Post, Get, Body, UseGuards, Request, Headers, RawBodyRequest } from '@nestjs/common';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';

@Controller('billing')
export class BillingController {
  constructor(
      private readonly billingService: BillingService,
      private readonly prisma: PrismaService
  ) {}

  @Post('checkout')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  async createCheckout(@Request() req: any, @Body() body: { plan: string }) {
    const company = await this.prisma.company.findUnique({
        where: { userId: req.user.userId }
    });
    if (!company) throw new Error('Company profile not found');
    return this.billingService.createCheckoutSession(company.id, body.plan);
  }

  @Get('subscription')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  async getSubscription(@Request() req: any) {
    const company = await this.prisma.company.findUnique({
        where: { userId: req.user.userId }
    });
    if (!company) throw new Error('Company profile not found');
    return this.billingService.getSubscription(company.id);
  }

  @Post('webhook')
  async webhook(@Headers('stripe-signature') sig: string, @Request() req: RawBodyRequest<any>) {
    return this.billingService.handleWebhook(sig, req.rawBody);
  }
}

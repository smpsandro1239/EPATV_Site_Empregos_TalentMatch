import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class BillingService implements OnModuleInit {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY') || 'sk_test_mock';
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-01-27.acacia' as any,
    });
  }

  async onModuleInit() {}

  async createCheckoutSession(companyId: string, plan: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      include: { user: true, subscription: true },
    });

    if (!company) throw new Error('Company not found');

    // Mock implementation for development/testing without Stripe integration
    const isMock = this.configService.get<string>('STRIPE_SECRET_KEY') === 'sk_test_mock' || !this.configService.get<string>('STRIPE_SECRET_KEY');

    if (isMock) {
      // Create or update subscription in database
      await this.prisma.subscription.upsert({
        where: { companyId },
        update: {
          plan,
          status: 'active',
          stripeCustomerId: 'mock_customer_' + companyId,
          stripeSubscriptionId: 'mock_subscription_' + companyId + '_' + plan,
        },
        create: {
          companyId,
          plan,
          status: 'active',
          stripeCustomerId: 'mock_customer_' + companyId,
          stripeSubscriptionId: 'mock_subscription_' + companyId + '_' + plan,
        },
      });

      return {
        sessionId: 'mock_session_' + Date.now(),
        url: `${this.configService.get('FRONTEND_URL') || 'http://localhost:3000'}/company/billing/success?session_id=mock_session`
      };
    }

    // Real Stripe implementation
    let customerId = company.subscription?.stripeCustomerId;

    if (!customerId) {
      const customer = await this.stripe.customers.create({
        email: company.user.email,
        name: company.name,
        metadata: { companyId },
      });
      customerId = customer.id;
    }

    const priceId = this.getPriceId(plan);

    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${this.configService.get('FRONTEND_URL') || 'http://localhost:3000'}/company/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get('FRONTEND_URL') || 'http://localhost:3000'}/company/billing/cancel`,
      metadata: { companyId, plan },
    });

    return { sessionId: session.id, url: session.url };
  }

  private getPriceId(plan: string): string {
    if (plan === 'PRO') return this.configService.get('STRIPE_PRO_PRICE_ID') || 'price_mock_pro';
    if (plan === 'ENTERPRISE') return this.configService.get('STRIPE_ENTERPRISE_PRICE_ID') || 'price_mock_ent';
    return '';
  }

  async handleWebhook(sig: string, payload: Buffer) {
    const endpointSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    let event: Stripe.Event;

    try {
      if (!endpointSecret) {
          event = JSON.parse(payload.toString());
      } else {
          event = this.stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      }
    } catch (err: any) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
    }
  }

  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const companyId = session.metadata?.companyId;
    const plan = session.metadata?.plan as any;
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    if (!companyId) return;

    await this.prisma.subscription.upsert({
      where: { companyId },
      update: {
        plan,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        status: 'active',
      },
      create: {
        companyId,
        plan,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        status: 'active',
      },
    });
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const dbSubscription = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (!dbSubscription) return;

    await this.prisma.subscription.update({
      where: { id: dbSubscription.id },
      data: {
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });
  }

  async getSubscription(companyId: string) {
    return this.prisma.subscription.findUnique({
      where: { companyId },
    });
  }
}

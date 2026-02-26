import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  public readonly stripe: Stripe;
  public readonly webhookSecret: string;
  public readonly publishableKey: string;

  constructor(private config: ConfigService) {
    const secret = this.config.get<string>('STRIPE_SECRET_KEY') ?? '';
    this.stripe = secret
      ? new Stripe(secret, { apiVersion: '2025-02-24.acacia' })
      : (null as unknown as Stripe);
    this.webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET') ?? '';
    this.publishableKey = this.config.get<string>('STRIPE_PUBLISHABLE_KEY') ?? '';
  }

  get isConfigured(): boolean {
    return this.stripe !== null;
  }
}

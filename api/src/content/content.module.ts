import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ContentBlock,
  ContentBlockSchema,
  Category,
  CategorySchema,
  TripTemplate,
  TripTemplateSchema,
  ConciergeStarter,
  ConciergeStarterSchema,
  LoyaltyTier,
  LoyaltyTierSchema,
  Benefit,
  BenefitSchema,
  Reward,
  RewardSchema,
} from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContentBlock.name, schema: ContentBlockSchema },
      { name: Category.name, schema: CategorySchema },
      { name: TripTemplate.name, schema: TripTemplateSchema },
      { name: ConciergeStarter.name, schema: ConciergeStarterSchema },
      { name: LoyaltyTier.name, schema: LoyaltyTierSchema },
      { name: Benefit.name, schema: BenefitSchema },
      { name: Reward.name, schema: RewardSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class ContentModule {}

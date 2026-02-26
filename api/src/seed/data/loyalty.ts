/**
 * Loyalty tiers (4), benefits, and redemption catalog (10+ rewards).
 * Tiers are inserted first; benefit tierIds and reward docs reference tier _ids (set in runner).
 */
export const loyaltyTierSeeds = [
  { slug: 'explorer', name: 'Explorer', minPoints: 0, maxPoints: 4999, description: 'Start your journey. Earn points on every booking and unlock member rates.', perkDescriptions: ['Member rates', 'Newsletter', 'Points on every stay and tour'], order: 0 },
  { slug: 'voyager', name: 'Voyager', minPoints: 5000, maxPoints: 19999, description: 'Frequent traveller. Enjoy priority support and room upgrades when available.', perkDescriptions: ['Priority support', 'Room upgrades when available', 'Early access to offers', 'Bonus points on selected trips'], order: 1 },
  { slug: 'elite', name: 'Elite', minPoints: 20000, maxPoints: 49999, description: 'Elite status. Dedicated concierge and complimentary extras.', perkDescriptions: ['Dedicated concierge', 'Complimentary breakfast', 'Airport transfers on selected bookings', 'Elite-only events'], order: 2 },
  { slug: 'platinum', name: 'Platinum', minPoints: 50000, maxPoints: 999999, description: 'Our most valued guests. VIP experiences and exclusive access.', perkDescriptions: ['VIP experiences', 'Complimentary night stays', 'Exclusive events', 'Birthday and anniversary recognition'], order: 3 },
];

export interface BenefitSeed {
  title: string;
  description: string;
  tierSlugs: string[]; // runner maps to tierIds
  order: number;
}

export const benefitSeeds: BenefitSeed[] = [
  { title: 'Room upgrade', description: 'Complimentary upgrade when available at check-in.', tierSlugs: ['voyager', 'elite', 'platinum'], order: 0 },
  { title: 'Late checkout', description: 'Extended checkout until 2 PM subject to availability.', tierSlugs: ['elite', 'platinum'], order: 1 },
  { title: 'Welcome amenity', description: 'In-room welcome gift at participating hotels.', tierSlugs: ['voyager', 'elite', 'platinum'], order: 2 },
  { title: 'Dedicated concierge', description: 'Personal concierge for trip planning and on-trip support.', tierSlugs: ['elite', 'platinum'], order: 3 },
  { title: 'Complimentary breakfast', description: 'Daily breakfast for two at participating properties.', tierSlugs: ['elite', 'platinum'], order: 4 },
  { title: 'Airport transfer', description: 'One complimentary airport transfer per stay (selected destinations).', tierSlugs: ['platinum'], order: 5 },
];

export interface RewardSeed {
  name: string;
  description: string;
  pointsCost: number;
  imagePrompt: string;
  imageAltText: string;
  active: boolean;
  order: number;
}

export const rewardSeeds: RewardSeed[] = [
  { name: '$50 Travel Credit', description: 'Redeem against your next booking. No expiry for Platinum.', pointsCost: 5000, imagePrompt: 'Elegant gift card or credit card style, luxury travel brand, 8K.', imageAltText: '$50 travel credit reward.', active: true, order: 0 },
  { name: 'Complimentary Breakfast', description: 'One day breakfast for two at a participating hotel.', pointsCost: 2500, imagePrompt: 'Luxury breakfast spread, pastries, fruit, coffee, 8K.', imageAltText: 'Complimentary breakfast for two.', active: true, order: 1 },
  { name: '$100 Travel Credit', description: 'Redeem against any tour or hotel booking.', pointsCost: 10000, imagePrompt: 'Premium travel credit visual, golden accent, 8K.', imageAltText: '$100 travel credit.', active: true, order: 2 },
  { name: 'Spa Treatment', description: 'One 60-minute spa treatment at a partner property.', pointsCost: 15000, imagePrompt: 'Spa treatment room, serene, soft light, wellness, 8K.', imageAltText: 'Spa treatment reward.', active: true, order: 3 },
  { name: 'Airport Lounge Pass', description: 'Single-use lounge pass at selected airports.', pointsCost: 3000, imagePrompt: 'Airport lounge interior, comfortable seating, 8K.', imageAltText: 'Airport lounge pass.', active: true, order: 4 },
  { name: '$250 Travel Credit', description: 'Larger credit toward your next luxury trip.', pointsCost: 25000, imagePrompt: 'Luxury travel credit, premium design, 8K.', imageAltText: '$250 travel credit.', active: true, order: 5 },
  { name: 'Complimentary Night', description: 'One complimentary night at a participating hotel (subject to availability).', pointsCost: 35000, imagePrompt: 'Luxury hotel room, bed with soft linen, 8K.', imageAltText: 'Complimentary night stay.', active: true, order: 6 },
  { name: 'Private Transfer', description: 'One-way private car transfer (airport or city).', pointsCost: 8000, imagePrompt: 'Luxury car, chauffeur, travel, 8K.', imageAltText: 'Private transfer reward.', active: true, order: 7 },
  { name: 'Wine Experience', description: 'Wine tasting for two at a partner vineyard or hotel.', pointsCost: 12000, imagePrompt: 'Wine glasses and vineyard view, elegant, 8K.', imageAltText: 'Wine tasting for two.', active: true, order: 8 },
  { name: 'Tour Upgrade', description: 'Upgrade to a private experience on a selected group tour.', pointsCost: 20000, imagePrompt: 'Private guide and traveller, scenic backdrop, 8K.', imageAltText: 'Tour upgrade reward.', active: true, order: 9 },
  { name: '$500 Travel Credit', description: 'Premium credit for Elite and Platinum members.', pointsCost: 50000, imagePrompt: 'Premium credit card style, gold and black, 8K.', imageAltText: '$500 travel credit.', active: true, order: 10 },
];

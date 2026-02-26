/**
 * Wanderlust luxury content seed runner.
 * Run from api folder: npx ts-node -r tsconfig-paths/register src/seed/run-seed.ts
 * Requires MONGODB_URI (default: mongodb://localhost:27017/travel-guide).
 *
 * Order: Users → Destinations → Tours → Hotels → Rooms → Trips → Bookings
 *        → ContentBlock → Category → TripTemplate → ConciergeStarter → LoyaltyTier → Benefit → Reward
 */

import * as mongoose from 'mongoose';
import { config } from 'dotenv';

import { DestinationSchema } from '../destinations/schemas/destination.schema';
import { TourSchema } from '../tours/schemas/tour.schema';
import { HotelSchema } from '../hotels/schemas/hotel.schema';
import { RoomSchema } from '../hotels/schemas/room.schema';
import { UserSchema } from '../users/schemas/user.schema';
import { TripSchema } from '../trips/schemas/trip.schema';
import { BookingSchema } from '../bookings/schemas/booking.schema';
import { ContentBlockSchema } from '../content/schemas/content-block.schema';
import { CategorySchema } from '../content/schemas/category.schema';
import { TripTemplateSchema } from '../content/schemas/trip-template.schema';
import { ConciergeStarterSchema } from '../content/schemas/concierge-starter.schema';
import { LoyaltyTierSchema } from '../content/schemas/loyalty-tier.schema';
import { BenefitSchema } from '../content/schemas/benefit.schema';
import { RewardSchema } from '../content/schemas/reward.schema';

import { destinationSeeds } from './data/destinations';
import { tourSeeds } from './data/tours';
import { hotelSeeds as hotelSeedList } from './data/hotels';
import { homepageContentSeeds } from './data/homepage-content';
import { categorySeeds } from './data/categories';
import { tripTemplateSeeds } from './data/trip-templates';
import { conciergeStarterSeeds } from './data/concierge';
import { loyaltyTierSeeds, benefitSeeds, rewardSeeds } from './data/loyalty';

config();

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/travel-guide';

function getModel<T>(name: string, schema: mongoose.Schema): mongoose.Model<T> {
  return (mongoose.models[name] as mongoose.Model<T>) || mongoose.model<T>(name, schema);
}

async function run() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected.');

  const User = getModel<any>('User', UserSchema);
  const Destination = getModel<any>('Destination', DestinationSchema);
  const Tour = getModel<any>('Tour', TourSchema);
  const Hotel = getModel<any>('Hotel', HotelSchema);
  const Room = getModel<any>('Room', RoomSchema);
  const Trip = getModel<any>('Trip', TripSchema);
  const Booking = getModel<any>('Booking', BookingSchema);
  const ContentBlock = getModel<any>('ContentBlock', ContentBlockSchema);
  const Category = getModel<any>('Category', CategorySchema);
  const TripTemplate = getModel<any>('TripTemplate', TripTemplateSchema);
  const ConciergeStarter = getModel<any>('ConciergeStarter', ConciergeStarterSchema);
  const LoyaltyTier = getModel<any>('LoyaltyTier', LoyaltyTierSchema);
  const Benefit = getModel<any>('Benefit', BenefitSchema);
  const Reward = getModel<any>('Reward', RewardSchema);

  const slugToId: Record<string, mongoose.Types.ObjectId> = {};

  // 1. Users (admin + demo users)
  console.log('Seeding users...');
  const users = await User.insertMany([
    { email: 'admin@wanderlust.com', role: 'admin' },
    { email: 'sophie.martin@example.com', role: 'user' },
    { email: 'james.wilson@example.com', role: 'user' },
  ]);
  const adminUser = users[0];
  const demoUser = users[1];
  console.log(`  Inserted ${users.length} users.`);

  // 2. Destinations
  console.log('Seeding destinations...');
  const destDocs = await Destination.insertMany(destinationSeeds);
  destDocs.forEach((d: any) => { slugToId[d.slug] = d._id; });
  console.log(`  Inserted ${destDocs.length} destinations.`);

  // 3. Tours (full set from data/tours.ts)
  console.log('Seeding tours...');
  const tourDocs = tourSeeds.map((t) => ({
    title: t.title,
    slug: t.slug,
    destinations: (t.destinationSlugs || []).map((s: string) => slugToId[s]).filter(Boolean),
    durationDays: t.durationDays,
    groupSize: t.groupSize,
    priceFrom: t.priceFrom,
    discountPrice: t.discountPrice,
    featured: t.featured ?? false,
    categories: t.categories || [],
    shortDescription: t.shortDescription,
    longDescription: t.longDescription,
    difficulty: t.difficulty,
    importantNotes: t.importantNotes,
    highlights: t.highlights || [],
    inclusions: t.inclusions || [],
    exclusions: t.exclusions || [],
    itinerary: t.itinerary || [],
    gallery: t.gallery || [],
    galleryAltTexts: t.galleryAltTexts || [],
  }));
  const tours = await Tour.insertMany(tourDocs);
  const tourBySlug: Record<string, { _id: mongoose.Types.ObjectId }> = {};
  tours.forEach((t: any) => { tourBySlug[t.slug] = { _id: t._id }; });
  console.log(`  Inserted ${tours.length} tours.`);

  // 4. Hotels (from data/hotels.ts)
  console.log('Seeding hotels...');
  const hotelDocs = hotelSeedList.map((h) => ({
    name: h.name,
    slug: h.slug,
    destination: slugToId[h.destinationSlug],
    rating: h.rating,
    shortPitch: h.shortPitch,
    longDescription: h.longDescription,
    luxuryPositioning: h.luxuryPositioning,
    amenities: h.amenities || [],
    location: h.location || {},
    gallery: h.gallery || [],
    galleryAltTexts: h.galleryAltTexts || [],
  }));
  const hotels = await Hotel.insertMany(hotelDocs);
  const hotelBySlug: Record<string, { _id: mongoose.Types.ObjectId }> = {};
  hotels.forEach((h: any) => { hotelBySlug[h.slug] = { _id: h._id }; });

  // 5. Rooms (from data/hotels.ts)
  console.log('Seeding rooms...');
  const roomDocs: any[] = [];
  hotelSeedList.forEach((h, idx) => {
    const hotelId = hotels[idx]._id;
    (h.rooms || []).forEach((r) => {
      roomDocs.push({
        hotel: hotelId,
        name: r.name,
        capacity: r.capacity,
        bedType: r.bedType,
        pricePerNight: r.pricePerNight,
        inventory: r.inventory,
        description: r.description,
        size: r.size,
        imagePrompt: r.imagePrompt,
        imageAltText: r.imageAltText,
      });
    });
  });
  await Room.insertMany(roomDocs);
  console.log(`  Inserted ${hotels.length} hotels and ${roomDocs.length} rooms.`);

  // 6. Trips (demo: draft, upcoming, active, completed)
  console.log('Seeding trips...');
  const now = Date.now();
  const day = 864e5;
  const tripSeeds = [
    { user: demoUser._id, title: 'Santorini Escape', startDate: new Date(now), endDate: new Date(now + 5 * day), status: 'draft', originCity: 'London', budget: 5000, travelerCount: 2, travelStyle: 'Leisure', destinationIds: [slugToId['santorini-greece']], itinerary: [{ type: 'tour', productId: tours[0]._id.toString(), title: 'Caldera & Villages', date: new Date() }] },
    { user: demoUser._id, title: 'Amalfi Coast & Rome', startDate: new Date(now + 30 * day), endDate: new Date(now + 38 * day), status: 'booked', originCity: 'Paris', budget: 12000, travelerCount: 2, travelStyle: 'Leisure', destinationIds: [slugToId['amalfi-coast-italy']], itinerary: [{ type: 'tour', productId: tours[1]._id.toString(), title: 'Amalfi by Sea & Land', date: new Date(now + 32 * day) }] },
    { user: demoUser._id, title: 'Safari Serengeti', startDate: new Date(now - 5 * day), endDate: new Date(now + 2 * day), status: 'booked', originCity: 'Nairobi', budget: 15000, travelerCount: 4, travelStyle: 'Adventure', destinationIds: [slugToId['serengeti-tanzania']], itinerary: [{ type: 'tour', productId: tours[4]._id.toString(), title: 'Great Migration Safari', date: new Date(now - 3 * day) }] },
    { user: demoUser._id, title: 'Kyoto & Tokyo', startDate: new Date(now - 60 * day), endDate: new Date(now - 53 * day), status: 'completed', originCity: 'Singapore', budget: 8000, travelerCount: 2, travelStyle: 'Culture', destinationIds: [slugToId['kyoto-japan']], itinerary: [{ type: 'tour', productId: tours[5]._id.toString(), title: 'Kyoto Heritage & Ryokan', date: new Date(now - 58 * day) }] },
  ];
  const insertedTrips = await Trip.insertMany(tripSeeds);
  console.log(`  Inserted ${insertedTrips.length} trips.`);

  // 7. Bookings (demo: linked to trips and real tours/hotels)
  const demoTripIds = insertedTrips.map((t: any) => t._id);
  await Booking.insertMany([
    { user: demoUser._id, trip: demoTripIds[0], productType: 'tour', productId: tours[0]._id.toString(), price: 1299, currency: 'USD', status: 'confirmed', paymentId: 'demo_pi_1' },
    { user: demoUser._id, trip: demoTripIds[1], productType: 'tour', productId: tours[1]._id.toString(), price: 2499, currency: 'USD', status: 'confirmed', paymentId: 'demo_pi_2' },
    { user: demoUser._id, trip: demoTripIds[2], productType: 'tour', productId: tours[4]._id.toString(), price: 4499, currency: 'USD', status: 'confirmed', paymentId: 'demo_pi_3' },
    { user: demoUser._id, trip: demoTripIds[2], productType: 'hotel', productId: hotels[4]._id.toString(), price: 7200, currency: 'USD', status: 'confirmed', paymentId: 'demo_pi_4' },
    { user: demoUser._id, trip: demoTripIds[3], productType: 'tour', productId: tours[5]._id.toString(), price: 1899, currency: 'USD', status: 'confirmed', paymentId: 'demo_pi_5' },
  ]);
  console.log('  Inserted demo bookings.');

  // 8. Homepage content blocks (from data/homepage-content.ts)
  console.log('Seeding homepage content...');
  await ContentBlock.insertMany(homepageContentSeeds);
  console.log(`  Inserted ${homepageContentSeeds.length} content blocks.`);

  // 9. Categories (from data/categories.ts)
  console.log('Seeding categories...');
  await Category.insertMany(categorySeeds);
  console.log(`  Inserted ${categorySeeds.length} categories.`);

  // 10. Loyalty (from data/loyalty.ts)
  console.log('Seeding loyalty...');
  const tierDocs = await LoyaltyTier.insertMany(loyaltyTierSeeds);
  const tierBySlug: Record<string, { _id: mongoose.Types.ObjectId }> = {};
  tierDocs.forEach((t: any) => { tierBySlug[t.slug] = { _id: t._id }; });
  const benefitDocs = benefitSeeds.map((b) => ({
    title: b.title,
    description: b.description,
    tierIds: (b.tierSlugs || []).map((s: string) => tierBySlug[s]?._id).filter(Boolean),
    order: b.order,
  }));
  await Benefit.insertMany(benefitDocs);
  await Reward.insertMany(rewardSeeds);
  console.log('  Inserted loyalty tiers, benefits, and rewards.');

  // 11. Trip templates (from data/trip-templates.ts)
  console.log('Seeding trip templates...');
  const templateDocs = tripTemplateSeeds.map((tp) => {
    const days = (tp.days || []).map((d) => ({
      day: d.day,
      title: d.title,
      description: d.description,
      activityIds: d.activityIds || [],
      hotelId: d.hotelSlug ? hotelBySlug[d.hotelSlug]?._id?.toString() : undefined,
      tourId: d.tourSlug ? tourBySlug[d.tourSlug]?._id?.toString() : undefined,
    }));
    return {
      name: tp.name,
      slug: tp.slug,
      destinationIds: (tp.destinationSlugs || []).map((s: string) => slugToId[s]).filter(Boolean),
      totalDays: tp.totalDays,
      days,
      budgetEstimateMin: tp.budgetEstimateMin,
      budgetEstimateMax: tp.budgetEstimateMax,
      description: tp.description,
      luxuryToneDescription: tp.luxuryToneDescription,
    };
  });
  await TripTemplate.insertMany(templateDocs);
  console.log(`  Inserted ${templateDocs.length} trip templates.`);

  // 12. Concierge (from data/concierge.ts)
  console.log('Seeding concierge...');
  await ConciergeStarter.insertMany(conciergeStarterSeeds);
  console.log(`  Inserted ${conciergeStarterSeeds.length} concierge starters.`);

  console.log('Seed completed successfully.');
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

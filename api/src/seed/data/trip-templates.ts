/**
 * Plan-trip template seeds. Use destinationSlugs; days may have hotelSlug and tourSlug.
 * Runner resolves to ObjectIds and sets destinationIds, days[].hotelId, days[].tourId (as string IDs).
 */
export interface TemplateDaySeed {
  day: number;
  title: string;
  description: string;
  activityIds: string[];
  hotelSlug?: string;
  tourSlug?: string;
}

export interface TripTemplateSeed {
  name: string;
  slug: string;
  destinationSlugs: string[];
  totalDays: number;
  days: TemplateDaySeed[];
  budgetEstimateMin: number;
  budgetEstimateMax: number;
  description: string;
  luxuryToneDescription: string;
}

export const tripTemplateSeeds: TripTemplateSeed[] = [
  {
    name: 'Santorini & Amalfi Romance',
    slug: 'santorini-amalfi-romance',
    destinationSlugs: ['santorini-greece', 'amalfi-coast-italy'],
    totalDays: 8,
    days: [
      { day: 1, title: 'Arrival Santorini', description: 'Transfer to cave hotel. Sunset at Oia.', activityIds: [], hotelSlug: 'caldera-view-suites-santorini', tourSlug: undefined },
      { day: 2, title: 'Santorini sailing & wine', description: 'Caldera sail and volcanic wine tasting.', activityIds: [], hotelSlug: 'caldera-view-suites-santorini', tourSlug: 'santorini-sunset-wine' },
      { day: 3, title: 'Santorini at leisure', description: 'Beach, pool, or explore Fira.', activityIds: [], hotelSlug: 'caldera-view-suites-santorini', tourSlug: undefined },
      { day: 4, title: 'Travel to Amalfi', description: 'Fly to Naples; transfer to Positano.', activityIds: [], hotelSlug: 'le-sirenuse-amalfi', tourSlug: undefined },
      { day: 5, title: 'Amalfi by boat', description: 'Private boat day along the coast.', activityIds: [], hotelSlug: 'le-sirenuse-amalfi', tourSlug: 'amalfi-coast-sea-land' },
      { day: 6, title: 'Ravello & gardens', description: 'Villa Cimbrone and lemon terraces.', activityIds: [], hotelSlug: 'le-sirenuse-amalfi', tourSlug: undefined },
      { day: 7, title: 'Path of the Gods', description: 'Guided walk with coastal vistas.', activityIds: [], hotelSlug: 'le-sirenuse-amalfi', tourSlug: undefined },
      { day: 8, title: 'Departure', description: 'Transfer to Naples airport.', activityIds: [], hotelSlug: undefined, tourSlug: undefined },
    ],
    budgetEstimateMin: 8500,
    budgetEstimateMax: 14000,
    description: 'Eight days combining Santorini’s caldera and cave hotels with the Amalfi Coast’s cliffs and villages. Ideal for honeymoon or anniversary.',
    luxuryToneDescription: 'Cave suites and cliffside palaces, private sails and boat days, with every detail tuned for romance. Breakfast on your terrace, champagne at sunset, and the finest tables on both coasts.',
  },
  {
    name: 'Serengeti Safari Highlights',
    slug: 'serengeti-safari-highlights',
    destinationSlugs: ['serengeti-tanzania'],
    totalDays: 6,
    days: [
      { day: 1, title: 'Arrival & first drive', description: 'Transfer to lodge. Afternoon game drive.', activityIds: [], hotelSlug: 'four-seasons-safari-lodge-serengeti', tourSlug: undefined },
      { day: 2, title: 'Full day safari', description: 'Morning and afternoon game drives.', activityIds: [], hotelSlug: 'four-seasons-safari-lodge-serengeti', tourSlug: 'serengeti-great-migration-safari' },
      { day: 3, title: 'Balloon & safari', description: 'Dawn balloon; bush breakfast; afternoon drive.', activityIds: [], hotelSlug: 'four-seasons-safari-lodge-serengeti', tourSlug: undefined },
      { day: 4, title: 'Safari continues', description: 'Full day with picnic in the field.', activityIds: [], hotelSlug: 'four-seasons-safari-lodge-serengeti', tourSlug: undefined },
      { day: 5, title: 'Last full day', description: 'Game drives and farewell bush dinner.', activityIds: [], hotelSlug: 'four-seasons-safari-lodge-serengeti', tourSlug: undefined },
      { day: 6, title: 'Departure', description: 'Short morning drive; transfer to airstrip.', activityIds: [], hotelSlug: undefined, tourSlug: undefined },
    ],
    budgetEstimateMin: 12000,
    budgetEstimateMax: 18000,
    description: 'Six days in the Serengeti from a top lodge. Migration viewing, Big Five, balloon safari, and sundowners.',
    luxuryToneDescription: 'Nothing is left to chance. Your lodge overlooks a waterhole; your guide knows every corner of the plains. Expect exceptional game viewing and bush luxury in equal measure.',
  },
  {
    name: 'Kyoto & Bali Culture',
    slug: 'kyoto-bali-culture',
    destinationSlugs: ['kyoto-japan', 'bali-indonesia'],
    totalDays: 9,
    days: [
      { day: 1, title: 'Kyoto arrival', description: 'Transfer to hotel. Fushimi Inari in afternoon.', activityIds: [], hotelSlug: 'ritz-carlton-kyoto', tourSlug: undefined },
      { day: 2, title: 'Golden Pavilion & Kiyomizu', description: 'Temples and Gion with guide.', activityIds: [], hotelSlug: 'ritz-carlton-kyoto', tourSlug: 'kyoto-heritage-ryokan' },
      { day: 3, title: 'Arashiyama & ryokan', description: 'Bamboo grove; night in ryokan.', activityIds: [], hotelSlug: 'ritz-carlton-kyoto', tourSlug: undefined },
      { day: 4, title: 'Fly to Bali', description: 'Transfer to Ubud villa.', activityIds: [], hotelSlug: 'four-seasons-bali-sayan', tourSlug: undefined },
      { day: 5, title: 'Temples & rice terraces', description: 'Tanah Lot, Uluwatu, or Tegallalang.', activityIds: [], hotelSlug: 'four-seasons-bali-sayan', tourSlug: 'bali-temples-rice-terraces' },
      { day: 6, title: 'Bali culture', description: 'Besakih or cultural workshop.', activityIds: [], hotelSlug: 'four-seasons-bali-sayan', tourSlug: undefined },
      { day: 7, title: 'Wellness or leisure', description: 'Spa, yoga, or optional trip to Nusa Penida.', activityIds: [], hotelSlug: 'four-seasons-bali-sayan', tourSlug: undefined },
      { day: 8, title: 'Last full day Bali', description: 'At leisure or repeat favourite experience.', activityIds: [], hotelSlug: 'four-seasons-bali-sayan', tourSlug: undefined },
      { day: 9, title: 'Departure', description: 'Transfer to airport.', activityIds: [], hotelSlug: undefined, tourSlug: undefined },
    ],
    budgetEstimateMin: 11000,
    budgetEstimateMax: 17000,
    description: 'Nine days blending Kyoto’s temples and ryokan with Bali’s villas, temples, and rice terraces. Heritage and wellness in two iconic cultures.',
    luxuryToneDescription: 'From kaiseki and onsen to villa pools and Balinese spa, this trip is designed for the culturally curious who refuse to compromise on comfort.',
  },
  {
    name: 'Maldives Overwater Escape',
    slug: 'maldives-overwater-escape',
    destinationSlugs: ['maldives-indian-ocean'],
    totalDays: 5,
    days: [
      { day: 1, title: 'Arrival', description: 'Seaplane to resort. Villa check-in.', activityIds: [], hotelSlug: 'one-only-reethi-rah-maldives', tourSlug: undefined },
      { day: 2, title: 'Reef & relax', description: 'Snorkelling and spa.', activityIds: [], hotelSlug: 'one-only-reethi-rah-maldives', tourSlug: 'maldives-overwater-reef' },
      { day: 3, title: 'Sandbank dinner', description: 'Private sandbank at sunset.', activityIds: [], hotelSlug: 'one-only-reethi-rah-maldives', tourSlug: undefined },
      { day: 4, title: 'Dhoni cruise', description: 'Sunset cruise and dolphin watch.', activityIds: [], hotelSlug: 'one-only-reethi-rah-maldives', tourSlug: undefined },
      { day: 5, title: 'Departure', description: 'Seaplane to Male.', activityIds: [], hotelSlug: undefined, tourSlug: undefined },
    ],
    budgetEstimateMin: 6500,
    budgetEstimateMax: 12000,
    description: 'Five nights in an overwater villa with reef, sandbank dinner, and spa. Pure island luxury.',
    luxuryToneDescription: 'Your villa sits above the lagoon. Your day is yours—dive, snorkel, or do nothing at all. We handle every detail so the only decision is which cocktail to order.',
  },
  {
    name: 'Paris & Tuscany Grand Tour',
    slug: 'paris-tuscany-grand-tour',
    destinationSlugs: ['paris-france', 'tuscany-italy'],
    totalDays: 8,
    days: [
      { day: 1, title: 'Paris arrival', description: 'Transfer to palace hotel.', activityIds: [], hotelSlug: 'hotel-de-crillon-paris', tourSlug: undefined },
      { day: 2, title: 'Louvre & Orsay', description: 'Private museum tours.', activityIds: [], hotelSlug: 'hotel-de-crillon-paris', tourSlug: 'paris-art-gastronomy' },
      { day: 3, title: 'Versailles', description: 'Full day at palace and gardens.', activityIds: [], hotelSlug: 'hotel-de-crillon-paris', tourSlug: undefined },
      { day: 4, title: 'To Tuscany', description: 'Fly to Florence; transfer to Chianti villa.', activityIds: [], hotelSlug: 'castello-di-casole-tuscany', tourSlug: undefined },
      { day: 5, title: 'Siena', description: 'Guided day in Siena.', activityIds: [], hotelSlug: 'castello-di-casole-tuscany', tourSlug: 'tuscany-vineyards-hill-towns' },
      { day: 6, title: 'Wine & San Gimignano', description: 'Estate visit and hill town.', activityIds: [], hotelSlug: 'castello-di-casole-tuscany', tourSlug: undefined },
      { day: 7, title: 'Cooking class', description: 'Market and villa cooking.', activityIds: [], hotelSlug: 'castello-di-casole-tuscany', tourSlug: undefined },
      { day: 8, title: 'Departure', description: 'Transfer to Florence airport.', activityIds: [], hotelSlug: undefined, tourSlug: undefined },
    ],
    budgetEstimateMin: 14000,
    budgetEstimateMax: 22000,
    description: 'Four nights in Paris (Louvre, Versailles, Michelin) and four in a Chianti castle with wine and cooking. Art, gastronomy, and countryside.',
    luxuryToneDescription: 'From Place de la Concorde to the Tuscan hills, this is grand travel at its best: palace hotels, private tours, and a villa where you are the only guests in your own slice of Italy.',
  },
  {
    name: 'Iceland Nature & Northern Lights',
    slug: 'iceland-nature-northern-lights',
    destinationSlugs: ['reykjavik-iceland'],
    totalDays: 4,
    days: [
      { day: 1, title: 'Reykjavik & Blue Lagoon', description: 'Arrival; optional Blue Lagoon. Overnight Reykjavik or Retreat.', activityIds: [], hotelSlug: 'retreat-blue-lagoon-iceland', tourSlug: undefined },
      { day: 2, title: 'Golden Circle', description: 'Thingvellir, Geysir, Gullfoss.', activityIds: [], hotelSlug: 'retreat-blue-lagoon-iceland', tourSlug: 'iceland-glaciers-northern-lights' },
      { day: 3, title: 'Glacier lagoon & south', description: 'Jökulsárlón, Diamond Beach. Northern Lights hunt.', activityIds: [], hotelSlug: undefined, tourSlug: undefined },
      { day: 4, title: 'Return & departure', description: 'Scenic return; airport transfer.', activityIds: [], hotelSlug: undefined, tourSlug: undefined },
    ],
    budgetEstimateMin: 4200,
    budgetEstimateMax: 7500,
    description: 'Four days: Blue Lagoon, Golden Circle, glacier lagoon, and Northern Lights. Comfortable stays and expert guide.',
    luxuryToneDescription: 'Iceland at its most dramatic—geothermal waters, thunderous waterfalls, and (with luck) the aurora. We take care of the logistics so you can focus on the experience.',
  },
];

/**
 * Hotel and room seed data. Use destinationSlug; runner maps to ObjectId.
 * Each hotel: 6+ gallery prompts + alt; each room: imagePrompt + imageAltText.
 */
export interface RoomSeed {
  name: string;
  capacity: number;
  bedType: string;
  pricePerNight: number;
  inventory: number;
  description: string;
  size: string;
  imagePrompt: string;
  imageAltText: string;
}

export interface HotelSeed {
  name: string;
  slug: string;
  destinationSlug: string;
  rating: number;
  shortPitch: string;
  longDescription: string;
  luxuryPositioning: string;
  amenities: string[];
  location: { city: string; country: string; address?: string };
  gallery: string[];
  galleryAltTexts: string[];
  rooms: RoomSeed[];
}

export const hotelSeeds: HotelSeed[] = [
  {
    name: 'Caldera View Suites',
    slug: 'caldera-view-suites-santorini',
    destinationSlug: 'santorini-greece',
    rating: 5,
    shortPitch: 'Cave suites with private pools overlooking the caldera.',
    longDescription: 'Carved into the cliff above the caldera, each suite features a private plunge pool, minimalist interiors, and uninterrupted views of the volcano and sea. Breakfast is served on your terrace. A short walk to Oia\'s blue domes and sunset viewpoints.',
    luxuryPositioning: 'Luxury cave hotel',
    amenities: ['Infinity pool', 'Spa', 'Private plunge pools', 'Terrace breakfast', 'Concierge', 'Room service'],
    location: { city: 'Oia', country: 'Greece' },
    gallery: [
      'Cave suite with plunge pool and caldera view, Santorini, luxury, 8K.',
      'Infinity pool at cliff edge, Santorini, golden hour.',
      'White cave interior, king bed, sea through arch, editorial.',
      'Terrace breakfast setup, caldera, soft morning light.',
      'Stairs carved in cliff, white walls, blue sea, Santorini.',
      'Sunset from suite terrace, champagne, Santorini.',
    ],
    galleryAltTexts: ['Cave suite with pool and caldera', 'Infinity pool Santorini', 'Cave bedroom with sea view', 'Terrace breakfast caldera', 'Cliff stairs Santorini', 'Sunset from terrace'],
    rooms: [
      { name: 'Caldera Suite', capacity: 2, bedType: 'King', pricePerNight: 850, inventory: 4, description: 'Spacious cave suite with private plunge pool and caldera view.', size: '55 sqm', imagePrompt: 'Luxury cave suite interior, white walls, king bed, plunge pool through arch, Santorini caldera view, soft light, 8K.', imageAltText: 'Caldera suite with pool and view' },
      { name: 'Honeymoon Suite', capacity: 2, bedType: 'King', pricePerNight: 1200, inventory: 2, description: 'Largest suite with extended terrace and outdoor bath.', size: '75 sqm', imagePrompt: 'Luxury honeymoon suite, terrace with outdoor bath, caldera sunset, Santorini, romantic, 8K.', imageAltText: 'Honeymoon suite terrace with bath' },
      { name: 'Superior Cave Room', capacity: 2, bedType: 'King', pricePerNight: 650, inventory: 6, description: 'Cave-style room with caldera view and shared pool access.', size: '42 sqm', imagePrompt: 'Superior cave room, white curved walls, king bed, caldera view window, minimalist, Santorini.', imageAltText: 'Superior cave room with caldera view' },
    ],
  },
  {
    name: 'Le Sirenuse',
    slug: 'le-sirenuse-amalfi',
    destinationSlug: 'amalfi-coast-italy',
    rating: 5,
    shortPitch: 'Legendary cliffside palace in Positano with pool and sea views.',
    longDescription: 'A former noble residence turned hotel, Le Sirenuse overlooks Positano\'s bay from the heart of town. Antique furnishings, a pool terrace, and La Sponda restaurant define its timeless style. Ideal for couples and culture-loving travellers.',
    luxuryPositioning: 'Palace hotel',
    amenities: ['Pool', 'Spa', 'Michelin restaurant', 'Rooftop bar', 'Concierge', 'Private boat'],
    location: { city: 'Positano', country: 'Italy' },
    gallery: [
      'Le Sirenuse Positano facade, bougainvillaea, sea view, 8K.',
      'Pool terrace overlooking Positano bay, loungers, luxury.',
      'La Sponda restaurant interior, candles, vaulted ceiling.',
      'Guest room with antique furniture, sea view, Amalfi.',
      'Rooftop bar at sunset, Positano, cocktails.',
      'Staircase and lemon trees, Le Sirenuse, Mediterranean.',
    ],
    galleryAltTexts: ['Le Sirenuse facade Positano', 'Pool terrace Positano', 'La Sponda restaurant', 'Guest room sea view', 'Rooftop bar sunset', 'Staircase and lemons'],
    rooms: [
      { name: 'Superior Sea View', capacity: 2, bedType: 'King', pricePerNight: 950, inventory: 8, description: 'Elegant room with balcony and sweeping bay view.', size: '35 sqm', imagePrompt: 'Elegant hotel room, antique furniture, balcony with Positano bay view, Mediterranean, 8K.', imageAltText: 'Superior sea view room Positano' },
      { name: 'Deluxe Suite', capacity: 3, bedType: 'King', pricePerNight: 1650, inventory: 4, description: 'Spacious suite with sitting area and large terrace.', size: '55 sqm', imagePrompt: 'Deluxe suite, sitting area, terrace with bay view, Positano, luxury hotel.', imageAltText: 'Deluxe suite Le Sirenuse' },
      { name: 'Pool Suite', capacity: 2, bedType: 'King', pricePerNight: 2100, inventory: 2, description: 'Suite with private pool and panoramic coast view.', size: '65 sqm', imagePrompt: 'Pool suite, private plunge pool, Positano coast view, luxury, 8K.', imageAltText: 'Pool suite Le Sirenuse' },
    ],
  },
  {
    name: 'Four Seasons Resort Bali at Sayan',
    slug: 'four-seasons-bali-sayan',
    destinationSlug: 'bali-indonesia',
    rating: 5,
    shortPitch: 'Jungle and river sanctuary above the Ayung with iconic pool and villas.',
    longDescription: 'Nested above the Ayung River in Ubud, Four Seasons Sayan combines rice-terrace views with world-class spa and dining. Villas have private pools and outdoor showers. River rafting, yoga, and cultural tours are curated by the resort.',
    luxuryPositioning: 'Luxury resort',
    amenities: ['Infinity pool', 'Spa', 'River rafting', 'Yoga', 'Two restaurants', 'Villa pools'],
    location: { city: 'Ubud', country: 'Indonesia' },
    gallery: [
      'Four Seasons Sayan iconic pool, oval over jungle, 8K.',
      'Villa with private pool, rice terrace view, Bali.',
      'Spa pavilion over river, tropical, wellness.',
      'Dining terrace, jungle and river, evening.',
      'Entrance bridge over river, Sayan, dramatic.',
      'Villa interior, bamboo and stone, luxury.',
    ],
    galleryAltTexts: ['Sayan iconic pool over jungle', 'Villa pool rice terrace', 'Spa over river Bali', 'Dining terrace Sayan', 'Bridge entrance Sayan', 'Villa interior Bali'],
    rooms: [
      { name: 'River View Villa', capacity: 3, bedType: 'King', pricePerNight: 1100, inventory: 12, description: 'Villa with private pool and Ayung River view.', size: '80 sqm', imagePrompt: 'River view villa, private pool, jungle and river, Bali, luxury resort, 8K.', imageAltText: 'River view villa Four Seasons Sayan' },
      { name: 'Royal Villa', capacity: 4, bedType: 'King', pricePerNight: 2400, inventory: 4, description: 'Two-bedroom villa with extended pool and river frontage.', size: '180 sqm', imagePrompt: 'Royal villa, two bedrooms, large pool, river front, Bali, ultra-luxury.', imageAltText: 'Royal villa Sayan' },
      { name: 'Sayan Suite', capacity: 2, bedType: 'King', pricePerNight: 850, inventory: 6, description: 'Suite with balcony overlooking jungle and river.', size: '65 sqm', imagePrompt: 'Sayan suite, balcony, jungle and river view, Ubud, elegant.', imageAltText: 'Sayan suite balcony view' },
    ],
  },
  {
    name: 'One&Only Reethi Rah',
    slug: 'one-only-reethi-rah-maldives',
    destinationSlug: 'maldives-indian-ocean',
    rating: 5,
    shortPitch: 'Private island resort with overwater and beach villas and exceptional service.',
    longDescription: 'One&Only Reethi Rah occupies a pristine North Malé atoll island. Overwater and beach villas offer private pools and direct lagoon or sand access. Multiple restaurants, spa, and water sports define the experience.',
    luxuryPositioning: 'Ultra-luxury resort',
    amenities: ['Private island', 'Spa', 'Multiple restaurants', 'Diving', 'Water sports', 'Kids club'],
    location: { city: 'North Malé Atoll', country: 'Maldives' },
    gallery: [
      'Overwater villa at sunset, private pool, Maldives, 8K.',
      'Beach villa with pool, white sand, turquoise lagoon.',
      'Spa over water, treatment room, ocean view.',
      'Restaurant on beach, lanterns, evening, Maldives.',
      'Aerial of island, villas, lagoon, tropical.',
      'Villa interior, contemporary, ocean through glass.',
    ],
    galleryAltTexts: ['Overwater villa Reethi Rah', 'Beach villa with pool', 'Spa over water', 'Beach restaurant Maldives', 'Aerial Reethi Rah', 'Villa interior ocean view'],
    rooms: [
      { name: 'Overwater Villa', capacity: 3, bedType: 'King', pricePerNight: 1800, inventory: 20, description: 'Overwater villa with private pool and ladder to lagoon.', size: '100 sqm', imagePrompt: 'Overwater villa, private pool, ladder to lagoon, Maldives, 8K luxury.', imageAltText: 'Overwater villa Reethi Rah' },
      { name: 'Beach Villa with Pool', capacity: 3, bedType: 'King', pricePerNight: 1600, inventory: 16, description: 'Beachfront villa with private pool and garden.', size: '95 sqm', imagePrompt: 'Beach villa, private pool, white sand, palm trees, Maldives resort.', imageAltText: 'Beach villa with pool' },
      { name: 'Grand Sunset Villa', capacity: 4, bedType: 'King', pricePerNight: 3200, inventory: 4, description: 'Largest overwater villa with sunset views and extended deck.', size: '180 sqm', imagePrompt: 'Grand overwater villa, sunset deck, pool, Maldives, ultra-luxury, 8K.', imageAltText: 'Grand sunset overwater villa' },
    ],
  },
  {
    name: 'Four Seasons Safari Lodge Serengeti',
    slug: 'four-seasons-safari-lodge-serengeti',
    destinationSlug: 'serengeti-tanzania',
    rating: 5,
    shortPitch: 'Luxury lodge in the heart of the Serengeti with wildlife at your doorstep.',
    longDescription: 'Set within the Serengeti, Four Seasons Safari Lodge offers infinity pool views over a waterhole frequented by elephants and other game. Spacious rooms and villas, expert guides, and bush dinners create an unforgettable safari base.',
    luxuryPositioning: 'Luxury safari lodge',
    amenities: ['Infinity pool', 'Spa', 'Game drives', 'Bush dinners', 'Waterhole view', 'Library'],
    location: { city: 'Serengeti', country: 'Tanzania' },
    gallery: [
      'Lodge infinity pool, waterhole, elephants, Serengeti, 8K.',
      'Villa exterior, thatched roof, plains view, Africa.',
      'Room interior, African decor, plains through window.',
      'Bush dinner setup, lanterns, Serengeti night.',
      'Game drive vehicle, golden hour, acacia trees.',
      'Lodge at dusk, fire pit, wilderness.',
    ],
    galleryAltTexts: ['Pool and waterhole Serengeti', 'Safari villa exterior', 'Lodge room plains view', 'Bush dinner Serengeti', 'Game drive vehicle', 'Lodge at dusk'],
    rooms: [
      { name: 'Plains View Room', capacity: 2, bedType: 'King', pricePerNight: 1200, inventory: 12, description: 'Room with terrace overlooking the Serengeti plains.', size: '55 sqm', imagePrompt: 'Safari lodge room, terrace, Serengeti plains view, luxury, 8K.', imageAltText: 'Plains view room Serengeti' },
      { name: 'Waterhole Villa', capacity: 4, bedType: 'King', pricePerNight: 2200, inventory: 6, description: 'Villa with direct view of the waterhole and wildlife.', size: '120 sqm', imagePrompt: 'Safari villa, waterhole view, elephants in distance, Serengeti lodge.', imageAltText: 'Waterhole villa Serengeti' },
      { name: 'Family Suite', capacity: 5, bedType: 'King + Twin', pricePerNight: 2800, inventory: 4, description: 'Two-room suite with shared terrace and plains view.', size: '140 sqm', imagePrompt: 'Family safari suite, two rooms, terrace, Serengeti, luxury lodge.', imageAltText: 'Family suite Serengeti lodge' },
    ],
  },
  {
    name: 'Ritz-Carlton Kyoto',
    slug: 'ritz-carlton-kyoto',
    destinationSlug: 'kyoto-japan',
    rating: 5,
    shortPitch: 'Riverside luxury with Japanese aesthetics and views of the Higashiyama hills.',
    longDescription: 'The Ritz-Carlton Kyoto sits along the Kamogawa River with views of Higashiyama. Blending modern luxury and traditional craft, it offers a spa, Michelin dining, and easy access to Gion and temples.',
    luxuryPositioning: 'Luxury city resort',
    amenities: ['Spa', 'Michelin restaurant', 'River view', 'Tea ceremony', 'Concierge', 'Bar'],
    location: { city: 'Kyoto', country: 'Japan' },
    gallery: [
      'Ritz-Carlton Kyoto facade, river, autumn trees, 8K.',
      'Lobby with Japanese art, serene, luxury.',
      'River view room, tatami accent, Kyoto.',
      'Spa treatment room, bamboo, minimalist.',
      'Restaurant with garden view, kaiseki, Kyoto.',
      'Courtyard garden, stone and maple, Kyoto.',
    ],
    galleryAltTexts: ['Ritz-Carlton Kyoto river facade', 'Lobby Japanese art', 'River view room Kyoto', 'Spa Kyoto', 'Restaurant garden view', 'Courtyard garden Kyoto'],
    rooms: [
      { name: 'Deluxe Room', capacity: 2, bedType: 'King', pricePerNight: 750, inventory: 20, description: 'Elegant room with river or city view.', size: '45 sqm', imagePrompt: 'Luxury hotel room, Japanese accents, river view, Kyoto, 8K.', imageAltText: 'Deluxe room Ritz-Carlton Kyoto' },
      { name: 'River View Suite', capacity: 3, bedType: 'King', pricePerNight: 1400, inventory: 8, description: 'Suite with sitting area and Kamogawa view.', size: '75 sqm', imagePrompt: 'Suite with river view, sitting area, Kyoto, luxury hotel.', imageAltText: 'River view suite Kyoto' },
      { name: 'Ritz-Carlton Suite', capacity: 4, bedType: 'King', pricePerNight: 2800, inventory: 2, description: 'Largest suite with terrace and panoramic views.', size: '120 sqm', imagePrompt: 'Ritz-Carlton suite, terrace, Kyoto river and hills, ultra-luxury.', imageAltText: 'Ritz-Carlton suite Kyoto' },
    ],
  },
  {
    name: 'Hotel du Cap-Eden-Roc',
    slug: 'hotel-du-cap-eden-roc-france',
    destinationSlug: 'french-riviera-france',
    rating: 5,
    shortPitch: 'Iconic Cap d\'Antibes palace with pool on the rocks and Mediterranean gardens.',
    longDescription: 'Hotel du Cap-Eden-Roc has defined Riviera glamour since 1870. Set in acres of gardens on the tip of Cap d\'Antibes, it offers the legendary pool carved into the rocks, fine dining, and absolute discretion.',
    luxuryPositioning: 'Palace hotel',
    amenities: ['Eden-Roc pool', 'Gardens', 'Beach', 'Restaurant', 'Spa', 'Tennis'],
    location: { city: 'Cap d\'Antibes', country: 'France' },
    gallery: [
      'Hotel du Cap facade, gardens, Mediterranean, 8K.',
      'Eden-Roc pool on rocks, sea beyond, iconic.',
      'Garden path, palms, sea glimpse, French Riviera.',
      'Guest room, classic decor, sea view.',
      'Restaurant terrace, coast, golden hour.',
      'Beach cabana, turquoise water, Cap d\'Antibes.',
    ],
    galleryAltTexts: ['Hotel du Cap facade', 'Eden-Roc pool on rocks', 'Garden path Cap d\'Antibes', 'Guest room sea view', 'Restaurant terrace', 'Beach cabana'],
    rooms: [
      { name: 'Superior Room', capacity: 2, bedType: 'King', pricePerNight: 1100, inventory: 15, description: 'Classic room with garden or sea view.', size: '40 sqm', imagePrompt: 'Classic hotel room, French Riviera, garden or sea view, elegant, 8K.', imageAltText: 'Superior room Hotel du Cap' },
      { name: 'Eden-Roc Sea View Suite', capacity: 3, bedType: 'King', pricePerNight: 2500, inventory: 6, description: 'Suite with balcony and views of the pool and sea.', size: '65 sqm', imagePrompt: 'Suite with balcony, Eden-Roc pool and sea view, Cap d\'Antibes.', imageAltText: 'Eden-Roc sea view suite' },
      { name: 'Villa Suite', capacity: 4, bedType: 'King', pricePerNight: 4500, inventory: 2, description: 'Standalone villa-style suite in the gardens.', size: '120 sqm', imagePrompt: 'Villa suite in gardens, Hotel du Cap, Mediterranean, ultra-luxury.', imageAltText: 'Villa suite Hotel du Cap' },
    ],
  },
  {
    name: 'Burj Al Arab',
    slug: 'burj-al-arab-dubai',
    destinationSlug: 'dubai-uae',
    rating: 5,
    shortPitch: 'Iconic sail-shaped hotel with butler service and superlative dining.',
    longDescription: 'Burj Al Arab stands on its own island as Dubai\'s most recognisable landmark. Every suite is duplex with butler service, and dining spans from Al Muntaha to underwater-themed Al Mahara. Helipad and beach access complete the experience.',
    luxuryPositioning: 'Ultra-luxury landmark',
    amenities: ['Butler service', 'Helipad', 'Private beach', 'Multiple fine dining', 'Spa', 'Pool'],
    location: { city: 'Dubai', country: 'UAE' },
    gallery: [
      'Burj Al Arab at dusk, sail shape, Dubai, 8K.',
      'Suite interior, gold and blue, panoramic sea view.',
      'Al Muntaha restaurant, view from above, Dubai.',
      'Pool and beach, Burj view, luxury.',
      'Lobby, fountain, dramatic height, Dubai.',
      'Helipad with view, Dubai skyline.',
    ],
    galleryAltTexts: ['Burj Al Arab at dusk', 'Suite interior Burj', 'Al Muntaha restaurant', 'Pool and beach Burj', 'Lobby Burj Al Arab', 'Helipad Dubai'],
    rooms: [
      { name: 'Deluxe Suite', capacity: 2, bedType: 'King', pricePerNight: 2400, inventory: 30, description: 'Duplex suite with sea view and butler service.', size: '170 sqm', imagePrompt: 'Burj Al Arab duplex suite, gold and blue, sea view, Dubai, 8K.', imageAltText: 'Deluxe suite Burj Al Arab' },
      { name: 'Panoramic Suite', capacity: 3, bedType: 'King', pricePerNight: 3800, inventory: 12, description: 'Duplex with 270-degree views of Dubai and sea.', size: '220 sqm', imagePrompt: 'Panoramic suite, floor-to-ceiling windows, Dubai skyline, Burj.', imageAltText: 'Panoramic suite Burj Al Arab' },
      { name: 'Royal Suite', capacity: 4, bedType: 'King', pricePerNight: 8500, inventory: 2, description: 'Two floors, cinema, rotating bed, and gold-leaf details.', size: '780 sqm', imagePrompt: 'Royal suite interior, gold leaf, cinema, Burj Al Arab, ultra-luxury.', imageAltText: 'Royal suite Burj Al Arab' },
    ],
  },
  {
    name: 'Tierra Patagonia',
    slug: 'tierra-patagonia',
    destinationSlug: 'patagonia-chile-argentina',
    rating: 5,
    shortPitch: 'Design-led lodge on the edge of Torres del Paine with lake and mountain views.',
    longDescription: 'Tierra Patagonia sits on the shore of Lake Sarmiento with uninterrupted views of the Paine massif. Low-impact architecture, spa, and guided treks and drives make it the ideal base for exploring the park in comfort.',
    luxuryPositioning: 'Luxury adventure lodge',
    amenities: ['Spa', 'Lake view', 'Guided treks', 'Restaurant', 'Bar', 'Fire pit'],
    location: { city: 'Torres del Paine', country: 'Chile' },
    gallery: [
      'Tierra Patagonia lodge, low profile, lake and mountains, 8K.',
      'Room with mountain view, wood and wool, Patagonia.',
      'Spa with lake view, wooden interior, Chile.',
      'Dining room, large windows, Paine massif.',
      'Lodge at sunset, dramatic sky, Patagonia.',
      'Trekking guide and guests, Torres view.',
    ],
    galleryAltTexts: ['Tierra Patagonia lodge', 'Room mountain view', 'Spa lake view', 'Dining room Paine', 'Lodge at sunset', 'Trekking Torres del Paine'],
    rooms: [
      { name: 'Lake View Room', capacity: 2, bedType: 'King', pricePerNight: 950, inventory: 20, description: 'Room with lake and mountain views.', size: '42 sqm', imagePrompt: 'Lodge room, lake and Torres del Paine view, wood interior, Patagonia.', imageAltText: 'Lake view room Tierra Patagonia' },
      { name: 'Superior Lake View', capacity: 3, bedType: 'King', pricePerNight: 1200, inventory: 8, description: 'Larger room with extended lake frontage view.', size: '55 sqm', imagePrompt: 'Superior room, large windows, lake and mountains, Patagonia lodge.', imageAltText: 'Superior lake view Tierra Patagonia' },
      { name: 'Suite', capacity: 4, bedType: 'King', pricePerNight: 1650, inventory: 4, description: 'Suite with sitting area and panoramic Paine view.', size: '75 sqm', imagePrompt: 'Suite with sitting area, Torres del Paine panorama, Tierra Patagonia.', imageAltText: 'Suite Tierra Patagonia' },
    ],
  },
  {
    name: 'Hotel de Crillon',
    slug: 'hotel-de-crillon-paris',
    destinationSlug: 'paris-france',
    rating: 5,
    shortPitch: 'Historic palace on Place de la Concorde with Rosewood refinement.',
    longDescription: 'Hotel de Crillon has welcomed royalty and dignitaries since the 18th century. After a meticulous restoration, it offers sumptuous rooms and suites, L\'Ecrin and Brasserie dining, and a subterranean spa. Steps from the Tuileries and Champs-Élysées.',
    luxuryPositioning: 'Palace hotel',
    amenities: ['Spa', 'Two restaurants', 'Bar', 'Concierge', 'Place de la Concorde view'],
    location: { city: 'Paris', country: 'France', address: 'Place de la Concorde' },
    gallery: [
      'Hotel de Crillon facade, Place de la Concorde, Paris, 8K.',
      'Lobby, marble and crystal, Paris palace.',
      'Suite interior, classic French, city view.',
      'L\'Ecrin restaurant, fine dining, Paris.',
      'Spa pool, subterranean, marble, Paris.',
      'Bar at night, golden light, Paris.',
    ],
    galleryAltTexts: ['Crillon facade Place de la Concorde', 'Lobby Crillon Paris', 'Suite interior Crillon', 'L\'Ecrin restaurant', 'Spa pool Crillon', 'Bar Crillon'],
    rooms: [
      { name: 'Deluxe Room', capacity: 2, bedType: 'King', pricePerNight: 1100, inventory: 25, description: 'Elegant room with Place or courtyard view.', size: '38 sqm', imagePrompt: 'Deluxe room, French classic decor, Paris, Place de la Concorde area, 8K.', imageAltText: 'Deluxe room Crillon' },
      { name: 'Grand Premier Room', capacity: 3, bedType: 'King', pricePerNight: 1850, inventory: 15, description: 'Spacious room with sitting area and Paris views.', size: '50 sqm', imagePrompt: 'Grand Premier room, sitting area, Paris view, Crillon.', imageAltText: 'Grand Premier room Crillon' },
      { name: 'Suite Bernstein', capacity: 4, bedType: 'King', pricePerNight: 4200, inventory: 2, description: 'Iconic suite with terrace and Place de la Concorde view.', size: '115 sqm', imagePrompt: 'Bernstein suite, terrace, Place de la Concorde, Paris, ultra-luxury.', imageAltText: 'Suite Bernstein Crillon' },
    ],
  },
  {
    name: 'Castello di Casole',
    slug: 'castello-di-casole-tuscany',
    destinationSlug: 'tuscany-italy',
    rating: 5,
    shortPitch: 'Restored castle estate in the Tuscan hills with pool and vineyard views.',
    longDescription: 'Castello di Casole is a 10th-century castle turned hotel set in 4,200 acres of rolling hills. Rooms and suites blend antique stone with contemporary comfort. Pool, spa, and dining celebrate Tuscan produce and wine.',
    luxuryPositioning: 'Luxury castle hotel',
    amenities: ['Pool', 'Spa', 'Restaurant', 'Vineyard', 'Cycling', 'Cooking classes'],
    location: { city: 'Casole d\'Elsa', country: 'Italy' },
    gallery: [
      'Castello di Casole facade, Tuscan hills, golden hour, 8K.',
      'Pool with castle and cypress view, Tuscany.',
      'Room in castle, stone and fabric, Tuscan.',
      'Vineyard and castle, autumn, Tuscany.',
      'Dining room, vaulted ceiling, Tuscan cuisine.',
      'Courtyard with lemon trees, castle, Italy.',
    ],
    galleryAltTexts: ['Castello di Casole facade', 'Pool with castle view', 'Castle room Tuscany', 'Vineyard and castle', 'Dining room Castello', 'Courtyard lemons'],
    rooms: [
      { name: 'Castle Room', capacity: 2, bedType: 'King', pricePerNight: 650, inventory: 18, description: 'Room within the castle with hill or courtyard view.', size: '40 sqm', imagePrompt: 'Castle room, stone walls, Tuscan fabric, hill view, Castello di Casole.', imageAltText: 'Castle room Castello di Casole' },
      { name: 'Suite with Terrace', capacity: 3, bedType: 'King', pricePerNight: 1100, inventory: 8, description: 'Suite with private terrace overlooking the estate.', size: '60 sqm', imagePrompt: 'Suite with terrace, Tuscan hills, castle estate, luxury.', imageAltText: 'Suite with terrace Castello di Casole' },
      { name: 'Villa Suite', capacity: 4, bedType: 'King', pricePerNight: 1850, inventory: 4, description: 'Standalone villa suite with pool and vineyard view.', size: '95 sqm', imagePrompt: 'Villa suite, private pool, vineyard view, Tuscany, Castello di Casole.', imageAltText: 'Villa suite Castello di Casole' },
    ],
  },
  {
    name: 'The Retreat at Blue Lagoon',
    slug: 'retreat-blue-lagoon-iceland',
    destinationSlug: 'reykjavik-iceland',
    rating: 5,
    shortPitch: 'Luxury hotel integrated with the Blue Lagoon geothermal waters and lava landscape.',
    longDescription: 'The Retreat at Blue Lagoon offers lagoon-facing suites and direct access to the iconic waters. In-house spa uses silica and algae; the restaurant focuses on Icelandic ingredients. A unique base for Reykjavik and the south.',
    luxuryPositioning: 'Luxury geothermal retreat',
    amenities: ['Blue Lagoon access', 'Spa', 'Restaurant', 'Lava view', 'Private lagoon area'],
    location: { city: 'Grindavík', country: 'Iceland' },
    gallery: [
      'Retreat Blue Lagoon, lava and steam, Iceland, 8K.',
      'Suite with lagoon view, minimalist, Iceland.',
      'Spa treatment room, lava rock, Blue Lagoon.',
      'Restaurant with lagoon view, Nordic design.',
      'Guest in lagoon, steam, dramatic sky.',
      'Lava field and hotel at dusk, Iceland.',
    ],
    galleryAltTexts: ['Retreat Blue Lagoon lava', 'Suite lagoon view', 'Spa Blue Lagoon', 'Restaurant lagoon view', 'Guest in Blue Lagoon', 'Lava field at dusk'],
    rooms: [
      { name: 'Lagoon View Suite', capacity: 2, bedType: 'King', pricePerNight: 950, inventory: 30, description: 'Suite with view of the lagoon and lava field.', size: '55 sqm', imagePrompt: 'Lagoon view suite, minimalist, steam and lava view, Blue Lagoon Iceland.', imageAltText: 'Lagoon view suite Blue Lagoon' },
      { name: 'Moss Suite', capacity: 3, bedType: 'King', pricePerNight: 1350, inventory: 10, description: 'Suite with private terrace and extended lagoon view.', size: '70 sqm', imagePrompt: 'Moss suite, terrace, Blue Lagoon view, lava, Iceland retreat.', imageAltText: 'Moss suite Blue Lagoon' },
      { name: 'Lava Suite', capacity: 4, bedType: 'King', pricePerNight: 2200, inventory: 4, description: 'Largest suite with private lagoon access and outdoor shower.', size: '95 sqm', imagePrompt: 'Lava suite, private lagoon access, outdoor shower, Blue Lagoon, ultra-luxury.', imageAltText: 'Lava suite Blue Lagoon' },
    ],
  },
];

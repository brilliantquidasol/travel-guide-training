"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Calendar,
  DollarSign,
  Plane,
  Hotel,
  Camera,
  Utensils,
  Clock,
  Users,
  ThermometerSun,
  ArrowLeft,
  Heart,
  Share2,
  Star,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const destinationsData = {
  "bali-indonesia": {
    name: "Bali, Indonesia",
    tag: "Beaches",
    country: "Indonesia",
    heroImage: "/bali-indonesia-beach-temple-tropical-paradise.jpg",
    description:
      "Bali is a tropical paradise that seamlessly blends stunning natural beauty with rich cultural heritage. Known for its pristine beaches, lush rice terraces, ancient temples, and warm hospitality, this Indonesian island offers an unforgettable experience for every type of traveler.",
    bestTimeToVisit: "April to October (Dry Season)",
    averageBudget: "$50-150 per day",
    duration: "7-14 days",
    language: "Indonesian, Balinese",
    currency: "Indonesian Rupiah (IDR)",
    timeZone: "GMT+8",
    highlights: [
      "Visit the sacred Tanah Lot temple at sunset",
      "Explore the iconic rice terraces of Tegallalang",
      "Relax on pristine beaches in Seminyak and Nusa Dua",
      "Experience traditional Balinese dance performances",
      "Trek to Mount Batur for sunrise views",
      "Discover underwater life while snorkeling or diving",
    ],
    gallery: [
      "/bali-beach-sunset-palm-trees.jpg",
      "/bali-rice-terraces-green-lush.jpg",
      "/bali-temple-traditional-ceremony.jpg",
      "/bali-waterfall-jungle-nature.jpg",
      "/bali-ubud-monkey-forest.jpg",
      "/bali-traditional-dance-performance.jpg",
    ],
    cuisine: "Indonesian and Balinese cuisine featuring nasi goreng, satay, babi guling, and fresh seafood",
    accommodation:
      "From budget hostels ($10/night) to luxury beach resorts ($500+/night), Bali offers diverse accommodation options",
    transportation: "Scooter rental, private drivers, ride-hailing apps, and organized tours are popular options",
  },
  "paris-france": {
    name: "Paris, France",
    tag: "Culture",
    country: "France",
    heroImage: "/paris-france-eiffel-tower-sunset-romantic.jpg",
    description:
      "Paris, the City of Light, is a timeless destination that captivates visitors with its elegant architecture, world-class art museums, exquisite cuisine, and romantic atmosphere. From the iconic Eiffel Tower to charming cobblestone streets, Paris embodies sophistication and culture.",
    bestTimeToVisit: "April to June, September to November",
    averageBudget: "$150-300 per day",
    duration: "5-7 days",
    language: "French",
    currency: "Euro (EUR)",
    timeZone: "GMT+1",
    highlights: [
      "Marvel at the Eiffel Tower and Champ de Mars",
      "Explore the Louvre Museum and see the Mona Lisa",
      "Stroll through Montmartre and visit Sacré-Cœur",
      "Cruise along the Seine River at sunset",
      "Experience Notre-Dame Cathedral and Île de la Cité",
      "Discover world-class shopping on the Champs-Élysées",
    ],
    gallery: [
      "/paris-eiffel-tower-night-lights.jpg",
      "/paris-louvre-museum-pyramid.jpg",
      "/paris-montmartre-sacre-coeur.jpg",
      "/paris-seine-river-boats-bridges.jpg",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    cuisine: "French cuisine including croissants, escargot, coq au vin, macarons, and fine wines",
    accommodation: "Hotels range from budget ($80/night) to luxury ($500+/night), with charming boutique options",
    transportation: "Extensive metro system, buses, bicycles, and walking are the best ways to explore",
  },
  iceland: {
    name: "Iceland",
    tag: "Adventure",
    country: "Iceland",
    heroImage: "/iceland-northern-lights-aurora-waterfall-nature.jpg",
    description:
      "Iceland is a land of dramatic contrasts where fire meets ice. This Nordic island nation offers breathtaking landscapes including massive glaciers, active volcanoes, stunning waterfalls, geothermal hot springs, and the magical Northern Lights. Perfect for adventure seekers and nature lovers.",
    bestTimeToVisit: "June to August (Midnight Sun), September to March (Northern Lights)",
    averageBudget: "$200-400 per day",
    duration: "7-10 days",
    language: "Icelandic",
    currency: "Icelandic Króna (ISK)",
    timeZone: "GMT+0",
    highlights: [
      "Chase the Northern Lights (Aurora Borealis)",
      "Explore the Golden Circle route",
      "Bathe in the Blue Lagoon geothermal spa",
      "Visit stunning waterfalls like Gullfoss and Skógafoss",
      "Walk on Vatnajökull glacier",
      "Discover black sand beaches and basalt columns",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    cuisine: "Icelandic specialties including lamb, seafood, skyr, and traditional dishes like hákarl",
    accommodation: "Guesthouses, hotels, and unique stays like glass igloos ($100-400/night)",
    transportation: "Car rental is recommended for exploring; bus tours available from Reykjavik",
  },
  "bangkok-thailand": {
    name: "Bangkok, Thailand",
    tag: "Food",
    country: "Thailand",
    heroImage: "/bangkok-thailand-street-food-temple-market-night.jpg",
    description:
      "Bangkok is a vibrant metropolis where ancient temples meet modern skyscrapers. Famous for its incredible street food, bustling markets, ornate palaces, and lively nightlife, this dynamic city offers an sensory overload in the best possible way.",
    bestTimeToVisit: "November to February (Cool Season)",
    averageBudget: "$40-100 per day",
    duration: "4-7 days",
    language: "Thai",
    currency: "Thai Baht (THB)",
    timeZone: "GMT+7",
    highlights: [
      "Visit the Grand Palace and Temple of the Emerald Buddha",
      "Explore colorful floating markets",
      "Experience street food paradise on Khao San Road",
      "Tour Wat Arun and Wat Pho temples",
      "Shop at massive Chatuchak Weekend Market",
      "Take a sunset dinner cruise on the Chao Phraya River",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    cuisine: "World-famous Thai cuisine including pad thai, green curry, som tam, and mango sticky rice",
    accommodation: "Budget hostels ($10/night) to luxury hotels ($200+/night), excellent value for money",
    transportation: "BTS Skytrain, MRT metro, tuk-tuks, taxis, and river boats make getting around easy",
  },
  "banff-canada": {
    name: "Banff, Canada",
    tag: "Nature",
    country: "Canada",
    heroImage: "/banff-canada-lake-louise-mountains-turquoise-water.jpg",
    description:
      "Nestled in the heart of the Canadian Rockies, Banff National Park is a pristine wilderness paradise. Famous for its turquoise lakes, towering mountain peaks, abundant wildlife, and outdoor adventures, Banff offers year-round natural beauty.",
    bestTimeToVisit: "June to August (Hiking), December to March (Skiing)",
    averageBudget: "$150-300 per day",
    duration: "4-7 days",
    language: "English, French",
    currency: "Canadian Dollar (CAD)",
    timeZone: "GMT-7",
    highlights: [
      "Admire the stunning turquoise waters of Lake Louise",
      "Hike to Moraine Lake in the Valley of the Ten Peaks",
      "Ride the Banff Gondola for panoramic views",
      "Relax in natural hot springs",
      "Spot wildlife including elk, bears, and bighorn sheep",
      "Ski world-class slopes in winter",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    cuisine: "Canadian cuisine with Alberta beef, wild game, fresh fish, and international options",
    accommodation: "Mountain lodges, hotels, and resorts ranging from $100-500/night",
    transportation: "Car rental recommended; shuttle services available between key attractions",
  },
  "dubai-uae": {
    name: "Dubai, UAE",
    tag: "Cities",
    country: "United Arab Emirates",
    heroImage: "/dubai-uae-burj-khalifa-skyline-modern-luxury.jpg",
    description:
      "Dubai is a futuristic city that pushes the boundaries of modern architecture and luxury. From the world's tallest building to artificial islands, massive malls, and desert adventures, Dubai offers a unique blend of ultra-modern attractions and traditional Arabian culture.",
    bestTimeToVisit: "November to March (Cooler Weather)",
    averageBudget: "$150-500 per day",
    duration: "4-7 days",
    language: "Arabic, English",
    currency: "UAE Dirham (AED)",
    timeZone: "GMT+4",
    highlights: [
      "Ascend the Burj Khalifa, world's tallest building",
      "Shop at the massive Dubai Mall with indoor aquarium",
      "Experience desert safaris and dune bashing",
      "Visit the traditional Gold and Spice Souks",
      "Relax on pristine beaches and luxury resorts",
      "Explore the historic Al Fahidi neighborhood",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    cuisine: "Emirati cuisine, Middle Eastern flavors, and world-class international dining",
    accommodation: "From budget hotels ($80/night) to ultra-luxury resorts ($1000+/night)",
    transportation: "Modern metro system, taxis, ride-sharing, and rental cars available",
  },
  "machu-picchu-peru": {
    name: "Machu Picchu, Peru",
    tag: "Adventure",
    country: "Peru",
    heroImage: "/machu-picchu-peru-inca-ruins-mountains-ancient.jpg",
    description:
      "Machu Picchu, the Lost City of the Incas, is one of the world's most iconic archaeological sites. Perched high in the Andes Mountains, this 15th-century citadel offers breathtaking views, fascinating history, and an unforgettable journey through Peruvian culture.",
    bestTimeToVisit: "April to October (Dry Season)",
    averageBudget: "$80-200 per day",
    duration: "3-5 days (including Cusco)",
    language: "Spanish, Quechua",
    currency: "Peruvian Sol (PEN)",
    timeZone: "GMT-5",
    highlights: [
      "Explore the ancient Incan citadel of Machu Picchu",
      "Hike the famous Inca Trail (multi-day trek)",
      "Visit the historic city of Cusco",
      "Tour the Sacred Valley and traditional markets",
      "See the colorful Vinicunca Rainbow Mountain",
      "Experience traditional Peruvian culture and cuisine",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    cuisine: "Peruvian specialties including ceviche, lomo saltado, alpaca, and quinoa dishes",
    accommodation: "Hotels and hostels in Cusco and Aguas Calientes ($30-200/night)",
    transportation: "Train from Cusco to Aguas Calientes, then bus to Machu Picchu entrance",
  },
  maldives: {
    name: "Maldives",
    tag: "Beaches",
    country: "Maldives",
    heroImage: "/maldives-overwater-bungalow-turquoise-ocean-tropic.jpg",
    description:
      "The Maldives is the ultimate tropical paradise, consisting of 26 coral atolls in the Indian Ocean. Famous for its crystal-clear turquoise waters, pristine white sand beaches, luxurious overwater bungalows, and incredible marine life, it's a dream destination for relaxation and romance.",
    bestTimeToVisit: "November to April (Dry Season)",
    averageBudget: "$200-1000+ per day",
    duration: "5-7 days",
    language: "Dhivehi, English",
    currency: "Maldivian Rufiyaa (MVR)",
    timeZone: "GMT+5",
    highlights: [
      "Stay in luxurious overwater villas",
      "Snorkel and dive with manta rays and whale sharks",
      "Enjoy pristine white sand beaches",
      "Experience world-class spa treatments",
      "Watch bioluminescent plankton at night",
      "Island hop to discover local culture",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    cuisine: "Fresh seafood, coconut-based curries, and international cuisine at resorts",
    accommodation: "Luxury resorts with overwater villas ($300-2000+/night), some budget guesthouses on local islands",
    transportation: "Speedboats and seaplanes transfer between islands; most resorts include transfers",
  },
  "rome-italy": {
    name: "Rome, Italy",
    tag: "Culture",
    country: "Italy",
    heroImage: "/placeholder.svg?height=800&width=1400",
    description:
      "Rome, the Eternal City, is a living museum where ancient ruins stand alongside Renaissance masterpieces. With over 2,500 years of history, incredible art, mouthwatering cuisine, and charming piazzas, Rome offers an unforgettable journey through Western civilization.",
    bestTimeToVisit: "April to June, September to November",
    averageBudget: "$100-250 per day",
    duration: "4-7 days",
    language: "Italian",
    currency: "Euro (EUR)",
    timeZone: "GMT+1",
    highlights: [
      "Explore the iconic Colosseum and Roman Forum",
      "Visit Vatican City and the Sistine Chapel",
      "Toss a coin in the Trevi Fountain",
      "Wander through the historic Trastevere neighborhood",
      "Climb the Spanish Steps and enjoy panoramic views",
      "Discover the Pantheon's architectural marvel",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    cuisine: "Authentic Italian pasta, pizza, gelato, carbonara, and regional Roman specialties",
    accommodation: "Hotels and B&Bs ranging from budget ($60/night) to luxury ($400+/night)",
    transportation: "Metro system, buses, and walking are best; many sites are within walking distance",
  },
  "new-zealand": {
    name: "New Zealand",
    tag: "Nature",
    country: "New Zealand",
    heroImage: "/placeholder.svg?height=800&width=1400",
    description:
      "New Zealand is a land of breathtaking natural beauty, from the dramatic fjords of Milford Sound to volcanic peaks and pristine beaches. Perfect for adventure seekers and nature lovers, this island nation offers world-class hiking, stunning landscapes, and friendly Kiwi hospitality.",
    bestTimeToVisit: "December to February (Summer), June to August (Winter skiing)",
    averageBudget: "$100-250 per day",
    duration: "10-21 days",
    language: "English, Māori",
    currency: "New Zealand Dollar (NZD)",
    timeZone: "GMT+12",
    highlights: [
      "Cruise through Milford Sound's majestic fjords",
      "Explore geothermal wonders in Rotorua",
      "Hike the famous Tongariro Alpine Crossing",
      "Visit Hobbiton movie set from Lord of the Rings",
      "Experience adventure activities in Queenstown",
      "Discover glowworm caves in Waitomo",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    cuisine: "Fresh seafood, lamb, Māori hangi, pavlova, and excellent wines from local vineyards",
    accommodation: "Hostels, hotels, and lodges ranging from budget ($30/night) to luxury ($400+/night)",
    transportation: "Car rental highly recommended; domestic flights connect major cities; bus tours available",
  },
  "kyoto-japan": {
    name: "Kyoto, Japan",
    tag: "Culture",
    country: "Japan",
    heroImage: "/placeholder.svg?height=800&width=1400",
    description:
      "Kyoto, Japan's ancient capital, is a treasure trove of traditional culture, with over 2,000 temples, pristine gardens, and historic geisha districts. This enchanting city perfectly preserves Japanese heritage while embracing modernity, offering serene bamboo groves, tea ceremonies, and seasonal beauty.",
    bestTimeToVisit: "March to May (Cherry Blossoms), November (Autumn Foliage)",
    averageBudget: "$100-200 per day",
    duration: "4-7 days",
    language: "Japanese",
    currency: "Japanese Yen (JPY)",
    timeZone: "GMT+9",
    highlights: [
      "Walk through Arashiyama Bamboo Grove",
      "Visit the golden Kinkaku-ji Temple",
      "Explore Fushimi Inari's thousands of red torii gates",
      "Experience traditional tea ceremony",
      "Discover geisha culture in Gion district",
      "Stroll through Zen gardens and temples",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    cuisine: "Traditional kaiseki, matcha desserts, ramen, sushi, and vegetarian shojin ryori",
    accommodation: "Traditional ryokans, modern hotels, and guesthouses ($50-500/night)",
    transportation: "Excellent bus and train network; bicycles available for rent; many sites walkable",
  },
  "queenstown-new-zealand": {
    name: "Queenstown, New Zealand",
    tag: "Adventure",
    country: "New Zealand",
    heroImage: "/placeholder.svg?height=800&width=1400",
    description:
      "Queenstown is New Zealand's adventure capital, set against the stunning backdrop of Lake Wakatipu and the Remarkables mountain range. Famous for bungee jumping, skiing, and extreme sports, this vibrant town also offers world-class wineries, scenic beauty, and unforgettable experiences.",
    bestTimeToVisit: "December to February (Summer), June to August (Skiing)",
    averageBudget: "$150-300 per day",
    duration: "4-7 days",
    language: "English",
    currency: "New Zealand Dollar (NZD)",
    timeZone: "GMT+12",
    highlights: [
      "Bungee jump from historic Kawarau Bridge",
      "Ski or snowboard at Coronet Peak and The Remarkables",
      "Cruise on Lake Wakatipu",
      "Skydive over stunning mountain landscapes",
      "Explore nearby Milford Sound on a day trip",
      "Visit world-class wineries in Gibbston Valley",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    cuisine: "Gourmet burgers, fresh lamb, seafood, and excellent local wines from Central Otago",
    accommodation: "Hostels, hotels, and luxury lodges ($40-500/night) with lake and mountain views",
    transportation: "Compact town center is walkable; rental cars for exploring; shuttle services to ski fields",
  },
}

export default function DestinationDetailPage({ params }: { params: { id: string } }) {
  const destination = destinationsData[params.id as keyof typeof destinationsData]

  if (!destination) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-end overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${destination.heroImage}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-16">
          <Link href="/destinations">
            <Button variant="ghost" className="mb-8 text-white hover:text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Destinations
            </Button>
          </Link>

          <div className="max-w-4xl">
            <span className="inline-block bg-secondary/90 text-secondary-foreground text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {destination.tag}
            </span>
            <h1 className="font-heading font-bold text-5xl md:text-7xl text-white mb-4">{destination.name}</h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl">{destination.description}</p>

            <div className="flex gap-4 mt-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full">
                <Heart className="w-5 h-5 mr-2" />
                Save to Wishlist
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-white/10 border-white text-white hover:bg-white/20 hover:text-white"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Best Time</h3>
                <p className="text-sm text-muted-foreground">{destination.bestTimeToVisit}</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Average Budget</h3>
                <p className="text-sm text-muted-foreground">{destination.averageBudget}</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Duration</h3>
                <p className="text-sm text-muted-foreground">{destination.duration}</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Language</h3>
                <p className="text-sm text-muted-foreground">{destination.language}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Highlights */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <h2 className="font-heading font-bold text-4xl mb-12 text-center">Top Highlights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {destination.highlights.map((highlight, index) => (
              <Card key={index} className="shadow-md">
                <CardContent className="p-6 flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-lg leading-relaxed">{highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-heading font-bold text-4xl mb-12 text-center">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {destination.gallery.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl shadow-lg aspect-square group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${image}')` }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Information */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <h2 className="font-heading font-bold text-4xl mb-12 text-center">Practical Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <Utensils className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading font-bold text-2xl mb-3">Cuisine</h3>
                <p className="text-muted-foreground leading-relaxed">{destination.cuisine}</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-8">
                <Hotel className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading font-bold text-2xl mb-3">Accommodation</h3>
                <p className="text-muted-foreground leading-relaxed">{destination.accommodation}</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-8">
                <Plane className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading font-bold text-2xl mb-3">Transportation</h3>
                <p className="text-muted-foreground leading-relaxed">{destination.transportation}</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-8">
                <ThermometerSun className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading font-bold text-2xl mb-3">Currency & Time</h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  <strong>Currency:</strong> {destination.currency}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Time Zone:</strong> {destination.timeZone}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-4xl mb-6">Ready to Visit {destination.name}?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Start planning your dream trip today and create unforgettable memories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/plan-trip">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8">
                Plan Your Trip
              </Button>
            </Link>
            <Link href="/destinations">
              <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
                Explore More Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

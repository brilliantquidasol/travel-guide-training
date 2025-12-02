"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MapPin, ArrowRight, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function DestinationsPage() {
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")
  const [selectedBudget, setSelectedBudget] = useState("all")

  const destinations = [
    {
      id: "bali-indonesia",
      name: "Bali, Indonesia",
      tag: "Beaches",
      description: "Tropical paradise with stunning beaches, rice terraces, and rich culture.",
      image: "/bali-indonesia-beach-temple-tropical-paradise.jpg",
    },
    {
      id: "paris-france",
      name: "Paris, France",
      tag: "Culture",
      description: "The city of lights, romance, art museums, and iconic architecture.",
      image: "/paris-france-eiffel-tower-sunset-romantic.jpg",
    },
    {
      id: "iceland",
      name: "Iceland",
      tag: "Adventure",
      description: "Land of fire and ice with stunning waterfalls, glaciers, and northern lights.",
      image: "/iceland-northern-lights-aurora-waterfall-nature.jpg",
    },
    {
      id: "bangkok-thailand",
      name: "Bangkok, Thailand",
      tag: "Food",
      description: "Vibrant street food scene, ornate temples, and bustling markets.",
      image: "/bangkok-thailand-street-food-temple-market-night.jpg",
    },
    {
      id: "banff-canada",
      name: "Banff, Canada",
      tag: "Nature",
      description: "Majestic mountain landscapes, turquoise lakes, and wildlife.",
      image: "/banff-canada-lake-louise-mountains-turquoise-water.jpg",
    },
    {
      id: "dubai-uae",
      name: "Dubai, UAE",
      tag: "Cities",
      description: "Futuristic cityscape with luxury shopping, modern architecture, and desert adventures.",
      image: "/dubai-uae-burj-khalifa-skyline-modern-luxury.jpg",
    },
    {
      id: "machu-picchu-peru",
      name: "Machu Picchu, Peru",
      tag: "Adventure",
      description: "Ancient Incan citadel nestled in the Andes mountains.",
      image: "/machu-picchu-peru-inca-ruins-mountains-ancient.jpg",
    },
    {
      id: "maldives",
      name: "Maldives",
      tag: "Beaches",
      description: "Overwater bungalows, crystal-clear waters, and pristine coral reefs.",
      image: "/maldives-overwater-bungalow-turquoise-ocean-tropic.jpg",
    },
    {
      id: "rome-italy",
      name: "Rome, Italy",
      tag: "Culture",
      description: "Ancient history, Renaissance art, and incredible Italian cuisine.",
      image: "/rome-italy-colosseum-ancient-ruins.jpg",
    },
    {
      id: "new-zealand",
      name: "New Zealand",
      tag: "Nature",
      description: "Dramatic fjords, volcanic peaks, and adventure activities.",
      image: "/new-zealand-milford-sound-fjord-mountains.jpg",
    },
    {
      id: "kyoto-japan",
      name: "Kyoto, Japan",
      tag: "Culture",
      description: "Traditional temples, zen gardens, and authentic geisha districts.",
      image: "/kyoto-japan-bamboo-forest-temple-traditional.jpg",
    },
    {
      id: "queenstown-new-zealand",
      name: "Queenstown, New Zealand",
      tag: "Adventure",
      description: "Adventure capital with bungee jumping, skiing, and stunning landscapes.",
      image: "/queenstown-new-zealand-lake-adventure-mountains.jpg",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/world-travel-destinations-map-globe.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-5xl md:text-6xl text-white mb-4 animate-fade-in">
            Discover Destinations
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Explore incredible places around the world</p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-semibold text-xl">Filter Destinations</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="americas">Americas</SelectItem>
                  <SelectItem value="oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Experiences</SelectItem>
                  <SelectItem value="beaches">Beaches</SelectItem>
                  <SelectItem value="cities">Cities</SelectItem>
                  <SelectItem value="culture">Culture</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                <SelectTrigger>
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="low">Low ($)</SelectItem>
                  <SelectItem value="mid">Mid ($$)</SelectItem>
                  <SelectItem value="luxury">Luxury ($$$)</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-primary hover:bg-primary/90">Apply Filters</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Destinations Grid */}
      <section className="container mx-auto px-4 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-secondary/90 text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {destination.tag}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <h3 className="font-heading font-bold text-xl group-hover:text-primary transition-colors">
                    {destination.name}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{destination.description}</p>
                <Link href={`/destinations/${destination.id}`}>
                  <Button
                    variant="outline"
                    className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors bg-transparent"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Highlight */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="overflow-hidden border-0 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div
                className="h-96 lg:h-auto bg-cover bg-center"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=800&width=1000')`,
                }}
              />
              <CardContent className="p-12 flex flex-col justify-center">
                <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6 w-fit">
                  Destination of the Month
                </span>
                <h2 className="font-heading font-bold text-4xl mb-6">Santorini, Greece</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Experience the magic of Santorini with its iconic white-washed buildings, breathtaking sunsets over
                  the caldera, and charming villages perched on cliffs. Discover ancient ruins, volcanic beaches, and
                  world-class cuisine in this Mediterranean paradise.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full">
                    Explore Santorini
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                    View Gallery
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}

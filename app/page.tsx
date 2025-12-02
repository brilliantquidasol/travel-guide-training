import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Search,
  Calendar,
  MapPin,
  Palmtree,
  Building2,
  Mountain,
  UtensilsCrossed,
  Trees,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredDestinations = [
    {
      name: "Santorini, Greece",
      tagline: "Beaches & Culture",
      image: "/santorini-sunset.png",
    },
    {
      name: "Tokyo, Japan",
      tagline: "Modern Cityscape",
      image: "/tokyo-japan-shibuya-crossing-neon-lights-night.jpg",
    },
    {
      name: "Patagonia, Chile",
      tagline: "Adventure & Nature",
      image: "/patagonia-chile-mountains-torres-del-paine-hiking.jpg",
    },
    {
      name: "Marrakech, Morocco",
      tagline: "Culture & Markets",
      image: "/marrakech-morocco-souk-market-colorful-spices.jpg",
    },
  ]

  const categories = [
    { icon: Palmtree, label: "Beaches" },
    { icon: Building2, label: "Cities" },
    { icon: Mountain, label: "Adventure" },
    { icon: UtensilsCrossed, label: "Food & Culture" },
    { icon: Trees, label: "Nature Trails" },
  ]

  const travelTips = [
    {
      image: "/luggage-packing-travel-essentials-organized.jpg",
      title: "10 Essential Packing Tips for Long Trips",
      snippet: "Learn how to pack efficiently and never forget important items again with our expert guide.",
    },
    {
      image: "/budget-travel-backpacker-coins-money-saving.jpg",
      title: "Budget Travel: How to See the World for Less",
      snippet: "Discover proven strategies to save money on flights, accommodation, and experiences.",
    },
    {
      image: "/solo-female-traveler-confident-happy-safe.jpg",
      title: "Solo Travel Safety: A Complete Guide",
      snippet: "Stay safe and confident while exploring the world on your own with these essential tips.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/beautiful-mountain-lake-sunset-traveler-silhouette.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-5xl md:text-7xl text-white mb-6 animate-fade-in text-balance">
            Explore the World, One Trip at a Time.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed">
            Discover hand-picked destinations, travel stories, and guides to plan your next adventure.
          </p>

          {/* Search Bar */}
          <Card className="max-w-4xl mx-auto shadow-2xl animate-slide-up">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Where to?"
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <div className="flex-1 flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="When?"
                    type="text"
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-xl px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Explore
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">Featured Destinations</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handpicked locations that will inspire your next journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredDestinations.map((destination, index) => (
            <Link key={index} href="/destinations" className="group">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                <div className="relative h-80 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${destination.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block bg-secondary/90 text-secondary-foreground text-sm font-medium px-4 py-1 rounded-full mb-3">
                      {destination.tagline}
                    </span>
                    <h3 className="font-heading font-bold text-3xl text-white">{destination.name}</h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/destinations">
            <Button size="lg" variant="outline" className="rounded-full bg-transparent">
              View All Destinations
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Travel Categories */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl mb-4">Explore by Category</h2>
            <p className="text-muted-foreground text-lg">Find your perfect travel style</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className="flex items-center gap-3 bg-white hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-6 py-4 rounded-full shadow-md hover:shadow-xl group"
              >
                <category.icon className="w-5 h-5" />
                <span className="font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Travel Tips */}
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">Latest Travel Tips</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Expert advice to make your travels smoother and more enjoyable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {travelTips.map((tip, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${tip.image}')` }}
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                  {tip.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{tip.snippet}</p>
                <Link
                  href="/travel-tips"
                  className="text-primary font-medium inline-flex items-center hover:gap-2 transition-all"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/travel-tips">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full">
              View All Tips
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

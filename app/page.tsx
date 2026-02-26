import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SectionHeading } from "@/components/marketing/section-heading";
import { DestinationCard } from "@/components/marketing/destination-card";
import { TourCard } from "@/components/marketing/tour-card";
import { HeroSearch } from "@/components/marketing/hero-search";
import { NewsletterSignup } from "@/components/marketing/newsletter-signup";
import { Testimonials } from "@/components/marketing/testimonials";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getDestinations, getTours, getHotels } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let popularDestinations: Awaited<ReturnType<typeof getDestinations>>["items"] = [];
  let featuredTours: Awaited<ReturnType<typeof getTours>>["items"] = [];
  let searchDestinations: Awaited<ReturnType<typeof getDestinations>>["items"] = [];
  let searchTours: Awaited<ReturnType<typeof getTours>>["items"] = [];
  let searchHotels: Awaited<ReturnType<typeof getHotels>>["items"] = [];

  try {
    const [destRes, toursRes, hotelsRes, destSearchRes, toursSearchRes, hotelsSearchRes] = await Promise.all([
      getDestinations({ limit: 6 }),
      getTours({ limit: 3 }),
      getHotels({ limit: 6 }),
      getDestinations({ limit: 50 }),
      getTours({ limit: 50 }),
      getHotels({ limit: 50 }),
    ]);
    popularDestinations = Array.isArray(destRes?.items) ? destRes.items : [];
    featuredTours = Array.isArray(toursRes?.items) ? toursRes.items : [];
    searchDestinations = Array.isArray(destSearchRes?.items) ? destSearchRes.items : [];
    searchTours = Array.isArray(toursSearchRes?.items) ? toursSearchRes.items : [];
    searchHotels = Array.isArray(hotelsSearchRes?.items) ? hotelsSearchRes.items : [];
  } catch (_e) {
    // Stub data when API is unavailable
    popularDestinations = [
      {
        _id: "1",
        name: "Santorini, Greece",
        slug: "santorini-greece",
        continent: "Europe",
        country: "Greece",
        summary: "White-washed villages and caldera sunsets.",
        heroImage: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
        tags: ["Beaches", "Culture"],
      },
      {
        _id: "2",
        name: "Tokyo, Japan",
        slug: "tokyo-japan",
        continent: "Asia",
        country: "Japan",
        summary: "Modern cityscape and ancient traditions.",
        heroImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
        tags: ["Cities"],
      },
      {
        _id: "3",
        name: "Patagonia, Chile",
        slug: "patagonia-chile",
        continent: "South America",
        country: "Chile",
        summary: "Mountains, glaciers, and adventure.",
        heroImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
        tags: ["Adventure", "Nature"],
      },
    ];
    featuredTours = [
      {
        _id: "1",
        title: "Classic Greek Islands",
        slug: "classic-greek-islands",
        durationDays: 7,
        priceFrom: 1200,
        highlights: ["Santorini sunset", "Mykonos beaches", "Delos ruins"],
        destinations: [],
      },
      {
        _id: "2",
        title: "Japan Highlights",
        slug: "japan-highlights",
        durationDays: 10,
        priceFrom: 2400,
        highlights: ["Tokyo", "Kyoto temples", "Mount Fuji"],
        destinations: [],
      },
      {
        _id: "3",
        title: "Patagonia Explorer",
        slug: "patagonia-explorer",
        durationDays: 8,
        priceFrom: 1800,
        highlights: ["Torres del Paine", "Glaciers", "Hiking"],
        destinations: [],
      },
    ];
    searchDestinations = popularDestinations;
    searchTours = featuredTours;
    searchHotels = [];
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Cinematic hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=85')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center pt-24 pb-12">
          <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 animate-fade-in text-balance">
            Your next adventure awaits
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-slide-up">
            Discover destinations, curated tours, and hand-picked stays. Plan it all in one place.
          </p>
          <HeroSearch
            searchDestinations={searchDestinations}
            searchTours={searchTours}
            searchHotels={searchHotels}
          />
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <SectionHeading
          title="Popular destinations"
          subtitle="Handpicked places that will inspire your next journey"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDestinations.slice(0, 6).map((d) => (
            <DestinationCard key={d._id} destination={d} imageHeight="h-72" />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <Link href="/destinations">
              View all destinations
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Featured tours"
            subtitle="Guided experiences and multi-day adventures"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTours.slice(0, 3).map((t) => (
              <TourCard key={t._id} tour={t} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" asChild>
              <Link href="/tours">
                View all tours
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <NewsletterSignup />
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="What travelers say"
            subtitle="Real stories from people who planned with Wanderlust"
          />
          <Testimonials />
        </div>
      </section>

      <Footer />
    </div>
  );
}

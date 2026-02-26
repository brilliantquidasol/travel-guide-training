import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Star,
  Camera,
} from "lucide-react";
import { getDestinationBySlug, getTours, getHotels } from "@/lib/api";
import { TourCard } from "@/components/marketing/tour-card";
import { HotelCard } from "@/components/marketing/hotel-card";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  try {
    const { slug } = await params;
    const dest = await getDestinationBySlug(slug);
    if (!dest) return { title: "Destination not found" };
    return { title: `${dest.name} | Wanderlust` };
  } catch {
    return { title: "Destination | Wanderlust" };
  }
}

export default async function DestinationSlugPage({ params }: Props) {
  const { slug } = await params;
  let destination: Awaited<ReturnType<typeof getDestinationBySlug>> = null;
  try {
    destination = await getDestinationBySlug(slug);
  } catch {
    notFound();
  }
  if (!destination) notFound();

  let relatedTours: Awaited<ReturnType<typeof getTours>>["items"] = [];
  let relatedHotels: Awaited<ReturnType<typeof getHotels>>["items"] = [];
  try {
    const [toursRes, hotelsRes] = await Promise.all([
      getTours({ destinationId: destination._id, limit: 4 }),
      getHotels({ destinationId: destination._id, limit: 4 }),
    ]);
    relatedTours = toursRes.items;
    relatedHotels = hotelsRes.items;
  } catch {
    // leave empty
  }

  const heroImage =
    destination.heroImage ||
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80";

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative min-h-[70vh] flex items-end overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-16">
          <Link href="/destinations">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to destinations
            </Button>
          </Link>
          <div className="max-w-4xl">
            {destination.tags?.length ? (
              <span className="inline-block bg-secondary/90 text-secondary-foreground text-sm font-semibold px-4 py-2 rounded-full mb-4">
                {destination.tags[0]}
              </span>
            ) : null}
            <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-4">
              {destination.name}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl">
              {destination.summary || `${destination.name}, ${destination.country}. Explore with us.`}
            </p>
          </div>
        </div>
      </section>

      {(destination.bestTimeToVisit || destination.idealTripLength) && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap gap-6 max-w-4xl">
              {destination.bestTimeToVisit && (
                <Card>
                  <CardContent className="p-6 flex items-center gap-4">
                    <Calendar className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold">Best time to visit</h3>
                      <p className="text-sm text-muted-foreground">
                        {destination.bestTimeToVisit}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              {destination.idealTripLength && (
                <Card>
                  <CardContent className="p-6 flex items-center gap-4">
                    <MapPin className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold">Ideal trip length</h3>
                      <p className="text-sm text-muted-foreground">
                        {destination.idealTripLength.min}–{destination.idealTripLength.max} days
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {destination.gallery && destination.gallery.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-heading font-bold text-3xl mb-8">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {destination.gallery.slice(0, 6).map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${src}')` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedTours.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-heading font-bold text-3xl mb-8">Tours in this destination</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTours.map((t) => (
                <TourCard key={t._id} tour={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedHotels.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-heading font-bold text-3xl mb-8">Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedHotels.map((h) => (
                <HotelCard key={h._id} hotel={h} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl mb-4">
            Ready to visit {destination.name}?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full bg-primary" asChild>
              <Link href="/plan-trip">Plan your trip</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <Link href="/destinations">Explore more destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

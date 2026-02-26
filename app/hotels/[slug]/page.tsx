import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Star, MapPin } from "lucide-react";
import { getHotelBySlug } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) return { title: "Hotel not found" };
  return { title: `${hotel.name} | Wanderlust` };
}

export default async function HotelSlugPage({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) notFound();

  const img =
    hotel.gallery?.[0] ||
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80";
  const location =
    [hotel.location?.city, hotel.location?.country, hotel.destination?.name]
      .filter(Boolean)
      .join(", ") || "—";

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative min-h-[50vh] flex items-end overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${img}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-16">
          <Link href="/hotels">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:text-white hover:bg-white/20"
            >
              ← Back to hotels
            </Button>
          </Link>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-2">
            {hotel.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/90">
            {hotel.rating != null && hotel.rating > 0 && (
              <span className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-current" />
                {hotel.rating}
              </span>
            )}
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {location}
            </span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-3xl">
          {hotel.amenities && hotel.amenities.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="font-heading font-bold text-2xl mb-4">Amenities</h2>
                <ul className="flex flex-wrap gap-2">
                  {hotel.amenities.map((a, i) => (
                    <li
                      key={i}
                      className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Button size="lg" className="rounded-full bg-primary" asChild>
            <Link href="/plan-trip">Add to trip plan</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

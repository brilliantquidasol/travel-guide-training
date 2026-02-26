import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Star, MapPin, DollarSign, Sparkles } from "lucide-react";
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

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${img}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-16 pt-12">
          <Link href="/hotels">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:text-white hover:bg-white/20 rounded-full"
            >
              ← Back to hotels
            </Button>
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {hotel.rating != null && hotel.rating > 0 && (
              <span className="flex items-center gap-1.5 bg-white/20 text-white text-sm font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                {hotel.rating}-star
              </span>
            )}
            {hotel.priceFrom != null && (
              <span className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-3 py-1.5 rounded-full">
                <DollarSign className="w-4 h-4" />
                From {hotel.priceFrom} / night
              </span>
            )}
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-2 drop-shadow-sm">
            {hotel.name}
          </h1>
          <p className="text-lg text-white/90 flex items-center gap-2">
            <MapPin className="w-5 h-5 shrink-0" />
            {location}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-4xl space-y-10">
          {hotel.shortDescription && (
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {hotel.shortDescription}
            </p>
          )}

          {hotel.longDescription && (
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="font-heading font-bold text-2xl mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  About this property
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {hotel.longDescription}
                </p>
              </CardContent>
            </Card>
          )}

          {hotel.priceFrom != null && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex flex-row flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Starting rate</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${hotel.priceFrom.toLocaleString("en-US")}
                    <span className="text-base font-normal text-muted-foreground"> / night</span>
                  </p>
                </div>
                <Button size="lg" className="rounded-full bg-primary shrink-0" asChild>
                  <Link href="/plan-trip">Add to trip plan</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {hotel.amenities && hotel.amenities.length > 0 && (
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="font-heading font-bold text-2xl mb-4">Amenities & services</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {hotel.amenities.map((a, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {hotel.gallery && hotel.gallery.length > 0 && (
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="font-heading font-bold text-2xl mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.gallery.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`${hotel.name} photo ${i + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-muted-foreground mb-4">Ready to include this stay in your trip?</p>
          <Button size="lg" className="rounded-full bg-primary" asChild>
            <Link href="/plan-trip">Add to trip plan</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

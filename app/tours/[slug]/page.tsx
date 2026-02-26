import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Calendar, MapPin, DollarSign, Check } from "lucide-react";
import { getTourBySlug } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return { title: "Tour not found" };
  return { title: `${tour.title} | Wanderlust` };
}

export default async function TourSlugPage({ params }: Props) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const destinationNames =
    tour.destinations?.map((d) => d.name).join(", ") || "Multiple destinations";

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative min-h-[50vh] flex items-end overflow-hidden mt-20">
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-9xl opacity-20">✈</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-16">
          <Link href="/tours">
            <Button variant="ghost" className="mb-6">
              ← Back to tours
            </Button>
          </Link>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            {tour.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {destinationNames}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {tour.durationDays} days
            </span>
            <span className="flex items-center gap-2 font-semibold text-primary">
              <DollarSign className="w-5 h-5" />
              From ${tour.priceFrom}
            </span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-3xl">
          {tour.highlights && tour.highlights.length > 0 && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="font-heading font-bold text-2xl mb-4">Highlights</h2>
                <ul className="space-y-2">
                  {tour.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{h}</span>
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

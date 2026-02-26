import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tour } from "@/lib/api";

const DEFAULT_TOUR_IMAGE = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80";

type TourCardProps = {
  tour: Tour;
  className?: string;
};

export function TourCard({ tour, className }: TourCardProps) {
  const destinationNames =
    tour.destinations?.map((d) => d.name).join(", ") || "Multiple destinations";
  const heroImage = tour.heroImage || DEFAULT_TOUR_IMAGE;

  return (
    <Link href={`/tours/${tour.slug}`} className={cn("group block", className)}>
      <Card className="overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {tour.categories?.[0] && (
            <div className="absolute top-3 right-3">
              <span className="bg-primary/90 text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                {tour.categories[0]}
              </span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white/90 text-sm flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {destinationNames}
            </p>
          </div>
        </div>
        <CardContent className="p-5 flex-1 flex flex-col">
          <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-primary transition-colors">
            {tour.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {tour.durationDays} days
            </span>
            <span className="font-semibold text-primary">From ${tour.priceFrom}</span>
          </div>
          {(tour.shortDescription || tour.highlights?.[0]) && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {tour.shortDescription || tour.highlights?.[0]}
            </p>
          )}
          <Button
            variant="outline"
            size="sm"
            className="mt-auto w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground"
            asChild
          >
            <span>
              View tour
              <ArrowRight className="w-4 h-4 ml-2" />
            </span>
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

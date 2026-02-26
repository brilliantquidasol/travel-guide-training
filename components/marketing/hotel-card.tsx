import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, MapPin, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Hotel } from "@/lib/api";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80";

type HotelCardProps = {
  hotel: Hotel;
  className?: string;
};

export function HotelCard({ hotel, className }: HotelCardProps) {
  const img = hotel.gallery?.[0] ?? DEFAULT_IMAGE;
  const location = [hotel.location?.city, hotel.location?.country].filter(Boolean).join(", ") || "—";
  const amenitiesPreview = hotel.amenities?.slice(0, 3).join(" · ") || "";

  return (
    <Link href={`/hotels/${hotel.slug}`} className={cn("group block", className)}>
      <Card className="overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative h-56 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('${img}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {hotel.rating != null && hotel.rating > 0 && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 text-foreground text-sm font-semibold px-2.5 py-1 rounded-full shadow-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              {hotel.rating}
            </div>
          )}
          {hotel.priceFrom != null && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-background/90 text-foreground text-sm font-semibold px-3 py-1.5 rounded-lg">
              <DollarSign className="w-4 h-4 text-primary" />
              From {hotel.priceFrom}
              <span className="text-muted-foreground font-normal text-xs">/night</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 pt-12">
            <h3 className="font-heading font-bold text-xl text-white drop-shadow-sm">{hotel.name}</h3>
            {location && (
              <p className="text-white/90 text-sm flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                {location}
              </p>
            )}
          </div>
        </div>
        <CardContent className="p-5 flex-1 flex flex-col">
          {hotel.shortDescription && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
              {hotel.shortDescription}
            </p>
          )}
          {amenitiesPreview && (
            <p className="text-xs text-muted-foreground mb-4">{amenitiesPreview}</p>
          )}
          <Button
            variant="outline"
            size="sm"
            className="mt-auto w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
            asChild
          >
            <span>
              View hotel
              <ArrowRight className="w-4 h-4 ml-2" />
            </span>
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

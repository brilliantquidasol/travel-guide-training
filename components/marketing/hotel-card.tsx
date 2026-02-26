import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Hotel } from "@/lib/api";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80";

type HotelCardProps = {
  hotel: Hotel;
  className?: string;
};

export function HotelCard({ hotel, className }: HotelCardProps) {
  const img = hotel.gallery?.[0] ?? DEFAULT_IMAGE;
  const location = hotel.location?.city || hotel.location?.country || hotel.destination?.name;

  return (
    <Link href={`/hotels/${hotel.slug}`} className={cn("group block", className)}>
      <Card className="overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 h-full">
        <div className="relative h-52 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url('${img}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          {hotel.rating != null && hotel.rating > 0 && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 text-white text-sm font-medium px-2 py-1 rounded-full">
              <Star className="w-4 h-4 fill-current" />
              {hotel.rating}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-heading font-bold text-xl text-white">{hotel.name}</h3>
            {location && (
              <p className="text-white/90 text-sm">{location}</p>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground"
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

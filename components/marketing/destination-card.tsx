import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Destination } from "@/lib/api";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80";

type DestinationCardProps = {
  destination: Pick<Destination, "_id" | "name" | "slug" | "country" | "summary" | "heroImage" | "tags">;
  className?: string;
  imageHeight?: string;
};

export function DestinationCard({
  destination,
  className,
  imageHeight = "h-64",
}: DestinationCardProps) {
  const img = destination.heroImage || DEFAULT_IMAGE;
  const tag = destination.tags?.[0] ?? destination.country;

  return (
    <Link href={`/destinations/${destination.slug}`} className={cn("group block", className)}>
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
        <div className={cn("relative overflow-hidden", imageHeight)}>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url('${img}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-4 right-4">
            <span className="bg-secondary/90 text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
              {tag}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-heading font-bold text-xl md:text-2xl text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 shrink-0" />
              {destination.name}
            </h3>
          </div>
        </div>
        {destination.summary && (
          <CardContent className="p-5">
            <p className="text-muted-foreground text-sm line-clamp-2">{destination.summary}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
              asChild
            >
              <span>
                View details
                <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </Button>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}

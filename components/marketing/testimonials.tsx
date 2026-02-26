import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote:
      "Wanderlust made planning our honeymoon effortless. We found the perfect mix of beaches and culture in Bali.",
    author: "Sarah & Mike",
    role: "Honeymooners",
    rating: 5,
  },
  {
    quote:
      "The destination guides are incredibly detailed. We followed the Iceland itinerary and saw everything we wanted.",
    author: "James K.",
    role: "Adventure traveler",
    rating: 5,
  },
  {
    quote:
      "Finally a site that understands what we need: real tips, honest budgets, and inspiration that doesn't feel like ads.",
    author: "Elena M.",
    role: "Solo traveler",
    rating: 5,
  },
];

export function Testimonials({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}>
      {TESTIMONIALS.map((t, i) => (
        <Card key={i} className="border shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <Quote className="w-10 h-10 text-primary/30 mb-4" />
            <p className="text-foreground leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex gap-1 mb-2">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="font-semibold text-foreground">{t.author}</p>
            <p className="text-sm text-muted-foreground">{t.role}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

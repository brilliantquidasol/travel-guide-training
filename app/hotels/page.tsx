"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HotelCard } from "@/components/marketing/hotel-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getHotels, type Hotel } from "@/lib/api";
import { Building2 } from "lucide-react";

const HOTELS_PER_PAGE = 12;

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getHotels({ limit: 50 })
      .then((res) => setHotels(res.items))
      .catch(() => setHotels([]))
      .finally(() => setLoading(false));
  }, []);

  const total = hotels.length;
  const totalPages = Math.max(1, Math.ceil(total / HOTELS_PER_PAGE));
  const pageIndex = Math.min(page, totalPages);
  const paginatedHotels = hotels.slice(
    (pageIndex - 1) * HOTELS_PER_PAGE,
    pageIndex * HOTELS_PER_PAGE
  );

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[38vh] min-h-[240px] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-3">
            Hotels & stays
          </h1>
          <p className="text-lg text-white/90 max-w-xl mx-auto">
            Handpicked accommodations—from boutique stays to luxury lodges—for every journey.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="container mx-auto px-4 lg:px-8 py-10 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-heading font-bold text-2xl text-foreground">All hotels</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {loading ? "Loading…" : `${total} ${total === 1 ? "hotel" : "hotels"} to choose from`}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-56 bg-muted animate-pulse" />
                <CardContent className="p-5">
                  <div className="h-5 bg-muted rounded w-2/3 mb-3 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-full mb-2 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-dashed border-border bg-muted/20">
            <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground/60" />
            <p className="font-medium text-foreground">No hotels available yet.</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
              Check back later for handpicked stays.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedHotels.map((h) => (
                <HotelCard key={h._id} hotel={h} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-14">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  disabled={pageIndex <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <span className="px-4 text-sm text-muted-foreground">
                  Page {pageIndex} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  disabled={pageIndex >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}

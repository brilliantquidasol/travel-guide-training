"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SectionHeading } from "@/components/marketing/section-heading";
import { TourCard } from "@/components/marketing/tour-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTours, type Tour } from "@/lib/api";
import { ApiEmptyHint } from "@/components/api-empty-hint";

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    setLoading(true);
    getTours({ page, limit })
      .then((res) => {
        setTours(res.items);
        setTotal(res.total);
      })
      .catch(() => {
        setTours([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative h-[36vh] min-h-[220px] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-2">
            Tours & experiences
          </h1>
          <p className="text-white/90">Guided adventures and multi-day trips</p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-12 pb-20">
        <SectionHeading title="All tours" subtitle="Find your next adventure" />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-muted animate-pulse" />
                <CardContent className="p-5">
                  <div className="h-5 bg-muted rounded w-3/4 mb-3 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p>No tours available yet.</p>
            <ApiEmptyHint />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((t) => (
                <TourCard key={t._id} tour={t} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4 text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
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

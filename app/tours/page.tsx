"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TourCard } from "@/components/marketing/tour-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTours, type Tour } from "@/lib/api";
import { Route, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

const TOUR_CATEGORIES = [
  "All",
  "Adventure",
  "Culture",
  "City",
  "Beach & Island",
  "Wellness",
  "Nature",
];

const TOURS_PER_PAGE = 12;

export default function ToursPage() {
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getTours({ limit: 50 })
      .then((res) => {
        setAllTours(res.items);
      })
      .catch(() => setAllTours([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredTours =
    category === "All"
      ? allTours
      : allTours.filter((t) => t.categories?.includes(category));
  const totalFiltered = filteredTours.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / TOURS_PER_PAGE));
  const pageIndex = Math.min(page, totalPages);
  const paginatedTours = filteredTours.slice(
    (pageIndex - 1) * TOURS_PER_PAGE,
    pageIndex * TOURS_PER_PAGE
  );

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[38vh] min-h-[240px] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-3">
            Tours & experiences
          </h1>
          <p className="text-lg text-white/90 max-w-xl mx-auto">
            Guided adventures, cultural journeys, and multi-day trips curated for every travel style.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b border-border bg-muted/20 sticky top-20 z-40">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-1">
              <SlidersHorizontal className="w-4 h-4" />
              Category
            </span>
            {TOUR_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCategory(c);
                  setPage(1);
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  category === c
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {c}
              </button>
            ))}
            {category !== "All" && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-full text-muted-foreground hover:text-foreground -ml-1"
                onClick={() => {
                  setCategory("All");
                  setPage(1);
                }}
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Tours grid */}
      <section className="container mx-auto px-4 lg:px-8 py-10 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-heading font-bold text-2xl text-foreground">
              {category === "All" ? "All tours" : `${category} tours`}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {loading
                ? "Loading…"
                : `${totalFiltered} ${totalFiltered === 1 ? "tour" : "tours"}${category !== "All" ? ` in ${category}` : ""}`}
            </p>
          </div>
        </div>

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
        ) : paginatedTours.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-dashed border-border bg-muted/20">
            <Route className="w-16 h-16 mx-auto mb-4 text-muted-foreground/60" />
            <p className="font-medium text-foreground">
              {category === "All" ? "No tours available yet." : `No tours in ${category}.`}
            </p>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
              {category !== "All"
                ? "Try another category or view all tours."
                : "Check back later for new experiences."}
            </p>
            {category !== "All" && (
              <Button
                variant="outline"
                className="mt-6 rounded-full"
                onClick={() => setCategory("All")}
              >
                View all tours
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedTours.map((t) => (
                <TourCard key={t._id} tour={t} />
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

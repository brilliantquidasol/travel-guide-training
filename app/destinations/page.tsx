"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SectionHeading } from "@/components/marketing/section-heading";
import { DestinationCard } from "@/components/marketing/destination-card";
import { MapPin, ArrowRight, SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDestinations, type Destination } from "@/lib/api";

const CONTINENTS = [
  "All",
  "Africa",
  "Antarctica",
  "Asia",
  "Europe",
  "North America",
  "Oceania",
  "South America",
];

export default function DestinationsPage() {
  const [continent, setContinent] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");
  const [data, setData] = useState<{ items: Destination[]; total: number }>({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    setLoading(true);
    getDestinations({
      page,
      limit,
      continent: continent === "All" ? undefined : continent,
    })
      .then((res) => {
        setData({ items: res.items, total: res.total });
      })
      .catch(() => setData({ items: [], total: 0 }))
      .finally(() => setLoading(false));
  }, [page, continent]);

  const allTags = Array.from(
    new Set(data.items.flatMap((d) => d.tags ?? []))
  ).sort();
  const filteredByTag =
    tagFilter === "All"
      ? data.items
      : data.items.filter((d) => d.tags?.includes(tagFilter));
  const totalPages = Math.ceil(data.total / limit);

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative h-[36vh] min-h-[220px] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-2">
            Discover destinations
          </h1>
          <p className="text-white/90">Explore places around the world</p>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </span>
            <Select value={continent} onValueChange={setContinent}>
              <SelectTrigger className="w-[160px] h-9 rounded-full border-border bg-background text-sm font-normal">
                <SelectValue placeholder="Continent" />
              </SelectTrigger>
              <SelectContent>
                {CONTINENTS.map((c) => (
                  <SelectItem key={c} value={c === "All" ? "All" : c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="w-[140px] h-9 rounded-full border-border bg-background text-sm font-normal">
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All tags</SelectItem>
                {allTags.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
                {allTags.length === 0 && (
                  <SelectItem value="All" disabled>
                    No tags
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {(continent !== "All" || tagFilter !== "All") && (
              <Button
                variant="ghost"
                size="sm"
                className="h-9 rounded-full text-muted-foreground hover:text-foreground -ml-1"
                onClick={() => {
                  setContinent("All");
                  setTagFilter("All");
                }}
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-64 bg-muted animate-pulse" />
                <CardContent className="p-5">
                  <div className="h-5 bg-muted rounded w-3/4 mb-3 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-full animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredByTag.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>
              {data.total === 0
                ? "No destinations yet."
                : "No destinations match your filters."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredByTag.map((d) => (
                <DestinationCard key={d._id} destination={d} />
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

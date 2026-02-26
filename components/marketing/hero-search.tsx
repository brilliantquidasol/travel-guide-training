"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, MapPin, Building2, Route, ClipboardList, ChevronRight } from "lucide-react";
import type { Destination, Tour, Hotel } from "@/lib/api";

type SuggestionItem =
  | { type: "destination"; slug: string; label: string; sublabel: string }
  | { type: "tour"; slug: string; label: string; sublabel: string }
  | { type: "hotel"; slug: string; label: string; sublabel: string };

type HeroSearchProps = {
  searchDestinations?: Destination[];
  searchTours?: Tour[];
  searchHotels?: Hotel[];
};

export function HeroSearch({
  searchDestinations = [],
  searchTours = [],
  searchHotels = [],
}: HeroSearchProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"destinations" | "tours" | "hotels" | "plan">("destinations");
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo((): SuggestionItem[] => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    if (activeTab === "destinations") {
      return searchDestinations
        .filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.country.toLowerCase().includes(q) ||
            d.continent.toLowerCase().includes(q)
        )
        .slice(0, 8)
        .map((d) => ({
          type: "destination" as const,
          slug: d.slug,
          label: d.name,
          sublabel: `${d.country}, ${d.continent}`,
        }));
    }
    if (activeTab === "tours") {
      return searchTours
        .filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.highlights?.some((h) => h.toLowerCase().includes(q))
        )
        .slice(0, 8)
        .map((t) => ({
          type: "tour" as const,
          slug: t.slug,
          label: t.title,
          sublabel: `${t.durationDays} days · From $${t.priceFrom}`,
        }));
    }
    if (activeTab === "hotels") {
      return searchHotels
        .filter(
          (h) =>
            h.name.toLowerCase().includes(q) ||
            h.location?.city?.toLowerCase().includes(q) ||
            h.location?.country?.toLowerCase().includes(q)
        )
        .slice(0, 8)
        .map((h) => ({
          type: "hotel" as const,
          slug: h.slug,
          label: h.name,
          sublabel: [h.location?.city, h.location?.country].filter(Boolean).join(", ") || "—",
        }));
    }
    return [];
  }, [activeTab, query, searchDestinations, searchTours, searchHotels]);

  useEffect(() => {
    setShowDropdown(query.trim().length > 0 && suggestions.length > 0);
    setFocusedIndex(0);
  }, [query, suggestions.length]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch() {
    if (activeTab === "destinations") {
      router.push(`/destinations?continent=${encodeURIComponent(query || "")}`);
    } else if (activeTab === "tours") {
      router.push(`/tours?q=${encodeURIComponent(query)}`);
    } else if (activeTab === "hotels") {
      router.push(`/hotels?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/plan-trip");
    }
    setShowDropdown(false);
  }

  function selectSuggestion(item: SuggestionItem) {
    if (item.type === "destination") router.push(`/destinations/${item.slug}`);
    else if (item.type === "tour") router.push(`/tours/${item.slug}`);
    else if (item.type === "hotel") router.push(`/hotels/${item.slug}`);
    setShowDropdown(false);
    setQuery("");
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && suggestions[focusedIndex]) {
      e.preventDefault();
      selectSuggestion(suggestions[focusedIndex]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  }

  const Icon = activeTab === "destinations" ? MapPin : activeTab === "tours" ? Route : Building2;

  return (
    <Card className="max-w-4xl mx-auto shadow-2xl border-0 overflow-visible animate-slide-up">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "destinations" | "tours" | "hotels" | "plan")} className="w-full">
        <TabsList className="w-full h-12 rounded-none border-b border-border bg-muted/50 grid grid-cols-4">
          <TabsTrigger value="destinations" className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <MapPin className="w-4 h-4 mr-2 hidden sm:inline" />
            Destinations
          </TabsTrigger>
          <TabsTrigger value="tours" className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Route className="w-4 h-4 mr-2 hidden sm:inline" />
            Tours
          </TabsTrigger>
          <TabsTrigger value="hotels" className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Building2 className="w-4 h-4 mr-2 hidden sm:inline" />
            Hotels
          </TabsTrigger>
          <TabsTrigger value="plan" className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <ClipboardList className="w-4 h-4 mr-2 hidden sm:inline" />
            Plan Trip
          </TabsTrigger>
        </TabsList>
        <CardContent className="p-4 md:p-6">
          <TabsContent value="destinations" className="mt-0">
            <div ref={wrapperRef} className="relative flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
                  <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
                  <Input
                    placeholder="Search continent or country..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim() && suggestions.length > 0 && setShowDropdown(true)}
                    onKeyDown={onKeyDown}
                    className="border-0 bg-transparent focus-visible:ring-0"
                  />
                </div>
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden max-h-72 overflow-y-auto">
                    {suggestions.map((item, i) => (
                      <button
                        key={`${item.type}-${item.slug}`}
                        type="button"
                        onClick={() => selectSuggestion(item)}
                        className={`w-full text-left px-4 py-3 flex items-center justify-between gap-2 hover:bg-muted/80 transition-colors ${i === focusedIndex ? "bg-muted/80" : ""}`}
                      >
                        <div className="min-w-0">
                          <p className="font-medium truncate">{item.label}</p>
                          <p className="text-sm text-muted-foreground truncate">{item.sublabel}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button size="lg" className="rounded-xl bg-primary hover:bg-primary/90 shrink-0" onClick={handleSearch}>
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="tours" className="mt-0">
            <div ref={wrapperRef} className="relative flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
                  <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
                  <Input
                    placeholder="Search destination or tour name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim() && suggestions.length > 0 && setShowDropdown(true)}
                    onKeyDown={onKeyDown}
                    className="border-0 bg-transparent focus-visible:ring-0"
                  />
                </div>
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden max-h-72 overflow-y-auto">
                    {suggestions.map((item, i) => (
                      <button
                        key={`${item.type}-${item.slug}`}
                        type="button"
                        onClick={() => selectSuggestion(item)}
                        className={`w-full text-left px-4 py-3 flex items-center justify-between gap-2 hover:bg-muted/80 transition-colors ${i === focusedIndex ? "bg-muted/80" : ""}`}
                      >
                        <div className="min-w-0">
                          <p className="font-medium truncate">{item.label}</p>
                          <p className="text-sm text-muted-foreground truncate">{item.sublabel}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button size="lg" className="rounded-xl bg-primary hover:bg-primary/90 shrink-0" onClick={handleSearch}>
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="hotels" className="mt-0">
            <div ref={wrapperRef} className="relative flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
                  <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
                  <Input
                    placeholder="Search city or hotel name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim() && suggestions.length > 0 && setShowDropdown(true)}
                    onKeyDown={onKeyDown}
                    className="border-0 bg-transparent focus-visible:ring-0"
                  />
                </div>
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden max-h-72 overflow-y-auto">
                    {suggestions.map((item, i) => (
                      <button
                        key={`${item.type}-${item.slug}`}
                        type="button"
                        onClick={() => selectSuggestion(item)}
                        className={`w-full text-left px-4 py-3 flex items-center justify-between gap-2 hover:bg-muted/80 transition-colors ${i === focusedIndex ? "bg-muted/80" : ""}`}
                      >
                        <div className="min-w-0">
                          <p className="font-medium truncate">{item.label}</p>
                          <p className="text-sm text-muted-foreground truncate">{item.sublabel}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button size="lg" className="rounded-xl bg-primary hover:bg-primary/90 shrink-0" onClick={handleSearch}>
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="plan" className="mt-0">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <p className="flex-1 text-muted-foreground text-sm">
                Build your itinerary, set your budget, and organize your trip in one place.
              </p>
              <Button size="lg" className="rounded-xl bg-primary hover:bg-primary/90 shrink-0" onClick={handleSearch}>
                Open trip planner
              </Button>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}

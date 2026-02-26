"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import {
  getDestinations,
  getTours,
  getHotels,
  createTrip,
  type Destination,
  type Tour,
  type Hotel,
  type ItineraryItem,
} from "@/lib/api";
import { setStoredUserId, getStoredUserId } from "@/lib/auth";
import {
  MapPin,
  CalendarDays,
  Users,
  Banknote,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ORIGIN_CITIES = [
  "New York", "Los Angeles", "Chicago", "San Francisco", "Miami", "Boston", "Seattle", "Washington DC",
  "London", "Paris", "Berlin", "Amsterdam", "Madrid", "Rome", "Barcelona", "Frankfurt", "Zurich",
  "Tokyo", "Singapore", "Hong Kong", "Seoul", "Sydney", "Dubai", "Toronto", "Vancouver", "Mexico City",
];

const TRAVEL_STYLES = [
  "Leisure",
  "Adventure",
  "Culture",
  "Beach",
  "City",
  "Nature",
  "Solo",
  "Family",
];

export default function PlanTripPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1: basic info
  const [title, setTitle] = useState("");
  const [originCity, setOriginCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [travelerCount, setTravelerCount] = useState("1");
  const [travelStyle, setTravelStyle] = useState("");

  // Step 2: destinations (from catalog)
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestinationIds, setSelectedDestinationIds] = useState<string[]>([]);
  const [destinationsLoading, setDestinationsLoading] = useState(true);

  // Step 3: tours/hotels per destination
  const [toursByDest, setToursByDest] = useState<Record<string, Tour[]>>({});
  const [hotelsByDest, setHotelsByDest] = useState<Record<string, Hotel[]>>({});
  const [selectedTours, setSelectedTours] = useState<string[]>([]);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originDropdownOpen, setOriginDropdownOpen] = useState(false);
  const [originFocusedIndex, setOriginFocusedIndex] = useState(0);
  const originRef = useRef<HTMLDivElement>(null);

  const originSuggestions = useMemo(() => {
    const q = originCity.trim().toLowerCase();
    if (!q) return ORIGIN_CITIES.slice(0, 8);
    return ORIGIN_CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 8);
  }, [originCity]);

  useEffect(() => {
    setOriginDropdownOpen(originSuggestions.length > 0);
    setOriginFocusedIndex(0);
  }, [originCity, originSuggestions.length]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (originRef.current && !originRef.current.contains(e.target as Node)) {
        setOriginDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ensure we have a user id for API (v1 dev stub)
  useEffect(() => {
    if (!getStoredUserId()) {
      setStoredUserId("dev-user-" + Math.random().toString(36).slice(2, 10));
    }
  }, []);

  // Fetch destinations for step 2
  useEffect(() => {
    setDestinationsLoading(true);
    getDestinations({ limit: 50 })
      .then((r) => setDestinations(r.items))
      .catch(() => setDestinations([]))
      .finally(() => setDestinationsLoading(false));
  }, []);

  // When destinations selected, fetch tours and hotels for each (step 3)
  useEffect(() => {
    if (step !== 3 || selectedDestinationIds.length === 0) return;
    setCatalogLoading(true);
    const tours: Record<string, Tour[]> = {};
    const hotels: Record<string, Hotel[]> = {};
    Promise.all(
      selectedDestinationIds.map(async (destId) => {
        const [tRes, hRes] = await Promise.all([
          getTours({ destinationId: destId, limit: 10 }),
          getHotels({ destinationId: destId, limit: 10 }),
        ]);
        tours[destId] = tRes.items;
        hotels[destId] = hRes.items;
      })
    ).then(() => {
      setToursByDest(tours);
      setHotelsByDest(hotels);
      setCatalogLoading(false);
    });
  }, [step, selectedDestinationIds.join(",")]);

  const toggleDestination = (id: string) => {
    setSelectedDestinationIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleTour = (tourId: string) => {
    setSelectedTours((prev) =>
      prev.includes(tourId) ? prev.filter((x) => x !== tourId) : [...prev, tourId]
    );
  };

  const toggleHotel = (hotelId: string) => {
    setSelectedHotels((prev) =>
      prev.includes(hotelId) ? prev.filter((x) => x !== hotelId) : [...prev, hotelId]
    );
  };

  const buildItinerary = (): ItineraryItem[] => {
    const items: ItineraryItem[] = [];
    const start = startDate ? new Date(startDate) : new Date();
    const end = endDate ? new Date(endDate) : new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)));
    let dayIndex = 0;
    selectedTours.forEach((tourId) => {
      const d = new Date(start);
      d.setDate(d.getDate() + dayIndex % days);
      items.push({
        type: "tour",
        productId: tourId,
        date: d.toISOString().slice(0, 10),
        title: "Tour",
      });
      dayIndex++;
    });
    selectedHotels.forEach((hotelId) => {
      const d = new Date(start);
      d.setDate(d.getDate() + dayIndex % days);
      items.push({
        type: "hotel",
        productId: hotelId,
        date: d.toISOString().slice(0, 10),
        title: "Hotel stay",
      });
      dayIndex++;
    });
    return items;
  };

  const handleComplete = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const trip = await createTrip({
        title: title || "My Trip",
        startDate: startDate || new Date().toISOString().slice(0, 10),
        endDate: endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        originCity: originCity || undefined,
        budget: budget ? Number(budget) : undefined,
        travelerCount: travelerCount ? Number(travelerCount) : 1,
        travelStyle: travelStyle || undefined,
        destinationIds: selectedDestinationIds.length ? selectedDestinationIds : undefined,
        itinerary: buildItinerary(),
      });
      router.push(`/dashboard/trips/${trip._id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create trip");
    } finally {
      setSubmitting(false);
    }
  };

  const canGoNext =
    step === 1
      ? !!startDate && !!endDate
      : step === 2
        ? selectedDestinationIds.length > 0
        : true;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 pb-12 px-4">
        <div className="container max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-4xl mb-2">Plan your trip</h1>
          <p className="text-muted-foreground mb-8">
            Fill in the basics, pick destinations, then add tours and hotels. You can edit the itinerary later.
          </p>

          {/* Step indicator */}
          <div className="flex gap-2 mb-10">
            {[
              { step: 1, label: "Basics" },
              { step: 2, label: "Destinations" },
              { step: 3, label: "Tours & hotels" },
            ].map(({ step: s, label }) => (
              <div
                key={s}
                className={cn(
                  "flex-1 rounded-xl py-2.5 px-3 text-center transition-colors",
                  step === s ? "bg-primary text-primary-foreground" : step > s ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                )}
              >
                <span className="text-xs font-medium hidden sm:inline">{label}</span>
                <span className="sm:hidden font-semibold">{s}</span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-primary" />
                  Basic info
                </CardTitle>
                <CardDescription>When and how you&apos;re traveling</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8 space-y-6">
                <div>
                  <Label className="text-sm font-medium">Trip name</Label>
                  <Input
                    placeholder="e.g. Summer in Europe"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1.5 h-11 rounded-xl border-border bg-background"
                  />
                </div>
                <div ref={originRef} className="relative">
                  <Label className="text-sm font-medium">Origin city</Label>
                  <div className="relative mt-1.5">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                      placeholder="Where are you traveling from?"
                      value={originCity}
                      onChange={(e) => setOriginCity(e.target.value)}
                      onFocus={() => originSuggestions.length > 0 && setOriginDropdownOpen(true)}
                      onKeyDown={(e) => {
                        if (!originDropdownOpen || originSuggestions.length === 0) return;
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setOriginFocusedIndex((i) => (i + 1) % originSuggestions.length);
                        } else if (e.key === "ArrowUp") {
                          e.preventDefault();
                          setOriginFocusedIndex((i) => (i - 1 + originSuggestions.length) % originSuggestions.length);
                        } else if (e.key === "Enter" && originSuggestions[originFocusedIndex]) {
                          e.preventDefault();
                          setOriginCity(originSuggestions[originFocusedIndex]);
                          setOriginDropdownOpen(false);
                        } else if (e.key === "Escape") setOriginDropdownOpen(false);
                      }}
                      className="pl-10 h-11 rounded-xl border-border bg-background"
                    />
                    {originDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                        {originSuggestions.map((city, i) => (
                          <button
                            key={city}
                            type="button"
                            onClick={() => {
                              setOriginCity(city);
                              setOriginDropdownOpen(false);
                            }}
                            className={cn(
                              "w-full text-left px-4 py-3 text-sm transition-colors",
                              i === originFocusedIndex ? "bg-muted" : "hover:bg-muted/80"
                            )}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1.5">
                      <CalendarDays className="w-4 h-4 text-muted-foreground" />
                      Start date
                    </Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-1.5 h-11 rounded-xl border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1.5">
                      <CalendarDays className="w-4 h-4 text-muted-foreground" />
                      End date
                    </Label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="mt-1.5 h-11 rounded-xl border-border"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-muted-foreground" />
                      Budget (USD)
                    </Label>
                    <Input
                      type="number"
                      placeholder="e.g. 5000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="mt-1.5 h-11 rounded-xl border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      Travelers
                    </Label>
                    <Select value={travelerCount} onValueChange={setTravelerCount}>
                      <SelectTrigger className="mt-1.5 h-11 rounded-xl border-border">
                        <SelectValue placeholder="Number of travelers" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n} {n === 1 ? "traveler" : "travelers"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Travel style</Label>
                  <Select value={travelStyle} onValueChange={setTravelStyle}>
                    <SelectTrigger className="mt-1.5 h-11 rounded-xl border-border">
                      <SelectValue placeholder="Select style (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRAVEL_STYLES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Choose destinations
                </CardTitle>
                <CardDescription>Select at least one destination from our catalog</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                {destinationsLoading ? (
                  <p className="text-muted-foreground py-8">Loading destinations…</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
                    {destinations.map((d) => (
                      <button
                        key={d._id}
                        type="button"
                        onClick={() => toggleDestination(d._id)}
                        className={cn(
                          "text-left p-4 rounded-xl border-2 transition-all",
                          selectedDestinationIds.includes(d._id)
                            ? "border-primary bg-primary/10 ring-1 ring-primary/20"
                            : "border-border hover:border-primary/50 hover:bg-muted/30"
                        )}
                      >
                        <span className="font-medium block">{d.name}</span>
                        <span className="text-muted-foreground text-sm">{d.country}</span>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Tours & hotels
                </CardTitle>
                <CardDescription>Add tours and hotels for your chosen destinations</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8 space-y-6">
                {catalogLoading ? (
                  <p className="text-muted-foreground py-8">Loading suggestions…</p>
                ) : (
                  <>
                    {selectedDestinationIds.map((destId) => {
                      const dest = destinations.find((d) => d._id === destId);
                      const tours = toursByDest[destId] ?? [];
                      const hotels = hotelsByDest[destId] ?? [];
                      return (
                        <div key={destId} className="rounded-xl border border-border bg-muted/10 p-5 space-y-4">
                          <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            {dest?.name ?? destId}
                          </h3>
                          {tours.length > 0 && (
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Tours</Label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {tours.map((t) => (
                                  <button
                                    key={t._id}
                                    type="button"
                                    onClick={() => toggleTour(t._id)}
                                    className={cn(
                                      "px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors",
                                      selectedTours.includes(t._id)
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border hover:border-primary/50"
                                    )}
                                  >
                                    {t.title} · ${t.priceFrom}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          {hotels.length > 0 && (
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Hotels</Label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {hotels.map((h) => (
                                  <button
                                    key={h._id}
                                    type="button"
                                    onClick={() => toggleHotel(h._id)}
                                    className={cn(
                                      "px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors",
                                      selectedHotels.includes(h._id)
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border hover:border-primary/50"
                                    )}
                                  >
                                    {h.name}
                                    {h.priceFrom != null && ` · $${h.priceFrom}/night`}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          {tours.length === 0 && hotels.length === 0 && (
                            <p className="text-sm text-muted-foreground">No tours or hotels for this destination yet.</p>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {error && (
            <p className="text-destructive text-sm mt-4">{error}</p>
          )}

          <div className="flex justify-between gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep((s) => s + 1)} disabled={!canGoNext} className="rounded-xl">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleComplete} disabled={submitting} className="rounded-xl">
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating…
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Create trip
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

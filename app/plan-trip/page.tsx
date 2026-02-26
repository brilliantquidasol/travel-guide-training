"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

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
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${step >= s ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Basic info</CardTitle>
                <CardDescription>When and how you&apos;re traveling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Trip name</Label>
                  <Input
                    placeholder="e.g. Summer in Europe"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Origin city</Label>
                  <Input
                    placeholder="e.g. New York"
                    value={originCity}
                    onChange={(e) => setOriginCity(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start date</Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>End date</Label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Budget (USD)</Label>
                    <Input
                      type="number"
                      placeholder="5000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Travelers</Label>
                    <Select value={travelerCount} onValueChange={setTravelerCount}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Travel style</Label>
                  <Select value={travelStyle} onValueChange={setTravelStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
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
            <Card>
              <CardHeader>
                <CardTitle>Choose destinations</CardTitle>
                <CardDescription>From our catalog (select at least one)</CardDescription>
              </CardHeader>
              <CardContent>
                {destinationsLoading ? (
                  <p className="text-muted-foreground">Loading destinations…</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                    {destinations.map((d) => (
                      <button
                        key={d._id}
                        type="button"
                        onClick={() => toggleDestination(d._id)}
                        className={`text-left p-4 rounded-xl border-2 transition-colors ${
                          selectedDestinationIds.includes(d._id)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="font-medium">{d.name}</span>
                        <span className="text-muted-foreground text-sm block">{d.country}</span>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Tours & hotels</CardTitle>
                <CardDescription>Add suggested tours and hotels for your destinations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {catalogLoading ? (
                  <p className="text-muted-foreground">Loading suggestions…</p>
                ) : (
                  <>
                    {selectedDestinationIds.map((destId) => {
                      const dest = destinations.find((d) => d._id === destId);
                      const tours = toursByDest[destId] ?? [];
                      const hotels = hotelsByDest[destId] ?? [];
                      return (
                        <div key={destId} className="border rounded-xl p-4 space-y-4">
                          <h3 className="font-heading font-semibold text-lg">{dest?.name ?? destId}</h3>
                          {tours.length > 0 && (
                            <div>
                              <Label className="text-sm text-muted-foreground">Tours</Label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {tours.map((t) => (
                                  <button
                                    key={t._id}
                                    type="button"
                                    onClick={() => toggleTour(t._id)}
                                    className={`px-3 py-2 rounded-lg border text-sm ${
                                      selectedTours.includes(t._id)
                                        ? "border-primary bg-primary/10"
                                        : "border-border"
                                    }`}
                                  >
                                    {t.title} (${t.priceFrom})
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          {hotels.length > 0 && (
                            <div>
                              <Label className="text-sm text-muted-foreground">Hotels</Label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {hotels.map((h) => (
                                  <button
                                    key={h._id}
                                    type="button"
                                    onClick={() => toggleHotel(h._id)}
                                    className={`px-3 py-2 rounded-lg border text-sm ${
                                      selectedHotels.includes(h._id)
                                        ? "border-primary bg-primary/10"
                                        : "border-border"
                                    }`}
                                  >
                                    {h.name}
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

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep((s) => s + 1)} disabled={!canGoNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleComplete} disabled={submitting}>
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

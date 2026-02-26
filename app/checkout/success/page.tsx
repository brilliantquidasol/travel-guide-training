"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getMyBookings, getTrip, type Booking, type Trip } from "@/lib/api";
import { CheckCircle2, Loader2 } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const tripId = searchParams.get("trip_id");
  const isDemo = searchParams.get("demo") === "1";
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [bookingsRes, tripData] = await Promise.all([
          getMyBookings({ limit: 20, status: "confirmed" }),
          tripId ? getTrip(tripId) : Promise.resolve(null),
        ]);
        setBookings(bookingsRes.items);
        setTrip(tripData ?? null);
      } catch {
        setBookings([]);
        setTrip(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [tripId]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto max-w-lg px-4 pt-28 pb-12">
        <div className="flex flex-col items-center text-center mb-8">
          <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
          <h1 className="font-heading text-3xl font-bold">
            {isDemo ? "Checkout complete (demo)" : "Payment successful"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isDemo
              ? "No real payment was made. Start the API and Stripe to process real payments."
              : "Your booking has been confirmed."}
            {sessionId && !sessionId.startsWith("demo-") && (
              <span className="block text-sm mt-1">Session: {sessionId.slice(0, 20)}…</span>
            )}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="font-semibold mb-3">Confirmed bookings</h2>
              {bookings.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Your recent confirmed bookings will appear here. They may take a moment to update.
                </p>
              ) : (
                <ul className="space-y-2">
                  {bookings.slice(0, 10).map((b) => (
                    <li
                      key={b._id}
                      className="flex justify-between text-sm border-b pb-2 last:border-0"
                    >
                      <span className="capitalize">{b.productType}</span>
                      <span>
                        ${(b.price ?? 0).toLocaleString("en-US")} {b.currency}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}

        <div className="flex flex-wrap gap-3 justify-center">
          {tripId && (
            <Button asChild>
              <Link href={`/dashboard/trips/${tripId}`}>View trip</Link>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href="/dashboard/finances">View finances</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

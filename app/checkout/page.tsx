"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getTrip, createCheckoutSession, type Trip } from "@/lib/api";
import { getStoredUserId } from "@/lib/auth";
import { Loader2, CreditCard, ArrowLeft, ArrowRight } from "lucide-react";

function formatDate(s: string | undefined) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get("trip_id") ?? searchParams.get("tripId") ?? "";
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tripId) {
      setLoading(false);
      return;
    }
    getTrip(tripId)
      .then(setTrip)
      .catch(() => setTrip(null))
      .finally(() => setLoading(false));
  }, [tripId]);

  const handleCheckout = async () => {
    if (!tripId || !trip) return;
    setError(null);
    setRedirecting(true);
    try {
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
      const { url } = await createCheckoutSession({
        tripId,
        successUrl: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&trip_id=${tripId}`,
        cancelUrl: `${baseUrl}/checkout/cancel?trip_id=${tripId}`,
      });
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to start checkout");
      setRedirecting(false);
    }
  };

  if (!tripId) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto max-w-lg px-4 pt-28 pb-12">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No trip selected.</p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/trips">Choose a trip</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto max-w-lg px-4 pt-28 pb-12 flex justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto max-w-lg px-4 pt-28 pb-12">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Trip not found or you don’t have access.</p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/trips">Back to My Trips</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const bookableCount = (trip.itinerary ?? []).filter(
    (it) => it.type === "tour" || it.type === "hotel"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto max-w-lg px-4 pt-28 pb-12">
        <Link
          href={`/dashboard/trips/${tripId}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to trip
        </Link>
        <h1 className="font-heading text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground mb-8">
          Review your trip and complete payment securely with Stripe.
        </p>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{trip.title}</CardTitle>
            <CardDescription>
              {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You’re booking <strong>{bookableCount}</strong> item(s) from this trip (tours and hotels).
              Prices are calculated from our catalog and shown on the next screen.
            </p>
            <p className="text-sm text-muted-foreground">
              You will be redirected to Stripe Checkout to enter payment details. No card data is stored on our servers.
            </p>
          </CardContent>
        </Card>

        {error && (
          <p className="text-destructive text-sm mb-4">{error}</p>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <Button variant="outline" asChild className="rounded-xl sm:rounded-full">
            <Link href={`/dashboard/trips/${tripId}`}>Cancel</Link>
          </Button>
          <Button
            onClick={handleCheckout}
            disabled={redirecting || bookableCount === 0}
            size="lg"
            className="flex-1 rounded-full bg-primary px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90 transition-all"
          >
            {redirecting ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Redirecting…
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to payment
                <ArrowRight className="h-5 w-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

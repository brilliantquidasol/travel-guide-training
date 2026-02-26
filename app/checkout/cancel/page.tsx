"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { XCircle } from "lucide-react";

function CancelContent() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get("trip_id");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto max-w-lg px-4 pt-28 pb-12">
        <div className="flex flex-col items-center text-center mb-8">
          <XCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="font-heading text-3xl font-bold">Payment canceled</h1>
          <p className="text-muted-foreground mt-2">
            You left the checkout. No charge was made. You can try again anytime.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {tripId && (
            <Button asChild>
              <Link href={`/checkout?trip_id=${tripId}`}>Try again</Link>
            </Button>
          )}
          {tripId && (
            <Button variant="outline" asChild>
              <Link href={`/dashboard/trips/${tripId}`}>View trip</Link>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href="/dashboard/trips">My trips</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CheckoutCancelPage() {
  return (
    <Suspense fallback={null}>
      <CancelContent />
    </Suspense>
  );
}

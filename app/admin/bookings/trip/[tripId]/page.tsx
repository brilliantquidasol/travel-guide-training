"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAdminTrip } from "@/lib/admin-api";
import type { Trip } from "@/lib/api";
import { ArrowLeft, Loader2 } from "lucide-react";

function formatDate(s: string | undefined) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AdminTripDetailPage() {
  const params = useParams();
  const tripId = params.tripId as string;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminTrip(tripId)
      .then(setTrip)
      .catch(() => setTrip(null))
      .finally(() => setLoading(false));
  }, [tripId]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">Trip not found.</p>
        <Button asChild variant="outline">
          <Link href="/admin/bookings">Back to list</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/bookings" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Bookings & Trips
      </Link>
      <h1 className="font-heading text-3xl font-bold tracking-tight">{trip.title}</h1>
      <Card>
        <CardContent className="pt-6 space-y-2">
          <p><span className="text-muted-foreground">Status:</span> <Badge variant="outline">{trip.status}</Badge></p>
          <p><span className="text-muted-foreground">Dates:</span> {formatDate(trip.startDate)} – {formatDate(trip.endDate)}</p>
          {trip.originCity && <p><span className="text-muted-foreground">Origin:</span> {trip.originCity}</p>}
          {trip.budget != null && <p><span className="text-muted-foreground">Budget:</span> ${trip.budget}</p>}
          <p><span className="text-muted-foreground">User:</span> {typeof trip.user === "object" ? trip.user?.email : trip.user}</p>
          <p><span className="text-muted-foreground">Itinerary items:</span> {trip.itinerary?.length ?? 0}</p>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">Read-only view. Updates can be added later.</p>
    </div>
  );
}

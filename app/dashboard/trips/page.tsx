"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMyTrips, type Trip } from "@/lib/api";
import { Loader2, MapPin, Plus } from "lucide-react";

function formatDate(s: string | undefined) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function statusVariant(s: Trip["status"]): "default" | "secondary" | "destructive" | "outline" {
  switch (s) {
    case "booked":
      return "default";
    case "draft":
      return "secondary";
    case "completed":
      return "outline";
    case "canceled":
      return "destructive";
    default:
      return "outline";
  }
}

export default function DashboardTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyTrips({ limit: 50 })
      .then((r) => setTrips(r.items))
      .catch(() => setTrips([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">My Trips</h1>
          <p className="text-muted-foreground mt-1">View and edit your trip itineraries</p>
        </div>
        <Button asChild>
          <Link href="/plan-trip">
            <Plus className="w-4 h-4 mr-2" />
            Plan new trip
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : trips.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>You don’t have any trips yet.</p>
            <Button className="mt-4" asChild>
              <Link href="/plan-trip">Plan your first trip</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {trips.map((t) => (
            <Link key={t._id} href={`/dashboard/trips/${t._id}`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading font-semibold text-lg">{t.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDate(t.startDate)} – {formatDate(t.endDate)}
                      {t.originCity && ` · From ${t.originCity}`}
                    </p>
                    <Badge variant={statusVariant(t.status)} className="mt-2 capitalize">
                      {t.status}
                    </Badge>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {t.itinerary?.length ?? 0} items
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

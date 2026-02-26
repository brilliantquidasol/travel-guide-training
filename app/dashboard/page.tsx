"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMyTrips, getMyBookings, type Trip, type Booking } from "@/lib/api";
import { MapPin, Wallet, Loader2, ArrowRight } from "lucide-react";

function formatDate(s: string | undefined) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function DashboardOverviewPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getMyTrips({ limit: 5 }).then((r) => setTrips(r.items)),
      getMyBookings({ limit: 5 }).then((r) => setBookings(r.items)),
    ]).finally(() => setLoading(false));
  }, []);

  const upcomingTrips = trips.filter((t) => t.status === "draft" || t.status === "booked").slice(0, 3);
  const totalSpent = bookings.filter((b) => b.status === "confirmed").reduce((sum, b) => sum + (b.price ?? 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1">Your travel dashboard at a glance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming trips</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{upcomingTrips.length}</p>
            <p className="text-xs text-muted-foreground">Draft or booked</p>
            <Button variant="link" className="mt-2 h-auto p-0" asChild>
              <Link href="/dashboard/trips">
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total spent</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalSpent.toLocaleString("en-US")}</p>
            <p className="text-xs text-muted-foreground">Confirmed bookings</p>
            <Button variant="link" className="mt-2 h-auto p-0" asChild>
              <Link href="/dashboard/finances">
                View finances <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{bookings.length}</p>
            <p className="text-xs text-muted-foreground">Recent activity</p>
            <Button variant="link" className="mt-2 h-auto p-0" asChild>
              <Link href="/dashboard/finances">
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent trips</CardTitle>
          <CardDescription>Your latest trip plans</CardDescription>
        </CardHeader>
        <CardContent>
          {trips.length === 0 ? (
            <p className="text-muted-foreground py-4">No trips yet. Plan your first trip to get started.</p>
          ) : (
            <ul className="space-y-3">
              {trips.slice(0, 5).map((t) => (
                <li key={t._id}>
                  <Link
                    href={`/dashboard/trips/${t._id}`}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{t.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(t.startDate)} – {formatDate(t.endDate)} · {t.status}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Button className="mt-4" asChild>
            <Link href="/plan-trip">Plan new trip</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

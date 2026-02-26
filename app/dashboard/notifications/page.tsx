"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyTrips, getMyBookings, type Trip, type Booking } from "@/lib/api";
import { Bell, MapPin, Receipt, Loader2 } from "lucide-react";

/** Unified notification event for display (placeholder type) */
export type NotificationEvent = {
  id: string;
  type: "booking_confirmed" | "booking_pending" | "trip_updated" | "trip_created";
  title: string;
  description: string;
  createdAt: string;
  link?: string;
};

function formatDate(s: string) {
  return new Date(s).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildEventsFromData(trips: Trip[], bookings: Booking[]): NotificationEvent[] {
  const events: NotificationEvent[] = [];
  trips.forEach((t) => {
    events.push({
      id: `trip-${t._id}`,
      type: "trip_created",
      title: "Trip created",
      description: `"${t.title}" was added to your trips.`,
      createdAt: (t as Trip & { createdAt?: string }).createdAt ?? t.startDate,
      link: `/dashboard/trips/${t._id}`,
    });
  });
  bookings.forEach((b) => {
    const tripTitle = typeof b.trip === "object" && b.trip?.title ? b.trip.title : "Trip";
    events.push({
      id: `booking-${b._id}`,
      type: b.status === "confirmed" ? "booking_confirmed" : "booking_pending",
      title: b.status === "confirmed" ? "Booking confirmed" : "Payment pending",
      description: `${b.productType} for ${tripTitle} — $${(b.price ?? 0).toLocaleString("en-US")} ${b.currency}`,
      createdAt: (b as Booking & { createdAt?: string }).createdAt ?? new Date().toISOString(),
      link: "/dashboard/finances",
    });
  });
  events.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return events.slice(0, 30);
}

export default function DashboardNotificationsPage() {
  const [events, setEvents] = useState<NotificationEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getMyTrips({ limit: 20 }).then((r) => r.items),
      getMyBookings({ limit: 20 }).then((r) => r.items),
    ])
      .then(([trips, bookings]) => setEvents(buildEventsFromData(trips, bookings)))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

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
        <h1 className="font-heading text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground mt-1">Recent activity and updates</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent events
          </CardTitle>
          <CardDescription>Bookings and trip changes (from your data)</CardDescription>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mb-4 opacity-50" />
              <p>No recent notifications. When you book or update trips, they’ll appear here.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {events.map((ev) => (
                <li key={ev.id}>
                  <a
                    href={ev.link}
                    className="flex gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    {ev.type.startsWith("booking") ? (
                      <Receipt className="h-5 w-5 shrink-0 text-muted-foreground" />
                    ) : (
                      <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{ev.title}</p>
                      <p className="text-sm text-muted-foreground">{ev.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(ev.createdAt)}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

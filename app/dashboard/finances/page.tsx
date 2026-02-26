"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyBookings, type Booking } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Loader2, Receipt } from "lucide-react";

function formatDate(s: string | undefined) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function statusVariant(s: Booking["status"]): "default" | "secondary" | "destructive" | "outline" {
  switch (s) {
    case "confirmed":
      return "default";
    case "pending":
      return "secondary";
    case "canceled":
      return "destructive";
    default:
      return "outline";
  }
}

export default function DashboardFinancesPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyBookings({ limit: 50 })
      .then((r) => setBookings(r.items))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const totalConfirmed = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + (b.price ?? 0), 0);
  const totalPending = bookings
    .filter((b) => b.status === "pending")
    .reduce((sum, b) => sum + (b.price ?? 0), 0);

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
        <h1 className="font-heading text-3xl font-bold tracking-tight">Finances</h1>
        <p className="text-muted-foreground mt-1">Your bookings and transaction history</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total paid</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalConfirmed.toLocaleString("en-US")}</p>
            <p className="text-xs text-muted-foreground">Confirmed bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalPending.toLocaleString("en-US")}</p>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>All your bookings and payments</CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <Receipt className="h-12 w-12 mb-4 opacity-50" />
              <p>No bookings yet. Book a tour or hotel from a trip to see transactions here.</p>
              <Link href="/dashboard/trips" className="mt-4 text-sm font-medium text-primary hover:underline">
                Go to My Trips
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-4"
                >
                  <div className="flex items-center gap-3">
                    <Receipt className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium capitalize">{b.productType}</p>
                      <p className="text-sm text-muted-foreground">
                        {typeof b.trip === "object" && b.trip?.title ? b.trip.title : "Trip"} ·{" "}
                        {b.createdAt ? formatDate(b.createdAt) : "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      ${(b.price ?? 0).toLocaleString("en-US")} {b.currency}
                    </span>
                    <Badge variant={statusVariant(b.status)}>{b.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

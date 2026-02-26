"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAdminBookings } from "@/lib/admin-api";
import type { Booking } from "@/lib/api";
import { ArrowLeft, Loader2 } from "lucide-react";

function formatDate(s: string | undefined) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AdminBookingDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminBookings({ limit: 500 })
      .then((r) => r.items.find((b) => b._id === id) ?? null)
      .then(setBooking)
      .catch(() => setBooking(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">Booking not found.</p>
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
      <h1 className="font-heading text-3xl font-bold tracking-tight">Booking detail</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="capitalize">{booking.productType}</span>
            <Badge variant={booking.status === "confirmed" ? "default" : booking.status === "pending" ? "secondary" : "destructive"}>
              {booking.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><span className="text-muted-foreground">ID:</span> {booking._id}</p>
          <p><span className="text-muted-foreground">Product ID:</span> {booking.productId}</p>
          <p><span className="text-muted-foreground">Amount:</span> ${(booking.price ?? 0).toLocaleString("en-US")} {booking.currency}</p>
          <p><span className="text-muted-foreground">Trip:</span> {typeof booking.trip === "object" ? booking.trip?.title : booking.trip}</p>
          {booking.paymentId && <p><span className="text-muted-foreground">Payment ID:</span> {booking.paymentId}</p>}
          {booking.createdAt && <p><span className="text-muted-foreground">Created:</span> {formatDate(booking.createdAt)}</p>}
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">Updates (e.g. status change) can be added here later.</p>
    </div>
  );
}

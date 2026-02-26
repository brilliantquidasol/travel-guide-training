"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminBookings, getAdminTrips } from "@/lib/admin-api";
import type { Booking, Trip } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

type Tab = "bookings" | "trips";

function formatDate(s: string | undefined) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AdminBookingsPage() {
  const [tab, setTab] = useState<Tab>("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    if (tab === "bookings") {
      getAdminBookings({ page, limit: 20, status: statusFilter || undefined })
        .then((r) => setBookings(r.items))
        .catch(() => setBookings([]))
        .finally(() => setLoading(false));
    } else {
      getAdminTrips({ page, limit: 20, status: statusFilter || undefined })
        .then((r) => setTrips(r.items))
        .catch(() => setTrips([]))
        .finally(() => setLoading(false));
    }
  }, [tab, page, statusFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Bookings & Trips</h1>
        <p className="text-muted-foreground mt-1">View all bookings and trips</p>
      </div>

      <div className="flex gap-2 border-b">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${tab === "bookings" ? "border-primary text-primary" : "border-transparent"}`}
          onClick={() => setTab("bookings")}
        >
          Bookings
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${tab === "trips" ? "border-primary text-primary" : "border-transparent"}`}
          onClick={() => setTab("trips")}
        >
          Trips
        </button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <Input
              placeholder="Filter by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="max-w-[180px]"
            />
          </div>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : tab === "bookings" ? (
            bookings.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center">No bookings found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Trip</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((b) => (
                    <TableRow key={b._id}>
                      <TableCell className="capitalize">{b.productType}</TableCell>
                      <TableCell>
                        {typeof b.trip === "object" ? b.trip?.title : b.trip}
                      </TableCell>
                      <TableCell>
                        ${(b.price ?? 0).toLocaleString("en-US")} {b.currency}
                      </TableCell>
                      <TableCell>
                        <Badge variant={b.status === "confirmed" ? "default" : b.status === "pending" ? "secondary" : "destructive"}>
                          {b.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/bookings/${b._id}`} className="text-sm text-primary hover:underline">
                          View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
          ) : trips.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">No trips found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trips.map((t) => (
                  <TableRow key={t._id}>
                    <TableCell className="font-medium">{t.title}</TableCell>
                    <TableCell>
                      {formatDate(t.startDate)} – {formatDate(t.endDate)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/bookings/trip/${t._id}`} className="text-sm text-primary hover:underline">
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

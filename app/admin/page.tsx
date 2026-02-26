"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminTrips, getAdminBookings, getAdminUsers } from "@/lib/admin-api";
import { getDestinations, getTours, getHotels } from "@/lib/api";
import { MapPin, Compass, Building, CreditCard, Users, Map } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<{
    trips: number;
    bookings: number;
    users: number;
    destinations: number;
    tours: number;
    hotels: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAdminTrips({ limit: 1 }).then((r) => r.total),
      getAdminBookings({ limit: 1 }).then((r) => r.total),
      getAdminUsers({ limit: 1 }).then((r) => r.total),
      getDestinations({ limit: 1 }).then((r) => r.total),
      getTours({ limit: 1 }).then((r) => r.total),
      getHotels({ limit: 1 }).then((r) => r.total),
    ])
      .then(([trips, bookings, users, destinations, tours, hotels]) =>
        setStats({ trips, bookings, users, destinations, tours, hotels })
      )
      .catch(() => setStats(null))
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
        <h1 className="font-heading text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">High-level stats and quick links</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/catalog/destinations">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Destinations</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats?.destinations ?? "—"}</p>
              <CardDescription>Catalog</CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/catalog/tours">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tours</CardTitle>
              <Compass className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats?.tours ?? "—"}</p>
              <CardDescription>Catalog</CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/catalog/hotels">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Hotels</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats?.hotels ?? "—"}</p>
              <CardDescription>Catalog</CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/bookings">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Bookings</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats?.bookings ?? "—"}</p>
              <CardDescription>All bookings</CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/bookings">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Trips</CardTitle>
              <Map className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats?.trips ?? "—"}</p>
              <CardDescription>All trips</CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/users">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats?.users ?? "—"}</p>
              <CardDescription>Users & roles</CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Compass, Building, DoorOpen } from "lucide-react";

const links = [
  { href: "/admin/catalog/destinations", label: "Destinations", icon: MapPin },
  { href: "/admin/catalog/tours", label: "Tours", icon: Compass },
  { href: "/admin/catalog/hotels", label: "Hotels", icon: Building },
  { href: "/admin/catalog/rooms", label: "Rooms", icon: DoorOpen },
];

export default function AdminCatalogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Catalog</h1>
        <p className="text-muted-foreground mt-1">Manage destinations, tours, hotels, and rooms</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 pt-6">
                <Icon className="h-8 w-8 text-muted-foreground" />
                <span className="font-medium">{label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

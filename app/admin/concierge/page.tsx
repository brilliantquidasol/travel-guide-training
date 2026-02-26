"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones } from "lucide-react";

export default function AdminConciergePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Concierge & Support</h1>
        <p className="text-muted-foreground mt-1">Manage concierge and support requests</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            Concierge & Support
          </CardTitle>
          <CardDescription>Support tickets and concierge requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <Headphones className="h-12 w-12 mb-4 opacity-50" />
            <p>Concierge and support management coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

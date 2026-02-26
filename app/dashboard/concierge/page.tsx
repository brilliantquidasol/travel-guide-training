"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";

export default function DashboardConciergePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Concierge</h1>
        <p className="text-muted-foreground mt-1">Personalized travel assistance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            Concierge service
          </CardTitle>
          <CardDescription>Get help with bookings, changes, and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <Headphones className="h-12 w-12 mb-4 opacity-50" />
            <p>Concierge and AI-assisted planning will be available here soon.</p>
            <Button variant="outline" className="mt-4" disabled>
              Contact concierge (coming soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

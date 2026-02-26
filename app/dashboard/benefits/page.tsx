"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift } from "lucide-react";

export default function DashboardBenefitsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Benefits</h1>
        <p className="text-muted-foreground mt-1">Your member benefits and perks</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Member benefits
          </CardTitle>
          <CardDescription>Exclusive perks for registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <Gift className="h-12 w-12 mb-4 opacity-50" />
            <p>Benefits program coming soon. You’ll see eligible perks and tier rewards here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

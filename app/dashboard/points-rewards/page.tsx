"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

export default function DashboardPointsRewardsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Points & Rewards</h1>
        <p className="text-muted-foreground mt-1">Earn and redeem points on travel</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Your points
          </CardTitle>
          <CardDescription>Loyalty program and redemption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <Award className="h-12 w-12 mb-4 opacity-50" />
            <p>Points and rewards program coming soon. Your balance and history will appear here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

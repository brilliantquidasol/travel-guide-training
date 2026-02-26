"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { ShieldX } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto max-w-md px-4 pt-28 pb-12 text-center">
        <Card>
          <CardContent className="pt-8 pb-8">
            <ShieldX className="h-16 w-16 mx-auto text-destructive mb-4" />
            <h1 className="font-heading text-2xl font-bold">Access denied</h1>
            <p className="text-muted-foreground mt-2">
              You don’t have permission to view this page. Admin access is required.
            </p>
            <Button asChild className="mt-6">
              <Link href="/">Go home</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

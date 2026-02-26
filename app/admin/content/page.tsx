"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function AdminContentPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Homepage & Content</h1>
        <p className="text-muted-foreground mt-1">Manage homepage and marketing content</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Content management
          </CardTitle>
          <CardDescription>Homepage hero, sections, and static content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <FileText className="h-12 w-12 mb-4 opacity-50" />
            <p>Content management coming soon. You’ll be able to edit homepage and marketing copy here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

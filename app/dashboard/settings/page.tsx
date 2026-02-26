"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Lock, Loader2 } from "lucide-react";

/** Placeholder profile type (no backend yet) */
export type ProfileForm = {
  displayName: string;
  email: string;
};

export default function DashboardSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<ProfileForm>({
    displayName: "Traveler",
    email: "you@example.com",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      // Placeholder: in production, call API to update profile
      await new Promise((r) => setTimeout(r, 500));
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and security</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile
          </CardTitle>
          <CardDescription>Your public profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-lg">TU</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Profile photo</p>
              <p className="text-xs text-muted-foreground">Avatar upload coming soon. Placeholder shown.</p>
              <Button variant="outline" size="sm" className="mt-2" disabled>
                Upload avatar (placeholder)
              </Button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
              <Label htmlFor="displayName">Display name</Label>
              <Input
                id="displayName"
                value={profile.displayName}
                onChange={(e) => setProfile((p) => ({ ...p, displayName: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save profile
            </Button>
            {saved && <span className="ml-2 text-sm text-muted-foreground">Saved.</span>}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>Password and security options</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            To change your password, use the link below. You will be sent to the auth provider’s flow.
          </p>
          <Button variant="outline" asChild>
            <Link href="#" onClick={(e) => e.preventDefault()}>
              Change password (placeholder link)
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

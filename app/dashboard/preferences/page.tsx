"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

/** Placeholder type for user preferences (no backend yet) */
export type UserPreferences = {
  travelStyle: string;
  preferredAirlines: string;
  preferredHotels: string;
  dietaryNeeds: string;
  accessibilityNeeds: string;
  newsletter: boolean;
};

const TRAVEL_STYLES = ["Leisure", "Adventure", "Culture", "Beach", "City", "Nature", "Solo", "Family"];

export default function DashboardPreferencesPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState<UserPreferences>({
    travelStyle: "",
    preferredAirlines: "",
    preferredHotels: "",
    dietaryNeeds: "",
    accessibilityNeeds: "",
    newsletter: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      // Placeholder: in production, call API to save preferences
      await new Promise((r) => setTimeout(r, 600));
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Preferences</h1>
        <p className="text-muted-foreground mt-1">Tell us how you like to travel so we can personalize your experience</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Travel style & interests</CardTitle>
            <CardDescription>Used to tailor recommendations and search results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Travel style</Label>
              <Select value={prefs.travelStyle || undefined} onValueChange={(v) => setPrefs((p) => ({ ...p, travelStyle: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {TRAVEL_STYLES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Preferred brands</CardTitle>
            <CardDescription>Optional: preferred airlines and hotel chains</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Preferred airlines</Label>
              <Input
                placeholder="e.g. Delta, United, Emirates"
                value={prefs.preferredAirlines}
                onChange={(e) => setPrefs((p) => ({ ...p, preferredAirlines: e.target.value }))}
              />
            </div>
            <div>
              <Label>Preferred hotels</Label>
              <Input
                placeholder="e.g. Marriott, Hilton"
                value={prefs.preferredHotels}
                onChange={(e) => setPrefs((p) => ({ ...p, preferredHotels: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Special requirements</CardTitle>
            <CardDescription>Dietary and accessibility needs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Dietary needs</Label>
              <Textarea
                placeholder="e.g. Vegetarian, gluten-free, allergies"
                value={prefs.dietaryNeeds}
                onChange={(e) => setPrefs((p) => ({ ...p, dietaryNeeds: e.target.value }))}
                rows={2}
              />
            </div>
            <div>
              <Label>Accessibility needs</Label>
              <Textarea
                placeholder="e.g. Wheelchair access, mobility assistance"
                value={prefs.accessibilityNeeds}
                onChange={(e) => setPrefs((p) => ({ ...p, accessibilityNeeds: e.target.value }))}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Communications</CardTitle>
            <CardDescription>How you want to hear from us</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newsletter"
                checked={prefs.newsletter}
                onCheckedChange={(c) => setPrefs((p) => ({ ...p, newsletter: c === true }))}
              />
              <Label htmlFor="newsletter" className="font-normal">Send me travel tips and offers by email</Label>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Save preferences
          </Button>
          {saved && <span className="text-sm text-muted-foreground">Saved.</span>}
        </div>
      </form>
    </div>
  );
}

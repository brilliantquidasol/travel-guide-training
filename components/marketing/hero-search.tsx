"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, MapPin, Building2, Route, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "destinations" | "tours" | "hotels" | "plan";

export function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("destinations");
  const [query, setQuery] = useState("");

  function handleSearch() {
    if (activeTab === "destinations") {
      router.push(`/destinations?continent=${encodeURIComponent(query || "")}`);
    } else if (activeTab === "tours") {
      router.push(`/tours?q=${encodeURIComponent(query)}`);
    } else if (activeTab === "hotels") {
      router.push(`/hotels?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/plan-trip");
    }
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-2xl border-0 overflow-hidden animate-slide-up">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)} className="w-full">
        <TabsList className="w-full h-12 rounded-none border-b border-border bg-muted/50 grid grid-cols-4">
          <TabsTrigger value="destinations" className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <MapPin className="w-4 h-4 mr-2 hidden sm:inline" />
            Destinations
          </TabsTrigger>
          <TabsTrigger value="tours" className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Route className="w-4 h-4 mr-2 hidden sm:inline" />
            Tours
          </TabsTrigger>
          <TabsTrigger value="hotels" className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Building2 className="w-4 h-4 mr-2 hidden sm:inline" />
            Hotels
          </TabsTrigger>
          <TabsTrigger value="plan" className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <ClipboardList className="w-4 h-4 mr-2 hidden sm:inline" />
            Plan Trip
          </TabsTrigger>
        </TabsList>
        <CardContent className="p-4 md:p-6">
          <TabsContent value="destinations" className="mt-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
                <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
                <Input
                  placeholder="Continent or country"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-0 bg-transparent focus-visible:ring-0"
                />
              </div>
              <Button size="lg" className="rounded-xl bg-primary hover:bg-primary/90 shrink-0" onClick={handleSearch}>
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="tours" className="mt-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
                <Route className="w-5 h-5 text-muted-foreground shrink-0" />
                <Input
                  placeholder="Destination or tour name"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-0 bg-transparent focus-visible:ring-0"
                />
              </div>
              <Button size="lg" className="rounded-xl bg-primary hover:bg-primary/90 shrink-0" onClick={handleSearch}>
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="hotels" className="mt-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
                <Building2 className="w-5 h-5 text-muted-foreground shrink-0" />
                <Input
                  placeholder="City or hotel name"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-0 bg-transparent focus-visible:ring-0"
                />
              </div>
              <Button size="lg" className="rounded-xl bg-primary hover:bg-primary/90 shrink-0" onClick={handleSearch}>
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="plan" className="mt-0">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <p className="flex-1 text-muted-foreground text-sm">
                Build your itinerary, set your budget, and organize your trip in one place.
              </p>
              <Button size="lg" className="rounded-xl bg-primary hover:bg-primary/90 shrink-0" onClick={handleSearch}>
                Open trip planner
              </Button>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}

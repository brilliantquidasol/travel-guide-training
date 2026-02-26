"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Headphones,
  MessageCircle,
  Plane,
  Calendar,
  MapPin,
  Utensils,
  Car,
  Sparkles,
  Clock,
  Mail,
} from "lucide-react";

const QUICK_ACTIONS = [
  {
    title: "Plan or change a trip",
    description: "Add destinations, tours, or hotels to an existing trip or start a new one.",
    icon: Plane,
  },
  {
    title: "Bookings & reservations",
    description: "Modify dates, upgrade rooms, or get help with cancellations and refunds.",
    icon: Calendar,
  },
  {
    title: "Recommendations",
    description: "Restaurants, activities, and local tips for your destinations.",
    icon: MapPin,
  },
  {
    title: "Dining & experiences",
    description: "Reserve tables, private tours, or special experiences.",
    icon: Utensils,
  },
  {
    title: "Transfers & transport",
    description: "Airport pickups, car hire, or inter-city travel arrangements.",
    icon: Car,
  },
];

const CONVERSATION_STARTERS = [
  "I need help choosing tours for my Tokyo trip.",
  "Can you suggest hotels in Santorini with sea views?",
  "I want to add a day trip to my existing itinerary.",
  "What’s the best way to get from the airport to my hotel in Paris?",
  "I’d like restaurant recommendations for Kyoto.",
  "Help me rebook a tour I had to cancel.",
];

export default function DashboardConciergePage() {
  return (
    <div className="space-y-10">
      <div className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Headphones className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="font-heading text-3xl font-bold tracking-tight">Concierge</h1>
            <p className="text-muted-foreground">
              Your personal travel assistant. Get help with trips, bookings, and recommendations—via chat or email.
            </p>
          </div>
        </div>
      </div>

      <section>
        <h2 className="font-heading mb-4 text-xl font-semibold">How we can help</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl text-sm">
          Our concierge team and AI assistant are here to support your journey from planning to post-trip.
        </p>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Card key={action.title} className="border-0 shadow-md">
                <CardContent className="flex gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{action.title}</p>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-heading mb-4 text-xl font-semibold">Start a conversation</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl text-sm">
          Try one of these prompts, or ask anything about your trips and bookings.
        </p>
        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {CONVERSATION_STARTERS.map((starter, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/50"
                  >
                    <MessageCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">{starter}</span>
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <div className="mt-4">
          <Button size="lg" className="rounded-xl" disabled>
            <Sparkles className="h-5 w-5 mr-2" />
            Open concierge chat (coming soon)
          </Button>
        </div>
      </section>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold">Availability</p>
              <p className="text-sm text-muted-foreground">
                Concierge chat: 9am–9pm your time (when available). Email support: 24/7, we reply within 24 hours.
              </p>
            </div>
          </div>
          <Button variant="outline" className="shrink-0 rounded-xl" disabled>
            <Mail className="h-4 w-4 mr-2" />
            Email concierge (coming soon)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

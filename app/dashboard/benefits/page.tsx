"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Gift,
  Sparkles,
  Plane,
  Coffee,
  ShieldCheck,
  Percent,
  Star,
  Ticket,
  Luggage,
  Headphones,
} from "lucide-react";

const TIERS = [
  {
    name: "Explorer",
    level: 1,
    badge: "Default",
    description: "Start your journey with essential perks from day one.",
    perks: [
      "5% off select tours and experiences",
      "Member-only travel tips and guides",
      "Early access to seasonal promotions",
      "Priority email support",
    ],
    icon: Star,
    color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  {
    name: "Adventurer",
    level: 2,
    badge: "After 3 trips or $2,500 spent",
    description: "Unlock more rewards as you explore the world.",
    perks: [
      "10% off tours and 5% off hotel add-ons",
      "Complimentary airport lounge pass (1 per year)",
      "Free cancellation up to 48 hours on eligible bookings",
      "Dedicated concierge chat",
    ],
    icon: Plane,
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Voyager",
    level: 3,
    badge: "After 8 trips or $8,000 spent",
    description: "Premium benefits for frequent travelers.",
    perks: [
      "15% off tours, 10% off hotels",
      "Complimentary room upgrade when available",
      "2 lounge passes per year + fast-track security",
      "Birthday reward: $50 travel credit",
    ],
    icon: Sparkles,
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    name: "Elite",
    level: 4,
    badge: "After 15 trips or $20,000 spent",
    description: "Our highest tier with exclusive access.",
    perks: [
      "20% off all tours and 15% off hotels",
      "Unlimited lounge access (where available)",
      "Complimentary private transfer on select destinations",
      "Annual gift: curated experience or $200 credit",
    ],
    icon: Gift,
    color: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
  },
];

const REDEMPTION_ITEMS = [
  { title: "$25 travel credit", points: 2_500, icon: Percent },
  { title: "$50 travel credit", points: 4_500, icon: Percent },
  { title: "Lounge pass (1 day)", points: 3_000, icon: Coffee },
  { title: "Tour discount 20% (one use)", points: 5_000, icon: Ticket },
  { title: "Hotel upgrade (when available)", points: 6_000, icon: Luggage },
  { title: "Concierge call (30 min)", points: 1_500, icon: Headphones },
];

export default function DashboardBenefitsPage() {
  return (
    <div className="space-y-10">
      <div className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Gift className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="font-heading text-3xl font-bold tracking-tight">Benefits Program</h1>
            <p className="text-muted-foreground">
              Member tiers, perks, and ways to redeem your points. Earn more as you travel.
            </p>
          </div>
        </div>
      </div>

      <section>
        <h2 className="font-heading mb-4 text-xl font-semibold">Member Tiers</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl text-sm">
          Progress through tiers by completing trips or reaching spend thresholds. Benefits stack as you level up.
        </p>
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {TIERS.map((tier) => {
            const Icon = tier.icon;
            return (
              <Card key={tier.name} className="overflow-hidden border-0 shadow-md">
                <CardHeader className={`${tier.color} pb-3`}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon className="h-5 w-5" />
                      {tier.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Level {tier.level}
                    </Badge>
                  </div>
                  <CardDescription className="text-inherit opacity-90">
                    {tier.badge}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4 text-sm text-muted-foreground">{tier.description}</p>
                  <ul className="space-y-2">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-heading mb-4 text-xl font-semibold">Points Redemption</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl text-sm">
          Use your points for travel credits, lounge access, upgrades, and more. Points are earned on every completed booking.
        </p>
        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            <div className="grid divide-y divide-border sm:grid-cols-2 lg:grid-cols-3 sm:divide-y-0 sm:divide-x">
              {REDEMPTION_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.points.toLocaleString()} points
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:text-left">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold">Earn points on every booking</p>
            <p className="text-sm text-muted-foreground">
              Tours and hotels both earn points. The more you travel, the more you save—and the higher your tier.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

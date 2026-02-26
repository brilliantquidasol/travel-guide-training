"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  TrendingUp,
  ShoppingBag,
  Plane,
  Gift,
  Zap,
  ArrowUpRight,
  Coins,
  Calendar,
} from "lucide-react";

const EARN_RULES = [
  { activity: "Tours & experiences", rate: "1 point per $1 spent", icon: Plane },
  { activity: "Hotel stays", rate: "1 point per $1 spent", icon: ShoppingBag },
  { activity: "First booking bonus", rate: "500 points one-time", icon: Zap },
  { activity: "Birthday month", rate: "100 points (Voyager+)", icon: Gift },
];

const REDEEM_OPTIONS = [
  { name: "Travel credit", points: "2,500+", detail: "$25 per 2,500 points" },
  { name: "Lounge access", points: "3,000", detail: "Single-day pass" },
  { name: "Tour discount", points: "5,000", detail: "20% off one tour" },
  { name: "Hotel upgrade", points: "6,000", detail: "When available" },
];

const DEMO_ACTIVITY = [
  { type: "Earned", description: "Tokyo Highlights Tour", points: 240, date: "Feb 24, 2026" },
  { type: "Earned", description: "Shibuya Central Hotel", points: 420, date: "Feb 22, 2026" },
  { type: "Redeemed", description: "$25 travel credit", points: -2500, date: "Feb 10, 2026" },
  { type: "Earned", description: "First booking bonus", points: 500, date: "Jan 15, 2026" },
];

const DEMO_BALANCE = 3660;
const DEMO_NEXT_REWARD = 2500;
const PROGRESS_PCT = Math.min(100, (DEMO_BALANCE / DEMO_NEXT_REWARD) * 100);

export default function DashboardPointsRewardsPage() {
  return (
    <div className="space-y-10">
      <div className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Award className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="font-heading text-3xl font-bold tracking-tight">Points & Rewards</h1>
            <p className="text-muted-foreground">
              Earn points on every booking and redeem them for travel credits, lounge access, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Balance & next reward */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Coins className="h-5 w-5 text-primary" />
              Your points balance
            </CardTitle>
            <CardDescription>Available to redeem anytime</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold tracking-tight">{DEMO_BALANCE.toLocaleString()}</p>
            <p className="mt-1 text-sm text-muted-foreground">points</p>
            <div className="mt-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress to $25 credit</span>
                <span className="font-medium">
                  {DEMO_BALANCE >= DEMO_NEXT_REWARD
                    ? "Ready to redeem"
                    : `${DEMO_NEXT_REWARD - DEMO_BALANCE} to go`}
                </span>
              </div>
              <Progress value={PROGRESS_PCT} className="mt-2 h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              How to earn
            </CardTitle>
            <CardDescription>Points are added after completed trips</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {EARN_RULES.map((rule) => {
                const Icon = rule.icon;
                return (
                  <li key={rule.activity} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium">{rule.activity}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{rule.rate}</span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Redemption options */}
      <section>
        <h2 className="font-heading mb-4 text-xl font-semibold">Redeem your points</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl text-sm">
          Use points for travel credits, lounge passes, discounts, and upgrades. Redemptions are applied at checkout.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REDEEM_OPTIONS.map((opt) => (
            <Card key={opt.name} className="border-0 shadow-md transition-shadow hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{opt.name}</p>
                    <p className="text-2xl font-bold text-primary">{opt.points}</p>
                    <p className="text-xs text-muted-foreground">{opt.detail}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section>
        <h2 className="font-heading mb-4 text-xl font-semibold">Recent activity</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl text-sm">
          Your latest points earnings and redemptions. Full history is available in Finances.
        </p>
        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {DEMO_ACTIVITY.map((item, i) => (
                <li key={i} className="flex items-center justify-between gap-4 px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        item.points > 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.points > 0 ? (
                        <TrendingUp className="h-5 w-5" />
                      ) : (
                        <Gift className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{item.description}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold ${
                        item.points > 0 ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.points > 0 ? "+" : ""}
                      {item.points.toLocaleString()}
                    </span>
                    <Badge variant={item.points > 0 ? "default" : "secondary"} className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

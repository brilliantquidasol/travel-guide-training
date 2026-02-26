"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MapPin,
  Wallet,
  Gift,
  Award,
  Headphones,
  SlidersHorizontal,
  Bell,
  Settings,
  Menu,
  Compass,
  LogOut,
} from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardGuard } from "./DashboardGuard";
import { clearStoredUserId } from "@/lib/auth";

const navSections: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Trips", href: "/dashboard/trips", icon: MapPin },
  { label: "Finances", href: "/dashboard/finances", icon: Wallet },
  { label: "Concierge", href: "/dashboard/concierge", icon: Headphones },
  { label: "Benefits", href: "/dashboard/benefits", icon: Gift },
  { label: "Points & Rewards", href: "/dashboard/points-rewards", icon: Award },
  { label: "Preferences", href: "/dashboard/preferences", icon: SlidersHorizontal },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = useCallback(() => {
    clearStoredUserId();
    router.replace("/login?callbackUrl=/dashboard");
    router.refresh();
  }, [router]);

  const handleMobileOpenChange = useCallback((open: boolean) => {
    setMobileOpen((prev) => (prev === open ? prev : open));
  }, []);

  const navContent = (
    <nav className="flex flex-col gap-1 p-2">
      {navSections.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <DashboardGuard>
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b bg-card">
        <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
          <Sheet open={mobileOpen} onOpenChange={handleMobileOpenChange}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="py-4 pl-2">
                <Link href="/" className="flex items-center gap-2 px-3 pb-4 text-lg font-semibold">
                  <Compass className="h-6 w-6" />
                  Dashboard
                </Link>
                {navContent}
                <div className="mt-4 border-t px-3 pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-muted-foreground"
                    onClick={() => { setMobileOpen(false); handleLogout(); }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="hidden items-center gap-2 lg:flex">
            <Compass className="h-6 w-6" />
            <span className="font-semibold">Wanderlust</span>
          </Link>
          <div className="flex-1" />
          <Link href="/plan-trip">
            <Button size="sm" variant="outline" className="rounded-lg">
              Plan trip
            </Button>
          </Link>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-lg text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-1" />
            Sign out
          </Button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden w-56 shrink-0 border-r bg-card lg:block">
          <div className="sticky top-14 flex flex-col gap-1 p-3">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Dashboard
            </p>
            {navContent}
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
    </DashboardGuard>
  );
}

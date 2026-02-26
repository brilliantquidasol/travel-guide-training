"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getMe, type AuthUser } from "@/lib/api";
import {
  LayoutDashboard,
  Package,
  MapPin,
  Compass,
  Building,
  DoorOpen,
  CreditCard,
  Map,
  Users,
  FileText,
  Headphones,
  BarChart3,
  Menu,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

const navSections: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Catalog", href: "/admin/catalog", icon: Package },
  { label: "Destinations", href: "/admin/catalog/destinations", icon: MapPin },
  { label: "Tours", href: "/admin/catalog/tours", icon: Compass },
  { label: "Hotels", href: "/admin/catalog/hotels", icon: Building },
  { label: "Rooms", href: "/admin/catalog/rooms", icon: DoorOpen },
  { label: "Bookings & Trips", href: "/admin/bookings", icon: CreditCard },
  { label: "Users & Roles", href: "/admin/users", icon: Users },
  { label: "Homepage & Content", href: "/admin/content", icon: FileText },
  { label: "Concierge & Support", href: "/admin/concierge", icon: Headphones },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null | "loading">("loading");
  const [mobileOpen, setMobileOpen] = useState(false);
  const hasRedirected = useRef(false);

  useEffect(() => {
    getMe()
      .then((u) => setUser(u ?? null))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (user === "loading") return;
    if (hasRedirected.current) return;
    if (!user || user.role !== "admin") {
      hasRedirected.current = true;
      router.replace("/403");
    }
  }, [user, router]);

  const handleMobileOpenChange = useCallback((open: boolean) => {
    setMobileOpen((prev) => (prev === open ? prev : open));
  }, []);

  const navContent = (
    <nav className="flex flex-col gap-1 p-2">
      {navSections.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
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

  if (user === "loading" || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
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
                <Link href="/admin" className="flex items-center gap-2 px-3 pb-4 text-lg font-semibold">
                  <Shield className="h-6 w-6" />
                  Admin
                </Link>
                {navContent}
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/admin" className="hidden items-center gap-2 lg:flex">
            <Shield className="h-6 w-6" />
            <span className="font-semibold">Admin</span>
          </Link>
          <div className="flex-1" />
          <span className="text-sm text-muted-foreground">{user.email}</span>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Site</Link>
          </Button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden w-56 shrink-0 border-r bg-card lg:block">
          <div className="sticky top-14 flex flex-col gap-1 p-3">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Admin
            </p>
            {navContent}
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getStoredUserId } from "@/lib/auth";

export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const userId = getStoredUserId();
    if (!userId) {
      const callbackUrl = pathname ? `/login?callbackUrl=${encodeURIComponent(pathname)}` : "/login";
      router.replace(callbackUrl);
    }
  }, [mounted, pathname, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-pulse text-muted-foreground">Loading…</div>
      </div>
    );
  }

  const userId = getStoredUserId();
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-pulse text-muted-foreground">Redirecting to sign in…</div>
      </div>
    );
  }

  return <>{children}</>;
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type NewsletterSignupProps = {
  className?: string;
};

export function NewsletterSignup({ className }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      // Stub: in production POST to your API or mailing provider
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={cn("rounded-2xl bg-muted/50 border border-border p-8 md:p-10", className)}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h3 className="font-heading font-bold text-2xl mb-2">Get travel inspiration</h3>
          <p className="text-muted-foreground">
            Join our newsletter for destination guides, deals, and tips once a month.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:min-w-[320px]">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 rounded-full border-border"
              disabled={status === "loading"}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="rounded-full bg-primary hover:bg-primary/90 shrink-0"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing…" : status === "success" ? "Subscribed!" : "Subscribe"}
          </Button>
        </form>
      </div>
      {status === "success" && (
        <p className="text-sm text-primary mt-3">Thanks! We&apos;ll send you the best of Wanderlust.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-destructive mt-3">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAdminUser, type User } from "@/lib/admin-api";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function AdminUserDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminUser(id)
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">User not found.</p>
        <Button asChild variant="outline">
          <Link href="/admin/users">Back to list</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/users" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Users
      </Link>
      <h1 className="font-heading text-3xl font-bold tracking-tight">User detail</h1>
      <Card>
        <CardContent className="pt-6 space-y-2">
          <p><span className="text-muted-foreground">ID:</span> {user._id}</p>
          <p><span className="text-muted-foreground">Email:</span> {user.email}</p>
          <p><span className="text-muted-foreground">Role:</span> <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge></p>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">Role updates can be added here later.</p>
    </div>
  );
}

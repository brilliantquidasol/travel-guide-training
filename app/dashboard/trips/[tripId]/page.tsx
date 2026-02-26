"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { getTrip, updateTrip, type Trip, type ItineraryItem } from "@/lib/api";
import { ArrowLeft, ArrowRight, Plus, Pencil, Trash2, Loader2, MapPin, CreditCard } from "lucide-react";

function formatDate(s: string | undefined) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function DashboardTripPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.tripId as string;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editModal, setEditModal] = useState<{
    open: boolean;
    index: number | null;
    item: ItineraryItem | null;
  }>({ open: false, index: null, item: null });
  const [newItemModal, setNewItemModal] = useState(false);
  const [formItem, setFormItem] = useState<ItineraryItem>({
    type: "activity",
    productId: "",
    title: "",
    notes: "",
  });
  const [formDate, setFormDate] = useState("");

  useEffect(() => {
    getTrip(tripId)
      .then(setTrip)
      .catch(() => setTrip(null))
      .finally(() => setLoading(false));
  }, [tripId]);

  const itinerary = trip?.itinerary ?? [];
  const byDate = itinerary.reduce<Record<string, ItineraryItem[]>>((acc, it) => {
    const d = it.date ?? "unscheduled";
    if (!acc[d]) acc[d] = [];
    acc[d].push(it);
    return acc;
  }, {});
  const sortedDates = Object.keys(byDate).sort();

  const saveItinerary = async (newItinerary: ItineraryItem[]) => {
    if (!trip) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await updateTrip(tripId, { itinerary: newItinerary });
      setTrip(updated);
      setEditModal({ open: false, index: null, item: null });
      setNewItemModal(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (index: number) => {
    const item = itinerary[index];
    setEditModal({ open: true, index, item: item ? { ...item } : null });
    setFormItem(
      item
        ? {
            type: item.type,
            productId: item.productId ?? "",
            title: item.title ?? "",
            notes: item.notes ?? "",
          }
        : { type: "activity", productId: "", title: "", notes: "" }
    );
    setFormDate(item?.date ?? "");
  };

  const handleSaveEdit = () => {
    if (editModal.index == null || !editModal.item) return;
    const next = [...itinerary];
    next[editModal.index] = {
      ...formItem,
      date: formDate || undefined,
    };
    saveItinerary(next);
  };

  const handleDelete = (index: number) => {
    const next = itinerary.filter((_, i) => i !== index);
    saveItinerary(next);
  };

  const handleAddNew = () => {
    setFormItem({ type: "activity", productId: "", title: "", notes: "" });
    setFormDate(trip?.startDate?.slice(0, 10) ?? new Date().toISOString().slice(0, 10));
    setNewItemModal(true);
  };

  const handleSaveNew = () => {
    if (!formItem.title.trim()) return;
    const next = [
      ...itinerary,
      {
        ...formItem,
        date: formDate || undefined,
      },
    ];
    saveItinerary(next);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Trip not found or you don’t have access.</p>
        <Button variant="outline" asChild>
          <Link href="/plan-trip">Plan a new trip</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/plan-trip" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to plan trip
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 rounded-xl border bg-card p-6 md:p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1 min-w-0">
              <h1 className="font-heading font-bold text-2xl md:text-3xl">{trip.title}</h1>
              <p className="text-muted-foreground">
                {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
                {trip.originCity && ` · From ${trip.originCity}`}
              </p>
              <span className="inline-block mt-2 px-3 py-1 rounded-lg bg-muted text-muted-foreground text-sm font-medium capitalize">
                {trip.status}
              </span>
            </div>
            {(trip.itinerary?.length ?? 0) > 0 && (
              <Button
                asChild
                size="lg"
                className="shrink-0 rounded-full bg-primary px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90 transition-all"
              >
                <Link href={`/checkout?trip_id=${tripId}`}>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {error && <p className="text-destructive text-sm mb-4">{error}</p>}

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-semibold text-xl">Itinerary</h2>
          <Button size="sm" onClick={handleAddNew} disabled={saving}>
            <Plus className="w-4 h-4 mr-2" />
            Add item
          </Button>
        </div>

        {sortedDates.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No itinerary items yet. Add tours, hotels, or activities above.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {sortedDates.map((date) => (
              <Card key={date}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {date === "unscheduled" ? "Unscheduled" : formatDate(date)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {byDate[date].map((it, idx) => {
                    const globalIndex = itinerary.indexOf(it);
                    return (
                      <div
                        key={globalIndex}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div>
                          <span className="font-medium">{it.title || it.type}</span>
                          {it.notes && (
                            <p className="text-sm text-muted-foreground mt-1">{it.notes}</p>
                          )}
                          <span className="text-xs text-muted-foreground capitalize">{it.type}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(globalIndex)}
                            disabled={saving}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(globalIndex)}
                            disabled={saving}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Edit item modal */}
      <Dialog open={editModal.open} onOpenChange={(open) => setEditModal((m) => ({ ...m, open }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit itinerary item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Type</Label>
              <Input
                value={formItem.type}
                onChange={(e) => setFormItem((f) => ({ ...f, type: e.target.value }))}
                placeholder="tour, hotel, activity"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={formItem.title}
                onChange={(e) => setFormItem((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div>
              <Label>Notes</Label>
              <Input
                value={formItem.notes ?? ""}
                onChange={(e) => setFormItem((f) => ({ ...f, notes: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModal({ open: false, index: null, item: null })}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New item modal */}
      <Dialog open={newItemModal} onOpenChange={setNewItemModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add itinerary item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Type</Label>
              <Input
                value={formItem.type}
                onChange={(e) => setFormItem((f) => ({ ...f, type: e.target.value }))}
                placeholder="tour, hotel, activity"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={formItem.title}
                onChange={(e) => setFormItem((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. City walking tour"
              />
            </div>
            <div>
              <Label>Product ID (optional)</Label>
              <Input
                value={formItem.productId}
                onChange={(e) => setFormItem((f) => ({ ...f, productId: e.target.value }))}
                placeholder="ID from catalog"
              />
            </div>
            <div>
              <Label>Notes</Label>
              <Input
                value={formItem.notes ?? ""}
                onChange={(e) => setFormItem((f) => ({ ...f, notes: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewItemModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNew} disabled={saving || !formItem.title.trim()}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

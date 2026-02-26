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
import { ArrowLeft, ArrowRight, Plus, Pencil, Trash2, Loader2, MapPin, CreditCard, CalendarDays, Banknote, Building2, Ticket, Sparkles } from "lucide-react";

const TRIP_HERO_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80";

function getItineraryItemIcon(type: string) {
  const t = type?.toLowerCase() ?? "";
  if (t === "hotel") return Building2;
  if (t === "tour") return Ticket;
  return Sparkles;
}

function ItineraryItemRow({
  item,
  globalIndex,
  onEdit,
  onDelete,
  saving,
}: {
  item: ItineraryItem;
  globalIndex: number;
  onEdit: () => void;
  onDelete: () => void;
  saving: boolean;
}) {
  const Icon = getItineraryItemIcon(item.type);
  const title = item.title?.trim() || item.type || "Item";
  const description = item.notes?.trim();
  return (
    <div className="flex items-stretch gap-4 p-5 transition-colors hover:bg-muted/30">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1 space-y-2 py-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium capitalize text-muted-foreground">
            {item.type || "activity"}
          </span>
        </div>
        {description ? (
          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button variant="ghost" size="icon" onClick={onEdit} disabled={saving} className="rounded-lg">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          disabled={saving}
          className="rounded-lg text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

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
        {/* Trip hero + title card */}
        <div className="mb-10 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          <div className="relative aspect-[21/9] min-h-[180px] w-full overflow-hidden bg-muted">
            <img
              src={TRIP_HERO_IMAGE}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm capitalize">
                {trip.status}
              </span>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-4 min-w-0">
                <h1 className="font-heading font-bold text-2xl leading-tight tracking-tight md:text-3xl">
                  {trip.title}
                </h1>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
                  {trip.originCity && (
                    <>
                      {" "}
                      · From {trip.originCity}
                    </>
                  )}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {trip.budget != null && trip.budget > 0 && (
                    <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2">
                      <Banknote className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-primary">
                        Budget ${trip.budget.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {(!trip.budget || trip.budget <= 0) && (
                    <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-2 text-muted-foreground">
                      <Banknote className="h-4 w-4" />
                      <span className="text-sm">Price at checkout</span>
                    </div>
                  )}
                  {trip.travelerCount != null && trip.travelerCount > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {trip.travelerCount} traveler{trip.travelerCount !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
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
        </div>

        {error && (
          <p className="mb-6 text-sm text-destructive">{error}</p>
        )}

        {/* Itinerary section */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
                Itinerary
              </h2>
              <p className="text-muted-foreground text-sm">
                Day-by-day tours, hotels, and activities. Add or edit items below.
              </p>
            </div>
            <Button size="sm" onClick={handleAddNew} disabled={saving} className="rounded-xl shrink-0">
              <Plus className="w-4 h-4 mr-2" />
              Add item
            </Button>
          </div>
        </div>

        {sortedDates.length === 0 ? (
          <Card className="overflow-hidden border-0 shadow-md">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <MapPin className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">No itinerary items yet</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Add tours, hotels, or activities to build your day-by-day plan.
              </p>
              <Button className="mt-6 rounded-xl" onClick={handleAddNew} disabled={saving}>
                <Plus className="w-4 h-4 mr-2" />
                Add first item
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {sortedDates.map((date) => (
              <Card key={date} className="overflow-hidden border-0 shadow-md">
                <CardHeader className="border-b bg-muted/30 px-6 py-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    {date === "unscheduled" ? "Unscheduled" : formatDate(date)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="divide-y p-0">
                  {byDate[date].map((it) => {
                    const globalIndex = itinerary.indexOf(it);
                    return (
                      <ItineraryItemRow
                        key={globalIndex}
                        item={it}
                        globalIndex={globalIndex}
                        onEdit={() => handleEdit(globalIndex)}
                        onDelete={() => handleDelete(globalIndex)}
                        saving={saving}
                      />
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

"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getHotels } from "@/lib/api";
import {
  getRoomsByHotel,
  createRoom,
  updateRoom,
  deleteRoom,
  type Room,
} from "@/lib/admin-api";
import type { Paginated } from "@/lib/api";
import type { Hotel } from "@/lib/api";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";

function RoomsContent() {
  const searchParams = useSearchParams();
  const hotelIdParam = searchParams.get("hotelId");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [data, setData] = useState<Paginated<Room> | null>(null);
  const [loading, setLoading] = useState(true);
  const [hotelId, setHotelId] = useState(hotelIdParam ?? "");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<"create" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<Room | null>(null);
  const [form, setForm] = useState<Partial<Room>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHotels({ limit: 200 }).then((r) => setHotels(r.items));
  }, []);

  useEffect(() => {
    setHotelId((prev) => hotelIdParam ?? prev);
  }, [hotelIdParam]);

  const load = () => {
    if (!hotelId) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    getRoomsByHotel(hotelId, { page, limit: 20 })
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [hotelId, page]);

  const openCreate = () => {
    setSelected(null);
    setForm({ name: "", capacity: 1, pricePerNight: 0, hotel: hotelId });
    setModal("create");
    setError(null);
  };

  const openEdit = (row: Room) => {
    setSelected(row);
    setForm({
      name: row.name,
      capacity: row.capacity,
      bedType: row.bedType,
      pricePerNight: row.pricePerNight,
      inventory: row.inventory,
    });
    setModal("edit");
    setError(null);
  };

  const openDelete = (row: Room) => {
    setSelected(row);
    setModal("delete");
    setError(null);
  };

  const handleCreate = async () => {
    if (!form.name || !form.capacity || form.pricePerNight == null || !hotelId) {
      setError("Name, capacity, price, and hotel are required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await createRoom({
        hotel: hotelId,
        name: form.name,
        capacity: form.capacity,
        pricePerNight: form.pricePerNight,
        bedType: form.bedType,
        inventory: form.inventory,
      });
      setModal(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!selected) return;
    setSaving(true);
    setError(null);
    try {
      await updateRoom(selected._id, form);
      setModal(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setSaving(true);
    setError(null);
    try {
      await deleteRoom(selected._id);
      setModal(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/admin/catalog/hotels" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
            <ArrowLeft className="h-4 w-4" /> Hotels
          </Link>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Rooms</h1>
          <p className="text-muted-foreground mt-1">Manage rooms by hotel</p>
        </div>
        {hotelId && (
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add room
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <Label>Hotel</Label>
            <select
              className="flex h-9 w-full max-w-xs rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm mt-1"
              value={hotelId}
              onChange={(e) => setHotelId(e.target.value)}
            >
              <option value="">Select hotel</option>
              {hotels.map((h) => (
                <option key={h._id} value={h._id}>{h.name}</option>
              ))}
            </select>
          </div>
          {!hotelId ? (
            <p className="text-muted-foreground py-8 text-center">Select a hotel to view and manage rooms.</p>
          ) : loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !data?.items.length ? (
            <p className="text-muted-foreground py-8 text-center">No rooms for this hotel.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Bed type</TableHead>
                  <TableHead>Price/night</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{row.capacity}</TableCell>
                    <TableCell>{row.bedType ?? "—"}</TableCell>
                    <TableCell>${row.pricePerNight}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(row)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => openDelete(row)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {data && data.totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">Page {data.page} of {data.totalPages}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
                <Button variant="outline" size="sm" disabled={page >= data.totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={modal === "create" || modal === "edit"} onOpenChange={(open) => !open && setModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modal === "create" ? "Add room" : "Edit room"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Name</Label>
              <Input value={form.name ?? ""} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Capacity</Label>
                <Input type="number" value={form.capacity ?? ""} onChange={(e) => setForm((f) => ({ ...f, capacity: Number(e.target.value) || 0 }))} />
              </div>
              <div>
                <Label>Price per night ($)</Label>
                <Input type="number" value={form.pricePerNight ?? ""} onChange={(e) => setForm((f) => ({ ...f, pricePerNight: Number(e.target.value) || 0 }))} />
              </div>
            </div>
            <div>
              <Label>Bed type (optional)</Label>
              <Input value={form.bedType ?? ""} onChange={(e) => setForm((f) => ({ ...f, bedType: e.target.value }))} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
            {modal === "create" ? (
              <Button onClick={handleCreate} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Create</Button>
            ) : (
              <Button onClick={handleUpdate} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Save</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={modal === "delete"} onOpenChange={(open) => !open && setModal(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete room</DialogTitle></DialogHeader>
          <p className="text-muted-foreground">Delete &quot;{selected?.name}&quot;? This cannot be undone.</p>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminRoomsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <RoomsContent />
    </Suspense>
  );
}

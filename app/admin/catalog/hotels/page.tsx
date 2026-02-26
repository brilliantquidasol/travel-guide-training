"use client";

import { useState, useEffect } from "react";
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
import { getHotels, getDestinations, type Hotel, type Destination } from "@/lib/api";
import type { Paginated } from "@/lib/api";
import { createHotel, updateHotel, deleteHotel } from "@/lib/admin-api";
import { Loader2, Plus, Pencil, Trash2, DoorOpen } from "lucide-react";

export default function AdminHotelsPage() {
  const [data, setData] = useState<Paginated<Hotel> | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<"create" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<Hotel | null>(null);
  const [form, setForm] = useState<Partial<Hotel> & { destination?: string }>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getHotels({ page, limit: 20 })
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [page]);

  useEffect(() => {
    getDestinations({ limit: 200 }).then((r) => setDestinations(r.items));
  }, []);

  const openCreate = () => {
    setSelected(null);
    setForm({ name: "", slug: "", destination: "" });
    setModal("create");
    setError(null);
  };

  const openEdit = (row: Hotel) => {
    setSelected(row);
    const destId = typeof row.destination === "object" ? row.destination?._id : row.destination;
    setForm({
      name: row.name,
      slug: row.slug,
      rating: row.rating,
      destination: destId ?? "",
    });
    setModal("edit");
    setError(null);
  };

  const openDelete = (row: Hotel) => {
    setSelected(row);
    setModal("delete");
    setError(null);
  };

  const handleCreate = async () => {
    if (!form.name || !form.slug || !form.destination) {
      setError("Name, slug, and destination are required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await createHotel({
        name: form.name,
        slug: form.slug,
        destination: form.destination,
        rating: form.rating,
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
      await updateHotel(selected._id, {
        name: form.name,
        slug: form.slug,
        rating: form.rating,
        destination: form.destination,
      });
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
      await deleteHotel(selected._id);
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
          <h1 className="font-heading text-3xl font-bold tracking-tight">Hotels</h1>
          <p className="text-muted-foreground mt-1">Manage hotel catalog</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add hotel
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !data?.items.length ? (
            <p className="text-muted-foreground py-8 text-center">No hotels found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{row.slug}</TableCell>
                    <TableCell>
                      {typeof row.destination === "object" ? row.destination?.name : row.destination}
                    </TableCell>
                    <TableCell>{row.rating ?? "—"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/catalog/rooms?hotelId=${row._id}`}>
                            <DoorOpen className="h-4 w-4" />
                          </Link>
                        </Button>
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
            <DialogTitle>{modal === "create" ? "Add hotel" : "Edit hotel"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Name</Label>
              <Input value={form.name ?? ""} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <Label>Slug</Label>
              <Input value={form.slug ?? ""} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} disabled={modal === "edit"} />
            </div>
            <div>
              <Label>Destination</Label>
              <select
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={form.destination ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
              >
                <option value="">Select destination</option>
                {destinations.map((d) => (
                  <option key={d._id} value={d._id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Rating (optional)</Label>
              <Input type="number" value={form.rating ?? ""} onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) || undefined }))} />
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
          <DialogHeader><DialogTitle>Delete hotel</DialogTitle></DialogHeader>
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

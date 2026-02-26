"use client";

import { useState, useEffect } from "react";
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
import { getTours, type Tour } from "@/lib/api";
import type { Paginated } from "@/lib/api";
import {
  createTour,
  updateTour,
  deleteTour,
} from "@/lib/admin-api";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminToursPage() {
  const [data, setData] = useState<Paginated<Tour> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<"create" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<Tour | null>(null);
  const [form, setForm] = useState<Partial<Tour>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getTours({ page, limit: 20 })
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [page]);

  const openCreate = () => {
    setSelected(null);
    setForm({ title: "", slug: "", durationDays: 1, priceFrom: 0 });
    setModal("create");
    setError(null);
  };

  const openEdit = (row: Tour) => {
    setSelected(row);
    setForm({
      title: row.title,
      slug: row.slug,
      durationDays: row.durationDays,
      groupSize: row.groupSize,
      priceFrom: row.priceFrom,
      highlights: row.highlights,
    });
    setModal("edit");
    setError(null);
  };

  const openDelete = (row: Tour) => {
    setSelected(row);
    setModal("delete");
    setError(null);
  };

  const handleCreate = async () => {
    if (!form.title || !form.slug || form.durationDays == null || form.priceFrom == null) {
      setError("Title, slug, duration, and price are required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await createTour({
        title: form.title,
        slug: form.slug,
        durationDays: form.durationDays,
        priceFrom: form.priceFrom,
        groupSize: form.groupSize,
        highlights: form.highlights,
        destinations: form.destinations?.map((d) => d._id) as string[] | undefined,
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
      await updateTour(selected._id, form);
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
      await deleteTour(selected._id);
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
          <h1 className="font-heading text-3xl font-bold tracking-tight">Tours</h1>
          <p className="text-muted-foreground mt-1">Manage tour catalog</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add tour
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !data?.items.length ? (
            <p className="text-muted-foreground py-8 text-center">No tours found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Price from</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell className="font-medium">{row.title}</TableCell>
                    <TableCell>{row.slug}</TableCell>
                    <TableCell>{row.durationDays}</TableCell>
                    <TableCell>${row.priceFrom}</TableCell>
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
            <DialogTitle>{modal === "create" ? "Add tour" : "Edit tour"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Title</Label>
              <Input value={form.title ?? ""} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <Label>Slug</Label>
              <Input value={form.slug ?? ""} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} disabled={modal === "edit"} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Duration (days)</Label>
                <Input type="number" value={form.durationDays ?? ""} onChange={(e) => setForm((f) => ({ ...f, durationDays: Number(e.target.value) || 0 }))} />
              </div>
              <div>
                <Label>Price from ($)</Label>
                <Input type="number" value={form.priceFrom ?? ""} onChange={(e) => setForm((f) => ({ ...f, priceFrom: Number(e.target.value) || 0 }))} />
              </div>
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
          <DialogHeader><DialogTitle>Delete tour</DialogTitle></DialogHeader>
          <p className="text-muted-foreground">Delete &quot;{selected?.title}&quot;? This cannot be undone.</p>
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

"use client";

import { useState, useEffect } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDestinations, type Destination } from "@/lib/api";
import type { Paginated } from "@/lib/api";
import { createDestination, updateDestination, deleteDestination } from "@/lib/admin-api";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminDestinationsPage() {
  const [data, setData] = useState<Paginated<Destination> | null>(null);
  const [loading, setLoading] = useState(true);
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<"create" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<Destination | null>(null);
  const [form, setForm] = useState<Partial<Destination>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getDestinations({
      page,
      limit: 20,
      continent: continent || undefined,
      country: country || undefined,
    })
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [page, continent, country]);

  const openCreate = () => {
    setSelected(null);
    setForm({ name: "", slug: "", continent: "", country: "" });
    setModal("create");
    setError(null);
  };

  const openEdit = (row: Destination) => {
    setSelected(row);
    setForm({
      name: row.name,
      slug: row.slug,
      continent: row.continent,
      country: row.country,
      summary: row.summary,
      heroImage: row.heroImage,
      tags: row.tags,
      bestTimeToVisit: row.bestTimeToVisit,
    });
    setModal("edit");
    setError(null);
  };

  const openDelete = (row: Destination) => {
    setSelected(row);
    setModal("delete");
    setError(null);
  };

  const handleCreate = async () => {
    if (!form.name || !form.slug || !form.continent || !form.country) {
      setError("Name, slug, continent, and country are required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await createDestination({
        name: form.name,
        slug: form.slug,
        continent: form.continent,
        country: form.country,
        summary: form.summary,
        heroImage: form.heroImage,
        tags: form.tags,
        bestTimeToVisit: form.bestTimeToVisit,
        idealTripLength: form.idealTripLength,
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
      await updateDestination(selected._id, form);
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
      await deleteDestination(selected._id);
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
          <h1 className="font-heading text-3xl font-bold tracking-tight">Destinations</h1>
          <p className="text-muted-foreground mt-1">Manage destination catalog</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add destination
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-wrap gap-2">
            <Input
              placeholder="Continent"
              value={continent}
              onChange={(e) => setContinent(e.target.value)}
              className="max-w-[140px]"
            />
            <Input
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="max-w-[140px]"
            />
            <Button variant="outline" size="sm" onClick={load}>
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !data?.items.length ? (
            <p className="text-muted-foreground py-8 text-center">No destinations found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Continent</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{row.slug}</TableCell>
                    <TableCell>{row.continent}</TableCell>
                    <TableCell>{row.country}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(row)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => openDelete(row)}
                        >
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
              <p className="text-sm text-muted-foreground">
                Page {data.page} of {data.totalPages} ({data.total} total)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create / Edit modal */}
      <Dialog open={modal === "create" || modal === "edit"} onOpenChange={(open) => !open && setModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modal === "create" ? "Add destination" : "Edit destination"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Name</Label>
              <Input
                value={form.name ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Bali"
              />
            </div>
            <div>
              <Label>Slug</Label>
              <Input
                value={form.slug ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                placeholder="e.g. bali-indonesia"
                disabled={modal === "edit"}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Continent</Label>
                <Input
                  value={form.continent ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, continent: e.target.value }))}
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  value={form.country ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label>Summary (optional)</Label>
              <Input
                value={form.summary ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              />
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

      {/* Delete confirm */}
      <Dialog open={modal === "delete"} onOpenChange={(open) => !open && setModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete destination</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Delete &quot;{selected?.name}&quot;? This cannot be undone.
          </p>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

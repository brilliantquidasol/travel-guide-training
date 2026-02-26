/**
 * Admin-only API calls. All require X-User-Id header and backend enforces AdminGuard.
 * Use only after confirming current user has role === "admin".
 */

import { getAuthHeaders } from "@/lib/auth";
import type {
  Paginated,
  Destination,
  Tour,
  Hotel,
  Trip,
  Booking,
} from "@/lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export type Room = {
  _id: string;
  hotel: string | { _id: string; name?: string; slug?: string };
  name: string;
  capacity: number;
  bedType?: string;
  pricePerNight: number;
  inventory?: number;
};

export type User = {
  _id: string;
  email: string;
  role: "user" | "admin";
};

function authHeaders(): Record<string, string> {
  return getAuthHeaders();
}

function jsonHeaders(): Record<string, string> {
  return { "Content-Type": "application/json", ...authHeaders() };
}

// --- Admin lists ---

export async function getAdminTrip(id: string): Promise<Trip> {
  const res = await fetch(`${API_BASE}/trips/admin/${id}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch trip");
  return res.json();
}

export async function getAdminTrips(params?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<Paginated<Trip>> {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.status) sp.set("status", params.status);
  const res = await fetch(`${API_BASE}/trips/admin?${sp}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch trips");
  return res.json();
}

export async function getAdminBookings(params?: {
  page?: number;
  limit?: number;
  userId?: string;
  tripId?: string;
  status?: string;
}): Promise<Paginated<Booking>> {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.userId) sp.set("userId", params.userId);
  if (params?.tripId) sp.set("tripId", params.tripId);
  if (params?.status) sp.set("status", params.status);
  const res = await fetch(`${API_BASE}/bookings/admin?${sp}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

export async function getAdminUsers(params?: {
  page?: number;
  limit?: number;
  role?: string;
}): Promise<Paginated<User>> {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.role) sp.set("role", params.role);
  const res = await fetch(`${API_BASE}/users?${sp}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function getAdminUser(id: string): Promise<User> {
  const res = await fetch(`${API_BASE}/users/${id}`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

// --- Destinations CRUD ---

export async function getDestinationById(id: string): Promise<Destination> {
  const res = await fetch(`${API_BASE}/destinations/${id}`);
  if (!res.ok) throw new Error("Failed to fetch destination");
  return res.json();
}

export async function createDestination(
  body: Partial<Destination> & { name: string; slug: string; continent: string; country: string }
): Promise<Destination> {
  const res = await fetch(`${API_BASE}/destinations`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.message ?? "Failed to create destination");
  }
  return res.json();
}

export async function updateDestination(
  id: string,
  body: Partial<Destination>
): Promise<Destination> {
  const res = await fetch(`${API_BASE}/destinations/${id}`, {
    method: "PATCH",
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to update destination");
  return res.json();
}

export async function deleteDestination(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/destinations/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete destination");
}

// --- Tours CRUD ---

export async function getTourById(id: string): Promise<Tour> {
  const res = await fetch(`${API_BASE}/tours/${id}`);
  if (!res.ok) throw new Error("Failed to fetch tour");
  return res.json();
}

export async function createTour(
  body: Partial<Tour> & { title: string; slug: string; durationDays: number; priceFrom: number }
): Promise<Tour> {
  const res = await fetch(`${API_BASE}/tours`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.message ?? "Failed to create tour");
  }
  return res.json();
}

export async function updateTour(id: string, body: Partial<Tour>): Promise<Tour> {
  const res = await fetch(`${API_BASE}/tours/${id}`, {
    method: "PATCH",
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to update tour");
  return res.json();
}

export async function deleteTour(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/tours/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete tour");
}

// --- Hotels CRUD ---

export async function getHotelById(id: string): Promise<Hotel> {
  const res = await fetch(`${API_BASE}/hotels/${id}`);
  if (!res.ok) throw new Error("Failed to fetch hotel");
  return res.json();
}

export async function createHotel(
  body: Partial<Hotel> & { name: string; slug: string; destination: string }
): Promise<Hotel> {
  const res = await fetch(`${API_BASE}/hotels`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.message ?? "Failed to create hotel");
  }
  return res.json();
}

export async function updateHotel(id: string, body: Partial<Hotel>): Promise<Hotel> {
  const res = await fetch(`${API_BASE}/hotels/${id}`, {
    method: "PATCH",
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to update hotel");
  return res.json();
}

export async function deleteHotel(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/hotels/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete hotel");
}

// --- Rooms CRUD ---

export async function getRoomsByHotel(
  hotelId: string,
  params?: { page?: number; limit?: number }
): Promise<Paginated<Room>> {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  const res = await fetch(`${API_BASE}/rooms/hotel/${hotelId}?${sp}`);
  if (!res.ok) throw new Error("Failed to fetch rooms");
  return res.json();
}

export async function getRoomById(id: string): Promise<Room> {
  const res = await fetch(`${API_BASE}/rooms/${id}`);
  if (!res.ok) throw new Error("Failed to fetch room");
  return res.json();
}

export async function createRoom(
  body: Partial<Room> & { hotel: string; name: string; capacity: number; pricePerNight: number }
): Promise<Room> {
  const res = await fetch(`${API_BASE}/rooms`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.message ?? "Failed to create room");
  }
  return res.json();
}

export async function updateRoom(id: string, body: Partial<Room>): Promise<Room> {
  const res = await fetch(`${API_BASE}/rooms/${id}`, {
    method: "PATCH",
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to update room");
  return res.json();
}

export async function deleteRoom(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/rooms/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete room");
}

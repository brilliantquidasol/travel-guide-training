import { getAuthHeaders } from "@/lib/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export type Paginated<T> = { items: T[]; total: number; page: number; limit: number; totalPages: number };

function emptyPaginated<T>(limit = 20): Paginated<T> {
  return { items: [], total: 0, page: 1, limit, totalPages: 0 };
}

export async function getDestinations(params?: {
  page?: number;
  limit?: number;
  continent?: string;
  country?: string;
}): Promise<Paginated<Destination>> {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  const limit = params?.limit ?? 20;
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.continent) sp.set("continent", params.continent);
  if (params?.country) sp.set("country", params.country);
  const res = await fetch(`${API_BASE}/destinations?${sp}`, {
    next: { revalidate: 60 },
  }).catch(() => null);
  if (!res) return emptyPaginated<Destination>(limit);
  if (!res.ok) throw new Error("Failed to fetch destinations");
  const data = await res.json().catch(() => emptyPaginated<Destination>(limit));
  return data;
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const res = await fetch(`${API_BASE}/destinations/by-slug/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  }).catch(() => null);
  if (!res) return null;
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch destination");
  return res.json().catch(() => null);
}

export async function getTours(params?: {
  page?: number;
  limit?: number;
  destinationId?: string;
  minDays?: number;
  maxPrice?: number;
}): Promise<Paginated<Tour>> {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  const limit = params?.limit ?? 20;
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.destinationId) sp.set("destinationId", params.destinationId);
  if (params?.minDays != null) sp.set("minDays", String(params.minDays));
  if (params?.maxPrice != null) sp.set("maxPrice", String(params.maxPrice));
  const res = await fetch(`${API_BASE}/tours?${sp}`, {
    next: { revalidate: 60 },
  }).catch(() => null);
  if (!res) return emptyPaginated<Tour>(limit);
  if (!res.ok) throw new Error("Failed to fetch tours");
  const data = await res.json().catch(() => emptyPaginated<Tour>(limit));
  return data;
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const res = await fetch(`${API_BASE}/tours/by-slug/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch tour");
  return res.json();
}

export async function getHotels(params?: {
  page?: number;
  limit?: number;
  destinationId?: string;
  minRating?: number;
}): Promise<Paginated<Hotel>> {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  const limit = params?.limit ?? 20;
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.destinationId) sp.set("destinationId", params.destinationId);
  if (params?.minRating != null) sp.set("minRating", String(params.minRating));
  const res = await fetch(`${API_BASE}/hotels?${sp}`).catch(() => null);
  if (!res) return emptyPaginated<Hotel>(limit);
  if (!res.ok) throw new Error("Failed to fetch hotels");
  return res.json();
}

export async function getHotelBySlug(slug: string): Promise<Hotel | null> {
  const res = await fetch(`${API_BASE}/hotels/by-slug/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch hotel");
  return res.json();
}

export type Destination = {
  _id: string;
  name: string;
  slug: string;
  continent: string;
  country: string;
  tags?: string[];
  summary?: string;
  heroImage?: string;
  gallery?: string[];
  bestTimeToVisit?: string;
  idealTripLength?: { min: number; max: number };
};

export type Tour = {
  _id: string;
  title: string;
  slug: string;
  durationDays: number;
  groupSize?: number;
  priceFrom: number;
  highlights?: string[];
  destinations?: { _id: string; name: string; slug: string; country?: string }[];
};

export type Hotel = {
  _id: string;
  name: string;
  slug: string;
  rating?: number;
  amenities?: string[];
  location?: { address?: string; city?: string; country?: string };
  gallery?: string[];
  destination?: { _id: string; name: string; slug: string };
};

// --- Trip (plan-trip + dashboard) ---

export type ItineraryItem = {
  type: string;
  productId: string;
  date?: string;
  title: string;
  notes?: string;
};

export type Trip = {
  _id: string;
  user: { _id: string; email?: string };
  title: string;
  startDate: string;
  endDate: string;
  status: "draft" | "booked" | "completed" | "canceled";
  originCity?: string;
  budget?: number;
  travelerCount?: number;
  travelStyle?: string;
  destinationIds?: { _id: string; name: string; slug: string }[];
  itinerary: ItineraryItem[];
};

/** Booking (payment/transaction) for a trip item */
export type Booking = {
  _id: string;
  user: { _id: string; email?: string };
  trip: { _id: string; title?: string; startDate?: string; endDate?: string; status?: string };
  productType: "tour" | "hotel" | "other";
  productId: string;
  price: number;
  currency: string;
  status: "pending" | "confirmed" | "canceled";
  paymentId?: string;
  createdAt?: string;
};

/** Current user (from GET /users/me); used for RBAC */
export type AuthUser = {
  _id: string;
  email: string;
  role: "user" | "admin";
};

function authHeaders(): Record<string, string> {
  return getAuthHeaders();
}

export async function getMe(): Promise<AuthUser | null> {
  const res = await fetch(`${API_BASE}/users/me`, {
    headers: { ...authHeaders() },
  }).catch(() => null);
  if (!res) return null;
  if (res.status === 401 || res.status === 403) return null;
  if (!res.ok) throw new Error("Failed to fetch current user");
  return res.json();
}

export async function getTrip(id: string): Promise<Trip | null> {
  const res = await fetch(`${API_BASE}/trips/${id}`, {
    headers: { ...authHeaders() },
  }).catch(() => null);
  if (!res) return null;
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch trip");
  return res.json();
}

export async function getMyTrips(params?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<Paginated<Trip>> {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.status) sp.set("status", params.status);
  const limit = params?.limit ?? 20;
  const res = await fetch(`${API_BASE}/trips/my?${sp}`, {
    headers: { ...authHeaders() },
  }).catch(() => null);
  if (!res) return emptyPaginated<Trip>(limit);
  if (!res.ok) throw new Error("Failed to fetch trips");
  return res.json();
}

export async function createTrip(body: {
  title: string;
  startDate: string;
  endDate: string;
  originCity?: string;
  budget?: number;
  travelerCount?: number;
  travelStyle?: string;
  destinationIds?: string[];
  itinerary?: ItineraryItem[];
}): Promise<Trip> {
  const res = await fetch(`${API_BASE}/trips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create trip");
  }
  return res.json();
}

export async function updateTrip(
  id: string,
  body: Partial<{
    title: string;
    startDate: string;
    endDate: string;
    status: string;
    originCity: string;
    budget: number;
    travelerCount: number;
    travelStyle: string;
    destinationIds: string[];
    itinerary: ItineraryItem[];
  }>
): Promise<Trip> {
  const res = await fetch(`${API_BASE}/trips/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to update trip");
  return res.json();
}

export async function getMyBookings(params?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<Paginated<Booking>> {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.status) sp.set("status", params.status);
  const limit = params?.limit ?? 20;
  const res = await fetch(`${API_BASE}/bookings/my?${sp}`, {
    headers: { ...authHeaders() },
  }).catch(() => null);
  if (!res) return emptyPaginated<Booking>(limit);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

/** Create Stripe Checkout session; returns URL to redirect to. No secret keys on client. */
export async function createCheckoutSession(params: {
  tripId: string;
  items?: { productType: "tour" | "hotel"; productId: string }[];
  successUrl?: string;
  cancelUrl?: string;
}): Promise<{ url: string; sessionId: string }> {
  const res = await fetch(`${API_BASE}/stripe/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Failed to create checkout session");
  }
  return res.json();
}

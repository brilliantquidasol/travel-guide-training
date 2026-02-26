import { getAuthHeaders } from "@/lib/auth";
import { staticDestinations, staticTours, staticHotels } from "@/lib/static-data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export type Paginated<T> = { items: T[]; total: number; page: number; limit: number; totalPages: number };

function emptyPaginated<T>(limit = 20): Paginated<T> {
  return { items: [], total: 0, page: 1, limit, totalPages: 0 };
}

function paginate<T>(items: T[], page: number, limit: number): Paginated<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const p = Math.max(1, Math.min(page, totalPages));
  const start = (p - 1) * limit;
  return {
    items: items.slice(start, start + limit),
    total,
    page: p,
    limit,
    totalPages,
  };
}

export async function getDestinations(params?: {
  page?: number;
  limit?: number;
  continent?: string;
  country?: string;
}): Promise<Paginated<Destination>> {
  let list = [...staticDestinations] as Destination[];
  if (params?.continent) list = list.filter((d) => d.continent === params.continent);
  if (params?.country) list = list.filter((d) => d.country === params.country);
  const limit = params?.limit ?? 20;
  const page = params?.page ?? 1;
  return paginate(list, page, limit);
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const d = staticDestinations.find((x) => x.slug === slug);
  return (d ?? null) as Destination | null;
}

export async function getTours(params?: {
  page?: number;
  limit?: number;
  destinationId?: string;
  minDays?: number;
  maxPrice?: number;
}): Promise<Paginated<Tour>> {
  let list = [...staticTours] as Tour[];
  if (params?.minDays != null) list = list.filter((t) => t.durationDays >= params.minDays!);
  if (params?.maxPrice != null) list = list.filter((t) => t.priceFrom <= params.maxPrice!);
  const limit = params?.limit ?? 20;
  const page = params?.page ?? 1;
  return paginate(list, page, limit);
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const t = staticTours.find((x) => x.slug === slug);
  return (t ?? null) as Tour | null;
}

export async function getHotels(params?: {
  page?: number;
  limit?: number;
  destinationId?: string;
  minRating?: number;
}): Promise<Paginated<Hotel>> {
  let list = [...staticHotels] as Hotel[];
  if (params?.minRating != null) list = list.filter((h) => (h.rating ?? 0) >= params.minRating!);
  const limit = params?.limit ?? 20;
  const page = params?.page ?? 1;
  return paginate(list, page, limit);
}

export async function getHotelBySlug(slug: string): Promise<Hotel | null> {
  const h = staticHotels.find((x) => x.slug === slug);
  return (h ?? null) as Hotel | null;
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
  heroImage?: string;
  gallery?: string[];
  shortDescription?: string;
  longDescription?: string;
  categories?: string[];
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
  shortDescription?: string;
  longDescription?: string;
  priceFrom?: number;
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

const LOCAL_TRIPS_KEY = "travel_guide_trips";

function getLocalTrips(): Trip[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_TRIPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalTrips(trips: Trip[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_TRIPS_KEY, JSON.stringify(trips));
  } catch {
    // ignore
  }
}

export async function getMe(): Promise<AuthUser | null> {
  const res = await fetch(`${API_BASE}/users/me`, {
    headers: { ...authHeaders() },
  }).catch(() => null);
  if (!res) return null;
  if (res.status === 401 || res.status === 403) return null;
  if (!res.ok) return null;
  return res.json().catch(() => null);
}

export async function getTrip(id: string): Promise<Trip | null> {
  const res = await fetch(`${API_BASE}/trips/${id}`, {
    headers: { ...authHeaders() },
  }).catch(() => null);
  if (!res) {
    const local = getLocalTrips().find((t) => t._id === id);
    return local ?? null;
  }
  if (res.status === 404) {
    const local = getLocalTrips().find((t) => t._id === id);
    return local ?? null;
  }
  if (!res.ok) return null;
  return res.json().catch(() => null);
}

export async function getMyTrips(params?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<Paginated<Trip>> {
  const limit = params?.limit ?? 20;
  const page = params?.page ?? 1;
  const sp = new URLSearchParams();
  sp.set("page", String(page));
  sp.set("limit", String(limit));
  if (params?.status) sp.set("status", params.status);
  const res = await fetch(`${API_BASE}/trips/my?${sp}`, {
    headers: { ...authHeaders() },
  }).catch(() => null);
  if (!res || !res.ok) {
    const all = getLocalTrips();
    const filtered = params?.status ? all.filter((t) => t.status === params.status) : all;
    return paginate(filtered as Trip[], page, limit);
  }
  return res.json().catch(() => emptyPaginated<Trip>(limit));
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
  }).catch(() => null);

  if (res?.ok) {
    const trip = await res.json().catch(() => null);
    if (trip) return trip;
  }

  // API unavailable: save trip locally so plan-trip works without backend
  const trip: Trip = {
    _id: "local-" + Date.now(),
    user: { _id: "local-user" },
    title: body.title,
    startDate: body.startDate,
    endDate: body.endDate,
    status: "draft",
    originCity: body.originCity,
    budget: body.budget,
    travelerCount: body.travelerCount,
    travelStyle: body.travelStyle,
    destinationIds: body.destinationIds?.map((id) => ({ _id: id, name: "", slug: "" })),
    itinerary: body.itinerary ?? [],
  };
  const local = getLocalTrips();
  local.unshift(trip);
  setLocalTrips(local);
  return trip;
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
  if (id.startsWith("local-")) {
    const local = getLocalTrips();
    const idx = local.findIndex((t) => t._id === id);
    if (idx === -1) throw new Error("Trip not found");
    const updated = { ...local[idx], ...body } as Trip;
    local[idx] = updated;
    setLocalTrips(local);
    return updated;
  }
  const res = await fetch(`${API_BASE}/trips/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(body),
  }).catch(() => null);
  if (!res?.ok) throw new Error("Failed to update trip");
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
  }).catch(() => null);

  if (res?.ok) {
    const data = await res.json().catch(() => null);
    if (data?.url) return data;
  }

  // API/Stripe unavailable: redirect to success page in demo mode so checkout flow completes
  const base = typeof window !== "undefined" ? window.location.origin : "";
  let demoUrl: string;
  if (params.successUrl) {
    try {
      const u = new URL(params.successUrl);
      u.searchParams.set("demo", "1");
      demoUrl = u.toString();
    } catch {
      demoUrl = `${base}/checkout/success?trip_id=${params.tripId}&demo=1`;
    }
  } else {
    demoUrl = `${base}/checkout/success?trip_id=${params.tripId}&demo=1`;
  }
  return {
    url: demoUrl,
    sessionId: "demo-" + Date.now(),
  };
}

/**
 * V1: Simple stored user id for API calls (no real login yet).
 * Replace with your auth provider (e.g. NextAuth, Clerk) and use session token.
 * AI flow can later plug in here to get current user context.
 */
const STORAGE_KEY = "travel_guide_user_id";

export function getStoredUserId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

export function setStoredUserId(userId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, userId);
}

export function clearStoredUserId(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/** Headers to send with authenticated API requests */
export function getAuthHeaders(): Record<string, string> {
  const id = getStoredUserId();
  if (!id) return {};
  return { "X-User-Id": id };
}

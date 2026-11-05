import { API_URL } from "./site";

/** Real platform-wide counts (GET /saas/public/stats). */
export interface PlatformStats {
  institutions: number;
  students: number;
  liveClasses: number;
  courses: number;
}

/** Server-side; refreshed every 10 minutes. null when the API can't be reached (the strip is then hidden). */
export async function getPlatformStats(): Promise<PlatformStats | null> {
  try {
    const res = await fetch(`${API_URL}/saas/public/stats`, { next: { revalidate: 600 } });
    if (!res.ok) return null;
    return (await res.json()) as PlatformStats;
  } catch {
    return null;
  }
}

import { API_URL } from "./site";

/** A published testimonial, managed by the platform owner in the Owner Console › Testimonials. */
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarUrl: string;
  /** Shown as the highlighted (orange) card. */
  featured: boolean;
}

/** Server-side; refreshed every minute. Empty when none are published or the API is down. */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_URL}/saas/public/testimonials`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return (await res.json()) as Testimonial[];
  } catch {
    return [];
  }
}

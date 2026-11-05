# lms-website

EduPro's marketing website — home, features, pricing and contact.

- Next.js 16 + Tailwind 4, the admin panel's design tokens (`src/app/globals.css`) and framer-motion.
- Plans come from `GET /saas/public/plans`, platform stats from `GET /saas/public/stats`, testimonials from `GET /saas/public/testimonials`, the contact form posts to `POST /saas/public/contact` (lms-ai-backend).
- Trial buttons open the admin panel's `/signup?plan=&cycle=`.

```bash
npm install
NEXT_PUBLIC_API_URL=http://localhost:4077 NEXT_PUBLIC_PANEL_URL=http://localhost:3000 npm run dev   # http://localhost:3002
```

Testimonials come from `GET /saas/public/testimonials` (managed in the Owner Console › Testimonials; only published ones show). Before going live, replace the placeholder institutions in `src/lib/trustedBy.ts` with real customers (or set `SHOW_TRUSTED_BY` to false).

The closing banner's lesson video defaults to a free Pexels clip; set `NEXT_PUBLIC_DEMO_VIDEO_URL` (and `NEXT_PUBLIC_DEMO_VIDEO_POSTER`) to the real EduPro demo video. The division counts on the home-page map (`src/lib/divisionStats.ts`) are sample numbers.

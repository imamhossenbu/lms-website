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

## Deploying (Vercel)

1. On [vercel.com](https://vercel.com) → **Add New… → Project** → import `imamhossenbu/lms-website`.
2. Framework preset **Next.js** is detected; keep the default build (`next build`) and output settings.
3. Add the environment variables below (Project → Settings → Environment Variables), then **Deploy**.
   Every push to `main` redeploys automatically.

| Variable | Needed | Example | What happens without it |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | when the backend is online | `https://api.edupro.com.bd` | Plans, blog, testimonials and stats show their empty states; the contact form says it isn't connected yet |
| `NEXT_PUBLIC_PANEL_URL` | when the admin panel is online | `https://app.edupro.com.bd` | "Start free trial" / "Sign in" go to the contact page instead |
| `NEXT_PUBLIC_SITE_URL` | once you have a domain | `https://edupro.com.bd` | Uses the Vercel production domain (`*.vercel.app`) for the sitemap and share images |
| `NEXT_PUBLIC_DEMO_VIDEO_URL`, `NEXT_PUBLIC_DEMO_VIDEO_POSTER` | optional | | Plays the default Pexels lesson clip |
| `NEXT_PUBLIC_SOCIAL_FACEBOOK` / `_YOUTUBE` / `_LINKEDIN` / `_X` | optional | | Footer social icons are shown but not clickable |
| `NEXT_PUBLIC_LEGAL_ENTITY`, `NEXT_PUBLIC_LEGAL_ADDRESS` | before launch | | Legal pages don't show the company line |

`NEXT_PUBLIC_*` values are baked in at build time — redeploy after changing them.
When the backend goes online, also add the website's domain to its `CORS_ORIGINS`.

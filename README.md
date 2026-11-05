# lms-website

EduPro's marketing website — home, features, pricing and contact.

- Next.js 16 + Tailwind 4, the admin panel's design tokens (`src/app/globals.css`) and framer-motion.
- Plans come from `GET /saas/public/plans`, platform stats from `GET /saas/public/stats`, the contact form posts to `POST /saas/public/contact` (lms-ai-backend).
- Trial buttons open the admin panel's `/signup?plan=&cycle=`.

```bash
npm install
NEXT_PUBLIC_API_URL=http://localhost:4077 NEXT_PUBLIC_PANEL_URL=http://localhost:3000 npm run dev   # http://localhost:3002
```

Before going live: replace the placeholder institutions in `src/lib/trustedBy.ts` and the testimonials in `src/lib/testimonials.ts` with real, approved customers (testimonials are hidden in production builds until then).

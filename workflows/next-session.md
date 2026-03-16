# Next Session Goals
_Last updated: 2026-03-16_

## ✅ Completed
- Rebranded Carlos → Carol throughout (copy, code, docs)
- Full Spanish translation of entire site
- Carol's name featured prominently in hero headline
- Peach accent (#F5C6AA) added visibly throughout (eyebrow pill, icon circles, image tints, footer text)
- Feminine design touch: softer corners (rounded-3xl), warmer copy voice, 👩‍🍳 emoji
- Build verified with zero TypeScript errors

---

## Priority 1 — Add real assets (photos)
- [ ] **Food photos** — Carol photographs her arepas and pan relleno with a phone (natural light works great)
  - Short-term fallback: Unsplash/Pexels — search "arepa", "pan de bono", "Colombian food"
  - Replace `image_url: 'test'` in `lib/constants.ts` for `pan_pollo` and `pan_carne`
  - Recommended size: 800×600px minimum, square or 4:3 ratio
- [ ] **Owner photo** — replace `/public/woman.jpg` placeholder with a real photo of Carol
  - Used in `AboutCarol.tsx` — aspect ratio 4:5, so a portrait shot works best
- [ ] Check all `next/image` usages still have correct `alt` text once real photos are in

## Priority 2 — Test Stripe checkout + email confirmation
- [ ] Add missing env vars to `.env.local`:
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — from Stripe dashboard → Developers → API keys
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
  - `STRIPE_WEBHOOK_SECRET` — create a webhook in Stripe → Webhooks pointing to `/api/webhooks/stripe`
  - `RESEND_API_KEY` — also need a verified sending domain in Resend
- [ ] Run the SQL in `workflows/supabase-schema.md` in Supabase SQL Editor to create `orders` and `order_items` tables
- [ ] Test full checkout with Stripe test card `4242 4242 4242 4242`, any future expiry, any CVC
- [ ] Confirm order row appears in Supabase `orders` table after payment
- [ ] Confirm email confirmation arrives with correct Spanish copy and Carol's name
- [ ] Fix order cutoff bug (Priority 7 below) during this phase

## Priority 3 — Design iteration / layout tweaks
- [ ] Review all sections at desktop + 375px mobile for any spacing or layout issues
- [ ] Hero: consider adding a real food photo (background or large side image) once assets arrive
- [ ] MenuPreview cards: review once real product photos are in — may need aspect ratio adjustments
- [ ] General polish pass after Carol's feedback on the live site

## Priority 4 — Real links (Instagram + call button)
- [ ] **Instagram:** replace placeholder URL in `lib/constants.ts` → `INSTAGRAM_URL`
  - Used in Navbar, Footer, and confirmation page "Cuéntale a un amigo 📸" button
- [ ] **Call / WhatsApp button:** add a tap-to-call or WhatsApp button so customers can reach Carol directly
  - Options: floating sticky button (bottom-right), or add to footer + hero
  - Call format: `tel:+1XXXXXXXXXX`
  - WhatsApp format: `https://wa.me/1XXXXXXXXXX`
  - Recommendation: floating WhatsApp button — most common for this audience
- [ ] Replace `123 Main St, Your City` pickup address in `app/order/confirmation/page.tsx` and `app/checkout/page.tsx`

## Priority 5 — Language toggle (English / Spanish)
- [ ] Simple approach: `useState` toggle in the navbar (`ES | EN`) duplicating copy in both languages
- [ ] Scalable approach: `next-intl` library with locale routing — migrate later if needed
- [ ] Default language is already Spanish — English is secondary

## Priority 6 — Bug: order window enforcement
- Order window is **6am–9pm**. Bug: user can add items to cart before 9pm, then the cutoff passes, and they can still proceed to checkout.
- Fix: validate cutoff in the checkout API route (`app/api/checkout/route.ts`) and block new PaymentIntents outside the window
- Also block the "Agregar al pedido" button client-side after 9pm and before 6am
- Future: accept same-day pickup orders if Carol wants to open that option

## Priority 7 — Go live
- [ ] Point custom domain to Vercel deployment
- [ ] Set all env vars in Vercel dashboard (same as `.env.local`)
- [ ] Enable Stripe webhook in production (separate from test webhook)
- [ ] Smoke test full order flow on production before sharing with Carol

---

## Env vars still missing from `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=   ← get from Stripe dashboard
STRIPE_WEBHOOK_SECRET=                ← set up in Stripe → Webhooks
RESEND_API_KEY=
```
`STRIPE_SECRET_KEY` is already set. ✓

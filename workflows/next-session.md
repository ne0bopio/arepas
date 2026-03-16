# Next Session Goals
_Last updated: 2026-03-15_

## Priority 1 — Test the full order flow
- [ ] Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env.local` (get from Stripe dashboard → Developers → API keys)
- [ ] Add Supabase keys to `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
- [ ] Run the SQL in `workflows/supabase-schema.md` in the Supabase SQL Editor to create the `orders` and `order_items` tables
- [ ] Test full checkout with Stripe test card `4242 4242 4242 4242`, any future expiry, any CVC
- [ ] Confirm the order row appears in Supabase `orders` table after payment
- [ ] Test email confirmation — add `RESEND_API_KEY` and verify the email arrives (need a verified sending domain in Resend)

## Priority 2 — Improve the Hero section
- [ ] Rewrite headline — make it more personal and emotional (Carol's story, not just the product)
- [ ] Consider adding a real food photo as the hero background or a large side image
- [ ] Review CTA copy — "Order Now" is fine but test "Order for Tomorrow" or "Pre-order Today"
- [ ] Tighten the cutoff reminder text — shorter, more urgent

## Priority 3 — Copywriting pass (whole site)
- [ ] All copy is placeholder-quality — do a full pass with Carol's real voice
- [ ] About section: replace generic text with Carol's actual story
- [ ] Product descriptions: make them more vivid and appetizing
- [ ] Footer tagline: "Hecho con amor, listo mañana" — confirm Carol likes it
- [ ] Replace `123 Main St, Your City` pickup address in `app/checkout/page.tsx` and `app/order/confirmation/page.tsx`
- [ ] Replace placeholder Instagram URL in `lib/constants.ts`

## Priority 4 — Language toggle (English / Spanish)
- [ ] Options to consider:
  - **Simple:** duplicate the copy in both languages, toggle with a `useState` + a `ES | EN` button in the navbar
  - **Scalable:** use `next-intl` library with locale routing (`/en/...`, `/es/...`)
  - **Recommendation:** start with the simple toggle since the site is small — can migrate to `next-intl` later if needed
- [ ] Decide which language is the default (likely Spanish for Carol's core audience, English secondary)

## Priority 5 — Contact / reach Carol more easily
- [ ] Add a WhatsApp link in the footer or hero (most common for this audience) — format: `https://wa.me/1XXXXXXXXXX`
- [ ] Consider a simple contact section or sticky WhatsApp button (floating bottom-right)
- [ ] If Carol wants an email form, add a `/api/contact` route using Resend

## Priority 6 — Better digital assets (food photos)
- [ ] Options for getting real photos:
  - **Best:** Carol cooks a batch and photographs with a phone — natural light, close-up shots work great
  - **Good:** Use a food photographer for a one-time shoot (~$150–300)
  - **Short-term:** Curated free photos from [Unsplash](https://unsplash.com) or [Pexels](https://pexels.com) — search "arepa", "pan relleno", "Colombian food"
  - **AI-generated:** Midjourney or DALL·E for placeholder-quality images while waiting for real ones
- [ ] Replace `image_url: 'test'` in `lib/constants.ts` for `pan_pollo` and `pan_carne` as soon as photos are ready
- [ ] Recommended image size: at least 800×600px, square or 4:3 ratio works best for the cards


## Priority 7 - Bug when choosing what to order

  - order closes after 9pm but you can add items before going to the checkout cart, if something was added then you can keep adding and even move to the checkout page, which is not allowable after 9pm. available between 6am till 8pm. no orders between 8pm and 6am. so we know how much ingredients to buy in order to make the batch at 3-4am for the orders of the day.

  - in the future maybe they can accept orders for pick up.

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

# API Integrations

## Stripe
- **Purpose:** Payment processing for pre-orders
- **Auth:** Secret key (server only), Publishable key (client)
- **Flow:**
  1. `POST /api/checkout/create-intent` — creates PaymentIntent on server
  2. Stripe Payment Element renders client-side with `client_secret`
  3. Customer submits → `stripe.confirmPayment()` client-side
  4. On success → `POST /api/orders/confirm` verifies server-side before inserting order
  5. Webhook at `POST /api/webhooks/stripe` handles edge cases
- **API version:** `2025-02-24.acacia`
- **Test card:** `4242 4242 4242 4242`, any future date, any CVC
- **Gotchas:**
  - Never trust client-side totalCents — always verify against Stripe's `paymentIntent.amount`
  - Webhook requires raw body — do not use bodyParser
  - Add Stripe webhook endpoint URL in Stripe Dashboard for production

## Supabase
- **Purpose:** Orders database + admin auth
- **Auth:** Service role key (server only), Anon key (client for auth only)
- **Gotchas:**
  - `SUPABASE_SERVICE_ROLE_KEY` must never be used client-side
  - Use `@supabase/ssr` — not `@supabase/supabase-js` directly — for cookie-based auth

## Resend
- **Purpose:** Order confirmation emails
- **Auth:** API key (server only)
- **Trigger:** Called inside `/api/orders/confirm` after successful order insert
- **Sender domain:** Must be verified in Resend dashboard before going live
- **Gotchas:**
  - Email failures should not block order confirmation — wrap in try/catch
  - TODO: Set up `orders@arepasymas.com` or similar in Resend

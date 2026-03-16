# Architectural Decisions

## 2026-03-15 — Initial scaffold

### Cart state: React Context + useReducer (no Zustand/Jotai)
The cart is simple (3 products, small quantities). A context + reducer is sufficient and avoids an extra dependency.

### No localStorage persistence for cart
Intentional — the session is short (browse → order → checkout in one sitting). Persisting an expired cart could confuse returning visitors. Revisit if users report losing carts.

### Stripe PaymentIntent created on checkout page mount
Rather than on "proceed to checkout" click. This means we create intents that may be abandoned, but it ensures the payment form is ready instantly when the user arrives. Stripe abandoned PI cleanup is automatic.

### Server-side order confirmation, not webhook-primary
The flow is: client confirms → call `/api/orders/confirm` → server verifies Stripe. The webhook is a backup for edge cases (network drop after payment). This is simpler and more reliable for small volume.

### Admin uses Supabase service role key (not anon + RLS)
The admin page is a Server Component that reads all orders. Using service role key server-side is appropriate here. The RLS policies are still in place for the public-facing insert path.

### Products hardcoded in constants.ts, not fetched from Supabase `products` table
For launch, products don't change. Fetching from DB adds latency and a dependency on the products table being populated. Once prices are confirmed and an admin needs to toggle availability, switch to DB fetch.

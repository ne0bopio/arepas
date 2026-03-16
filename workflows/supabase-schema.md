# Supabase Schema

## Tables

### `orders`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | default gen_random_uuid() |
| created_at | timestamptz | default now() |
| customer_name | text NOT NULL | |
| customer_email | text NOT NULL | |
| customer_phone | text | nullable |
| order_date | date NOT NULL | the batch date (tomorrow) |
| status | text | 'paid' \| 'ready' \| 'picked_up' — default 'paid' |
| stripe_payment_id | text | Stripe PaymentIntent ID |
| total_cents | integer NOT NULL | |

### `order_items`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | default gen_random_uuid() |
| order_id | uuid | FK → orders(id) |
| product_id | text NOT NULL | 'arepa' \| 'pan_pollo' \| 'pan_carne' |
| quantity | integer NOT NULL | |
| unit_price_cents | integer NOT NULL | |

### `products`
| Column | Type | Notes |
|--------|------|-------|
| id | text PK | 'arepa' \| 'pan_pollo' \| 'pan_carne' |
| name | text NOT NULL | |
| description | text | |
| price_cents | integer NOT NULL | |
| available | boolean | default true |
| image_url | text | |

## RLS Policies

### `products`
- **Public read:** `SELECT` allowed for all (anon)
- **Authenticated write:** `INSERT/UPDATE/DELETE` allowed for authenticated users only

### `orders`
- **Insert allowed for all:** Anyone can place an order (anon INSERT)
- **Read only for authenticated:** Only admin can read orders

### `order_items`
- **Insert allowed for all:** Anyone can insert (as part of order flow)
- **Read only for authenticated:** Admin only

## Storage
Bucket: `product-images` — public read, authenticated write

## Auth
Single admin user (Carol). Created manually in Supabase Auth dashboard.

## SQL to run in Supabase SQL editor

```sql
-- orders
create table orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  order_date date not null,
  status text default 'paid' check (status in ('paid', 'ready', 'picked_up')),
  stripe_payment_id text,
  total_cents integer not null
);

-- order_items
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id text not null,
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null
);

-- RLS
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Anyone can insert orders" on orders for insert to anon with check (true);
create policy "Admin reads orders" on orders for select to authenticated using (true);
create policy "Admin updates orders" on orders for update to authenticated using (true);

create policy "Anyone can insert order_items" on order_items for insert to anon with check (true);
create policy "Admin reads order_items" on order_items for select to authenticated using (true);
```

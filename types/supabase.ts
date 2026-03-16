export type OrderStatus = 'paid' | 'ready' | 'picked_up'

export interface DbOrder {
  id: string
  created_at: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  order_date: string
  status: OrderStatus
  stripe_payment_id: string | null
  total_cents: number
}

export interface DbOrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price_cents: number
}

export interface DbProduct {
  id: string
  name: string
  description: string | null
  price_cents: number
  available: boolean
  image_url: string | null
}

export interface DbOrderWithItems extends DbOrder {
  order_items: DbOrderItem[]
}

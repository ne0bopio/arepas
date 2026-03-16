import { ProductId } from '@/lib/constants'

export interface Product {
  id: ProductId
  name: string
  description: string
  price_cents: number
  image_url: string
  available?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  totalCents: number
  totalItems: number
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
}

export interface OrderPayload {
  customer: CustomerInfo
  items: { product_id: ProductId; quantity: number; unit_price_cents: number }[]
  paymentIntentId: string
  orderDate: string
  totalCents: number
}

export type OrderStatus = 'paid' | 'ready' | 'picked_up'

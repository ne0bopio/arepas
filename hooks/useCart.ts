'use client'

import { createContext, useContext, useReducer } from 'react'
import { Cart, CartItem, Product } from '@/types'

// --- Reducer ---

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; productId: string }
  | { type: 'SET_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR' }

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((i) => i.product.id === action.product.id)
      if (existing) {
        return state.map((i) =>
          i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...state, { product: action.product, quantity: 1 }]
    }
    case 'REMOVE':
      return state.filter((i) => i.product.id !== action.productId)
    case 'SET_QUANTITY': {
      if (action.quantity <= 0) return state.filter((i) => i.product.id !== action.productId)
      return state.map((i) =>
        i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
      )
    }
    case 'CLEAR':
      return []
    default:
      return state
  }
}

function computeCart(items: CartItem[]): Cart {
  return {
    items,
    totalCents: items.reduce((sum, i) => sum + i.product.price_cents * i.quantity, 0),
    totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
  }
}

// --- Context ---

export interface CartContextValue extends Cart {
  add: (product: Product) => void
  remove: (productId: string) => void
  setQuantity: (productId: string, qty: number) => void
  clear: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

// --- Hook for building a provider (used in CartProvider component) ---

export function useCartReducer() {
  const [items, dispatch] = useReducer(cartReducer, [])
  const cart = computeCart(items)

  return {
    ...cart,
    add: (product: Product) => dispatch({ type: 'ADD', product }),
    remove: (productId: string) => dispatch({ type: 'REMOVE', productId }),
    setQuantity: (productId: string, qty: number) =>
      dispatch({ type: 'SET_QUANTITY', productId, quantity: qty }),
    clear: () => dispatch({ type: 'CLEAR' }),
  }
}

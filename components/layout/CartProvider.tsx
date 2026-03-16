'use client'

import { CartContext, useCartReducer } from '@/hooks/useCart'

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useCartReducer()
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}

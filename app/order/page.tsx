'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { PRODUCTS } from '@/lib/constants'
import { formatCents, getTomorrowLabel, isCutoffPassed, msUntilCutoff } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { Product } from '@/types'
import { fadeUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'

function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return url.startsWith('/')
  }
}

function CutoffCountdown() {
  const [timeLeft, setTimeLeft] = useState<string | null>(null)
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    function update() {
      const ms = msUntilCutoff()
      if (ms === null) {
        setPassed(true)
        setTimeLeft(null)
        return
      }
      const h = Math.floor(ms / 3600000)
      const m = Math.floor((ms % 3600000) / 60000)
      const s = Math.floor((ms % 60000) / 1000)
      setTimeLeft(`${h}h ${m}m ${s}s`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  if (passed) {
    return (
      <div className="bg-[#C0392B]/10 border border-[#C0392B]/20 rounded-xl p-4 text-center">
        <p className="font-semibold text-[#C0392B]">Los pedidos están cerrados por hoy.</p>
        <p className="text-sm text-[#1A1A1A]/60 mt-1">
          Vuelve antes de las 9pm para ordenar el próximo lote.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-xl p-4 text-center">
      <p className="text-sm text-[#1A1A1A]/60">Pedidos cierran en</p>
      <p className="text-2xl font-bold text-[#1A1A1A] font-mono">{timeLeft ?? '...'}</p>
      <p className="text-sm text-[#1A1A1A]/60 mt-1">
        for <span className="font-semibold">{getTomorrowLabel()}</span>&apos;s batch
      </p>
    </div>
  )
}

function QuantitySelector({
  value,
  onChange,
}: {
  value: number
  onChange: (n: number) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(value - 1)}
        className="w-8 h-8 rounded-full border border-black/20 hover:border-black/50 flex items-center justify-center text-lg font-bold transition-colors"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-6 text-center font-semibold">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-8 h-8 rounded-full border border-black/20 hover:border-black/50 flex items-center justify-center text-lg font-bold transition-colors"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}

export default function OrderPage() {
  const { items, totalCents, totalItems, add, setQuantity, remove } = useCart()
  const products = PRODUCTS as unknown as Product[]
  const cutoffPassed = isCutoffPassed()

  return (
    <div className="min-h-screen bg-[#FDFAF4] pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-10">
          <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase text-[#2D6A4F] mb-2">
            Comida colombiana fresca
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold text-[#1A1A1A]"
            style={{ fontFamily: 'var(--font-lora)' }}
          >
            Arma tu pedido
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[#1A1A1A]/60 mt-2">
            Pedido para <span className="font-semibold text-[#1A1A1A]">{getTomorrowLabel()}</span>
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Product list */}
          <div className="lg:col-span-2 space-y-4">
            {products.map((product) => {
              const cartItem = items.find((i) => i.product.id === product.id)
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-4 sm:p-6 flex gap-4 sm:gap-6 items-center border border-black/5 shadow-sm"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#F5A623]/10">
                    {isValidImageUrl(product.image_url) ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl" aria-hidden="true">🌽</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-[#1A1A1A] text-lg leading-tight" style={{ fontFamily: 'var(--font-lora)' }}>
                        {product.name}
                      </h3>
                      <span className="font-bold text-[#F5A623] whitespace-nowrap">
                        {formatCents(product.price_cents)}
                      </span>
                    </div>
                    <p className="text-sm text-[#1A1A1A]/50 mt-1 line-clamp-2">{product.description}</p>
                    <div className="mt-3 flex items-center gap-3">
                      {cartItem ? (
                        <>
                          <QuantitySelector
                            value={cartItem.quantity}
                            onChange={(n) =>
                              n === 0 ? remove(product.id) : setQuantity(product.id, n)
                            }
                          />
                          <span className="text-sm text-[#1A1A1A]/50">
                            = {formatCents(product.price_cents * cartItem.quantity)}
                          </span>
                        </>
                      ) : (
                        <button
                          onClick={() => add(product)}
                          disabled={cutoffPassed}
                          className="text-sm font-semibold text-[#2D6A4F] hover:text-[#235840] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          + Agregar al pedido
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <CutoffCountdown />

            <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
              <h2 className="font-bold text-lg text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-lora)' }}>
                Tu pedido
              </h2>

              {items.length === 0 ? (
                <p className="text-[#1A1A1A]/40 text-sm">Aún no has agregado nada.</p>
              ) : (
                <ul className="space-y-2 mb-4">
                  {items.map((item) => (
                    <li key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-[#1A1A1A]/70">
                        {item.quantity}× {item.product.name}
                      </span>
                      <span className="font-semibold text-[#1A1A1A]">
                        {formatCents(item.product.price_cents * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="border-t border-black/5 pt-4 flex justify-between items-center mb-6">
                <span className="font-bold text-[#1A1A1A]">Total</span>
                <span className="font-bold text-xl text-[#1A1A1A]">{formatCents(totalCents)}</span>
              </div>

              <Link href="/checkout">
                <Button
                  className="w-full"
                  size="lg"
                  disabled={totalItems === 0 || cutoffPassed}
                >
                  Ir a pagar
                </Button>
              </Link>

              {totalItems === 0 && (
                <p className="text-xs text-center text-[#1A1A1A]/40 mt-3">
                  Agrega al menos un producto para continuar
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      {totalItems > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 p-4 flex items-center justify-between gap-4 shadow-lg">
          <div>
            <p className="text-xs text-[#1A1A1A]/50">{totalItems} {totalItems !== 1 ? 'productos' : 'producto'}</p>
            <p className="font-bold text-lg text-[#1A1A1A]">{formatCents(totalCents)}</p>
          </div>
          <Link href="/checkout">
            <Button>Proceed to checkout</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

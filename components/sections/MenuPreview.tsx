'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'
import { PRODUCTS } from '@/lib/constants'
import { formatCents } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { Product } from '@/types'
import Button from '@/components/ui/Button'

function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return url.startsWith('/')
  }
}

function ProductCard({ product }: { product: Product }) {
  const { add, items } = useCart()
  const inCart = items.find((i) => i.product.id === product.id)

  return (
    <motion.div
      variants={scaleIn}
      className="bg-white rounded-3xl overflow-hidden shadow-md shadow-black/3 border border-black/5 flex flex-col hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5C6AA]/15">
        {isValidImageUrl(product.image_url) ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            // TODO: Replace with real product photos
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl" aria-hidden="true">
            🌽
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-lora)' }}>
            {product.name}
          </h3>
          <span className="text-lg font-bold text-[#F5A623] whitespace-nowrap">
            {formatCents(product.price_cents)}
          </span>
        </div>
        <p className="text-[#1A1A1A]/60 text-sm leading-relaxed mb-6 flex-1">{product.description}</p>
        <button
          onClick={() => add(product)}
          className="w-full bg-[#F5A623] hover:bg-[#e09515] text-[#1A1A1A] font-semibold py-3 rounded-full transition-all duration-200 flex items-center justify-center gap-2"
        >
          {inCart ? `Agregar otro (${inCart.quantity} en carrito)` : 'Agregar al pedido'}
        </button>
      </div>
    </motion.div>
  )
}

export default function MenuPreview() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const products = PRODUCTS as unknown as Product[]

  return (
    <section id="menu" ref={ref} className="py-24 px-4 sm:px-6 bg-[#FDFAF4]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase text-[#2D6A4F] mb-3">
            Lo que preparamos
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: 'var(--font-lora)' }}
          >
            Nuestro menú
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#1A1A1A]/60 max-w-xl mx-auto">
            Todo se hace fresco la mañana después de tu pedido. Ordena antes de las 9pm.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <Link href="/order">
            <Button size="lg" variant="secondary">
              Ver menú completo y ordenar
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

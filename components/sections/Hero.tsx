'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#FDFAF4] overflow-hidden pt-16">
      {/* Decorative background blob */}
      <div
        className="absolute top-0 right-0 w-150 h-150 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-100 h-100 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2D6A4F 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F5C6AA 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="inline-block text-sm font-semibold tracking-widest uppercase text-[#2D6A4F] mb-4 bg-[#F5C6AA]/20 px-4 py-1.5 rounded-full"
        >
          Frescas cada mañana · Hechas por pedido
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 text-[#1A1A1A]"
          style={{ fontFamily: 'var(--font-lora)' }}
        >
          Soy Carol, y cocino con amor
          <br />
          <span className="text-[#F5A623]">desde mi cocina</span> para tu mesa.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-[#1A1A1A]/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Hago arepas colombianas y pan relleno con recetas que me pasó mi familia. Ordenas esta noche, yo cocino fresco mañana temprano. Sin atajos, sin recalentar — solo lo auténtico.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/order">
            <Button size="lg">Ordenar ahora</Button>
          </Link>
          <Link href="#how-it-works">
            <Button size="lg" variant="ghost">Cómo funciona</Button>
          </Link>
        </motion.div>

        {/* Cutoff reminder */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-sm text-[#1A1A1A]/40 flex items-center justify-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#2D6A4F] inline-block" aria-hidden="true" />
          Pedidos cierran a las 9pm para el lote de mañana
        </motion.p>
      </motion.div>
    </section>
  )
}

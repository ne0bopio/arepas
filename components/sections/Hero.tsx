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
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2D6A4F 0%, transparent 70%)' }}
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
          className="inline-block text-sm font-semibold tracking-widest uppercase text-[#2D6A4F] mb-4"
        >
          Fresh every morning · Made to order
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 text-[#1A1A1A]"
          style={{ fontFamily: 'var(--font-lora)' }}
        >
          Fresh from Carlos&apos;s kitchen.
          <br />
          <span className="text-[#F5A623]">Order tonight,</span> pick up tomorrow.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-[#1A1A1A]/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Arepas and stuffed bread rolls made with real Colombian recipes. We cook exactly what&apos;s ordered — no shortcuts, no reheating. Place your order before 9pm and pick it up tomorrow morning.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/order">
            <Button size="lg">Order Now</Button>
          </Link>
          <Link href="#how-it-works">
            <Button size="lg" variant="ghost">How it works</Button>
          </Link>
        </motion.div>

        {/* Cutoff reminder */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-sm text-[#1A1A1A]/40 flex items-center justify-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#2D6A4F] inline-block" aria-hidden="true" />
          Order closes at 9pm tonight for tomorrow&apos;s batch
        </motion.p>
      </motion.div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Suspense } from 'react'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { getTomorrowLabel } from '@/lib/utils'
import Button from '@/components/ui/Button'

function ConfirmationContent() {
  const params = useSearchParams()
  const orderId = params.get('orderId')

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-xl mx-auto text-center px-4"
    >
      {/* Success icon */}
      <motion.div
        variants={fadeUp}
        className="w-24 h-24 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center text-5xl mx-auto mb-8"
      >
        ✅
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4"
        style={{ fontFamily: 'var(--font-lora)' }}
      >
        Order confirmed!
      </motion.h1>

      <motion.p variants={fadeUp} className="text-lg text-[#1A1A1A]/60 mb-2">
        Your food will be fresh and ready on
      </motion.p>
      <motion.p
        variants={fadeUp}
        className="text-xl font-bold text-[#2D6A4F] mb-8"
      >
        {getTomorrowLabel()} — from 8am
      </motion.p>

      {orderId && (
        <motion.div
          variants={fadeUp}
          className="bg-[#FDFAF4] rounded-xl p-4 mb-8 border border-black/5"
        >
          <p className="text-xs text-[#1A1A1A]/40 uppercase tracking-widest mb-1">Order ID</p>
          <p className="font-mono text-sm text-[#1A1A1A]/70 break-all">{orderId}</p>
        </motion.div>
      )}

      <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm mb-8 text-left space-y-3">
        <div className="flex gap-3">
          <span className="text-xl">📬</span>
          <div>
            <p className="font-semibold text-[#1A1A1A]">Check your email</p>
            <p className="text-sm text-[#1A1A1A]/60">
              We&apos;ve sent a confirmation with your order details and pickup info.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-xl">📍</span>
          <div>
            <p className="font-semibold text-[#1A1A1A]">Pickup location</p>
            <p className="text-sm text-[#1A1A1A]/60">
              {/* TODO: Replace with real address */}
              123 Main St, Your City — available 8am to 11am
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-xl">🌽</span>
          <div>
            <p className="font-semibold text-[#1A1A1A]">Made fresh for you</p>
            <p className="text-sm text-[#1A1A1A]/60">
              Carlos cooks exactly what&apos;s been ordered. Your food will be fresh, never reheated.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/">
          <Button variant="ghost">Back to home</Button>
        </Link>
        <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <Button variant="secondary">Tell a friend 📸</Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#FDFAF4] pt-16 flex items-center justify-center py-20">
      <Suspense fallback={<div className="text-center text-[#1A1A1A]/40">Loading...</div>}>
        <ConfirmationContent />
      </Suspense>
    </div>
  )
}

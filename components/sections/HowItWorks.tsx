'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, staggerContainer } from '@/lib/animations'

const steps = [
  {
    number: '01',
    icon: '🛒',
    title: 'Browse & order',
    description:
      'Pick your arepas or stuffed rolls, choose your quantities, and pay securely. Takes less than 2 minutes.',
  },
  {
    number: '02',
    icon: '👨‍🍳',
    title: 'We cook fresh',
    description:
      'Once orders close at 9pm, Carlos knows exactly what to cook. Every item is made fresh the next morning — nothing sitting out, nothing frozen.',
  },
  {
    number: '03',
    icon: '📦',
    title: 'Pick up tomorrow',
    description:
      'Swing by and pick up your order. You\'ll get a confirmation email with all the details.',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" ref={ref} className="py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase text-[#2D6A4F] mb-3">
            Simple as it gets
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold text-[#1A1A1A]"
            style={{ fontFamily: 'var(--font-lora)' }}
          >
            How it works
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[calc(33%+16px)] right-[calc(33%+16px)] h-px bg-[#F5A623]/30" aria-hidden="true" />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-[#FDFAF4]"
            >
              <div className="w-20 h-20 rounded-full bg-[#F5A623]/10 flex items-center justify-center text-3xl mb-6">
                {step.icon}
              </div>
              <span className="text-xs font-bold tracking-widest text-[#F5A623] uppercase mb-2">
                Step {step.number}
              </span>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-lora)' }}>
                {step.title}
              </h3>
              <p className="text-[#1A1A1A]/60 leading-relaxed text-sm">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

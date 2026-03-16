'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, staggerContainer } from '@/lib/animations'

const steps = [
  {
    number: '01',
    icon: '🛒',
    title: 'Elige y ordena',
    description:
      'Escoge tus arepas o pan relleno, elige las cantidades, y paga de forma segura. En menos de 2 minutos.',
  },
  {
    number: '02',
    icon: '👩‍🍳',
    title: 'Cocino fresco',
    description:
      'Cuando cierran los pedidos a las 9pm, sé exactamente qué cocinar. Todo se hace fresco a la mañana siguiente — nada guardado, nada congelado.',
  },
  {
    number: '03',
    icon: '📦',
    title: 'Recoges mañana',
    description:
      'Pasas a recoger tu pedido. Te llegará un email de confirmación con todos los detalles.',
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
            Así de fácil
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold text-[#1A1A1A]"
            style={{ fontFamily: 'var(--font-lora)' }}
          >
            Cómo funciona
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
              className="relative flex flex-col items-center text-center p-8 rounded-3xl bg-[#FDFAF4]"
            >
              <div className="w-20 h-20 rounded-full bg-[#F5C6AA]/20 ring-1 ring-[#F5C6AA]/30 flex items-center justify-center text-3xl mb-6">
                {step.icon}
              </div>
              <span className="text-xs font-bold tracking-widest text-[#F5A623] uppercase mb-2">
                Paso {step.number}
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

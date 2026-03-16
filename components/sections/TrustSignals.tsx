'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, staggerContainer } from '@/lib/animations'

const signals = [
  {
    icon: '🔒',
    title: 'Pago seguro',
    description: 'Todos los pagos se procesan de forma segura a través de Stripe. Nunca guardamos los datos de tu tarjeta.',
  },
  {
    icon: '🌽',
    title: 'Fresco cada mañana',
    description: 'Cada pedido se cocina fresco la mañana después de que lo haces. Nunca recalentado, nunca guardado.',
  },
  {
    icon: '✅',
    title: 'Hecho por pedido',
    description: 'Solo cocinamos exactamente lo que se pidió. Tu pago anticipado garantiza que tu comida esté lista.',
  },
  {
    icon: '📬',
    title: 'Confirmación por email',
    description: 'Recibirás una confirmación de tu pedido con la hora y los detalles de recogida justo después del pago.',
  },
]

export default function TrustSignals() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 bg-[#2D6A4F]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: 'var(--font-lora)' }}
          >
            Por qué confiar en nosotros
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {signals.map((signal) => (
            <motion.div
              key={signal.title}
              variants={fadeUp}
              className="bg-white/10 rounded-3xl p-6 text-white"
            >
              <div className="w-14 h-14 rounded-full bg-[#F5C6AA]/20 flex items-center justify-center text-2xl mb-4" aria-hidden="true">{signal.icon}</div>
              <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-lora)' }}>
                {signal.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">{signal.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stripe badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-10 flex items-center justify-center gap-2 text-white/50 text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 60 25" fill="currentColor" aria-label="Stripe">
            <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a14.08 14.08 0 01-4.88.87c-4.31 0-7.32-2.76-7.32-7.5 0-4.2 2.74-7.55 6.75-7.55 3.95 0 6.26 2.9 6.26 7.45zm-6.27-4.8c-1.1 0-2.24.66-2.24 2.34h4.44c0-1.68-1.1-2.34-2.2-2.34zM40.1 20.44c-1.64 0-2.8-.72-3.5-1.22l-.01 5.51-4.23.9V5.57h3.72l.19 1.22c.67-.77 1.98-1.5 3.74-1.5 3.36 0 6.42 2.75 6.42 7.44-.01 4.91-2.96 7.71-6.33 7.71zm-.74-11.16c-1.14 0-1.96.52-2.46 1.21l.02 5.05c.47.67 1.27 1.2 2.44 1.2 1.9 0 3.2-1.55 3.2-3.73 0-2.14-1.3-3.73-3.2-3.73zM28.32 5.28c-1.4 0-2.3.67-2.3 1.83 0 1.15.9 1.73 2.3 1.73 1.4 0 2.3-.6 2.3-1.73 0-1.16-.9-1.83-2.3-1.83zm2.1 15.13h-4.22V5.57h4.22v14.84zM21.78 5.28c-3.22 0-5.87 2.57-5.87 7.5 0 4.73 2.65 7.5 5.87 7.5 3.22 0 5.88-2.77 5.88-7.5 0-4.93-2.66-7.5-5.88-7.5zm0 11.5c-1.52 0-2.3-1.46-2.3-4 0-2.56.78-4 2.3-4 1.52 0 2.31 1.44 2.31 4 0 2.54-.79 4-2.31 4zM9.56 19.42V5.57H5.34V4.16c0-1.52.56-2.28 1.95-2.28h1.87V0H6.56C3.25 0 1.13 1.55 1.13 4.78v.79H0v3.63h1.13v10.22h4.22V9.2H9.1l1.55 10.22h4.22l-2.25-11.86c1.5-.6 2.52-2.07 2.52-4.06 0-3.04-2.18-4.73-5.5-4.73H5.34V5.57h4.22v13.85z" />
          </svg>
          Powered by Stripe — seguridad bancaria
        </motion.div>
      </div>
    </section>
  )
}

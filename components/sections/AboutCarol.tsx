'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, slideInLeft, staggerContainer } from '@/lib/animations'

export default function AboutCarol() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          {/* Photo */}
          <motion.div variants={slideInLeft} className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#F5C6AA]/15">
              {/* TODO: Replace with real photo of Carol/kitchen */}
              <Image
                src="/woman.jpg"
                alt="Carol cooking in the kitchen"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative accent */}
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-[#F5C6AA]/30 -z-10"
              aria-hidden="true"
            />
          </motion.div>

          {/* Text */}
          <div>
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold tracking-widest uppercase text-[#2D6A4F] mb-3"
            >
              Mi historia
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-6"
              style={{ fontFamily: 'var(--font-lora)' }}
            >
              Hecho a mano, con amor.
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="text-[#1A1A1A]/70 leading-relaxed space-y-4"
            >
              <p>
                ¡Hola! Soy Carol — una colombiana orgullosa que creció viendo a mi abuela
                darle forma a las arepas cada mañana antes de que saliera el sol. Ese ritmo
                — maíz, sal, amor, repetir — es algo que traje conmigo cuando llegué a este país.
              </p>
              <p>
                Empecé haciendo arepas y pan relleno para mi familia, después para amigos,
                y después para los amigos de mis amigos. Todos preguntaban lo mismo:
                &ldquo;¿Puedo pedir más?&rdquo; Así que mi esposo y yo decidimos hacerlo
                oficial. Cada lote es hecho a mano, como me enseñó mi familia.
              </p>
              <p>
                Cuando no estoy en la cocina, estoy hinchando por Colombia. ¡Vamos Selección! 🇨🇴
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 p-4 bg-[#FDFAF4] rounded-xl border-l-4 border-[#F5C6AA]"
            >
              <p className="text-sm text-[#1A1A1A]/60 italic">
                &ldquo;Comida hecha con el coraz&oacute;n — es la única forma que conozco de cocinar.&rdquo;
              </p>
              <p className="text-sm font-semibold text-[#1A1A1A] mt-1">— Carol</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, slideInLeft, staggerContainer } from '@/lib/animations'

export default function AboutCarlos() {
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
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#F5A623]/10">
              {/* TODO: Replace with real photo of Carlos/kitchen */}
              <Image
                src="/woman.jpg"
                alt="Carlos cooking in the kitchen"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative accent */}
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-[#F5A623]/20 -z-10"
              aria-hidden="true"
            />
          </motion.div>

          {/* Text */}
          <div>
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold tracking-widest uppercase text-[#2D6A4F] mb-3"
            >
              The story
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-6"
              style={{ fontFamily: 'var(--font-lora)' }}
            >
              Made by hand, with love.
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="text-[#1A1A1A]/70 leading-relaxed space-y-4"
            >
              <p>
                Hey, I&apos;m Carlos — a proud Colombian who grew up eating arepas for breakfast,
                lunch, and honestly, dinner too. I started making them for friends and the response
                was always the same: &ldquo;Can I order more for tomorrow?&rdquo; So here we are.
              </p>
              <p>
                Every morning my wife and I cook a fresh batch — arepas and pan relleno stuffed
                with chicken or beef — made the way my family taught me. No shortcuts, no
                reheating. Just real Colombian food made to order.
              </p>
              <p>
                Oh, and yes, I watch every Colombia game. ⚽
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 p-4 bg-[#FDFAF4] rounded-xl border-l-4 border-[#F5A623]"
            >
              <p className="text-sm text-[#1A1A1A]/60 italic">
                &ldquo;Real Colombian food made to order. No shortcuts, no reheating.&rdquo;
              </p>
              <p className="text-sm font-semibold text-[#1A1A1A] mt-1">— Carlos, the chef</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { NAV_LINKS, SITE_NAME } from '@/lib/constants'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFAF4]/90 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="font-serif text-xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-lora)' }}>
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/order">
            <Button size="sm">
              Ordenar
              {totalItems > 0 && (
                <span className="ml-2 bg-white/30 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile: cart count + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          {totalItems > 0 && (
            <Link href="/order">
              <span className="bg-[#F5A623] text-[#1A1A1A] rounded-full text-xs w-7 h-7 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </Link>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg hover:bg-black/5 transition-colors"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={cn('block h-0.5 bg-[#1A1A1A] rounded transition-all', open && 'rotate-45 translate-y-1.5')} />
              <span className={cn('block h-0.5 bg-[#1A1A1A] rounded transition-all', open && 'opacity-0')} />
              <span className={cn('block h-0.5 bg-[#1A1A1A] rounded transition-all', open && '-rotate-45 -translate-y-1.5')} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-black/5 bg-[#FDFAF4] px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-[#1A1A1A]/80 hover:text-[#1A1A1A]"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/order" onClick={() => setOpen(false)}>
            <Button className="w-full">Order Now</Button>
          </Link>
        </div>
      )}
    </header>
  )
}

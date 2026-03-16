import type { Metadata } from 'next'
import { Lora, Inter } from 'next/font/google'
import './globals.css'
import CartProvider from '@/components/layout/CartProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Arepas y más — Hecha con amor, desde la cocina de Carol',
  description:
    'Ordena arepas colombianas y pan relleno, hechos frescos cada mañana por Carol. Ordena antes de las 9pm para el lote de mañana.',
  openGraph: {
    title: 'Arepas y más',
    description: 'Comida colombiana fresca, hecha por pedido. Ordena esta noche, recoge mañana.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${lora.variable} ${inter.variable}`}>
      <body className="font-sans antialiased" style={{ fontFamily: 'var(--font-inter)' }}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}

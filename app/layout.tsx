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
  title: 'Arepas y más — Fresh from Carlos\'s kitchen',
  description:
    'Order Colombian arepas and stuffed bread rolls made fresh every morning. Pre-order by 9pm for tomorrow\'s batch.',
  openGraph: {
    title: 'Arepas y más',
    description: 'Fresh Colombian food, made to order. Order tonight, pick up tomorrow.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable}`}>
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

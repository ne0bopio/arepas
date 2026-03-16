export const SITE_NAME = 'Arepas y más'
export const SITE_TAGLINE = 'Hecho con amor, listo mañana'
export const CUTOFF_HOUR = 21 // 9pm

export const NAV_LINKS = [
  { label: 'Menu', href: '/#menu' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'About', href: '/#about' },
]

export const PRODUCTS = [
  {
    id: 'arepa',
    name: 'Arepa',
    description:
      'A classic Colombian corn arepa, golden on the outside, soft in the middle. Simple, perfect, and made fresh every morning.',
    price_cents: 350,
    image_url: '/arepas.png', // TODO: Replace with real image URL
  },
  {
    id: 'pan_pollo',
    name: 'Pan Relleno de Pollo',
    description:
      'A soft baked bread roll generously stuffed with seasoned shredded chicken. The kind you eat and immediately want another.',
    price_cents: 450,
    image_url: '/pollo.jpg', // TODO: Replace with real image URL
  },
  {
    id: 'pan_carne',
    name: 'Pan Relleno de Carne',
    description:
      'Warm baked bread loaded with seasoned ground beef. Comfort food at its finest.',
    price_cents: 450,
    image_url: '/pasteles.jpg', // TODO: Replace with real image URL
  },
] as const

export type ProductId = (typeof PRODUCTS)[number]['id']

export const PICKUP_ADDRESS = '123 Main St, Your City' // TODO: Replace with Carlos's real pickup address
export const INSTAGRAM_URL = 'https://instagram.com/arepasymas' // TODO: Replace with real handle

export const SITE_NAME = 'Arepas y más'
export const SITE_TAGLINE = 'Hecho con amor, listo mañana'
export const CUTOFF_HOUR = 21 // 9pm

export const NAV_LINKS = [
  { label: 'Menú', href: '/#menu' },
  { label: 'Cómo funciona', href: '/#how-it-works' },
  { label: 'Sobre mí', href: '/#about' },
]

export const PRODUCTS = [
  {
    id: 'arepa',
    name: 'Arepa',
    description:
      'Mi clásica arepa colombiana de maíz — dorada y crujiente por fuera, suave y calientita por dentro. Hecha fresca cada mañana, como me enseñó mi abuela.',
    price_cents: 350,
    image_url: '/arepas.png', // TODO: Replace with real image URL
  },
  {
    id: 'pan_pollo',
    name: 'Pan Relleno de Pollo',
    description:
      'Un pan suave horneado, relleno generosamente con mi pollo desmenuzado y sazonado. De esos que te comes uno y quieres otro.',
    price_cents: 450,
    image_url: '/pollo.jpg', // TODO: Replace with real image URL
  },
  {
    id: 'pan_carne',
    name: 'Pan Relleno de Carne',
    description:
      'Pan calientito horneado, lleno de mi carne molida sazonada. Comida del alma — igualita a la de casa.',
    price_cents: 450,
    image_url: '/pasteles.jpg', // TODO: Replace with real image URL
  },
] as const

export type ProductId = (typeof PRODUCTS)[number]['id']

export const PICKUP_ADDRESS = '123 Main St, Your City' // TODO: Replace with Carol's real pickup address
export const INSTAGRAM_URL = 'https://instagram.com/arepasymas' // TODO: Replace with real handle

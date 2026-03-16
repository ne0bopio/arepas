import Hero from '@/components/sections/Hero'
import HowItWorks from '@/components/sections/HowItWorks'
import MenuPreview from '@/components/sections/MenuPreview'
import AboutCarlos from '@/components/sections/AboutCarlos'
import TrustSignals from '@/components/sections/TrustSignals'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <MenuPreview />
      <AboutCarlos />
      <TrustSignals />
    </main>
  )
}

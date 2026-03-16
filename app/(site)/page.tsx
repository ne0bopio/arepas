import Hero from '@/components/sections/Hero'
import HowItWorks from '@/components/sections/HowItWorks'
import MenuPreview from '@/components/sections/MenuPreview'
import AboutCarol from '@/components/sections/AboutCarol'
import TrustSignals from '@/components/sections/TrustSignals'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <MenuPreview />
      <AboutCarol />
      <TrustSignals />
    </main>
  )
}

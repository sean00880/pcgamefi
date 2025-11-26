import { Navbar } from '@/components/Navbar'
import {
  Hero100vh,
  Stats100vh,
  Features100vh,
  Projects100vh,
  Tokenomics100vh,
  HowItWorks100vh,
  Partners100vh,
  CTA100vh,
  Footer100vh
} from '@/components/sections'
import { AiAssistant } from '@/components/AiAssistant'

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />

      {/* 100vh Hero Section */}
      <Hero100vh />

      {/* 100vh Stats Section */}
      <Stats100vh />

      {/* 100vh Features Section */}
      <Features100vh />

      {/* 100vh Projects/IGO Section */}
      <Projects100vh />

      {/* 100vh Tokenomics Section */}
      <Tokenomics100vh />

      {/* 100vh How It Works Section */}
      <HowItWorks100vh />

      {/* 100vh Partners & Testimonials Section */}
      <Partners100vh />

      {/* 100vh CTA Section */}
      <CTA100vh />

      {/* Footer */}
      <Footer100vh />

      {/* AI Assistant */}
      <AiAssistant />
    </main>
  )
}

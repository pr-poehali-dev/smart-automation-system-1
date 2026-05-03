import Header from "./Header"
import Hero from "./Hero"
import Projects from "./Projects"
import Services from "./Services"
import Pricing from "./Pricing"
import Faq from "./Faq"
import CallToAction from "./CallToAction"
import Footer from "./Footer"
import type { LandingPageProps } from "./types"

export { Header, Hero, Projects, Services, Pricing, Faq, CallToAction, Footer }

export default function LandingPage({ showHeader = true, showFooter = true }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      {showHeader && <Header />}
      <div className="container pt-4">
        <Hero />
        <Services />
        <Projects />
        <Pricing />
        <Faq />
        <CallToAction />
      </div>
      {showFooter && <Footer />}
    </main>
  )
}

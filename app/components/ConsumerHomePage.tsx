import Hero from "./Hero"
import Features from "./Features"
import CompareLendersSection from "./CompareLendersSection"
import Process from "./Process"
import Benefits from "./Benefits"
import AustralianStats from "./AustralianStats"
import Testimonials from "./Testimonials"
import FAQ from "./FAQ"
import Footer from "./Footer"
import Header from "./Header"

export default function ConsumerHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <CompareLendersSection />
      <Process />
      <Benefits />
      <AustralianStats />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  )
}

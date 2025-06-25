import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import ToolsGrid from '@/components/ToolsGrid'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <ToolsGrid />
      <Footer />
    </main>
  )
} 
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact />
      <FAQ />
    </main>
  )
}
                                                
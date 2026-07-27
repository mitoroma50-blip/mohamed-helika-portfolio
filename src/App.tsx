import { motion, useScroll, useSpring } from 'framer-motion';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { FeaturedProject } from '@/components/sections/FeaturedProject';
import { Certificates } from '@/components/sections/Certificates';
import { Contact } from '@/components/sections/Contact';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-steel-400 via-cyan-glow to-steel-600"
      />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <FeaturedProject />
        <Certificates />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems, profile } from '@/data/portfolio';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { downloadCv } from '@/lib/cv';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a
          href="#top"
          className={`flex items-center gap-3 rounded-full px-4 py-2 transition-all duration-300 ${
            scrolled ? 'glass' : ''
          }`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-steel-400 to-steel-700 font-display text-sm font-bold text-white shadow-glow">
            <img src="/mohamed-helika-portfolio/assets/profile/logo.png"
  alt="Mohamed Helika Logo"
  className="h-14 w-14 object-contain"
/>
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-wide text-white sm:block">
            Mohamed Helika
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          className={`hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-300 md:flex ${
            scrolled ? 'glass' : 'glass border-white/5'
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={downloadCv}
            className="hidden rounded-full bg-gradient-to-r from-steel-500 to-steel-700 px-5 py-2 text-sm font-semibold text-white shadow-glow transition hover:from-steel-400 hover:to-steel-600 md:inline-flex"
          >
            Download CV
          </button>
          <ThemeToggle />
          <button
            className="grid h-10 w-10 place-items-center rounded-full glass text-white md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mt-2 overflow-hidden rounded-2xl glass-strong md:hidden"
          >
            <div className="flex flex-col p-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  downloadCv();
                }}
                className="mt-1 rounded-xl bg-gradient-to-r from-steel-500 to-steel-700 px-4 py-3 text-base font-semibold text-white"
              >
                Download CV
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

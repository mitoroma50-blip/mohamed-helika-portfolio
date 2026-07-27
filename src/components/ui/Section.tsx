import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { staggerContainer } from './Reveal';

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-7xl px-6 py-24 md:py-32 ${className}`}
    >
      <div className="mb-14 max-w-3xl">
        {eyebrow && (
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-steel-500/30 bg-steel-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-steel-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-glow" />
              {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">
              {description}
            </p>
          </Reveal>
        )}
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {children}
      </motion.div>
    </section>
  );
}

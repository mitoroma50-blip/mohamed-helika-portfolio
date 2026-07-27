import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { staggerItem } from '@/components/ui/Reveal';
import { skills } from '@/data/portfolio';

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title="Engineering Toolkit"
      description="Software and methods used across the design, simulation and optimization workflow."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.name}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="group relative overflow-hidden rounded-2xl glass p-6 shadow-glass"
            >
              {/* Accent glow */}
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${skill.accent} blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-cyan-glow ring-1 ring-white/10 transition group-hover:bg-steel-500/20 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {skill.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {skill.description}
                </p>
              </div>

              {/* Bottom sheen line */}
              <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-steel-400/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

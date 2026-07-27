import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Check, User } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { staggerItem } from '@/components/ui/Reveal';
import { timeline, profile, type TimelineEntry } from '@/data/portfolio';
import { PROFILE_IMAGE } from '@/lib/assets';

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Education & Experience"
      description="A foundation in production and mechanical design engineering, sharpened by field internships with leading industrial and energy organizations."
    >
      {/* Portrait + intro */}
      <motion.div
        variants={staggerItem}
        className="mb-14 flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-10"
      >
        <div className="relative shrink-0">
          <div className="absolute -inset-3 rounded-full bg-steel-600/20 blur-2xl" />
          {PROFILE_IMAGE ? (
            <img
              src={PROFILE_IMAGE}
              alt={profile.name}
              className="relative h-32 w-32 rounded-2xl object-cover shadow-glow ring-1 ring-white/10 md:h-36 md:w-36"
            />
          ) : (
            <div className="relative grid h-32 w-32 place-items-center rounded-2xl glass text-slate-400 shadow-glass md:h-36 md:w-36">
              <User className="h-10 w-10" />
            </div>
          )}
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
          <span className="font-semibold text-white">{profile.name}</span> —{' '}
          {profile.tagline}
        </p>
      </motion.div>

      <div className="relative">
        {/* Center spine */}
        <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-steel-500/60 via-steel-700/30 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-10">
          {timeline.map((entry, i) => (
            <TimelineRow key={entry.title} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function TimelineRow({ entry, index }: { entry: TimelineEntry; index: number }) {
  const isLeft = index % 2 === 0;
  const Icon = entry.type === 'education' ? GraduationCap : Briefcase;

  return (
    <motion.div
      variants={staggerItem}
      className={`relative flex items-start gap-6 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Node */}
      <div className="absolute left-4 top-1 z-10 -translate-x-1/2 md:left-1/2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-steel-500 to-steel-800 text-white shadow-glow ring-4 ring-ink-950">
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>

      {/* Spacer for desktop alternating layout */}
      <div className="hidden md:block md:w-1/2" />

      {/* Card */}
      <div className="ml-12 w-full md:ml-0 md:w-1/2 md:px-8">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="glass rounded-2xl p-6 shadow-glass"
        >
          <span className="inline-flex rounded-full border border-steel-500/30 bg-steel-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-steel-300">
            {entry.period}
          </span>
          <h3 className="mt-3 font-display text-xl font-semibold text-white">
            {entry.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-steel-300">{entry.org}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {entry.description}
          </p>
          <ul className="mt-4 space-y-2">
            {entry.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-glow" />
                {h}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

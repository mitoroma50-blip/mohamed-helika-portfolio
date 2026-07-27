import { motion } from 'framer-motion';
import { Download, ArrowDown, FolderGit2, MapPin } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { downloadCv } from '@/lib/cv';

const ease = [0.21, 0.5, 0.32, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left: text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-steel-500/30 bg-steel-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-steel-300"
          >
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-cyan-glow shadow-glow" />
            <MapPin className="h-3.5 w-3.5" /> {profile.location}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            {profile.name.split(' ').slice(0, 2).join(' ')}{' '}
            <span className="text-gradient-blue">
              {profile.name.split(' ').slice(2).join(' ')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-5 font-display text-xl font-semibold text-slate-100 sm:text-2xl"
          >
            {profile.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {profile.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={downloadCv}
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-steel-500 to-steel-700 px-7 py-3.5 text-sm font-semibold text-white shadow-glow-lg transition hover:from-steel-400 hover:to-steel-600"
            >
              <Download className="h-4.5 w-4.5 transition group-hover:translate-y-0.5" />
              Download CV
            </button>
            <a
              href="#project"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-steel-400/50 hover:bg-white/10"
            >
              <FolderGit2 className="h-4.5 w-4.5 transition group-hover:rotate-6" />
              View Projects
            </a>
          </motion.div>

          {/* Scroll cue */}
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-14 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-steel-300"
          >
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15"
            >
              <ArrowDown className="h-4 w-4" />
            </motion.span>
            Scroll to explore
          </motion.a>
        </div>

        {/* Right: floating engineering visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="relative hidden lg:block"
        >
        <div className="relative">
  <img
    src="/assets/profile/profile.jpg"
    alt="Mohamed Helika"
    className="rounded-3xl border border-white/20 shadow-glow-lg"
  />
</div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative aspect-square">
      {/* Glow */}
      <div className="absolute inset-8 rounded-full bg-steel-600/20 blur-3xl" />

      {/* Outer rotating ring with tick marks */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <circle
            cx="200"
            cy="200"
            r="190"
            fill="none"
            stroke="rgba(96,165,250,0.18)"
            strokeWidth="1"
          />
          {Array.from({ length: 60 }).map((_, i) => {
            const a = (i * 360) / 60;
            const r = (a * Math.PI) / 180;
            const x1 = 200 + Math.cos(r) * 184;
            const y1 = 200 + Math.sin(r) * 184;
            const x2 = 200 + Math.cos(r) * (i % 5 === 0 ? 170 : 178);
            const y2 = 200 + Math.sin(r) * (i % 5 === 0 ? 170 : 178);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(96,165,250,0.35)"
                strokeWidth={i % 5 === 0 ? 1.5 : 0.6}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Mid rotating ring */}
      <motion.div
        className="absolute inset-12"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <circle
            cx="200"
            cy="200"
            r="160"
            fill="none"
            stroke="rgba(34,211,238,0.25)"
            strokeWidth="1.5"
            strokeDasharray="20 14"
          />
          <circle
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke="rgba(96,165,250,0.15)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        </svg>
      </motion.div>

      {/* Center gear */}
      <motion.div
        className="absolute inset-[26%] grid place-items-center rounded-2xl glass-strong shadow-glow-lg"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full p-6 text-cyan-glow">
          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="50" cy="50" r="10" />
            <circle cx="50" cy="50" r="30" strokeDasharray="3 5" />
            <circle cx="50" cy="50" r="40" strokeDasharray="2 8" />
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 360) / 12;
              const r = (a * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={50 + Math.cos(r) * 30}
                  y1={50 + Math.sin(r) * 30}
                  x2={50 + Math.cos(r) * 42}
                  y2={50 + Math.sin(r) * 42}
                />
              );
            })}
          </g>
        </svg>
      </motion.div>

      {/* Floating spec chips */}
      <FloatingChip
        className="left-0 top-[20%]"
        label="FEA"
        value="Validated"
        delay={0}
      />
      <FloatingChip
        className="right-0 top-[40%]"
        label="Topology"
        value="−34% mass"
        delay={1}
      />
      <FloatingChip
        className="bottom-[18%] left-[12%]"
        label="CAD"
        value="SolidWorks"
        delay={2}
      />
      <FloatingChip
        className="bottom-[10%] right-[16%]"
        label="Print"
        value="AM Ready"
        delay={1.5}
      />
    </div>
  );
}

function FloatingChip({
  className,
  label,
  value,
  delay,
}: {
  className?: string;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <div className="glass rounded-xl px-3 py-2 shadow-glass">
        <p className="text-[10px] uppercase tracking-widest text-slate-400">
          {label}
        </p>
        <p className="font-display text-sm font-semibold text-white">{value}</p>
      </div>
    </motion.div>
  );
}

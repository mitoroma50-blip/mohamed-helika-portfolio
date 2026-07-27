import { motion } from 'framer-motion';

// Animated engineering background: blueprint grid, drifting glow orbs,
// rotating gears and animated technical connection lines.
export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950 dark-mode-bg">
      {/* Blueprint grid */}
      <div className="absolute inset-0 bg-grid-blueprint bg-grid-lg opacity-60 dark-mode-grid" />
      <div className="absolute inset-0 bg-grid-blueprint bg-grid-sm opacity-20" />

      {/* Radial top glow */}
      <div className="absolute inset-0 bg-radial-glow" />

      {/* Drifting glow orbs */}
      <motion.div
        className="absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-steel-700/20 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-cyan-glow/10 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating gear silhouettes */}
      <Gear
        className="absolute right-[8%] top-[18%] h-40 w-40 text-steel-500/10"
        duration={28}
      />
      <Gear
        className="absolute left-[5%] bottom-[14%] h-56 w-56 text-cyan-glow/10"
        duration={40}
        reverse
      />
      <Gear
        className="absolute right-[22%] bottom-[28%] h-24 w-24 text-steel-400/10"
        duration={20}
        reverse
      />

      {/* Animated technical lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 0 300 Q 400 200 800 350 T 1600 300"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeDasharray="6 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 0 600 Q 500 500 1000 650 T 1600 600"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeDasharray="4 12"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, delay: 0.4, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Bottom fade into body */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink-950 to-transparent dark-mode-fade" />
    </div>
  );
}

function Gear({
  className = '',
  duration = 30,
  reverse = false,
}: {
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="50" cy="50" r="14" />
        <circle cx="50" cy="50" r="34" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="44" strokeDasharray="2 6" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 360) / 12;
          const r = (a * Math.PI) / 180;
          const x1 = 50 + Math.cos(r) * 34;
          const y1 = 50 + Math.sin(r) * 34;
          const x2 = 50 + Math.cos(r) * 46;
          const y2 = 50 + Math.sin(r) * 46;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
    </motion.svg>
  );
}

import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type GlassCardProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
};

export function GlassCard({
  children,
  hover = true,
  glow = false,
  className = '',
  ...rest
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass rounded-2xl shadow-glass ${glow ? 'shadow-glow-lg' : ''} ${className}`}
      whileHover={
        hover
          ? { y: -6, borderColor: 'rgba(96,165,250,0.35)' }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

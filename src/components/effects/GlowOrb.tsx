import { motion } from 'framer-motion';

interface GlowOrbProps {
  color: 'cyan' | 'violet' | 'pink' | 'emerald';
  size?: number;
  className?: string;
  delay?: number;
}

const colorMap = {
  cyan: 'from-cyan-400/30 to-cyan-600/10',
  violet: 'from-violet-400/30 to-violet-600/10',
  pink: 'from-pink-400/30 to-pink-600/10',
  emerald: 'from-emerald-400/30 to-emerald-600/10',
};

const glowMap = {
  cyan: 'shadow-neon-cyan',
  violet: 'shadow-neon-violet',
  pink: 'shadow-neon-pink',
  emerald: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
};

export function GlowOrb({ color, size = 300, className = '', delay = 0 }: GlowOrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${colorMap[color]} ${glowMap[color]} ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to))`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.1, 1],
        x: [0, 20, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

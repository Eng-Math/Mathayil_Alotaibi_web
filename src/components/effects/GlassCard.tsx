import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'violet' | 'pink' | 'emerald' | 'none';
  intensity?: 'low' | 'medium' | 'high';
  tilt?: boolean;
  onClick?: () => void;
}

const glowColors = {
  cyan: 'hover:shadow-[0_0_40px_rgba(0,212,255,0.3)]',
  violet: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]',
  pink: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]',
  emerald: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]',
  none: '',
};

const intensityMap = {
  low: 'bg-white/5 backdrop-blur-lg border-white/10',
  medium: 'bg-white/8 backdrop-blur-xl border-white/15',
  high: 'glass-card-strong',
};

export function GlassCard({ 
  children, 
  className = '', 
  glowColor = 'cyan',
  intensity = 'medium',
  tilt = false,
  onClick
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`
        relative overflow-hidden rounded-2xl
        ${intensityMap[intensity]}
        ${glowColors[glowColor]}
        transition-shadow duration-300
        ${className}
      `}
      style={tilt ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Border gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-white/5 pointer-events-none" style={{ padding: '1px' }}>
        <div className="w-full h-full rounded-2xl bg-dark-bg/80" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}

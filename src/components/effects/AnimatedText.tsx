import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'words' | 'chars' | 'lines';
}

export function AnimatedText({ 
  text, 
  className = '', 
  delay = 0,
  type = 'words' 
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const items = type === 'chars' 
    ? text.split('') 
    : type === 'words' 
    ? text.split(' ') 
    : [text];

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: type === 'chars' ? 0.03 : 0.1, 
        delayChildren: delay 
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ perspective: '500px' }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ 
            transformStyle: 'preserve-3d',
            marginRight: type === 'words' ? '0.25em' : undefined 
          }}
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({ children, className = '', animate = true }: GradientTextProps) {
  return (
    <span 
      className={`
        bg-gradient-to-r from-neon-cyan via-neon-violet via-neon-pink to-[#E0FF00]
        bg-clip-text text-transparent
        ${animate ? 'animate-gradient bg-[length:200%_auto]' : ''}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TypewriterText({ 
  text, 
  className = '', 
  delay = 0,
  speed = 50 
}: TypewriterTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className={`font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay }}
    >
      {isInView && (
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: text.length * speed / 1000, ease: 'linear', delay }}
          className="overflow-hidden whitespace-nowrap inline-block"
        >
          {text}
        </motion.span>
      )}
      <motion.span
        className="inline-block w-0.5 h-[1em] bg-neon-cyan ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </motion.span>
  );
}

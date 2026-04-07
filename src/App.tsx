import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navigation } from './components/Navigation';
import { ParticleBackground } from './components/effects/ParticleBackground';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/Footer';
import { DocumentModal } from './components/effects/DocumentModal';
import './App.css';

// Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-dark-bg flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo Animation */}
      <motion.div
        className="mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/logo2.png" alt="Logo" className="w-32 h-32 object-contain" />
      </motion.div>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Progress Percentage */}
      <motion.span
        className="mt-4 font-mono text-neon-cyan"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {Math.min(Math.round(progress), 100)}%
      </motion.span>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-neon-cyan/30"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-neon-violet/30"
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-neon-pink/30"
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}

// Scroll Progress Bar
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[60] bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink origin-left"
      style={{ scaleX: progress / 100 }}
    />
  );
}

// Custom Cursor
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Don't show custom cursor on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full border border-neon-cyan pointer-events-none z-[70] hidden md:block"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-neon-cyan pointer-events-none z-[70] hidden md:block"
        animate={{
          x: position.x - 2,
          y: position.y - 2,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 20 }}
      />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  return (
    <LanguageProvider>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative min-h-screen bg-dark-bg"
        >
          {/* Background Effects */}
          <ParticleBackground />
          
          {/* Scroll Progress */}
          <ScrollProgress />
          
          {/* Custom Cursor */}
          <CustomCursor />

          {/* Navigation */}
          <Navigation />

          {/* Document Viewer Modal */}
          {selectedDoc && <DocumentModal url={selectedDoc} onClose={() => setSelectedDoc(null)} />}

          {/* Main Content */}
          <main className="relative">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection onOpenDoc={setSelectedDoc} />
            <ProjectsSection />
            <CertificationsSection onOpenDoc={setSelectedDoc} />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />
        </motion.div>
      )}
    </LanguageProvider>
  );
}

export default App;

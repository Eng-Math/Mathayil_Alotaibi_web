import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import { GlassCard } from '../effects/GlassCard';
import { GradientText } from '../effects/AnimatedText';
import { GlowOrb } from '../effects/GlowOrb';
import { AIBrainVisualizer } from '../effects/AIBrainVisualizer';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

export function HeroSection() {
  const { language, dir } = useLanguage();
  const t = translations[language];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Effects */}
      <GlowOrb color="cyan" size={400} className="top-20 -left-40" delay={0} />
      <GlowOrb color="violet" size={350} className="bottom-20 -right-20" delay={2} />
      <GlowOrb color="pink" size={250} className="top-1/2 left-1/3" delay={4} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 tech-grid opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className={`text-center lg:order-1 ${dir === 'rtl' ? 'lg:text-right order-2' : 'lg:text-left order-2'}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-neon-emerald animate-pulse" />
              <span className="text-sm text-white/80">{t.hero.badge}</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t.hero.title}
            </motion.h1>

            {/* Title */}
            <motion.div
              className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <GradientText>
                {t.hero.subtitle}
              </GradientText>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-white/60 text-base sm:text-lg mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              dir={dir}
            >
              {t.hero.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-violet text-white font-medium hover:shadow-neon-cyan transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                {t.hero.contactBtn}
              </motion.button>
              
              <motion.a
                href="/MATHAYIL ALOTAIBI.Cv.pdf"
                download="MATHAYIL ALOTAIBI.Cv.pdf"
                className="flex items-center gap-2 px-6 py-3 rounded-xl glass-card text-white font-medium hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                {t.hero.downloadCv}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Brain Network */}
          <motion.div
            className={`relative flex items-center justify-center ${dir === 'rtl' ? 'order-1 lg:order-2' : 'order-1 lg:order-2'}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard
              className="p-0 w-full max-w-md aspect-square overflow-hidden border-2 border-neon-cyan/20"
              intensity="high"
              glowColor="cyan"
              tilt
            >
              <AIBrainVisualizer />
            </GlassCard>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]">
              <motion.div
                className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-cyan/30 to-transparent"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-violet/30 to-transparent"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { GlassCard } from '../effects/GlassCard';
import { GradientText, AnimatedText } from '../effects/AnimatedText';
import { GlowOrb } from '../effects/GlowOrb';
import { Cpu, Brain, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

const getFeatures = (t: any, lang: string) => [
  {
    icon: Brain,
    title: t.skills.categories.ai,
    description: lang === 'ar' 
      ? 'بناء وكلاء ذكيين مستقلين باستخدام LLMs و LangChain و RAG لتقديم حلول تحليلية واستشارية.'
      : 'Building autonomous intelligent agents using LLMs, LangChain, and RAG to provide analytical and advisory solutions.',
    color: 'cyan',
  },
  {
    icon: ShieldCheck,
    title: t.skills.categories.cyber,
    description: lang === 'ar'
      ? 'معرفة عميقة في أمن الشبكات والاستجابة للحوادث والتشفير الآمن والامتثال.'
      : 'Deep knowledge in network security, incident response, secure encryption, and compliance.',
    color: 'violet',
  },
  {
    icon: Cpu,
    title: t.skills.categories.embedded,
    description: lang === 'ar'
      ? 'تصميم أنظمة مدمجة وبنية تحتية شبكية متكاملة باستخدام Arduino و NodeMCU.'
      : 'Designing embedded systems and integrated network infrastructure using Arduino and NodeMCU.',
    color: 'pink',
  },
  {
    icon: Sparkles,
    title: 'Systems Thinking',
    description: lang === 'ar'
      ? 'نظرة شمولية للأنظمة التقنية — من البنية التحتية وحتى الخوارزميات المعقدة.'
      : 'A holistic view of technical systems — from infrastructure to complex algorithms.',
    color: 'emerald',
  },
];

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function AboutSection() {
  const { language, dir } = useLanguage();
  const t = translations[language];
  const features = getFeatures(t, language);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <GlowOrb color="violet" size={400} className="top-0 -right-40" delay={1} />
      <GlowOrb color="cyan" size={300} className="bottom-0 -left-20" delay={3} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full glass-card text-sm text-neon-cyan mb-4 tracking-widest font-mono"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t.about.badge}
          </motion.span>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            <AnimatedText text={t.about.title} />
          </h2>
          
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-cairo">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard
              className="p-8 aspect-square flex items-center justify-center"
              intensity="high"
              glowColor="violet"
              tilt
            >
              <div className="relative w-full h-full">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.3))' }}
                >
                  <motion.circle
                    cx="200"
                    cy="200"
                    r="150"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    strokeDasharray="10 5"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: 'center' }}
                  />
                  
                  <motion.circle
                    cx="200"
                    cy="200"
                    r="100"
                    fill="none"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    strokeDasharray="5 10"
                    initial={{ rotate: 360 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: 'center' }}
                  />
                  
                  <motion.circle
                    cx="200"
                    cy="200"
                    r="50"
                    fill="none"
                    stroke="url(#gradient3)"
                    strokeWidth="3"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ transformOrigin: 'center' }}
                  />
                  
                  <circle cx="200" cy="200" r="15" fill="url(#gradient1)" />
                  
                  {[0, 90, 180, 270].map((angle, i) => (
                    <motion.circle
                      key={i}
                      r="8"
                      fill="url(#gradient2)"
                      initial={{ 
                        cx: 200 + 120 * Math.cos((angle * Math.PI) / 180),
                        cy: 200 + 120 * Math.sin((angle * Math.PI) / 180)
                      }}
                      animate={{ 
                        cx: [
                          200 + 120 * Math.cos((angle * Math.PI) / 180),
                          200 + 120 * Math.cos(((angle + 90) * Math.PI) / 180),
                          200 + 120 * Math.cos(((angle + 180) * Math.PI) / 180),
                          200 + 120 * Math.cos(((angle + 270) * Math.PI) / 180),
                          200 + 120 * Math.cos((angle * Math.PI) / 180),
                        ],
                        cy: [
                          200 + 120 * Math.sin((angle * Math.PI) / 180),
                          200 + 120 * Math.sin(((angle + 90) * Math.PI) / 180),
                          200 + 120 * Math.sin(((angle + 180) * Math.PI) / 180),
                          200 + 120 * Math.sin(((angle + 270) * Math.PI) / 180),
                          200 + 120 * Math.sin((angle * Math.PI) / 180),
                        ]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
                    />
                  ))}
                  
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00d4ff" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#00d4ff" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={language === 'ar' ? 'text-right' : 'text-left'}
            dir={dir}
          >
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">
              {t.about.sectionTitle} <GradientText>{t.about.sectionTitleHighlight}</GradientText>
            </h3>
            
            <div className="space-y-4 text-white/70 leading-relaxed text-sm font-cairo">
              <p>{t.about.paragraph1}</p>
              <p>{t.about.paragraph2}</p>
              <p>{t.about.paragraph3}</p>
              <p>{t.about.paragraph4}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { value: 20, suffix: '+', label: t.about.stats.certificates },
                { value: 200, suffix: '+', label: t.about.stats.volunteerHours },
                { value: 9, suffix: '', label: t.about.stats.projects },
              ].map((stat, index) => (
                <GlassCard
                  key={index}
                  className="p-4 text-center"
                  intensity="low"
                  glowColor="cyan"
                >
                  <div className="text-2xl sm:text-3xl font-display font-bold gradient-text">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-white/50 mt-1 font-cairo tracking-tighter">{stat.label}</div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 ${language === 'ar' ? 'text-right' : 'text-left'}`} dir={dir}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <GlassCard
                className="p-6 h-full"
                intensity="medium"
                glowColor={feature.color as 'cyan' | 'violet' | 'pink' | 'emerald'}
                tilt
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  feature.color === 'cyan' ? 'bg-neon-cyan/20 text-neon-cyan' :
                  feature.color === 'violet' ? 'bg-neon-violet/20 text-neon-violet' :
                  feature.color === 'pink' ? 'bg-neon-pink/20 text-neon-pink' :
                  'bg-neon-emerald/20 text-neon-emerald'
                }`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="font-display font-semibold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-white/60 font-cairo">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

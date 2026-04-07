import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '../effects/GlassCard';
import { AnimatedText } from '../effects/AnimatedText';
import { GlowOrb } from '../effects/GlowOrb';
import { Calendar, MapPin, GraduationCap, Shield, Brain, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

interface ExperienceProps {
  onOpenDoc?: (url: string) => void;
}

interface Experience {
  id: number;
  type: 'academic' | 'work' | 'training';
  title: string;
  titleAr: string;
  company: string;
  companyAr: string;
  location: string;
  period: string;
  description: string;
  documentUrl?: string;
  color: 'cyan' | 'violet' | 'pink' | 'emerald';
}

const getExperiences = (lang: string): Experience[] => [
  {
    id: 1,
    type: 'work',
    title: 'AI Engineer',
    titleAr: lang === 'ar' ? 'مهندسة ذكاء اصطناعي' : 'AI Engineer',
    company: 'BeamData (with SDA)',
    companyAr: lang === 'ar' ? 'شركة BeamData بالتعاون مع أكاديمية السعودية الرقمية' : 'BeamData (with SDA)',
    location: 'Remote, Canada',
    period: '2025',
    description: lang === 'ar' 
      ? 'قيادة تطوير الوكيل المالي الذكي (Rakeem) باستخدام تقنيات النماذج اللغوية الضخمة (LLMs) لتقديم حلول تحليلية واستشارية مستقلة.'
      : 'Leading the development of the intelligent financial agent (Rakeem) using Large Language Models (LLMs) to provide independent analytical and advisory solutions.',
    color: 'cyan',
  },
  {
    id: 2,
    type: 'work',
    title: 'Computer Engineering Trainee',
    titleAr: lang === 'ar' ? 'متدربة هندسة حاسب — تدريب تعاوني' : 'Computer Engineering Trainee',
    company: 'Al-Khawarizmi Institute',
    companyAr: lang === 'ar' ? 'معهد الخوارزمي للتدريب' : 'Al-Khawarizmi Institute',
    location: 'KSA',
    period: '2024',
    description: lang === 'ar'
      ? 'تنفيذ ورش عمل متخصصة في الأنظمة المدمجة والواقع الافتراضي، وإدارة البنية التحتية للشبكات مما حسّن كفاءة استرجاع الملفات بنسبة 15%.'
      : 'Conducted specialized workshops in embedded systems and virtual reality, and managed network infrastructure which improved file retrieval efficiency by 15%.',
    color: 'violet',
  },
  {
    id: 3,
    type: 'academic',
    title: "Bachelor's of Computer Engineering — Honors",
    titleAr: lang === 'ar' ? 'بكالوريوس هندسة الحاسب — مرتبة الشرف' : "Bachelor's of Computer Engineering — Honors",
    company: 'Taif University',
    companyAr: lang === 'ar' ? 'جامعة الطائف' : 'Taif University',
    location: 'Taif, KSA',
    period: '2020-2025',
    description: lang === 'ar'
      ? 'تخرجت بمرتبة الشرف. تخصص في هندسة الحاسب مع التركيز على الأنظمة المدمجة والذكاء الاصطناعي وأمن المعلومات.'
      : 'Graduated with Honors. Specialized in Computer Engineering with a focus on embedded systems, artificial intelligence, and information security.',
    color: 'pink',
  },
  {
    id: 4,
    type: 'training',
    title: 'Generative AI Engineering Bootcamp',
    titleAr: lang === 'ar' ? 'معسكر الذكاء الاصطناعي التوليدي المكثف' : 'Generative AI Engineering Bootcamp',
    company: 'Saudi Digital Academy (SDA)',
    companyAr: lang === 'ar' ? 'أكاديمية السعودية الرقمية' : 'Saudi Digital Academy (SDA)',
    location: 'KSA',
    period: '2025',
    description: lang === 'ar'
      ? 'معسكر مكثف في هندسة الذكاء الاصطناعي التوليدي شمل بناء الوكلاء الذكيين وأنظمة RAG والنماذج اللغوية الضخمة.'
      : 'An intensive bootcamp in Generative AI Engineering that included building intelligent agents, RAG systems, and large language models.',
    color: 'emerald',
    documentUrl: '/Mathayil%20Fahad%20Alotaibi.pdf',
  },
];

const colorMap = {
  cyan: {
    bg: 'bg-neon-cyan/20',
    border: 'border-neon-cyan/50',
    text: 'text-neon-cyan',
    glow: 'shadow-neon-cyan',
    hex: '#00d4ff',
  },
  violet: {
    bg: 'bg-neon-violet/20',
    border: 'border-neon-violet/50',
    text: 'text-neon-violet',
    glow: 'shadow-neon-violet',
    hex: '#8b5cf6',
  },
  pink: {
    bg: 'bg-neon-pink/20',
    border: 'border-neon-pink/50',
    text: 'text-neon-pink',
    glow: 'shadow-neon-pink',
    hex: '#ec4899',
  },
  emerald: {
    bg: 'bg-neon-emerald/20',
    border: 'border-neon-emerald/50',
    text: 'text-neon-emerald',
    glow: 'shadow-neon-emerald',
    hex: '#10b981',
  }
};

const typeIcons = {
  academic: GraduationCap,
  work: Brain,
  training: Zap,
};

export function ExperienceSection({ onOpenDoc }: ExperienceProps) {
  const { language, dir } = useLanguage();
  const t = translations[language];
  const experiences = getExperiences(language);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <GlowOrb color="violet" size={400} className="top-0 -left-40" delay={1} />
      <GlowOrb color="pink" size={350} className="bottom-0 -right-20" delay={3} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full glass-card text-sm text-neon-pink mb-4 tracking-widest font-mono"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t.experience.badge}
          </motion.span>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            <AnimatedText text={t.experience.title} />
          </h2>
          
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t.experience.description}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-pink md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((experience, index) => {
              const colors = colorMap[experience.color];
              const isLeft = index % 2 === 0;
              const Icon = typeIcons[experience.type];

              return (
                <motion.div
                  key={experience.id}
                  className={`relative flex items-start gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                >
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-dark-bg border-2 md:-translate-x-1/2 z-10 mt-6">
                    <motion.div
                      className={`w-full h-full rounded-full ${colors.bg} ${colors.border} border-2`}
                      animate={{ 
                        boxShadow: [
                          `0 0 0px ${colors.hex}`,
                          `0 0 20px ${colors.hex}`,
                          `0 0 0px ${colors.hex}`,
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  <div className={`ml-12 md:ml-0 md:w-5/12 ${
                    isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                  }`}>
                    <GlassCard
                      className={`p-6 ${experience.documentUrl ? 'cursor-pointer hover:border-neon-cyan/50 transition-colors' : ''}`}
                      intensity="medium"
                      glowColor={experience.color}
                      tilt
                      onClick={() => {
                        if(experience.documentUrl && onOpenDoc) {
                          onOpenDoc(experience.documentUrl);
                        }
                      }}
                    >
                      <div className={`flex items-start gap-4 mb-4 ${
                        isLeft ? 'md:flex-row-reverse' : ''
                      }`}>
                        <div className={`w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center flex-shrink-0 bg-black/40`}>
                          <Icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <div className={isLeft ? 'md:text-right text-left' : 'text-left'}>
                          <h3 className="font-display text-lg font-semibold text-white" dir={dir}>
                            {experience.titleAr}
                          </h3>
                          <p className="font-mono text-xs mt-0.5 text-white/40">{experience.title}</p>
                          <p className={`font-mono text-sm mt-1 text-left ${colors.text}`}>
                            {experience.companyAr}
                          </p>
                        </div>
                      </div>

                      <div className={`flex flex-wrap gap-4 mb-4 text-xs font-mono text-white/50 ${
                        isLeft ? 'md:justify-start lg:justify-end' : 'justify-start'
                      }`}>
                        <span className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded">
                          <Calendar className="w-3 h-3" />
                          {experience.period}
                        </span>
                        <span className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded">
                          <MapPin className="w-3 h-3" />
                          {experience.location}
                        </span>
                      </div>

                      <p className={`text-white/70 text-sm leading-relaxed font-cairo`} dir={dir}>
                        {experience.description}
                      </p>

                      {experience.documentUrl && (
                        <motion.a
                          href={experience.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl ${colors.bg} ${colors.text} border ${colors.border} font-semibold text-sm hover:shadow-lg transition-all duration-300`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Shield className="w-4 h-4" />
                          {t.experience.viewCertificate}
                        </motion.a>
                      )}
                    </GlassCard>
                  </div>

                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

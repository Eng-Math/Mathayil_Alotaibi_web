import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '../effects/GlassCard';
import { AnimatedText } from '../effects/AnimatedText';
import { GlowOrb } from '../effects/GlowOrb';
import { 
  Brain, 
  Code, 
  Cpu, 
  Award 
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

interface SkillCategory {
  title: string;
  titleEn: string;
  icon: any;
  color: 'cyan' | 'violet' | 'pink' | 'emerald';
  skills: string[];
}

const getSkillCategories = (lang: string) => [
  {
    title: lang === 'ar' ? 'الذكاء الاصطناعي' : 'AI & Machine Learning',
    titleEn: 'AI & Machine Learning',
    icon: Brain,
    color: 'cyan' as const,
    skills: [
      'Prompt Engineering',
      'AI Agents',
      'LangChain',
      'RAG Systems',
      'PyTorch',
      'TensorFlow',
      'NLP',
      'Deep Learning',
      'FAISS'
    ],
  },
  {
    title: lang === 'ar' ? 'البرمجة والبيانات' : 'Programming & Web',
    titleEn: 'Programming & Web',
    icon: Code,
    color: 'violet' as const,
    skills: [
      'Python',
      'C/C++ (Embedded)',
      'SQL',
      'Holt-Winters (Time Series)',
      'Git / GitHub',
      'MATLAB'
    ],
  },
  {
    title: lang === 'ar' ? 'البنية التحتية' : 'Infrastructure & IoT',
    titleEn: 'Infrastructure & IoT',
    icon: Cpu,
    color: 'emerald' as const,
    skills: [
      'NodeMCU',
      'Arduino',
      'IoT',
      'AWS',
      'Streamlit',
      'Docker',
      'Cisco Packet Tracer'
    ],
  },
  {
    title: lang === 'ar' ? 'الاعتمادات المهنية' : 'Professional Accreditations',
    titleEn: 'Professional Accreditations',
    icon: Award,
    color: 'pink' as const,
    skills: [
      'Saudi Engineering Council',
      'Microsoft Office Specialist',
      'DataCamp AI Ethics'
    ],
  },
];

function SkillTag({ name, color, index }: { name: string; color: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      whileHover={{ y: -2, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      className={`
        px-3 py-1.5 rounded-lg text-xs font-medium border border-white/5 bg-white/[0.02]
        text-white/70 hover:text-white hover:border-${color}/30 transition-all duration-300
        cursor-default select-none backdrop-blur-sm
      `}
      style={{
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
      }}
    >
      {name}
    </motion.span>
  );
}

export function SkillsSection() {
  const { language, dir } = useLanguage();
  const t = translations[language];
  const skillCategories = getSkillCategories(language);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <GlowOrb color="cyan" size={400} className="top-1/4 -left-40" delay={0} />
      <GlowOrb color="pink" size={350} className="bottom-1/4 -right-20" delay={2} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full glass-card text-sm text-neon-violet mb-4 tracking-widest font-mono"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            TECHNICAL_ARSENAL
          </motion.span>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            <AnimatedText text={t.skills.title} />
          </h2>
          
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t.skills.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.titleEn}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
                className="h-full"
              >
                <GlassCard
                  className="p-6 md:p-8 h-full group"
                  intensity="medium"
                  glowColor={category.color}
                  tilt
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className={`
                        w-12 h-12 rounded-2xl flex items-center justify-center mb-4
                        bg-neon-${category.color}/10 text-neon-${category.color}
                        group-hover:scale-110 group-hover:rotate-3 transition-all duration-500
                      `}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">
                        {category.titleEn}
                      </h3>
                      <p className={`text-xs text-neon-${category.color}/60 font-medium`}>
                        {category.title}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {category.skills.map((skill, skillIndex) => (
                        <SkillTag 
                          key={skill} 
                          name={skill} 
                          color={category.color} 
                          index={skillIndex} 
                        />
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

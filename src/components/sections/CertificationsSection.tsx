import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '../effects/GlassCard';
import { AnimatedText } from '../effects/AnimatedText';
import { GlowOrb } from '../effects/GlowOrb';
import { Shield, Award, BookOpen, Users, FileText, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

interface CertProps {
  onOpenDoc?: (url: string) => void;
}

const getCertificationCategories = (lang: string) => [
  {
    title: lang === 'ar' ? 'الرخص والاعتمادات المهنية' : 'Professional Licenses',
    icon: Award,
    color: 'cyan',
    certs: [
      { title: 'Professional Engineer', issuer: 'Saudi Engineering Council', link: '/certificates/licenses/Certificate.pdf' },
      { title: 'Microsoft Office Specialist: Word 2019', issuer: 'Microsoft', link: '/certificates/licenses/MOS.png' },
    ]
  },
  {
    title: lang === 'ar' ? 'الذكاء الاصطناعي والتقنيات السحابية' : 'AI & Cloud Technologies',
    icon: BookOpen,
    color: 'violet',
    certs: [
      { title: 'Introduction to AI Agents', issuer: 'DataCamp', link: '/certificates/datacamp/certificate_1_agent.pdf' },
      { title: 'AI Ethics', issuer: 'DataCamp', link: '/certificates/datacamp/certificate_ethic.pdf' },
      { title: 'Understanding Prompt Engineering', issuer: 'DataCamp', link: '/certificates/datacamp/certificate_prompt.pdf' },
      { title: 'AWS Concepts', issuer: 'DataCamp', link: '/certificates/datacamp/certificate_ws.pdf' },
      { title: 'Generative AI Concepts', issuer: 'DataCamp', link: '/certificates/datacamp/certificate.pdf' },
    ]
  },
  {
    title: lang === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity',
    icon: Shield,
    color: 'emerald',
    certs: [
      { title: 'Security Operations', issuer: 'ISC²', link: '/certificates/Coursera__security_operation.pdf' },
      { title: 'Access Control Concepts', issuer: 'ISC²', link: '/certificates/Coursera_2JKAB0FKYNJJ.pdf' },
      { title: 'Introduction to Cybersecurity Essentials', issuer: 'IBM', link: '/certificates/Coursera_GH3SMNZDENOJ_شهاده_اول_كورس_امن.pdf' },
      { title: 'Incident Response and Recovery', issuer: 'ISC²', link: '/certificates/Coursera_incident_respo_recov.pdf' },
      { title: 'Network and Communications Security', issuer: 'ISC²', link: '/certificates/Coursera_networ;.pdf' },
      { title: 'Principles of Secure Coding', issuer: 'UC Davis', link: '/certificates/Coursera_Principles_of_Secure_Coding.pdf' },
      { title: 'Systems and Application Security', issuer: 'ISC²', link: '/certificates/Coursera_Systems_and_Application_Security.pdf' },
      { title: 'Security Principles', issuer: 'ISC²', link: '/certificates/شهاده_security_principles.pdf' },
    ]
  },
  {
    title: lang === 'ar' ? 'المساهمات المهنية والمجتمعية' : 'Professional & Community Contributions',
    icon: Users,
    color: 'pink',
    certs: [
      { title: 'Hackathon agentX 2025', issuer: 'agentX', link: '/الشهادات المجتمعيه/المشاركة في هاكاثون agentX 2025.pdf' },
      { title: 'Champion of the Week', issuer: 'Saudi Digital Academy', link: '/الشهادات المجتمعيه/Champion of the Week.jpeg' },
      { title: 'VR Workshop Presentation', issuer: 'Al-Khawarizmi Institute', link: '/الشهادات المجتمعيه/تقديم ورشة عمل عن الواقع الافتراضي.jpeg' },
      { title: '200 Volunteer Hours - AI Club', issuer: 'Taif University', link: '/الشهادات المجتمعيه/200 ساعة تطوعية في نادي الذكاء الاصطناعي.pdf' },
    ]
  }
];

export function CertificationsSection({ onOpenDoc }: CertProps) {
  const { language, dir } = useLanguage();
  const t = translations[language];
  const certificationCategories = getCertificationCategories(language);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <GlowOrb color="emerald" size={400} className="top-1/4 -left-40" delay={0} />
      <GlowOrb color="cyan" size={350} className="bottom-1/4 -right-20" delay={2} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full glass-card text-sm text-neon-emerald mb-4 tracking-widest font-mono"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t.certifications.badge}
          </motion.span>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            <AnimatedText text={t.certifications.title} />
          </h2>
          
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-cairo">
            {t.certifications.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8" dir={dir}>
          {certificationCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: catIndex % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + catIndex * 0.1 }}
            >
              <GlassCard className="p-6 h-full" intensity="medium" glowColor={category.color as any}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-neon-${category.color}/20 text-neon-${category.color}`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.certs.map((cert, index) => (
                    <motion.div
                      key={index}
                      className="group cursor-pointer p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
                      onClick={() => onOpenDoc?.(cert.link)}
                      whileHover={{ x: -5 }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-white/40 group-hover:text-neon-cyan transition-colors" />
                          <div>
                            <p className="text-white font-medium text-sm group-hover:text-neon-cyan transition-colors">
                              {cert.title}
                            </p>
                            <p className="text-xs text-white/40">
                              {cert.issuer}
                            </p>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

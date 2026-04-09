import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { GlassCard } from '../effects/GlassCard';
import { AnimatedText } from '../effects/AnimatedText';
import { GlowOrb } from '../effects/GlowOrb';
import { Send, Mail, MapPin, Phone, Linkedin, Github, MessageCircle, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

const getContactInfo = (t: any, _lang: string) => [
  {
    icon: Mail,
    label: t.contact.info.email,
    value: 'Mathayil.alj@gmail.com',
    href: 'mailto:Mathayil.alj@gmail.com',
    color: 'cyan',
  },
  {
    icon: Phone,
    label: t.contact.info.phone,
    value: '+966 55 525 7509',
    href: 'tel:+966555257509',
    color: 'violet',
  },
  {
    icon: MapPin,
    label: t.contact.info.location,
    value: t.contact.info.locationValue,
    href: '#',
    color: 'pink',
  },
];

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/mathayil-alotaibi', color: 'cyan' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/Eng-MTY', color: 'violet' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/qr/MU3A7IUH7NSYP1', color: 'emerald' },
];

const colorMap = {
  cyan: 'text-neon-cyan bg-neon-cyan/20 border-neon-cyan/50 hover:shadow-neon-cyan',
  violet: 'text-neon-violet bg-neon-violet/20 border-neon-violet/50 hover:shadow-neon-violet',
  pink: 'text-neon-pink bg-neon-pink/20 border-neon-pink/50 hover:shadow-neon-pink',
  emerald: 'text-neon-emerald bg-neon-emerald/20 border-neon-emerald/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]',
};

export function ContactSection() {
  const { language, dir: _dir } = useLanguage();
  const t = translations[language];
  const contactInfo = getContactInfo(t, language);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // EmailJS configuration
      const serviceId = 'service_qpq3td6';
      const templateId = 'template_eh04u58';
      const publicKey = 'XAMVS7UNfOl6QT5sP';
      
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };
      
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <GlowOrb color="cyan" size={400} className="top-0 -left-40" delay={0} />
      <GlowOrb color="violet" size={350} className="bottom-0 -right-20" delay={2} />
      <GlowOrb color="pink" size={300} className="top-1/2 left-1/2 -translate-x-1/2" delay={4} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full glass-card text-sm text-neon-cyan mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t.contact.badge}
          </motion.span>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            <AnimatedText text={t.contact.title} />
          </h2>
          
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-cairo">
            {t.contact.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard
              className="p-6 sm:p-8"
              intensity="high"
              glowColor="cyan"
            >
              <h3 className="font-display text-2xl font-semibold text-white mb-6">
                {t.contact.form.title}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">{t.contact.form.name}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                      placeholder={t.contact.form.namePlaceholder}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">{t.contact.form.email}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                      placeholder={t.contact.form.emailPlaceholder}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/60">{t.contact.form.message}</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20 transition-all resize-none"
                    placeholder={t.contact.form.messagePlaceholder}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-violet text-white font-medium hover:shadow-neon-cyan transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.contact.form.send}
                    </>
                  )}
                </motion.button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-xl bg-neon-emerald/20 border border-neon-emerald/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle className="w-5 h-5 text-neon-emerald flex-shrink-0" />
                    <span className="text-white">{t.contact.form.success}</span>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-xl bg-red-500/20 border border-red-500/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-white">{t.contact.form.error}</span>
                  </motion.div>
                )}
              </form>
            </GlassCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-xl glass-card hover:bg-white/10 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[item.color as keyof typeof colorMap]}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-neon-cyan transition-colors" dir="ltr">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <GlassCard className="p-6" intensity="low" glowColor="violet">
              <h4 className="font-display font-semibold text-white mb-4">
                {t.contact.social.follow}
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${colorMap[social.color as keyof typeof colorMap]}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </GlassCard>

            {/* Availability Card */}
            <GlassCard className="p-6" intensity="medium" glowColor="emerald">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 rounded-full bg-neon-emerald animate-pulse" />
                <span className="text-neon-emerald font-medium">{t.contact.availability.title}</span>
              </div>
              <p className="text-white/60 text-sm">
                {t.contact.availability.description}
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

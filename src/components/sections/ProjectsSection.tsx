import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { GlassCard } from '../effects/GlassCard';
import { AnimatedText } from '../effects/AnimatedText';
import { GlowOrb } from '../effects/GlowOrb';
import { 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Zap
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';
import { getFeaturedProjects, getGalleryProjects } from '../../data/projectsData';

// Image Carousel Component
function ImageCarousel({ images, color }: { images: string[]; color: string }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl group">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`Project screenshot ${current + 1}`}
          className="w-full h-full max-h-[70vh] object-contain"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/80 transition-all z-10 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/80 transition-all z-10 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current 
                    ? `w-8 bg-neon-${color} shadow-[0_0_10px_rgba(var(--neon-color-rgb),0.8)]` 
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
// 3D Carousel Component - Arc Style matching reference
function ProjectGallery3D({ projects }: { projects: ReturnType<typeof getGalleryProjects> }) {
  const [index, setIndex] = useState(0);
  const [winWidth, setWinWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const activeProject = projects[index];

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % projects.length);
  const prev = () => setIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const isMobile = winWidth < 640;

  // Calculate position for arc effect
  const getCardStyle = (diff: number) => {
    const absDiff = Math.abs(diff);
    const isActive = diff === 0;
    
    // Arc positioning
    const angle = diff * 25; // degrees
    const radius = isMobile ? 140 : 280;
    const xOffset = Math.sin((angle * Math.PI) / 180) * radius;
    const zOffset = Math.cos((angle * Math.PI) / 180) * radius - radius;
    
    return {
      x: xOffset,
      z: zOffset,
      rotateY: -angle * 0.6,
      scale: isActive ? 1.15 : 0.75 - absDiff * 0.08,
      opacity: isActive ? 1 : 0.5 - absDiff * 0.15,
      zIndex: 10 - absDiff,
      blur: isActive ? 0 : absDiff * 2,
    };
  };

  return (
    <div className="flex flex-col items-center">
      {/* 3D Arc Gallery Stage */}
      <div 
        className="relative w-full h-[280px] sm:h-[400px] flex items-center justify-center mb-8 sm:mb-12"
        style={{ perspective: '1200px' }}
      >
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence initial={false}>
            {projects.map((project, i) => {
              let diff = i - index;
              if (diff > projects.length / 2) diff -= projects.length;
              if (diff < -projects.length / 2) diff += projects.length;

              const isActive = diff === 0;
              const isVisible = Math.abs(diff) <= 3;
              const style = getCardStyle(diff);

              if (!isVisible) return null;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: style.opacity,
                    scale: style.scale,
                    x: style.x,
                    z: style.z,
                    rotateY: style.rotateY,
                    zIndex: style.zIndex,
                    filter: `blur(${style.blur}px)`,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute cursor-pointer"
                  style={{
                    width: isMobile ? '160px' : '240px',
                    aspectRatio: '4/5',
                    transformStyle: 'preserve-3d',
                  }}
                  onClick={() => setIndex(i)}
                >
                  <div 
                    className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 ${
                      isActive 
                        ? `ring-2 ring-neon-${project.color} shadow-[0_0_60px_rgba(var(--neon-${project.color}-rgb),0.4)]` 
                        : 'grayscale-[0.3] opacity-70'
                    }`}
                    style={{
                      background: 'linear-gradient(145deg, rgba(20,20,35,0.9), rgba(10,10,20,0.95))',
                      border: `1px solid ${isActive ? `rgba(var(--neon-${project.color}-rgb), 0.5)` : 'rgba(255,255,255,0.08)'}`,
                      boxShadow: isActive 
                        ? `0 25px 50px -12px rgba(0,0,0,0.7), 0 0 40px rgba(var(--neon-${project.color}-rgb), 0.3)`
                        : '0 10px 30px -10px rgba(0,0,0,0.5)',
                    }}
                  >
                    {/* Cover Image */}
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-[65%] object-cover object-center"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    
                    {/* Click to preview - entire image area */}
                    {isActive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewImage(project.coverImage);
                        }}
                        className="absolute inset-0 z-10 cursor-pointer"
                        aria-label="معاينة الصورة"
                      />
                    )}
                    
                    {/* Content */}
                    <div className="absolute bottom-0 inset-x-0 p-4">
                      <p className={`text-${isActive ? 'white' : 'white/60'} font-bold text-sm sm:text-base font-cairo text-center mb-1`}>
                        {project.titleAr}
                      </p>
                      <p className={`text-${isActive ? `neon-${project.color}` : 'white/30'} text-[10px] sm:text-xs font-mono text-center uppercase tracking-wider`}>
                        {project.title}
                      </p>
                    </div>

                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute top-3 right-3 w-3 h-3 rounded-full bg-neon-${project.color} shadow-[0_0_15px_currentColor]`}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 border border-white/10 text-white/60 hover:bg-neon-cyan/20 hover:border-neon-cyan/50 hover:text-neon-cyan transition-all backdrop-blur-xl z-50"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 border border-white/10 text-white/60 hover:bg-neon-cyan/20 hover:border-neon-cyan/50 hover:text-neon-cyan transition-all backdrop-blur-xl z-50"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex gap-2 mb-8">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === index 
                ? `w-8 bg-neon-${projects[i].color}` 
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Active Project Details Card */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard 
              className="p-6 sm:p-8 border-t-2 overflow-hidden rounded-3xl" 
              glowColor={activeProject.color as any}
              intensity="medium"
            >
              <div className="grid md:grid-cols-5 gap-6 items-stretch" dir="rtl">
                {/* Image Section */}
                <div className="md:col-span-2 relative group">
                  <div className="relative h-48 sm:h-full min-h-[200px] rounded-2xl overflow-hidden border border-white/10 bg-black">
                    <img 
                      src={activeProject.images[0]} 
                      alt={activeProject.titleAr}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Eye icon button */}
                    <button
                      onClick={() => setPreviewImage(activeProject.images[0])}
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-neon-${activeProject.color}/20 border border-neon-${activeProject.color}/50 text-neon-${activeProject.color} hover:bg-neon-${activeProject.color}/40 transition-all z-10`}
                      aria-label="معاينة الصورة"
                    >
                      <Eye className="w-6 h-6" />
                    </button>

                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full bg-neon-${activeProject.color}/20 border border-neon-${activeProject.color}/40 text-neon-${activeProject.color} text-xs font-bold`}>
                      {activeProject.metric}
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="md:col-span-3 space-y-4 text-right flex flex-col">
                  <div className="flex items-center gap-3">
                    <activeProject.icon className={`w-8 h-8 text-neon-${activeProject.color}`} />
                    <h4 className="text-xl sm:text-2xl font-bold text-white font-cairo">
                      {activeProject.titleAr}
                    </h4>
                  </div>
                  
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed font-cairo">
                    {activeProject.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map(t => (
                      <span 
                        key={t} 
                        className={`px-3 py-1 rounded-full text-xs font-mono bg-neon-${activeProject.color}/10 text-neon-${activeProject.color}/80 border border-neon-${activeProject.color}/20`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3 mt-4 flex-1">
                    {activeProject.details.map((detail, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/5"
                      >
                        <h5 className="text-white/80 font-semibold text-sm mb-1 font-cairo flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full bg-neon-${activeProject.color}`} />
                          {detail.title}
                        </h5>
                        <p className="text-white/50 text-xs leading-relaxed font-cairo">
                          {detail.content}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Preview Modal with Gallery Support */}
      <AnimatePresence>
        {previewImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[998] flex items-center justify-center bg-black/98 backdrop-blur-2xl p-4 sm:p-8"
              onClick={() => setPreviewImage(null)}
            >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl max-h-[95vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button - Positioned below the header (h-20) */}
              <button
                onClick={() => setPreviewImage(null)}
                className="fixed top-28 right-8 p-4 rounded-2xl bg-white/10 text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all z-[999] backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.6)] group"
                aria-label="إغلاق"
              >
                <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Main Image */}
              <div className="relative w-full flex items-center justify-center">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl bg-black"
                />
              </div>

              {/* Thumbnail Gallery - if project has multiple images */}
              {activeProject.images.length > 1 && (
                <div className="flex gap-2 mt-4 justify-center flex-wrap">
                  {activeProject.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPreviewImage(img)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        previewImage === img 
                          ? `border-neon-${activeProject.color} ring-2 ring-neon-${activeProject.color}/50` 
                          : 'border-white/20 hover:border-white/50'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Image counter */}
              {activeProject.images.length > 1 && (
                <div className="mt-2 text-white/60 text-sm font-mono">
                  {activeProject.images.indexOf(previewImage) + 1} / {activeProject.images.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProjectsSection() {
  const { language, dir } = useLanguage();
  const t = translations[language];
  const featuredProjects = getFeaturedProjects(language);
  const galleryProjects = getGalleryProjects(language);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [openFeatured, setOpenFeatured] = useState<string | null>(null);

  const toggleFeatured = (id: string) => {
    setOpenFeatured(openFeatured === id ? null : id);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-16 sm:py-24 overflow-hidden bg-[#030308]"
    >
      <GlowOrb color="cyan" size={800} className="top-0 -right-[400px] opacity-10" delay={0} />
      <GlowOrb color="pink" size={700} className="bottom-0 -left-[350px] opacity-10" delay={2} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-2 rounded-full glass-card border-2 border-white/5 text-[10px] sm:text-xs font-black text-neon-cyan mb-10 tracking-[0.5em] uppercase shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_10px_#00ffff]" />
            {t.projects.badge}
          </motion.div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tighter leading-none">
            <AnimatedText text={t.projects.title} />
          </h2>
          
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto font-cairo leading-relaxed font-light">
            {t.projects.description}
          </p>
        </motion.div>

        {/* Featured Showcase List */}
        <div className="space-y-16 mb-32" dir={dir}>
          {featuredProjects.map((project, index) => {
            const isOpen = openFeatured === project.id;
            const Icon = project.icon;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.2 + index * 0.3 }}
              >
                <GlassCard
                  className={`p-2 border-t-[8px] border-neon-${project.color} transition-all duration-1000 hover:shadow-[0_0_100px_rgba(var(--neon-color-rgb),0.1)] rounded-[48px] overflow-hidden`}
                  intensity={isOpen ? "high" : "medium"}
                  glowColor={project.color as 'cyan' | 'pink'}
                >
                  <div 
                    className="p-6 sm:p-8 cursor-pointer"
                    onClick={() => toggleFeatured(project.id)}
                  >
                    <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-start">
                      {/* Left: Branding */}
                      <div className="flex gap-6 sm:gap-8 items-center flex-1">
                        <div className={`p-4 sm:p-5 rounded-2xl bg-neon-${project.color}/10 text-neon-${project.color} border-2 border-neon-${project.color}/20 flex-shrink-0 shadow-xl`}>
                          <Icon className="w-10 h-10 sm:w-12 sm:h-12" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-none tracking-tight" dir="ltr">
                            {project.title}
                          </h3>
                          <p className={`text-neon-${project.color} font-display text-base sm:text-lg font-bold font-cairo`}>
                            {project.titleAr}
                          </p>
                          <p className="text-white/60 max-w-xl font-cairo text-sm sm:text-base leading-relaxed font-light">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Right: Analytical Data */}
                      <div className="flex items-center gap-4 self-center lg:self-start">
                        <div className="flex gap-3 flex-wrap justify-center">
                          {project.stats.map((stat, i) => (
                            <div key={i} className="text-center p-4 rounded-2xl bg-black/60 border border-white/5 min-w-[100px] backdrop-blur-xl shadow-lg">
                              <div className={`text-lg font-bold text-neon-${project.color} font-mono`}>
                                {stat.value}
                              </div>
                              <div className="text-[10px] text-white/40 font-cairo uppercase tracking-wider mt-1">{stat.label}</div>
                            </div>
                          ))}
                        </div>

                        <button className={`hidden sm:flex p-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all shadow-lg group ${isOpen ? 'rotate-180 bg-neon-cyan/20 border-neon-cyan/50' : ''}`}>
                          <ChevronDown className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>

                    {/* Technical Ribbon */}
                    <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-white/5 font-cairo">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group shadow-lg">
                          <h.icon className={`w-5 h-5 text-neon-${project.color} group-hover:scale-125 transition-transform duration-500`} />
                          <span className="text-sm text-white/90 font-semibold tracking-tight">{h.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deep Architecture Unfolding */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 sm:p-10 pt-0 border-t border-white/5 bg-gradient-to-b from-transparent to-black/30">
                          {/* Visual Immersion */}
                          <div className="mb-10 rounded-2xl overflow-hidden shadow-xl border-2 border-white/5">
                            <ImageCarousel images={project.images} color={project.color} />
                          </div>

                          {/* Engineering Deep Dive */}
                          <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
                            {project.details.map((detail, i) => (
                              <motion.div 
                                key={i} 
                                className="flex gap-4 items-start bg-white/[0.01] p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all group"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                              >
                                <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-neon-${project.color}/20 text-neon-${project.color} flex-shrink-0 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                                  <detail.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1 space-y-2">
                                  <h4 className="text-white font-bold text-lg font-cairo">{detail.title}</h4>
                                  <p className="text-white/50 text-base leading-relaxed font-cairo">
                                    {detail.content}
                                  </p>
                                  <div className={`flex items-center gap-2 text-xs font-bold text-neon-${project.color} bg-neon-${project.color}/10 w-fit px-3 py-1.5 rounded-lg border border-neon-${project.color}/20 shadow-lg`}>
                                    <Zap className="w-4 h-4" />
                                    <span className="tracking-wider uppercase">{detail.impact}</span>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* 3D Secondary Gallery Section Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-neon-violet/10 border border-neon-violet/30 text-neon-violet text-[10px] sm:text-xs font-bold font-mono mb-6 tracking-[0.4em] uppercase shadow-lg">
            Technical_Archive
          </div>
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
            {language === 'ar' ? 'معرض المشاريع' : 'Project Gallery'}
          </h3>
          <p className="text-white/40 font-cairo text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            {language === 'ar' 
              ? 'مجموعة مكملة من المختبرات الهندسية والحلول في مجالات الذكاء الاصطناعي، الأنظمة المدمجة، ومعالجة الإشارات.'
              : 'A complementary collection of engineering labs and solutions in AI, embedded systems, and signal processing.'}
          </p>
        </motion.div>

        {/* The Premium 3D Carousel Component */}
        <ProjectGallery3D projects={galleryProjects} />

      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, Download, Loader2 } from 'lucide-react';

export function DocumentModal({ url, onClose }: { url: string; onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl h-[85vh] bg-[#0a0a0a] border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center px-6 py-4 bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-2 text-neon-cyan">
              <FileText size={20} />
              <span className="font-mono text-sm tracking-widest">SECURE_DOCUMENT_VIEWER</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={url}
                download
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 transition-colors text-sm font-medium"
              >
                <Download size={16} />
                تحميل
              </a>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex-1 bg-[#1a1a1a] p-2 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] z-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 text-neon-cyan animate-spin" />
                  <span className="text-white/60 text-sm">جاري تحميل المستند...</span>
                </div>
              </div>
            )}
            <object
              data={url}
              type="application/pdf"
              className="w-full h-full rounded-xl bg-white"
              onLoad={() => setIsLoading(false)}
            >
              <div className="flex flex-col items-center justify-center h-full gap-4 text-white/60">
                <FileText className="w-16 h-16" />
                <p>لا يمكن عرض المستند مباشرة</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 transition-colors"
                >
                  <Download size={16} />
                  فتح المستند في تبويب جديد
                </a>
              </div>
            </object>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

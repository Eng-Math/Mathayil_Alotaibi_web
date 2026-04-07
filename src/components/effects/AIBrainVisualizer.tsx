import { useEffect, useRef, useState } from 'react';

export function AIBrainVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        setSize({ w: width, h: height });
      }
    });

    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (size.w === 0 || size.h === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size.w;
    canvas.height = size.h;

    const colors = ['#00F0FF', '#FF00A0', '#00F0FF', '#BCBEFF'];
    const particles = Array.from({ length: 160 }, () => ({
      x: Math.random() * size.w,
      y: Math.random() * size.h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      baseR: Math.random() * 2 + 1,
      r: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI,
    }));

    let mouseX: number | null = null;
    let mouseY: number | null = null;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => { mouseX = null; mouseY = null; };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    let raf: number;
    const loop = () => {
      // Very dark background with slight trails
      ctx.fillStyle = 'rgba(2, 6, 23, 0.15)'; 
      ctx.fillRect(0, 0, size.w, size.h);

      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          
          if (d < 130) {
            const opacity = (1 - d / 130) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = p1.color === p2.color ? p1.color : '#00F0FF';
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }

        // Mouse connections
        if (mouseX !== null && mouseY !== null) {
          const dx = p1.x - mouseX;
          const dy = p1.y - mouseY;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 180) {
            const opacity = (1 - d / 180) * 0.7;
            ctx.beginPath();
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      ctx.globalCompositeOperation = 'source-over';

      particles.forEach((p) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > size.w) p.vx = -p.vx;
        if (p.y < 0 || p.y > size.h) p.vy = -p.vy;

        // Mouse interaction (gentle attraction)
        if (mouseX !== null && mouseY !== null) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 180) {
            const force = (180 - d) / 180;
            p.x += dx * force * 0.015;
            p.y += dy * force * 0.015;
            p.r = Math.min(p.baseR * 2.2, p.r + 0.1);
          } else if (p.r > p.baseR) {
            p.r -= 0.05;
          }
        } else if (p.r > p.baseR) {
          p.r -= 0.05;
        }

        // Pulse effect
        p.pulse += 0.04;
        const pulseR = p.r + Math.sin(p.pulse) * 0.4;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      raf = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [size]);

  return (
    <div className="w-full h-full min-h-[300px] relative">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block cursor-crosshair opacity-100"
      />
      {/* Logo Overlay with Glitch Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
        <div className="relative logo-glitch-container w-full h-full max-w-[90%] max-h-[90%]">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-full h-full object-contain opacity-90 logo-glitch"
          />
          {/* Glitch layers */}
          <img 
            src="/logo.png" 
            alt="" 
            className="absolute inset-0 w-full h-full object-contain opacity-0 logo-glitch-red"
            aria-hidden="true"
          />
          <img 
            src="/logo.png" 
            alt="" 
            className="absolute inset-0 w-full h-full object-contain opacity-0 logo-glitch-blue"
            aria-hidden="true"
          />
        </div>
      </div>
      <style>{`
        @keyframes glitch {
          0% { transform: translate(0); filter: none; }
          2% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
          4% { transform: translate(2px, -2px); filter: hue-rotate(-90deg); }
          6% { transform: translate(-2px, 0); filter: hue-rotate(45deg); }
          8% { transform: translate(0); filter: none; }
          92% { transform: translate(0); filter: none; }
          94% { transform: translate(2px, 2px); filter: brightness(1.2) contrast(1.2); }
          96% { transform: translate(-2px, -2px); filter: brightness(0.8) contrast(1.5); }
          98% { transform: translate(2px, 0); filter: hue-rotate(180deg); }
          100% { transform: translate(0); filter: none; }
        }
        @keyframes glitchRed {
          0%, 100% { opacity: 0; transform: translate(0); }
          10% { opacity: 0; }
          11% { opacity: 0.6; transform: translate(-4px, 0); }
          12% { opacity: 0; }
          50% { opacity: 0; }
          51% { opacity: 0.5; transform: translate(-3px, 2px); }
          52% { opacity: 0; }
          80% { opacity: 0; }
          81% { opacity: 0.7; transform: translate(-5px, -1px); }
          82% { opacity: 0; }
        }
        @keyframes glitchBlue {
          0%, 100% { opacity: 0; transform: translate(0); }
          20% { opacity: 0; }
          21% { opacity: 0.6; transform: translate(4px, 0); }
          22% { opacity: 0; }
          60% { opacity: 0; }
          61% { opacity: 0.5; transform: translate(3px, -2px); }
          62% { opacity: 0; }
          90% { opacity: 0; }
          91% { opacity: 0.7; transform: translate(5px, 1px); }
          92% { opacity: 0; }
        }
        .logo-glitch {
          animation: glitch 4s infinite;
        }
        .logo-glitch-red {
          mix-blend-mode: screen;
          filter: hue-rotate(-60deg) saturate(2);
          animation: glitchRed 3s infinite;
        }
        .logo-glitch-blue {
          mix-blend-mode: screen;
          filter: hue-rotate(60deg) saturate(2);
          animation: glitchBlue 3.5s infinite;
        }
        .logo-glitch-container {
          animation: containerGlitch 5s infinite;
        }
        @keyframes containerGlitch {
          0%, 90%, 100% { transform: scale(1); }
          91% { transform: scale(1.02) skewX(-1deg); }
          92% { transform: scale(0.98) skewX(1deg); }
          93% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';

interface NeuralPoint {
  x: number;
  y: number;
  z: number;
  phase: number;
  size: number;
}

export function BrainNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<NeuralPoint[]>([]);
  const rotationRef = useRef({ x: 0.25, y: 0.35 });
  const targetRotationRef = useRef({ x: 0.25, y: 0.35 });
  const pulseTimeRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Create brain structure with anatomical accuracy
  const initBrain = useCallback((w: number, h: number) => {
    const scale = Math.min(w, h) / 150;
    const cx = w / 2;
    const cy = h / 2 - 15 * scale;
    const points: NeuralPoint[] = [];

    // Define brain regions with realistic proportions
    const regions = [
      // Left hemisphere - frontal, parietal, temporal, occipital
      { x: -25, y: -15, z: 0, rx: 35, ry: 45, rz: 32 },
      // Right hemisphere
      { x: 25, y: -15, z: 0, rx: 35, ry: 45, rz: 32 },
      // Brain stem
      { x: 0, y: 50, z: -10, rx: 12, ry: 25, rz: 12 },
      // Cerebellum
      { x: -5, y: 45, z: 25, rx: 22, ry: 18, rz: 20 },
    ];

    // Generate surface points for each region
    regions.forEach(region => {
      for (let phi = 0; phi < Math.PI; phi += 0.2) {
        for (let theta = 0; theta < Math.PI * 2; theta += 0.15) {
          // Create ellipsoid with brain-like modifications
          let x = region.rx * Math.sin(phi) * Math.cos(theta);
          let y = region.ry * Math.cos(phi);
          let z = region.rz * Math.sin(phi) * Math.sin(theta);

          // Add brain folds (gyri and sulci)
          const fold = 
            Math.sin(phi * 5) * Math.cos(theta * 4) * 3 +
            Math.cos(phi * 7) * Math.sin(theta * 6) * 2 +
            Math.sin(theta * 8) * 2;
          
          // Apply folds
          const r = Math.sqrt(x*x + y*y + z*z);
          const factor = 1 + fold / r * 0.15;
          x *= factor;
          y *= factor;
          z *= factor;

          // Skip center fissure area
          if (Math.abs(x) < 5 && y < 20) continue;

          const px = cx + (region.x + x) * scale;
          const py = cy + (region.y + y) * scale;
          const pz = (region.z + z) * scale;

          points.push({
            x: px, y: py, z: pz,
            phase: Math.random() * Math.PI * 2,
            size: 1.5 + Math.random() * 2
          });
        }
      }
    });

    // Add internal neural network points
    for (let i = 0; i < 60; i++) {
      const region = regions[Math.floor(Math.random() * 2)]; // Only hemispheres
      const phi = Math.random() * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      const r = 0.3 + Math.random() * 0.5; // Inside the brain

      const x = region.x + region.rx * r * Math.sin(phi) * Math.cos(theta);
      const y = region.y + region.ry * r * Math.cos(phi);
      const z = region.z + region.rz * r * Math.sin(phi) * Math.sin(theta);

      points.push({
        x: cx + x * scale,
        y: cy + y * scale,
        z: z * scale,
        phase: Math.random() * Math.PI * 2,
        size: 1 + Math.random() * 1.5
      });
    }

    pointsRef.current = points;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const p = canvas.parentElement;
      if (p) {
        canvas.width = p.offsetWidth;
        canvas.height = p.offsetHeight;
        initBrain(canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    setTimeout(() => setIsLoaded(true), 200);

    return () => window.removeEventListener('resize', resize);
  }, [initBrain]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      targetRotationRef.current = {
        x: 0.25 + ((e.clientY - r.top) / r.height - 0.5) * 0.5,
        y: 0.35 + ((e.clientX - r.left) / r.width - 0.5) * 0.6
      };
    };

    const onLeave = () => {
      targetRotationRef.current = { x: 0.25, y: 0.35 };
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let anim: number;

    const loop = () => {
      pulseTimeRef.current += 0.016;
      const t = pulseTimeRef.current;

      // Smooth rotation
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.04;
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.04;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Clear
      ctx.fillStyle = 'rgba(8, 10, 18, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      // Project
      const project = (x: number, y: number, z: number) => {
        const nx = x - cx;
        const ny = y - cy;

        const ry = ny * cosX - z * sinX;
        const rz = ny * sinX + z * cosX;

        const rx = nx * cosY + rz * sinY;
        const rz2 = -nx * sinY + rz * cosY;

        const fov = 450;
        const d = fov + rz2;
        const s = fov / Math.max(d, 25);

        return { x: cx + rx * s, y: cy + ry * s, z: rz2, scale: s };
      };

      const pts = pointsRef.current;
      const projected = pts.map(p => ({ ...project(p.x, p.y, p.z), orig: p }))
        .sort((a, b) => a.z - b.z);

      // Draw surface connections (creating the brain shape)
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          
          if (p1.z < -80 || p2.z < -80) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Surface connections (short distance)
          if (dist < 28) {
            const pulse = Math.sin(t + p1.orig.phase) * 0.5 + 0.5;
            const alpha = (1 - dist / 28) * 0.12 * (0.5 + pulse * 0.5);
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Cyan glass color
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, `rgba(0, 200, 255, ${alpha})`);
            grad.addColorStop(0.5, `rgba(100, 220, 255, ${alpha * 1.2})`);
            grad.addColorStop(1, `rgba(0, 200, 255, ${alpha})`);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6 * Math.min(p1.scale, p2.scale);
            ctx.stroke();
          }

          // Neural connections (longer distance, fewer)
          if (dist > 30 && dist < 60 && (i + j) % 7 === 0) {
            const pulse = Math.sin(t * 2 + p1.orig.phase + j) * 0.5 + 0.5;
            const alpha = (1 - (dist - 30) / 30) * 0.08 * pulse;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            // Curved connection
            const cpx = (p1.x + p2.x) / 2 + (Math.sin(t + i) * 15);
            const cpy = (p1.y + p2.y) / 2 + (Math.cos(t + j) * 15);
            ctx.quadraticCurveTo(cpx, cpy, p2.x, p2.y);
            
            ctx.strokeStyle = `rgba(180, 230, 255, ${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // Draw glowing neural nodes
      projected.forEach(p => {
        if (p.z < -100) return;

        const pulse = Math.sin(t * 3 + p.orig.phase) * 0.5 + 0.5;
        const size = p.orig.size * p.scale * (0.8 + pulse * 0.5);

        // Outer glow layers
        for (let i = 3; i >= 1; i--) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * i * 2);
          g.addColorStop(0, `rgba(255, 255, 255, ${0.3 * pulse / i})`);
          g.addColorStop(0.5, `rgba(0, 220, 255, ${0.15 * pulse / i})`);
          g.addColorStop(1, 'rgba(0, 100, 200, 0)');
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * i * 2, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.85 + pulse * 0.15})`;
        ctx.fill();
      });

      // Traveling pulses
      for (let i = 0; i < 4; i++) {
        const pos = (t * 0.3 + i / 4) % 1;
        const idx = Math.floor(pos * projected.length);
        const p = projected[idx];
        
        if (p && p.z > -40) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = 'rgba(0, 230, 255, 0.9)';
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Ambient glow
      const amb = ctx.createRadialGradient(cx, cy, 0, cx, cy, 130);
      amb.addColorStop(0, 'rgba(0, 150, 200, 0.04)');
      amb.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = amb;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      anim = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(anim);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl" style={{ background: 'radial-gradient(ellipse at center, #0a1020 0%, #050810 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)' }} />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div className="w-10 h-10 rounded-full border-2 border-cyan-400/60 border-t-transparent" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-cyan-500/40" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-cyan-500/40" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-cyan-500/40" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-cyan-500/40" />
      </div>

      <div className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-cyan-400/60 tracking-[3px]">NEURAL_CORTEX_V6</div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-cyan-400/60 tracking-[3px]">BIO_DIGITAL_INTERFACE</div>

      <canvas ref={canvasRef} className="block w-full h-full cursor-move" style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s' }} />
    </div>
  );
}

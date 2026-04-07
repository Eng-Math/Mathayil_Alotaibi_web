import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  z: number;
  sx: number;
  sy: number;
  sz: number;
  vx: number;
  vy: number;
  vz: number;
  ax: number;
  ay: number;
  az: number;
  bs: number;
  ph: number;
  dl: number;
  t: string;
  px: number;
  py: number;
  ps: number;
  rz: number;
  prog: number;
}

// 3D face points with real depth per anatomical feature
function getFace3DPoints(scale: number) {
  const pts: { x: number; y: number; z: number; t: string }[] = [];

  // Face oval – sides recede deeply, center protrudes slightly
  for (let a = 0; a < Math.PI * 2; a += 0.07) {
    const x = Math.cos(a) * 110 * scale;
    const y = Math.sin(a) * 140 * scale - 20 * scale;
    const z = -38 * scale * Math.abs(Math.sin(a)) + 4 * scale;
    pts.push({ x, y, z, t: 'outline' });
  }
  
  // Jawline
  for (let a = Math.PI * 0.55; a < Math.PI * 1.45; a += 0.1) {
    pts.push({ x: Math.cos(a) * 90 * scale, y: Math.sin(a) * 130 * scale - 18 * scale, z: -12 * scale, t: 'jaw' });
  }
  
  // Cheekbones – high z (protruding)
  for (let t = 0; t <= 1; t += 0.14) {
    pts.push({ x: -74 * scale, y: (-12 + t * 55) * scale, z: (30 - t * 10) * scale, t: 'cheek' });
    pts.push({ x: 74 * scale, y: (-12 + t * 55) * scale, z: (30 - t * 10) * scale, t: 'cheek' });
  }
  
  // Forehead ridges
  for (let t = 0; t <= 1; t += 0.15) {
    pts.push({ x: (-60 + t * 120) * scale, y: -100 * scale, z: (8 - Math.abs(t - 0.5) * 12) * scale, t: 'forehead' });
  }
  
  // Eyebrows
  for (let t = 0; t <= 1; t += 0.1) {
    pts.push({ x: (-70 + t * 52) * scale, y: (-72 - t * (1 - t) * 22) * scale, z: 22 * scale, t: 'brow' });
    pts.push({ x: (18 + t * 52) * scale, y: (-72 + t * (1 - t) * 22) * scale, z: 22 * scale, t: 'brow' });
  }
  
  // Eyes – slightly recessed vs cheeks
  for (let a = 0; a < Math.PI * 2; a += 0.2) {
    pts.push({ x: (-47 + Math.cos(a) * 23) * scale, y: (-40 + Math.sin(a) * 11) * scale, z: 15 * scale, t: 'eye' });
    pts.push({ x: (47 + Math.cos(a) * 23) * scale, y: (-40 + Math.sin(a) * 11) * scale, z: 15 * scale, t: 'eye' });
  }
  
  // Pupils – most forward of eye region
  for (let a = 0; a < Math.PI * 2; a += 0.36) {
    pts.push({ x: (-47 + Math.cos(a) * 8) * scale, y: (-40 + Math.sin(a) * 8) * scale, z: 26 * scale, t: 'pupil' });
    pts.push({ x: (47 + Math.cos(a) * 8) * scale, y: (-40 + Math.sin(a) * 8) * scale, z: 26 * scale, t: 'pupil' });
  }
  
  // Nose bridge – deepens as goes down
  for (let t = 0; t <= 1; t += 0.09) {
    pts.push({ x: -5 * scale, y: (-22 + t * 47) * scale, z: (20 + t * 42) * scale, t: 'nose' });
  }
  
  // Nose sides
  for (let t = 0; t <= 1; t += 0.12) {
    pts.push({ x: (-5 - t * 18) * scale, y: (14 + t * 14) * scale, z: (58 - t * 12) * scale, t: 'nose' });
    pts.push({ x: (-5 + t * 18) * scale, y: (14 + t * 14) * scale, z: (58 - t * 12) * scale, t: 'nose' });
  }
  
  // Nose tip – maximum z protrusion
  for (let a = Math.PI; a < Math.PI * 2; a += 0.17) {
    pts.push({ x: Math.cos(a) * 24 * scale, y: (22 + Math.sin(a) * 9) * scale, z: 68 * scale, t: 'nose' });
  }
  
  // Nostrils
  for (let a = 0; a < Math.PI * 2; a += 0.38) {
    pts.push({ x: (-23 + Math.cos(a) * 7) * scale, y: (29 + Math.sin(a) * 5) * scale, z: 54 * scale, t: 'nostril' });
    pts.push({ x: (23 + Math.cos(a) * 7) * scale, y: (29 + Math.sin(a) * 5) * scale, z: 54 * scale, t: 'nostril' });
  }
  
  // Lips – upper and lower with arc depth
  for (let t = 0; t <= 1; t += 0.06) {
    const lz = (30 + Math.sin(t * Math.PI) * 14) * scale;
    pts.push({ x: (-42 + t * 84) * scale, y: (67 - Math.sin(t * Math.PI) * 5) * scale, z: lz, t: 'lip' });
    pts.push({ x: (-42 + t * 84) * scale, y: (80 + Math.sin(t * Math.PI) * 7) * scale, z: lz * 0.82, t: 'lip' });
  }
  
  // Chin
  for (let t = 0; t <= 1; t += 0.16) {
    pts.push({ x: (-32 + t * 64) * scale, y: 130 * scale, z: (14 + Math.sin(t * Math.PI) * 9) * scale, t: 'chin' });
  }
  
  // Ears – far back, most negative z
  for (let a = -Math.PI / 3.2; a < Math.PI / 3.2; a += 0.18) {
    pts.push({ x: (-114 + Math.cos(a) * 13) * scale, y: Math.sin(a) * 28 * scale, z: -46 * scale, t: 'ear' });
    pts.push({ x: (114 - Math.cos(a) * 13) * scale, y: Math.sin(a) * 28 * scale, z: -46 * scale, t: 'ear' });
  }
  
  return pts;
}

export function FaceNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -999, y: -999, over: false });
  const rotationRef = useRef({ x: 0.05, y: 0.15, targetX: 0, targetY: 0.15 });
  const idleAngleRef = useRef(0);
  const birthTimeRef = useRef(0);
  const tickRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const nodeCountRef = useRef(0);

  const initParticles = useCallback((W: number, H: number) => {
    const sc = Math.min(W, H) / 600;
    const fp = getFace3DPoints(sc);
    nodeCountRef.current = fp.length;
    birthTimeRef.current = Date.now();
    const spread = Math.max(W, H) * 0.65;

    particlesRef.current = fp.map((f) => {
      const sx = (Math.random() - 0.5) * spread;
      const sy = (Math.random() - 0.5) * spread;
      const sz = (Math.random() - 0.5) * spread;
      return {
        x: sx, y: sy, z: sz,
        sx, sy, sz,
        vx: 0, vy: 0, vz: 0,
        ax: f.x, ay: f.y, az: f.z,
        bs: 0.7 + Math.random() * 1.5,
        ph: Math.random() * Math.PI * 2,
        dl: Math.random() * 1100,
        t: f.t,
        px: 0, py: 0, ps: 1, rz: 0, prog: 0
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        initParticles(canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.over = true;
      rotationRef.current.targetY = ((mouseRef.current.x / canvas.width) - 0.5) * 0.65;
      rotationRef.current.targetX = ((mouseRef.current.y / canvas.height) - 0.5) * 0.42;
    };

    const handleMouseLeave = () => {
      mouseRef.current.over = false;
      mouseRef.current.x = -999;
      mouseRef.current.y = -999;
      rotationRef.current.targetX = 0;
      rotationRef.current.targetY = 0;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const BIRTH_MS = 3000;

    const draw = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tickRef.current++;

      const now = Date.now();
      const elapsed = now - birthTimeRef.current;
      const cx = canvas.width / 2;
      const cy = canvas.height * 0.47;
      const fov = Math.min(canvas.width, canvas.height) * 0.88;
      const sc = Math.min(canvas.width, canvas.height) / 600;

      // Idle gentle sway when no mouse
      if (!mouseRef.current.over) {
        idleAngleRef.current += 0.0028;
        rotationRef.current.targetY = Math.sin(idleAngleRef.current) * 0.22;
        rotationRef.current.targetX = Math.sin(idleAngleRef.current * 0.55 + 0.8) * 0.08;
      }
      
      // Smooth rotation lerp
      rotationRef.current.x += (rotationRef.current.targetX - rotationRef.current.x) * 0.05;
      rotationRef.current.y += (rotationRef.current.targetY - rotationRef.current.y) * 0.05;

      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const particles = particlesRef.current;

      // Update particles + project
      particles.forEach((p) => {
        const pe = elapsed - p.dl;
        p.prog = pe <= 0 ? 0 : Math.min(1, pe / (BIRTH_MS * 0.68));
        const ease = p.prog < 1 ? 1 - (1 - p.prog) ** 3 : 1;

        if (p.prog >= 1) {
          p.vx += (p.ax - p.x) * 0.052;
          p.vy += (p.ay - p.y) * 0.052;
          p.vz += (p.az - p.z) * 0.052;
          p.vx *= 0.78; p.vy *= 0.78; p.vz *= 0.78;
          p.x += p.vx; p.y += p.vy; p.z += p.vz;
        } else {
          p.x = p.sx + (p.ax - p.sx) * ease;
          p.y = p.sy + (p.ay - p.sy) * ease;
          p.z = p.sz + (p.az - p.sz) * ease;
        }

        // 3D Rotation (Y then X)
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        p.rz = z2;
        const d = fov / (fov + z2);
        p.px = cx + x1 * d;
        p.py = cy + y2 * d;
        p.ps = d;
      });

      // Mouse repulsion
      if (mouseRef.current.over) {
        particles.forEach((p) => {
          if (p.prog < 0.85) return;
          const mdx = p.px - mouseRef.current.x;
          const mdy = p.py - mouseRef.current.y;
          const md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < 90 && md > 0) {
            const f = (90 - md) / 90 * 3.2;
            p.vx += (mdx / md) * f * 0.75;
            p.vy += (mdy / md) * f * 0.75;
            p.vz += f * 1.8;
          }
        });
      }

      // Sort back-to-front
      particles.sort((a, b) => a.rz - b.rz);

      // Draw connections
      const CD = 38;
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        if (pi.prog < 0.12) continue;
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          if (pj.prog < 0.12) continue;
          const dx = pi.px - pj.px;
          const dy = pi.py - pj.py;
          const d2 = dx * dx + dy * dy;
          if (d2 < CD * CD) {
            const dist = Math.sqrt(d2);
            const dep = (pi.ps + pj.ps) * 0.5;
            const prg = pi.prog * pj.prog;
            const alpha = (1 - dist / CD) * 0.58 * dep * prg;

            const back = Math.max(0, Math.min(1, (-Math.min(pi.rz, pj.rz)) / (50 * sc)));
            const r = Math.round(back * 150);
            const g = Math.round(229 - back * 150);
            const b = 255;

            ctx.beginPath();
            ctx.moveTo(pi.px, pi.py);
            ctx.lineTo(pj.px, pj.py);
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = 0.55 * dep;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        if (p.prog < 0.02) return;
        const flutter = Math.sin(tickRef.current * 0.022 + p.ph) * 0.22 + 0.78;
        const sz = Math.max(0.3, p.bs * p.ps * (0.7 + p.ps * 1.3) * flutter);
        const alpha = Math.min(1, p.ps * 1.5 * p.prog * (0.65 + flutter * 0.35));

        let r: number, g: number, b: number;
        const dep = p.ps;
        if (p.t === 'pupil') { r = 180; g = 80; b = 255; }
        else if (p.t === 'lip') { r = 210; g = 100; b = 255; }
        else if (p.t === 'ear') { r = 60; g = 60; b = 190; }
        else {
          const bf = Math.max(0, Math.min(1, (1.0 - dep) * 3.5));
          r = Math.round(bf * 160);
          g = Math.round(229 - bf * 150);
          b = 255;
        }

        ctx.beginPath();
        ctx.arc(p.px, p.py, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;

        if (dep > 0.9 && p.prog > 0.7) {
          ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
          ctx.shadowBlur = sz * 5;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        if (dep > 1.0 && p.prog > 0.9) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, sz * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},0.03)`;
          ctx.fill();
        }
      });

      // HUD scan line
      if (tickRef.current % 170 < 85) {
        const fH = 300 * sc;
        const sy = cy - fH * 0.5 + (tickRef.current % 170) / 85 * fH * 1.25;
        const fW = 125 * sc;
        ctx.beginPath();
        ctx.moveTo(cx - fW, sy);
        ctx.lineTo(cx + fW, sy);
        ctx.strokeStyle = 'rgba(0,229,255,0.07)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles]);

  return (
    <div className="relative w-full h-full">
      {/* Orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="absolute w-[380px] h-[380px] rounded-full border border-neon-cyan/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute -top-1.5 left-1/2 w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_10px_#00d4ff]" />
        </motion.div>
        <motion.div 
          className="absolute w-[480px] h-[480px] rounded-full border border-neon-violet/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="absolute w-[580px] h-[580px] rounded-full border border-neon-pink/10 border-dashed"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* HUD corners */}
      <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-neon-cyan pointer-events-none" />
      <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-neon-cyan pointer-events-none" />
      <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-neon-cyan pointer-events-none" />
      <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-neon-cyan pointer-events-none" />

      {/* HUD labels */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-neon-cyan/40 tracking-[2px] pointer-events-none">
        FACE_SCAN :: 0xA4F2
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-neon-cyan/40 tracking-[2px] pointer-events-none">
        NODE_COUNT: {nodeCountRef.current}
      </div>

      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-0 w-full h-px bg-neon-cyan -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 h-full w-px bg-neon-cyan -translate-x-1/2" />
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-crosshair"
      />
    </div>
  );
}

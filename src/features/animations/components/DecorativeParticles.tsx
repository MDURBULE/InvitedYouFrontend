'use client';

import React, { useEffect, useRef } from 'react';

interface DecorativeParticlesProps {
  type?: 'gold-dust' | 'rose-petals' | 'confetti' | 'stars';
  count?: number;
  active?: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  shape: 'circle' | 'petal' | 'rect';
}

const GOLD_PALETTE = ['#D4AF37', '#E5C378', '#F3E5AB', '#C5A059'];
const ROSE_PALETTE = ['#C98686', '#E29578', '#FFDDD2', '#B86F6F'];
const CONFETTI_PALETTE = ['#D4AF37', '#8B1E2E', '#F4A226', '#1B4D3E', '#FFB703', '#E63946'];

export const DecorativeParticles: React.FC<DecorativeParticlesProps> = ({
  type = 'gold-dust',
  count = 25,
  active = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active || typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Bound particle count
    const safeCount = Math.min(Math.max(count, 5), 40);

    const particles: Particle[] = [];
    const colors =
      type === 'rose-petals' ? ROSE_PALETTE : type === 'confetti' ? CONFETTI_PALETTE : GOLD_PALETTE;

    for (let i = 0; i < safeCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === 'rose-petals' ? Math.random() * 8 + 6 : Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * (type === 'confetti' ? 1.5 : 0.6),
        speedY: Math.random() * (type === 'rose-petals' ? 1.2 : 0.8) + 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.6 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: type === 'rose-petals' ? 'petal' : type === 'confetti' ? 'rect' : 'circle',
      });
    }

    const render = () => {
      if (!isVisible) {
        animFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap edges smoothly
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 'petal') {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [type, count, active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 h-full w-full"
      aria-hidden="true"
    />
  );
};

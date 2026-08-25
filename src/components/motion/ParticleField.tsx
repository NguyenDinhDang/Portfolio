import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  baseAlpha: number;
  color: string;
  driftOffset: number;
  driftSpeed: number;
}

interface ParticleFieldProps {
  particleCount?: number;
  enableParticles?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Đạo hữu xin nương tay, hạt bụi linh khí trong trận pháp Canvas 2D này đang phiêu dạt cực kỳ trơn tru,
 * chớ dại sửa đổi tọa độ Delta và Sin Drift kẻo thiên địa nghịch chuyển, hạt bay hỗn loạn tẩu hỏa nhập ma!
 */
export const ParticleField: React.FC<ParticleFieldProps> = ({
  particleCount = 24,
  enableParticles = true,
  className,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!enableParticles || shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = !document.hidden;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Initialize particles with deterministic random properties
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const isCrimson = Math.random() > 0.45;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 1.2, // 1.2px - 3.0px
        speed: Math.random() * 0.45 + 0.25, // vertical rise speed
        baseAlpha: Math.random() * 0.4 + 0.2, // 0.2 - 0.6 opacity
        color: isCrimson ? '255, 51, 68' : '244, 244, 247', // Crimson / Star White
        driftOffset: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.008 + 0.003,
      };
    });

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let lastTime = performance.now();
    let elapsed = 0;

    const render = (now: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      elapsed += delta;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift upwards
        p.y -= p.speed * 60 * delta;

        // Subtle sinusoidal anti-gravity sway
        const currentX = p.x + Math.sin(elapsed * p.driftSpeed * 100 + p.driftOffset) * 12;

        // Respawn smoothly when particle rises past top
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        // Fade in from bottom, fade out near top
        const normalizedY = p.y / height;
        let fade = 1;
        if (normalizedY < 0.15) fade = normalizedY / 0.15;
        if (normalizedY > 0.85) fade = (1 - normalizedY) / 0.15;
        fade = Math.max(0, Math.min(1, fade));

        const alpha = p.baseAlpha * fade;

        ctx.beginPath();
        ctx.arc(currentX, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${alpha.toFixed(3)})`;
        ctx.shadowColor = `rgba(${p.color}, ${alpha * 0.8})`;
        ctx.shadowBlur = p.radius * 2;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enableParticles, particleCount, shouldReduceMotion]);

  if (!enableParticles || shouldReduceMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
        ...style,
      }}
    />
  );
};

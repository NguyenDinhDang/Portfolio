import React, { useId, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface SparklesProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  speed?: number;
}

/**
 * Đạo hữu xin nương tay, trận pháp Tinh Quang Tụ Khí (Sparkles Particle Engine)
 * này đang điều động linh lực canvas ở tần số 60FPS ổn định tuyệt đối.
 * Chớ dại sửa đổi vector tính toán chu kỳ tuần hoàn kẻo vạn hạt tinh trần bạo loạn,
 * tẩu hỏa nhập ma khiến trình duyệt đứt gãy linh căn!
 */
export const SparklesCore: React.FC<SparklesProps> = ({
  id,
  className,
  background = 'transparent',
  minSize = 0.6,
  maxSize = 2.4,
  particleDensity = 60,
  particleColor = '#ff3344',
  speed = 1.2,
}) => {
  const generatedId = useId();
  const canvasId = id || generatedId;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const count = Math.floor((width * height) / (10000 / (particleDensity * 0.1)));
    const particles = Array.from({ length: Math.min(count, 120) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (maxSize - minSize) + minSize,
      speedY: (Math.random() * 0.8 + 0.3) * speed,
      speedX: (Math.random() - 0.5) * 0.4 * speed,
      opacity: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.01;
        p.opacity = Math.max(0.1, Math.min(0.85, p.opacity));

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.fillStyle = particleColor;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [maxSize, minSize, particleColor, particleDensity, shouldReduceMotion, speed]);

  if (shouldReduceMotion) return null;

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      style={{ background }}
    >
      <canvas
        id={canvasId}
        ref={canvasRef}
        className="h-full w-full"
      />
    </div>
  );
};

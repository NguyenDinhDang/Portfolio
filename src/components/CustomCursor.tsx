import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check coarse pointer or reduced motion
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || isReduced) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let hoverText = '';
    let rafId: number;

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check hovered interactive elements
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [data-cursor], article');
      if (interactive) {
        isHovered = true;
        hoverText = interactive.getAttribute('data-cursor') || '';
      } else {
        isHovered = false;
        hoverText = '';
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // 60FPS Lerp Animation Loop
    const loop = () => {
      // Linear interpolation for smooth trailing ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        dotRef.current.style.opacity = mouseX > 0 ? '1' : '0';
      }

      if (ringRef.current) {
        const scale = isHovered ? (hoverText ? '2.4' : '1.75') : '1';
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.borderColor = isHovered ? 'var(--accent)' : 'rgba(255, 255, 255, 0.35)';
        ringRef.current.style.backgroundColor = isHovered ? 'var(--accent-subtle)' : 'transparent';
        ringRef.current.style.opacity = mouseX > 0 ? '1' : '0';
      }

      if (labelRef.current) {
        labelRef.current.textContent = hoverText;
        labelRef.current.style.opacity = hoverText ? '1' : '0';
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: -3,
          left: -3,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      />

      {/* Trailing Physical Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform, opacity, border-color, background-color',
          transition: 'border-color 0.2s, background-color 0.2s',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '7px',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.15s',
          }}
        />
      </div>
    </>
  );
};

import React, { useEffect, useRef } from 'react';
import { HeroThreeScene as ThreeSceneCore } from '../lib/three/heroScene';

export const HeroThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const sceneInstance = new ThreeSceneCore(containerRef.current);

    return () => {
      sceneInstance.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
        overflow: 'hidden',
      }}
    />
  );
};

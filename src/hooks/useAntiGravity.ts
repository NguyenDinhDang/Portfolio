import { useEffect, useRef } from 'react';
import { AntiGravitySystem, type AntiGravityOptions } from '../lib/physics/AntiGravity';

export function useAntiGravity(selector: string, options?: AntiGravityOptions) {
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize physics system for selected DOM elements
    const system = new AntiGravitySystem(selector, optionsRef.current);

    return () => {
      system.destroy();
    };
  }, [selector]);
}



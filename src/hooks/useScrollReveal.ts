import { useEffect } from 'react';

export function useScrollReveal(selector: string = '[data-reveal]') {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll(selector).forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('is-revealed');
            obs.unobserve(target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el, index) => {
      const htmlEl = el as HTMLElement;
      if (!htmlEl.style.transitionDelay) {
        const delay = (index % 4) * 80;
        htmlEl.style.transitionDelay = `${delay}ms`;
      }
      observer.observe(htmlEl);
    });

    return () => {
      observer.disconnect();
    };
  }, [selector]);
}

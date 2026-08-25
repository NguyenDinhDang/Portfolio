import React from 'react';
import { motion, type Variants, useReducedMotion } from 'framer-motion';

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const itemFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const itemScaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface RevealSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  watermarkText?: string;
  amount?: number;
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  id,
  className = 'section',
  style,
  watermarkText,
  amount = 0.2,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={containerVariants}
    >
      {/* Editorial Watermark Backdrop Layer for Spatial Depth */}
      {watermarkText && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(5rem, 15vw, 16rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            color: 'rgba(255, 255, 255, 0.018)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          {watermarkText}
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.section>
  );
};

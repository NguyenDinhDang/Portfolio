import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MarqueeProps {
  items?: string[];
  speed?: number; // duration in seconds
  reverse?: boolean;
  className?: string;
}

const DEFAULT_ITEMS = [
  'HIGH-SCALE DISTRIBUTED BACKEND',
  'CONTEXT-AWARE RAG ARCHITECTURES',
  'SUB-MILLISECOND ASYNC APIS',
  'STRICT ACID DATA INTEGRITY',
  'DETERMINISTIC SIMPLICITY',
  'PRODUCTION VECTOR RETRIEVAL',
  'CLEAN REUSABLE ARCHITECTURE',
];

export const Marquee: React.FC<MarqueeProps> = ({
  items = DEFAULT_ITEMS,
  speed = 22,
  reverse = false,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const content = items.map((item, index) => (
    <span
      key={index}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '1.25rem',
        marginRight: '1.25rem',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-secondary)',
        whiteSpace: 'nowrap',
      }}
    >
      <span>{item}</span>
      <span
        style={{
          color: 'var(--accent)',
          fontSize: '1rem',
          lineHeight: 1,
          opacity: 0.8,
        }}
      >
        •
      </span>
    </span>
  ));

  return (
    <div
      className={className}
      style={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        paddingBlock: '1.25rem',
        backgroundColor: 'rgba(17, 17, 21, 0.65)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(8px)',
        userSelect: 'none',
      }}
    >
      {/* Edge gradient mask for smooth fading */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '60px',
          background: 'linear-gradient(to right, var(--bg-primary), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '60px',
          background: 'linear-gradient(to left, var(--bg-primary), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <motion.div
        style={{
          display: 'flex',
          width: 'max-content',
          willChange: 'transform',
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: reverse ? ['-50%', '0%'] : ['0%', '-50%'],
              }
        }
        transition={
          shouldReduceMotion
            ? {}
            : {
                ease: 'linear',
                duration: speed,
                repeat: Infinity,
              }
        }
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>{content}</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>{content}</div>
      </motion.div>
    </div>
  );
};

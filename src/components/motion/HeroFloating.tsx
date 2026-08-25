import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { HeroThreeScene } from '../HeroThreeScene';

const ROLES = [
  'Python / FastAPI Specialist',
  'Distributed Backend Architect',
  'Context-Aware RAG Engineer',
  'High-Performance Systems Builder',
];

const HERO_PARTICLES = [
  { left: '8%', size: 3, color: 'rgba(255, 51, 68, 0.65)', duration: 9.5, delay: 0.2 },
  { left: '16%', size: 4, color: 'rgba(244, 244, 247, 0.5)', duration: 12.0, delay: 2.1 },
  { left: '24%', size: 2, color: 'rgba(255, 51, 68, 0.55)', duration: 8.4, delay: 1.4 },
  { left: '33%', size: 3, color: 'rgba(244, 244, 247, 0.4)', duration: 13.2, delay: 3.8 },
  { left: '42%', size: 4, color: 'rgba(255, 51, 68, 0.7)', duration: 10.5, delay: 0.8 },
  { left: '50%', size: 2, color: 'rgba(244, 244, 247, 0.6)', duration: 11.2, delay: 4.5 },
  { left: '58%', size: 3, color: 'rgba(255, 51, 68, 0.6)', duration: 9.0, delay: 1.9 },
  { left: '67%', size: 4, color: 'rgba(244, 244, 247, 0.45)', duration: 13.8, delay: 5.2 },
  { left: '75%', size: 2, color: 'rgba(255, 51, 68, 0.65)', duration: 8.8, delay: 2.7 },
  { left: '83%', size: 3, color: 'rgba(244, 244, 247, 0.55)', duration: 11.5, delay: 0.5 },
  { left: '91%', size: 4, color: 'rgba(255, 51, 68, 0.5)', duration: 10.0, delay: 3.2 },
  { left: '12%', size: 2, color: 'rgba(244, 244, 247, 0.4)', duration: 12.8, delay: 4.0 },
  { left: '38%', size: 3, color: 'rgba(255, 51, 68, 0.6)', duration: 9.8, delay: 1.1 },
  { left: '62%', size: 4, color: 'rgba(244, 244, 247, 0.5)', duration: 11.0, delay: 2.9 },
  { left: '80%', size: 2, color: 'rgba(255, 51, 68, 0.7)', duration: 8.6, delay: 5.7 },
  { left: '88%', size: 3, color: 'rgba(244, 244, 247, 0.45)', duration: 13.5, delay: 1.7 },
];

interface HeroFloatingProps {
  enableParticles?: boolean;
  enableThreeScene?: boolean;
}

/**
 * Đạo hữu xin nương tay, trận pháp Tam Trọng Trọng Lực (Heading Z10 - Huyết Quang Trận Z15 - Kim Thân Chân Dung Z20)
 * đang vận hành tương hỗ lệch pha 0.7s cực kỳ ổn định.
 * Chớ dại tùy tiện sửa đổi Z-Index hay Easing kẻo phá vỡ khí trường lơ lửng, tẩu hỏa nhập ma!
 */
export const HeroFloating: React.FC<HeroFloatingProps> = ({
  enableParticles = true,
  enableThreeScene = false,
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Animation Variants for Load-in Sequence
  const headingLine1Variants = {
    initial: { opacity: 0, y: 24 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const headingLine2Variants = {
    initial: { opacity: 0, y: 24 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '6rem',
        paddingBottom: '3.5rem',
        overflow: 'hidden',
      }}
    >
      {/* 1. Three.js 3D WebGL Background (Optional) */}
      {enableThreeScene && <HeroThreeScene />}

      {/* 2. Floating Ambient Particle Field (16 Particles) */}
      {enableParticles &&
        HERO_PARTICLES.map((p, idx) => (
          <motion.span
            key={idx}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: p.left,
              bottom: '-20px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}`,
              pointerEvents: 'none',
              zIndex: 5,
            }}
            animate={{
              y: [0, -750],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: shouldReduceMotion ? p.duration * 1.5 : p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
          />
        ))}

      {/* 3. Hero Layered Composition Container */}
      <div
        className="container"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1280px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        {/* Status Pill Badge with balanced breathing room */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: 'rgba(23, 23, 29, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--border)',
            padding: '0.45rem 1.15rem',
            borderRadius: '999px',
            marginBottom: '1.75rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            zIndex: 25,
            position: 'relative',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              boxShadow: '0 0 10px var(--accent)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-primary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            SOFTWARE ENGINEER // VIETNAM (UTC+7)
          </span>
        </motion.div>

        {/* 
          ========================================================================
          THE LAYERED CENTERPIECE:
          Layer 1 (Z-index 10): 2-Line Short Heading (DANG DINH NGUYEN / SYSTEM ARCHITECT)
          Layer 2 (Z-index 15): Radial Glow Aura (Behind Portrait)
          Layer 3 (Z-index 20): Overlapping Portrait Image (/background.png) anchored by TOP
          ========================================================================
        */}
        <div
          className="hero-stage"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: 'clamp(260px, 32vw, 380px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem 0',
          }}
        >
          {/* Layer 1: Heading Text (z-index: 10, idle float y: [0, -4, 0], delay: 0.7s) */}
          <motion.div
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              willChange: 'transform',
            }}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 4.5,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: 0.7,
            }}
          >
            {/* Line 1 Heading: Short & Punchy */}
            <motion.h1
              variants={headingLine1Variants}
              initial="initial"
              animate="animate"
              className="display-title"
              style={{
                margin: 0,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.03em',
              }}
            >
              DANG DINH NGUYEN
            </motion.h1>

            {/* Line 2 Heading: Role Title */}
            <motion.h1
              variants={headingLine2Variants}
              initial="initial"
              animate="animate"
              className="display-title"
              style={{
                margin: 0,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.03em',
              }}
            >
              SYSTEM <span style={{ color: 'var(--accent)' }}>ARCHITECT</span>
            </motion.h1>
          </motion.div>

          {/* Layer 2: Radial Glow Aura (z-index: 15, between text and portrait) */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              zIndex: 15,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(280px, 40vw, 540px)',
              height: 'clamp(280px, 40vw, 540px)',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255, 51, 68, 0.45) 0%, rgba(255, 51, 68, 0.15) 45%, transparent 70%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
            }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 5,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />

          {/* Layer 3: Portrait Image Wrapper (Anchored by TOP, strictly centered horizontally) */}
          <div
            style={{
              position: 'absolute',
              zIndex: 20,
              left: '50%',
              top: '18px',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: 'max-content',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                type: 'spring',
                stiffness: 120,
                damping: 14,
              }}
            >
              <motion.img
                src="/background.png"
                alt="Dang Dinh Nguyen"
                className="hero-portrait-img"
                style={{
                  width: 'auto',
                  objectFit: 'contain',
                  filter:
                    'drop-shadow(0 20px 45px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 35px rgba(255, 51, 68, 0.35))',
                }}
                animate={{
                  y: shouldReduceMotion ? 0 : [0, -10, 0],
                }}
                transition={
                  shouldReduceMotion
                    ? {}
                    : {
                        duration: 4.5,
                        ease: 'easeInOut',
                        repeat: Infinity,
                      }
                }
              />
            </motion.div>
          </div>
        </div>

        {/* Dynamic Focus Tagline (z-index: 25) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
            color: 'var(--accent)',
            marginTop: '2.5rem',
            marginBottom: '2rem',
            padding: '0.45rem 1.15rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(23, 23, 29, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border)',
            zIndex: 25,
            position: 'relative',
          }}
        >
          <Terminal size={15} />
          <span style={{ color: 'var(--text-muted)' }}>&gt; focus:</span>
          <span
            key={roleIndex}
            style={{
              fontWeight: 600,
              color: 'var(--text-primary)',
              animation: 'fadeIn 0.4s var(--ease-cinematic)',
            }}
          >
            {ROLES[roleIndex]}
          </span>
        </motion.div>

        {/* Call to Actions (z-index: 25) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            zIndex: 25,
            position: 'relative',
          }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <NavLink
              to="/work"
              className="btn btn-primary"
              data-cursor="EXPLORE"
              style={{
                boxShadow: '0 0 20px rgba(255, 51, 68, 0.25)',
              }}
            >
              <span>Selected Case Studies</span>
              <ArrowUpRight size={16} />
            </NavLink>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <NavLink
              to="/contact"
              className="btn btn-outline"
              data-cursor="CONNECT"
            >
              <span>Start Technical Discussion</span>
            </NavLink>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-portrait-img {
          height: auto;
          max-height: 490px;
        }
        @media (max-width: 1279px) {
          .hero-portrait-img {
            max-height: 370px;
          }
        }
        @media (max-width: 767px) {
          .hero-portrait-img {
            max-height: 260px;
          }
        }
      `}</style>
    </section>
  );
};

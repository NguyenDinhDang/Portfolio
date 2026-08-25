import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Terminal, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { HeroThreeScene } from '../HeroThreeScene';
import { ParticleField } from './ParticleField';
import heroImg from '../../assets/hero.png';

const ROLES = [
  'Python / FastAPI Specialist',
  'Distributed Backend Architect',
  'Context-Aware RAG Engineer',
  'High-Performance Systems Builder',
];

interface HeroFloatingProps {
  enableParticles?: boolean;
  enableThreeScene?: boolean;
}

/**
 * Đạo hữu xin nương tay, trận pháp Anti-Gravity Floating này gồm 3 tầng chuyển động
 * lệch pha (Glow thở, Chân dung rơi nảy spring, Tiêu đề trôi dạt).
 * Chớ dại sửa đổi Easing Sin và Delay Offset kẻo mất đi cảm giác lơ lửng không trọng lực!
 */
export const HeroFloating: React.FC<HeroFloatingProps> = ({
  enableParticles = true,
  enableThreeScene = true,
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

  const portraitDropVariants = {
    initial: { opacity: 0, y: -40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        type: 'spring' as const,
        stiffness: 120,
        damping: 14,
      },
    },
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '7.5rem',
        paddingBottom: '4.5rem',
        overflow: 'hidden',
      }}
    >
      {/* 1. Optional 3D WebGL Background Layer */}
      {enableThreeScene && <HeroThreeScene />}

      {/* 2. Radial Glow "Breathing" Background Layer */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          width: 'min(90vw, 800px)',
          height: 'min(90vw, 800px)',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 51, 68, 0.28), rgba(255, 51, 68, 0.08) 40%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
          zIndex: 0,
          willChange: 'transform, opacity',
        }}
        animate={
          shouldReduceMotion
            ? { opacity: 0.6, scale: 1 }
            : {
                scale: [1, 1.08, 1],
                opacity: [0.55, 0.85, 0.55],
              }
        }
        transition={
          shouldReduceMotion
            ? {}
            : {
                duration: 5,
                ease: 'easeInOut',
                repeat: Infinity,
              }
        }
      />

      {/* 3. Canvas 2D Particle Field */}
      <ParticleField enableParticles={enableParticles} />

      {/* 4. Foreground Interactive Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1080px', position: 'relative' }}>
            {/* Eyebrow Status Badge */}
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
                padding: '0.45rem 1rem',
                borderRadius: '999px',
                marginBottom: '2rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
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
                }}
              >
                SOFTWARE ENGINEER // VIETNAM (UTC+7)
              </span>
            </motion.div>

            {/* Anti-Gravity Heading Container (Decoupled Idle Float: ±4px, Delay 0.7s) */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -4, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? {}
                  : {
                      duration: 4.5,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      delay: 0.7, // Phase shift relative to portrait
                    }
              }
              style={{
                marginBottom: '1.75rem',
                position: 'relative',
                willChange: 'transform',
              }}
            >
              {/* Line 1 Heading */}
              <motion.h1
                variants={headingLine1Variants}
                initial="initial"
                animate="animate"
                className="display-title"
                style={{
                  margin: 0,
                  display: 'block',
                  color: 'var(--text-primary)',
                }}
              >
                I ARCHITECT <span style={{ color: 'var(--accent)' }}>HIGH-SCALE</span>
              </motion.h1>

              {/* Line 2 Heading */}
              <motion.h1
                variants={headingLine2Variants}
                initial="initial"
                animate="animate"
                className="display-title"
                style={{
                  margin: 0,
                  display: 'block',
                  color: 'var(--text-primary)',
                }}
              >
                BACKEND & AI RETRIEVAL.
              </motion.h1>
            </motion.div>

            {/* Floating Portrait Cutout / Badge (Drops with Spring settle, then floats ±10px) */}
            <div
              className="hero-floating-portrait-wrapper"
              style={{
                position: 'absolute',
                top: '-15px',
                right: '2%',
                zIndex: 3,
                pointerEvents: 'none',
              }}
            >
              <motion.div
                variants={portraitDropVariants}
                initial="initial"
                animate="animate"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: [0, -10, 0],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? {}
                      : {
                          duration: 4.5,
                          ease: 'easeInOut',
                          repeat: Infinity,
                        }
                  }
                  style={{
                    position: 'relative',
                    willChange: 'transform',
                  }}
                >
                  {/* Subtle rim-glow behind portrait */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: '-10px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255, 51, 68, 0.45) 0%, transparent 70%)',
                      filter: 'blur(20px)',
                      zIndex: -1,
                    }}
                  />
                  <img
                    src={heroImg}
                    alt="Đặng Đình Nguyễn portrait cutout"
                    style={{
                      width: 'clamp(140px, 20vw, 240px)',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.8))',
                      display: 'block',
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Dynamic Role Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
                color: 'var(--accent)',
                marginBottom: '2.5rem',
                height: '32px',
              }}
            >
              <Terminal size={18} />
              <span style={{ color: 'var(--text-muted)' }}>focus:</span>
              <span
                key={roleIndex}
                style={{
                  fontWeight: 600,
                  animation: 'fadeIn 0.4s var(--ease-cinematic)',
                }}
              >
                {ROLES[roleIndex]}
              </span>
            </motion.div>

            {/* Positioning Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-lead"
              style={{
                marginBottom: '3.5rem',
                fontSize: 'clamp(1.125rem, 1.8vw, 1.35rem)',
                maxWidth: '68ch',
              }}
            >
              Hi, I'm <strong style={{ color: 'var(--text-primary)' }}>Đặng Đình Nguyễn</strong>.
              I design high-throughput asynchronous APIs, resilient database schemas, and high-precision RAG pipelines.
              I build software with disciplined engineering judgment and intentional clarity.
            </motion.p>

            {/* Call to Actions (Interactive Hover/Tap Glow) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                flexWrap: 'wrap',
                marginBottom: '5rem',
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

            {/* Engineering Credibility Strip (Staggered Entrance) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.75rem',
                paddingTop: '2.5rem',
                borderTop: '1px solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div style={{ color: 'var(--accent)' }}>
                  <Layers size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
                    FastAPI & Python
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    High-Concurrency Microservices
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div style={{ color: 'var(--accent)' }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
                    RAG & Vector DBs
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Semantic Knowledge Extraction
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div style={{ color: 'var(--accent)' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
                    ACID & Data Integrity
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    PostgreSQL, Redis & asyncpg
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .hero-floating-portrait-wrapper {
            position: relative !important;
            top: 0 !important;
            right: 0 !important;
            margin-bottom: 2rem;
            display: flex;
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { HeroThreeScene } from '../HeroThreeScene';

const ROLES = [
  'Chuyên gia Python / FastAPI',
  'Kiến trúc sư Backend Phân tán',
  'Kỹ sư RAG & Trí tuệ Nhân tạo',
  'Xây dựng Hệ thống Hiệu năng cao',
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

export interface HeroFloatingProps {
  enableParticles?: boolean;
  enableThreeScene?: boolean;
  line1?: string;
  line2Prefix?: string;
  line2Accent?: string;
}

/**
 * Đạo hữu xin nương tay, trận pháp Tam Trọng Trọng Lực kết hợp Cơ Quan Đánh Máy (Typewriter Grapheme Sequencer)
 * đang vận hành xuất chiêu từng chữ 40ms cực kỳ ổn định.
 * Chớ dại tùy tiện sửa đổi Z-Index, Grapheme Slicer hay Easing kẻo phá vỡ khí trường lơ lửng, tẩu hỏa nhập ma!
 */
export const HeroFloating: React.FC<HeroFloatingProps> = ({
  enableParticles = true,
  enableThreeScene = false,
  line1 = 'ĐẶNG ĐÌNH NGUYỄN',
  line2Prefix = 'KỸ SƯ ',
  line2Accent = 'HỆ THỐNG',
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Role Switcher Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Grapheme-safe Character Extraction for Typewriter Effect
  const line1Chars = useMemo(() => Array.from(line1), [line1]);
  const line2Chars = useMemo(() => {
    const prefixChars = Array.from(line2Prefix).map((c) => ({ char: c, isAccent: false }));
    const accentChars = Array.from(line2Accent).map((c) => ({ char: c, isAccent: true }));
    return [...prefixChars, ...accentChars];
  }, [line2Prefix, line2Accent]);

  const totalChars = line1Chars.length + line2Chars.length;
  const [typedCount, setTypedCount] = useState(shouldReduceMotion ? totalChars : 0);

  // Typewriter Sequential Timer (35-45ms per character)
  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedCount(totalChars);
      return;
    }

    setTypedCount(0);
    const charDelayMs = 40;
    const initialStartDelayMs = 200;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedCount((prev) => {
          if (prev < totalChars) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, charDelayMs);

      return () => clearInterval(interval);
    }, initialStartDelayMs);

    return () => clearTimeout(timeout);
  }, [totalChars, shouldReduceMotion]);

  // Derived character slices
  const typedLine1Count = Math.min(typedCount, line1Chars.length);
  const typedLine2Count = Math.max(0, typedCount - line1Chars.length);

  // Active line for the blinking terminal cursor (Line 1 while typing line 1, Line 2 thereafter)
  const isLine1Active = typedCount < line1Chars.length;
  const isLine2Active = typedCount >= line1Chars.length;

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
        paddingTop: '5.5rem',
        paddingBottom: '3rem',
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
        {/* Status Pill Badge with balanced breathing room (ensures 16-24px clearance to head) */}
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
            marginBottom: '3.5rem',
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
            KỸ SƯ PHẦN MỀM // VIỆT NAM (UTC+7)
          </span>
        </motion.div>

        {/* 
          ========================================================================
          THE LAYERED CENTERPIECE:
          Layer 1 (Z-index 10): Typewriter 2-Line Heading (ĐẶNG ĐÌNH NGUYỄN / KỸ SƯ HỆ THỐNG)
          Layer 2 (Z-index 15): Radial Glow Aura (Behind Portrait)
          Layer 3 (Z-index 20): Overlapping Portrait Image (/background.png - enlarged ~118%)
          ========================================================================
        */}
        <div
          className="hero-stage"
          style={{
            position: 'relative',
            width: '100%',
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
            {/* Line 1 Heading: Typewriter Character Sequence */}
            <h1
              className="display-title"
              style={{
                margin: 0,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.03em',
                minHeight: '1.15em',
                lineHeight: 1.1,
              }}
            >
              {line1Chars.slice(0, typedLine1Count).map((char, index) => (
                <motion.span
                  key={`l1-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.04 }}
                >
                  {char}
                </motion.span>
              ))}

              {/* Line 1 Terminal Blinking Cursor */}
              {isLine1Active && !shouldReduceMotion && (
                <motion.span
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    width: '3px',
                    height: '0.82em',
                    backgroundColor: 'var(--accent)',
                    marginLeft: '4px',
                    verticalAlign: '-0.06em',
                    boxShadow: '0 0 10px var(--accent)',
                  }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </h1>

            {/* Line 2 Heading: Typewriter Character Sequence with Accent Styling */}
            <h1
              className="display-title"
              style={{
                margin: 0,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.03em',
                minHeight: '1.15em',
                lineHeight: 1.1,
              }}
            >
              {line2Chars.slice(0, typedLine2Count).map((item, index) => (
                <motion.span
                  key={`l2-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.04 }}
                  style={item.isAccent ? { color: 'var(--accent)' } : undefined}
                >
                  {item.char}
                </motion.span>
              ))}

              {/* Line 2 Terminal Blinking Cursor */}
              {isLine2Active && !shouldReduceMotion && (
                <motion.span
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    width: '3px',
                    height: '0.82em',
                    backgroundColor: 'var(--accent)',
                    marginLeft: '4px',
                    verticalAlign: '-0.06em',
                    boxShadow: '0 0 10px var(--accent)',
                  }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </h1>
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
              width: 'clamp(280px, 42vw, 540px)',
              height: 'clamp(280px, 42vw, 540px)',
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

          {/* Layer 3: Enlarged Portrait Image (z-index: 20, overlaps text, spring load-in + idle float) */}
          <motion.div
            style={{
              position: 'absolute',
              zIndex: 20,
              left: '50%',
              bottom: '-16px',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              willChange: 'transform',
            }}
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
              style={{
                maxHeight: 'clamp(280px, 44vh, 480px)',
                width: 'auto',
                objectFit: 'contain',
                filter:
                  'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 25px rgba(255, 51, 68, 0.25))',
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4.5,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
          </motion.div>
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
          <span style={{ color: 'var(--text-muted)' }}>&gt; trọng tâm:</span>
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
              <span>Xem Dự Án Tiêu Biểu</span>
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
              <span>Bắt Đầu Trao Đổi Kỹ Thuật</span>
            </NavLink>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

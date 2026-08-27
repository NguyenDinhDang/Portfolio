import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { HeroThreeScene } from '../HeroThreeScene';
import { Spotlight } from '../ui/spotlight';
import { SparklesCore } from '../ui/sparkles';
import { FlipWords } from '../ui/typewriter-effect';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const ROLES = [
  'Chuyên gia Python / FastAPI',
  'Kiến trúc sư Backend Phân tán',
  'Kỹ sư RAG & Trí tuệ Nhân tạo',
  'Xây dựng Hệ thống Hiệu năng cao',
];

export interface HeroFloatingProps {
  enableParticles?: boolean;
  enableThreeScene?: boolean;
  line1?: string;
  line2Prefix?: string;
  line2Accent?: string;
}

/**
 * Đạo hữu xin nương tay, trận pháp Thái Cực Thần Thể (First-Paint Zero-Lag Hero Architecture)
 * này đã được niêm phong ở trạng thái Quang Minh Hiển Lộ (opacity: 1 tức thì).
 * Chớ dại thêm vào các tầng phong ấn opacity: 0 hay clip-path bế tắc kẻo linh nhãn người xem
 * chỉ thấy một mảnh hắc ám hư vô, tẩu hỏa nhập ma!
 */
export const HeroFloating: React.FC<HeroFloatingProps> = ({
  enableParticles = true,
  enableThreeScene = false,
  line1 = 'ĐẶNG ĐÌNH NGUYỄN',
  line2Prefix = 'KỸ SƯ ',
  line2Accent = 'HỆ THỐNG',
}) => {
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
        paddingTop: 'clamp(72px, 10vh, 100px)',
        paddingBottom: 'clamp(2rem, 4vh, 3.5rem)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* 1. Ambient Lighting (Background Enhancement Only) */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#ff3344"
      />

      {/* 2. Three.js Background (Non-blocking Background Layer) */}
      {enableThreeScene && <HeroThreeScene />}

      {/* 3. Particle Field (60 FPS Canvas Background Layer) */}
      {enableParticles && (
        <SparklesCore
          particleColor="#ff3344"
          particleDensity={35}
          speed={0.8}
          minSize={0.8}
          maxSize={2.2}
          className="z-[1]"
        />
      )}

      {/* 4. Hero Content Container — 100% VISIBLE ON FIRST PAINT */}
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
          opacity: 1,
          visibility: 'visible',
        }}
      >
        {/* Status Pill Badge */}
        <div
          style={{
            marginBottom: '1.25rem',
            zIndex: 25,
            position: 'relative',
          }}
        >
          <Badge variant="default" className="gap-2 px-4 py-1.5 shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
            <span className="font-mono text-xs text-[var(--text-primary)] tracking-wide">
              KỸ SƯ PHẦN MỀM // VIỆT NAM (UTC+7)
            </span>
          </Badge>
        </div>

        {/* 
          ========================================================================
          THE LAYERED HERO CENTERPIECE:
          Layer 1 (Z-index 10): 2-Line Heading (Intact Kerning, 100% Visible Immediately)
          Layer 2 (Z-index 15): Radial Glow Aura (Behind Portrait)
          Layer 3 (Z-index 20): Overlapping Portrait Image (/background.png)
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
          }}
        >
          {/* Layer 1: Heading Text (Subtle Idle Float, No Initial Hidden State) */}
          <motion.div
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              willChange: 'transform',
            }}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 4.5,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          >
            {/* Line 1 Heading */}
            <h1
              className="display-title"
              style={{
                margin: 0,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              {line1}
            </h1>

            {/* Line 2 Heading */}
            <h1
              className="display-title"
              style={{
                margin: 0,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              <span>{line2Prefix}</span>
              <span style={{ color: 'var(--accent)' }}>{line2Accent}</span>
            </h1>
          </motion.div>

          {/* Layer 2: Radial Glow Aura (Behind Portrait) */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              zIndex: 15,
              top: '48%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(300px, 46vw, 640px)',
              height: 'clamp(300px, 46vw, 640px)',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255, 51, 68, 0.45) 0%, rgba(255, 51, 68, 0.15) 45%, transparent 70%)',
              filter: 'blur(45px)',
              pointerEvents: 'none',
            }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.65, 0.95, 0.65],
            }}
            transition={{
              duration: 5,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />

          {/* Layer 3: Portrait Image (Centered over heading, anchored below status pill) */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              pointerEvents: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              maxWidth: '1280px',
            }}
          >
            <motion.img
              src="/background.png"
              alt="Dang Dinh Nguyen"
              style={{
                maxHeight: 'clamp(380px, 56vh, 660px)',
                width: 'auto',
                objectFit: 'contain',
                filter:
                  'drop-shadow(0 20px 45px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 30px rgba(255, 51, 68, 0.3))',
                display: 'block',
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
          </div>
        </div>

        {/* Dynamic Focus Tagline */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
            color: 'var(--accent)',
            marginTop: '1.75rem',
            marginBottom: '1.5rem',
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
          <FlipWords words={ROLES} duration={2800} />
        </div>

        {/* Call to Action Buttons */}
        <div
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
          <NavLink to="/work">
            <Button
              variant="primary"
              data-cursor="EXPLORE"
              style={{
                boxShadow: '0 0 20px rgba(255, 51, 68, 0.25)',
              }}
            >
              <span>Xem Dự Án Tiêu Biểu</span>
              <ArrowUpRight size={16} />
            </Button>
          </NavLink>

          <NavLink to="/contact">
            <Button variant="outline" data-cursor="CONNECT">
              <span>Bắt Đầu Trao Đổi Kỹ Thuật</span>
            </Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Award, ShieldCheck, Terminal, Cpu } from 'lucide-react';

export interface CoverflowItem {
  id: string;
  title: string;
  category: string;
  issuer?: string;
  date?: string;
  description: string;
  tags: string[];
  link?: string;
  iconType?: 'award' | 'shield' | 'terminal' | 'cpu';
}

const DEFAULT_COVERFLOW_ITEMS: CoverflowItem[] = [
  {
    id: '1',
    title: 'High-Concurrency FastAPI Microservices',
    category: 'Architecture Certification // Level IV',
    issuer: 'Distributed Systems Council',
    date: '2025 - 2026',
    description: 'Zero-downtime asynchronous event loops, PostgreSQL connection pooling with asyncpg, and Redis cluster failover mechanisms.',
    tags: ['FastAPI', 'Python 3.12', 'AsyncIO', 'PostgreSQL'],
    iconType: 'cpu',
  },
  {
    id: '2',
    title: 'Production RAG & Vector Search Engineering',
    category: 'Applied AI Specialization',
    issuer: 'Deep Learning & Retrieval Guild',
    date: '2025',
    description: 'High-recall hybrid search pipelines combining dense vector embeddings with BM25 sparse re-ranking and contextual filtering.',
    tags: ['pgvector', 'FAISS', 'Hybrid Search', 'LangChain'],
    iconType: 'terminal',
  },
  {
    id: '3',
    title: 'ACID Data Integrity & Distributed Transactions',
    category: 'Database Systems Mastery',
    issuer: 'Database Architecture Institute',
    date: '2024 - 2025',
    description: 'Strict transactional boundaries, optimistic concurrency control, two-phase commits, and resilient indexing strategies under high write loads.',
    tags: ['PostgreSQL', 'Redis', 'Alembic', 'Data Modeling'],
    iconType: 'shield',
  },
  {
    id: '4',
    title: 'Anti-Gravity Motion & WebGL Graphics',
    category: 'Creative Engineering Excellence',
    issuer: 'Interactive Systems Foundation',
    date: '2026',
    description: 'Mathematical Euler physics repulsion, 60fps WebGL GPU optimization, and cinematic fluid micro-interactions.',
    tags: ['Three.js', 'Framer Motion', 'Canvas 2D', 'TypeScript'],
    iconType: 'award',
  },
];

interface CoverflowCarouselProps {
  items?: CoverflowItem[];
  className?: string;
}

/**
 * Đạo hữu xin nương tay, trận pháp Coverflow 3D xoay chuyển càn khôn này
 * đang tính toán tọa độ Perspective và Euler Rotation cực kỳ chính xác.
 * Chớ dại sửa đổi hệ số Offset và Góc xoay kẻo không gian 3 chiều vỡ vụn, rơi vào hư vô!
 */
export const CoverflowCarousel: React.FC<CoverflowCarouselProps> = ({
  items = DEFAULT_COVERFLOW_ITEMS,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const getCardStyle = (index: number) => {
    const total = items.length;
    let diff = index - activeIndex;

    // Support circular navigation offset calculation
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const isActive = diff === 0;
    const isAdjacent = Math.abs(diff) === 1;

    if (shouldReduceMotion) {
      return {
        x: diff * 280,
        scale: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : isAdjacent ? 0.4 : 0,
        zIndex: isActive ? 10 : 10 - Math.abs(diff),
        rotateY: 0,
        pointerEvents: isActive ? ('auto' as const) : ('none' as const),
      };
    }

    // 3D Coverflow positioning
    const xOffset = diff * 220;
    const rotateY = diff < 0 ? 18 : diff > 0 ? -18 : 0;
    const scale = isActive ? 1 : isAdjacent ? 0.86 : 0.72;
    const opacity = isActive ? 1 : isAdjacent ? 0.55 : 0;
    const zIndex = isActive ? 10 : 10 - Math.abs(diff);

    return {
      x: xOffset,
      scale,
      opacity,
      rotateY,
      zIndex,
      pointerEvents: isActive ? ('auto' as const) : isAdjacent ? ('auto' as const) : ('none' as const),
    };
  };

  const getIcon = (type?: string) => {
    switch (type) {
      case 'shield':
        return <ShieldCheck size={22} color="var(--accent)" />;
      case 'terminal':
        return <Terminal size={22} color="var(--accent)" />;
      case 'award':
        return <Award size={22} color="var(--accent)" />;
      case 'cpu':
      default:
        return <Cpu size={22} color="var(--accent)" />;
    }
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        paddingBlock: '2.5rem',
        overflow: 'hidden',
      }}
    >
      {/* 3D Perspective Stage */}
      <div
        style={{
          position: 'relative',
          height: '380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1100px',
          transformStyle: 'preserve-3d',
        }}
      >
        <AnimatePresence initial={false}>
          {items.map((item, index) => {
            const cardState = getCardStyle(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={item.id}
                onClick={() => {
                  if (!isActive) setActiveIndex(index);
                }}
                animate={{
                  x: cardState.x,
                  scale: cardState.scale,
                  opacity: cardState.opacity,
                  rotateY: cardState.rotateY,
                  zIndex: cardState.zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 24,
                  mass: 0.8,
                }}
                drag={isActive ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_e, { offset }) => {
                  const swipeThreshold = 50;
                  if (offset.x > swipeThreshold) {
                    handlePrev();
                  } else if (offset.x < -swipeThreshold) {
                    handleNext();
                  }
                }}
                style={{
                  position: 'absolute',
                  width: 'clamp(280px, 85vw, 440px)',
                  minHeight: '300px',
                  backgroundColor: isActive ? 'var(--bg-surface)' : 'var(--bg-secondary)',
                  border: isActive ? '1px solid var(--border-accent)' : '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '2rem',
                  boxShadow: isActive ? '0 16px 40px rgba(0, 0, 0, 0.7), 0 0 30px var(--accent-glow)' : '0 8px 24px rgba(0, 0, 0, 0.4)',
                  cursor: isActive ? 'grab' : 'pointer',
                  userSelect: 'none',
                  willChange: 'transform, opacity',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      {getIcon(item.iconType)}
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--accent)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                    {item.date && (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {item.date}
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '0.75rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.4rem',
                      marginBottom: item.issuer ? '1rem' : 0,
                    }}
                  >
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--text-primary)',
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '3px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {item.issuer && (
                    <div
                      style={{
                        paddingTop: '0.75rem',
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <span>{item.issuer}</span>
                      <ArrowUpRight size={14} color="var(--accent)" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Carousel Navigation Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          marginTop: '1.5rem',
        }}
      >
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Indicator dots */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: idx === activeIndex ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: idx === activeIndex ? 'var(--accent)' : 'var(--border-strong)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Award, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { PowerPointBadgeContainer, PowerPointBadgeItem } from './PowerPointBadgeGroup';
import { Button } from '../ui/button';

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
    title: 'Vi dịch vụ FastAPI Đồng thời cao',
    category: 'Chứng nhận Kiến trúc // Cấp độ IV',
    issuer: 'Distributed Systems Council',
    date: '2025 - 2026',
    description: 'Vòng lặp sự kiện bất đồng bộ zero-downtime, quản lý connection pool PostgreSQL với asyncpg và cơ chế chuyển đổi dự phòng cụm Redis.',
    tags: ['FastAPI', 'Python 3.12', 'AsyncIO', 'PostgreSQL'],
    iconType: 'cpu',
  },
  {
    id: '2',
    title: 'Kỹ nghệ RAG & Tìm kiếm Vector Production',
    category: 'Chuyên môn AI Ứng dụng',
    issuer: 'Deep Learning & Retrieval Guild',
    date: '2025',
    description: 'Đường ống tìm kiếm hỗn hợp độ bao phủ cao kết hợp vector dense embedding và tái xếp hạng thưa BM25 cùng lọc theo ngữ cảnh.',
    tags: ['pgvector', 'FAISS', 'Hybrid Search', 'LangChain'],
    iconType: 'terminal',
  },
  {
    id: '3',
    title: 'Toàn vẹn Dữ liệu ACID & Giao dịch Phân tán',
    category: 'Làm chủ Hệ thống CSDL',
    issuer: 'Database Architecture Institute',
    date: '2024 - 2025',
    description: 'Ranh giới giao dịch nghiêm ngặt, kiểm soát đồng thời lạc quan, và chiến lược đánh chỉ mục bền bỉ dưới tải ghi lớn.',
    tags: ['PostgreSQL', 'Redis', 'Alembic', 'Data Modeling'],
    iconType: 'shield',
  },
  {
    id: '4',
    title: 'Chuyển động Anti-Gravity & Đồ họa WebGL',
    category: 'Kỹ nghệ Sáng tạo Xuất sắc',
    issuer: 'Interactive Systems Foundation',
    date: '2026',
    description: 'Lực đẩy vật lý toán học Euler, tối ưu hóa GPU WebGL 60 FPS và vi tương tác cinematic mượt mà.',
    tags: ['Three.js', 'Framer Motion', 'Canvas 2D', 'TypeScript'],
    iconType: 'award',
  },
];

interface CoverflowCarouselProps {
  items?: CoverflowItem[];
  className?: string;
}

/**
 * Đạo hữu xin nương tay, trận pháp Embla Coverflow Càn Khôn Vòng Chuyển này
 * đang kết hợp đồng bộ con lăn Embla Physics cùng ma trận phối cảnh 3D Perspective.
 * Chớ dại tùy tiện can thiệp trục Scroll Snap kẻo pháp trận đảo lộn,
 * tâm trí rơi vào hư không vô định!
 */
export const CoverflowCarousel: React.FC<CoverflowCarouselProps> = ({
  items = DEFAULT_COVERFLOW_ITEMS,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
    },
    [Autoplay({ delay: 4500, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

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
      {/* Embla Viewport */}
      <div
        ref={emblaRef}
        style={{
          overflow: 'hidden',
          width: '100%',
          perspective: '1200px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            transformStyle: 'preserve-3d',
            paddingBlock: '2rem',
          }}
        >
          {items.map((item, index) => {
            const total = items.length;
            let diff = index - selectedIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isActive = diff === 0;
            const isAdjacent = Math.abs(diff) === 1;

            const scale = shouldReduceMotion
              ? 1
              : isActive
              ? 1
              : isAdjacent
              ? 0.88
              : 0.78;
            const opacity = isActive ? 1 : isAdjacent ? 0.6 : 0.25;
            const rotateY = shouldReduceMotion
              ? 0
              : diff < 0
              ? 16
              : diff > 0
              ? -16
              : 0;

            return (
              <div
                key={item.id}
                style={{
                  flex: '0 0 clamp(290px, 80vw, 440px)',
                  marginInline: '1.25rem',
                  minWidth: 0,
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.div
                  animate={{
                    scale,
                    opacity,
                    rotateY,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    width: '100%',
                    minHeight: '320px',
                    backgroundColor: isActive ? 'var(--bg-surface)' : 'var(--bg-secondary)',
                    border: isActive ? '1px solid var(--border-accent)' : '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '2rem',
                    boxShadow: isActive
                      ? '0 16px 40px rgba(0, 0, 0, 0.7), 0 0 30px var(--accent-glow)'
                      : '0 8px 24px rgba(0, 0, 0, 0.4)',
                    cursor: 'grab',
                    userSelect: 'none',
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
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
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
                    {/* Technical Tag Group */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <PowerPointBadgeContainer>
                        {item.tags.map((tag) => (
                          <PowerPointBadgeItem key={tag}>
                            <span
                              style={{
                                display: 'inline-block',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '4px',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid var(--border)',
                                color: 'var(--text-secondary)',
                              }}
                            >
                              {tag}
                            </span>
                          </PowerPointBadgeItem>
                        ))}
                      </PowerPointBadgeContainer>
                    </div>

                    {/* Footer Row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '1rem',
                        borderTop: '1px solid var(--border)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {item.issuer || 'System Architecture'}
                      </span>

                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            color: 'var(--accent)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            textDecoration: 'none',
                          }}
                        >
                          <span>Verify</span>
                          <ArrowUpRight size={12} />
                        </a>
                      ) : (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            color: 'var(--text-muted)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                          }}
                        >
                          <ShieldCheck size={12} color="var(--accent)" />
                          <span>Architect Certified</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls & Indicators */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          marginTop: '1.5rem',
        }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={18} />
        </Button>

        {/* Indicators */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi && emblaApi.scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: idx === selectedIndex ? '24px' : '6px',
                height: '6px',
                borderRadius: '999px',
                backgroundColor: idx === selectedIndex ? 'var(--accent)' : 'var(--border-strong)',
                transition: 'all 0.3s var(--ease-cinematic)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          aria-label="Next Slide"
        >
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
};

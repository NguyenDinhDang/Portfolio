import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { timelineItems } from '../data/timeline';
import type { TimelineItem } from '../types';

// ── Icons (inline SVG, không cần thư viện ngoài) ─────────────────────────────

const GraduationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// ── Single Card ───────────────────────────────────────────────────────────────

const TimelineCard: React.FC<{ item: TimelineItem; side: 'left' | 'right' }> = ({ item, side }) => {
  const ref = useRef(null);
  // Đạo hữu xin nương tay! Trận pháp Cảm Ứng Quan Sát (useInView once:true) này chỉ kích hoạt một lần khi nhập vùng, chớ đổi once:false kẻo animation lặp vô tận tẩu hỏa nhập ma!
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const isEducation = item.type === 'education';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex items-start gap-5 ${side === 'left' ? 'lg:flex-row-reverse lg:text-right' : 'lg:flex-row'} flex-row`}
    >
      {/* Card body */}
      <div className="flex-1 border border-portfolio-border bg-bg-secondary rounded-[var(--gutter-nano)] p-[var(--gutter-small)] transition-shadow duration-300 hover:shadow-[var(--shadow)]">
        {/* Header */}
        <div className={`flex items-start justify-between gap-3 mb-3 ${side === 'left' ? 'lg:flex-row-reverse' : ''}`}>
          <div className={side === 'left' ? 'lg:text-right' : ''}>
            <h3 className="text-[var(--h4)] font-bold text-important leading-tight">
              {item.title}
            </h3>
            <p className="text-[var(--text-medium)] font-semibold text-sub mt-0.5">
              {item.role}
            </p>
          </div>
          {item.current && (
            <span
              className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-bold border"
              style={{ borderColor: 'var(--important)', color: 'var(--important)' }}
            >
              Hiện tại
            </span>
          )}
        </div>

        {/* Meta */}
        <div className={`flex flex-wrap gap-3 text-xs text-body mb-3 ${side === 'left' ? 'lg:justify-end' : ''}`}>
          <span className="flex items-center gap-1">
            <CalendarIcon />
            {item.period}
          </span>
          {item.location && (
            <span className="flex items-center gap-1">
              <MapPinIcon />
              {item.location}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-[var(--text-small)] text-body leading-relaxed">
          {item.description}
        </p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className={`flex flex-wrap gap-1.5 mt-4 ${side === 'left' ? 'lg:justify-end' : ''}`}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-border-dark text-sub"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dot connector — visible on mobile as left strip, hidden on desktop (center line handles it) */}
      <div className="lg:hidden flex-shrink-0 flex flex-col items-center mt-1">
        <div
          className="w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0"
          style={{
            borderColor: 'var(--important)',
            backgroundColor: 'var(--bg-color-primary)',
            color: 'var(--important)',
          }}
        >
          {isEducation ? <GraduationIcon /> : <BriefcaseIcon />}
        </div>
      </div>
    </motion.div>
  );
};

// ── Center dot for desktop ────────────────────────────────────────────────────

const CenterDot: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isEducation = item.type === 'education';

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.4, ease: 'backOut' }}
      className="hidden lg:flex flex-shrink-0 w-11 h-11 rounded-full border-2 items-center justify-center z-10"
      style={{
        borderColor: 'var(--important)',
        backgroundColor: 'var(--bg-color-primary)',
        color: 'var(--important)',
      }}
    >
      {isEducation ? <GraduationIcon /> : <BriefcaseIcon />}
    </motion.div>
  );
};

// ── Tab Button ────────────────────────────────────────────────────────────────

const TabButton: React.FC<{
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}> = ({ label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className="relative px-[var(--gutter-small)] py-[var(--gutter-nano)] rounded-full text-[var(--text-small)] font-semibold border transition-all duration-200 cursor-pointer"
    style={{
      borderColor: active ? 'var(--important)' : 'var(--border-dark)',
      color: active ? 'var(--important)' : 'var(--sub)',
    }}
  >
    {label}
    <span
      className="ml-2 px-1.5 py-0.5 rounded-full text-xs font-bold"
      style={{
        backgroundColor: active ? 'var(--important)' : 'var(--border-dark)',
        color: active ? 'var(--bg-color-primary)' : 'var(--sub)',
      }}
    >
      {count}
    </span>
  </button>
);

// ── Main Section ──────────────────────────────────────────────────────────────

type TabType = 'all' | 'education' | 'work';

export const TimelineSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const educationItems = timelineItems.filter((i) => i.type === 'education');
  const workItems = timelineItems.filter((i) => i.type === 'work');

  const displayed =
    activeTab === 'education'
      ? educationItems
      : activeTab === 'work'
      ? workItems
      : timelineItems;

  return (
    <section className="pt-[var(--gutter-huge)]">
      <div className="container">
        {/* Heading */}
        <h2 className="text-[var(--h2)] font-bold text-center text-important mb-[var(--gutter-small)]">
          Học vấn &amp; Kinh nghiệm
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-[var(--gutter-x-large)]">
          <TabButton label="Tất cả" count={timelineItems.length} active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
          <TabButton label="Học vấn" count={educationItems.length} active={activeTab === 'education'} onClick={() => setActiveTab('education')} />
          <TabButton label="Kinh nghiệm" count={workItems.length} active={activeTab === 'work'} onClick={() => setActiveTab('work')} />
        </div>

        {displayed.length === 0 ? (
          <p className="text-center text-body text-[var(--text-medium)] py-[var(--gutter-huge)]">
            Chưa có mục nào. Thêm vào{' '}
            <code className="text-important border border-border-dark px-1.5 py-0.5 rounded text-sm">
              src/data/timeline.ts
            </code>
          </p>
        ) : (
          /* ── Desktop: two-column alternating | Mobile: single left strip ── */
          <div className="relative">
            {/* Vertical center line — desktop only */}
            <div
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ backgroundColor: 'var(--border-dark)' }}
            />

            {/* Mobile: left strip */}
            <div
              className="lg:hidden absolute left-[1.1rem] top-0 bottom-0 w-px"
              style={{ backgroundColor: 'var(--border-dark)' }}
            />

            <div className="flex flex-col gap-[var(--gutter-medium)]">
              {displayed.map((item, idx) => {
                const side: 'left' | 'right' = idx % 2 === 0 ? 'right' : 'left';
                return (
                  <div key={item.id}>
                    {/* Desktop layout */}
                    <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-start gap-6">
                      {/* Left slot */}
                      <div>{side === 'left' && <TimelineCard item={item} side="left" />}</div>
                      {/* Center dot */}
                      <CenterDot item={item} />
                      {/* Right slot */}
                      <div>{side === 'right' && <TimelineCard item={item} side="right" />}</div>
                    </div>

                    {/* Mobile layout — single column with left strip */}
                    <div className="lg:hidden pl-12 pr-1">
                      <TimelineCard item={item} side="right" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

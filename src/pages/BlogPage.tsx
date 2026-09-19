import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { useTheme } from '../hooks/useTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import type { ArticleItem } from '../types';

// ── helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

// ── sub-components ───────────────────────────────────────────────────────────

const TagPill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border border-border-dark text-sub">
    {label}
  </span>
);

const ArticleCard: React.FC<{ article: ArticleItem; featured?: boolean }> = ({
  article,
  featured = false,
}) => (
  <a
    href={article.url}
    target="_blank"
    rel="noopener noreferrer"
    className={`group flex flex-col gap-4 rounded-2xl border border-border-dark bg-bg-secondary/60 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 no-underline ${featured ? 'md:flex-row md:gap-8 md:p-8' : ''}`}
    style={{ textDecoration: 'none' }}
  >
    {/* Thumbnail */}
    {article.imageSrc && (
      <div
        className={`flex-shrink-0 overflow-hidden rounded-xl ${featured ? 'md:w-[42%] h-52 md:h-auto' : 'h-44'}`}
      >
        <img
          src={article.imageSrc}
          alt={article.imageAlt || article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    )}

    {/* Text */}
    <div className="flex flex-col justify-between gap-3 flex-1">
      {/* Tags */}
      {article.tags && (
        <div className="flex flex-wrap gap-1.5">
          {article.tags.map((t) => (
            <TagPill key={t} label={t} />
          ))}
        </div>
      )}

      <h3
        className={`font-bold text-important leading-snug group-hover:text-sub transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-lg'}`}
      >
        {article.title}
      </h3>

      <p className="text-body text-sm leading-relaxed line-clamp-3">
        {article.description}
      </p>

      {/* Meta row */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border-dark/50">
        <div className="flex items-center gap-3 text-xs text-body">
          {article.date && <span>{formatDate(article.date)}</span>}
          {article.readTime && (
            <>
              <span className="opacity-30">•</span>
              <span>{article.readTime}</span>
            </>
          )}
        </div>
        <span className="flex items-center gap-1 text-xs text-body">
          <img
            src="assets/images/heart-outline.svg"
            alt="likes"
            className="w-3.5 h-3.5 dark:invert"
          />
          {article.reactionCount}
        </span>
      </div>
    </div>
  </a>
);

// Placeholder card cho bài viết sắp ra mắt
const ComingSoonCard: React.FC<{ idx: number }> = ({ idx }) => (
  <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-border-dark p-6 opacity-50">
    <div className="h-44 rounded-xl bg-bg-secondary/40 flex items-center justify-center">
      <span className="text-4xl">✍️</span>
    </div>
    <div className="space-y-2">
      <div className="h-4 rounded-full bg-border-dark w-3/4" />
      <div className="h-3 rounded-full bg-border-dark w-full" />
      <div className="h-3 rounded-full bg-border-dark w-5/6" />
    </div>
    <p className="text-xs text-body text-center mt-auto">
      Bài viết #{idx + 1} đang được soạn thảo…
    </p>
  </div>
);

// ── main page ────────────────────────────────────────────────────────────────

export const BlogPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [filter, setFilter] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(articles.flatMap((a) => a.tags ?? []))
  );

  const featured = articles.find((a) => a.isFeatured) ?? articles[0];
  const regular = articles.filter((a) => a.id !== featured.id);

  const filtered = filter
    ? regular.filter((a) => a.tags?.includes(filter))
    : regular;

  return (
    <div
      className="min-h-screen font-sans transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-color-primary)', color: 'var(--body)' }}
    >
      {/* ── Top-bar ── */}
      <div className="fixed top-0 left-0 w-full z-50 border-b border-border-dark backdrop-blur-xl"
        style={{ backgroundColor: 'var(--bg-color-primary)', opacity: 0.95 }}
      >
        <div className="container flex items-center justify-between py-3">
          <Link
            to="/"
            className="flex items-center gap-2 no-underline text-important font-bold hover:opacity-75 transition-opacity"
          >
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black"
              style={{ backgroundColor: 'var(--important)', color: 'var(--bg-color-primary)' }}
            >
              ĐN
            </span>
            <span className="text-sm hidden sm:block">← Quay lại Portfolio</span>
          </Link>

          <h1 className="text-base font-bold text-important">Blog</h1>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 text-center px-4">
        <p className="text-sub font-semibold text-sm mb-3 tracking-widest uppercase">Góc viết lách</p>
        <h2
          className="font-black text-important mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
        >
          Chia sẻ kiến thức &amp; kinh nghiệm
        </h2>
        <p className="text-body max-w-xl mx-auto text-base leading-relaxed">
          Tôi viết về Backend, web development và những thứ tôi học được trong quá trình làm việc.
          Nội dung đang được xây dựng dần — hãy ghé lại thường xuyên nhé!
        </p>
      </section>

      <div className="container pb-24">
        {/* ── Featured ── */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-sub mb-4">⭐ Nổi bật</p>
          <ArticleCard article={featured} featured />
        </div>

        {/* ── Filter tags ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilter(null)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
              filter === null
                ? 'border-important text-important'
                : 'border-border-dark text-sub hover:border-important hover:text-important'
            }`}
            style={filter === null ? { borderColor: 'var(--important)' } : {}}
          >
            Tất cả
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                filter === tag
                  ? 'border-important text-important'
                  : 'border-border-dark text-sub hover:border-important hover:text-important'
              }`}
              style={filter === tag ? { borderColor: 'var(--important)' } : {}}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ── Article grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}

          {/* Placeholder "đang soạn" cards để grid không trống quá */}
          {Array.from({ length: Math.max(0, 3 - filtered.length) }).map((_, i) => (
            <ComingSoonCard key={`coming-${i}`} idx={filtered.length + i} />
          ))}
        </div>

        {/* ── Newsletter / Coming soon banner ── */}
        <div className="rounded-2xl border border-dashed border-border-dark p-8 text-center mt-8">
          <p className="text-3xl mb-3">📬</p>
          <h3 className="text-xl font-bold text-important mb-2">
            Bài viết mới đang được chuẩn bị
          </h3>
          <p className="text-body text-sm max-w-md mx-auto leading-relaxed">
            Tôi đang từ từ xây dựng blog này. Bạn có thể theo dõi tôi trên{' '}
            <a
              href="https://github.com/NguyenDinhDang"
              target="_blank"
              rel="noopener"
              className="text-important font-semibold hover:underline"
            >
              GitHub
            </a>{' '}
            để không bỏ lỡ bài viết mới nhất.
          </p>
        </div>
      </div>
    </div>
  );
};

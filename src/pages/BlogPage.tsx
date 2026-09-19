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

// ── Article Card ─────────────────────────────────────────────────────────────

const ArticleCard: React.FC<{ article: ArticleItem }> = ({ article }) => (
  <a
    href={article.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col rounded-[var(--gutter-nano)] border border-portfolio-border bg-bg-secondary overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 no-underline"
    style={{ textDecoration: 'none' }}
  >
    {/* Cover image */}
    {article.imageSrc ? (
      <div className="h-48 overflow-hidden flex-shrink-0">
        <img
          src={article.imageSrc}
          alt={article.imageAlt || article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    ) : (
      <div className="h-48 flex-shrink-0 bg-bg-secondary border-b border-portfolio-border" />
    )}

    {/* Content */}
    <div className="flex flex-col gap-3 p-[var(--gutter-small)] flex-1">
      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-border-dark text-sub"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <h3 className="text-[var(--h4)] font-bold text-important leading-snug group-hover:opacity-75 transition-opacity line-clamp-2">
        {article.title}
      </h3>

      {article.description && (
        <p className="text-[var(--text-small)] text-body leading-relaxed line-clamp-3 flex-1">
          {article.description}
        </p>
      )}

      {/* Footer meta */}
      <div className="flex items-center justify-between pt-3 mt-auto border-t border-portfolio-border text-xs text-body">
        <div className="flex items-center gap-2">
          {article.date && <span>{formatDate(article.date)}</span>}
          {article.date && article.readTime && <span className="opacity-30">·</span>}
          {article.readTime && <span>{article.readTime}</span>}
        </div>
        <span className="font-semibold text-sub group-hover:underline">Đọc trên Notion</span>
      </div>
    </div>
  </a>
);

// ── Empty state ───────────────────────────────────────────────────────────────

const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center gap-8">
    <div>
      <h3 className="text-[var(--h3)] font-bold text-important mb-3">
        Blog đang được xây dựng
      </h3>
      <p className="text-[var(--text-medium)] text-body max-w-md leading-relaxed">
        Chưa có bài viết nào. Tôi đang soạn nội dung — hãy ghé lại sớm nhé!
      </p>
    </div>

    {/* How-to guide */}
    <div className="rounded-[var(--gutter-nano)] border border-portfolio-border p-[var(--gutter-medium)] max-w-md text-left w-full">
      <p className="text-xs font-bold uppercase tracking-widest text-sub mb-[var(--gutter-x-small)]">
        Cách thêm bài viết từ Notion
      </p>
      <ol className="space-y-3 text-[var(--text-small)] text-body list-none p-0 m-0">
        <li className="flex gap-3 items-start">
          <span className="flex-shrink-0 w-6 h-6 rounded-full border border-border-dark flex items-center justify-center text-xs font-black text-important mt-0.5">1</span>
          <span>Viết bài xong trên <strong className="text-important font-semibold">Notion</strong></span>
        </li>
        <li className="flex gap-3 items-start">
          <span className="flex-shrink-0 w-6 h-6 rounded-full border border-border-dark flex items-center justify-center text-xs font-black text-important mt-0.5">2</span>
          <span>Nhấn <strong className="text-important font-semibold">Share → Share to web</strong> để lấy link công khai</span>
        </li>
        <li className="flex gap-3 items-start">
          <span className="flex-shrink-0 w-6 h-6 rounded-full border border-border-dark flex items-center justify-center text-xs font-black text-important mt-0.5">3</span>
          <span>Thêm link vào <code className="bg-bg-secondary border border-border-dark px-1.5 py-0.5 rounded text-xs text-important">src/data/articles.ts</code> rồi deploy</span>
        </li>
      </ol>
    </div>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────

export const BlogPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(articles.flatMap((a) => a.tags ?? [])));

  const displayed = activeTag
    ? articles.filter((a) => a.tags?.includes(activeTag))
    : articles;

  const hasArticles = articles.length > 0;

  return (
    <div
      className="min-h-screen font-sans transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-color-primary)', color: 'var(--body)' }}
    >
      {/* ── Fixed top-bar ── */}
      <div
        className="fixed top-0 left-0 w-full z-50 border-b border-portfolio-border"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(12,10,10,0.88)' : 'rgba(251,251,251,0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="container flex items-center justify-between py-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 no-underline font-bold hover:opacity-70 transition-opacity"
            style={{ color: 'var(--important)' }}
          >
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
              style={{ backgroundColor: 'var(--important)', color: 'var(--bg-color-primary)' }}
            >
              ĐN
            </span>
            <span className="text-[var(--text-small)] hidden sm:block">Quay lại Portfolio</span>
          </Link>

          <h1 className="text-[var(--text-medium)] font-bold" style={{ color: 'var(--important)' }}>
            Blog
          </h1>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </div>

      {/* ── Page hero ── */}
      <section className="pt-32 pb-[var(--gutter-x-large)] text-center px-4">
        <p className="text-sub font-semibold text-xs mb-3 tracking-widest uppercase">Góc viết lách</p>
        <h2
          className="font-black text-important mb-4"
          style={{ fontSize: 'var(--h1)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
        >
          Chia sẻ kiến thức &amp; kinh nghiệm
        </h2>
        <p className="text-body max-w-xl mx-auto text-[var(--text-medium)] leading-relaxed">
          Tôi viết về Backend, web development và những thứ học được qua quá trình làm việc.
          Mỗi bài là 1 trang Notion — nhấn vào để đọc trực tiếp.
        </p>
      </section>

      <div className="container pb-[var(--gutter-huge)]">
        {/* ── Tag filter (chỉ hiện khi có bài và có tags) ── */}
        {hasArticles && allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-[var(--gutter-small)]">
            <button
              onClick={() => setActiveTag(null)}
              className="px-[var(--gutter-x-small)] py-[var(--gutter-nano)] rounded-[var(--gutter-large)] text-[var(--text-small)] font-semibold border transition-all duration-200 cursor-pointer"
              style={{
                borderColor: activeTag === null ? 'var(--important)' : 'var(--border-dark)',
                color: activeTag === null ? 'var(--important)' : 'var(--sub)',
              }}
            >
              Tất cả ({articles.length})
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className="px-[var(--gutter-x-small)] py-[var(--gutter-nano)] rounded-[var(--gutter-large)] text-[var(--text-small)] font-semibold border transition-all duration-200 cursor-pointer"
                style={{
                  borderColor: activeTag === tag ? 'var(--important)' : 'var(--border-dark)',
                  color: activeTag === tag ? 'var(--important)' : 'var(--sub)',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* ── Content ── */}
        {hasArticles ? (
          displayed.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[3.5%]">
              {displayed.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-center text-body py-[var(--gutter-huge)] text-[var(--text-medium)]">
              Không có bài viết nào với tag này.
            </p>
          )
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

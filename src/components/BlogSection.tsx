import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

export const BlogSection: React.FC = () => {
  const hasArticles = articles.length > 0;

  return (
    <section className="article pt-[var(--gutter-huge)]" id="blog">
      <div className="container">
        <div className="flex items-end justify-between mb-[var(--gutter-x-large)] flex-wrap gap-4">
          <h2 className="text-[var(--h2)] font-bold text-important">
            Blog của tôi
          </h2>
          <Link to="/blog" className="link text-[var(--text-small)] font-semibold">
            Xem tất cả →
          </Link>
        </div>

        {hasArticles ? (
          /* Grid preview — hiển thị tối đa 3 bài mới nhất */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-portfolio-border bg-bg-secondary p-6 no-underline transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ textDecoration: 'none' }}
              >
                {article.tags && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {article.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full text-xs font-semibold border border-border-dark text-sub"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="text-[var(--h4)] font-bold text-important mb-2 group-hover:opacity-75 transition-opacity line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-[var(--text-small)] text-body leading-relaxed line-clamp-3 flex-1">
                  {article.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-sub group-hover:underline">
                  Đọc trên Notion →
                </span>
              </a>
            ))}
          </div>
        ) : (
          /* Empty state — khi chưa có bài viết */
          <div className="flex flex-col sm:flex-row items-center gap-8 rounded-2xl border border-dashed border-portfolio-border p-10">
            <span className="text-6xl flex-shrink-0">✍️</span>
            <div>
              <h3 className="text-[var(--h4)] font-bold text-important mb-2">
                Blog đang được xây dựng
              </h3>
              <p className="text-[var(--text-small)] text-body leading-relaxed mb-4 max-w-lg">
                Tôi đang soạn những bài viết đầu tiên về Backend, web development và những thứ tôi học được. Nội dung sẽ được publish trên Notion — hãy ghé lại sớm nhé!
              </p>
              <Link to="/blog" className="link text-[var(--text-small)]">
                Xem trang blog →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

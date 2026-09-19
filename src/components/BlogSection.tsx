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
            Xem tất cả
          </Link>
        </div>

        {hasArticles ? (
          /* Grid preview — hiển thị tối đa 3 bài mới nhất */
          <div className="article-boxes flex flex-row flex-wrap gap-[3.5%]">
            {articles.slice(0, 3).map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group article-box basis-[31%] border border-portfolio-border p-[var(--gutter-medium)] px-[var(--gutter-small)] rounded-[var(--gutter-nano)] bg-bg-secondary flex flex-col justify-between max-985:basis-[48%] max-650:basis-full max-650:mb-[var(--gutter-x-small)] no-underline transition-shadow duration-200 hover:shadow-[var(--shadow)]"
                style={{ textDecoration: 'none' }}
              >
                <div className="h-full flex flex-col justify-between">
                  <div>
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
                    <h4 className="text-[var(--h4)] font-bold text-important mb-2 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-[var(--text-small)] text-body leading-relaxed line-clamp-3">
                      {article.description}
                    </p>
                  </div>
                  <div className="article-info flex justify-between items-center mt-auto pt-4">
                    <span className="link text-[var(--text-small)]">Đọc trên Notion</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          /* Empty state — khi chưa có bài viết nào */
          <div className="border border-portfolio-border rounded-[var(--gutter-nano)] p-[var(--gutter-x-large)] max-w-[685px]">
            <h3 className="text-[var(--h4)] font-bold text-important mb-3">
              Blog đang được xây dựng
            </h3>
            <p className="text-[var(--text-medium)] text-body leading-relaxed mb-[var(--gutter-small)]">
              Tôi đang soạn những bài viết đầu tiên về Backend và web development.
              Nội dung sẽ được publish trực tiếp trên Notion — hãy ghé lại sớm nhé!
            </p>
            <Link to="/blog" className="link text-[var(--text-small)]">
              Xem trang blog
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

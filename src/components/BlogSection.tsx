import React from 'react';
import { articles } from '../data/articles';

export const BlogSection: React.FC = () => {
  const featuredArticle = articles.find((a) => a.isFeatured) || articles[0];
  const regularArticles = articles.filter((a) => a.id !== featuredArticle.id);

  return (
    <section className="article pt-[var(--gutter-huge)]">
      <div className="container">
        <h2
          id="blog"
          className="text-[var(--h2)] font-bold text-center text-important mb-[var(--gutter-x-large)]"
        >
          Kinh nghiệm làm việc của tôi
        </h2>

        <div className="article-boxes flex flex-row flex-wrap gap-[3.5%] mt-[var(--gutter-x-large)] max-985:max-w-[685px] max-985:mx-auto max-985:justify-center max-985:gap-[4%]">
          {/* Featured Article */}
          <article className="featured-article w-full flex items-center justify-between mb-11 max-985:mb-6 max-985:flex-col-reverse">
            <div className="article-textbox basis-[44%] max-985:w-full flex flex-col justify-between">
              <div>
                <h3 className="text-[var(--h3)] font-bold text-important mt-[var(--gutter-x-small)] mb-2">
                  {featuredArticle.title}
                </h3>
                <p className="text-[var(--text-medium)] text-body my-[var(--gutter-x-small)] leading-relaxed">
                  {featuredArticle.description}
                </p>
              </div>
              <div className="article-info flex justify-start items-center gap-[var(--gutter-medium)] mt-auto pt-2">
                <a
                  href={featuredArticle.url}
                  className="link"
                  target="_blank"
                  rel="noopener"
                >
                  Continue reading
                </a>
                <span className="reaction-count inline-flex items-center gap-[var(--gutter-nano)] text-body text-sm font-medium">
                  <img
                    src="assets/images/heart-outline.svg"
                    alt="heart"
                    className="w-4 h-4 dark:invert"
                  />
                  {featuredArticle.reactionCount}
                </span>
              </div>
            </div>

            {featuredArticle.imageSrc && (
              <picture className="article-illustration basis-[50%] max-985:w-full">
                <img
                  src={featuredArticle.imageSrc}
                  alt={featuredArticle.imageAlt || 'Article illustration'}
                  loading="lazy"
                  className="w-full h-auto rounded-[var(--gutter-nano)] object-cover"
                />
              </picture>
            )}
          </article>

          {/* Regular Articles */}
          {regularArticles.map((article, idx) => (
            <article
              key={article.id}
              className={`article-box basis-[31%] border border-portfolio-border p-[var(--gutter-medium)] px-[var(--gutter-small)] rounded-[var(--gutter-nano)] bg-bg-secondary flex flex-col justify-between max-985:basis-[48%] max-650:basis-full max-650:mb-[var(--gutter-x-small)] ${
                idx === 2 ? 'max-985:hidden max-650:block' : ''
              }`}
            >
              <div className="article-textbox h-full flex flex-col justify-between">
                <div>
                  <h4 className="text-[var(--h4)] font-bold text-important mb-2">
                    {article.title}
                  </h4>
                  <p className="text-[var(--text-small)] text-body my-[var(--gutter-x-small)] leading-relaxed">
                    {article.description}
                  </p>
                </div>
                <div className="article-info flex justify-between items-center mt-auto pt-4">
                  <a
                    href={article.url}
                    className="link"
                    target="_blank"
                    rel="noopener"
                  >
                    Continue reading
                  </a>
                  <span className="reaction-count inline-flex items-center gap-[var(--gutter-nano)] text-body text-sm font-medium">
                    <img
                      src="assets/images/heart-outline.svg"
                      alt="heart"
                      loading="lazy"
                      className="w-4 h-4 dark:invert"
                    />
                    {article.reactionCount}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

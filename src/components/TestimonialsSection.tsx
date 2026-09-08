import React from 'react';
import { testimonials } from '../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="testimonials-section pt-[var(--gutter-huge)]">
      <div className="container">
        <h2 className="text-[var(--h2)] font-bold text-center text-important">
          Testimonials
        </h2>

        <ol className="testimonials-grid grid grid-cols-3 max-1100:grid-cols-2 max-645:grid-cols-1 gap-[1px] mt-[var(--gutter-x-large)] list-none p-0 bg-gradient-to-b from-[rgba(88,88,88,0.3)] to-[rgba(214,214,214,0.08)] border border-portfolio-border rounded-lg overflow-hidden">
          {testimonials.map((item) => (
            <li
              key={item.id}
              className="testimonial flex flex-col p-[var(--gutter-small)] bg-bg-primary transition-colors duration-200"
            >
              <blockquote className="testimonial-text text-[var(--text-small)] font-light text-body mb-[var(--gutter-x-small)] leading-relaxed italic">
                "{item.quote}"
              </blockquote>

              <figure className="testimonial-author mt-auto flex items-center gap-[var(--gutter-micro)]">
                <img
                  src={item.authorImg}
                  alt={item.authorName}
                  loading="lazy"
                  className="w-[52px] h-[52px] rounded-full bg-bg-secondary object-cover"
                />
                <figcaption>
                  <h3 className="testimonial-author-name text-base font-bold text-important mb-[0.3rem]">
                    {item.authorName}
                  </h3>
                  <p className="testimonial-author-job text-sm text-body font-normal">
                    {item.authorJob}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

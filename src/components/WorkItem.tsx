import React from 'react';
import type { ProjectItem } from '../types';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

interface WorkItemProps {
  project: ProjectItem;
}

export const WorkItem: React.FC<WorkItemProps> = ({ project }) => {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="flex justify-between items-center max-1045:flex-col-reverse max-1045:items-start mb-[var(--gutter-huge)] max-1285:mb-32 last:mb-0"
    >
      <div className="basis-[49%] max-w-[445px]">
        <h3
          className="text-[var(--h3)] font-bold leading-[1.2] text-important overflow-wrap-break"
          style={{
            animation: isInView
              ? 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both 0s'
              : 'none',
          }}
        >
          {project.title}
        </h3>

        <p
          className="text-body font-light my-[var(--gutter-micro)] leading-relaxed"
          style={{
            animation: isInView
              ? 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both 0.2s'
              : 'none',
          }}
        >
          {project.description}
        </p>

        <ol
          className="list-disc list-inside mb-[var(--gutter-x-small)] font-light text-body"
          style={{
            animation: isInView
              ? 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both 0.3s'
              : 'none',
          }}
        >
          {project.technologies.map((tech, idx) => (
            <li key={idx} className="my-0.5">
              {tech}
            </li>
          ))}
        </ol>

        <div
          className="inline-flex items-center gap-[var(--gutter-x-small)]"
          style={{
            animation: isInView
              ? 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both 0.4s'
              : 'none',
          }}
        >
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener"
            className="link"
          >
            Khám phá dự án này
          </a>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener"
              title="Source code"
              className="inline-block transition-transform duration-300 ease-in hover:scale-110 focus:scale-110"
            >
              <img
                src="assets/images/social-links/github.svg"
                alt="GitHub"
                loading="lazy"
                className="w-7 h-7 dark:invert"
              />
            </a>
          )}
        </div>
      </div>

      <picture
        className={`basis-[49%] max-w-[785px] max-1045:mb-[var(--gutter-medium)] rounded-lg overflow-hidden light:shadow-[var(--shadow)] ${
          isInView ? 'work-img-revealed' : 'work-img-initial'
        }`}
      >
        <img
          src={project.imageSrc}
          alt={project.imageAlt}
          loading="lazy"
          className="w-full h-auto object-cover rounded-md"
        />
      </picture>
    </div>
  );
};

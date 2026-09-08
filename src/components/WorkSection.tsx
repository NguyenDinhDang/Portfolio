import React from 'react';
import { projects } from '../data/projects';
import { WorkItem } from './WorkItem';

export const WorkSection: React.FC = () => {
  return (
    <section className="work pt-[var(--gutter-huge)]">
      <div className="container">
        <h2
          id="work"
          className="text-[var(--h2)] font-bold text-center text-important mb-[var(--gutter-x-large)] max-885:mt-[45px] max-485:mt-0"
        >
          Những dự án của tôi
        </h2>

        <div className="work-boxes pt-4">
          {projects.map((project) => (
            <WorkItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

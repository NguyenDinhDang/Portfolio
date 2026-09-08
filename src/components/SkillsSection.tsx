import React from 'react';
import { skills } from '../data/skills';

export const SkillsSection: React.FC = () => {
  return (
    <section className="skills pt-[var(--gutter-huge)]">
      <div className="container">
        <h2
          id="skills"
          className="text-[var(--h2)] font-bold text-center text-important mb-[var(--gutter-x-large)]"
        >
          Những công nghệ của tôi
        </h2>

        <div className="skills-imgs flex flex-row flex-wrap justify-center items-center gap-[var(--gutter-x-large)] max-675:gap-[var(--gutter-large)] pt-[var(--gutter-x-large)]">
          {skills.map((skill) => (
            <img
              key={skill.id}
              src={skill.imgSrc}
              alt={skill.name}
              title={skill.title}
              loading="lazy"
              className="w-[135px] h-[135px] max-1100:w-[100px] max-1100:h-[100px] max-810:w-[85px] max-810:h-[85px] max-675:w-[70px] max-675:h-[70px] max-340:w-[55px] max-340:h-[55px] object-contain transition-transform duration-300 hover:scale-110"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

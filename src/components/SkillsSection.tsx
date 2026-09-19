import React from 'react';
import { skills } from '../data/skills';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="skills pt-16 sm:pt-20 lg:pt-24">
      <div className="container">
        <h2
          className="text-[var(--h2)] font-bold text-center text-important mb-8 sm:mb-12"
        >
          Những công nghệ của tôi
        </h2>

        <div className="skills-imgs flex flex-row flex-wrap justify-center items-center gap-8 sm:gap-10 lg:gap-12">
          {skills.map((skill) => (
            <img
              key={skill.id}
              src={skill.imgSrc}
              alt={skill.name}
              title={skill.title}
              loading="lazy"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain transition-transform duration-300 hover:scale-110"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { RevealSection } from '../components/motion/RevealSection';
import { itemFadeUpVariants } from '../components/motion/motionVariants';
import { projects } from '../data/projects';
import { useAntiGravity } from '../hooks/useAntiGravity';

export const Work: React.FC = () => {
  useAntiGravity('.ag-target', {
    radius: 160,
    strength: 0.6,
    driftAmplitude: 3.5,
  });

  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <RevealSection watermarkText="PROJECTS">
          <div style={{ maxWidth: '840px', marginBottom: '5rem' }}>
            <motion.div variants={itemFadeUpVariants} className="eyebrow">
              [ 01 . SELECTED WORK ]
            </motion.div>
            <motion.h1 variants={itemFadeUpVariants} className="display-title" style={{ marginBottom: '2rem' }}>
              CASE STUDIES & <span style={{ color: 'var(--accent)' }}>SYSTEMS</span> ARCHITECTURE.
            </motion.h1>
            <motion.p variants={itemFadeUpVariants} className="text-lead">
              In-depth breakdowns of real-world backend microservices, RAG pipelines, and creative engineering systems.
            </motion.p>
          </div>
        </RevealSection>

        {/* Project Case Studies List */}
        <RevealSection watermarkText="PORTFOLIO">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {projects.map((project) => (
              <motion.article
                key={project.slug}
                variants={itemFadeUpVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: 'clamp(2rem, 4vw, 3.5rem)',
                  transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.5), 0 0 20px var(--accent-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '1.25rem',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--accent)',
                      }}
                    >
                      {project.number}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        textTransform: 'uppercase',
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      // {project.category}
                    </span>
                  </div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <NavLink
                      to={`/work/${project.slug}`}
                      className="btn btn-outline"
                      data-cursor="CASE STUDY"
                      style={{ padding: '0.4rem 0.875rem', fontSize: 'var(--text-xs)' }}
                    >
                      <span>Read Full Case Study</span>
                      <ArrowUpRight size={14} />
                    </NavLink>
                  </motion.div>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-h2)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                  }}
                >
                  {project.title}
                </h2>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--text-body)',
                    lineHeight: 1.7,
                    marginBottom: '2rem',
                    maxWidth: '75ch',
                  }}
                >
                  {project.description}
                </p>

                {/* Two Column Summary: Problem vs Approach */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '1.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    marginBottom: '2rem',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--accent)',
                        textTransform: 'uppercase',
                        marginBottom: '0.5rem',
                      }}
                    >
                      The Problem
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--accent)',
                        textTransform: 'uppercase',
                        marginBottom: '0.5rem',
                      }}
                    >
                      The Approach & Solution
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {project.approach}
                    </p>
                  </div>
                </div>

                {/* Tech stack tags & metrics */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="ag-target"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--text-primary)',
                          backgroundColor: 'var(--bg-secondary)',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '3px',
                          border: '1px solid var(--border)',
                          display: 'inline-block',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--accent)',
                    }}
                  >
                    Outcome: {project.outcome}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </RevealSection>
      </div>
    </main>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import { RevealSection } from '../components/motion/RevealSection';
import { itemFadeUpVariants } from '../components/motion/motionVariants';
import { experiences } from '../data/experience';
import { useAntiGravity } from '../hooks/useAntiGravity';

export const Experience: React.FC = () => {
  useAntiGravity('.ag-target', {
    radius: 150,
    strength: 0.6,
    driftAmplitude: 3.5,
  });

  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <RevealSection watermarkText="CAREER">
          <div style={{ maxWidth: '840px', marginBottom: '5rem' }}>
            <motion.div variants={itemFadeUpVariants} className="eyebrow">
              [ 01 . TIMELINE ]
            </motion.div>
            <motion.h1 variants={itemFadeUpVariants} className="display-title" style={{ marginBottom: '2rem' }}>
              TECHNICAL CONTRIBUTIONS & <span style={{ color: 'var(--accent)' }}>EXPERIENCE</span>.
            </motion.h1>
            <motion.p variants={itemFadeUpVariants} className="text-lead">
              A chronological timeline of engineering roles, technical responsibilities, and system architectures built.
            </motion.p>
          </div>
        </RevealSection>

        {/* Timeline List */}
        <RevealSection watermarkText="PROGRESSION">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '960px' }}>
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={itemFadeUpVariants}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: 'clamp(2rem, 3.5vw, 3rem)',
                  position: 'relative',
                  transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4)';
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
                    marginBottom: '1.25rem',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Briefcase size={14} />
                    <span>{exp.period}</span>
                  </div>
                  {exp.location && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                      {exp.location}
                    </span>
                  )}
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-h3)',
                    fontWeight: 700,
                    marginBottom: '0.25rem',
                  }}
                >
                  {exp.role}
                </h2>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--accent)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {exp.company}
                </div>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                  }}
                >
                  {exp.description}
                </p>

                {/* Key Contributions */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Key Contributions:
                  </div>
                  <ul
                    style={{
                      listStyleType: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    {exp.contributions.map((c, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                          display: 'flex',
                          gap: '0.75rem',
                        }}
                      >
                        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>→</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="ag-target"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-primary)',
                        backgroundColor: 'var(--bg-secondary)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '3px',
                        border: '1px solid var(--border)',
                        display: 'inline-block',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* CTA */}
        <RevealSection watermarkText="CONTACT">
          <div style={{ marginTop: '5rem' }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <NavLink to="/contact" className="btn btn-primary">
                <span>Get in Touch for Opportunities</span>
                <ArrowUpRight size={16} />
              </NavLink>
            </motion.div>
          </div>
        </RevealSection>
      </div>
    </main>
  );
};

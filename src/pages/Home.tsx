import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Database, Network, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/motion/Marquee';
import { RevealSection } from '../components/motion/RevealSection';
import { itemFadeUpVariants, itemScaleVariants } from '../components/motion/motionVariants';
import { CoverflowCarousel } from '../components/motion/CoverflowCarousel';
import { projects } from '../data/projects';
import { skillCategories, aiWorkflowSteps } from '../data/skills';
import { useAntiGravity } from '../hooks/useAntiGravity';

export const Home: React.FC = () => {
  useAntiGravity('.ag-target', {
    radius: 170,
    strength: 0.65,
    stiffness: 0.032,
    damping: 0.078,
    driftAmplitude: 4,
    rotationAmplitude: 2.2,
  });

  return (
    <main>
      {/* 1. Hero Floating Motion Layer */}
      <Hero enableParticles={true} enableThreeScene={true} />

      {/* 2. Infinite Seamless Marquee Ticker */}
      <Marquee speed={24} />

      {/* 3. Engineering Identity & Profile Section */}
      <RevealSection
        watermarkText="PROFILE"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            <motion.div variants={itemFadeUpVariants}>
              <div className="eyebrow">[ 01 . IDENTITY ]</div>
              <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1 }}>
                TURNING SYSTEM COMPLEXITY INTO <span style={{ color: 'var(--accent)' }}>DETERMINISTIC</span> SIMPLICITY.
              </h2>
            </motion.div>

            <motion.div variants={itemFadeUpVariants}>
              <p className="text-lead" style={{ marginBottom: '1.5rem' }}>
                I believe software engineering is fundamentally about managing trade-offs.
                Whether designing transactional isolation levels or tuning vector search recall,
                I focus on writing intentional, robust code rather than piling on premature abstractions.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Based in Vietnam, I work across high-throughput backend APIs, relational & vector data storage,
                and applied AI pipelines that solve real-world operational bottlenecks.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ display: 'inline-block' }}
              >
                <NavLink
                  to="/about"
                  className="btn btn-outline"
                  data-cursor="ABOUT"
                >
                  <span>Read Full Engineering Philosophy</span>
                  <ArrowRight size={14} />
                </NavLink>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* 4. Featured Case Studies & Architectures */}
      <RevealSection
        watermarkText="PROJECTS"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <motion.div
            variants={itemFadeUpVariants}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '4rem',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              <div className="eyebrow">[ 02 . ARCHITECTURES ]</div>
              <h2 className="section-title" style={{ margin: 0 }}>
                FEATURED CASE STUDIES & ARCHITECTURES
              </h2>
            </div>
            <NavLink
              to="/work"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--accent)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
              data-cursor="ALL"
            >
              <span>View All 4 Projects</span>
              <ArrowUpRight size={14} />
            </NavLink>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {projects.map((project) => (
              <motion.div
                key={project.slug}
                variants={itemFadeUpVariants}
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
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
                <NavLink
                  to={`/work/${project.slug}`}
                  data-cursor="VIEW"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem',
                    padding: 'clamp(2rem, 3.5vw, 3rem)',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: 'var(--accent)',
                        }}
                      >
                        {project.number}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        // {project.category}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--text-sm)',
                        lineHeight: 1.65,
                        marginBottom: '2rem',
                      }}
                    >
                      {project.tagline}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
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
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--bg-secondary)',
                      padding: '1.75rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border)',
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
                        THE ENGINEERING CHALLENGE
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        {project.problem}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '1.25rem',
                        borderTop: '1px solid var(--border)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        Outcome: <strong style={{ color: 'var(--accent)' }}>{project.outcome}</strong>
                      </span>
                      <ArrowUpRight size={16} color="var(--accent)" />
                    </div>
                  </div>
                </NavLink>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* 5. 3D Coverflow Carousel Section (Specializations & Certifications) */}
      <RevealSection
        watermarkText="SYSTEMS"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <motion.div variants={itemFadeUpVariants} style={{ textAlign: 'center', maxWidth: '780px', marginInline: 'auto', marginBottom: '2.5rem' }}>
            <div className="eyebrow" style={{ marginInline: 'auto' }}>[ 03 . SPECIALIZATIONS ]</div>
            <h2 className="section-title">
              CORE SYSTEM CAPABILITIES & SPECIALIZATIONS
            </h2>
            <p className="text-lead" style={{ marginInline: 'auto' }}>
              Swipe or use controls to explore production-grade architectural proficiencies in distributed backends, AI vector retrieval, and data consistency.
            </p>
          </motion.div>

          <motion.div variants={itemFadeUpVariants}>
            <CoverflowCarousel />
          </motion.div>
        </div>
      </RevealSection>

      {/* 6. AI Workflow & Engineering Execution */}
      <RevealSection
        watermarkText="WORKFLOW"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <motion.div variants={itemFadeUpVariants}>
            <div className="eyebrow">[ 04 . METHODOLOGY ]</div>
            <h2 className="section-title">HOW I BUILD WITH AI — ENGINEERING EXECUTION</h2>
            <p className="text-lead" style={{ marginBottom: '3.5rem' }}>
              I treat AI as a high-speed multiplier for exploration, boilerplate, and test generation — while human engineering judgment governs architecture, validation, and production safety.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {aiWorkflowSteps.map((step) => (
              <motion.div
                key={step.number}
                variants={itemScaleVariants}
                whileHover={{ y: -4, borderColor: 'var(--border-strong)' }}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '2rem',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent)',
                    marginBottom: '0.75rem',
                  }}
                >
                  PHASE {step.number} // {step.phase}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                  }}
                >
                  {step.title}
                </h3>
                <div style={{ marginBottom: '0.75rem', fontSize: 'var(--text-xs)' }}>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                    Human Ownership:
                  </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{step.humanRole}</span>
                </div>
                <div style={{ marginBottom: '1.25rem', fontSize: 'var(--text-xs)' }}>
                  <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.2rem' }}>
                    AI Acceleration:
                  </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{step.aiRole}</span>
                </div>
                <div
                  style={{
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <CheckCircle2 size={12} color="var(--accent)" />
                  <span>{step.keyOutcome}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* 7. Technical Arsenal & Skill Constellations */}
      <RevealSection
        watermarkText="CAPABILITY"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <motion.div variants={itemFadeUpVariants}>
            <div className="eyebrow">[ 05 . CAPABILITY ]</div>
            <h2 className="section-title">CAPABILITY CONSTELLATIONS (ZERO-GRAVITY PHYSICS)</h2>
            <p className="text-lead" style={{ marginBottom: '3.5rem' }}>
              Hover your cursor near any tag to experience the physical AntiGravity repulsion and 3D rotational drift.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {skillCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                variants={itemScaleVariants}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '2.25rem',
                }}
              >
                <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
                  {idx === 0 && <Cpu size={22} />}
                  {idx === 1 && <Database size={22} />}
                  {idx === 2 && <Network size={22} />}
                  {idx === 3 && <Terminal size={22} />}
                  {idx > 3 && <Terminal size={22} />}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                  }}
                >
                  {cat.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', marginBottom: '1.5rem' }}>
                  {cat.tagline}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {cat.skills.map((s) => (
                    <span
                      key={s.name}
                      className="ag-target"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-primary)',
                        backgroundColor: 'var(--bg-secondary)',
                        padding: '0.4rem 0.75rem',
                        borderRadius: '4px',
                        border: '1px solid var(--border)',
                        display: 'inline-block',
                        cursor: 'default',
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* 8. Call to Action */}
      <RevealSection
        watermarkText="CONNECT"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <motion.div
            variants={itemFadeUpVariants}
            style={{
              padding: 'clamp(3rem, 6vw, 5rem)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div className="eyebrow" style={{ marginInline: 'auto' }}>
              [ 06 . CONTACT ]
            </div>
            <h2
              className="display-title"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                marginBottom: '1.5rem',
              }}
            >
              HAVE A PROBLEM WORTH <span style={{ color: 'var(--accent)' }}>SOLVING</span>?
            </h2>
            <p className="text-lead" style={{ marginInline: 'auto', marginBottom: '3rem' }}>
              I am open for selected software engineering engagements, backend architecture consulting, and AI/RAG system implementations.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <NavLink to="/contact" className="btn btn-primary" data-cursor="START">
                  <span>Start a Project</span>
                  <ArrowUpRight size={16} />
                </NavLink>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="mailto:banhvannguyen45@gmail.com"
                  className="btn btn-outline"
                  data-cursor="EMAIL"
                >
                  <span>Email Directly</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </RevealSection>
    </main>
  );
};

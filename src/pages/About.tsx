import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { RevealSection, itemFadeUpVariants, itemScaleVariants } from '../components/motion/RevealSection';
import { skillCategories, aiWorkflowSteps } from '../data/skills';
import { useAntiGravity } from '../hooks/useAntiGravity';

export const About: React.FC = () => {
  useAntiGravity('.ag-target', {
    radius: 160,
    strength: 0.6,
    driftAmplitude: 3.5,
  });

  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <RevealSection watermarkText="ABOUT">
          <div style={{ maxWidth: '840px', marginBottom: '5rem' }}>
            <motion.div variants={itemFadeUpVariants} className="eyebrow">
              [ 01 . PHILOSOPHY ]
            </motion.div>
            <motion.h1 variants={itemFadeUpVariants} className="display-title" style={{ marginBottom: '2rem' }}>
              ENGINEERING WITH INTENTION, <span style={{ color: 'var(--accent)' }}>DEPTH</span> & CLARITY.
            </motion.h1>
            <motion.p variants={itemFadeUpVariants} className="text-lead">
              I am a Software Engineer based in Vietnam, focused on architecting robust backend systems,
              distributed architectures, and high-precision RAG/AI retrieval pipelines.
            </motion.p>
          </div>
        </RevealSection>

        {/* Core Principles Grid */}
        <RevealSection watermarkText="MINDSET">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              marginBottom: '6rem',
            }}
          >
            <motion.div
              variants={itemScaleVariants}
              whileHover={{ y: -4, borderColor: 'var(--border-strong)' }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '2.5rem',
                transition: 'border-color 0.25s ease',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--accent)',
                  display: 'block',
                  marginBottom: '1rem',
                }}
              >
                01 // CORE MINDSET
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                First-Principles Problem Solving
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                Software is not about writing more code; it's about solving real constraints with the simplest,
                most maintainable architecture possible. I prioritize deep system understanding over superficial abstractions.
              </p>
            </motion.div>

            <motion.div
              variants={itemScaleVariants}
              whileHover={{ y: -4, borderColor: 'var(--border-strong)' }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '2.5rem',
                transition: 'border-color 0.25s ease',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--accent)',
                  display: 'block',
                  marginBottom: '1rem',
                }}
              >
                02 // BACKEND FOCUS
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                Performance & Data Integrity
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                From sub-millisecond async handlers in FastAPI to optimized PostgreSQL indexing and Redis message brokers,
                I build backend systems designed to stay fast and reliable under pressure.
              </p>
            </motion.div>

            <motion.div
              variants={itemScaleVariants}
              whileHover={{ y: -4, borderColor: 'var(--border-strong)' }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '2.5rem',
                transition: 'border-color 0.25s ease',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--accent)',
                  display: 'block',
                  marginBottom: '1rem',
                }}
              >
                03 // AI AS AN ACCELERATOR
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                Disciplined AI Engineering
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                I leverage LLMs and AI coding assistants for hypothesis exploration, testing synthesis, and rapid boilerplate,
                while retaining complete architectural accountability and rigorous verification.
              </p>
            </motion.div>
          </div>
        </RevealSection>

        {/* AI Workflow Section */}
        <RevealSection watermarkText="WORKFLOW">
          <div style={{ marginBottom: '6rem' }}>
            <motion.div variants={itemFadeUpVariants} className="eyebrow">
              [ 02 . METHODOLOGY ]
            </motion.div>
            <motion.h2 variants={itemFadeUpVariants} className="section-title">
              HOW I BUILD WITH AI — ENGINEERING WORKFLOW
            </motion.h2>
            <motion.p variants={itemFadeUpVariants} className="text-lead" style={{ marginBottom: '3rem' }}>
              AI enhances velocity, but human judgment owns the architecture, trade-offs, and final quality.
            </motion.p>

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
                  whileHover={{ y: -4 }}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '2rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--accent)',
                      marginBottom: '0.5rem',
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
                  <div style={{ marginBottom: '1rem', fontSize: 'var(--text-xs)' }}>
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

        {/* Complete Skills Overview */}
        <RevealSection watermarkText="STACK">
          <motion.div variants={itemFadeUpVariants} className="eyebrow">
            [ 03 . CAPABILITIES ]
          </motion.div>
          <motion.h2 variants={itemFadeUpVariants} className="section-title">
            COMPREHENSIVE TECHNOLOGY STACK
          </motion.h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginTop: '2.5rem',
            }}
          >
            {skillCategories.map((cat) => (
              <motion.div
                key={cat.id}
                variants={itemScaleVariants}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '2rem',
                }}
              >
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {cat.skills.map((s) => (
                    <div
                      key={s.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: '4px',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{s.name}</span>
                      <span
                        className="ag-target"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--accent)',
                          display: 'inline-block',
                        }}
                      >
                        {s.level}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* CTA */}
        <RevealSection watermarkText="CONNECT">
          <motion.div
            variants={itemFadeUpVariants}
            style={{
              marginTop: '6rem',
              padding: '3.5rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              HAVE A SYSTEM TO ARCHITECT OR SCALE?
            </h2>
            <p className="text-lead" style={{ marginInline: 'auto', marginBottom: '2rem' }}>
              Let's discuss requirements, trade-offs, and technical solutions.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <NavLink to="/contact" className="btn btn-primary">
                <span>Start a Technical Discussion</span>
                <ArrowUpRight size={16} />
              </NavLink>
            </motion.div>
          </motion.div>
        </RevealSection>
      </div>
    </main>
  );
};

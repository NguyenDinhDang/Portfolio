import React from 'react';
import { useParams, NavLink, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Layers, AlertCircle } from 'lucide-react';
import { projects } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useAntiGravity } from '../hooks/useAntiGravity';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useScrollReveal('[data-reveal]');
  useAntiGravity('.ag-target', {
    radius: 150,
    strength: 0.6,
    driftAmplitude: 3,
  });

  if (!project) {
    return <Navigate to="/work" replace />;
  }


  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Back Link */}
        <NavLink
          to="/work"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <ArrowLeft size={14} />
          <span>Back to Case Studies</span>
        </NavLink>

        {/* Header Block */}
        <div style={{ maxWidth: '900px', marginBottom: '4rem' }}>
          <div className="eyebrow">
            CASE STUDY {project.number} // {project.category}
          </div>
          <h1 className="display-title" style={{ marginBottom: '1.5rem' }}>
            {project.title}
          </h1>
          <p className="text-lead" style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: 'var(--text-primary)' }}>
            {project.tagline}
          </p>
        </div>

        {/* Metadata Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            padding: '2rem',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            marginBottom: '4rem',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              CATEGORY
            </div>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{project.category}</div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              KEY RESULT
            </div>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--accent)' }}>{project.outcome}</div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              LINKS
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--accent)',
                  }}
                >
                  <span>Repository</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Technical Deep Dive Sections */}
        <div
          data-reveal
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Problem & Approach */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '2.25rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                <AlertCircle size={14} />
                <span>The Challenge & Context</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                {project.problem}
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '2.25rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                <CheckCircle2 size={14} />
                <span>Engineered Solution</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                {project.approach}
              </p>
            </div>
          </div>

          {/* Architecture Pipeline Flow */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '2.25rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              <Layers size={14} />
              <span>System Dataflow & Architecture</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {project.architecture.map((layer, index) => (
                <div
                  key={layer}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>0{index + 1}</span>
                  <span>{layer}</span>
                </div>
              ))}
            </div>

            {project.difficulties && (
              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                  }}
                >
                  TECHNICAL TRADE-OFFS & RESOLUTION:
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {project.difficulties}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div style={{ marginBottom: '4rem' }} data-reveal>
          <div className="eyebrow">TECHNOLOGY STACK USED</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {project.technologies.map((t) => (
              <span
                key={t}
                className="ag-target"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-surface)',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  display: 'inline-block',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>


        {/* Next Project Footer Link */}
        <div
          style={{
            paddingTop: '3rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <NavLink
            to="/work"
            className="btn btn-outline"
          >
            <ArrowLeft size={16} />
            <span>All Projects</span>
          </NavLink>

          <NavLink
            to="/contact"
            className="btn btn-primary"
          >
            <span>Discuss This Architecture</span>
            <ArrowUpRight size={16} />
          </NavLink>
        </div>
      </div>
    </main>
  );
};

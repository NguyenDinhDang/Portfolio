import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUp, Mail } from 'lucide-react';


export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg-secondary)',
        paddingBlock: '4.5rem 2.5rem',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand Col */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                marginBottom: '1rem',
              }}
            >
              ĐẶNG ĐÌNH NGUYỄN<span style={{ color: 'var(--accent)' }}>.</span>
            </div>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.6,
                maxWidth: '35ch',
              }}
            >
              Software & AI Engineer specializing in high-performance Backend,
              Distributed Architectures, and Context-Aware RAG Systems.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--accent)',
                marginBottom: '1.25rem',
              }}
            >
              Navigation
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {[
                { to: '/', label: 'Overview' },
                { to: '/about', label: 'About & Philosophy' },
                { to: '/work', label: 'Selected Case Studies' },
                { to: '/experience', label: 'Career Timeline' },
                { to: '/contact', label: 'Start a Project' },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--text-sm)',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Social & Connect */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--accent)',
                marginBottom: '1.25rem',
              }}
            >
              Connect
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <a
                href="https://github.com/NguyenDinhDang"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--text-sm)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                <span>GitHub (NguyenDinhDang)</span>
              </a>
              <a
                href="mailto:banhvannguyen45@gmail.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--text-sm)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Mail size={16} />
                <span>banhvannguyen45@gmail.com</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--text-sm)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span>LinkedIn</span>
              </a>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
            }}
          >
            © {new Date().getFullYear()} ĐẶNG ĐÌNH NGUYỄN. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-secondary)',
              padding: '0.5rem 0.875rem',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

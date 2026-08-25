import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, Copy, ArrowUpRight } from 'lucide-react';
import { RevealSection } from '../components/motion/RevealSection';
import { itemFadeUpVariants } from '../components/motion/motionVariants';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'banhvannguyen45@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <RevealSection watermarkText="CONNECT">
          <div style={{ maxWidth: '840px', marginBottom: '5rem' }}>
            <motion.div variants={itemFadeUpVariants} className="eyebrow">
              [ 01 . INITIATE ]
            </motion.div>
            <motion.h1 variants={itemFadeUpVariants} className="display-title" style={{ marginBottom: '2rem' }}>
              HAVE A PROBLEM WORTH <span style={{ color: 'var(--accent)' }}>BUILDING</span>?
            </motion.h1>
            <motion.p variants={itemFadeUpVariants} className="text-lead">
              Whether you need a high-scale backend microservice, an AI/RAG knowledge assistant,
              or a dedicated engineer who writes clean, intentional code — let's connect.
            </motion.p>
          </div>
        </RevealSection>

        {/* Contact Methods Grid */}
        <RevealSection watermarkText="CHANNELS">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              marginBottom: '4rem',
            }}
          >
            {/* Direct Email Card */}
            <motion.div
              variants={itemFadeUpVariants}
              whileHover={{ y: -3 }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-accent)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4), 0 0 20px var(--accent-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  <Mail size={16} />
                  <span>Primary Channel</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                  Direct Email
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Feel free to send project briefs, technical queries, or collaboration opportunities directly.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ flexGrow: 1 }}>
                  <a
                    href={`mailto:${email}`}
                    className="btn btn-primary"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  >
                    <span>Compose Email</span>
                    <ArrowUpRight size={14} />
                  </a>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button
                    onClick={copyEmail}
                    className="btn btn-outline"
                    style={{ minWidth: '120px' }}
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check size={14} color="#22c55e" />
                        <span style={{ color: '#22c55e' }}>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Social Profiles Card */}
            <motion.div
              variants={itemFadeUpVariants}
              whileHover={{ y: -3 }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  <span>Code & Networks</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                  Developer Profiles
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Review open-source code contributions, system repositories, and professional updates.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <a
                    href="https://github.com/NguyenDinhDang"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                    style={{ justifyContent: 'space-between', width: '100%', boxSizing: 'border-box' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                      </svg>
                      <span>GitHub (@NguyenDinhDang)</span>
                    </div>
                    <ArrowUpRight size={14} />
                  </a>
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                    style={{ justifyContent: 'space-between', width: '100%', boxSizing: 'border-box' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                      <span>LinkedIn Profile</span>
                    </div>
                    <ArrowUpRight size={14} />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </RevealSection>

        {/* Response Commitment Box */}
        <div
          style={{
            padding: '2rem',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ color: '#22c55e' }}>●</span>
          <span>LOCATION: VIETNAM (UTC+7) // TYPICAL RESPONSE TIME: WITHIN 24 HOURS</span>
        </div>
      </div>
    </main>
  );
};

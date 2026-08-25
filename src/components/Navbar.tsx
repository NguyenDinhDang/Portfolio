import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Tổng quan' },
  { to: '/about', label: 'Giới thiệu' },
  { to: '/work', label: 'Dự án' },
  { to: '/experience', label: 'Kinh nghiệm' },
  { to: '/contact', label: 'Liên hệ' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all var(--transition-normal)',
        backgroundColor: scrolled ? 'rgba(9, 9, 11, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        paddingBlock: scrolled ? '0.875rem' : '1.5rem',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Monogram Brand Logo */}
        <NavLink
          to="/"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          NGUYEN<span style={{ color: 'var(--accent)' }}>.</span>
        </NavLink>

        {/* Desktop Navigation Links with Animated Underline */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2.5rem',
          }}
          className="desktop-nav"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onMouseEnter={() => setHoveredNav(item.to)}
              onMouseLeave={() => setHoveredNav(null)}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                position: 'relative',
                paddingBlock: '0.25rem',
                transition: 'color var(--transition-fast)',
              })}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavDot"
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent)',
                        display: 'inline-block',
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span>{item.label}</span>

                  {/* Hover Underline Glow */}
                  {hoveredNav === item.to && !isActive && (
                    <motion.span
                      layoutId="hoverNavUnderline"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        backgroundColor: 'var(--text-muted)',
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Status Badge & CTA with Framer Motion hover/tap */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.25rem',
          }}
          className="desktop-cta"
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-secondary)',
              padding: '0.35rem 0.75rem',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-secondary)',
              letterSpacing: '0.06em',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
              }}
            />
            <span>SẴN SÀNG HỢP TÁC</span>
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <NavLink
              to="/contact"
              className="btn btn-primary"
              style={{
                padding: '0.5rem 1rem',
                fontSize: 'var(--text-xs)',
                boxShadow: '0 0 15px rgba(255, 51, 68, 0.25)',
              }}
            >
              <span>Kết Nối Ngay</span>
              <ArrowUpRight size={14} />
            </NavLink>
          </motion.div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            padding: '0.5rem',
          }}
          className="mobile-toggle"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: '60px 0 0 0',
            height: 'calc(100vh - 60px)',
            backgroundColor: 'var(--bg-primary)',
            padding: '2rem var(--container-pad)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMobile}
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '1rem',
                })}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={18} />
              </NavLink>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <NavLink
              to="/contact"
              onClick={closeMobile}
              className="btn btn-primary"
              style={{ width: '100%', boxSizing: 'border-box' }}
            >
              <span>Kết Nối Ngay</span>
              <ArrowUpRight size={16} />
            </NavLink>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
};

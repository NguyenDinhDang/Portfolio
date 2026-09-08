import React from 'react';
import { socialLinks } from '../data/socialLinks';
import { ThemeToggle } from './ThemeToggle';
import type { Theme } from '../hooks/useTheme';

interface FooterProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, onToggleTheme }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer border-t border-portfolio-border py-[var(--gutter-x-large)]">
      <div className="container">
        <div className="footer-content flex items-center justify-between max-875:flex-col-reverse max-875:gap-[var(--gutter-small)]">
          {/* Social Navigation */}
          <nav aria-label="Liên kết mạng xã hội">
            <ol className="footer-links flex items-center gap-[var(--gutter-small)] max-1040:gap-[var(--gutter-micro)] list-none p-0 m-0">
              {socialLinks.map((item) => (
                <li key={item.id} className="footer-link">
                  <a
                    title={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener"
                    className="inline-block opacity-[0.875] hover:opacity-100 transition-opacity duration-[225ms]"
                  >
                    <img
                      src={item.iconSrc}
                      alt={item.title}
                      loading="lazy"
                      className="w-8 h-8 dark:invert"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Copyright text */}
          <p className="footer-text text-[var(--text-small)] text-body max-875:text-center m-0">
            &copy; <span>{currentYear}</span> - Template designed & developed by{' '}
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/nguyendinhdang"
              className="text-sub font-medium hover:underline"
            >
              Đặng Đình Nguyên.
            </a>
          </p>

          {/* Theme Toggle switch */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </footer>
  );
};

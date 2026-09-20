import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer border-t border-portfolio-border py-[var(--gutter-x-large)]">
      <div className="container">
        <div className="footer-content flex items-center justify-center">
          {/* Copyright text */}
          <p className="footer-text text-[var(--text-small)] text-body text-center m-0">
            &copy; <span>{currentYear}</span> - Template designed &amp; developed by{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/nguyendinhdang"
              className="text-sub font-medium hover:underline"
            >
              Đặng Đình Nguyên.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

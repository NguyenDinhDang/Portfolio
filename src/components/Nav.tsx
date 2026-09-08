import React, { useRef } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface NavProps {
  isOpen: boolean;
  onClose: () => void;
  toggleBtnRef: React.RefObject<HTMLButtonElement | null>;
}

export const Nav: React.FC<NavProps> = ({ isOpen, onClose, toggleBtnRef }) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useFocusTrap({
    isOpen,
    onClose,
    toggleBtnRef,
    containerRef,
  });

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <nav
      ref={containerRef}
      aria-label="Điều hướng chính"
      className={`fixed top-0 left-0 w-full min-h-screen z-[3] transition-all duration-[450ms] ${
        isOpen
          ? 'opacity-100 visible translate-x-0'
          : 'opacity-0 invisible -translate-x-full pointer-events-none'
      }`}
      style={{
        backgroundColor: '#ff5e99',
        backgroundImage: 'var(--gradient-brand)',
        transitionTimingFunction: 'var(--easing)',
      }}
    >
      <ol className="absolute top-1/2 left-[15%] -translate-y-1/2 -translate-x-[15%] list-none m-0 p-0">
        <li className="mb-[var(--gutter-x-small)]">
          <a
            href="#"
            onClick={handleLinkClick}
            className="nav-link text-white text-[var(--h2)] font-black no-underline inline-block relative font-stretch-125"
          >
            Home
          </a>
        </li>
        <li className="mb-[var(--gutter-x-small)]">
          <a
            href="#work"
            onClick={handleLinkClick}
            className="nav-link text-white text-[var(--h2)] font-black no-underline inline-block relative font-stretch-125"
          >
            My Work
          </a>
        </li>
        <li className="mb-[var(--gutter-x-small)]">
          <a
            href="#blog"
            onClick={handleLinkClick}
            className="nav-link text-white text-[var(--h2)] font-black no-underline inline-block relative font-stretch-125"
          >
            See Blog
          </a>
        </li>
        <li className="mb-[var(--gutter-x-small)]">
          <a
            href="#skills"
            onClick={handleLinkClick}
            className="nav-link text-white text-[var(--h2)] font-black no-underline inline-block relative font-stretch-125"
          >
            My Skills
          </a>
        </li>
        <li>
          <a
            href="#contact"
            data-focused="last-focused"
            onClick={handleLinkClick}
            className="nav-link text-white text-[var(--h2)] font-black no-underline inline-block relative font-stretch-125"
          >
            Contact
          </a>
        </li>
      </ol>
    </nav>
  );
};

import React, { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import type { Theme } from '../hooks/useTheme';

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'My Work', href: '#work' },
  { label: 'Blog', href: '#blog' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  avatarUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  avatarUrl = '/assets/images/avatar.jpg',
}) => {
  const [avatarSrc, setAvatarSrc] = useState<string>(avatarUrl);
  const [activeLink, setActiveLink] = useState<string>('#');

  useEffect(() => {
    setAvatarSrc(avatarUrl);
  }, [avatarUrl]);

  return (
    <header className="header-hero-bg min-h-[calc(100vh+var(--radius))] relative w-full flex items-center pb-[var(--radius)] pt-24 lg:pt-20">
      {/* ── Fixed top-bar: logo/name left, nav center, theme right ── */}
      <div className="fixed w-full top-0 left-0 z-[4] pointer-events-none">
        <div
          className="mx-auto flex items-center justify-between px-6 py-3 pointer-events-auto"
          style={{ maxWidth: 'var(--site-max-width)' }}
        >
          {/* Left: monogram */}
          <a
            href="#"
            className="flex-shrink-0 w-10 h-10 rounded-full bg-important text-bg flex items-center justify-center font-black text-sm select-none"
            style={{ color: 'var(--bg-color-primary)', backgroundColor: 'var(--important)' }}
            aria-label="Trang chủ"
          >
            ĐN
          </a>

          {/* Center: pill nav */}
          {/* Đạo hữu xin nương tay! Trận pháp Glassmorphism + backdrop-blur này đang cộng hưởng với biến thể sáng/tối, chớ tùy tiện thay màu kẻo âm dương lộn nhào! */}
          <nav
            aria-label="Điều hướng chính"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 shadow-lg"
            style={{
              background: theme === 'dark'
                ? 'rgba(22, 18, 17, 0.72)'
                : 'rgba(255, 255, 255, 0.72)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 no-underline ${
                    isActive
                      ? 'bg-important text-bg'
                      : 'text-sub hover:text-important hover:bg-white/10'
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: 'var(--important)',
                          color: 'var(--bg-color-primary)',
                        }
                      : {}
                  }
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right: theme toggle */}
          <div className="flex-shrink-0">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </div>

      {/* ── Hero content ── */}
      <div className="container relative z-[1] w-full py-10 lg:py-0">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-10 xl:gap-16">
          {/* Cột giới thiệu bản thân */}
          <div className="flex-1 max-w-[720px] text-left max-400:text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-dark bg-bg-secondary/70 backdrop-blur-md text-sub text-sm sm:text-base font-semibold mb-5 shadow-sm max-400:mx-auto">
              <span></span>
              <span>Chào bạn, tôi là</span>
            </div>

            <h1 className="mb-5" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.35rem] font-black text-important drop-shadow-sm" style={{ wordSpacing: '0.12em' }}>
                ĐẶNG ĐÌNH&nbsp;NGUYÊN
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-sub font-bold mt-3 sm:mt-4">
                Backend Developer
              </span>
            </h1>

            <p className="text-[var(--text-large)] font-normal text-body max-w-[745px] max-1200:max-w-[685px] max-845:max-w-[585px] mt-[var(--gutter-micro)] mb-[var(--gutter-medium)] leading-relaxed">
              Tôi là một sinh viên tại đại học Trà Vinh, tôi đam mê lập trình và phát triển các ứng dụng web. Tôi luôn tìm kiếm cơ hội để học hỏi và phát triển kỹ năng của mình trong lĩnh vực công nghệ thông tin.
            </p>

            <div className="inline-flex gap-[var(--gutter-x-small)] max-400:flex-col max-400:w-4/5">
              <a href="#contact" className="btn btn-cta">
                Thuê tôi
              </a>
              <a href="#work" className="btn btn-secondary">
                Xem công việc của tôi
              </a>
            </div>
          </div>

          {/* Cột hiển thị ảnh đại diện */}
          <div className="flex-shrink-0 relative flex items-center justify-center">
            {/* Vầng sáng hào quang aura */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-tr from-brand-pink/30 via-purple-500/20 to-teal-400/20 blur-2xl opacity-70 pointer-events-none" />

            <div className="relative group rounded-3xl sm:rounded-[2.5rem] p-2 sm:p-2.5 bg-gradient-to-b from-white/20 to-white/5 dark:from-white/10 dark:to-white/0 backdrop-blur-xl border border-border-dark shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-2xl sm:rounded-[2rem] overflow-hidden bg-bg-secondary border border-border-dark flex items-center justify-center">
                <img
                  src={avatarSrc}
                  alt="Đặng Đình Nguyên - Backend Developer"
                  onError={() => setAvatarSrc('/assets/images/thumbnail.png')}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Huy hiệu trạng thái làm việc */}
              <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-secondary/95 backdrop-blur-md border border-border-dark shadow-lg whitespace-nowrap text-xs sm:text-sm font-semibold text-important">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Sẵn sàng nhận việc</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

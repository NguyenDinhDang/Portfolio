import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import type { Theme } from '../hooks/useTheme';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'work', label: 'My Work', href: '#work' },
  { id: 'blog', label: 'Blog', href: '#blog' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' },
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
  const [activeId, setActiveId] = useState<string>('home');
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });
  const [isReady, setIsReady] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const isManualScrollingRef = useRef(false);
  const manualScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const visibleRatiosRef = useRef<Map<string, number>>(new Map());

  // Đạo hữu xin nương tay! Trận pháp "Lăng Ba Vi Bộ" (Sliding Indicator + IntersectionObserver RAF) này đang phong ấn thần thức định vị viewport, chớ dại mà nghịch threshold hay cubic-bezier kẻo thân pháp giật cục, tẩu hỏa nhập ma!
  const updateIndicator = useCallback((targetId?: string) => {
    const idToMeasure = targetId || activeId;
    const navEl = navRef.current;
    const activeEl = itemRefs.current[idToMeasure];

    if (!navEl || !activeEl) return;

    const navRect = navEl.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    setIndicatorStyle({
      left: activeRect.left - navRect.left,
      width: activeRect.width,
    });
    setIsReady(true);
  }, [activeId]);

  useEffect(() => {
    setAvatarSrc(avatarUrl);
  }, [avatarUrl]);

  // Cập nhật vị trí indicator khi activeId thay đổi
  useEffect(() => {
    updateIndicator(activeId);
  }, [activeId, updateIndicator]);

  // Tái tính toán vị trí khi resize window, font load xong hoặc layout nav thay đổi
  useEffect(() => {
    const handleRecalculate = () => {
      requestAnimationFrame(() => updateIndicator());
    };

    window.addEventListener('resize', handleRecalculate, { passive: true });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(handleRecalculate);
    }

    let resizeObserver: ResizeObserver | null = null;
    if (navRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleRecalculate);
      resizeObserver.observe(navRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleRecalculate);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [updateIndicator]);

  // IntersectionObserver phát hiện section đang chiếm phần lớn viewport
  useEffect(() => {
    const initialHash = window.location.hash.replace('#', '');
    const matchedInitial = NAV_ITEMS.find((item) => item.id === initialHash);
    if (matchedInitial) {
      setActiveId(matchedInitial.id);
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (!id) return;

        const viewportHeight = window.innerHeight || 1;
        const visibleHeight = Math.max(
          0,
          Math.min(entry.boundingClientRect.bottom, viewportHeight) -
            Math.max(entry.boundingClientRect.top, 0)
        );
        const viewportFraction = visibleHeight / viewportHeight;
        const score = Math.max(entry.intersectionRatio, viewportFraction);

        visibleRatiosRef.current.set(id, entry.isIntersecting ? score : 0);
      });

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        if (isManualScrollingRef.current) return;

        if (window.scrollY < 80) {
          setActiveId('home');
          return;
        }

        const isBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 50;
        if (isBottom) {
          setActiveId('contact');
          return;
        }

        let bestId = '';
        let highestScore = 0;

        NAV_ITEMS.forEach((item) => {
          const score = visibleRatiosRef.current.get(item.id) || 0;
          if (score > highestScore) {
            highestScore = score;
            bestId = item.id;
          }
        });

        if (bestId && highestScore >= 0.35) {
          setActiveId(bestId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0],
    });

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    e.preventDefault();

    setActiveId(item.id);
    updateIndicator(item.id);

    isManualScrollingRef.current = true;
    if (manualScrollTimeoutRef.current) {
      clearTimeout(manualScrollTimeoutRef.current);
    }
    manualScrollTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 900);

    if (item.id === 'home' || item.href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        history.pushState(null, '', ' ');
      }
      return;
    }

    const sectionEl = document.getElementById(item.id);
    if (!sectionEl) return;

    // Cuộn chính xác tới tiêu đề/header (h2) của section, cách top một khoảng vừa vặn dưới floating navbar
    const headingEl = sectionEl.querySelector('h2') || sectionEl;
    const navOffset = 85;
    const targetY = headingEl.getBoundingClientRect().top + window.scrollY - navOffset;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth',
    });

    history.pushState(null, '', item.href);
  };

  return (
    <header id="home" className="header-hero-bg min-h-[calc(100vh+var(--radius))] relative w-full flex items-center pb-[var(--radius)] pt-24 lg:pt-20">
      {/* ── Fixed top-bar: logo/name left, nav center, theme right ── */}
      <div className="fixed w-full top-0 left-0 z-[4] pointer-events-none">
        <div
          className="mx-auto flex items-center justify-between px-6 py-3 pointer-events-auto relative"
          style={{ maxWidth: 'var(--site-max-width)' }}
        >
          {/* Left: monogram */}
          <a
            href="#"
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm select-none"
            style={{ color: 'var(--bg-color-primary)', backgroundColor: 'var(--important)' }}
            aria-label="Trang chủ"
          >
            ĐN
          </a>

          {/* Center: pill nav with sliding indicator */}
          <nav
            ref={navRef}
            aria-label="Điều hướng chính"
            className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 px-2.5 py-1.5 rounded-full border border-white/10 shadow-lg"
            style={{
              background:
                theme === 'dark'
                  ? 'rgba(22, 18, 17, 0.72)'
                  : 'rgba(255, 255, 255, 0.72)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
            }}
          >
            {/* Sliding Pill Indicator */}
            <div
              className="absolute inset-y-1.5 left-0 rounded-full pointer-events-none z-0"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                backgroundColor: 'var(--important)',
                opacity: isReady && indicatorStyle.width > 0 ? 1 : 0,
                transition: isReady
                  ? 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1), width 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 250ms ease'
                  : 'opacity 250ms ease',
                willChange: 'transform, width',
              }}
              aria-hidden="true"
            />

            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[item.id] = el;
                  }}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="relative z-10 px-3.5 py-1.5 rounded-full text-sm font-semibold no-underline select-none"
                  style={{
                    color: isActive ? 'var(--bg-color-primary)' : 'var(--sub)',
                    transition: 'color 400ms ease',
                  }}
                >
                  {item.label}
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


            <h1 className="mb-5 whitespace-nowrap" style={{ lineHeight: 1.08, letterSpacing: '-0.03em' }}>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black text-important drop-shadow-sm">
                ĐẶNG ĐÌNH NGUYÊN
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl text-sub font-bold mt-2 sm:mt-3">
                Backend Developer
              </span>
            </h1>

            <p className="text-[var(--text-large)] font-normal text-body max-w-[745px] max-1200:max-w-[685px] max-845:max-w-[585px] mt-[var(--gutter-micro)] mb-[var(--gutter-medium)] leading-relaxed">
              Tôi là một sinh viên tại đại học Trà Vinh, tôi đam mê lập trình và phát triển các ứng dụng web. Tôi luôn tìm kiếm cơ hội để học hỏi và phát triển kỹ năng của mình trong lĩnh vực công nghệ thông tin.
            </p>

            <div className="inline-flex gap-[var(--gutter-x-small)] max-400:flex-col max-400:w-4/5">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('contact');
                  if (el) {
                    const heading = el.querySelector('h2') || el;
                    window.scrollTo({
                      top: Math.max(0, heading.getBoundingClientRect().top + window.scrollY - 85),
                      behavior: 'smooth',
                    });
                  }
                }}
                className="btn btn-cta"
              >
                Thuê tôi
              </a>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('work');
                  if (el) {
                    const heading = el.querySelector('h2') || el;
                    window.scrollTo({
                      top: Math.max(0, heading.getBoundingClientRect().top + window.scrollY - 85),
                      behavior: 'smooth',
                    });
                  }
                }}
                className="btn btn-secondary"
              >
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

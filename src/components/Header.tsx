import React, { useEffect, useState } from 'react';

interface HeaderProps {
  isNavOpen: boolean;
  onToggleNav: () => void;
  menuBtnRef: React.RefObject<HTMLButtonElement | null>;
}

export const Header: React.FC<HeaderProps> = ({ isNavOpen, onToggleNav, menuBtnRef }) => {
  const [btnText, setBtnText] = useState<'menu' | 'close'>('menu');

  useEffect(() => {
    // Đạo hữu xin nương tay! Bí thuật Ẩn Thân 475ms (menu delay) này đang kết nối đồng bộ cùng hư không thuấn di, chớ tự ý sửa đổi kẻo linh thức và thể xác bất đồng bộ!
    if (isNavOpen) {
      document.body.classList.add('lock-screen');
      const timer = setTimeout(() => {
        setBtnText('close');
      }, 475);
      return () => clearTimeout(timer);
    } else {
      document.body.classList.remove('lock-screen');
      setBtnText('menu');
    }
  }, [isNavOpen]);

  return (
    <header className="header-hero-bg min-h-[calc(100vh+var(--radius))] relative w-full">
      {/* Menu button container */}
      <div className="fixed w-full top-[var(--gutter-x-small)] left-0 z-[4] pointer-events-none">
        <div className="container pointer-events-auto">
          <button
            ref={menuBtnRef}
            type="button"
            onClick={onToggleNav}
            aria-label={isNavOpen ? 'Đóng điều hướng' : 'Mở điều hướng'}
            className="menu-btn ml-auto block border border-border-dark w-[132px] py-[var(--gutter-nano)] rounded-[var(--gutter-large)] bg-bg-secondary text-important font-black text-center cursor-pointer transition-colors duration-200 uppercase tracking-wider"
          >
            {btnText}
          </button>
        </div>
      </div>

      <div className="container h-full">
        <div className="absolute top-1/2 -translate-y-1/2 max-w-[745px] max-400:left-0 max-400:text-center max-400:px-[0.6rem]">
          <h1 className="text-[var(--h1)] font-black leading-[1.2] text-important font-stretch-125 mb-4">
            <span className="block">Chào tôi là Đặng Đình Nguyên</span>
            <span className="block text-sub font-semibold">Backend Developer</span>
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
      </div>
    </header>
  );
};

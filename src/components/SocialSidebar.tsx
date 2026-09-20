import React from 'react';
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaCodepen,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';

// ═══════════════════════════════════════════════════════════════
//  Đạo hữu xin nương tay — data này đang vận hành ổn định,
//  chớ tùy tiện thêm/bớt mà không cập nhật cả Footer lẫn
//  aria-label, kẻo tẩu hỏa nhập ma với accessibility audit!
// ═══════════════════════════════════════════════════════════════
export interface SocialItem {
  id: string;
  name: string;
  url: string;
  /** react-icons IconType component */
  Icon: IconType;
  ariaLabel: string;
}

export const defaultSocialItems: SocialItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/nguyendinhdang',
    Icon: FaGithub,
    ariaLabel: 'Trang GitHub của Đặng Đình Nguyên',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/syed-mohisn-raza-393177262/',
    Icon: FaLinkedinIn,
    ariaLabel: 'Trang LinkedIn của Đặng Đình Nguyên',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    url: 'https://twitter.com/',
    Icon: FaTwitter,
    ariaLabel: 'Trang Twitter của Đặng Đình Nguyên',
  },
  {
    id: 'codepen',
    name: 'CodePen',
    url: 'https://codepen.io/',
    Icon: FaCodepen,
    ariaLabel: 'Trang CodePen của Đặng Đình Nguyên',
  },
];

interface SocialSidebarProps {
  items?: SocialItem[];
}

export const SocialSidebar: React.FC<SocialSidebarProps> = ({
  items = defaultSocialItems,
}) => {
  return (
    <>
      {/* ── Thanh dọc fixed bên phải — chỉ hiện từ md trở lên ── */}
      <aside
        aria-label="Liên kết mạng xã hội"
        className={[
          // Vị trí cố định, căn giữa dọc
          'fixed right-4 top-1/2 -translate-y-1/2 z-40',
          // Layout cột
          'hidden md:flex flex-col items-center gap-3',
        ].join(' ')}
      >
        {items.map(({ id, name, url, Icon, ariaLabel }) => (
          <a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            title={name}
            className={[
              // Hình dạng & kích thước
              'group flex items-center justify-center w-10 h-10 rounded-xl',
              // Màu nền & border theo theme
              'bg-bg-secondary border border-portfolio-border',
              // Màu icon
              'text-body',
              // Hiệu ứng hover
              'hover:bg-important hover:text-bg-primary hover:border-transparent',
              'hover:scale-110 hover:shadow-lg',
              // Transition mượt
              'transition-all duration-200 ease-out',
              // Dark mode hỗ trợ qua class parent (Tailwind darkMode: "class")
              'dark:bg-bg-secondary dark:border-border-dark dark:text-body',
              'dark:hover:bg-important dark:hover:text-bg-primary',
            ].join(' ')}
          >
            <Icon
              size={18}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:scale-110"
            />
          </a>
        ))}

        {/* Đường kẻ trang trí phía dưới */}
        <span
          aria-hidden="true"
          className="mt-1 w-px h-16 bg-gradient-to-b from-portfolio-border to-transparent"
        />
      </aside>

      {/* ── Thanh ngang ở footer — chỉ hiện trên mobile (< md) ── */}
      <nav
        aria-label="Liên kết mạng xã hội (mobile)"
        className="flex md:hidden items-center justify-center gap-4 py-4"
      >
        {items.map(({ id, name, url, Icon, ariaLabel }) => (
          <a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            title={name}
            className={[
              'group flex items-center justify-center w-10 h-10 rounded-xl',
              'bg-bg-secondary border border-portfolio-border text-body',
              'hover:bg-important hover:text-bg-primary hover:border-transparent',
              'hover:scale-110',
              'transition-all duration-200 ease-out',
              'dark:border-border-dark',
            ].join(' ')}
          >
            <Icon size={18} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </>
  );
};

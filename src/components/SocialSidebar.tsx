import React, { useState, useEffect, useCallback } from 'react';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { IoClose } from 'react-icons/io5';
import type { IconType } from 'react-icons';

// ═══════════════════════════════════════════════════════════════
//  Đạo hữu xin nương tay — data này đang vận hành ổn định,
//  chớ tùy tiện thêm/bớt mà không cập nhật aria-label,
//  kẻo tẩu hỏa nhập ma với accessibility audit!
// ═══════════════════════════════════════════════════════════════
export interface SocialItem {
  id: string;
  name: string;
  url: string;
  /** react-icons IconType component */
  Icon: IconType;
  ariaLabel: string;
  /** Nếu có, click sẽ hiện QR popup thay vì mở link */
  qrSrc?: string;
  qrAlt?: string;
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
    url: 'https://www.linkedin.com/in/dangdinhnguyen07',
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
    id: 'zalo',
    name: 'Zalo',
    url: '#',
    Icon: SiZalo,
    ariaLabel: 'Quét QR Zalo để nhắn tin với Đặng Đình Nguyên',
    qrSrc: '/assets/images/social-links/zaloQR.jpg',
    qrAlt: 'Mã QR Zalo của Đặng Đình Nguyên',
  },
];

// ── Zalo QR Modal ───────────────────────────────────────────────
interface ZaloQRModalProps {
  isOpen: boolean;
  qrSrc: string;
  qrAlt: string;
  onClose: () => void;
}

const ZaloQRModal: React.FC<ZaloQRModalProps> = ({ isOpen, qrSrc, qrAlt, onClose }) => {
  // Đóng modal khi nhấn Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mã QR Zalo"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Overlay mờ */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card QR */}
      <div
        className={[
          'relative z-10 flex flex-col items-center gap-4',
          'bg-bg-secondary border border-border-dark rounded-2xl',
          'p-6 shadow-2xl w-72',
          'animate-[slide-up_0.25s_cubic-bezier(0.16,1,0.3,1)_both]',
        ].join(' ')}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          aria-label="Đóng popup QR Zalo"
          className={[
            'absolute top-3 right-3',
            'flex items-center justify-center w-7 h-7 rounded-lg',
            'text-body hover:text-important hover:bg-bg-primary',
            'transition-all duration-150',
          ].join(' ')}
        >
          <IoClose size={18} aria-hidden="true" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2">
          <SiZalo size={22} className="text-[#0068ff]" aria-hidden="true" />
          <span className="text-important font-semibold text-sm tracking-wide">
            Quét QR để nhắn tin Zalo
          </span>
        </div>

        {/* QR Image */}
        <div className="rounded-xl overflow-hidden border border-portfolio-border bg-white p-2">
          <img
            src={qrSrc}
            alt={qrAlt}
            className="w-52 h-52 object-contain"
            draggable={false}
          />
        </div>

        <p className="text-body text-xs text-center leading-relaxed">
          Mở Zalo → Quét mã QR → Nhắn tin ngay
        </p>
      </div>
    </div>
  );
};

// ── Icon button dùng chung ───────────────────────────────────────
const btnClass = [
  'group flex items-center justify-center w-10 h-10 rounded-xl',
  'bg-bg-secondary border border-portfolio-border text-body',
  'hover:bg-important hover:text-bg-primary hover:border-transparent',
  'hover:scale-110 hover:shadow-lg',
  'transition-all duration-200 ease-out',
  'dark:bg-bg-secondary dark:border-border-dark dark:text-body',
  'dark:hover:bg-important dark:hover:text-bg-primary',
].join(' ');

// ── Main component ───────────────────────────────────────────────
interface SocialSidebarProps {
  items?: SocialItem[];
}

export const SocialSidebar: React.FC<SocialSidebarProps> = ({
  items = defaultSocialItems,
}) => {
  const [zaloOpen, setZaloOpen] = useState(false);

  const handleItemClick = useCallback(
    (item: SocialItem, e: React.MouseEvent) => {
      if (item.qrSrc) {
        e.preventDefault();
        setZaloOpen(true);
      }
    },
    [],
  );

  // Tìm item Zalo để lấy thông tin QR
  const zaloItem = items.find((i) => i.qrSrc);

  return (
    <>
      {/* ── Thanh dọc fixed bên phải — chỉ hiện từ md trở lên ── */}
      <aside
        aria-label="Liên kết mạng xã hội"
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3"
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={item.qrSrc ? '#' : item.url}
            target={item.qrSrc ? undefined : '_blank'}
            rel={item.qrSrc ? undefined : 'noopener noreferrer'}
            aria-label={item.ariaLabel}
            title={item.name}
            onClick={(e) => handleItemClick(item, e)}
            className={btnClass}
          >
            <item.Icon
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
        {items.map((item) => (
          <a
            key={item.id}
            href={item.qrSrc ? '#' : item.url}
            target={item.qrSrc ? undefined : '_blank'}
            rel={item.qrSrc ? undefined : 'noopener noreferrer'}
            aria-label={item.ariaLabel}
            title={item.name}
            onClick={(e) => handleItemClick(item, e)}
            className={btnClass}
          >
            <item.Icon size={18} aria-hidden="true" />
          </a>
        ))}
      </nav>

      {/* ── Zalo QR Popup ── */}
      {zaloItem?.qrSrc && (
        <ZaloQRModal
          isOpen={zaloOpen}
          qrSrc={zaloItem.qrSrc}
          qrAlt={zaloItem.qrAlt ?? 'Mã QR Zalo'}
          onClose={() => setZaloOpen(false)}
        />
      )}
    </>
  );
};

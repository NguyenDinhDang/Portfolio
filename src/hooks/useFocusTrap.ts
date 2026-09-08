import { useEffect, type RefObject } from 'react';

interface UseFocusTrapOptions {
  isOpen: boolean;
  onClose: () => void;
  toggleBtnRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLElement | null>;
}

export function useFocusTrap({
  isOpen,
  onClose,
  toggleBtnRef,
  containerRef,
}: UseFocusTrapOptions) {
  useEffect(() => {
    if (!isOpen) return;

    // Đạo hữu xin nương tay! Tuyệt thế khốn trận (Focus Trap) này phong ấn thần thức của phím Tab và Escape, đang vận hành ổn định, chớ dại động vào kẻo linh hồn lạc lối giữa hư không!
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        toggleBtnRef.current?.focus();
        return;
      }

      if (e.key === 'Tab') {
        const lastEl = containerRef.current?.querySelector<HTMLElement>(
          '[data-focused="last-focused"]'
        );

        if (lastEl && document.activeElement === lastEl && !e.shiftKey) {
          e.preventDefault();
          toggleBtnRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, toggleBtnRef, containerRef]);
}

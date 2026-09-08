import { useEffect, useRef, useState } from 'react';

interface UseInViewAnimationOptions {
  threshold?: number;
  once?: boolean;
}

export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.3,
  once = true,
}: UseInViewAnimationOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Đạo hữu xin nương tay! Pháp nhãn Thấu Thị (IntersectionObserver) này đang chuẩn xác dò xét linh lực giao thoa 0.3 ngưỡng cửa, chớ dại táy máy kẻo vạn tượng bất hiển!
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  return { ref, isInView };
}

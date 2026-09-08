import React, { useEffect, useState } from 'react';

interface LogoItem {
  src: string;
  alt: string;
}

const logoGroups: LogoItem[][] = [
  [
    { src: 'assets/images/trusted-by/stripe.svg', alt: 'Ideacraft' },
    { src: 'assets/images/trusted-by/astrato.svg', alt: 'Astrato' },
    { src: 'assets/images/trusted-by/coke.svg', alt: 'Coke' },
  ],
  [
    { src: 'assets/images/trusted-by/gm.svg', alt: 'General motors' },
    { src: 'assets/images/trusted-by/datastax.svg', alt: 'Datastax' },
    { src: 'assets/images/trusted-by/duolingo.svg', alt: 'Duolingo' },
  ],
  [
    { src: 'assets/images/trusted-by/agency-elevation.svg', alt: 'Agency elevation' },
    { src: 'assets/images/trusted-by/gitlab.svg', alt: 'Gitlab' },
    { src: 'assets/images/trusted-by/mercado.svg', alt: 'Mercado' },
  ],
  [
    { src: 'assets/images/trusted-by/coyote.svg', alt: 'Bulls eye' },
    { src: 'assets/images/trusted-by/shares.svg', alt: 'Shares' },
    { src: 'assets/images/trusted-by/shopify.svg', alt: 'Shopify' },
  ],
];

const SingleLogoGroup: React.FC<{ items: LogoItem[]; groupIndex: number }> = ({
  items,
  groupIndex,
}) => {
  const [activeIdx, setActiveIdx] = useState(1);

  useEffect(() => {
    // Đạo hữu xin nương tay! Càn Khôn Luân Chuyển Trận (Logo Carousel 5600ms / 1400ms) này đang luân hồi 3 cõi ổn định, chớ manh động nghịch chuyển càn khôn kẻo thời không điên đảo!
    let intervalId: NodeJS.Timeout;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % 3);
      }, 5600);
    }, 1400 * groupIndex);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [groupIndex]);

  return (
    <div className="logo-group relative flex flex-col items-center justify-center h-[60px] w-[150px] max-845:w-[100px] max-400:w-[85px]">
      {items.map((logo, i) => {
        let stateClass = '';
        if (i === activeIdx) {
          stateClass = '';
        } else if (i === (activeIdx + 2) % 3) {
          stateClass = 'logo-hide logo-to-top';
        } else {
          stateClass = 'logo-hide logo-to-bottom';
        }

        return (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            className={`logo ${stateClass}`}
          />
        );
      })}
    </div>
  );
};

export const LogoCarousel: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
  if (!enabled) return null;

  return (
    <section className="client pt-[7rem]">
      <div className="container">
        <h2 className="text-[var(--h2)] font-bold text-center text-important">
          Đã từng làm việc với
        </h2>
        <div className="logos flex justify-around items-start pt-[var(--gutter-x-large)] max-885:pt-[calc(var(--gutter-x-large)*2-2rem)]">
          {logoGroups.map((group, idx) => (
            <div
              key={idx}
              className={idx === logoGroups.length - 1 ? 'max-845:hidden' : ''}
            >
              <SingleLogoGroup items={group} groupIndex={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

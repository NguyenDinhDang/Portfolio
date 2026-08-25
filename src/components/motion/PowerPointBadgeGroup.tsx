import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/**
 * Đạo hữu xin nương tay, trận pháp Huyễn Ảnh Lạc Thần này mô phỏng bí thuật
 * PowerPoint Xuất Hiện cực nhanh, từng tầng ngọc ấn tự động nảy bật (Spring Overshoot).
 * Chớ dại sửa đổi stiffness và damping kẻo pháp bảo bay loạn xạ, tẩu hỏa nhập ma!
 */

export interface PowerPointBadgeGroupProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  delay?: number;
  viewportAmount?: number;
}

export const PowerPointBadgeContainer: React.FC<PowerPointBadgeGroupProps> = ({
  children,
  className,
  style,
  stagger = 0.12,
  delay = 0.1,
  viewportAmount = 0.4,
}) => {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
    >
      {children}
    </motion.div>
  );
};

export interface PowerPointBadgeItemProps {
  children: React.ReactNode;
  index?: number;
  alternateHorizontal?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const PowerPointBadgeItem: React.FC<PowerPointBadgeItemProps> = ({
  children,
  index = 0,
  alternateHorizontal = false,
  className,
  style,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const reducedVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.3 },
      },
    };

    return (
      <motion.div className={className} style={style} variants={reducedVariants}>
        {children}
      </motion.div>
    );
  }

  // Alternating direction for horizontal rows if enabled
  const initialX = alternateHorizontal ? (index % 2 === 0 ? -20 : 20) : 0;
  const initialRotate = index % 2 === 0 ? -3 : 3;

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
      y: 20,
      x: initialX,
      rotate: initialRotate,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 18,
      },
    },
  };

  return (
    <motion.div className={className} style={style} variants={itemVariants}>
      {children}
    </motion.div>
  );
};

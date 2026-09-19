import type { TimelineItem } from '../types';

/**
 * ─────────────────────────────────────────────────────────────────
 *  HƯỚNG DẪN THÊM MỤC TIMELINE
 * ─────────────────────────────────────────────────────────────────
 *  Thêm object mới vào mảng bên dưới:
 *
 *  {
 *    id: 'unique-id',
 *    type: 'education',    // hoặc 'work'
 *    title: 'Tên trường / Công ty',
 *    role: 'Chuyên ngành / Chức vụ',
 *    period: '09/2022 – nay',
 *    location: 'Trà Vinh, Việt Nam',   // tuỳ chọn
 *    description: 'Mô tả ngắn về quá trình học / làm việc',
 *    tags: ['Java', 'Spring Boot'],    // tuỳ chọn
 *    current: true,                    // đánh dấu "hiện tại"
 *  }
 * ─────────────────────────────────────────────────────────────────
 */

export const timelineItems: TimelineItem[] = [
  // ── Học vấn ──────────────────────────────────────────────────
  {
    id: 'edu-tvu',
    type: 'education',
    title: 'Đại học Trà Vinh',
    role: 'Kỹ sư Công nghệ Thông tin',
    period: '09/2025 – nay',
    location: 'Trà Vinh, Việt Nam',
    description:
      'Học các môn nền tảng về lập trình, cơ sở dữ liệu, mạng máy tính và phát triển ứng dụng web. Tham gia các đồ án nhóm và thực hành với các công nghệ Backend hiện đại.',
    tags: ['HTML', 'CSS', 'JavaScript', 'SQL', 'React', 'Bootstrap', 'Tailwind CSS', 'Git'],
    current: true,
  },
  {
    id: 'edu-12',
    type: 'education',
    title: 'THPT Dương Quang Đông',
    role: 'Tốt nghiệp',
    period: '09/2022 – 06/2025',
    location: 'Trà Vinh, Việt Nam',
    description:
      'Học các môn nền tảng về lập trình, cơ sở dữ liệu, mạng máy tính và phát triển ứng dụng web. Tham gia các đồ án nhóm và thực hành với các công nghệ Backend hiện đại.',
    tags: ['Toán', 'Văn', 'Sử', 'Địa', 'Anh'],
    current: false,
  },

  // ── Kinh nghiệm ──────────────────────────────────────────────
  // 👇 Thêm kinh nghiệm làm việc của bạn vào đây
];

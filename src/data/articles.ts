import type { ArticleItem } from '../types';

/**
 * ─────────────────────────────────────────────────────────────────
 *  HƯỚNG DẪN THÊM BÀI VIẾT BLOG
 * ─────────────────────────────────────────────────────────────────
 *  1. Viết bài xong trên Notion → nhấn "Share" → bật "Share to web"
 *  2. Copy link notion.site (hoặc super.so nếu đã setup)
 *  3. Thêm object mới vào mảng bên dưới:
 *
 *  {
 *    id: 'ten-bai-viet-khong-dau',   // unique, không có dấu cách
 *    title: 'Tiêu đề bài viết',
 *    description: 'Mô tả ngắn 1-2 câu',
 *    url: 'https://your-notion-page-url-here',
 *    date: '2026-09-19',             // định dạng YYYY-MM-DD
 *    tags: ['Backend', 'Tips'],      // tuỳ chọn
 *    readTime: '5 phút đọc',         // tuỳ chọn
 *    imageSrc: 'assets/images/...',  // tuỳ chọn — thumbnail
 *    isFeatured: true,               // tuỳ chọn — hiển thị nổi bật
 *  }
 * ─────────────────────────────────────────────────────────────────
 */

export const articles: ArticleItem[] = [
  // 👇 Thêm bài viết của bạn vào đây
];

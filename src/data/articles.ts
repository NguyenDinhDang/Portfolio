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
  {
    id: 'article-one',
    title: 'Blog: Mưa nhà và mưa phố',
    description: 'Một góc nhìn về hai chiều cảm xúc giữa hai không gian đối lập.',
    url: 'https://ma-nh-v-ph.super.site/',
    date: new Date().toISOString().split('T')[0],
    tags: ['Tản văn', 'Chiêm nghiệm', 'Cuộc sống'],
    readTime: '5 phút đọc',
    imageSrc: 'assets/images/blog/nha_va_pho.jpg',
  },
  {
    id: 'article-two',
    title: 'Bài viết thứ hai của bạn sẽ ở đây',
    description: 'Đây là nơi bạn sẽ chia sẻ kiến thức, kinh nghiệm và góc nhìn của mình với cộng đồng. Hãy bắt đầu ngay nhé!',
    url: '#',
    date: new Date().toISOString().split('T')[0],
    tags: ['Giới thiệu'],
    readTime: '3 phút đọc',
    imageSrc: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'article-three',
    title: 'Bài viết thứ ba của bạn sẽ ở đây',
    description: 'Đây là nơi bạn sẽ chia sẻ kiến thức, kinh nghiệm và góc nhìn của mình với cộng đồng. Hãy bắt đầu ngay nhé!',
    url: '#',
    date: new Date().toISOString().split('T')[0],
    tags: ['Giới thiệu'],
    readTime: '3 phút đọc',
    imageSrc: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
  }
];
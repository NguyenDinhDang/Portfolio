import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { RevealSection } from '../components/motion/RevealSection';
import { itemFadeUpVariants } from '../components/motion/motionVariants';
import { PowerPointBadgeContainer, PowerPointBadgeItem } from '../components/motion/PowerPointBadgeGroup';
import { useAntiGravity } from '../hooks/useAntiGravity';
import { TechIcon } from '../components/ui/tech-icon';
import { Button } from '../components/ui/button';

interface LocalizedProject {
  slug: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  problem: string;
  approach: string;
  outcome: string;
}

const VIETNAMESE_PROJECTS: LocalizedProject[] = [
  {
    slug: 'learnos',
    number: '01',
    title: 'LearnOS',
    category: 'Nền tảng AI / RAG',
    tagline: 'Xử lý tri thức thông minh & Trợ lý học tập cá nhân hóa',
    description: 'Nền tảng xử lý tài liệu và học tập thông minh dựa trên AI, có khả năng đánh chỉ mục đa định dạng và tạo lộ trình học tập được kiểm chứng bằng đường ống truy xuất ngữ nghĩa (semantic retrieval).',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'React', 'Gemini API', 'Docker'],
    problem: 'Người học gặp khó khăn khi tài liệu bị phân mảnh rải rác trên nhiều định dạng (PDF, Markdown, Video) mà không có công cụ hỏi đáp ngữ cảnh chuyên sâu kèm trích dẫn nguồn xác thực.',
    approach: 'Xây dựng đường ống RAG dạng mô-đun với kỹ thuật phân đoạn ngữ nghĩa (Semantic Chunking), lưu trữ vector trong PostgreSQL qua pgvector và phát sinh dữ liệu bất đồng bộ.',
    outcome: 'Độ trễ truy vấn vector dưới 350ms trên hơn 15.000 đoạn tài liệu với trích dẫn chính xác.',
  },
  {
    slug: 'devflow',
    number: '02',
    title: 'DevFlow',
    category: 'Backend & Hệ thống phân tán',
    tagline: 'Động cơ giám sát luồng làm việc & viễn trắc dự án thời gian thực',
    description: 'Nền tảng quản lý dự án và đo kiểm viễn trắc thời gian thực dành cho các đội ngũ kỹ thuật, hỗ trợ đồng bộ trạng thái tức thì và phân tích tiến độ sprint tự động.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'WebSockets', 'Next.js', 'Docker'],
    problem: 'Các đội ngũ phát triển bị phân tán ngữ cảnh giữa theo dõi đầu việc (issue tracking), mã nguồn commit và các điểm nghẽn phát sinh theo thời gian thực.',
    approach: 'Thiết kế kiến trúc hướng sự kiện sử dụng Redis Pub/Sub để phát thanh qua WebSocket với độ trễ dưới mili-giây, kết hợp mẫu Transactional Outbox trên PostgreSQL để đảm bảo tính toàn vẹn dữ liệu.',
    outcome: 'Xử lý ổn định hơn 2.500 kết nối WebSocket đồng thời, 0% thất thoát tin nhắn, độ trễ phát dưới 15ms.',
  },
  {
    slug: 'neurovector',
    number: '03',
    title: 'NeuroVector RAG',
    category: 'AI / Tìm kiếm ngữ nghĩa',
    tagline: 'Dịch vụ truy xuất tài liệu doanh nghiệp & trích xuất ngữ cảnh',
    description: 'Vi dịch vụ chuyên biệt cho việc nạp tài liệu kỹ thuật, tạo vector nhúng đa chiều và cung cấp API tìm kiếm ngữ nghĩa tốc độ cao với tầng tái xếp hạng hỗn hợp (hybrid re-ranking).',
    technologies: ['Python', 'FastAPI', 'ChromaDB', 'FAISS', 'LangChain', 'OpenAI Embeddings', 'PostgreSQL'],
    problem: 'Tìm kiếm theo từ khóa truyền thống hoạt động kém hiệu quả trên tài liệu kỹ thuật phức tạp, nơi sự tương đồng về khái niệm, thuật ngữ và đoạn mã là tối quan trọng.',
    approach: 'Xây dựng đường ống truy xuất 2 giai đoạn kết hợp vector dense embedding và xếp hạng từ khóa thưa BM25 (Reciprocal Rank Fusion) để đảm bảo đồng thời độ bao phủ và độ chính xác.',
    outcome: 'Đạt 94.2% độ liên quan trong top-3 kết quả tìm kiếm với độ trễ xử lý trung bình dưới 45ms.',
  },
  {
    slug: 'portfolio-engine',
    number: '04',
    title: 'Anti-Gravity Portfolio',
    category: 'Kỹ nghệ Sáng tạo & Three.js',
    tagline: 'Trải nghiệm số chuẩn Production với React 19 + TypeScript + Vật lý',
    description: 'Một trải nghiệm kỹ thuật số chuẩn mực được xây dựng với giải thuật vật lý Euler bán ẩn bằng TypeScript thuần, không gian 3D Three.js mượt mà và không gây gián đoạn re-render trạng thái React.',
    technologies: ['React 19', 'TypeScript', 'Three.js', 'Vite', 'CSS Tokens', 'Custom Physics Engine'],
    problem: 'Hầu hết các trang portfolio cá nhân thường dùng template có sẵn hoặc bị giật khung hình do cấu trúc mã cồng kềnh.',
    approach: 'Triển khai vòng lặp vật lý imperative 60 FPS trực tiếp với requestAnimationFrame, ghi thẳng biến đổi DOM kết hợp compositing GPU.',
    outcome: 'Duy trì 60 FPS mượt mà trên cả desktop lẫn mobile, 0 layout shift (CLS = 0.0) và dung lượng nén dưới 180KB.',
  }
];

export const Work: React.FC = () => {
  useAntiGravity('.ag-target', {
    radius: 160,
    strength: 0.6,
    driftAmplitude: 3.5,
  });

  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <RevealSection watermarkText="DỰ ÁN">
          <div style={{ maxWidth: '840px', marginBottom: '5rem' }}>
            <motion.div variants={itemFadeUpVariants} className="eyebrow">
              [ 01 . DỰ ÁN TIÊU BIỂU ]
            </motion.div>
            <motion.h1 variants={itemFadeUpVariants} className="display-title" style={{ marginBottom: '2rem' }}>
              CASE STUDIES & <span style={{ color: 'var(--accent)' }}>KIẾN TRÚC</span> HỆ THỐNG.
            </motion.h1>
            <motion.p variants={itemFadeUpVariants} className="text-lead">
              Phân tích chuyên sâu về các vi dịch vụ backend thực tế, đường ống RAG thông minh và các hệ thống kỹ nghệ sáng tạo.
            </motion.p>
          </div>
        </RevealSection>

        {/* Project Case Studies List */}
        <RevealSection watermarkText="HỒ SƠ">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {VIETNAMESE_PROJECTS.map((project) => (
              <motion.article
                key={project.slug}
                variants={itemFadeUpVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: 'clamp(2rem, 4vw, 3.5rem)',
                  transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.5), 0 0 20px var(--accent-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '1.25rem',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--accent)',
                      }}
                    >
                      {project.number}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        textTransform: 'uppercase',
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      // {project.category}
                    </span>
                  </div>

                  <NavLink to={`/work/${project.slug}`}>
                    <Button variant="outline" size="sm" data-cursor="CASE STUDY">
                      <span>Xem Case Study Chi Tiết</span>
                      <ArrowUpRight size={14} />
                    </Button>
                  </NavLink>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-h2)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    marginBottom: '1rem',
                  }}
                >
                  {project.title}
                </h2>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--text-body)',
                    lineHeight: 1.7,
                    marginBottom: '2rem',
                    maxWidth: '75ch',
                  }}
                >
                  {project.description}
                </p>

                {/* Two Column Summary: Problem vs Approach */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '1.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    marginBottom: '2rem',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--accent)',
                        textTransform: 'uppercase',
                        marginBottom: '0.5rem',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Bài toán & Thách thức
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--accent)',
                        textTransform: 'uppercase',
                        marginBottom: '0.5rem',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Giải pháp & Cách tiếp cận
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {project.approach}
                    </p>
                  </div>
                </div>

                {/* Tech stack tags & metrics */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1.25rem',
                  }}
                >
                  <PowerPointBadgeContainer style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.technologies.map((t, idx) => (
                      <PowerPointBadgeItem key={t} index={idx} alternateHorizontal={true}>
                        <span
                          className="ag-target"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: 'var(--text-primary)',
                            backgroundColor: 'var(--bg-secondary)',
                            padding: '0.35rem 0.65rem',
                            borderRadius: '3px',
                            border: '1px solid var(--border)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                          }}
                        >
                          <TechIcon name={t} size={13} color="var(--accent)" />
                          <span>{t}</span>
                        </span>
                      </PowerPointBadgeItem>
                    ))}
                  </PowerPointBadgeContainer>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--accent)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Kết quả: {project.outcome}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </RevealSection>
      </div>
    </main>
  );
};

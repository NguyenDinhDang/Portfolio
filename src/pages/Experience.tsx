import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import { RevealSection } from '../components/motion/RevealSection';
import { itemFadeUpVariants } from '../components/motion/motionVariants';
import { PowerPointBadgeContainer, PowerPointBadgeItem } from '../components/motion/PowerPointBadgeGroup';
import { useAntiGravity } from '../hooks/useAntiGravity';

interface LocalizedExperience {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  contributions: string[];
  technologies: string[];
}

const VIETNAMESE_EXPERIENCES: LocalizedExperience[] = [
  {
    period: '2026 — Hiện tại',
    role: 'Kỹ sư Backend & Hệ thống',
    company: 'Talent Store',
    location: 'Việt Nam',
    description: 'Thiết kế và phát triển các vi dịch vụ backend cốt lõi, kiến trúc lược đồ cơ sở dữ liệu hiệu năng cao và các đường ống xử lý dữ liệu bất đồng bộ phục vụ nền tảng kết nối nhân sự.',
    contributions: [
      'Thiết kế kiến trúc và triển khai các dịch vụ RESTful API bất đồng bộ với FastAPI và PostgreSQL, giảm 38% thời gian phản hồi endpoint lúc cao điểm.',
      'Áp dụng các chiến lược đệm dữ liệu Redis và quản lý connection pool với asyncpg để chống chịu các đợt lưu lượng truy cập đột biến.',
      'Thiết kế đường ống tìm kiếm vector cho việc truy xuất kỹ năng nhân sự sử dụng pgvector và so khớp độ tương đồng embedding.'
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'Docker', 'Git']
  },
  {
    period: '2025 — 2026',
    role: 'Kỹ sư Phần mềm & AI Độc lập',
    company: 'Tư vấn Kỹ thuật Tự do',
    location: 'Làm việc từ xa (Remote)',
    description: 'Cung cấp giải pháp ứng dụng web chuyên biệt, tự động hóa luồng dữ liệu doanh nghiệp và tích hợp trợ lý AI / LLM tùy biến cho các doanh nghiệp vừa và nhỏ.',
    contributions: [
      'Xây dựng và bàn giao hơn 6 ứng dụng phần mềm thực tế, bao gồm công cụ tìm kiếm và hỏi đáp tài liệu nội bộ tích hợp RAG.',
      'Tích hợp cổng thanh toán trực tuyến, tầng bảo mật xác thực (OAuth2/JWT) và kênh giao tiếp thời gian thực qua WebSocket.',
      'Tự động hóa chu trình triển khai bằng Docker container và các nền tảng đám mây (Railway, Render, Vercel).'
    ],
    technologies: ['Python', 'FastAPI', 'Next.js', 'React', 'PostgreSQL', 'LangChain', 'OpenAI API']
  },
  {
    period: '2023 — 2025',
    role: 'Nghiên cứu Khoa học Máy tính & Hệ thống',
    company: 'Nghiên cứu Học thuật & Ứng dụng',
    location: 'Việt Nam',
    description: 'Nghiên cứu chuyên sâu về Cấu trúc dữ liệu & Giải thuật, Thiết kế hướng đối tượng, Cơ chế hoạt động nội tại của CSDL, Hệ điều hành và các nguyên lý tính toán phân tán.',
    contributions: [
      'Nắm vững giải quyết bài toán thuật toán, tối ưu hóa độ phức tạp thời gian/bộ nhớ và quản lý tài nguyên hệ thống nền tảng.',
      'Xây dựng các nguyên mẫu kho lưu trữ key-value phân tán thực nghiệm và bộ điều phối tin nhắn WebSocket từ đầu.',
      'Viết các bài phân tích kỹ thuật chuyên sâu về tối ưu hóa RAG, thuật toán đánh chỉ mục vector và lập trình bất đồng bộ hiện đại trong Python.'
    ],
    technologies: ['C++', 'Python', 'SQL', 'Cấu trúc dữ liệu', 'Thuật toán', 'Linux', 'Giao thức Mạng']
  }
];

export const Experience: React.FC = () => {
  useAntiGravity('.ag-target', {
    radius: 150,
    strength: 0.6,
    driftAmplitude: 3.5,
  });

  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <RevealSection watermarkText="SỰ NGHIỆP">
          <div style={{ maxWidth: '840px', marginBottom: '5rem' }}>
            <motion.div variants={itemFadeUpVariants} className="eyebrow">
              [ 01 . HÀNH TRÌNH NGHỀ NGHIỆP ]
            </motion.div>
            <motion.h1 variants={itemFadeUpVariants} className="display-title" style={{ marginBottom: '2rem' }}>
              ĐÓNG GÓP KỸ THUẬT & <span style={{ color: 'var(--accent)' }}>KINH NGHIỆM</span>.
            </motion.h1>
            <motion.p variants={itemFadeUpVariants} className="text-lead">
              Dòng thời gian ghi nhận các vai trò kỹ thuật, trách nhiệm hệ thống và các kiến trúc đã xây dựng thực tế.
            </motion.p>
          </div>
        </RevealSection>

        {/* Timeline List */}
        <RevealSection watermarkText="TIẾN TRÌNH">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '960px' }}>
            {VIETNAMESE_EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={itemFadeUpVariants}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: 'clamp(2rem, 3.5vw, 3rem)',
                  position: 'relative',
                  transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4)';
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
                    marginBottom: '1.25rem',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      letterSpacing: '0.08em',
                    }}
                  >
                    <Briefcase size={14} />
                    <span>{exp.period}</span>
                  </div>
                  {exp.location && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                      {exp.location}
                    </span>
                  )}
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-h3)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.25rem',
                  }}
                >
                  {exp.role}
                </h2>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.25rem',
                  }}
                >
                  @ {exp.company}
                </div>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--text-body)',
                    lineHeight: 1.7,
                    marginBottom: '1.75rem',
                  }}
                >
                  {exp.description}
                </p>

                {/* Key Contributions */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Đóng góp & Trách nhiệm chính:
                  </div>
                  <PowerPointBadgeContainer style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {exp.contributions.map((c, i) => (
                      <PowerPointBadgeItem key={i} index={i}>
                        <div
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6,
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                          }}
                        >
                          <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>→</span>
                          <span>{c}</span>
                        </div>
                      </PowerPointBadgeItem>
                    ))}
                  </PowerPointBadgeContainer>
                </div>

                {/* Technologies */}
                <PowerPointBadgeContainer style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {exp.technologies.map((t, idx) => (
                    <PowerPointBadgeItem key={t} index={idx} alternateHorizontal={true}>
                      <span
                        className="ag-target"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--text-primary)',
                          backgroundColor: 'var(--bg-secondary)',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '3px',
                          border: '1px solid var(--border)',
                          display: 'inline-block',
                        }}
                      >
                        {t}
                      </span>
                    </PowerPointBadgeItem>
                  ))}
                </PowerPointBadgeContainer>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* CTA */}
        <RevealSection watermarkText="HỢP TÁC">
          <motion.div
            variants={itemFadeUpVariants}
            style={{
              marginTop: '6rem',
              padding: '3.5rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              BẠN ĐANG TÌM KIẾM MỘT KỸ SƯ BACKEND / AI TÂM HUYẾT?
            </h2>
            <p className="text-lead" style={{ marginInline: 'auto', marginBottom: '2rem' }}>
              Tôi luôn sẵn sàng đón nhận các cơ hội hợp tác kỹ thuật và dự án thử thách.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <NavLink to="/contact" className="btn btn-primary">
                <span>Khởi tạo kết nối ngay</span>
                <ArrowUpRight size={16} />
              </NavLink>
            </motion.div>
          </motion.div>
        </RevealSection>
      </div>
    </main>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Database, Network, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/motion/Marquee';
import { RevealSection } from '../components/motion/RevealSection';
import { itemFadeUpVariants, itemScaleVariants } from '../components/motion/motionVariants';
import { CoverflowCarousel } from '../components/motion/CoverflowCarousel';
import { PowerPointBadgeContainer, PowerPointBadgeItem } from '../components/motion/PowerPointBadgeGroup';
import { useAntiGravity } from '../hooks/useAntiGravity';

interface LocalizedHomeProject {
  slug: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  technologies: string[];
  problem: string;
  outcome: string;
}

const FEATURED_PROJECTS: LocalizedHomeProject[] = [
  {
    slug: 'learnos',
    number: '01',
    title: 'LearnOS',
    category: 'Nền tảng AI / RAG',
    tagline: 'Xử lý tri thức thông minh & Trợ lý học tập cá nhân hóa',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'React', 'Gemini API', 'Docker'],
    problem: 'Người học gặp khó khăn khi tài liệu bị phân mảnh rải rác trên nhiều định dạng (PDF, Markdown, Video) mà không có công cụ hỏi đáp ngữ cảnh chuyên sâu kèm trích dẫn nguồn xác thực.',
    outcome: 'Độ trễ truy vấn vector dưới 350ms trên hơn 15.000 đoạn tài liệu với trích dẫn chính xác.',
  },
  {
    slug: 'devflow',
    number: '02',
    title: 'DevFlow',
    category: 'Backend & Hệ thống phân tán',
    tagline: 'Động cơ giám sát luồng làm việc & viễn trắc dự án thời gian thực',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'WebSockets', 'Next.js', 'Docker'],
    problem: 'Các đội ngũ phát triển bị phân tán ngữ cảnh giữa theo dõi đầu việc, mã nguồn commit và các điểm nghẽn phát sinh theo thời gian thực.',
    outcome: 'Xử lý ổn định hơn 2.500 kết nối WebSocket đồng thời, 0% thất thoát tin nhắn, độ trễ phát dưới 15ms.',
  },
  {
    slug: 'neurovector',
    number: '03',
    title: 'NeuroVector RAG',
    category: 'AI / Tìm kiếm ngữ nghĩa',
    tagline: 'Dịch vụ truy xuất tài liệu doanh nghiệp & trích xuất ngữ cảnh',
    technologies: ['Python', 'FastAPI', 'ChromaDB', 'FAISS', 'LangChain', 'OpenAI API', 'PostgreSQL'],
    problem: 'Tìm kiếm theo từ khóa truyền thống hoạt động kém hiệu quả trên tài liệu kỹ thuật phức tạp, nơi sự tương đồng về khái niệm và đoạn mã là tối quan trọng.',
    outcome: 'Đạt 94.2% độ liên quan trong top-3 kết quả tìm kiếm với độ trễ xử lý trung bình dưới 45ms.',
  },
  {
    slug: 'portfolio-engine',
    number: '04',
    title: 'Anti-Gravity Portfolio',
    category: 'Kỹ nghệ Sáng tạo & Three.js',
    tagline: 'Trải nghiệm số chuẩn Production với React 19 + TypeScript + Vật lý',
    technologies: ['React 19', 'TypeScript', 'Three.js', 'Vite', 'CSS Tokens', 'Custom Physics Engine'],
    problem: 'Hầu hết các trang portfolio cá nhân thường dùng template có sẵn hoặc bị giật khung hình do cấu trúc mã cồng kềnh.',
    outcome: 'Duy trì 60 FPS mượt mà trên cả desktop lẫn mobile, 0 layout shift (CLS = 0.0) và dung lượng nén dưới 180KB.',
  }
];

const AI_WORKFLOW_STEPS = [
  {
    number: '01',
    phase: 'Phân tích & Bóc tách bài toán',
    title: 'Phân tích miền nghiệp vụ & Ràng buộc',
    humanRole: 'Xác định mục tiêu kinh doanh, các phương án đánh đổi kiến trúc và ranh giới hệ thống cốt lõi.',
    aiRole: 'Mở rộng các trường hợp biên (edge cases) và phác thảo các xung đột phụ thuộc tiềm ẩn.',
    keyOutcome: 'Đặc tả kỹ thuật rõ ràng trước khi viết bất kỳ dòng mã nào.'
  },
  {
    number: '02',
    phase: 'Thiết kế kiến trúc',
    title: 'Mô hình hóa hệ thống & Lược đồ dữ liệu',
    humanRole: 'Quyết định chuẩn hóa cơ sở dữ liệu, mô hình đồng thời (concurrency) và ranh giới bảo mật.',
    aiRole: 'Sinh các phương án interface nguyên mẫu và các truy vấn đo kiểm hiệu năng so sánh.',
    keyOutcome: 'Lược đồ CSDL chuẩn xác và bản thiết kế hợp đồng API hoàn chỉnh.'
  },
  {
    number: '03',
    phase: 'Tăng tốc với AI',
    title: 'Sinh mã khung & Bộ kiểm thử tự động',
    humanRole: 'Hiện thực hóa logic nghiệp vụ lõi, thuật toán tối ưu hiệu năng và kiểm tra an toàn bảo mật.',
    aiRole: 'Tổng hợp các endpoint CRUD lặp lại, mock fixtures và các bộ unit test hoàn chỉnh.',
    keyOutcome: 'Độ bao phủ kiểm thử cao, không sao chép mã mù quáng.'
  },
  {
    number: '04',
    phase: 'Kiểm chứng nghiêm ngặt',
    title: 'Gỡ lỗi, Đo kiểm hiệu năng & Đảm bảo chất lượng',
    humanRole: 'Kiểm tra mức sử dụng bộ nhớ, độ mượt 60 FPS và đảm bảo tiêu chuẩn sẵn sàng cho môi trường production.',
    aiRole: 'Phân tích log lỗi, đề xuất biểu thức chính quy (regex) và hỗ trợ truy vết profiling.',
    keyOutcome: 'Phần mềm vững vàng, sẵn sàng triển khai với trách nhiệm kỹ thuật tuyệt đối.'
  }
];

const SKILL_CATEGORIES = [
  {
    id: 'backend',
    title: 'Kỹ nghệ Backend',
    tagline: 'API thông lượng cao, vi dịch vụ bất đồng bộ và kiến trúc phân tán',
    skills: ['Python', 'FastAPI', 'Django', 'AsyncIO', 'REST & gRPC', 'WebSockets', 'Celery']
  },
  {
    id: 'database',
    title: 'Cơ sở Dữ liệu & Lưu trữ',
    tagline: 'Thiết kế lược đồ, chiến lược đánh chỉ mục, vector stores và tầng đệm cache',
    skills: ['PostgreSQL', 'pgvector', 'SQLAlchemy', 'Redis Caching', 'Tối ưu Query', 'MongoDB']
  },
  {
    id: 'ai-rag',
    title: 'Hệ thống AI & RAG',
    tagline: 'Đường ống truy xuất ngữ nghĩa, vector embeddings và tích hợp LLM',
    skills: ['Kiến trúc RAG', 'Chroma / FAISS', 'Semantic Chunking', 'LangChain', 'OpenAI / Gemini', 'Hybrid Re-ranking']
  },
  {
    id: 'frontend-creative',
    title: 'Frontend & Kỹ nghệ Sáng tạo',
    tagline: 'Cây thành phần React 19 hiện đại, TypeScript chặt chẽ và hoạt ảnh vật lý',
    skills: ['React 19', 'TypeScript', 'Three.js / WebGL', 'Vật lý Euler', 'CSS Design Tokens', 'Vite']
  },
  {
    id: 'devops-infra',
    title: 'DevOps & Triển khai',
    tagline: 'Container hóa, quản trị Linux, tự động hóa CI/CD và vận hành Cloud',
    skills: ['Docker & Compose', 'Linux Scripting', 'Git Workflow', 'CI/CD Pipelines', 'Cloud Deployment', 'API Docs']
  }
];

export const Home: React.FC = () => {
  useAntiGravity('.ag-target', {
    radius: 170,
    strength: 0.65,
    stiffness: 0.032,
    damping: 0.078,
    driftAmplitude: 4,
    rotationAmplitude: 2.2,
  });

  return (
    <main>
      {/* 1. Hero Floating Motion Layer */}
      <Hero enableParticles={true} enableThreeScene={true} />

      {/* 2. Infinite Seamless Marquee Ticker */}
      <Marquee speed={24} />

      {/* 3. Engineering Identity & Profile Section */}
      <RevealSection
        watermarkText="BẢN SẮC"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            <motion.div variants={itemFadeUpVariants}>
              <div className="eyebrow">[ 01 . BẢN SẮC KỸ NGHỆ ]</div>
              <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1 }}>
                BIẾN ĐỘ PHỨC TẠP CỦA HỆ THỐNG THÀNH <span style={{ color: 'var(--accent)' }}>SỰ ĐƠN GIẢN</span> ĐỊNH HÌNH.
              </h2>
            </motion.div>

            <motion.div variants={itemFadeUpVariants}>
              <p className="text-lead" style={{ marginBottom: '1.5rem' }}>
                Tôi tin rằng kỹ nghệ phần mềm cốt lõi là nghệ thuật quản lý các phương án đánh đổi.
                Dù là thiết kế mức độ cô lập giao dịch (isolation levels) hay tinh chỉnh độ chính xác truy xuất vector,
                tôi luôn tập trung vào việc viết mã chuẩn xác, vững vàng thay vì xếp chồng các tầng trừu tượng quá sớm.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Làm việc tại Việt Nam, tôi chuyên sâu về các API backend thông lượng cao, cơ sở dữ liệu quan hệ & vector,
                cùng các đường ống AI ứng dụng giải quyết các điểm nghẽn vận hành thực tế.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ display: 'inline-block' }}
              >
                <NavLink
                  to="/about"
                  className="btn btn-outline"
                  data-cursor="ABOUT"
                >
                  <span>Đọc Toàn Bộ Triết Lý Kỹ Nghệ</span>
                  <ArrowRight size={14} />
                </NavLink>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* 4. Featured Case Studies & Architectures */}
      <RevealSection
        watermarkText="DỰ ÁN"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <motion.div
            variants={itemFadeUpVariants}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '4rem',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              <div className="eyebrow">[ 02 . KIẾN TRÚC ]</div>
              <h2 className="section-title" style={{ margin: 0 }}>
                CASE STUDIES & KIẾN TRÚC TIÊU BIỂU
              </h2>
            </div>
            <NavLink
              to="/work"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--accent)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
              data-cursor="ALL"
            >
              <span>Xem Tất Cả 4 Dự Án</span>
              <ArrowUpRight size={14} />
            </NavLink>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {FEATURED_PROJECTS.map((project) => (
              <motion.div
                key={project.slug}
                variants={itemFadeUpVariants}
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
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
                <NavLink
                  to={`/work/${project.slug}`}
                  data-cursor="VIEW"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem',
                    padding: 'clamp(2rem, 3.5vw, 3rem)',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: 'var(--accent)',
                        }}
                      >
                        {project.number}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        // {project.category}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        marginBottom: '1rem',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--text-sm)',
                        lineHeight: 1.65,
                        marginBottom: '2rem',
                      }}
                    >
                      {project.tagline}
                    </p>

                    <PowerPointBadgeContainer style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {project.technologies.map((t, idx) => (
                        <PowerPointBadgeItem key={t} index={idx} alternateHorizontal={true}>
                          <span
                            className="ag-target"
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.75rem',
                              color: 'var(--text-primary)',
                              backgroundColor: 'var(--bg-secondary)',
                              padding: '0.3rem 0.6rem',
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
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--bg-secondary)',
                      padding: '1.75rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border)',
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
                        BÀI TOÁN KỸ THUẬT
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        {project.problem}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '1.25rem',
                        borderTop: '1px solid var(--border)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        Kết quả: <strong style={{ color: 'var(--accent)' }}>{project.outcome}</strong>
                      </span>
                      <ArrowUpRight size={16} color="var(--accent)" />
                    </div>
                  </div>
                </NavLink>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* 5. 3D Coverflow Carousel Section (Specializations & Certifications) */}
      <RevealSection
        watermarkText="HỆ THỐNG"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <motion.div variants={itemFadeUpVariants} style={{ textAlign: 'center', maxWidth: '780px', marginInline: 'auto', marginBottom: '2.5rem' }}>
            <div className="eyebrow" style={{ marginInline: 'auto' }}>[ 03 . CHUYÊN MÔN ]</div>
            <h2 className="section-title">
              NĂNG LỰC HỆ THỐNG & CHUYÊN MÔN CỐT LÕI
            </h2>
            <p className="text-lead" style={{ marginInline: 'auto' }}>
              Vuốt hoặc dùng nút điều hướng để khám phá các năng lực kiến trúc thực chiến về backend phân tán, truy xuất vector AI và tính nhất quán dữ liệu.
            </p>
          </motion.div>

          <motion.div variants={itemFadeUpVariants}>
            <CoverflowCarousel />
          </motion.div>
        </div>
      </RevealSection>

      {/* 6. AI Workflow & Engineering Execution */}
      <RevealSection
        watermarkText="QUY TRÌNH"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <motion.div variants={itemFadeUpVariants}>
            <div className="eyebrow">[ 04 . PHƯƠNG PHÁP LUẬN ]</div>
            <h2 className="section-title">CÁCH TÔI XÂY DỰNG CÙNG AI — QUY TRÌNH THỰC THI</h2>
            <p className="text-lead" style={{ marginBottom: '3.5rem' }}>
              Tôi xem AI là công cụ tăng tốc đắc lực cho việc khám phá, sinh mã khung và kiểm thử — trong khi tư duy kỹ sư con người làm chủ kiến trúc, kiểm chứng và độ an toàn khi vận hành production.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {AI_WORKFLOW_STEPS.map((step) => (
              <motion.div
                key={step.number}
                variants={itemScaleVariants}
                whileHover={{ y: -4, borderColor: 'var(--border-strong)' }}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '2rem',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent)',
                    marginBottom: '0.75rem',
                    letterSpacing: '0.08em',
                  }}
                >
                  GIAI ĐOẠN {step.number} // {step.phase}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    marginBottom: '1rem',
                  }}
                >
                  {step.title}
                </h3>
                <div style={{ marginBottom: '0.75rem', fontSize: 'var(--text-xs)' }}>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                    Kỹ sư làm chủ:
                  </strong>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.humanRole}</span>
                </div>
                <div style={{ marginBottom: '1.25rem', fontSize: 'var(--text-xs)' }}>
                  <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.2rem' }}>
                    AI tăng tốc:
                  </strong>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.aiRole}</span>
                </div>
                <div
                  style={{
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <CheckCircle2 size={12} color="var(--accent)" />
                  <span>{step.keyOutcome}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* 7. Technical Arsenal & Skill Constellations */}
      <RevealSection
        watermarkText="NĂNG LỰC"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <motion.div variants={itemFadeUpVariants}>
            <div className="eyebrow">[ 05 . NĂNG LỰC ]</div>
            <h2 className="section-title">CHÙM NĂNG LỰC CÔNG NGHỆ (VẬT LÝ KHÔNG TRỌNG LỰC)</h2>
            <p className="text-lead" style={{ marginBottom: '3.5rem' }}>
              Di chuyển con trỏ chuột lại gần bất kỳ thẻ kỹ năng nào để trải nghiệm lực đẩy vật lý AntiGravity và góc xoay 3D tương tác.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {SKILL_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.id}
                variants={itemScaleVariants}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '2.25rem',
                }}
              >
                <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
                  {idx === 0 && <Cpu size={22} />}
                  {idx === 1 && <Database size={22} />}
                  {idx === 2 && <Network size={22} />}
                  {idx === 3 && <Terminal size={22} />}
                  {idx > 3 && <Terminal size={22} />}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.5rem',
                  }}
                >
                  {cat.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {cat.tagline}
                </p>
                <PowerPointBadgeContainer style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {cat.skills.map((s, idx) => (
                    <PowerPointBadgeItem key={s} index={idx} alternateHorizontal={true}>
                      <span
                        className="ag-target"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--text-primary)',
                          backgroundColor: 'var(--bg-secondary)',
                          padding: '0.4rem 0.75rem',
                          borderRadius: '4px',
                          border: '1px solid var(--border)',
                          display: 'inline-block',
                          cursor: 'default',
                        }}
                      >
                        {s}
                      </span>
                    </PowerPointBadgeItem>
                  ))}
                </PowerPointBadgeContainer>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* 8. Call to Action */}
      <RevealSection
        watermarkText="KẾT NỐI"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <motion.div
            variants={itemFadeUpVariants}
            style={{
              padding: 'clamp(3rem, 6vw, 5rem)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div className="eyebrow" style={{ marginInline: 'auto' }}>
              [ 06 . LIÊN HỆ ]
            </div>
            <h2
              className="display-title"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                marginBottom: '1.5rem',
              }}
            >
              BẠN CÓ BÀI TOÁN CẦN <span style={{ color: 'var(--accent)' }}>GIẢI QUYẾT</span>?
            </h2>
            <p className="text-lead" style={{ marginInline: 'auto', marginBottom: '3rem' }}>
              Tôi luôn sẵn sàng tham gia các dự án phát triển phần mềm, tư vấn kiến trúc backend và triển khai hệ thống AI/RAG chuyên sâu.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <NavLink to="/contact" className="btn btn-primary" data-cursor="START">
                  <span>Khởi Tạo Dự Án</span>
                  <ArrowUpRight size={16} />
                </NavLink>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="mailto:banhvannguyen45@gmail.com"
                  className="btn btn-outline"
                  data-cursor="EMAIL"
                >
                  <span>Gửi Email Trực Tiếp</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </RevealSection>
    </main>
  );
};

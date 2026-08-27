import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { RevealSection } from '../components/motion/RevealSection';
import { itemFadeUpVariants, itemScaleVariants } from '../components/motion/motionVariants';
import { PowerPointBadgeContainer, PowerPointBadgeItem } from '../components/motion/PowerPointBadgeGroup';
import { useAntiGravity } from '../hooks/useAntiGravity';
import { TechIcon } from '../components/ui/tech-icon';
import { Badge } from '../components/ui/badge';

export const About: React.FC = () => {
  useAntiGravity('.ag-target', {
    radius: 160,
    strength: 0.6,
    driftAmplitude: 3.5,
  });

  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <RevealSection watermarkText="GIỚI THIỆU">
          <div style={{ maxWidth: '880px', marginBottom: '5rem' }}>
            <motion.div variants={itemFadeUpVariants} className="eyebrow">
              [ 01 . TRIẾT LÝ PHÁT TRIỂN ]
            </motion.div>
            <motion.h1 variants={itemFadeUpVariants} className="display-title" style={{ marginBottom: '2rem' }}>
              KỸ NGHỆ VỚI CHUYÊN TÂM, <span style={{ color: 'var(--accent)' }}>CHIỀU SÂU</span> & SỰ RÕ RÀNG.
            </motion.h1>
            <motion.p variants={itemFadeUpVariants} className="text-lead">
              Tôi là Kỹ sư Phần mềm tại Việt Nam, chuyên tâm xây dựng các hệ thống backend chịu tải cao,
              kiến trúc phân tán vững chắc và các đường ống truy xuất ngữ nghĩa RAG/AI độ chính xác cao.
            </motion.p>
          </div>
        </RevealSection>

        {/* Core Principles Grid */}
        <RevealSection watermarkText="TƯ DUY">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              marginBottom: '6rem',
            }}
          >
            <motion.div
              variants={itemScaleVariants}
              whileHover={{ y: -4, borderColor: 'var(--border-strong)' }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '2.5rem',
                transition: 'border-color 0.25s ease',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--accent)',
                  display: 'block',
                  marginBottom: '1rem',
                  letterSpacing: '0.08em',
                }}
              >
                01 // NGUYÊN LÝ NỀN TẢNG
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  marginBottom: '1rem',
                }}
              >
                Tư duy từ bản chất (First-Principles)
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                Phần mềm không phải là viết thật nhiều mã nguồn phức tạp; đó là giải quyết bài toán thực tế với kiến trúc tinh gọn, tường minh và dễ bảo trì nhất có thể. Tôi ưu tiên sự hiểu biết sâu sắc về hệ thống thay vì lạm dụng các tầng trừu tượng sớm.
              </p>
            </motion.div>

            <motion.div
              variants={itemScaleVariants}
              whileHover={{ y: -4, borderColor: 'var(--border-strong)' }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '2.5rem',
                transition: 'border-color 0.25s ease',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--accent)',
                  display: 'block',
                  marginBottom: '1rem',
                  letterSpacing: '0.08em',
                }}
              >
                02 // TRỌNG TÂM BACKEND
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  marginBottom: '1rem',
                }}
              >
                Hiệu năng & Tính toàn vẹn dữ liệu
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                Từ các bộ điều phối bất đồng bộ microsecond trong FastAPI đến tối ưu hóa chỉ mục PostgreSQL, pooling kết nối và điều phối tin nhắn Redis, tôi xây dựng các hệ thống backend được thiết kế để luôn duy trì tốc độ và sự ổn định dưới áp lực tải lớn.
              </p>
            </motion.div>

            <motion.div
              variants={itemScaleVariants}
              whileHover={{ y: -4, borderColor: 'var(--border-strong)' }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '2.5rem',
                transition: 'border-color 0.25s ease',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--accent)',
                  display: 'block',
                  marginBottom: '1rem',
                  letterSpacing: '0.08em',
                }}
              >
                03 // AI LÀ ĐÒN BẨY TỐC ĐỘ
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  marginBottom: '1rem',
                }}
              >
                Kỹ nghệ AI có kỷ luật
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                Tôi tận dụng các mô hình LLM và trợ lý AI để nhanh chóng khám phá giả thuyết, tổng hợp bộ test tự động và sinh mã khung, đồng thời luôn nắm quyền kiểm soát kiến trúc và đánh giá chất lượng sản phẩm một cách nghiêm ngặt.
              </p>
            </motion.div>
          </div>
        </RevealSection>

        {/* AI Workflow Section */}
        <RevealSection watermarkText="QUY TRÌNH">
          <div style={{ marginBottom: '6rem' }}>
            <motion.div variants={itemFadeUpVariants} className="eyebrow">
              [ 02 . PHƯƠNG PHÁP LUẬN ]
            </motion.div>
            <motion.h2 variants={itemFadeUpVariants} className="section-title">
              CÁCH TÔI XÂY DỰNG CÙNG AI — QUY TRÌNH KỸ NGHỆ
            </motion.h2>
            <motion.p variants={itemFadeUpVariants} className="text-lead" style={{ marginBottom: '3rem' }}>
              AI nâng cao tốc độ triển khai, nhưng tư duy kỹ sư con người làm chủ kiến trúc, sự đánh đổi và chất lượng hoàn thiện cuối cùng.
            </motion.p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {[
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
              ].map((step) => (
                <motion.div
                  key={step.number}
                  variants={itemScaleVariants}
                  whileHover={{ y: -4 }}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '2rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--accent)',
                      marginBottom: '0.5rem',
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
                  <div style={{ marginBottom: '1rem', fontSize: 'var(--text-xs)' }}>
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

        {/* Complete Skills Overview */}
        <RevealSection watermarkText="NĂNG LỰC">
          <motion.div variants={itemFadeUpVariants} className="eyebrow">
            [ 03 . NĂNG LỰC CÔNG NGHỆ ]
          </motion.div>
          <motion.h2 variants={itemFadeUpVariants} className="section-title">
            NGĂN XẾP KỸ THUẬT TOÀN DIỆN
          </motion.h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginTop: '2.5rem',
            }}
          >
            {[
              {
                id: 'backend',
                title: 'Kỹ nghệ Backend',
                tagline: 'API thông lượng cao, vi dịch vụ bất đồng bộ và kiến trúc phân tán',
                skills: [
                  { name: 'Python', level: 'Chuyên sâu' },
                  { name: 'FastAPI', level: 'Chuyên gia' },
                  { name: 'Django / Flask', level: 'Nâng cao' },
                  { name: 'AsyncIO & Concurrency', level: 'Nâng cao' },
                  { name: 'REST & gRPC APIs', level: 'Chuyên gia' },
                  { name: 'WebSockets & SSE', level: 'Nâng cao' },
                  { name: 'Celery / Tác vụ nền', level: 'Thành thạo' }
                ]
              },
              {
                id: 'database',
                title: 'Cơ sở dữ liệu & Lưu trữ',
                tagline: 'Thiết kế lược đồ, chiến lược đánh chỉ mục, vector stores và tầng đệm cache',
                skills: [
                  { name: 'PostgreSQL', level: 'Nâng cao' },
                  { name: 'pgvector', level: 'Chuyên gia' },
                  { name: 'SQLAlchemy / Alembic', level: 'Nâng cao' },
                  { name: 'Redis Caching & PubSub', level: 'Nâng cao' },
                  { name: 'Tối ưu truy vấn & Indexing', level: 'Nâng cao' },
                  { name: 'MongoDB', level: 'Thành thạo' }
                ]
              },
              {
                id: 'ai-rag',
                title: 'Hệ thống AI & RAG',
                tagline: 'Đường ống truy xuất ngữ nghĩa, vector embeddings và tích hợp LLM',
                skills: [
                  { name: 'Kiến trúc Pipeline RAG', level: 'Chuyên gia' },
                  { name: 'Vector Databases (Chroma / FAISS)', level: 'Nâng cao' },
                  { name: 'Semantic Chunking & Embedding', level: 'Nâng cao' },
                  { name: 'LangChain & LlamaIndex', level: 'Thành thạo' },
                  { name: 'LLM APIs (OpenAI / Gemini)', level: 'Chuyên gia' },
                  { name: 'Hybrid Re-ranking (BM25 + Dense)', level: 'Nâng cao' }
                ]
              },
              {
                id: 'frontend-creative',
                title: 'Frontend & Creative Engineering',
                tagline: 'Cây thành phần React 19 hiện đại, TypeScript chặt chẽ và hoạt ảnh vật lý',
                skills: [
                  { name: 'React 19', level: 'Nâng cao' },
                  { name: 'TypeScript', level: 'Nâng cao' },
                  { name: 'Three.js & WebGL', level: 'Thành thạo' },
                  { name: 'Vật lý AntiGravity (Euler)', level: 'Chuyên gia' },
                  { name: 'CSS Tokens & Layout System', level: 'Chuyên gia' },
                  { name: 'Vite & Công cụ hiện đại', level: 'Nâng cao' }
                ]
              },
              {
                id: 'devops-infra',
                title: 'DevOps & Triển khai',
                tagline: 'Container hóa, quản trị Linux, tự động hóa CI/CD và vận hành Cloud',
                skills: [
                  { name: 'Docker & Compose', level: 'Nâng cao' },
                  { name: 'Linux / Shell Scripting', level: 'Nâng cao' },
                  { name: 'Quy trình Git & GitHub', level: 'Nâng cao' },
                  { name: 'Đường ống CI/CD', level: 'Thành thạo' },
                  { name: 'Triển khai Cloud (Render, Railway, Vercel)', level: 'Nâng cao' },
                  { name: 'Postman & Tài liệu API', level: 'Chuyên gia' }
                ]
              }
            ].map((cat) => (
              <motion.div
                key={cat.id}
                variants={itemScaleVariants}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '2rem',
                }}
              >
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
                <PowerPointBadgeContainer style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {cat.skills.map((s, idx) => (
                    <PowerPointBadgeItem key={s.name} index={idx}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.55rem 0.85rem',
                          backgroundColor: 'var(--bg-secondary)',
                          borderRadius: '4px',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <TechIcon name={s.name} size={15} color="var(--accent)" />
                          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{s.name}</span>
                        </div>
                        <Badge variant="accent" className="ag-target text-[0.7rem] px-2 py-0.5">
                          {s.level}
                        </Badge>
                      </div>
                    </PowerPointBadgeItem>
                  ))}
                </PowerPointBadgeContainer>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* CTA */}
        <RevealSection watermarkText="KẾT NỐI">
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
              BẠN CẦN THIẾT KẾ HOẶC MỞ RỘNG MỘT HỆ THỐNG?
            </h2>
            <p className="text-lead" style={{ marginInline: 'auto', marginBottom: '2rem' }}>
              Hãy cùng trao đổi về yêu cầu bài toán, các phương án đánh đổi và giải pháp kỹ thuật tối ưu.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <NavLink to="/contact" className="btn btn-primary">
                <span>Bắt đầu thảo luận kỹ thuật</span>
                <ArrowUpRight size={16} />
              </NavLink>
            </motion.div>
          </motion.div>
        </RevealSection>
      </div>
    </main>
  );
};

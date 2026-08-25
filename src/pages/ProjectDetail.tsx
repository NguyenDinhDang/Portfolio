import React from 'react';
import { useParams, NavLink, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Layers, AlertCircle } from 'lucide-react';
import { projects } from '../data/projects';
import { PowerPointBadgeContainer, PowerPointBadgeItem } from '../components/motion/PowerPointBadgeGroup';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useAntiGravity } from '../hooks/useAntiGravity';

interface ProjectLocalization {
  category: string;
  tagline: string;
  problem: string;
  approach: string;
  architecture: string[];
  difficulties?: string;
  outcome: string;
}

const LOCALIZED_DATA: Record<string, ProjectLocalization> = {
  learnos: {
    category: 'Nền tảng AI / RAG',
    tagline: 'Xử lý tri thức thông minh & Trợ lý học tập cá nhân hóa',
    problem: 'Người học và kỹ sư gặp khó khăn khi tài liệu bị phân tán rải rác trên nhiều định dạng (PDF, Markdown, Video) mà không có công cụ hỏi đáp ngữ cảnh chuyên sâu kèm trích dẫn nguồn xác thực.',
    approach: 'Xây dựng đường ống RAG dạng mô-đun với kỹ thuật phân đoạn ngữ nghĩa (Semantic Chunking), lưu trữ vector trong PostgreSQL qua pgvector và phát sinh dữ liệu bất đồng bộ với cấu trúc đầu ra chuẩn.',
    architecture: [
      'Tầng giao diện (React + TypeScript) -> Kết nối REST / SSE Streaming',
      'Cổng API Gateway (FastAPI Async Controllers & Xác thực Auth)',
      'Động cơ bóc tách & Phân đoạn ngữ nghĩa (Semantic Chunking theo ranh giới Token)',
      'Kho Vector & CSDL Quan hệ (PostgreSQL kết hợp mở rộng pgvector)',
      'Điều phối LLM & Đường ống Prompt ngữ cảnh (Gemini Pro với bộ kiểm chứng trích dẫn)'
    ],
    difficulties: 'Khắc phục hiện tượng tràn cửa sổ ngữ cảnh (context window overflow) và ảo giác mô hình (hallucinations) bằng việc áp dụng ngưỡng tương đồng ngữ nghĩa nghiêm ngặt (Khoảng cách Cosine < 0.28) và truy vấn dự phòng.',
    outcome: 'Độ trễ truy vấn vector dưới 350ms trên hơn 15.000 đoạn tài liệu có trích dẫn nguồn.',
  },
  devflow: {
    category: 'Backend & Hệ thống phân tán',
    tagline: 'Động cơ giám sát luồng làm việc & viễn trắc dự án thời gian thực',
    problem: 'Các nhóm phát triển hiện đại đối mặt với việc phân mảnh thông tin giữa theo dõi đầu việc (issue tracking), mã nguồn commit và các điểm nghẽn sprint thời gian thực, dẫn đến chậm tiến độ phát hành.',
    approach: 'Thiết kế kiến trúc hướng sự kiện sử dụng Redis Pub/Sub để phát thanh qua WebSocket với độ trễ dưới mili-giây, kết hợp mẫu Transactional Outbox trên PostgreSQL để đảm bảo tính toàn vẹn dữ liệu.',
    architecture: [
      'Không gian làm việc Client (Next.js + WebSocket Client)',
      'Backend ASGI thông lượng cao (FastAPI + Asyncpg Connection Pooling)',
      'Hệ thống điều phối tin nhắn in-memory (Redis Cluster cho Pub/Sub & Caching)',
      'Cơ sở dữ liệu chính chuẩn ACID (PostgreSQL với chỉ mục B-Tree & GIN tối ưu)',
      'Công nhân xử lý viễn trắc ngầm tự động (Celery / Async Background Tasks)'
    ],
    difficulties: 'Xử lý các thay đổi trạng thái đồng thời trên nhiều kết nối WebSocket mà không gây tranh chấp dữ liệu (race conditions) thông qua khóa lạc quan (optimistic locking) và Redis distributed mutexes.',
    outcome: 'Xử lý ổn định hơn 2.500 kết nối WebSocket đồng thời, 0% thất thoát tin nhắn, độ trễ phát dưới 15ms.',
  },
  neurovector: {
    category: 'AI / Tìm kiếm ngữ nghĩa',
    tagline: 'Dịch vụ truy xuất tài liệu doanh nghiệp & trích xuất ngữ cảnh',
    problem: 'Tìm kiếm theo từ khóa truyền thống hoạt động kém hiệu quả trên tài liệu kỹ thuật phức tạp, nơi sự tương đồng về khái niệm, thuật ngữ và đoạn mã là tối quan trọng.',
    approach: 'Xây dựng đường ống truy xuất 2 giai đoạn kết hợp vector dense embedding và xếp hạng từ khóa thưa BM25 (Reciprocal Rank Fusion) để đảm bảo đồng thời độ bao phủ và độ chính xác.',
    architecture: [
      'Endpoints tìm kiếm REST & gRPC tốc độ cao (FastAPI)',
      'Đường ống nhúng kép (Vector Dense + Chỉ mục Lexical BM25)',
      'Không gian Vector in-memory (FAISS / ChromaDB với chỉ mục HNSW)',
      'Tầng tái xếp hạng hỗn hợp (Cross-Encoder Re-Ranking)',
      'Hệ thống quan sát độ trễ và chất lượng truy vấn'
    ],
    difficulties: 'Cân bằng giữa độ chính xác truy xuất và ngân sách độ trễ (latency budget) trên kho tài liệu lớn; giải quyết bằng cách chia lô nhúng bất đồng bộ và bộ đệm LRU cho các vector truy vấn phổ biến.',
    outcome: 'Đạt 94.2% độ liên quan trong top-3 kết quả tìm kiếm với độ trễ xử lý trung bình dưới 45ms.',
  },
  'portfolio-engine': {
    category: 'Kỹ nghệ Sáng tạo & Three.js',
    tagline: 'Trải nghiệm số chuẩn Production với React 19 + TypeScript + Vật lý',
    problem: 'Hầu hết các trang portfolio cá nhân thường dùng template có sẵn hoặc bị giật khung hình do cấu trúc mã cồng kềnh.',
    approach: 'Triển khai vòng lặp vật lý imperative 60 FPS trực tiếp với requestAnimationFrame, ghi thẳng biến đổi DOM kết hợp compositing GPU mà không gây xung đột trạng thái React.',
    architecture: [
      'Cây thành phần (React 19 Functional Components & React Router)',
      'Tầng vật lý Imperative (Thuật toán tích phân Euler bán ẩn AntiGravity)',
      'Tầng 3D tăng tốc phần cứng (Không gian Three.js WebGL với góc nhìn Camera Parallax)',
      'Kiến trúc Design Token (Biến CSS thuần & Hỗ trợ phòng vệ Reduced-Motion)'
    ],
    difficulties: 'Triệt tiêu hiện tượng nhấp nháy giao diện và tính toán lại layout khi cuộn trang hoặc co giãn màn hình bằng việc truy ngược tâm neo mà không làm gián đoạn ma trận transform.',
    outcome: 'Duy trì 60 FPS mượt mà trên cả desktop lẫn mobile, 0 layout shift (CLS = 0.0) và dung lượng nén dưới 180KB.',
  }
};

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useScrollReveal('[data-reveal]');
  useAntiGravity('.ag-target', {
    radius: 150,
    strength: 0.6,
    driftAmplitude: 3,
  });

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const localized = (slug && LOCALIZED_DATA[slug]) ? LOCALIZED_DATA[slug] : {
    category: project.category,
    tagline: project.tagline,
    problem: project.problem,
    approach: project.approach,
    architecture: project.architecture,
    difficulties: project.difficulties,
    outcome: project.outcome,
  };

  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Back Link */}
        <NavLink
          to="/work"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <ArrowLeft size={14} />
          <span>Quay lại danh sách dự án</span>
        </NavLink>

        {/* Header Block */}
        <div style={{ maxWidth: '900px', marginBottom: '4rem' }}>
          <div className="eyebrow">
            CASE STUDY {project.number} // {localized.category}
          </div>
          <h1 className="display-title" style={{ marginBottom: '1.5rem' }}>
            {project.title}
          </h1>
          <p className="text-lead" style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: 'var(--text-primary)' }}>
            {localized.tagline}
          </p>
        </div>

        {/* Metadata Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            padding: '2rem',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            marginBottom: '4rem',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '0.35rem', letterSpacing: '0.08em' }}>
              DANH MỤC
            </div>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{localized.category}</div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '0.35rem', letterSpacing: '0.08em' }}>
              KẾT QUẢ ĐẠT ĐƯỢC
            </div>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--accent)' }}>{localized.outcome}</div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '0.35rem', letterSpacing: '0.08em' }}>
              LIÊN KẾT
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--accent)',
                    fontWeight: 600,
                  }}
                >
                  <span>Mã nguồn GitHub</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Technical Deep Dive Sections */}
        <div
          data-reveal
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Problem & Approach */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '2.25rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.08em',
                }}
              >
                <AlertCircle size={14} />
                <span>Thách thức & Bối cảnh bài toán</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                {localized.problem}
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '2.25rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.08em',
                }}
              >
                <CheckCircle2 size={14} />
                <span>Giải pháp kiến trúc kỹ thuật</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                {localized.approach}
              </p>
            </div>
          </div>

          {/* Architecture Pipeline Flow */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '2.25rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                letterSpacing: '0.08em',
              }}
            >
              <Layers size={14} />
              <span>Luồng dữ liệu & Kiến trúc hệ thống</span>
            </div>

            <PowerPointBadgeContainer style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {localized.architecture.map((layer, index) => (
                <PowerPointBadgeItem key={layer} index={index}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.875rem 1rem',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span style={{ color: 'var(--accent)', fontWeight: 600 }}>0{index + 1}</span>
                    <span>{layer}</span>
                  </div>
                </PowerPointBadgeItem>
              ))}
            </PowerPointBadgeContainer>

            {localized.difficulties && (
              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.08em',
                  }}
                >
                  ĐÁNH ĐỔI KỸ THUẬT & PHƯƠNG ÁN XỬ LÝ:
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {localized.difficulties}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div style={{ marginBottom: '4rem' }} data-reveal>
          <div className="eyebrow">NGĂN XẾP CÔNG NGHỆ ÁP DỤNG</div>
          <PowerPointBadgeContainer style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {project.technologies.map((t, idx) => (
              <PowerPointBadgeItem key={t} index={idx} alternateHorizontal={true}>
                <span
                  className="ag-target"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-surface)',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
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

        {/* Next Project Footer Link */}
        <div
          style={{
            paddingTop: '3rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <NavLink
            to="/work"
            className="btn btn-outline"
          >
            <ArrowLeft size={16} />
            <span>Tất cả dự án</span>
          </NavLink>

          <NavLink
            to="/contact"
            className="btn btn-primary"
          >
            <span>Trao đổi về kiến trúc này</span>
            <ArrowUpRight size={16} />
          </NavLink>
        </div>
      </div>
    </main>
  );
};

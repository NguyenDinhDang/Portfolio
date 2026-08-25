import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, Copy, ArrowUpRight, Send, MessageSquare, Code2 } from 'lucide-react';
import { RevealSection } from '../components/motion/RevealSection';
import { itemFadeUpVariants } from '../components/motion/motionVariants';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const email = 'banhvannguyen45@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <RevealSection watermarkText="LIÊN HỆ">
          <div style={{ maxWidth: '840px', marginBottom: '5rem' }}>
            <motion.div variants={itemFadeUpVariants} className="eyebrow">
              [ 01 . KHỞI TẠO KẾT NỐI ]
            </motion.div>
            <motion.h1 variants={itemFadeUpVariants} className="display-title" style={{ marginBottom: '2rem' }}>
              BẠN CÓ BÀI TOÁN CẦN <span style={{ color: 'var(--accent)' }}>HIỆN THỰC HÓA</span>?
            </motion.h1>
            <motion.p variants={itemFadeUpVariants} className="text-lead">
              Dù bạn cần một vi dịch vụ backend chịu tải cao, một trợ lý tri thức AI/RAG thông minh,
              hay một kỹ sư tận tâm viết mã tường minh, kỷ luật — hãy bắt đầu cuộc trò chuyện.
            </motion.p>
          </div>
        </RevealSection>

        {/* Contact Methods Grid */}
        <RevealSection watermarkText="KÊNH LIÊN LẠC">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              marginBottom: '4rem',
            }}
          >
            {/* Direct Email Card */}
            <motion.div
              variants={itemFadeUpVariants}
              whileHover={{ y: -3 }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-accent)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4), 0 0 20px var(--accent-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                    letterSpacing: '0.08em',
                  }}
                >
                  <Mail size={16} />
                  <span>Kênh liên hệ chính</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                  Email Trực Tiếp
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Hãy gửi thông tin mô tả dự án, yêu cầu kỹ thuật hoặc cơ hội hợp tác trực tiếp đến hòm thư của tôi.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ flexGrow: 1 }}>
                  <a
                    href={`mailto:${email}`}
                    className="btn btn-primary"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  >
                    <span>Soạn Email</span>
                    <ArrowUpRight size={14} />
                  </a>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={copyEmail}
                  className="btn btn-outline"
                  style={{ minWidth: '130px' }}
                >
                  {copied ? (
                    <>
                      <Check size={14} color="var(--accent)" />
                      <span>Đã sao chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Sao chép</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Instant Messaging & Social */}
            <motion.div
              variants={itemFadeUpVariants}
              whileHover={{ y: -3 }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-accent)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4), 0 0 20px var(--accent-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                    letterSpacing: '0.08em',
                  }}
                >
                  <MessageSquare size={16} />
                  <span>Trao đổi tức thì & Mã nguồn</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                  Mạng Lưới Kỹ Thuật
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Khám phá toàn bộ mã nguồn các dự án trên GitHub hoặc kết nối trao đổi nhanh qua Telegram.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ flex: '1 1 45%' }}>
                  <a
                    href="https://github.com/NguyenDinhDang"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  >
                    <Code2 size={14} />
                    <span>GitHub</span>
                  </a>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ flex: '1 1 45%' }}>
                  <a
                    href="https://t.me/NguyenDinhDang"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  >
                    <Send size={14} />
                    <span>Telegram</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </RevealSection>

        {/* Direct Project Brief Form */}
        <RevealSection watermarkText="TRAO ĐỔI">
          <motion.div
            variants={itemFadeUpVariants}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              maxWidth: '800px',
              marginInline: 'auto',
            }}
          >
            <div className="eyebrow" style={{ marginBottom: '0.5rem' }}>
              [ BIỂU MẪU YÊU CẦU DỰ ÁN ]
            </div>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              GỬI TIN NHẮN TRỰC TIẾP
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Vui lòng để lại thông tin liên hệ và tóm tắt yêu cầu, tôi sẽ phản hồi lại bạn trong vòng 24 giờ.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Họ và Tên *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Địa Chỉ Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@domain.com"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.08em',
                  }}
                >
                  Chủ Đề & Phạm Vi Dự Án
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Xây dựng API Backend / Tích hợp RAG / Tư vấn kiến trúc"
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.08em',
                  }}
                >
                  Nội Dung Chi Tiết *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mô tả bối cảnh bài toán, mục tiêu, công nghệ mong muốn hoặc thời hạn dự kiến..."
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
              >
                {formSubmitted ? (
                  <>
                    <Check size={16} />
                    <span>Đã gửi thành công! Cảm ơn bạn.</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Gửi Tin Nhắn Trao Đổi</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </RevealSection>
      </div>
    </main>
  );
};

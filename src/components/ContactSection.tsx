import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Để tích hợp với các dịch vụ form như Netlify/Formspree:
    // Form đã có thuộc tính name="contact" và data-netlify="true"
    // Nếu bạn muốn tự xử lý API backend thì cấu hình fetch() tại đây
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact pt-[var(--gutter-huge)]">
      <div className="container">
        <h2
          className="text-[var(--h2)] font-bold text-center text-important mb-[var(--gutter-x-large)]"
        >
          Send Message
        </h2>

        <div className="contact-content grid grid-cols-[minmax(245px,35%)_1fr] my-[var(--gutter-x-large)] border border-portfolio-border rounded-[var(--gutter-nano)] overflow-hidden max-1032:flex max-1032:flex-col-reverse max-1032:max-w-[845px] max-1032:mx-auto">
          {/* Left info box */}
          <div className="contact-textbox p-[var(--gutter-large)] px-[var(--gutter-small)] bg-bg-primary">
            <strong className="hire-alert mb-[var(--gutter-small)]">
              <span className="hire-indicator mr-2" />
              Available for hire
            </strong>

            <p className="contact-text text-body font-light mb-[var(--gutter-small)] leading-relaxed">
              Triết lý sống của tôi là: "Chúng ta là những gì chúng ta lặp đi lặp lại. Vì vậy, sự xuất sắc không phải là một hành động, mà là một thói quen." — Aristotle
            </p>

            
          </div>

          {/* Right contact form */}
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="contact-form p-[var(--gutter-large)] px-[var(--gutter-small)] bg-bg-secondary flex flex-col justify-between"
          >
            {/* Netlify form hidden input */}
            <input type="hidden" name="form-name" value="contact" />

            <div>
              <div className="form-field mb-[var(--gutter-small)]">
                <label
                  htmlFor="name"
                  className="block text-important text-[var(--text-small)] mb-[var(--gutter-nano)] ml-[var(--gutter-nano)]"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Nhập tên của bạn"
                  className="block w-full text-sub text-[var(--text-small)] bg-transparent border-0 border-b border-portfolio-border p-[var(--gutter-nano)] mx-[var(--gutter-nano)] focus:outline-none focus:border-[#888] transition-colors"
                />
              </div>

              <div className="form-field mb-[var(--gutter-small)]">
                <label
                  htmlFor="email"
                  className="block text-important text-[var(--text-small)] mb-[var(--gutter-nano)] ml-[var(--gutter-nano)]"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  inputMode="email"
                  placeholder="name@example.com"
                  className="block w-full text-sub text-[var(--text-small)] bg-transparent border-0 border-b border-portfolio-border p-[var(--gutter-nano)] mx-[var(--gutter-nano)] focus:outline-none focus:border-[#888] transition-colors"
                />
              </div>

              <div className="form-field mb-[var(--gutter-small)]">
                <label
                  htmlFor="message"
                  className="block text-important text-[var(--text-small)] mb-[var(--gutter-nano)] ml-[var(--gutter-nano)]"
                >
                  Tôi có thể giúp gì cho bạn?
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  placeholder="Để lại lời nhắn cho tôi..."
                  className="block w-full text-sub text-[var(--text-small)] bg-transparent border-0 border-b border-portfolio-border p-[var(--gutter-nano)] mx-[var(--gutter-nano)] focus:outline-none focus:border-[#888] transition-colors resize-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" className="btn btn-cta border-0">
                {submitted ? 'Đã gửi thành công!' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

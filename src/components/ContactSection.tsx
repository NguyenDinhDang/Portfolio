import React, { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
// Đặt trong file .env: VITE_WEB3FORMS_KEY=your_access_key
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

export const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading') return;

    // Lưu tham chiếu trước await, vì sau đó e.currentTarget sẽ là null
    const form = e.currentTarget;

    if (!ACCESS_KEY) {
      setStatus('error');
      setErrorMsg('Thiếu access key. Kiểm tra biến VITE_WEB3FORMS_KEY.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const formData = new FormData(form);
      formData.append('access_key', ACCESS_KEY);

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        form.reset();
        // Trả nút về trạng thái ban đầu sau 5 giây
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Gửi thất bại, vui lòng thử lại.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Không thể kết nối. Kiểm tra mạng và thử lại.');
    }
  };

  const buttonLabel =
    status === 'loading'
      ? 'Đang gửi...'
      : status === 'success'
      ? 'Đã gửi thành công!'
      : 'Gửi';

  return (
    <section id="contact" className="contact pt-[var(--gutter-huge)]">
      <div className="container">
        <h2
          className="text-[var(--h2)] font-bold text-center text-important mb-[var(--gutter-x-large)]"
        >
          Liên hệ với tôi
        </h2>

        <div className="contact-content grid grid-cols-[minmax(245px,35%)_1fr] my-[var(--gutter-x-large)] border border-portfolio-border rounded-[var(--gutter-nano)] overflow-hidden max-1032:flex max-1032:flex-col-reverse max-1032:max-w-[845px] max-1032:mx-auto">
          {/* Left info box */}
          <div className="contact-textbox p-[var(--gutter-large)] px-[var(--gutter-small)] bg-bg-primary">
            <strong className="hire-alert mb-[var(--gutter-small)]">
              <span className="hire-indicator mr-2" />
              Sẵn sàng nhận việc
            </strong>

            <p className="contact-text text-body font-light mb-[var(--gutter-small)] leading-relaxed">
              Triết lý sống của tôi là: "Chúng ta là những gì chúng ta lặp đi lặp lại. Vì vậy, sự xuất sắc không phải là một hành động, mà là một thói quen." — Aristotle
            </p>
          </div>

          {/* Right contact form */}
          <form
            name="contact"
            onSubmit={handleSubmit}
            className="contact-form p-[var(--gutter-large)] px-[var(--gutter-small)] bg-bg-secondary flex flex-col justify-between"
          >
            {/* Tiêu đề mail và tên người gửi hiển thị trong hộp thư của bạn */}
            <input type="hidden" name="subject" value="Tin nhắn mới từ Portfolio" />
            <input type="hidden" name="from_name" value="Portfolio Contact Form" />

            {/* Honeypot chống bot: người thật không thấy, bot tự tick thì bị từ chối */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

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
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-cta border-0 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {buttonLabel}
              </button>

              <p
                role="status"
                aria-live="polite"
                className="mt-2 text-[var(--text-small)] text-sub min-h-[1.25rem]"
              >
                {status === 'error' && errorMsg}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
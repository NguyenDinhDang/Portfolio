# 🌌 Nguyễn Đình Đăng — Personal Engineering Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Status-Live%20%26%20Active-00f0ff?style=for-the-badge&logo=statuspage&logoColor=black)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

<p align="center">
  <strong>Kỹ sư Phần mềm | Backend & Distributed Systems | AI & Semantic RAG Pipelines | Creative Web</strong>
</p>

<p align="center">
  <a href="#-tổng-quan--overview">Tổng quan</a> •
  <a href="#-tính-năng-nổi-bật--key-features">Tính năng</a> •
  <a href="#-công-nghệ-sử-dụng--tech-stack">Công nghệ</a> •
  <a href="#-cấu-trúc-thư-mục--project-structure">Cấu trúc</a> •
  <a href="#-cài-đặt--hướng-dẫn-chạy-local">Cài đặt & Khởi chạy</a> •
  <a href="#-dự-án-tiêu-biểu--featured-projects">Dự án</a> •
  <a href="#-liên-hệ--contact">Liên hệ</a>
</p>

---

</div>

## 📖 Tổng quan / Overview

Trang **Portfolio cá nhân** của **Nguyễn Đình Đăng** được thiết kế và phát triển theo phong cách **Modern Cyber-Glass & Anti-Gravity Interaction**.

Trang web không chỉ là một CV trực tuyến mà còn là một minh chứng trực quan cho sự kết hợp giữa **Kỹ thuật Backend chuyên sâu**, **Hệ thống AI / RAG hiện đại** cùng với **Nghệ thuật giao diện tương tác cao cấp (Creative Web / WebGL)**.

---

## ✨ Tính năng nổi bật / Key Features

- 🌐 **Hero 3D Floating Geometry & Particle Field**:
  - Không gian 3D tương tác xây dựng trên **Three.js** với hiệu ứng hạt ánh sáng (Particle Field) phản hồi theo chuyển động chuột và luồng sáng chiều sâu.
- 🧲 **Custom Anti-Gravity Engine (`useAntiGravity`)**:
  - Cơ chế vật lý độc quyền điều hướng các huy hiệu kỹ thuật (Tech Badges) dạt ra hoặc bị hút về khi con trỏ chuột lướt qua.
- 🎡 **3D Coverflow Carousel**:
  - Trình duyệt dự án 3D Coverflow mượt mà với **Embla Carousel** kết hợp **Framer Motion**, hỗ trợ kéo thả cử chỉ, tự động phát và hiệu ứng chiều sâu trục Z.
- ⚡ **Infinite Tech Marquee**:
  - Dải trượt vô tận hiệu năng cao hiển thị toàn bộ hệ sinh thái kỹ năng (Python, FastAPI, Redis, PostgreSQL, Docker, RAG, WebSockets,...).
- 📑 **Chi tiết kiến trúc dự án (In-depth Case Studies)**:
  - Phân tích chi tiết từng bài toán thực tế, giải pháp kiến trúc, sơ đồ dòng dữ liệu, khó khăn kỹ thuật và kết quả đo lường cụ thể.
- 🎯 **Custom Interactive Cursor & Glassmorphism Design**:
  - Con trỏ động tùy biến phản hồi theo từng tương tác, hệ thống màu HSL tinh tế, watermark typography chìm và giao diện Dark Mode tối ưu thị giác.
- 📱 **Tối ưu hóa đa thiết bị & Chuẩn SEO**:
  - Thiết kế thích ứng 100% (Responsive), mượt mà trên Mobile, Tablet và Desktop.

---

## 🛠️ Công nghệ sử dụng / Tech Stack

### Frontend & Visuals
| Lĩnh vực | Công nghệ |
| :--- | :--- |
| **Core Framework** | React 19, TypeScript 6.x |
| **Build Tool** | Vite 8 |
| **3D & Canvas** | Three.js (`three`), Custom WebGL Shaders & Canvas Particles |
| **Animation & Motion** | Framer Motion, Custom Physics Hooks |
| **Carousel / Sliders** | Embla Carousel (`embla-carousel-react`, `embla-carousel-autoplay`) |
| **Iconography** | Lucide Icons, React Icons (Simple Icons) |
| **Styling** | Vanilla CSS Token System, Custom Utility Classes (`clsx`, `tailwind-merge`) |
| **Routing** | React Router DOM v7 |

### Backend & AI Stack (Được trình bày trong các dự án)
- **Languages / Frameworks**: Python, FastAPI, TypeScript, Node.js
- **Database & Storage**: PostgreSQL, pgvector, Redis, ChromaDB, FAISS
- **AI & RAG**: Semantic Chunking, LangChain, OpenAI API, Gemini Pro, Hybrid Search (Dense + BM25)
- **DevOps & Tooling**: Docker, Git, WebSockets, Linux

---

## 📂 Cấu trúc thư mục / Project Structure

```text
Portfolio/
├── public/                     # Static assets (images, icons, favicon)
├── src/
│   ├── assets/                 # Hình ảnh, vector icons nội bộ
│   ├── components/             # Reusable UI & Motion Components
│   │   ├── motion/             # Hiệu ứng chuyển động & 3D
│   │   │   ├── CoverflowCarousel.tsx  # 3D Coverflow Showcase
│   │   │   ├── HeroFloating.tsx       # Không gian nổi 3D Three.js + Badges
│   │   │   ├── Marquee.tsx            # Dải chạy công nghệ vô tận
│   │   │   ├── ParticleField.tsx      # Hệ thống hạt tương tác WebGL
│   │   │   ├── PowerPointBadgeGroup.tsx
│   │   │   ├── RevealSection.tsx      # Khung hiển thị kèm Watermark
│   │   │   └── motionVariants.ts      # Cấu hình Animation Framer Motion
│   │   ├── ui/                 # Reusable Base Components (Button, Badge, TechIcon, ...)
│   │   ├── CustomCursor.tsx    # Con trỏ chuột tương tác tuỳ biến
│   │   ├── Footer.tsx          # Chân trang & Thông tin bản quyền
│   │   ├── Hero.tsx            # Component Hero chính
│   │   └── Navbar.tsx          # Thanh điều hướng với Glassmorphism
│   ├── data/
│   │   └── projects.ts         # Dữ liệu dự án, bài toán & kiến trúc hệ thống
│   ├── hooks/
│   │   └── useAntiGravity.ts   # Custom Hook xử lý lực đẩy vật lý Anti-Gravity
│   ├── lib/
│   │   └── utils.ts            # Utility functions (cn, formatters, ...)
│   ├── pages/                  # Các trang chính của ứng dụng
│   │   ├── About.tsx           # Trang Giới thiệu & Triết lý kỹ thuật
│   │   ├── Contact.tsx         # Trang Liên hệ & Kết nối công việc
│   │   ├── Experience.tsx      # Lộ trình học vấn & Kinh nghiệm làm việc
│   │   ├── Home.tsx            # Trang chủ tổng quan
│   │   ├── ProjectDetail.tsx   # Trang phân tích kiến trúc chi tiết từng dự án
│   │   └── Work.tsx            # Danh mục toàn bộ các dự án
│   ├── types/                  # TypeScript Interface & Type Definitions
│   ├── App.css
│   ├── App.tsx                 # Router & Root Layout
│   ├── index.css               # Design System Variables & Base CSS
│   └── main.tsx                # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Cài đặt & Hướng dẫn chạy Local

### Yêu cầu hệ thống:
- **Node.js**: Phiên bản `>= 18.x` (Khuyến nghị 20.x trở lên)
- **npm** hoặc **yarn** / **pnpm**

### Các bước thực hiện:

1. **Clone repository về máy**:
   ```bash
   git clone https://github.com/NguyenDinhDang/Portfolio.git
   cd Portfolio
   ```

2. **Cài đặt các gói phụ thuộc (Dependencies)**:
   ```bash
   npm install
   ```

3. **Khởi chạy môi trường phát triển (Development Server)**:
   ```bash
   npm run dev
   ```
   > Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5173/`

4. **Kiểm tra cú pháp & Type Check**:
   ```bash
   npm run lint
   ```

5. **Build phiên bản Production**:
   ```bash
   npm run build
   ```
   > Kết quả đóng gói được xuất ra thư mục `dist/`.

6. **Chạy thử bản Preview Production**:
   ```bash
   npm run preview
   ```

---

## 💡 Dự án tiêu biểu / Featured Projects

| Dự án | Lĩnh vực | Điểm nổi bật & Công nghệ |
| :--- | :--- | :--- |
| **[LearnOS](https://github.com/NguyenDinhDang/LearnOS)** | AI / RAG Platform | Nền tảng xử lý tri thức thông minh, Semantic Chunking, Vector Search (`pgvector`, `FastAPI`, `Gemini API`) |
| **[DevFlow](https://github.com/NguyenDinhDang/DevFlow)** | Backend & Distributed Systems | Động cơ giám sát viễn trắc theo thời gian thực (`FastAPI`, `Redis Pub/Sub`, `WebSockets`, `PostgreSQL`) |
| **[NeuroVector RAG](https://github.com/NguyenDinhDang/NeuroVector)** | AI / Semantic Search | Dịch vụ truy xuất ngữ nghĩa tài liệu kỹ thuật độ trễ thấp (`ChromaDB`, `FAISS`, `LangChain`, `OpenAI`) |
| **Anti-Gravity Portfolio** | Creative Web & 3D | Giao diện hiệu năng cao ứng dụng vật lý hạt 3D và tương tác không trọng lực (`Three.js`, `Framer Motion`) |

---

## 📬 Liên hệ / Connect With Me

- 👤 **Họ và tên**: Nguyễn Đình Đăng (Nguyen Dinh Dang)
- 📧 **Email**: [banhvannguyen45@gmail.com](mailto:banhvannguyen45@gmail.com)
- 🐙 **GitHub**: [@NguyenDinhDang](https://github.com/NguyenDinhDang)
- 📍 **Địa điểm**: Việt Nam

---

<div align="center">
  <sub>Được thiết kế và xây dựng với sự tỉ mỉ, niềm đam mê kỹ thuật và tinh thần sáng tạo. © 2026 Nguyễn Đình Đăng.</sub>
</div>

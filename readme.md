portfolio/
│
├── index.html              # Trang chủ
├── about.html              # Giới thiệu
├── projects.html           # Tất cả dự án
├── project-detail.html     # Chi tiết từng dự án
├── experience.html         # Kinh nghiệm / quá trình
├── skills.html             # Kỹ năng & công nghệ
├── blog.html               # Blog / bài viết
├── contact.html             # Liên hệ
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── models/
│
├── css/
│   ├── variables.css       # màu, font, spacing
│   ├── reset.css
│   ├── global.css
│   ├── navbar.css
│   ├── footer.css
│   ├── animations.css
│   ├── home.css
│   ├── about.css
│   ├── projects.css
│   ├── experience.css
│   ├── skills.css
│   ├── blog.css
│   └── contact.css
│
└── js/
    ├── main.js
    ├── navigation.js
    ├── animations.js
    ├── three-scene.js
    ├── cursor.js
    └── pages/
        ├── home.js
        ├── projects.js
        └── project-detail.js
01 — HOME
/index.html

Đây phải là trang ấn tượng nhất.

┌──────────────────────────────────────────┐
│ NAVBAR                                   │
│ N.     Trang chủ  Giới thiệu  Dự án ... │
├──────────────────────────────────────────┤
│                                          │
│  BACKEND DEVELOPER        THREE.JS       │
│                                          │
│  Xin chào!                               │
│  Mình là                                  │
│  ĐẶNG ĐÌNH NGUYỄN                         │
│                                          │
│  Backend Developer                       │
│                                          │
│  [Xem dự án] [Liên hệ]        ◉ 3D       │
│                                          │
├──────────────────────────────────────────┤
│ GIỚI THIỆU                               │
│                                          │
│ Ảnh cá nhân       Hành trình của mình    │
│                    ↓                     │
│                    text                  │
├──────────────────────────────────────────┤
│                                          │
│             CÔNG NGHỆ                    │
│                                          │
│ Python FastAPI PostgreSQL Docker Git     │
│                                          │
├──────────────────────────────────────────┤
│ DỰ ÁN NỔI BẬT                            │
│                                          │
│ ┌────────────────┐ ┌─────────────────┐  │
│ │                │ │                 │  │
│ │   LearnOS      │ │    DevFlow      │  │
│ │                │ │                 │  │
│ └────────────────┘ └─────────────────┘  │
├──────────────────────────────────────────┤
│                                          │
│        SẴN SÀNG XÂY DỰNG?               │
│             [Liên hệ]                    │
│                                          │
└──────────────────────────────────────────┘
Three.js chỉ nên xuất hiện mạnh ở đây.

Ví dụ:

                 ●
            ╱         ╲
       Python          SQL
          ╲             ╱
            ◉ 3D CORE
          ╱   THREE.JS  ╲
     FastAPI          Docker

Không cần làm quả cầu 3D quá phức tạp.

Mục tiêu: người xem vào trang → thấy ngay bạn là developer → thấy một visual 3D có chủ đích → muốn scroll tiếp.

02 — ABOUT
/about.html

Trang này không cần Three.js.

Thay vì:

Tôi là sinh viên CNTT...

hãy biến nó thành một câu chuyện.

ABOUT ME

Tôi thích xây dựng những thứ
giải quyết vấn đề thật.

────────────────────────────

[ẢNH LỚN]

                    01
                    HỌC TẬP

                    02
                    BACKEND

                    03
                    RESEARCH

────────────────────────────

MY JOURNEY

2023
│
├── Bắt đầu học lập trình
│
2024
│
├── OOP / DSA / Database
│
2025
│
├── Backend Development
│
2026
│
└── AI / RAG / FastAPI

Có thể thêm một section:

"What I believe"

Code không chỉ là viết những dòng lệnh.
Nó là cách biến một ý tưởng thành thứ có thể sử dụng được.

Phần này giúp portfolio có cá tính hơn rất nhiều.

03 — PROJECTS
/projects.html

Đây sẽ là trang rất quan trọng đối với Backend Developer.

SELECTED WORK

Những thứ mình đã xây dựng.

────────────────────────────

FILTER

ALL   BACKEND   AI   WEB

────────────────────────────

┌──────────────────────────────────┐
│                                  │
│          LEARNOS                 │
│                                  │
│      [ảnh / screenshot]          │
│                                  │
│ FastAPI · PostgreSQL · React     │
│                                  │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│                                  │
│          DEVFLOW                 │
│                                  │
│      [ảnh / screenshot]          │
│                                  │
└──────────────────────────────────┘

Ở đây có thể làm hover animation:

normal

┌─────────────────────┐
│                     │
│      LearnOS        │
│                     │
└─────────────────────┘


hover

┌─────────────────────┐
│       LearnOS       │
│                     │
│   VIEW PROJECT →    │
│                     │
│ FastAPI PostgreSQL  │
└─────────────────────┘
04 — PROJECT DETAIL
/project-detail.html

Đây là trang mình rất khuyên có.

Ví dụ:

LEARNOS

AI Learning Assistant

────────────────────────────

[ HERO SCREENSHOT LỚN ]

────────────────────────────

OVERVIEW

LearnOS là...

────────────────────────────

PROBLEM

...

────────────────────────────

SOLUTION

...

────────────────────────────

ARCHITECTURE

        React
          │
          ▼
       FastAPI
          │
     ┌────┴────┐
     ▼         ▼
 PostgreSQL   Gemini
     │
     ▼
    RAG

────────────────────────────

TECH STACK

Python
FastAPI
PostgreSQL
React
Gemini
Docker

────────────────────────────

RESULT

...

────────────────────────────

[ VIEW GITHUB ] [ LIVE DEMO ]

Đây mới là nơi thể hiện năng lực Backend thật sự.

Không chỉ khoe screenshot.

05 — EXPERIENCE
/experience.html

Thiết kế giống một timeline editorial:

EXPERIENCE

2026
│
│  Backend Developer
│  ─────────────────────────
│  Building APIs...
│
●
│
2025
│
│  Freelance Developer
│  ─────────────────────────
│  Websites / APIs...
│
●
│
2024
│
│  Learning & Research
│
●

Bên cạnh có thể có:

01
BACKEND

02
DATABASE

03
AI / RAG

04
DEVOPS

Hover từng mục → nội dung thay đổi.

06 — SKILLS
/skills.html

Không nên làm:

Python      ██████████ 90%
Java        ███████ 70%
SQL         ████████ 80%

Nhìn rất template.

Thay bằng:

TECHNOLOGY

BACKEND

┌─────────┐ ┌─────────┐ ┌─────────┐
│ Python  │ │ FastAPI │ │ SQL     │
└─────────┘ └─────────┘ └─────────┘

DATABASE

┌──────────┐ ┌──────────┐
│PostgreSQL│ │  Redis   │
└──────────┘ └──────────┘

TOOLS

┌─────────┐ ┌─────────┐ ┌─────────┐
│ Docker  │ │ Git     │ │ Linux   │
└─────────┘ └─────────┘ └─────────┘

Hover:

FastAPI
────────────

Python web framework
I've used it for:

• REST API
• Async
• SQLAlchemy
• Authentication
• SSE
07 — BLOG
/blog.html

Trang này giúp portfolio nhìn giống portfolio developer thật, thay vì landing page.

THOUGHTS / NOTES

Những thứ mình đang học
và xây dựng.

────────────────────────

01

How I built my first
RAG pipeline

Backend · AI
Aug 2026

READ ARTICLE →


02

Understanding PostgreSQL
for Backend Development

Database
Aug 2026

READ ARTICLE →

Có thể viết về:

FastAPI
PostgreSQL
RAG
Docker
SQL
Backend architecture
Những gì bạn học được khi làm project
08 — CONTACT
/contact.html

Trang cuối nên rất đơn giản.

LET'S WORK TOGETHER

Bạn có một ý tưởng?

Mình muốn nghe nó.

        [ Email ]

        [ GitHub ]

        [ LinkedIn ]

────────────────────────

ĐẶNG ĐÌNH NGUYỄN

Backend Developer

Vietnam

Có thể dùng Three.js rất nhẹ ở background:

       ·
           ·

    ·        ◉       ·

         ·       ·

    ·             ·

Các particle chuyển động chậm.

🎨 Design System chung

Điểm quan trọng nhất là tất cả các trang phải giống cùng một website.

Màu
--background: #f8f9fc;
--surface: #ffffff;
--text: #111827;
--text-muted: #667085;

--primary: #2563eb;
--secondary: #60a5fa;
--accent: #ff7a59;

--border: #e6e8ee;

Có thể thêm gradient cực nhẹ:

#E8F1FF → #FFFFFF → #FFF1EB

Không dùng gradient tím/xanh kiểu AI SaaS.

🧊 Three.js nên dùng thế nào?

Mình không khuyên nhét Three.js vào mọi trang.

Home

3D Hero

        Python
          \
           \
        [ 3D ]
       /      \
 FastAPI     SQL
       \      /
       Docker
Project Detail

Có thể có:

Interactive Architecture

Người dùng rê chuột → các node backend chuyển động.

             React
               │
               ▼
            FastAPI
          ╱    │    ╲
         ▼     ▼     ▼
      Redis PostgreSQL Gemini
Contact

Particle background rất nhẹ.
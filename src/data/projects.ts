import type { ProjectItem } from '../types';

export const projects: ProjectItem[] = [
  {
    id: 'crush',
    title: 'Landing page Tỏ tình',
    description: 'Tỏ tình với cô gái tôi yêu',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://nguyendinhdang.github.io/Crush/',
    githubUrl: 'https://github.com/nguyendinhdang/Crush',
    imageSrc: 'assets/images/work/portfolio-template.webp',
    imageAlt: 'portfolio template',
  },
  {
    id: 'website-ai',
    title: 'Education Website',
    description: 'WebsiteAI',
    technologies: ['React', 'FastAPI', 'Material UI', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://website-ai-liard.vercel.app/',
    githubUrl: 'http://github.com/nguyendinhdang',
    imageSrc: 'assets/images/work/websiteai.webp.png',
    imageAlt: 'Education Website',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Website',
    description: 'Một trang web thương mại điện tử chuyên bán các mặt hàng công nghệ',
    technologies: ['NextJS', 'Tailwind CSS', 'Material UI'],
    liveUrl: 'https://e-commerce-zeta-three-94.vercel.app/',
    githubUrl: 'https://github.com/NguyenDinhDang/TKW-DA25TTD-110125113-E-Commerce.git',
    imageSrc: 'assets/images/work/ecommece.png',
    imageAlt: 'e-commerce',
  },
];

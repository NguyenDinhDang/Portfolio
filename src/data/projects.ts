import type { ProjectItem } from '../types';

export const projects: ProjectItem[] = [
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
  {
    id: 'data-analysis',
    title: 'Data analysis',
    description: 'Hệ thống bóc tách số liệu và phân tích dữ liệu từ khảo sát để nghiên cứu và đưa ra các quyết định kinh doanh chính xác hơn',
    technologies: ['Python', 'Streamlit', 'Mathplotlib', 'Pandas', 'NumPy', 'Seaborn'],
    liveUrl: '#',
    githubUrl: 'https://github.com/NguyenDinhDang',
    imageSrc: 'assets/images/work/Phan_tich.png',
    imageAlt: 'Data analysis',
  },
];

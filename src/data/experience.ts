import type { ExperienceItem } from '../types';

export const experiences: ExperienceItem[] = [
  {
    period: '2026 — Present',
    role: 'Backend & Systems Engineer',
    company: 'Talent Store',
    location: 'Vietnam',
    description: 'Engineering core backend microservices, high-performance database schema architectures, and asynchronous data processing pipelines for talent matching and management platforms.',
    contributions: [
      'Architected and deployed asynchronous RESTful API services using FastAPI and PostgreSQL, reducing peak endpoint response times by 38%.',
      'Implemented Redis caching strategies and connection pooling with asyncpg to support burst traffic loads.',
      'Designed vector search pipelines for talent skill retrieval using pgvector and embedding similarity search.'
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'Docker', 'Git']
  },
  {
    period: '2025 — 2026',
    role: 'Freelance Software & AI Engineer',
    company: 'Independent Consulting',
    location: 'Remote',
    description: 'Delivered bespoke web applications, automated business data pipelines, and customized AI / LLM assistant integrations for small and medium enterprises.',
    contributions: [
      'Built and shipped 6+ custom software applications including RAG-powered internal documentation search engines.',
      'Integrated payment gateways, authentication layers (OAuth2/JWT), and real-time WebSocket communication channels.',
      'Automated deployment lifecycles using Docker containers and cloud platforms (Railway, Render, Vercel).'
    ],
    technologies: ['Python', 'FastAPI', 'Next.js', 'React', 'PostgreSQL', 'LangChain', 'OpenAI API']
  },
  {
    period: '2023 — 2025',
    role: 'Computer Science & Systems Research',
    company: 'Academic & Applied Engineering',
    location: 'Vietnam',
    description: 'Intensive deep dive into Data Structures & Algorithms, Object-Oriented Design, Database Internals, Operating Systems, and Distributed Computing principles.',
    contributions: [
      'Mastered algorithmic problem solving, time/space complexity optimization, and memory management fundamentals.',
      'Built experimental distributed key-value store prototypes and custom WebSocket message brokers from scratch.',
      'Authored technical deep-dives on RAG optimization, vector indexing algorithms, and modern asynchronous Python.'
    ],
    technologies: ['C++', 'Python', 'SQL', 'Data Structures', 'Algorithms', 'Linux', 'Network Protocols']
  }
];

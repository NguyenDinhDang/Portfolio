import type { SkillCategory, AiWorkflowStep } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    tagline: 'High-throughput APIs, asynchronous microservices, and distributed architecture',
    skills: [
      { name: 'Python', level: 'Core' },
      { name: 'FastAPI', level: 'Specialist' },
      { name: 'Django / Flask', level: 'Advanced' },
      { name: 'AsyncIO & Concurrency', level: 'Advanced' },
      { name: 'REST & gRPC APIs', level: 'Specialist' },
      { name: 'WebSockets & SSE', level: 'Advanced' },
      { name: 'Celery / Background Tasks', level: 'Proficient' }
    ]
  },
  {
    id: 'database',
    title: 'Database & Storage',
    tagline: 'Schema design, indexing strategies, vector stores, and caching layers',
    skills: [
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'pgvector', level: 'Specialist' },
      { name: 'SQLAlchemy / Alembic', level: 'Advanced' },
      { name: 'Redis Caching & PubSub', level: 'Advanced' },
      { name: 'Query Optimization & Indexing', level: 'Advanced' },
      { name: 'MongoDB', level: 'Proficient' }
    ]
  },
  {
    id: 'ai-rag',
    title: 'AI & RAG Systems',
    tagline: 'Semantic retrieval pipelines, embeddings, prompt engineering, and LLM integration',
    skills: [
      { name: 'RAG Pipeline Architecture', level: 'Specialist' },
      { name: 'Vector Databases (Chroma / FAISS)', level: 'Advanced' },
      { name: 'Semantic Chunking & Embedding', level: 'Advanced' },
      { name: 'LangChain & LlamaIndex', level: 'Proficient' },
      { name: 'LLM APIs (OpenAI / Gemini)', level: 'Specialist' },
      { name: 'Hybrid Re-ranking (BM25 + Dense)', level: 'Advanced' }
    ]
  },
  {
    id: 'frontend-creative',
    title: 'Frontend & Creative Development',
    tagline: 'Modern React component trees, strict TypeScript, physics animation, and 3D scenes',
    skills: [
      { name: 'React 19', level: 'Advanced' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'Three.js & WebGL', level: 'Proficient' },
      { name: 'AntiGravity Physics (Euler)', level: 'Specialist' },
      { name: 'CSS Tokens & Layout Architecture', level: 'Specialist' },
      { name: 'Vite & Modern Tooling', level: 'Advanced' }
    ]
  },
  {
    id: 'devops-infra',
    title: 'DevOps & Deployment',
    tagline: 'Containerization, Linux administration, CI/CD automation, and cloud delivery',
    skills: [
      { name: 'Docker & Compose', level: 'Advanced' },
      { name: 'Linux / Shell Scripting', level: 'Advanced' },
      { name: 'Git & GitHub Workflows', level: 'Advanced' },
      { name: 'CI/CD Pipelines', level: 'Proficient' },
      { name: 'Cloud Deploy (Render, Railway, Vercel)', level: 'Advanced' },
      { name: 'Postman & API Documentation', level: 'Specialist' }
    ]
  }
];

export const aiWorkflowSteps: AiWorkflowStep[] = [
  {
    number: '01',
    phase: 'Problem Decomposition',
    title: 'Domain & Constraint Analysis',
    aiRole: 'Expands edge-case scenarios and maps potential dependency conflicts',
    humanRole: 'Defines business goals, architectural trade-offs, and critical system boundaries',
    keyOutcome: 'Clear specifications before writing any code'
  },
  {
    number: '02',
    phase: 'Architecture Design',
    title: 'System & Schema Modeling',
    aiRole: 'Generates prototype interface candidates and comparative benchmark queries',
    humanRole: 'Decides datastore normalization, concurrency models, and security boundaries',
    keyOutcome: 'Validated database schemas and API contract blueprints'
  },
  {
    number: '03',
    phase: 'AI-Assisted Acceleration',
    title: 'Boilerplate & Test Generation',
    aiRole: 'Synthesizes repetitive CRUD endpoints, mock fixtures, and unit test suites',
    humanRole: 'Implements core business logic, performance critical algorithms, and security audits',
    keyOutcome: 'High test coverage with zero blind copy-pasting'
  },
  {
    number: '04',
    phase: 'Rigorous Verification',
    title: 'Debugging, Benchmarking & QA',
    aiRole: 'Analyzes error logs, suggests regex patterns, and assists in profiling traces',
    humanRole: 'Validates memory footprints, checks 60 FPS rendering, and enforces production readiness',
    keyOutcome: 'Battle-tested, deployable software with full human accountability'
  }
];

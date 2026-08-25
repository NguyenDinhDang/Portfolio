export interface Project {
  slug: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  problem: string;
  approach: string;
  architecture: string[];
  difficulties?: string;
  outcome: string;
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  tagline: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location?: string;
  description: string;
  contributions: string[];
  technologies: string[];
}

export interface AiWorkflowStep {
  number: string;
  phase: string;
  title: string;
  aiRole: string;
  humanRole: string;
  keyOutcome: string;
}

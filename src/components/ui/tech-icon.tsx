import React from 'react';
import {
  SiPython,
  SiFastapi,
  SiDjango,
  SiFlask,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiDocker,
  SiLinux,
  SiGithub,
  SiReact,
  SiTypescript,
  SiThreedotjs,
  SiVite,
  SiCelery,
  SiPostman,
  SiVercel,
} from 'react-icons/si';
import { Cpu, Bot } from 'lucide-react';

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  size = 16,
  className,
  color,
}) => {
  const normalized = name.toLowerCase();

  if (normalized.includes('python')) return <SiPython size={size} className={className} color={color} />;
  if (normalized.includes('fastapi')) return <SiFastapi size={size} className={className} color={color} />;
  if (normalized.includes('django')) return <SiDjango size={size} className={className} color={color} />;
  if (normalized.includes('flask')) return <SiFlask size={size} className={className} color={color} />;
  if (normalized.includes('postgres') || normalized.includes('pgvector')) return <SiPostgresql size={size} className={className} color={color} />;
  if (normalized.includes('redis')) return <SiRedis size={size} className={className} color={color} />;
  if (normalized.includes('mongo')) return <SiMongodb size={size} className={className} color={color} />;
  if (normalized.includes('docker')) return <SiDocker size={size} className={className} color={color} />;
  if (normalized.includes('linux')) return <SiLinux size={size} className={className} color={color} />;
  if (normalized.includes('git')) return <SiGithub size={size} className={className} color={color} />;
  if (normalized.includes('react')) return <SiReact size={size} className={className} color={color} />;
  if (normalized.includes('typescript')) return <SiTypescript size={size} className={className} color={color} />;
  if (normalized.includes('three.js') || normalized.includes('threejs')) return <SiThreedotjs size={size} className={className} color={color} />;
  if (normalized.includes('vite')) return <SiVite size={size} className={className} color={color} />;
  if (normalized.includes('openai') || normalized.includes('llm') || normalized.includes('gemini')) {
    return <Bot size={size} className={className} color={color} />;
  }
  if (normalized.includes('celery')) return <SiCelery size={size} className={className} color={color} />;
  if (normalized.includes('postman')) return <SiPostman size={size} className={className} color={color} />;
  if (normalized.includes('vercel')) return <SiVercel size={size} className={className} color={color} />;

  return <Cpu size={size} className={className} color={color} />;
};

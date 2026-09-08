export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl?: string;
  imageSrc: string;
  imageAlt: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  authorName: string;
  authorJob: string;
  authorImg: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  description: string;
  url: string;
  reactionCount: number;
  isFeatured?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  imgSrc: string;
  title: string;
}

export interface SocialLinkItem {
  id: string;
  title: string;
  url: string;
  iconSrc: string;
}

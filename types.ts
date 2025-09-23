
export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

export interface ProjectItem {
  title: string;
  period: string;
  description: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

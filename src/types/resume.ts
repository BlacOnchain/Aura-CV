export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string; // e.g. "Remote", "Lagos, Nigeria", "Full-time"
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  descriptionBullets: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  subtitle?: string; // e.g. "Academic Project", "Progressive Web App"
  startDate: string;
  endDate: string;
  link?: string;
  descriptionBullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  gpaOrGrade?: string;
  courseworkBullets: string[];
}

export interface SkillCategory {
  id: string;
  categoryName: string; // e.g. "PHP & Laravel Frameworks", "MySQL Database Architecture"
  skillsList: string[]; // e.g. ["PHP", "Laravel", "REST APIs"]
  description?: string; // e.g. "Server-side application development, secure API architectures..."
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer?: string;
  date?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency?: string;
}

export type TemplateStyle =
  | 'executive'
  | 'modern-tech'
  | 'classic'
  | 'sidebar'
  | 'flow-moderna'
  | 'flow-compact'
  | 'flow-nordic'
  | 'flow-creative'
  | 'service-modern'
  | 'clinical-minimal'
  | 'creative-bold'
  | 'impact-hospitality'
  | 'modern-academic';

export type FontFamily = 'sans' | 'serif' | 'mono';
export type FontSize = 'small' | 'medium' | 'large';
export type PageLayoutMode = 'multi-page' | 'continuous';
export type PageMargin = 'compact' | 'normal' | 'spacious';

export interface ResumeSettings {
  template: TemplateStyle;
  accentColor: string;
  fontFamily: FontFamily;
  fontSize?: FontSize;
  compactSpacing: boolean;
  pageLayoutMode?: PageLayoutMode;
  pageMargin?: PageMargin;
  showProjects: boolean;
  showCertifications: boolean;
  showLanguages: boolean;
  showReferences: boolean;
}

export interface ResumeData {
  id?: string;
  title?: string;
  personal: PersonalInfo;
  summary: string;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  referencesText: string;
  settings: ResumeSettings;
}

export interface SavedResume {
  id: string;
  name: string;
  targetRole: string;
  lastModified: number;
  data: ResumeData;
}


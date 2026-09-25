import { useEffect } from 'react';

export interface ViewMetadata {
  title: string;
  description: string;
  image: string;
}

const METADATA_MAP: Record<string, ViewMetadata> = {
  landing: {
    title: 'AuraCV Studio — Precision Resume Builder & ATS Job Studio',
    description: 'Precision resume engineering with live A4 page budget meter, ATS keyword optimizer, multi-palette designer styling, and LinkedIn/PDF import.',
    image: '/og-image.jpg'
  },
  editor: {
    title: 'Resume Editor & A4 Live Preview — AuraCV Studio',
    description: 'Design and polish your resume in real time with Google XYZ formula guidance and strict A4 page budget enforcement.',
    image: '/og-bullet.jpg'
  },
  'ats-scanner': {
    title: 'ATS Recruiter Match Scanner & Audit — AuraCV Studio',
    description: 'Scan your resume against target job descriptions and eliminate keyword gaps for Workday and Greenhouse ATS.',
    image: '/og-ats.jpg'
  },
  'ai-tools': {
    title: 'Executive AI Writing Suite & XYZ Enhancer — AuraCV Studio',
    description: 'Transform passive task descriptions into quantified executive impact statements and generate tailored summaries.',
    image: '/og-bullet.jpg'
  },
  'cover-letter': {
    title: 'Executive Cover Letter Architect — AuraCV Studio',
    description: 'Generate matching typography and persuasive cover letters tailored to your target company and role.',
    image: '/og-image.jpg'
  },
  import: {
    title: 'Import LinkedIn & PDF Resume — AuraCV Studio',
    description: 'Effortlessly convert your LinkedIn profile or existing PDF resume into clean, structured career data.',
    image: '/og-image.jpg'
  },
  database: {
    title: 'Cloud Persistence & Database Sync — AuraCV Studio',
    description: 'Manage SQL backups, database schemas, and multi-session persistence for your career documents.',
    image: '/og-image.jpg'
  },
  account: {
    title: 'User Account & Session Security — AuraCV Studio',
    description: 'Manage your AuraCV authentication credentials and session security settings.',
    image: '/og-image.jpg'
  },
  '404': {
    title: 'Page Not Found (404) — AuraCV Studio',
    description: 'The requested studio document or route was not found. Return to AuraCV Studio.',
    image: '/og-image.jpg'
  }
};

export function useDocumentMetadata(viewKey: string) {
  useEffect(() => {
    const meta = METADATA_MAP[viewKey] || METADATA_MAP.landing;

    // Document Title
    document.title = meta.title;

    // Helper to safely set or create meta tag
    const setMetaTag = (selector: string, attribute: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Standard meta description
    setMetaTag('meta[name="description"]', 'name', 'description', meta.description);

    // OpenGraph
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', meta.image);

    // Twitter
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', meta.image);
  }, [viewKey]);
}

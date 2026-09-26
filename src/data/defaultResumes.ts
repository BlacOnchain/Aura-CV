import { ResumeData } from '../types/resume';

export interface ResumePresetOption {
  id: string;
  name: string;
  role: string;
  category: 'Tech' | 'Product' | 'Data' | 'Design' | 'Finance' | 'Service' | 'Education' | 'Admin' | 'Blank';
  description: string;
  data: ResumeData;
}

export const SOFTWARE_ENGINEER_RESUME: ResumeData = {
  personal: {
    fullName: 'Alex Rivera',
    title: 'Senior Full Stack Software Engineer',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA / Remote',
    portfolioUrl: 'alexrivera.dev',
    githubUrl: 'github.com/alexrivera-dev',
    linkedinUrl: 'linkedin.com/in/alexrivera-tech',
    twitterUrl: '',
  },
  summary:
    'Innovative Senior Full Stack Engineer with 6+ years of experience architecting high-throughput distributed systems, modern web applications, and resilient cloud architectures. Proven track record leading engineering squads to scale microservices handling 25M+ monthly requests with 99.98% uptime. Deeply proficient in TypeScript, React, Node.js, PostgreSQL, and AWS, with a relentless focus on clean architecture and ATS-optimized engineering impact.',
  experiences: [
    {
      id: 'exp-1',
      role: 'Staff / Lead Software Engineer',
      company: 'Apex Cloud Solutions',
      location: 'San Francisco, CA (Remote)',
      startDate: '03/2023',
      endDate: 'Present',
      isCurrent: true,
      descriptionBullets: [
        'Architected a next-generation event-driven microservices platform processing 25M+ daily requests, decreasing server latency by 42%.',
        'Led a frontend migration to React 19, TypeScript, and Next.js, boosting Core Web Vitals performance score from 68 to 96.',
        'Mentored 8 full-stack engineers across code reviews, system design sessions, and test-driven development (TDD) best practices.',
        'Implemented zero-downtime CI/CD deployment pipelines using GitHub Actions, Docker, and Kubernetes on AWS ECS.',
      ],
    },
    {
      id: 'exp-2',
      role: 'Full Stack Software Engineer',
      company: 'Vanguard FinTech Labs',
      location: 'New York, NY',
      startDate: '06/2020',
      endDate: '02/2023',
      isCurrent: false,
      descriptionBullets: [
        'Engineered compliant real-time payment reconciliation services in Node.js and PostgreSQL managing $120M+ in annual transaction volume.',
        'Designed caching layers with Redis and database indexing that slashed SQL query bottlenecks by 65% during peak trading hours.',
        'Collaborated with product managers and security teams to achieve SOC2 Type II compliance and implement OAuth2/JWT authentication.',
      ],
    },
    {
      id: 'exp-3',
      role: 'Software Engineer',
      company: 'Hyperion Data Systems',
      location: 'Austin, TX',
      startDate: '08/2018',
      endDate: '05/2020',
      isCurrent: false,
      descriptionBullets: [
        'Built interactive data visualization dashboards using React and D3.js, adopted by 40,000+ enterprise customers.',
        'Developed RESTful and GraphQL APIs in Node.js/Express with 99.95% uptime and automated integration testing via Jest and Cypress.',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OmniStream DevTools',
      subtitle: 'Open Source Distributed Tracing Library',
      startDate: '01/2024',
      endDate: 'Present',
      link: 'github.com/alexrivera-dev/omnistream',
      descriptionBullets: [
        'Engineered an open-source telemetry tracer with over 3,200 GitHub stars and 150,000 npm downloads.',
        'Achieved sub-millisecond trace overhead across Node.js, Go, and Python runtimes.',
      ],
    },
    {
      id: 'proj-2',
      name: 'PulseFlow Metrics',
      subtitle: 'Real-Time Edge Analytics Platform',
      startDate: '04/2023',
      endDate: '10/2023',
      link: 'pulseflow-demo.io',
      descriptionBullets: [
        'Created a serverless time-series metrics aggregator leveraging Cloudflare Workers, ClickHouse, and React.',
        'Processes up to 10,000 ingestion events per second with real-time websocket alert delivery.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2014',
      endDate: '2018',
      gpaOrGrade: '3.85 GPA - Magna Cum Laude',
      courseworkBullets: [
        'Coursework: Distributed Systems, Advanced Algorithms & Data Structures, Database Architecture, Machine Learning, Operating Systems.',
        'Undergraduate Research: High-concurrency lock-free data structures in modern distributed databases.',
      ],
    },
  ],
  skillCategories: [
    {
      id: 'skill-1',
      categoryName: 'Languages & Core Systems',
      skillsList: ['TypeScript', 'JavaScript (ES6+)', 'Node.js', 'Python', 'Go (Golang)', 'SQL', 'HTML5/CSS3'],
      description: 'Production-grade backend systems, asynchronous concurrency, and typed software development.',
    },
    {
      id: 'skill-2',
      categoryName: 'Frameworks & Frontend Architecture',
      skillsList: ['React', 'Next.js', 'Express.js', 'Tailwind CSS', 'Redux Toolkit', 'GraphQL', 'RESTful APIs'],
      description: 'Modern component-driven web architectures, state management, and responsive interface design.',
    },
    {
      id: 'skill-3',
      categoryName: 'Databases & Infrastructure',
      skillsList: ['PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS (S3, ECS, RDS)', 'Git & GitHub', 'CI/CD Pipelines'],
      description: 'Relational data modeling, in-memory caching, container orchestration, and cloud infrastructure.',
    },
    {
      id: 'skill-4',
      categoryName: 'Engineering Practices & Quality',
      skillsList: ['System Architecture', 'Microservices', 'Test-Driven Development (Jest/Cypress)', 'Agile/Scrum', 'API Security'],
      description: 'Scalable system design, automated testing, continuous integration, and secure API design.',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services (AWS)',
      date: '2023',
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Application Developer (CKAD)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      date: '2022',
    },
  ],
  languages: [
    {
      id: 'lang-1',
      language: 'English',
      proficiency: 'Native / Bilingual',
    },
    {
      id: 'lang-2',
      language: 'Spanish',
      proficiency: 'Professional Working',
    },
  ],
  referencesText: 'Available upon request.',
  settings: {
    template: 'executive',
    accentColor: '#1e293b',
    fontFamily: 'sans',
    compactSpacing: false,
    showProjects: true,
    showCertifications: true,
    showLanguages: true,
    showReferences: true,
  },
};

export const PRODUCT_MANAGER_RESUME: ResumeData = {
  personal: {
    fullName: 'Sarah L. Chen',
    title: 'Lead Technical Product Manager',
    email: 'sarah.chen@example.com',
    phone: '+1 (555) 890-1234',
    location: 'Seattle, WA / Remote',
    portfolioUrl: 'sarahchenproduct.com',
    linkedinUrl: 'linkedin.com/in/sarah-chen-pm',
    githubUrl: '',
    twitterUrl: '',
  },
  summary:
    'Strategic Lead Technical Product Manager with 7+ years of experience leading cross-functional teams to build, launch, and monetize enterprise SaaS and consumer platforms. Proven history scaling products from 0 to 1 and driving $18M in ARR growth through data-driven roadmapping, rigorous user research, and Agile sprint execution.',
  experiences: [
    {
      id: 'pm-exp-1',
      role: 'Lead Technical Product Manager',
      company: 'Horizon SaaS Technologies',
      location: 'Seattle, WA',
      startDate: '01/2022',
      endDate: 'Present',
      isCurrent: true,
      descriptionBullets: [
        'Owned core monetization and subscription platform, increasing customer lifetime value (LTV) by 28% and driving $8.4M in incremental ARR.',
        'Led discovery and development of AI-driven workflow features with 9 engineers and 2 UX designers, resulting in 44% adoption within 90 days.',
        'Instituted quantitative product analytics frameworks using Mixpanel and SQL to track funnel drop-off, improving onboarding conversion by 19%.',
      ],
    },
    {
      id: 'pm-exp-2',
      role: 'Senior Product Manager',
      company: 'Starlight Commerce',
      location: 'San Francisco, CA',
      startDate: '04/2019',
      endDate: '12/2021',
      isCurrent: false,
      descriptionBullets: [
        'Launched B2B marketplace seller portal, onboarding 12,000+ active merchants within the first six months of general availability.',
        'Formulated 12-month product roadmaps aligned with C-suite revenue OKRs and communicated sprint priorities to global stakeholders.',
      ],
    },
  ],
  projects: [
    {
      id: 'pm-proj-1',
      name: 'Enterprise Self-Serve Analytics Hub',
      subtitle: 'B2B SaaS Data Platform',
      startDate: '03/2023',
      endDate: '11/2023',
      link: 'sarahchenproduct.com/case-study',
      descriptionBullets: [
        'Conducted 45 customer interviews and synthesized telemetry metrics to redesign enterprise reporting dashboards.',
        'Decreased support ticket volume regarding custom exports by 52%.',
      ],
    },
  ],
  education: [
    {
      id: 'pm-edu-1',
      degree: 'B.S. in Computer Science & Business Management',
      institution: 'University of Washington',
      location: 'Seattle, WA',
      startDate: '2013',
      endDate: '2017',
      gpaOrGrade: '3.90 GPA',
      courseworkBullets: [
        'Specialization: Product Strategy, Human-Computer Interaction, Relational Database Systems, Microeconomics.',
      ],
    },
  ],
  skillCategories: [
    {
      id: 'pm-skill-1',
      categoryName: 'Product Strategy & Discovery',
      skillsList: ['Product Roadmapping', 'User Research', 'A/B Testing', 'Customer Journey Mapping', 'Go-to-Market (GTM) Strategy', 'Competitive Analysis'],
      description: 'Strategic planning, data-driven hypotheses, user interviews, and product lifecycle management.',
    },
    {
      id: 'pm-skill-2',
      categoryName: 'Technical & Analytical Competencies',
      skillsList: ['SQL & Data Modeling', 'Mixpanel / Amplitude', 'API Systems Design', 'Tableau', 'Jira / Confluence', 'Google Analytics 4'],
      description: 'Deep quantitative analysis, schema understanding, and technical requirement specifications (PRDs).',
    },
    {
      id: 'pm-skill-3',
      categoryName: 'Execution & Leadership',
      skillsList: ['Agile / Scrum Methodologies', 'Sprint Planning', 'Stakeholder Management', 'Cross-functional Leadership', 'OKRs'],
      description: 'Driving alignment between engineering, design, sales, legal, and executive leadership.',
    },
  ],
  certifications: [
    {
      id: 'pm-cert-1',
      name: 'Certified Scrum Product Owner (CSPO)',
      issuer: 'Scrum Alliance',
      date: '2021',
    },
  ],
  languages: [
    {
      id: 'pm-lang-1',
      language: 'English',
      proficiency: 'Native',
    },
    {
      id: 'pm-lang-2',
      language: 'Mandarin Chinese',
      proficiency: 'Professional Working',
    },
  ],
  referencesText: 'Available upon request.',
  settings: {
    template: 'executive',
    accentColor: '#b45309',
    fontFamily: 'sans',
    compactSpacing: false,
    showProjects: true,
    showCertifications: true,
    showLanguages: true,
    showReferences: true,
  },
};

export const DATA_SCIENTIST_RESUME: ResumeData = {
  personal: {
    fullName: 'Dr. Marcus Vance',
    title: 'Senior Data Scientist & ML Engineer',
    email: 'marcus.vance@example.com',
    phone: '+1 (555) 789-0123',
    location: 'Boston, MA / Remote',
    portfolioUrl: 'marcusvance.ai',
    githubUrl: 'github.com/marcusvance-data',
    linkedinUrl: 'linkedin.com/in/marcusvance',
    twitterUrl: '',
  },
  summary:
    'Accomplished Senior Data Scientist with a PhD in Applied Mathematics and 5+ years of industry experience deploying production machine learning models and LLM agent pipelines. Expert in predictive modeling, NLP, statistical inference, and scalable data engineering using Python, PyTorch, SQL, and AWS SageMaker.',
  experiences: [
    {
      id: 'ds-exp-1',
      role: 'Senior Machine Learning Scientist',
      company: 'Quantum Insights AI',
      location: 'Boston, MA',
      startDate: '02/2022',
      endDate: 'Present',
      isCurrent: true,
      descriptionBullets: [
        'Developed and deployed predictive churn and recommendation models delivering a $4.2M annual revenue retention uplift.',
        'Built an automated LLM extraction and retrieval-augmented generation (RAG) system handling 500,000+ legal documents with 94.2% factual precision.',
        'Optimized model inference latency by 3.5x via quantization and TensorRT engine compilation on NVIDIA GPU clusters.',
      ],
    },
    {
      id: 'ds-exp-2',
      role: 'Data Scientist',
      company: 'BioHealth Data Labs',
      location: 'Cambridge, MA',
      startDate: '06/2019',
      endDate: '01/2022',
      isCurrent: false,
      descriptionBullets: [
        'Analyzed large-scale clinical genomics datasets with Apache Spark and PyTorch to identify biomarker correlations.',
        'Published 3 peer-reviewed journal papers and delivered interactive executive dashboards in Streamlit and Plotly.',
      ],
    },
  ],
  projects: [
    {
      id: 'ds-proj-1',
      name: 'OpenRAG Architecture',
      subtitle: 'High-Throughput Vector Retrieval Engine',
      startDate: '05/2023',
      endDate: 'Present',
      link: 'github.com/marcusvance-data/openrag',
      descriptionBullets: [
        'Designed an open-source hybrid semantic/lexical vector search pipeline using Qdrant and HuggingFace Transformers.',
      ],
    },
  ],
  education: [
    {
      id: 'ds-edu-1',
      degree: 'Ph.D. in Applied Mathematics & Computational Statistics',
      institution: 'Massachusetts Institute of Technology (MIT)',
      location: 'Cambridge, MA',
      startDate: '2015',
      endDate: '2019',
      courseworkBullets: [
        'Dissertation: High-Dimensional Stochastic Optimization and Bayesian Inference in Deep Learning.',
      ],
    },
  ],
  skillCategories: [
    {
      id: 'ds-skill-1',
      categoryName: 'Machine Learning & AI',
      skillsList: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'LLMs & RAG', 'HuggingFace', 'Transformers', 'NLP'],
      description: 'Deep neural networks, generative AI pipelines, predictive classification, and fine-tuning.',
    },
    {
      id: 'ds-skill-2',
      categoryName: 'Data Engineering & Analytics',
      skillsList: ['SQL (Postgres, BigQuery, Snowflake)', 'Pandas & NumPy', 'Apache Spark', 'Redis', 'Vector Databases (Qdrant, Pinecone)'],
      description: 'Distributed ETL, feature stores, data lakehouses, and high-throughput query optimization.',
    },
    {
      id: 'ds-skill-3',
      categoryName: 'MLOps & Cloud Infrastructure',
      skillsList: ['Docker', 'AWS SageMaker', 'Kubernetes', 'MLflow', 'Git & GitHub', 'CI/CD Pipelines'],
      description: 'Model deployment, experiment tracking, continuous monitoring, and scalable inference.',
    },
  ],
  certifications: [
    {
      id: 'ds-cert-1',
      name: 'AWS Certified Machine Learning – Specialty',
      issuer: 'Amazon Web Services',
      date: '2023',
    },
  ],
  languages: [
    {
      id: 'ds-lang-1',
      language: 'English',
      proficiency: 'Native',
    },
  ],
  referencesText: 'Available upon request.',
  settings: {
    template: 'modern-tech',
    accentColor: '#059669',
    fontFamily: 'mono',
    compactSpacing: false,
    showProjects: true,
    showCertifications: true,
    showLanguages: true,
    showReferences: true,
  },
};

export const PRODUCT_DESIGNER_RESUME: ResumeData = {
  personal: {
    fullName: 'Elena Rostova',
    title: 'Senior Product Designer & Design Systems',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Brooklyn, NY / Remote',
    portfolioUrl: 'elenarostova.design',
    linkedinUrl: 'linkedin.com/in/elena-rostova-design',
    githubUrl: '',
    twitterUrl: '',
  },
  summary:
    'Human-centered Senior Product Designer with 6+ years of experience crafting intuitive enterprise web platforms and mobile applications. Expert in architecting scalable design systems, conducting generative user research, and translating ambiguous business problems into elegant, accessible user experiences.',
  experiences: [
    {
      id: 'des-exp-1',
      role: 'Senior Product Designer',
      company: 'Loom & Scale Design Studio',
      location: 'New York, NY',
      startDate: '08/2021',
      endDate: 'Present',
      isCurrent: true,
      descriptionBullets: [
        'Led the unified design system overhaul across web and mobile products, accelerating engineering frontend velocity by 35%.',
        'Conducted 60+ usability testing sessions and translated customer feedback into iterative UX enhancements that boosted user engagement by 27%.',
        'Championed WCAG 2.1 AA accessibility compliance across all company interfaces.',
      ],
    },
  ],
  projects: [
    {
      id: 'des-proj-1',
      name: 'Atlas Design Tokens System',
      subtitle: 'Multi-Brand Cross-Platform Tokens',
      startDate: '02/2023',
      endDate: '10/2023',
      link: 'elenarostova.design/atlas',
      descriptionBullets: [
        'Created a universal design token architecture in Figma connected seamlessly via GitHub Actions to Tailwind and React codebases.',
      ],
    },
  ],
  education: [
    {
      id: 'des-edu-1',
      degree: 'B.F.A. in Interaction Design & Human-Computer Interaction',
      institution: 'Rhode Island School of Design (RISD)',
      location: 'Providence, RI',
      startDate: '2014',
      endDate: '2018',
      courseworkBullets: [
        'Coursework: Information Architecture, Visual Design Systems, Typography, User Research Methodologies, Interactive Prototyping.',
      ],
    },
  ],
  skillCategories: [
    {
      id: 'des-skill-1',
      categoryName: 'Product Design & UX',
      skillsList: ['User Research', 'Wireframing', 'Interactive Prototyping', 'Information Architecture', 'User Journey Mapping', 'Usability Testing'],
      description: 'End-to-end design thinking, qualitative discovery, and customer journey orchestration.',
    },
    {
      id: 'des-skill-2',
      categoryName: 'Design Systems & UI',
      skillsList: ['Figma (Variables, Auto-layout, Tokens)', 'Design Systems', 'WCAG Accessibility', 'Micro-interactions', 'Typography & Layout'],
      description: 'Modular component libraries, tokens, accessibility standards, and visual craft.',
    },
    {
      id: 'des-skill-3',
      categoryName: 'Technical & Collaborative Tools',
      skillsList: ['HTML5 & CSS3', 'Tailwind CSS', 'Miro / FigJam', 'Jira / Confluence', 'Git & GitHub'],
      description: 'Deep developer collaboration, code token handoffs, and agile sprint design execution.',
    },
  ],
  certifications: [
    {
      id: 'des-cert-1',
      name: 'Nielsen Norman Group UX Master Certified',
      issuer: 'NN/g',
      date: '2022',
    },
  ],
  languages: [
    {
      id: 'des-lang-1',
      language: 'English',
      proficiency: 'Native',
    },
  ],
  referencesText: 'Available upon request.',
  settings: {
    template: 'sidebar',
    accentColor: '#7c3aed',
    fontFamily: 'sans',
    compactSpacing: false,
    showProjects: true,
    showCertifications: true,
    showLanguages: true,
    showReferences: true,
  },
};

export const JUNIOR_DEV_RESUME: ResumeData = {
  personal: {
    fullName: 'Jordan Taylor',
    title: 'Junior Software Engineer',
    email: 'jordan.taylor@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL / Remote',
    portfolioUrl: 'jordantaylor.dev',
    githubUrl: 'github.com/jordantaylor-code',
    linkedinUrl: 'linkedin.com/in/jordantaylor-dev',
    twitterUrl: '',
  },
  summary:
    'Enthusiastic and detail-oriented Junior Software Engineer with a solid foundation in computer science, full-stack web development, and database architecture. Proven ability to build responsive web applications in React, TypeScript, and Node.js with automated testing. Eager to contribute scalable code and learn from senior mentors in a high-velocity engineering team.',
  experiences: [
    {
      id: 'jr-exp-1',
      role: 'Software Engineering Intern',
      company: 'Catalyst Software Labs',
      location: 'Chicago, IL',
      startDate: '05/2024',
      endDate: '08/2024',
      isCurrent: false,
      descriptionBullets: [
        'Collaborated with senior engineers to build reusable React components with TypeScript and Tailwind CSS, increasing page load speed by 22%.',
        'Wrote 40+ unit and integration tests in Jest and React Testing Library, boosting code coverage from 62% to 85%.',
        'Participated in daily standups, sprint reviews, and pair programming sessions under Agile methodologies.',
      ],
    },
  ],
  projects: [
    {
      id: 'jr-proj-1',
      name: 'DevTasker Kanban',
      subtitle: 'Full-Stack Task Management App',
      startDate: '01/2024',
      endDate: '04/2024',
      link: 'github.com/jordantaylor-code/devtasker',
      descriptionBullets: [
        'Built a full-stack real-time collaboration board with React, Node.js, Express, PostgreSQL, and WebSockets.',
        'Implemented secure JWT user authentication and responsive drag-and-drop task workflows.',
      ],
    },
    {
      id: 'jr-proj-2',
      name: 'WeatherWise API Client',
      subtitle: 'PWA Weather Forecast Tool',
      startDate: '10/2023',
      endDate: '12/2023',
      link: 'weatherwise-pwa.app',
      descriptionBullets: [
        'Created an offline-first Progressive Web App (PWA) consuming OpenWeatherMap REST API with service workers and local caching.',
      ],
    },
  ],
  education: [
    {
      id: 'jr-edu-1',
      degree: 'B.S. in Computer Science',
      institution: 'Illinois Institute of Technology',
      location: 'Chicago, IL',
      startDate: '2020',
      endDate: '2024',
      gpaOrGrade: '3.75 GPA - Dean’s Honor List',
      courseworkBullets: [
        'Core Coursework: Object-Oriented Programming, Data Structures & Algorithms, Database Systems, Web Application Architecture, Operating Systems.',
      ],
    },
  ],
  skillCategories: [
    {
      id: 'jr-skill-1',
      categoryName: 'Programming Languages',
      skillsList: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL', 'HTML5 & CSS3'],
      description: 'Foundational programming, typed web development, and relational database queries.',
    },
    {
      id: 'jr-skill-2',
      categoryName: 'Frameworks & Web Technologies',
      skillsList: ['React', 'Node.js', 'Express.js', 'Tailwind CSS', 'RESTful APIs', 'Progressive Web Apps (PWA)'],
      description: 'Full-stack application development, API integration, and responsive user interfaces.',
    },
    {
      id: 'jr-skill-3',
      categoryName: 'Developer Tools & Practices',
      skillsList: ['Git & GitHub', 'Docker (Basics)', 'PostgreSQL', 'Jest & Unit Testing', 'Postman', 'Agile / Scrum'],
      description: 'Version control workflows, container fundamentals, and test-driven code hygiene.',
    },
  ],
  certifications: [
    {
      id: 'jr-cert-1',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta / Coursera',
      date: '2024',
    },
  ],
  languages: [
    {
      id: 'jr-lang-1',
      language: 'English',
      proficiency: 'Native',
    },
  ],
  referencesText: 'Available upon request.',
  settings: {
    template: 'executive',
    accentColor: '#0f766e',
    fontFamily: 'sans',
    compactSpacing: false,
    showProjects: true,
    showCertifications: true,
    showLanguages: true,
    showReferences: true,
  },
};

export const BLANK_RESUME: ResumeData = {
  personal: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    portfolioUrl: '',
    githubUrl: '',
    linkedinUrl: '',
    twitterUrl: '',
  },
  summary: '',
  experiences: [
    {
      id: 'exp-1',
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      descriptionBullets: [''],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: '',
      subtitle: '',
      startDate: '',
      endDate: '',
      link: '',
      descriptionBullets: [''],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      courseworkBullets: [''],
    },
  ],
  skillCategories: [
    {
      id: 'skill-1',
      categoryName: 'Core Skills & Competencies',
      skillsList: [],
      description: '',
    },
  ],
  certifications: [],
  languages: [],
  referencesText: 'Available upon request.',
  settings: {
    template: 'executive',
    accentColor: '#1e293b',
    fontFamily: 'sans',
    compactSpacing: false,
    showProjects: true,
    showCertifications: true,
    showLanguages: true,
    showReferences: true,
  },
};

export const MARKETING_MANAGER_RESUME: ResumeData = {
  personal: {
    fullName: 'David Miller',
    title: 'Senior Marketing Manager',
    email: 'david.miller@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Chicago, IL',
    portfolioUrl: 'davidmiller.marketing',
    githubUrl: '',
    linkedinUrl: 'linkedin.com/in/davidmiller-mkt',
    twitterUrl: '',
  },
  summary: 'Strategic Senior Marketing Manager with 8+ years of experience driving brand growth and customer acquisition for B2C startups. Expert in multi-channel campaign management, SEO/SEM optimization, and data-driven marketing automation.',
  experiences: [
    {
      id: 'mkt-exp-1',
      role: 'Senior Marketing Manager',
      company: 'GrowthLoop Digital',
      location: 'Chicago, IL',
      startDate: '01/2021',
      endDate: 'Present',
      isCurrent: true,
      descriptionBullets: [
        'Managed a $2M annual marketing budget, achieving a 35% decrease in Customer Acquisition Cost (CAC) over 12 months.',
        'Led a cross-functional team of 6 to launch a national rebrand campaign, resulting in a 22% increase in brand sentiment scores.',
        'Optimized email marketing funnels using A/B testing that boosted click-through rates by 48%.'
      ],
    }
  ],
  projects: [],
  education: [
    {
      id: 'mkt-edu-1',
      degree: 'B.A. in Marketing & Communications',
      institution: 'Northwestern University',
      location: 'Evanston, IL',
      startDate: '2012',
      endDate: '2016',
      gpaOrGrade: '3.8 GPA',
      courseworkBullets: ['Consumer Behavior, Digital Analytics, Brand Management'],
    }
  ],
  skillCategories: [
    {
      id: 'mkt-skill-1',
      categoryName: 'Marketing Strategy',
      skillsList: ['Growth Marketing', 'Brand Strategy', 'Content Marketing', 'SEO/SEM', 'Market Research'],
    }
  ],
  certifications: [],
  languages: [],
  referencesText: 'Available upon request.',
  settings: SOFTWARE_ENGINEER_RESUME.settings,
};

export const SALES_EXECUTIVE_RESUME: ResumeData = {
  personal: {
    fullName: 'Sarah Jenkins',
    title: 'Enterprise Account Executive',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 987-6543',
    location: 'Austin, TX',
    portfolioUrl: '',
    githubUrl: '',
    linkedinUrl: 'linkedin.com/in/sarahjenkins-sales',
    twitterUrl: '',
  },
  summary: 'High-performing Enterprise Account Executive with a consistent track record of exceeding sales quotas. Expert in complex B2B sales cycles, relationship management, and consultative selling in the SaaS sector.',
  experiences: [
    {
      id: 'sales-exp-1',
      role: 'Enterprise Account Executive',
      company: 'SaaSCloud Systems',
      location: 'Austin, TX',
      startDate: '06/2019',
      endDate: 'Present',
      isCurrent: true,
      descriptionBullets: [
        'Exceeded annual sales quota by 125% in 2023, generating $3.4M in new business revenue.',
        'Successfully negotiated and closed 15+ enterprise-level contracts with Fortune 500 companies.',
        'Maintained a 92% client retention rate through strategic account management and relationship building.'
      ],
    }
  ],
  projects: [],
  education: [
    {
      id: 'sales-edu-1',
      degree: 'B.S. in Business Administration',
      institution: 'University of Texas at Austin',
      location: 'Austin, TX',
      startDate: '2015',
      endDate: '2019',
      gpaOrGrade: '3.7 GPA',
      courseworkBullets: ['Strategic Sales, Financial Accounting, Organizational Behavior'],
    }
  ],
  skillCategories: [
    {
      id: 'sales-skill-1',
      categoryName: 'Sales & BD',
      skillsList: ['B2B Sales', 'CRM (Salesforce)', 'Negotiation', 'Lead Generation', 'Public Speaking'],
    }
  ],
  certifications: [],
  languages: [],
  referencesText: 'Available upon request.',
  settings: SOFTWARE_ENGINEER_RESUME.settings,
};

export const HEALTHCARE_NURSE_RESUME: ResumeData = {
  personal: {
    fullName: 'Maria Rodriguez',
    title: 'Registered Nurse (RN)',
    email: 'maria.r@example.com',
    phone: '+1 (555) 321-0987',
    location: 'Miami, FL',
    portfolioUrl: '',
    githubUrl: '',
    linkedinUrl: 'linkedin.com/in/mariarodriguez-nurse',
    twitterUrl: '',
  },
  summary: 'Compassionate Registered Nurse with 5+ years of experience in high-volume critical care settings. Dedicated to delivering patient-centered care and maintaining rigorous clinical standards.',
  experiences: [
    {
      id: 'nurse-exp-1',
      role: 'Registered Nurse (ICU)',
      company: 'Miami General Hospital',
      location: 'Miami, FL',
      startDate: '08/2018',
      endDate: 'Present',
      isCurrent: true,
      descriptionBullets: [
        'Provided comprehensive care for critically ill patients in a 24-bed ICU unit.',
        'Collaborated with a multidisciplinary team to develop and implement individual patient care plans.',
        'Maintained 100% compliance with hospital safety and sanitization protocols.'
      ],
    }
  ],
  projects: [],
  education: [
    {
      id: 'nurse-edu-1',
      degree: 'Bachelor of Science in Nursing (BSN)',
      institution: 'University of Miami',
      location: 'Miami, FL',
      startDate: '2014',
      endDate: '2018',
      gpaOrGrade: '3.9 GPA',
      courseworkBullets: ['Pathophysiology, Pharmacology, Anatomy & Physiology'],
    }
  ],
  skillCategories: [
    {
      id: 'nurse-skill-1',
      categoryName: 'Clinical Skills',
      skillsList: ['Critical Care', 'Patient Advocacy', 'Wound Care', 'Electronic Health Records (EHR)', 'Emergency Response'],
    }
  ],
  certifications: [
    {
      id: 'nurse-cert-1',
      name: 'Registered Nurse (RN) License',
      issuer: 'Florida Board of Nursing',
      date: '2018',
    }
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-2', language: 'Spanish', proficiency: 'Bilingual' }
  ],
  referencesText: 'Available upon request.',
  settings: {
    template: 'impact-hospitality',
    accentColor: '#059669',
    fontFamily: 'sans',
    compactSpacing: false,
    showProjects: false,
    showCertifications: true,
    showLanguages: true,
    showReferences: true,
  },
};

export const ADMINISTRATIVE_ASSISTANT_RESUME: ResumeData = {
  personal: {
    fullName: 'Emily Watson',
    title: 'Executive Administrative Assistant',
    email: 'emily.watson@example.com',
    phone: '+1 (555) 444-3322',
    location: 'Chicago, IL',
    portfolioUrl: '',
    githubUrl: '',
    linkedinUrl: 'linkedin.com/in/emilywatson-admin',
    twitterUrl: '',
  },
  summary: 'Detail-oriented Executive Assistant with 6+ years of experience supporting C-suite executives in fast-paced corporate environments. Expert in complex calendar management, travel coordination, and office operations. Proven ability to handle sensitive information with absolute discretion and maintain seamless organizational workflow.',
  experiences: [
    {
      id: 'admin-exp-1',
      role: 'Executive Assistant to CEO',
      company: 'Global Logistics Partners',
      location: 'Chicago, IL',
      startDate: '03/2021',
      endDate: 'Present',
      isCurrent: true,
      descriptionBullets: [
        'Coordinate high-volume international travel itineraries and complex multi-timezone calendar scheduling for the CEO and 3 direct reports.',
        'Manage end-to-end office operations for a 50-person headquarters, including vendor management and procurement.',
        'Synthesize weekly executive reports and maintain rigorous document filing systems in SharePoint and Google Workspace.'
      ],
    }
  ],
  projects: [],
  education: [
    {
      id: 'admin-edu-1',
      degree: 'B.A. in Business Administration',
      institution: 'DePaul University',
      location: 'Chicago, IL',
      startDate: '2013',
      endDate: '2017',
      courseworkBullets: ['Organizational Communications, Business Ethics, Project Management'],
    }
  ],
  skillCategories: [
    {
      id: 'admin-skill-1',
      categoryName: 'Administrative Mastery',
      skillsList: ['Executive Support', 'Calendar Management', 'Travel Coordination', 'Office Operations', 'Vendor Management'],
    },
    {
      id: 'admin-skill-2',
      categoryName: 'Software & Tools',
      skillsList: ['Microsoft Office 365', 'Google Workspace', 'SharePoint', 'Salesforce', 'Slack', 'Zoom'],
    }
  ],
  certifications: [
    {
      id: 'admin-cert-1',
      name: 'Certified Administrative Professional (CAP)',
      issuer: 'IAAP',
      date: '2022',
    }
  ],
  languages: [],
  referencesText: 'Available upon request.',
  settings: {
    template: 'modern-academic',
    accentColor: '#475569',
    fontFamily: 'sans',
    compactSpacing: false,
    showProjects: false,
    showCertifications: true,
    showLanguages: true,
    showReferences: true,
  },
};

export const RESUME_PRESETS_LIST: ResumePresetOption[] = [
  {
    id: 'preset-swe',
    name: 'Software Engineer',
    role: 'Senior Full Stack Software Engineer',
    category: 'Tech',
    description: 'High-impact distributed systems, TypeScript, React, Node.js, and cloud AWS infrastructure.',
    data: SOFTWARE_ENGINEER_RESUME,
  },
  {
    id: 'preset-pm',
    name: 'Product Manager',
    role: 'Lead Technical Product Manager',
    category: 'Product',
    description: 'Strategic product roadmapping, user discovery, quantitative metrics, and Agile leadership.',
    data: PRODUCT_MANAGER_RESUME,
  },
  {
    id: 'preset-marketing',
    name: 'Marketing Manager',
    role: 'Senior Marketing Manager',
    category: 'Finance',
    description: 'Campaign management, SEO/SEM, and data-driven marketing strategy.',
    data: {
      ...MARKETING_MANAGER_RESUME,
      settings: { ...MARKETING_MANAGER_RESUME.settings, template: 'creative-bold', accentColor: '#4f46e5' }
    },
  },
  {
    id: 'preset-sales',
    name: 'Sales Executive',
    role: 'Enterprise Account Executive',
    category: 'Finance',
    description: 'B2B sales cycles, revenue growth, and consultative selling.',
    data: {
      ...SALES_EXECUTIVE_RESUME,
      settings: { ...SALES_EXECUTIVE_RESUME.settings, template: 'executive', accentColor: '#b45309' }
    },
  },
  {
    id: 'preset-nurse',
    name: 'Registered Nurse',
    role: 'Registered Nurse (RN)',
    category: 'Service',
    description: 'Patient-centered care, critical thinking, and clinical excellence.',
    data: {
      ...HEALTHCARE_NURSE_RESUME,
      settings: { ...HEALTHCARE_NURSE_RESUME.settings, template: 'clinical-minimal', accentColor: '#0891b2' }
    },
  },
  {
    id: 'preset-admin',
    name: 'Executive Assistant',
    role: 'Executive Administrative Assistant',
    category: 'Admin',
    description: 'Expert organization, C-suite support, and efficient office management.',
    data: ADMINISTRATIVE_ASSISTANT_RESUME,
  },
  {
    id: 'preset-hospitality',
    name: 'Hospitality Specialist',
    role: 'Senior Hospitality Manager',
    category: 'Service',
    description: 'High-impact customer service, team leadership, and operational excellence.',
    data: {
      ...HEALTHCARE_NURSE_RESUME, // Fallback data
      personal: { ...HEALTHCARE_NURSE_RESUME.personal, title: 'Senior Hospitality Manager' },
      settings: { ...HEALTHCARE_NURSE_RESUME.settings, template: 'impact-hospitality', accentColor: '#059669' }
    },
  },
  {
    id: 'preset-blank',
    name: 'Clean Blank Canvas',
    role: 'Start from Scratch',
    category: 'Blank',
    description: 'Fresh empty CV template ready for entering your own personal career details.',
    data: BLANK_RESUME,
  },
];

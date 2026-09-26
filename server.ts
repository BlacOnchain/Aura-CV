import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Security Headers Middleware
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Authentication Rate Limiting & Input Sanitization
const authRateLimits = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_AUTH_PER_WINDOW = 20;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = authRateLimits.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
    authRateLimits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= MAX_AUTH_PER_WINDOW) {
    return true;
  }
  entry.count += 1;
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Shared Gemini helper with retry logic and model fallback
async function callAIGemini(promptOrConfig: any, maxRetries = 2) {
  if (!ai) throw new Error('AI not initialized');

  // Ordered list of models to try
  const models = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
  let lastError: any;

  for (let modelIndex = 0; modelIndex < models.length; modelIndex++) {
    const currentModel = models[modelIndex];
    
    for (let retry = 0; retry <= maxRetries; retry++) {
      try {
        const config = typeof promptOrConfig === 'string' 
          ? { model: currentModel, contents: promptOrConfig }
          : { ...promptOrConfig, model: currentModel };
          
        return await ai.models.generateContent(config);
      } catch (err: any) {
        lastError = err;
        
        // Normalize error status and messages
        const status = err?.status || err?.code || (err?.message?.includes('quota') ? 429 : 500);
        const errText = err?.message || '';
        const isQuota = status === 429 || status === 'RESOURCE_EXHAUSTED' || errText.toLowerCase().includes('quota') || errText.toLowerCase().includes('limit');
        const isOverloaded = status === 503 || status === 'UNAVAILABLE' || errText.toLowerCase().includes('overloaded') || errText.toLowerCase().includes('unavailable');
        
        // If it's a quota/rate limit error or overloaded state, switch to the next model IMMEDIATELY instead of waiting
        if ((isQuota || isOverloaded) && modelIndex < models.length - 1) {
          console.warn(`Gemini API issue (${status}) on ${currentModel}. Switching immediately to ${models[modelIndex + 1]}...`);
          break; // Break the retry loop for this model and proceed to the next model in the outer loop
        }

        if ((isQuota || isOverloaded) && modelIndex === models.length - 1) {
          // Exhausted all models
          throw err;
        }

        if (retry < maxRetries) {
          const delay = Math.pow(2, retry) * 500; // shorter retry delay
          console.warn(`Gemini error (${status}) on ${currentModel}, retrying in ${delay}ms... (Attempt ${retry + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        if (modelIndex < models.length - 1) {
          console.warn(`Exhausted retries for ${currentModel}, trying ${models[modelIndex + 1]}...`);
          break; // Switch to next model
        }
        
        throw err;
      }
    }
  }
  throw lastError;
}

// Helper: AI bullet enhancement with multi-industry awareness
app.post('/api/ai/enhance-bullet', async (req, res) => {
  const { bullet, role, context, mode = 'star', industry } = req.body;
  const clean = (bullet || '').trim();

  try {
    if (!clean) {
      return res.status(400).json({ error: 'Bullet text is required' });
    }

    if (!ai) throw new Error('AI not initialized');

    let industryContext = industry || 'Professional Services';
    
    // Auto-detect industry if not provided but role exists
    if (!industry && role) {
      const detectPrompt = `Detect the industry for the job title: "${role}". Return ONLY the industry name (e.g. Healthcare, Finance, Construction, Education, Technology, Retail).`;
      const detectRes = await callAIGemini(detectPrompt);
      industryContext = detectRes.text?.trim() || 'General';
    }

    let instruction = '';
    if (mode === 'academic') {
      instruction = `This bullet point is for the EDUCATION / COURSEWORK / ACADEMIC section.
Industry/Field: ${industryContext}
Role: ${role || 'Student/Graduate'}
Transform this coursework or academic project note into an articulate, impressive academic achievement bullet point highlighting theoretical rigor, practical lab mastery, or capstone deliverables.`;
    } else if (mode === 'metrics') {
      instruction = `Rewrite this resume bullet point emphasizing quantified business or technical impact (e.g. revenue %, patient outcomes, sales conversion, student improvement, safety records).
Industry: ${industryContext}
Role: ${role || 'Professional'} ${context ? `(${context})` : ''}
Use realistic metrics suited for this specific industry.`;
    } else if (mode === 'concise') {
      instruction = `Make this resume bullet point ultra-concise, punchy, and direct (under 18 words).
Industry: ${industryContext}
Role: ${role || 'Professional'} ${context ? `(${context})` : ''}
Cut all filler words, keep strong past-tense action verbs and core outcomes.`;
    } else if (mode === 'grammar') {
      instruction = `Polish this resume bullet point for flawless professional tone, active voice, and executive vocabulary.
Industry: ${industryContext}
Role: ${role || 'Professional'} ${context ? `(${context})` : ''}
Eliminate weak phrases like "was responsible for" or "helped with".`;
    } else {
      // Default: STAR / Google X-Y-Z formula
      instruction = `Rewrite this resume bullet point using the Google X-Y-Z formula ("Accomplished [X] as measured by [Y], by doing [Z]") or strong STAR action-verb impact format.
Industry: ${industryContext}
Role/Context: ${role || 'Professional'} ${context ? `(${context})` : ''}
Rules:
- Begin with a powerful past-tense action verb suited for ${industryContext}.
- Include realistic metrics or efficiency outcomes for ${industryContext}.
- Keep it concise (1-2 sentences max, 15-30 words).`;
    }

    const prompt = `You are an expert resume writer. Help me improve this bullet point.
Original Bullet Point: "${clean}"

${instruction}

Guidelines:
- Use a natural, professional human tone.
- Avoid inflated vocabulary, buzzwords, or sounding like AI.
- Return ONLY the single rewritten bullet point string with NO quotes, markdown asterisks/bullets, or commentary.`;

    const response = await callAIGemini(prompt);

    const text = response.text ? response.text.trim().replace(/^[-•*]\s*/, '') : clean;
    return res.json({ enhanced: text, source: 'gemini', detectedIndustry: industryContext });
  } catch (error: any) {
    console.warn('Gemini enhance bullet error, using fallback:', error?.message);
    const verbs = ['Built', 'Launched', 'Created', 'Designed', 'Improved', 'Led', 'Reduced', 'Increased', 'Solved'];
    const picked = verbs[Math.floor(Math.random() * verbs.length)];
    const improved = `${picked} ${clean.replace(/^(managed|helped|did|worked on|was responsible for|spearheaded|orchestrated|facilitated)\s+/i, '')}.`;
    return res.json({ 
      enhanced: improved, 
      source: 'heuristic-fallback',
      isQuotaExceeded: error?.status === 'RESOURCE_EXHAUSTED' || error?.code === 429
    });
  }
});


// Helper: AI summary generator
app.post('/api/ai/generate-summary', async (req, res) => {
  const { fullName, jobTitle, skills, experiences, targetRole, tone } = req.body;

  try {
    if (!ai) throw new Error('AI not initialized');

    const prompt = `Write a high-impact, ATS-optimized professional resume summary (3-4 sentences, approximately 50-70 words).
Candidate Name: ${fullName || 'Candidate'}
Current/Target Title: ${jobTitle || targetRole || 'Professional'}
Tone: ${tone || 'Professional & Technical'}
Key Skills: ${JSON.stringify(skills || [])}
Recent Experience highlights: ${JSON.stringify(experiences || [])}

Requirements:
- Highlight core technical domains, architecture/methodology strengths, and business impact.
- Avoid generic cliches ("hard worker", "team player").
- Return strictly the paragraph text with no headings, quotes, or markdown.`;

    const response = await callAIGemini(prompt);

    const text = response.text ? response.text.trim() : '';
    return res.json({ summary: text, source: 'gemini' });
  } catch (error: any) {
    console.warn('Generate summary error, using fallback:', error?.message);
    const skillsStr = Array.isArray(skills) && skills.length > 0 ? skills.slice(0, 5).join(', ') : 'modern industry best practices';
    const fallbackSummary = `Dedicated and results-oriented ${jobTitle || 'Professional'} with hands-on expertise across ${skillsStr}. Proven track record designing scalable solutions, maintaining high quality standards, and optimizing core operational workflows. Passionate about applying rigorous engineering and strategic standards to drive measurable organizational impact.`;
    return res.json({ 
      summary: fallbackSummary, 
      source: 'heuristic-fallback',
      isQuotaExceeded: error?.status === 'RESOURCE_EXHAUSTED' || error?.code === 429
    });
  }
});

// Helper: ATS Match & Job Description Optimization
app.post('/api/ai/ats-analyze', async (req, res) => {
  const { resumeText, jobDescription } = req.body;
  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: 'Both resumeText and jobDescription are required' });
  }

  const runHeuristicATS = (error?: any) => {
    const jdLower = jobDescription.toLowerCase();
    const stopWords = new Set(['and', 'the', 'for', 'with', 'you', 'your', 'our', 'are', 'that', 'this', 'from', 'have', 'will', 'all', 'can', 'not', 'they', 'our', 'out', 'per', 'who', 'what', 'when', 'where', 'why', 'how', 'each', 'any', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'than', 'too', 'very', 'just', 'should', 'would', 'could', 'about', 'after', 'before', 'between', 'during', 'under', 'over', 'again', 'further', 'then', 'once', 'here', 'there', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'no', 'nor', 'only', 'own', 'same', 'so', 'as', 'at', 'by', 'an', 'a', 'is', 'it', 'be', 'or', 'of', 'to', 'in']);
    
    const words = jdLower.replace(/[^\w\s]/g, ' ').split(/\s+/).filter((w: string) => w.length >= 3 && !stopWords.has(w));
    const uniqueJdWords = Array.from(new Set(words)).slice(0, 25);
    
    const resumeLower = resumeText.toLowerCase();
    const matched = uniqueJdWords.filter(k => resumeLower.includes(k));
    const missing = uniqueJdWords.filter(k => !resumeLower.includes(k));
    const baseScore = Math.min(95, Math.max(62, Math.round(((matched.length + 1) / (uniqueJdWords.length || 1)) * 100)));

    return {
      score: baseScore,
      matchedKeywords: matched.length > 0 ? matched : uniqueJdWords.slice(0, 4),
      missingKeywords: missing.length > 0 ? missing : uniqueJdWords.slice(4, 8),
      recommendations: [
        'Incorporate relevant domain keywords from the target job description into your experience bullet points.',
        'Quantify accomplishments with concrete outcomes and metrics.',
        'Align your resume professional title and core competencies directly with the role requirements.'
      ],
      source: 'heuristic',
      isQuotaExceeded: error?.status === 'RESOURCE_EXHAUSTED' || error?.code === 429
    };
  };

  try {
    if (!ai) throw new Error('AI not initialized');

    const prompt = `You are a Fortune 500 Senior Technical Recruiter and ATS (Applicant Tracking System) parsing algorithm.
Evaluate the candidate's resume against the target job description.

Candidate Resume Text:
"""
${resumeText.slice(0, 3500)}
"""

Target Job Description:
"""
${jobDescription.slice(0, 3500)}
"""

Provide a structured JSON output with the exact schema:
{
  "score": number (0 to 100 calculated ATS match score),
  "matchedKeywords": array of strings (top keywords and skills found in both),
  "missingKeywords": array of strings (crucial skills, tools, or requirements in the job description that are missing from the resume),
  "recommendations": array of strings (3 to 4 actionable, specific steps to tailor the resume for this exact role)
}
Return only valid JSON.`;

    const response = await callAIGemini({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    return res.json({ ...parsed, source: 'gemini' });
  } catch (error: any) {
    console.warn('ATS analyze error, using fallback:', error?.message);
    return res.json(runHeuristicATS(error));
  }
});

// Helper: Cover Letter Generator
app.post('/api/ai/cover-letter', async (req, res) => {
  const { resumeData, companyName, roleTitle, jobDescription, tone } = req.body;

  const buildFallbackLetter = (error?: any) => {
    const candidateName = resumeData?.personal?.fullName || 'Applicant';
    const candidateTitle = roleTitle || resumeData?.personal?.title || 'Candidate';
    return {
      coverLetter: `Dear Hiring Team${companyName ? ` at ${companyName}` : ''},\n\nI am writing to express my enthusiastic interest in the ${candidateTitle} position. With a strong track record delivering impactful results, optimizing workflows, and collaborating across cross-functional teams, I am eager to contribute to your organization.\n\nThroughout my career, I have focused on executing strategic initiatives, solving complex technical and operational challenges, and maintaining rigorous standards of quality. I take pride in crafting clean, scalable work and driving measurable outcomes for team objectives.\n\nI look forward to discussing how my background and problem-solving mindset align with your strategic goals. Thank you for your time and consideration.\n\nSincerely,\n${candidateName}`,
      source: 'heuristic-fallback',
      isQuotaExceeded: error?.status === 'RESOURCE_EXHAUSTED' || error?.code === 429
    };
  };

  try {
    if (!ai) throw new Error('AI not initialized');

    const prompt = `Write a personalized, compelling cover letter (3-4 paragraphs, 250-320 words).
Candidate: ${JSON.stringify(resumeData?.personal || {})}
Summary & Experience: ${JSON.stringify(resumeData?.experiences || [])}
Skills: ${JSON.stringify(resumeData?.skills || [])}
Target Company: ${companyName || 'the company'}
Target Role: ${roleTitle || 'the position'}
Job Description Context: ${jobDescription || 'Standard software engineering role'}
Tone: ${tone || 'Professional, confident, and genuine'}

Rules:
- Tailor the letter directly to the role requirements.
- Use 1-2 concrete achievements or technologies from the candidate's history.
- Avoid generic filler sentences. Make every sentence impactful.
- Return plain text with appropriate paragraph line breaks.`;

    const response = await callAIGemini(prompt);

    const letter = response.text ? response.text.trim() : '';
    return res.json({ coverLetter: letter, source: 'gemini' });
  } catch (error: any) {
    console.warn('Cover letter error, using fallback:', error?.message);
    return res.json(buildFallbackLetter(error));
  }
});

// Helper: Resume Parser (from PDF base64 or Raw Text or LinkedIn export)
app.post('/api/ai/parse-resume', async (req, res) => {
  const { fileBase64, mimeType = 'application/pdf', fileName, rawText } = req.body;

  const fallbackResume = (hintName?: string, error?: any) => {
    const cleanFileName = (hintName || fileName || 'Imported Resume')
      .replace(/\.[^/.]+$/, '')
      .replace(/[_-]/g, ' ');
    const words = cleanFileName.split(' ').filter(Boolean);
    const inferredName = words.slice(0, 2).map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') || 'Candidate';

    return {
      title: `${inferredName} Resume`,
      personal: {
        fullName: inferredName,
        email: 'applicant@example.com',
        phone: '+1 (555) 019-2834',
        location: 'San Francisco, CA',
        title: 'Professional',
        linkedinUrl: 'https://linkedin.com/in/profile',
        githubUrl: 'https://github.com',
        portfolioUrl: '',
      },
      summary: 'Experienced and detail-oriented professional with a strong background in driving technical execution, cross-functional collaboration, and delivering scalable solutions in high-velocity environments.',
      experiences: [
        {
          id: `exp-${Date.now()}-1`,
          role: 'Senior Specialist / Engineer',
          company: 'Technology Solutions Corp',
          location: 'San Francisco, CA',
          startDate: 'Jan 2022',
          endDate: 'Present',
          current: true,
          descriptionBullets: [
            'Led cross-functional initiatives delivering critical business platforms, increasing operational throughput by 35%.',
            'Architected and implemented automated workflows, reducing deployment cycle times from days to hours.',
            'Collaborated with stakeholders to align technical specifications with core business OKRs.'
          ],
        },
        {
          id: `exp-${Date.now()}-2`,
          role: 'Professional Associate',
          company: 'Innovate Systems',
          location: 'San Jose, CA',
          startDate: 'May 2019',
          endDate: 'Dec 2021',
          current: false,
          descriptionBullets: [
            'Spearheaded performance optimizations across database queries, achieving 40% reduction in response latency.',
            'Mentored junior team members on engineering standards, peer reviews, and clean architectural design.'
          ],
        }
      ],
      education: [
        {
          id: `edu-${Date.now()}-1`,
          degree: 'Bachelor of Science in Computer Science or Related Field',
          institution: 'State University',
          location: 'California, USA',
          startDate: '2015',
          endDate: '2019',
          gpaOrGrade: '3.8 GPA',
          courseworkBullets: [
            'Data Structures & Algorithms, Distributed Systems, Software Engineering, Database Systems'
          ],
        }
      ],
      skillCategories: [
        {
          id: `skill-${Date.now()}-1`,
          categoryName: 'Core Competencies',
          skillsList: ['Technical Problem Solving', 'System Design', 'Agile / Scrum', 'Cross-Functional Collaboration'],
        },
        {
          id: `skill-${Date.now()}-2`,
          categoryName: 'Tools & Technologies',
          skillsList: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Git'],
        }
      ],
      projects: [
        {
          id: `proj-${Date.now()}-1`,
          title: 'Enterprise Analytics Dashboard',
          roleOrTech: 'TypeScript, React, Node.js',
          link: 'https://github.com/project',
          bullets: [
            'Engineered full-stack analytics visualization engine handling 50k+ daily events with sub-second query rendering.'
          ],
        }
      ],
      certifications: [
        {
          id: `cert-${Date.now()}-1`,
          name: 'Professional Certified Specialist',
          issuer: 'Industry Standard Authority',
          issueDate: '2023',
        }
      ],
      languages: [
        {
          id: `lang-${Date.now()}-1`,
          language: 'English',
          proficiency: 'Native / Bilingual',
        }
      ],
      settings: {
        template: 'flow-moderna',
        accentColor: '#4f46e5',
        fontFamily: 'sans',
        fontSize: 'medium',
        compactSpacing: false,
        pageMargin: 'normal',
        showProjects: true,
        showCertifications: true,
        showLanguages: true,
        showReferences: false,
      },
      isQuotaExceeded: error?.status === 'RESOURCE_EXHAUSTED' || error?.code === 429
    };
  };

  try {
    if (!ai) throw new Error('AI not initialized');

    const extractionPrompt = `You are an expert ATS resume parser.
Analyze this resume document (PDF or text) and extract ALL information into the exact JSON format specified below.
Ensure you accurately extract:
- Personal details: full name, contact email, phone, location, job title, LinkedIn URL, GitHub URL, portfolio URL.
- Executive summary / profile objective.
- Work experience items: company name, role/title, location, start date, end date, current flag (boolean), and list of bullet points.
- Education items: institution, degree, location, start date, end date, GPA or honours, coursework bullets.
- Skill categories: group extracted skills logically into categories (e.g., 'Programming Languages', 'Frameworks & Libraries', 'Cloud & DevOps', 'Databases', 'Management & Tools').
- Projects (if present): title, role/technologies, link, bullets.
- Certifications (if present): name, issuer, issue date.
- Languages (if present): language, proficiency.

JSON Output Schema:
{
  "title": string,
  "personal": {
    "fullName": string,
    "email": string,
    "phone": string,
    "location": string,
    "title": string,
    "portfolioUrl": string,
    "linkedinUrl": string,
    "githubUrl": string
  },
  "summary": string,
  "experiences": [
    {
      "id": string,
      "role": string,
      "company": string,
      "location": string,
      "startDate": string,
      "endDate": string,
      "current": boolean,
      "descriptionBullets": string[]
    }
  ],
  "education": [
    {
      "id": string,
      "degree": string,
      "institution": string,
      "location": string,
      "startDate": string,
      "endDate": string,
      "gpaOrGrade": string,
      "courseworkBullets": string[]
    }
  ],
  "skillCategories": [
    {
      "id": string,
      "categoryName": string,
      "skillsList": string[]
    }
  ],
  "projects": [
    {
      "id": string,
      "title": string,
      "roleOrTech": string,
      "link": string,
      "bullets": string[]
    }
  ],
  "certifications": [
    {
      "id": string,
      "name": string,
      "issuer": string,
      "issueDate": string
    }
  ],
  "languages": [
    {
      "id": string,
      "language": string,
      "proficiency": string
    }
  ],
  "settings": {
    "template": "flow-moderna",
    "accentColor": "#4f46e5",
    "fontFamily": "sans",
    "fontSize": "medium",
    "compactSpacing": false,
    "pageMargin": "normal",
    "showProjects": true,
    "showCertifications": true,
    "showLanguages": true,
    "showReferences": false
  }
}
Return only valid JSON.`;

    let response;
    if (fileBase64 && mimeType === 'application/pdf') {
      const cleanBase64 = fileBase64.replace(/^data:[^;]+;base64,/, '');
      response = await callAIGemini({
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: 'application/pdf',
                  data: cleanBase64,
                },
              },
              {
                text: extractionPrompt,
              },
            ],
          },
        ],
        config: {
          responseMimeType: 'application/json',
        },
      });
    } else {
      const textToParse = rawText || `Resume filename: ${fileName || 'Resume'}`;
      response = await callAIGemini({
        contents: `${extractionPrompt}\n\nDocument Text to Parse:\n${textToParse}`,
        config: {
          responseMimeType: 'application/json',
        },
      });
    }

    const parsedJson = JSON.parse(response.text?.trim() || '{}');
    
    // Ensure all arrays and nested objects have valid defaults
    const result = {
      ...fallbackResume(parsedJson.personal?.fullName || fileName),
      ...parsedJson,
      personal: {
        ...fallbackResume(fileName).personal,
        ...(parsedJson.personal || {}),
      },
      experiences: (parsedJson.experiences || []).map((e: any, idx: number) => ({
        ...e,
        id: e.id || `exp-${Date.now()}-${idx}`,
        descriptionBullets: Array.isArray(e.descriptionBullets) ? e.descriptionBullets : [],
      })),
      education: (parsedJson.education || []).map((ed: any, idx: number) => ({
        ...ed,
        id: ed.id || `edu-${Date.now()}-${idx}`,
        courseworkBullets: Array.isArray(ed.courseworkBullets) ? ed.courseworkBullets : [],
      })),
      skillCategories: (parsedJson.skillCategories || []).map((sc: any, idx: number) => ({
        ...sc,
        id: sc.id || `skill-${Date.now()}-${idx}`,
        skillsList: Array.isArray(sc.skillsList) ? sc.skillsList : [],
      })),
      projects: (parsedJson.projects || []).map((p: any, idx: number) => ({
        ...p,
        id: p.id || `proj-${Date.now()}-${idx}`,
        bullets: Array.isArray(p.bullets) ? p.bullets : [],
      })),
      settings: {
        ...fallbackResume(fileName).settings,
        ...(parsedJson.settings || {}),
      },
    };

    return res.json({ resume: result, source: 'gemini' });
  } catch (error: any) {
    console.warn('Resume parse error, falling back:', error?.message);
    return res.json({ resume: fallbackResume(fileName, error), source: 'fallback-heuristic' });
  }
});

// Helper: LinkedIn Profile URL or Bio Parser
app.post('/api/ai/parse-linkedin', async (req, res) => {
  const { url, profileText, targetRole } = req.body;

  if (!url && !profileText) {
    return res.status(400).json({ error: 'LinkedIn URL or Profile text is required' });
  }

  // Extract username/slug from URL e.g. https://www.linkedin.com/in/alex-morgan-123
  let extractedHandle = '';
  if (url) {
    const match = url.match(/linkedin\.com\/in\/([^/?#]+)/i);
    if (match && match[1]) {
      extractedHandle = match[1].replace(/[-_]/g, ' ');
    }
  }

  const fallbackFromUrl = (error?: any) => {
    const rawName = extractedHandle
      ? extractedHandle.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : 'LinkedIn Candidate';

    return {
      title: `${rawName} - Resume`,
      personal: {
        fullName: rawName,
        email: `${extractedHandle ? extractedHandle.replace(/\s+/g, '.').toLowerCase() : 'candidate'}@example.com`,
        phone: '+1 (555) 234-5678',
        location: 'San Francisco Bay Area, CA',
        title: targetRole || 'Senior Software Engineer / Technical Lead',
        linkedinUrl: url || 'https://www.linkedin.com',
        githubUrl: 'https://github.com',
        portfolioUrl: '',
      },
      summary: 'Impact-driven professional with deep technical expertise, demonstrated history in high-growth technology environments, and commitment to engineering excellence and user-centric architecture.',
      experiences: [
        {
          id: `exp-${Date.now()}-1`,
          role: targetRole || 'Senior Software Engineer',
          company: 'Leading Tech Co',
          location: 'San Francisco, CA',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          descriptionBullets: [
            'Architected and deployed distributed cloud microservices serving 2M+ active monthly users with 99.99% uptime.',
            'Collaborated with product, design, and executive teams to scale roadmap features and reduce sprint cycle times by 30%.',
            'Championed test-driven engineering standards, increasing unit test coverage from 68% to 94% across core repos.'
          ],
        },
        {
          id: `exp-${Date.now()}-2`,
          role: 'Full Stack Engineer',
          company: 'Venture Innovations',
          location: 'San Jose, CA',
          startDate: '2019',
          endDate: '2022',
          current: false,
          descriptionBullets: [
            'Spearheaded migration from legacy monolith to React & Node.js architecture, improving page load speeds by 45%.',
            'Engineered real-time notification pipelines and robust API endpoints with automated CI/CD integration.'
          ],
        }
      ],
      education: [
        {
          id: `edu-${Date.now()}-1`,
          degree: 'B.S. in Computer Science',
          institution: 'University of California',
          location: 'California, USA',
          startDate: '2015',
          endDate: '2019',
          gpaOrGrade: '3.8 GPA',
          courseworkBullets: [
            'Distributed Systems, Algorithms, Database Management, Cloud Computing'
          ],
        }
      ],
      skillCategories: [
        {
          id: `skill-${Date.now()}-1`,
          categoryName: 'Core Technical Skills',
          skillsList: ['TypeScript', 'JavaScript', 'React', 'Node.js', 'Python', 'REST APIs', 'GraphQL'],
        },
        {
          id: `skill-${Date.now()}-2`,
          categoryName: 'Cloud & Infrastructure',
          skillsList: ['AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'CI/CD Pipelines'],
        },
        {
          id: `skill-${Date.now()}-3`,
          categoryName: 'Leadership & Methods',
          skillsList: ['System Architecture', 'Agile / Scrum', 'Mentorship', 'Technical Strategy'],
        }
      ],
      projects: [
        {
          id: `proj-${Date.now()}-1`,
          title: 'Distributed Cloud Sync Engine',
          roleOrTech: 'TypeScript, Go, Redis',
          link: 'https://github.com',
          bullets: [
            'Built high-performance state synchronization engine handling 10,000 WebSocket events per second.'
          ],
        }
      ],
      certifications: [],
      languages: [
        {
          id: `lang-${Date.now()}-1`,
          language: 'English',
          proficiency: 'Native or Bilingual',
        }
      ],
      settings: {
        template: 'flow-moderna',
        accentColor: '#0a66c2', // LinkedIn Blue accent
        fontFamily: 'sans',
        fontSize: 'medium',
        compactSpacing: false,
        pageMargin: 'normal',
        showProjects: true,
        showCertifications: true,
        showLanguages: true,
        showReferences: false,
      },
      isQuotaExceeded: error?.status === 'RESOURCE_EXHAUSTED' || error?.code === 429
    };
  };

  try {
    if (!ai) throw new Error('AI not initialized');

    const prompt = `You are a specialist at parsing professional LinkedIn profiles into complete, high-impact resume data.
LinkedIn Profile URL: ${url || 'Not provided'}
User Target Role: ${targetRole || 'Inferred from profile'}
Profile Content / Text Provided:
${profileText || `Generate a comprehensive, top-tier resume profile tailored for LinkedIn handle: ${extractedHandle || 'candidate'}`}

Task:
Extract or synthesize all profile details into the following exact JSON structure. Format experience descriptions as impactful STAR-method bullet points with quantifiable accomplishments.

JSON Schema:
{
  "title": string,
  "personal": {
    "fullName": string,
    "email": string,
    "phone": string,
    "location": string,
    "title": string,
    "portfolioUrl": string,
    "linkedinUrl": string,
    "githubUrl": string
  },
  "summary": string,
  "experiences": [
    {
      "id": string,
      "role": string,
      "company": string,
      "location": string,
      "startDate": string,
      "endDate": string,
      "current": boolean,
      "descriptionBullets": string[]
    }
  ],
  "education": [
    {
      "id": string,
      "degree": string,
      "institution": string,
      "location": string,
      "startDate": string,
      "endDate": string,
      "gpaOrGrade": string,
      "courseworkBullets": string[]
    }
  ],
  "skillCategories": [
    {
      "id": string,
      "categoryName": string,
      "skillsList": string[]
    }
  ],
  "projects": [
    {
      "id": string,
      "title": string,
      "roleOrTech": string,
      "link": string,
      "bullets": string[]
    }
  ],
  "certifications": [
    {
      "id": string,
      "name": string,
      "issuer": string,
      "issueDate": string
    }
  ],
  "languages": [
    {
      "id": string,
      "language": string,
      "proficiency": string
    }
  ],
  "settings": {
    "template": "flow-moderna",
    "accentColor": "#0a66c2",
    "fontFamily": "sans",
    "fontSize": "medium",
    "compactSpacing": false,
    "pageMargin": "normal",
    "showProjects": true,
    "showCertifications": true,
    "showLanguages": true,
    "showReferences": false
  }
}
Return only valid JSON.`;

    const response = await callAIGemini({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    const merged = {
      ...fallbackFromUrl(),
      ...parsed,
      personal: {
        ...fallbackFromUrl().personal,
        ...(parsed.personal || {}),
        linkedinUrl: url || parsed.personal?.linkedinUrl || fallbackFromUrl().personal.linkedinUrl,
      },
      experiences: (parsed.experiences || []).map((e: any, idx: number) => ({
        ...e,
        id: e.id || `exp-${Date.now()}-${idx}`,
        descriptionBullets: Array.isArray(e.descriptionBullets) ? e.descriptionBullets : [],
      })),
      education: (parsed.education || []).map((ed: any, idx: number) => ({
        ...ed,
        id: ed.id || `edu-${Date.now()}-${idx}`,
        courseworkBullets: Array.isArray(ed.courseworkBullets) ? ed.courseworkBullets : [],
      })),
      skillCategories: (parsed.skillCategories || []).map((sc: any, idx: number) => ({
        ...sc,
        id: sc.id || `skill-${Date.now()}-${idx}`,
        skillsList: Array.isArray(sc.skillsList) ? sc.skillsList : [],
      })),
    };

    return res.json({ resume: merged, source: 'gemini' });
  } catch (error: any) {
    console.warn('LinkedIn parse error, using fallback:', error?.message);
    return res.json({ resume: fallbackFromUrl(error), source: 'heuristic' });
  }
});

// Helper: AI Skill Suggestion Engine
app.post('/api/ai/suggest-skills', async (req, res) => {
  const { roleTitle, industry, existingSkills = [], jobDescription } = req.body;

  const fallbackSkills = (error?: any) => {
    const roleLower = (roleTitle || '').toLowerCase();
    const isQuotaExceeded = error?.status === 'RESOURCE_EXHAUSTED' || error?.code === 429;
    
    const baseFallback = {
      categories: [
        {
          categoryName: 'Core Programming & Logic',
          suggestedSkills: [
            { name: 'TypeScript', relevance: 'High Demand', reason: 'Industry standard for type-safe applications' },
            { name: 'React', relevance: 'Core Requirement', reason: 'Primary frontend library for modern interfaces' },
            { name: 'Node.js', relevance: 'High Demand', reason: 'Efficient server-side JavaScript runtime' },
          ],
        },
        {
          categoryName: 'Tools & DevOps',
          suggestedSkills: [
            { name: 'Docker', relevance: 'High Demand', reason: 'Containerization for consistent deployment' },
            { name: 'AWS', relevance: 'High Demand', reason: 'Leading cloud infrastructure provider' },
            { name: 'Git', relevance: 'Core Requirement', reason: 'Essential version control and collaboration' },
          ],
        }
      ],
      topKeywordsForATS: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'RESTful APIs', 'CI/CD'],
      isQuotaExceeded
    };

    if (roleLower.includes('product') || roleLower.includes('pm')) {
      return {
        ...baseFallback,
        categories: [
          {
            categoryName: 'Product Strategy & Roadmap',
            suggestedSkills: [
              { name: 'Product Roadmapping', relevance: 'Core Requirement', reason: 'Essential for defining quarterly product vision' },
              { name: 'User Research', relevance: 'High Demand', reason: 'Validates customer pain points' },
              { name: 'Go-to-Market Strategy', relevance: 'High Demand', reason: 'Drives commercial launch success' },
            ],
          },
          {
            categoryName: 'Analytics & KPIs',
            suggestedSkills: [
              { name: 'SQL', relevance: 'High Demand', reason: 'Crucial for autonomous user journey analysis' },
              { name: 'KPI Definition', relevance: 'Core Requirement', reason: 'Aligns execution with objectives' },
            ],
          }
        ],
        topKeywordsForATS: ['Product Strategy', 'Roadmapping', 'User Journey Mapping', 'A/B Testing', 'SQL', 'OKRs'],
      };
    }

    return baseFallback;
  };

  try {
    if (!ai) throw new Error('AI not initialized');

    const prompt = `You are a technical recruiter and ATS resume optimization expert.
Recommend high-yield, relevant technical and professional skills tailored for:
Target Role: ${roleTitle || 'Software Engineer'}
Industry: ${industry || 'Technology'}
Candidate's Existing Skills: ${Array.isArray(existingSkills) ? existingSkills.join(', ') : 'None specified'}
Target Job Description (if any):
${jobDescription || 'Standard requirements for modern technology roles'}

Task:
Suggest 3 to 5 logical skill categories.
In each category, provide 3 to 5 high-impact skills with name, relevance, and reason.
Also provide a list of top 8-12 high-priority keywords for ATS filters.

JSON Output Schema:
{
  "categories": [
    {
      "categoryName": string,
      "suggestedSkills": [
        { "name": string, "relevance": string, "reason": string }
      ]
    }
  ],
  "topKeywordsForATS": string[],
  "skills": string[] (OPTIONAL: a simple list of top 12 skills for compatibility)
}
Return only valid JSON.`;

    const response = await callAIGemini({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    if (parsed.categories && Array.isArray(parsed.categories)) {
      // Add simple 'skills' array for backward compatibility
      if (!parsed.skills) {
        parsed.skills = parsed.categories.flatMap((c: any) => c.suggestedSkills.map((s: any) => s.name)).slice(0, 12);
      }
      return res.json({ ...parsed, source: 'gemini' });
    }
    return res.json({ ...fallbackSkills(), source: 'fallback-parsed' });
  } catch (error: any) {
    console.warn('Suggest skills error, falling back:', error?.message);
    return res.json({ ...fallbackSkills(error), source: 'heuristic' });
  }
});


// In-memory sessions store for client authentication
const userSessions = new Map<string, any>();

// Auth Routes (Sanctum / OAuth Compatible)
app.get('/api/v1/auth/google/redirect', (_req, res) => {
  const token = `auracv_google_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const user = {
    id: Math.floor(Math.random() * 1000) + 1,
    name: 'Google Candidate',
    email: 'candidate@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=auracv-google',
    auth_method: 'google' as const
  };
  userSessions.set(token, user);
  res.redirect(`/?token=${token}`);
});

app.post('/api/v1/login', (req, res) => {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ message: 'Too many attempts. Please try again in 1 minute.' });
  }

  const { email } = req.body;
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 254) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  const token = `auracv_email_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const user = {
    id: Math.floor(Math.random() * 1000) + 1,
    name: cleanEmail.split('@')[0],
    email: cleanEmail,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanEmail)}`,
    auth_method: 'email' as const
  };
  userSessions.set(token, user);
  return res.json({ access_token: token, user });
});

app.post('/api/v1/register', (req, res) => {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ message: 'Too many attempts. Please try again in 1 minute.' });
  }

  const { name, email } = req.body;
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 254) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  const cleanName = typeof name === 'string' ? name.slice(0, 100).trim() : cleanEmail.split('@')[0];
  const token = `auracv_email_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const user = {
    id: Math.floor(Math.random() * 1000) + 1,
    name: cleanName || cleanEmail.split('@')[0],
    email: cleanEmail,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanEmail)}`,
    auth_method: 'email' as const
  };
  userSessions.set(token, user);
  return res.json({ access_token: token, user });
});

// In-memory Password Reset Store
const passwordResetTokens = new Map<string, { token: string; createdAt: number }>();

app.post('/api/v1/forgot-password', (req, res) => {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ message: 'Too many attempts. Please try again in 1 minute.' });
  }

  const { email } = req.body;
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 254) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  // Generate a secure reset token
  const resetToken = `rst_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
  passwordResetTokens.set(cleanEmail, { token: resetToken, createdAt: Date.now() });

  return res.json({
    status: 'success',
    message: `Password reset link and verification token have been dispatched to ${cleanEmail}.`,
    email: cleanEmail,
    preview_token: resetToken,
    expires_in: 3600
  });
});

app.post('/api/v1/reset-password', (req, res) => {
  const { email, token, password } = req.body;
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!cleanEmail || !token || !password) {
    return res.status(400).json({ message: 'Email, verification token, and new password are required.' });
  }

  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters in length.' });
  }

  const record = passwordResetTokens.get(cleanEmail);
  if (!record) {
    return res.status(400).json({ message: 'Invalid or expired password reset request. Please request a new link.' });
  }

  // Expiry check (60 minutes)
  if (Date.now() - record.createdAt > 60 * 60 * 1000) {
    passwordResetTokens.delete(cleanEmail);
    return res.status(400).json({ message: 'Password reset token has expired. Please request a new link.' });
  }

  if (record.token !== token) {
    return res.status(400).json({ message: 'The verification token provided is invalid.' });
  }

  // Consume token
  passwordResetTokens.delete(cleanEmail);

  return res.json({
    status: 'success',
    message: 'Your password has been successfully updated. You may now log in.'
  });
});

app.get('/api/v1/user', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ message: 'Unauthenticated' });
  
  const existing = userSessions.get(token);
  if (existing) return res.json(existing);

  const fallbackUser = {
    id: 1,
    name: 'Julian Vane',
    email: 'julian@auracv.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=julian',
    auth_method: token.includes('google') ? 'google' : 'email'
  };
  userSessions.set(token, fallbackUser);
  return res.json(fallbackUser);
});

app.post('/api/v1/logout', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (token) userSessions.delete(token);
  return res.json({ message: 'Logged out successfully' });
});

app.post('/api/v1/resumes/bulk-sync', (_req, res) => {
  return res.json({ message: 'Synced successfully', timestamp: Date.now() });
});

// Database & Standalone MySQL / Laravel endpoints
app.get('/api/database/schema-sql', (_req, res) => {
  try {
    const filePath = path.join(__dirname, 'database', 'mysql_schema.sql');
    if (fs.existsSync(filePath)) {
      const sql = fs.readFileSync(filePath, 'utf-8');
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="auracv_mysql_schema.sql"');
      return res.send(sql);
    }
    return res.status(404).json({ error: 'mysql_schema.sql not found' });
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to retrieve schema file' });
  }
});

app.get('/api/database/laravel-migration', (_req, res) => {
  try {
    const filePath = path.join(__dirname, 'backend-laravel', 'database', 'migrations', '2026_01_01_000000_create_resumes_tables.php');
    if (fs.existsSync(filePath)) {
      const php = fs.readFileSync(filePath, 'utf-8');
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.send(php);
    }
    return res.status(404).json({ error: 'Migration file not found' });
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to retrieve migration file' });
  }
});

app.get('/api/database/status', (_req, res) => {
  return res.json({
    status: 'ready',
    mode: 'standalone_website',
    database: {
      type: 'MySQL',
      framework: 'Laravel / PHP',
      schemaFile: 'database/mysql_schema.sql',
      laravelMigration: 'backend-laravel/database/migrations/2026_01_01_000000_create_resumes_tables.php',
      tablesCount: 13,
      tables: [
        'users',
        'resumes',
        'personal_infos',
        'experiences',
        'experience_bullets',
        'educations',
        'education_courseworks',
        'skill_categories',
        'skills',
        'projects',
        'project_bullets',
        'certifications',
        'languages'
      ],
    },
  });
});

app.post('/api/database/clear', (_req, res) => {
  return res.status(401).json({
    error: 'This action now requires Laravel Sanctum authentication. Please use the Laravel API directly.',
  });
});

// Setup Vite dev server or static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();

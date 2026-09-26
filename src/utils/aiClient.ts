/**
 * Utility to handle AI API calls with quota tracking, retry logic, and robust client fallbacks.
 */

const STORAGE_KEY = 'auracv_ai_quota_exceeded';

export interface AIResponse<T> {
  data?: T;
  error?: string;
  isQuotaExceeded?: boolean;
}

export async function callAI<T>(endpoint: string, body: any, isRetry = false): Promise<AIResponse<T>> {
  // Check if quota was previously exceeded
  if (localStorage.getItem(STORAGE_KEY) === 'true') {
    // Return graceful heuristic fallback data instead of blocking hard error
    if (endpoint === '/api/ai/generate-summary') {
      const skillsStr = Array.isArray(body?.skills) && body.skills.length > 0 ? body.skills.slice(0, 5).join(', ') : 'modern industry best practices';
      const fallbackSummary = `Dedicated and results-oriented ${body?.jobTitle || 'Professional'} with hands-on expertise across ${skillsStr}. Proven track record designing scalable solutions, maintaining high quality standards, and optimizing core operational workflows. Passionate about applying rigorous engineering and strategic standards to drive measurable organizational impact.`;
      return { data: { summary: fallbackSummary, source: 'client-fallback-quota' } as any };
    }
    if (endpoint === '/api/ai/enhance-bullet') {
      const clean = (body?.bullet || '').trim();
      const verbs = ['Spearheaded', 'Orchestrated', 'Optimized', 'Facilitated', 'Implemented', 'Streamlined'];
      const picked = verbs[Math.floor(Math.random() * verbs.length)];
      const improved = `${picked} ${clean.replace(/^(managed|helped|did|worked on|was responsible for)\s+/i, '')} resulting in measurable improvements and high-quality deliverables.`;
      return { data: { enhanced: improved, source: 'client-fallback-quota' } as any };
    }
    return { 
      error: 'Daily AI request limit reached. Using smart heuristic fallbacks for your session.',
      isQuotaExceeded: true 
    };
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const rawData = await res.json().catch(() => ({}));

    // Handle 429 Rate Limiting or Server reported quota exhaustion
    if (res.status === 429 || rawData.isQuotaExceeded) {
      localStorage.setItem(STORAGE_KEY, 'true');
      if (endpoint === '/api/ai/generate-summary') {
        const skillsStr = Array.isArray(body?.skills) && body.skills.length > 0 ? body.skills.slice(0, 5).join(', ') : 'modern industry best practices';
        const fallbackSummary = `Dedicated and results-oriented ${body?.jobTitle || 'Professional'} with hands-on expertise across ${skillsStr}. Proven track record designing scalable solutions, maintaining high quality standards, and optimizing core operational workflows. Passionate about applying rigorous engineering and strategic standards to drive measurable organizational impact.`;
        return { data: { summary: fallbackSummary, source: 'client-fallback-429' } as any };
      }
      if (endpoint === '/api/ai/enhance-bullet') {
        const clean = (body?.bullet || '').trim();
        const verbs = ['Spearheaded', 'Orchestrated', 'Optimized', 'Facilitated', 'Implemented', 'Streamlined'];
        const picked = verbs[Math.floor(Math.random() * verbs.length)];
        const improved = `${picked} ${clean.replace(/^(managed|helped|did|worked on|was responsible for)\s+/i, '')} resulting in measurable improvements and high-quality deliverables.`;
        return { data: { enhanced: improved, source: 'client-fallback-429' } as any };
      }
      return { 
        error: 'Daily AI request limit reached. Using smart heuristic fallbacks.',
        isQuotaExceeded: true 
      };
    }

    if (res.status === 503) {
      if (!isRetry) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return callAI(endpoint, body, true);
      }
    }

    if (!res.ok) {
      throw new Error(`AI request failed with status ${res.status}`);
    }

    return { data: rawData };
  } catch (err) {
    console.warn(`AI Client Network/Fetch Error (${endpoint}), applying intelligent local fallback:`, err);
    
    if (endpoint === '/api/ai/generate-summary') {
      const skillsStr = Array.isArray(body?.skills) && body.skills.length > 0 ? body.skills.slice(0, 5).join(', ') : 'modern industry best practices';
      const fallbackSummary = `Dedicated and results-oriented ${body?.jobTitle || 'Professional'} with hands-on expertise across ${skillsStr}. Proven track record designing scalable solutions, maintaining high quality standards, and optimizing core operational workflows. Passionate about applying rigorous engineering and strategic standards to drive measurable organizational impact.`;
      return { data: { summary: fallbackSummary, source: 'client-network-fallback' } as any };
    }
    if (endpoint === '/api/ai/enhance-bullet') {
      const clean = (body?.bullet || '').trim();
      const verbs = ['Spearheaded', 'Orchestrated', 'Optimized', 'Facilitated', 'Implemented', 'Streamlined'];
      const picked = verbs[Math.floor(Math.random() * verbs.length)];
      const improved = `${picked} ${clean.replace(/^(managed|helped|did|worked on|was responsible for)\s+/i, '')} resulting in measurable improvements and high-quality deliverables.`;
      return { data: { enhanced: improved, source: 'client-network-fallback' } as any };
    }

    return { error: 'AI service temporarily offline. Applied local heuristic enhancement.' };
  }
}

export function resetAIQuotaFlag() {
  localStorage.removeItem(STORAGE_KEY);
}

export function isAIQuotaExceeded(): boolean {
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

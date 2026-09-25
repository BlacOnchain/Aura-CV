
/**
 * Utility to handle AI API calls with quota tracking and retry logic.
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
      if (rawData.isQuotaExceeded || (rawData.error?.status === 'RESOURCE_EXHAUSTED')) {
        localStorage.setItem(STORAGE_KEY, 'true');
        return { 
          error: 'Daily AI request limit reached. Using smart heuristic fallbacks.',
          isQuotaExceeded: true 
        };
      }

      // If it's a transient 429 (not exhaustion), retry once
      if (!isRetry) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return callAI(endpoint, body, true);
      }

      return { error: 'AI service is busy due to high demand. Please try again in a few moments.' };
    }

    if (res.status === 503) {
      if (!isRetry) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return callAI(endpoint, body, true);
      }
      return { error: 'AI service is temporarily unavailable. Please try again later.' };
    }

    if (!res.ok) {
      const errText = await res.text().catch(() => 'Unknown error');
      throw new Error(`AI request failed: ${errText}`);
    }

    return { data: rawData };
  } catch (err) {
    console.error(`AI Client Error (${endpoint}):`, err);
    return { error: err instanceof Error ? err.message : 'An unexpected error occurred while contacting AI.' };
  }
}

export function resetAIQuotaFlag() {
  localStorage.removeItem(STORAGE_KEY);
}

export function isAIQuotaExceeded(): boolean {
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

// Privacy-preserving in-app analytics utility
// Respects user cookie consent preferences

export type AnalyticsEvent = 
  | 'page_view'
  | 'studio_started'
  | 'ats_scanned'
  | 'bullet_enhanced'
  | 'resume_created'
  | 'pdf_exported'
  | 'cover_letter_generated';

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, any>) {
  const consent = localStorage.getItem('auracv_cookie_consent');
  if (consent === 'all') {
    // Only track if consent was granted
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Analytics Event: ${event}]`, properties);
    }
  }
}

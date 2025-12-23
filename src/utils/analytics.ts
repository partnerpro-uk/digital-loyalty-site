/**
 * Analytics utility for PostHog event tracking
 *
 * Usage:
 * import { trackEvent, events } from '../utils/analytics';
 *
 * // Track a custom event
 * trackEvent('custom_event', { prop: 'value' });
 *
 * // Use predefined events
 * events.ctaClicked('hero', 'Get Started');
 */

// Type declaration for PostHog
declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
      identify: (distinctId: string, properties?: Record<string, unknown>) => void;
      reset: () => void;
      opt_out_capturing: () => void;
      opt_in_capturing: () => void;
      isFeatureEnabled: (key: string) => boolean;
      getFeatureFlag: (key: string) => string | boolean | undefined;
    };
  }
}

/**
 * Track a custom event
 * @param eventName - Name of the event
 * @param properties - Optional event properties
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Identify a user (call after login/signup)
 * @param userId - Unique user identifier
 * @param traits - Optional user traits
 */
export function identifyUser(userId: string, traits?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.identify(userId, traits);
  }
}

/**
 * Reset user identity (call on logout)
 */
export function resetUser(): void {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.reset();
  }
}

/**
 * Predefined event helpers for consistent tracking
 */
export const events = {
  /**
   * Track CTA button clicks
   * @param location - Where on the page (hero, pricing, final_cta, etc.)
   * @param buttonText - Text of the button clicked
   */
  ctaClicked: (location: string, buttonText: string): void => {
    trackEvent('cta_clicked', {
      location,
      button_text: buttonText,
    });
  },

  /**
   * Track video interactions
   * @param action - play, pause, complete
   * @param videoId - Identifier for the video
   * @param watchTime - Optional time watched in seconds
   */
  videoInteraction: (action: 'play' | 'pause' | 'complete', videoId: string, watchTime?: number): void => {
    trackEvent('video_interaction', {
      action,
      video_id: videoId,
      watch_time_seconds: watchTime,
    });
  },

  /**
   * Track FAQ accordion expansion
   * @param question - The question that was expanded
   * @param category - Optional category of the FAQ
   */
  faqExpanded: (question: string, category?: string): void => {
    trackEvent('faq_expanded', {
      question,
      category,
    });
  },

  /**
   * Track form interactions - when user starts filling
   * @param formId - Identifier for the form
   * @param formType - Type of form (lead_capture, contact, demo_request)
   */
  formStarted: (formId: string, formType: string): void => {
    trackEvent('form_started', {
      form_id: formId,
      form_type: formType,
    });
  },

  /**
   * Track successful form submission
   * @param formId - Identifier for the form
   * @param formType - Type of form
   * @param durationSeconds - Time taken to fill the form
   */
  formSubmitted: (formId: string, formType: string, durationSeconds: number): void => {
    trackEvent('form_submitted', {
      form_id: formId,
      form_type: formType,
      duration_seconds: Math.round(durationSeconds),
    });
  },

  /**
   * Track form errors
   * @param formId - Identifier for the form
   * @param formType - Type of form
   * @param errorType - Type of error (validation, network, etc.)
   */
  formError: (formId: string, formType: string, errorType: string): void => {
    trackEvent('form_error', {
      form_id: formId,
      form_type: formType,
      error_type: errorType,
    });
  },

  /**
   * Track section visibility (scroll depth)
   * @param sectionId - Identifier for the section
   * @param sectionName - Human readable section name
   */
  sectionViewed: (sectionId: string, sectionName: string): void => {
    trackEvent('section_viewed', {
      section_id: sectionId,
      section_name: sectionName,
    });
  },

  /**
   * Track pricing plan selection
   * @param planName - Name of the plan (starter, professional, enterprise)
   * @param planPrice - Price of the plan
   * @param billingPeriod - monthly or annual
   */
  pricingPlanSelected: (planName: string, planPrice: string, billingPeriod: 'monthly' | 'annual'): void => {
    trackEvent('pricing_plan_selected', {
      plan_name: planName,
      plan_price: planPrice,
      billing_period: billingPeriod,
    });
  },

  /**
   * Track testimonial interaction
   * @param testimonialId - Identifier for the testimonial
   * @param action - view, click_company, etc.
   */
  testimonialInteraction: (testimonialId: string, action: string): void => {
    trackEvent('testimonial_interaction', {
      testimonial_id: testimonialId,
      action,
    });
  },

  /**
   * Track page view with additional context
   * @param pageName - Name of the page
   * @param locale - Current locale
   */
  pageViewed: (pageName: string, locale: string): void => {
    trackEvent('page_viewed', {
      page_name: pageName,
      locale,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    });
  },

  /**
   * Track region/currency change
   * @param fromRegion - Previous region
   * @param toRegion - New region
   * @param currency - New currency
   */
  regionChanged: (fromRegion: string, toRegion: string, currency: string): void => {
    trackEvent('region_changed', {
      from_region: fromRegion,
      to_region: toRegion,
      currency,
    });
  },

  /**
   * Track language change
   * @param fromLang - Previous language
   * @param toLang - New language
   */
  languageChanged: (fromLang: string, toLang: string): void => {
    trackEvent('language_changed', {
      from_lang: fromLang,
      to_lang: toLang,
    });
  },
};

/**
 * Helper to track scroll depth
 * Call this in a component to automatically track when sections come into view
 */
export function initScrollTracking(): void {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return;
  }

  const sections = document.querySelectorAll('section[id]');
  const trackedSections = new Set<string>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (!trackedSections.has(sectionId)) {
            trackedSections.add(sectionId);
            const sectionName = entry.target.getAttribute('data-section-name') || sectionId;
            events.sectionViewed(sectionId, sectionName);
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
}

import { client } from './client';

// Type definitions for site settings
export interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'github' | 'discord';
  url: string;
}

export type CtaMode = 'form_modal' | 'form_page' | 'app_redirect' | 'calendar';
export type EnterpriseCtaMode = 'same' | 'contact_form' | 'calendar' | 'external';
export type CalendarEmbedType = 'embed' | 'popup' | 'redirect';

export interface CtaConfig {
  ctaMode: CtaMode;
  appSignupUrl?: string;
  calendarUrl?: string;
  calendarEmbedType?: CalendarEmbedType;
  enterpriseCtaMode: EnterpriseCtaMode;
  enterpriseCalendarUrl?: string;
  enterpriseExternalUrl?: string;
  passContextToApp?: boolean;
  showFormAfterCalendar?: boolean;
}

export interface SiteSettings {
  siteName: string;
  tagline?: string;
  logo?: string;
  logoDark?: string;
  favicon?: string;
  // Theme colors
  primaryColor?: string;
  primaryColorDark?: string;
  accentColor?: string;
  backgroundLight?: string;
  backgroundDark?: string;
  surfaceLight?: string;
  surfaceDark?: string;
  textLight?: string;
  textDark?: string;
  // Typography
  headingFont?: string;
  bodyFont?: string;
  // CTA Configuration
  ctaMode?: CtaMode;
  appSignupUrl?: string;
  calendarUrl?: string;
  calendarEmbedType?: CalendarEmbedType;
  enterpriseCtaMode?: EnterpriseCtaMode;
  enterpriseCalendarUrl?: string;
  enterpriseExternalUrl?: string;
  passContextToApp?: boolean;
  showFormAfterCalendar?: boolean;
  // Social
  socialLinks?: SocialLink[];
  // Analytics
  posthogKey?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
}

// Default values for when Sanity content is not available
export const defaultSettings: SiteSettings = {
  siteName: 'Digital Loyalty',
  tagline: 'Customer Loyalty Made Simple',
  primaryColor: '#6366f1',
  primaryColorDark: '#818cf8',
  accentColor: '#f59e0b',
  backgroundLight: '#ffffff',
  backgroundDark: '#0f172a',
  surfaceLight: '#f8fafc',
  surfaceDark: '#1e293b',
  textLight: '#0f172a',
  textDark: '#f8fafc',
  headingFont: 'Inter',
  bodyFont: 'Inter',
  // CTA defaults
  ctaMode: 'form_modal',
  enterpriseCtaMode: 'contact_form',
  passContextToApp: true,
  calendarEmbedType: 'embed',
  showFormAfterCalendar: false,
  socialLinks: []
};

// Default CTA config for easy access
export const defaultCtaConfig: CtaConfig = {
  ctaMode: 'form_modal',
  enterpriseCtaMode: 'contact_form',
  passContextToApp: true,
  calendarEmbedType: 'embed',
  showFormAfterCalendar: false
};

/**
 * Fetch site settings singleton
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await client.fetch<SiteSettings | null>(`
    *[_type == "siteSettings"][0]{
      siteName,
      tagline,
      "logo": logo.asset->url,
      "logoDark": logoDark.asset->url,
      "favicon": favicon.asset->url,
      primaryColor,
      primaryColorDark,
      accentColor,
      backgroundLight,
      backgroundDark,
      surfaceLight,
      surfaceDark,
      textLight,
      textDark,
      headingFont,
      bodyFont,
      // CTA Configuration
      ctaMode,
      appSignupUrl,
      calendarUrl,
      calendarEmbedType,
      enterpriseCtaMode,
      enterpriseCalendarUrl,
      enterpriseExternalUrl,
      passContextToApp,
      showFormAfterCalendar,
      // Social & Analytics
      socialLinks[] {
        platform,
        url
      },
      posthogKey,
      googleAnalyticsId,
      googleTagManagerId
    }
  `);

  // Merge with defaults for any missing values
  return {
    ...defaultSettings,
    ...settings
  };
}

/**
 * Get CTA configuration from settings
 */
export function getCtaConfig(settings: SiteSettings): CtaConfig {
  return {
    ctaMode: settings.ctaMode || defaultCtaConfig.ctaMode,
    appSignupUrl: settings.appSignupUrl,
    calendarUrl: settings.calendarUrl,
    calendarEmbedType: settings.calendarEmbedType || defaultCtaConfig.calendarEmbedType,
    enterpriseCtaMode: settings.enterpriseCtaMode || defaultCtaConfig.enterpriseCtaMode,
    enterpriseCalendarUrl: settings.enterpriseCalendarUrl,
    enterpriseExternalUrl: settings.enterpriseExternalUrl,
    passContextToApp: settings.passContextToApp ?? defaultCtaConfig.passContextToApp,
    showFormAfterCalendar: settings.showFormAfterCalendar ?? defaultCtaConfig.showFormAfterCalendar
  };
}

/**
 * Build CTA URL with context params
 */
export function buildCtaUrl(
  baseUrl: string,
  context: { plan?: string; source?: string; email?: string; utmSource?: string; utmMedium?: string; utmCampaign?: string }
): string {
  const url = new URL(baseUrl);
  if (context.plan) url.searchParams.set('plan', context.plan);
  if (context.source) url.searchParams.set('source', context.source);
  if (context.email) url.searchParams.set('email', context.email);
  if (context.utmSource) url.searchParams.set('utm_source', context.utmSource);
  if (context.utmMedium) url.searchParams.set('utm_medium', context.utmMedium);
  if (context.utmCampaign) url.searchParams.set('utm_campaign', context.utmCampaign);
  return url.toString();
}

/**
 * Get CSS custom properties from site settings
 * Returns a string of CSS variables to inject into :root
 */
export function getThemeCSSVariables(settings: SiteSettings): Record<string, string> {
  return {
    '--color-primary': settings.primaryColor || defaultSettings.primaryColor!,
    '--color-primary-dark': settings.primaryColorDark || defaultSettings.primaryColorDark!,
    '--color-accent': settings.accentColor || defaultSettings.accentColor!,
    '--color-bg-light': settings.backgroundLight || defaultSettings.backgroundLight!,
    '--color-bg-dark': settings.backgroundDark || defaultSettings.backgroundDark!,
    '--color-surface-light': settings.surfaceLight || defaultSettings.surfaceLight!,
    '--color-surface-dark': settings.surfaceDark || defaultSettings.surfaceDark!,
    '--color-text-light': settings.textLight || defaultSettings.textLight!,
    '--color-text-dark': settings.textDark || defaultSettings.textDark!,
    '--font-heading': `'${settings.headingFont || defaultSettings.headingFont}', sans-serif`,
    '--font-body': `'${settings.bodyFont || defaultSettings.bodyFont}', sans-serif`,
  };
}

/**
 * Get social links as icon data
 */
export function getSocialIconData(platform: string): { icon: string; label: string } {
  const icons: Record<string, { icon: string; label: string }> = {
    twitter: { icon: 'twitter', label: 'Twitter/X' },
    linkedin: { icon: 'linkedin', label: 'LinkedIn' },
    instagram: { icon: 'instagram', label: 'Instagram' },
    facebook: { icon: 'facebook', label: 'Facebook' },
    youtube: { icon: 'youtube', label: 'YouTube' },
    tiktok: { icon: 'music', label: 'TikTok' },
    github: { icon: 'github', label: 'GitHub' },
    discord: { icon: 'message-circle', label: 'Discord' }
  };

  return icons[platform] || { icon: 'link', label: platform };
}

/**
 * Region Detection & Storage
 * Detects user's region (country + language + currency) from IP with fallbacks
 */

import { regions, getRegionById, detectRegionFromCountry, getRegionByLanguage, type Region } from '../config/regions';

interface GeolocationResponse {
  country_code?: string;
  country?: string;
}

/**
 * Detect country from IP address using ipapi.co
 * Free tier: 1000 requests/day
 */
export async function detectCountryFromIP(): Promise<string | null> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: GeolocationResponse = await response.json();
    
    if (data.country_code) {
      return data.country_code;
    }
    
    return null;
  } catch (error) {
    console.error('IP geolocation failed:', error);
    return null;
  }
}

/**
 * Detect user's region with full fallback chain
 * 1. Saved preference (localStorage)
 * 2. IP geolocation → country → default language for that country
 * 3. Browser language
 * 4. Default (US English)
 */
export async function detectUserRegion(): Promise<Region> {
  // 1. Check if user has previously selected a region
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedRegionId = localStorage.getItem('user-region');
    if (savedRegionId) {
      const savedRegion = getRegionById(savedRegionId);
      if (savedRegion) {
        console.log('Using saved region:', savedRegion.id);
        return savedRegion;
      }
    }
  }
  
  // 2. Try IP geolocation
  const ipCountry = await detectCountryFromIP();
  if (ipCountry) {
    console.log('Detected country from IP:', ipCountry);
    const region = detectRegionFromCountry(ipCountry);
    return region;
  }
  
  // 3. Try browser language as fallback
  if (typeof window !== 'undefined' && window.navigator) {
    const browserLang = navigator.language.split('-')[0];
    console.log('Using browser language:', browserLang);
    const region = getRegionByLanguage(browserLang);
    if (region) return region;
  }
  
  // 4. Final fallback: US English
  console.log('Using default region: US English');
  return regions[0]; // us-en
}

/**
 * Save user's region preference
 */
export function saveUserRegion(regionId: string): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('user-region', regionId);
    console.log('Saved user region:', regionId);
    
    const region = getRegionById(regionId);
    if (region) {
      // Dispatch event for other components to listen to
      window.dispatchEvent(new CustomEvent('regionChanged', {
        detail: {
          region,
          regionId,
          countryCode: region.countryCode,
          language: region.language,
          currency: region.currency
        }
      }));
    }
  }
}

/**
 * Get currently selected region
 */
export function getCurrentRegion(): Region {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedRegionId = localStorage.getItem('user-region');
    if (savedRegionId) {
      const region = getRegionById(savedRegionId);
      if (region) return region;
    }
  }
  return regions[0]; // Default: US English
}

/**
 * Check if auto-detection has been shown
 */
export function hasSeenDetection(): boolean {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('has-seen-region-detection') === 'true';
  }
  return false;
}

/**
 * Mark auto-detection as seen
 */
export function markDetectionSeen(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('has-seen-region-detection', 'true');
  }
}



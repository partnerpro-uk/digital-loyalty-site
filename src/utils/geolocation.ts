/**
 * IP Geolocation Detection
 * Detects user's country from IP address with fallbacks
 */

import { countries, getCountryByCode, getDefaultCountryForLanguage } from '../config/countries';

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
      // Verify country is in our supported list
      const country = getCountryByCode(data.country_code);
      if (country) {
        return data.country_code;
      }
    }
    
    return null;
  } catch (error) {
    console.error('IP geolocation failed:', error);
    return null;
  }
}

/**
 * Detect user's country with full fallback chain
 * 1. Saved preference (localStorage)
 * 2. IP geolocation
 * 3. Browser language
 * 4. Default (US)
 */
export async function detectUserCountry(): Promise<string> {
  // 1. Check if user has previously selected a country
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedCountry = localStorage.getItem('user-country');
    if (savedCountry && getCountryByCode(savedCountry)) {
      console.log('Using saved country:', savedCountry);
      return savedCountry;
    }
  }
  
  // 2. Try IP geolocation
  const ipCountry = await detectCountryFromIP();
  if (ipCountry) {
    console.log('Detected country from IP:', ipCountry);
    return ipCountry;
  }
  
  // 3. Try browser language as fallback
  if (typeof window !== 'undefined' && window.navigator) {
    const browserLang = navigator.language.split('-')[0];
    console.log('Using browser language:', browserLang);
    const defaultCountry = getDefaultCountryForLanguage(browserLang);
    return defaultCountry.code;
  }
  
  // 4. Final fallback: US
  console.log('Using default country: US');
  return 'US';
}

/**
 * Save user's country preference
 */
export function saveUserCountry(countryCode: string): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('user-country', countryCode);
    console.log('Saved user country:', countryCode);
    
    // Dispatch event for other components to listen to
    window.dispatchEvent(new CustomEvent('countryChanged', {
      detail: {
        countryCode,
        country: getCountryByCode(countryCode)
      }
    }));
  }
}

/**
 * Get currently selected country
 */
export function getCurrentCountry(): string {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('user-country') || 'US';
  }
  return 'US';
}



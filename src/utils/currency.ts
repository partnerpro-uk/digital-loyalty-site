/**
 * Currency Formatting Utilities
 * Handles currency display with proper symbols and positioning
 */

import { getCountryByCode, type Country } from '../config/countries';

export interface FormatOptions {
  style?: 'symbol' | 'code' | 'name';
  decimals?: number;
  locale?: string;
}

/**
 * Format a number as currency with proper symbol and positioning
 */
export function formatCurrency(
  amount: number,
  currency: string,
  countryCode?: string,
  options: FormatOptions = {}
): string {
  const { style = 'symbol', decimals = 0, locale = 'en-US' } = options;
  
  const country: Country | undefined = countryCode ? getCountryByCode(countryCode) : undefined;
  
  // Format number with locale
  const formattedAmount = amount.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  
  // Code style: "1,000 USD"
  if (style === 'code') {
    return `${formattedAmount} ${currency}`;
  }
  
  // Get symbol and position
  const symbol = country?.currencySymbol || currency;
  const position = country?.currencyPosition || 'before';
  
  // Format with symbol
  if (position === 'before') {
    return `${symbol}${formattedAmount}`;
  } else {
    return `${formattedAmount}${symbol}`;
  }
}

/**
 * Calculate "per day" pricing from monthly price
 */
export function calculatePerDay(monthlyPrice: number): number {
  return monthlyPrice / 30;
}

/**
 * Calculate yearly savings (monthly × 12 - yearly price)
 */
export function calculateYearlySavings(monthly: number, yearly: number): number {
  return (monthly * 12) - yearly;
}

/**
 * Calculate savings percentage
 */
export function calculateSavingsPercentage(monthly: number, yearly: number): number {
  const savings = calculateYearlySavings(monthly, yearly);
  const totalMonthly = monthly * 12;
  return Math.round((savings / totalMonthly) * 100);
}

/**
 * Format savings percentage with locale-aware formatting
 */
export function formatSavingsPercentage(percentage: number, locale: string = 'en'): string {
  if (!percentage || percentage <= 0) return '0';
  return Math.round(percentage).toString();
}

/**
 * Get currency info by code
 */
export function getCurrencyInfo(currency: string): { symbol: string; position: 'before' | 'after' } {
  const currencyMap: Record<string, { symbol: string; position: 'before' | 'after' }> = {
    'USD': { symbol: '$', position: 'before' },
    'GBP': { symbol: '£', position: 'before' },
    'EUR': { symbol: '€', position: 'after' },
    'CAD': { symbol: '$', position: 'before' },
    'AUD': { symbol: '$', position: 'before' },
    'MXN': { symbol: '$', position: 'before' },
    'ARS': { symbol: '$', position: 'before' },
    'BRL': { symbol: 'R$', position: 'before' },
    'CHF': { symbol: 'Fr.', position: 'before' },
    'AED': { symbol: 'د.إ', position: 'after' },
    'SAR': { symbol: 'ر.س', position: 'after' },
    'EGP': { symbol: 'ج.م', position: 'after' },
    'CNY': { symbol: '¥', position: 'before' },
    'TWD': { symbol: 'NT$', position: 'before' }
  };
  
  return currencyMap[currency] || { symbol: currency, position: 'before' };
}


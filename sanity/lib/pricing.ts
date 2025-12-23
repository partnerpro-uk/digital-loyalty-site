import { client } from './client';

export const PRICING_QUERY = `
  *[_type == "pricingPlan" && language == $language] | order(order asc) {
    _id,
    planId,
    language,
    region,
    name,
    prices,
    features,
    popular,
    isEnterprise,
    buttonText,
    order,
    sourceLanguage,
    translationStatus,
    autoTranslated,
    stripePriceIds
  }
`;

export interface Price {
  currency: string;
  monthly: number;
  yearly: number;
  quarterly?: number;
}

export interface PricingPlan {
  _id: string;
  planId: string;
  language: string;
  region?: string;
  name: string;
  prices: Price[];
  features: string[];
  popular: boolean;
  isEnterprise?: boolean;
  buttonText?: string;
  order: number;
  sourceLanguage?: string;
  translationStatus?: string;
  autoTranslated?: boolean;
  stripePriceIds?: {
    monthly?: string;
    yearly?: string;
  };
}

/**
 * Get all pricing plans for a specific language
 */
export async function getPricingPlans(language: string = 'en'): Promise<PricingPlan[]> {
  try {
    return await client.fetch(PRICING_QUERY, { language });
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    return [];
  }
}

/**
 * Get all pricing plans grouped by language
 */
export async function getAllPricingPlans(): Promise<Record<string, PricingPlan[]>> {
  try {
    const allPlans = await client.fetch<PricingPlan[]>(`
      *[_type == "pricingPlan"] | order(language asc, order asc)
    `);
    
    return allPlans.reduce((acc, plan) => {
      if (!acc[plan.language]) acc[plan.language] = [];
      acc[plan.language].push(plan);
      return acc;
    }, {} as Record<string, PricingPlan[]>);
  } catch (error) {
    console.error('Error fetching all pricing plans:', error);
    return {};
  }
}

/**
 * Get price for a specific currency from a plan
 */
export function getPriceForCurrency(plan: PricingPlan, currency: string): Price | undefined {
  return plan.prices.find(p => p.currency === currency);
}

/**
 * Get localized plan name
 */
export function getLocalizedPlanName(plan: PricingPlan): string {
  return plan.name || plan.planId;
}

/**
 * Get localized features
 */
export function getLocalizedFeatures(plan: PricingPlan): string[] {
  return plan.features || [];
}

/**
 * Calculate savings percentage for annual vs monthly pricing
 */
export function calculateSavingsPercentage(monthly: number, yearly: number): number {
  if (!monthly || !yearly || monthly === 0) return 0;
  return Math.round(((monthly * 12 - yearly) / (monthly * 12)) * 100);
}

/**
 * Check if plan is enterprise/contact-sales type
 */
export function isEnterprisePlan(plan: PricingPlan): boolean {
  return plan.isEnterprise === true;
}

/**
 * Get button configuration based on plan type
 */
export function getPlanButtonConfig(plan: PricingPlan, defaultContactText: string = 'Contact Sales', defaultGetStartedText: string = 'Get Started') {
  if (isEnterprisePlan(plan)) {
    return {
      text: plan.buttonText || defaultContactText,
      isContactSales: true
    };
  }
  
  return {
    text: plan.buttonText || defaultGetStartedText,
    isContactSales: false
  };
}

/**
 * Get all language versions of a specific plan
 */
export async function getPlanTranslations(planId: string): Promise<PricingPlan[]> {
  try {
    return await client.fetch<PricingPlan[]>(`
      *[_type == "pricingPlan" && planId == $planId] | order(language asc)
    `, { planId });
  } catch (error) {
    console.error('Error fetching plan translations:', error);
    return [];
  }
}

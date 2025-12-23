/**
 * Seed script to populate Sanity CMS with initial content
 * Run with: npx tsx scripts/seed-sanity.ts
 */

import { createClient } from '@sanity/client';
import { v4 as uuidv4 } from 'uuid';

const client = createClient({
  projectId: 'zutnuftx',
  dataset: 'production',
  apiVersion: '2025-01-16',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN
});

// Site Settings (Singleton)
const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  siteName: 'Digital Loyalty',
  tagline: 'Customer Loyalty Made Simple',
  primaryColor: '#8b5cf6',
  primaryColorDark: '#a78bfa',
  accentColor: '#8b5cf6',
  backgroundLight: '#ffffff',
  backgroundDark: '#0f0f0f',
  surfaceLight: '#f8fafc',
  surfaceDark: '#1e1e1e',
  textLight: '#1f2937',
  textDark: '#f9fafb',
  headingFont: 'Inter',
  bodyFont: 'Inter',
  // CTA Configuration - Digital Loyalty uses "done for you" model
  ctaMode: 'form_modal',  // Options: 'form_modal', 'form_page', 'app_redirect', 'calendar'
  enterpriseCtaMode: 'contact_form',  // Options: 'same', 'contact_form', 'calendar', 'external'
  passContextToApp: true,
  // Uncomment these for different modes:
  // appSignupUrl: 'https://app.digitalloyalty.com/signup',
  // calendarUrl: 'https://calendly.com/digitalloyalty/demo',
  // calendarEmbedType: 'embed',  // Options: 'embed', 'popup', 'redirect'
  // enterpriseCalendarUrl: 'https://calendly.com/digitalloyalty/enterprise',
  socialLinks: [
    { _key: uuidv4(), platform: 'twitter', url: 'https://twitter.com/digitalloyalty' },
    { _key: uuidv4(), platform: 'instagram', url: 'https://instagram.com/digitalloyalty' },
    { _key: uuidv4(), platform: 'linkedin', url: 'https://linkedin.com/company/digitalloyalty' }
  ]
};

// Page Content - English (Home)
const pageContentEnglish = {
  _type: 'pageContent',
  _id: 'home-en',
  pageId: 'home',
  language: 'en',
  autoTranslated: false,
  translationStatus: 'published',

  seo: {
    metaTitle: 'Digital Loyalty - Modern Loyalty Cards for Apple & Google Wallet',
    metaDescription: 'Create digital loyalty cards that live in your customers\' Apple Wallet or Google Wallet. No app download required. Start your free trial today.'
  },

  hero: {
    badge: 'The Future of Customer Loyalty',
    title: 'Digital Loyalty Cards',
    titleHighlight: 'That Actually Work',
    subtitle: 'Create beautiful loyalty cards that live in Apple Wallet & Google Wallet. No app downloads. No plastic cards. Just tap and earn rewards.',
    primaryCta: { text: 'Start Free Trial', url: '#get-started' },
    secondaryCta: { text: 'See How It Works', url: '#how-it-works' },
    trustIndicators: ['No credit card required', '14-day free trial', 'Setup in 5 minutes']
  },

  socialProof: {
    trustStatement: 'Trusted by 2,500+ businesses worldwide'
  },

  problemSolution: {
    sectionBadge: 'The Problem',
    title: 'Traditional Loyalty Programs Are Broken',
    problems: [
      {
        _key: uuidv4(),
        icon: '💳',
        title: 'Forgotten Cards',
        description: '73% of plastic loyalty cards are lost or forgotten at home'
      },
      {
        _key: uuidv4(),
        icon: '📱',
        title: 'App Fatigue',
        description: 'Customers refuse to download yet another app for rewards'
      },
      {
        _key: uuidv4(),
        icon: '📊',
        title: 'Zero Insights',
        description: 'Paper punch cards give you no data about customer behavior'
      }
    ],
    solutionTitle: 'The Solution: Wallet-Native Loyalty',
    solutionDescription: 'Your loyalty program lives where your customers already are - their digital wallet. One tap to add, always accessible, impossible to forget.',
    solutionHighlights: [
      'Works with Apple Wallet & Google Wallet',
      'No app download required',
      'Real-time analytics dashboard',
      'Push notifications included'
    ]
  },

  features: {
    sectionBadge: 'Features',
    title: 'Everything You Need to Build Loyalty',
    subtitle: 'Powerful features that help you create, manage, and grow your customer loyalty program.',
    items: [
      {
        _key: uuidv4(),
        icon: '📲',
        title: 'Digital Wallet Integration',
        description: 'Cards live in Apple Wallet & Google Wallet. Customers always have them ready.',
        size: 'large'
      },
      {
        _key: uuidv4(),
        icon: '📊',
        title: 'Real-Time Analytics',
        description: 'See customer visits, redemption rates, and loyalty trends instantly.',
        size: 'medium'
      },
      {
        _key: uuidv4(),
        icon: '🔔',
        title: 'Push Notifications',
        description: 'Send offers and updates directly to customer lock screens.',
        size: 'medium'
      },
      {
        _key: uuidv4(),
        icon: '🎨',
        title: 'Custom Branding',
        description: 'Match your brand with custom colors, logos, and card designs.',
        size: 'small'
      },
      {
        _key: uuidv4(),
        icon: '⚡',
        title: '5-Minute Setup',
        description: 'Go from signup to live loyalty program in under 5 minutes.',
        size: 'small'
      },
      {
        _key: uuidv4(),
        icon: '🔒',
        title: 'GDPR Compliant',
        description: 'Enterprise-grade security with full GDPR compliance.',
        size: 'small'
      }
    ]
  },

  video: {
    sectionBadge: 'See It In Action',
    title: 'Watch How It Works',
    subtitle: 'See how easy it is to create and manage your digital loyalty program.',
    ctaText: 'Watch the 2-minute demo'
  },

  testimonials: {
    sectionBadge: 'Wall of Love',
    title: 'Loved by Businesses Worldwide',
    subtitle: 'Join thousands of businesses that have transformed their customer loyalty.'
  },

  faq: {
    sectionBadge: 'FAQ',
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about Digital Loyalty.'
  },

  finalCta: {
    title: 'Ready to Boost Customer Loyalty?',
    subtitle: 'Start your free 14-day trial today. No credit card required.',
    primaryCta: { text: 'Get Started Free', url: '#get-started' },
    secondaryCta: { text: 'Book a Demo', url: '#demo' },
    trustIndicators: ['Free 14-day trial', 'No credit card', 'Cancel anytime']
  }
};

// Navigation - English
const navigationEnglish = {
  _type: 'navigation',
  _id: 'navigation-en',
  language: 'en',
  autoTranslated: false,
  items: [
    { _key: uuidv4(), label: 'Features', href: '#features', isAnchor: true },
    { _key: uuidv4(), label: 'How It Works', href: '#how-it-works', isAnchor: true },
    { _key: uuidv4(), label: 'Pricing', href: '#pricing', isAnchor: true },
    { _key: uuidv4(), label: 'Blog', href: '/blog', isAnchor: false },
    { _key: uuidv4(), label: 'About', href: '/about', isAnchor: false }
  ],
  ctaButton: {
    text: 'Get Started',
    url: '#get-started'
  }
};

// Footer - English
const footerEnglish = {
  _type: 'footer',
  _id: 'footer-en',
  language: 'en',
  autoTranslated: false,
  tagline: 'Modern loyalty cards for the digital age. No apps, no plastic, just results.',
  columns: [
    {
      _key: uuidv4(),
      title: 'Product',
      links: [
        { _key: uuidv4(), label: 'Features', href: '#features' },
        { _key: uuidv4(), label: 'Pricing', href: '#pricing' },
        { _key: uuidv4(), label: 'How It Works', href: '#how-it-works' },
        { _key: uuidv4(), label: 'Contact', href: '#contact' }
      ]
    },
    {
      _key: uuidv4(),
      title: 'Support',
      links: [
        { _key: uuidv4(), label: 'Help Center', href: '/help' },
        { _key: uuidv4(), label: 'Documentation', href: '/docs' },
        { _key: uuidv4(), label: 'API Reference', href: '/api' },
        { _key: uuidv4(), label: 'Blog', href: '/blog' }
      ]
    }
  ],
  copyright: '© 2025 Digital Loyalty. All rights reserved.',
  legalLinks: [
    { _key: uuidv4(), label: 'Privacy Policy', href: '/privacy' },
    { _key: uuidv4(), label: 'Terms of Service', href: '/terms' },
    { _key: uuidv4(), label: 'Cookie Policy', href: '/cookies' }
  ]
};

// Testimonials
const testimonials = [
  {
    _type: 'testimonial',
    _id: 'testimonial-1',
    name: 'Sarah Johnson',
    role: 'Owner',
    company: 'Sunrise Cafe',
    quote: 'Our customer retention increased by 40% within the first three months. The digital wallet integration means customers always have their loyalty card with them.',
    language: 'en',
    rating: 5,
    featured: true,
    autoTranslated: false
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-2',
    name: 'Michael Chen',
    role: 'Marketing Director',
    company: 'FitZone Gym',
    quote: 'The analytics dashboard gives us insights we never had before. We can now see exactly which rewards drive the most engagement.',
    language: 'en',
    rating: 5,
    featured: false,
    autoTranslated: false
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-3',
    name: 'Emma Williams',
    role: 'Founder',
    company: 'Bloom Beauty Salon',
    quote: 'Setup took less than an hour and our clients love how easy it is. No more lost punch cards means happier customers.',
    language: 'en',
    rating: 5,
    featured: false,
    autoTranslated: false
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-4',
    name: 'David Park',
    role: 'General Manager',
    company: 'Fresh Bites Restaurant',
    quote: 'The push notifications feature has been a game-changer for our slow days. We can instantly reach customers with special offers.',
    language: 'en',
    rating: 5,
    featured: true,
    autoTranslated: false
  }
];

// FAQ Items
const faqItems = [
  {
    _type: 'faqItem',
    _id: 'faq-1',
    question: 'How does the digital wallet integration work?',
    answer: "Your loyalty card is added directly to Apple Wallet or Google Wallet with just 3 taps. Customers scan a QR code, tap \"Add to Wallet\", and they're done. No app download required.",
    language: 'en',
    category: 'general',
    order: 1,
    autoTranslated: false
  },
  {
    _type: 'faqItem',
    _id: 'faq-2',
    question: 'What types of loyalty programs can I create?',
    answer: 'We support stamp cards, points-based rewards, tiered memberships, and digital coupons. Each can be fully customized to match your brand and business needs.',
    language: 'en',
    category: 'general',
    order: 2,
    autoTranslated: false
  },
  {
    _type: 'faqItem',
    _id: 'faq-3',
    question: 'Can I send notifications to my customers?',
    answer: 'Yes! Push notifications are included in Professional and Enterprise plans. Send instant updates about new offers, point balances, or special promotions directly to their phone.',
    language: 'en',
    category: 'technical',
    order: 3,
    autoTranslated: false
  },
  {
    _type: 'faqItem',
    _id: 'faq-4',
    question: 'Is there a free trial?',
    answer: 'Yes, we offer a 14-day free trial with full access to all features. No credit card required to start. You can upgrade, downgrade, or cancel anytime.',
    language: 'en',
    category: 'pricing',
    order: 4,
    autoTranslated: false
  },
  {
    _type: 'faqItem',
    _id: 'faq-5',
    question: 'How long does setup take?',
    answer: 'Most businesses are up and running within an hour. Create your card design, customize your rewards structure, and start sharing your QR code with customers immediately.',
    language: 'en',
    category: 'getting_started',
    order: 5,
    autoTranslated: false
  },
  {
    _type: 'faqItem',
    _id: 'faq-6',
    question: 'Is my customer data secure?',
    answer: 'Absolutely. We use industry-standard encryption and are fully GDPR compliant. Your data is stored securely and you maintain full ownership. We never sell or share customer information.',
    language: 'en',
    category: 'security',
    order: 6,
    autoTranslated: false
  }
];

// Lead Forms
const leadForms = [
  {
    _type: 'leadForm',
    _id: 'form-get-started-en',
    formId: 'get-started',
    name: 'Get Started Form',
    language: 'en',
    heading: 'Start Your Free Trial',
    subheading: 'No credit card required. Cancel anytime.',
    submitButtonText: 'Create My Account',
    successMessage: 'Welcome aboard! Redirecting you to your dashboard...',
    socialProofText: 'Join 2,500+ businesses already using Digital Loyalty',
    fields: [
      {
        _key: uuidv4(),
        fieldId: 'email',
        type: 'email',
        label: 'Work Email',
        placeholder: 'you@company.com',
        required: true
      },
      {
        _key: uuidv4(),
        fieldId: 'name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'John Smith',
        required: true
      },
      {
        _key: uuidv4(),
        fieldId: 'company',
        type: 'text',
        label: 'Company Name',
        placeholder: 'Acme Inc',
        required: false
      },
      {
        _key: uuidv4(),
        fieldId: 'phone',
        type: 'tel',
        label: 'Phone Number',
        placeholder: '+1 (555) 123-4567',
        required: false
      }
    ],
    successAction: 'message',
    passContextToRedirect: true,
    trackingEnabled: true,
    variant: 'default',
    showLabels: true,
    buttonVariant: 'gradient',
    autoTranslated: false
  },
  {
    _type: 'leadForm',
    _id: 'form-contact-en',
    formId: 'contact',
    name: 'Contact / Enterprise Form',
    language: 'en',
    heading: 'Contact Our Team',
    subheading: 'Have questions about Enterprise plans? We\'d love to hear from you.',
    submitButtonText: 'Send Message',
    successMessage: 'Thanks for reaching out! Our team will get back to you within 24 hours.',
    socialProofText: 'Trusted by Fortune 500 companies',
    fields: [
      {
        _key: uuidv4(),
        fieldId: 'email',
        type: 'email',
        label: 'Work Email',
        placeholder: 'you@company.com',
        required: true
      },
      {
        _key: uuidv4(),
        fieldId: 'name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'John Smith',
        required: true
      },
      {
        _key: uuidv4(),
        fieldId: 'company',
        type: 'text',
        label: 'Company Name',
        placeholder: 'Acme Inc',
        required: true
      },
      {
        _key: uuidv4(),
        fieldId: 'phone',
        type: 'tel',
        label: 'Phone Number',
        placeholder: '+1 (555) 123-4567',
        required: false
      },
      {
        _key: uuidv4(),
        fieldId: 'employees',
        type: 'select',
        label: 'Company Size',
        placeholder: 'Select company size',
        required: true,
        options: [
          { _key: uuidv4(), label: '1-10 employees', value: '1-10' },
          { _key: uuidv4(), label: '11-50 employees', value: '11-50' },
          { _key: uuidv4(), label: '51-200 employees', value: '51-200' },
          { _key: uuidv4(), label: '201-500 employees', value: '201-500' },
          { _key: uuidv4(), label: '500+ employees', value: '500+' }
        ]
      },
      {
        _key: uuidv4(),
        fieldId: 'message',
        type: 'textarea',
        label: 'How can we help?',
        placeholder: 'Tell us about your needs...',
        required: true
      }
    ],
    successAction: 'message',
    trackingEnabled: true,
    variant: 'default',
    showLabels: true,
    buttonVariant: 'primary',
    autoTranslated: false
  },
  {
    _type: 'leadForm',
    _id: 'form-waitlist-en',
    formId: 'waitlist',
    name: 'Waitlist Form',
    language: 'en',
    heading: 'Join the Waitlist',
    subheading: 'Be the first to know when we launch new features.',
    submitButtonText: 'Join Waitlist',
    successMessage: "You're on the list! We'll notify you when new features launch.",
    socialProofText: 'Join 1,000+ businesses already waiting',
    fields: [
      {
        _key: uuidv4(),
        fieldId: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'you@company.com',
        required: true
      }
    ],
    successAction: 'message',
    trackingEnabled: true,
    variant: 'inline',
    showLabels: false,
    buttonVariant: 'gradient',
    autoTranslated: false
  },
  {
    _type: 'leadForm',
    _id: 'form-demo-en',
    formId: 'demo-request',
    name: 'Demo Request Form',
    language: 'en',
    heading: 'Request a Demo',
    subheading: 'See Digital Loyalty in action with a personalized walkthrough.',
    submitButtonText: 'Book My Demo',
    successMessage: "Thanks! We'll reach out within 24 hours to schedule your demo.",
    socialProofText: 'Free 30-minute personalized demo',
    fields: [
      {
        _key: uuidv4(),
        fieldId: 'email',
        type: 'email',
        label: 'Work Email',
        placeholder: 'you@company.com',
        required: true
      },
      {
        _key: uuidv4(),
        fieldId: 'name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'John Smith',
        required: true
      },
      {
        _key: uuidv4(),
        fieldId: 'company',
        type: 'text',
        label: 'Company Name',
        placeholder: 'Acme Inc',
        required: true
      },
      {
        _key: uuidv4(),
        fieldId: 'businessType',
        type: 'select',
        label: 'Business Type',
        placeholder: 'Select your industry',
        required: true,
        options: [
          { _key: uuidv4(), label: 'Restaurant / Cafe', value: 'restaurant' },
          { _key: uuidv4(), label: 'Retail Store', value: 'retail' },
          { _key: uuidv4(), label: 'Fitness / Gym', value: 'fitness' },
          { _key: uuidv4(), label: 'Salon / Spa', value: 'salon' },
          { _key: uuidv4(), label: 'Other', value: 'other' }
        ]
      },
      {
        _key: uuidv4(),
        fieldId: 'message',
        type: 'textarea',
        label: 'Tell us about your business',
        placeholder: 'What are you looking to achieve with a loyalty program?',
        required: false
      }
    ],
    successAction: 'message',
    trackingEnabled: true,
    variant: 'default',
    showLabels: true,
    buttonVariant: 'primary',
    autoTranslated: false
  },
  {
    _type: 'leadForm',
    _id: 'form-modal-waitlist-en',
    formId: 'modal-waitlist',
    name: 'Modal Waitlist Popup',
    language: 'en',
    heading: 'Get Early Access',
    subheading: 'Sign up now and get 50% off when we launch.',
    submitButtonText: 'Get Early Access',
    successMessage: "You're in! Check your email for confirmation.",
    socialProofText: '500+ businesses already signed up',
    fields: [
      {
        _key: uuidv4(),
        fieldId: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'you@company.com',
        required: true
      },
      {
        _key: uuidv4(),
        fieldId: 'name',
        type: 'text',
        label: 'Your Name',
        placeholder: 'John Smith',
        required: true
      }
    ],
    successAction: 'message',
    trackingEnabled: true,
    variant: 'modal',
    showLabels: true,
    buttonVariant: 'gradient',
    autoTranslated: false
  }
];

// Pricing Plans - with proper prices array format
const pricingPlans = [
  {
    _type: 'pricingPlan',
    _id: 'pricing-starter-en',
    planId: 'starter',
    name: 'Starter',
    language: 'en',
    prices: [
      { _key: uuidv4(), currency: 'USD', monthly: 29, yearly: 290 },
      { _key: uuidv4(), currency: 'EUR', monthly: 27, yearly: 270 },
      { _key: uuidv4(), currency: 'GBP', monthly: 23, yearly: 230 }
    ],
    features: [
      'Up to 500 loyalty members',
      'Basic stamp card',
      'QR code check-in',
      'Email support'
    ],
    popular: false,
    isEnterprise: false,
    buttonText: 'Start Free Trial',
    order: 1,
    sourceLanguage: 'en',
    translationStatus: 'published',
    autoTranslated: false
  },
  {
    _type: 'pricingPlan',
    _id: 'pricing-professional-en',
    planId: 'professional',
    name: 'Professional',
    language: 'en',
    prices: [
      { _key: uuidv4(), currency: 'USD', monthly: 79, yearly: 790 },
      { _key: uuidv4(), currency: 'EUR', monthly: 73, yearly: 730 },
      { _key: uuidv4(), currency: 'GBP', monthly: 63, yearly: 630 }
    ],
    features: [
      'Up to 5,000 loyalty members',
      'Multiple card types',
      'Push notifications',
      'Analytics dashboard',
      'Priority support',
      'Custom branding'
    ],
    popular: true,
    isEnterprise: false,
    buttonText: 'Start Free Trial',
    order: 2,
    sourceLanguage: 'en',
    translationStatus: 'published',
    autoTranslated: false
  },
  {
    _type: 'pricingPlan',
    _id: 'pricing-enterprise-en',
    planId: 'enterprise',
    name: 'Enterprise',
    language: 'en',
    prices: [
      { _key: uuidv4(), currency: 'USD', monthly: 0, yearly: 0 }
    ],
    features: [
      'Unlimited loyalty members',
      'All card types',
      'Advanced analytics',
      'API access',
      'Dedicated account manager',
      'Custom integrations'
    ],
    popular: false,
    isEnterprise: true,
    buttonText: 'Contact Sales',
    order: 3,
    sourceLanguage: 'en',
    translationStatus: 'published',
    autoTranslated: false
  }
];

async function seedContent() {
  console.log('🌱 Starting Sanity content seed...\n');

  try {
    // Seed Site Settings
    console.log('📝 Creating site settings...');
    await client.createOrReplace(siteSettings);
    console.log('   ✅ Site settings created');

    // Seed Page Content
    console.log('📝 Creating page content (English)...');
    await client.createOrReplace(pageContentEnglish);
    console.log('   ✅ Home page content (EN) created');

    // Seed Navigation
    console.log('📝 Creating navigation...');
    await client.createOrReplace(navigationEnglish);
    console.log('   ✅ Navigation (EN) created');

    // Seed Footer
    console.log('📝 Creating footer...');
    await client.createOrReplace(footerEnglish);
    console.log('   ✅ Footer (EN) created');

    // Seed Testimonials
    console.log('📝 Creating testimonials...');
    for (const testimonial of testimonials) {
      await client.createOrReplace(testimonial);
    }
    console.log(`   ✅ ${testimonials.length} testimonials created`);

    // Seed FAQ Items
    console.log('📝 Creating FAQ items...');
    for (const faq of faqItems) {
      await client.createOrReplace(faq);
    }
    console.log(`   ✅ ${faqItems.length} FAQ items created`);

    // Seed Pricing Plans
    console.log('📝 Creating pricing plans...');
    for (const plan of pricingPlans) {
      await client.createOrReplace(plan);
    }
    console.log(`   ✅ ${pricingPlans.length} pricing plans created`);

    // Seed Lead Forms
    console.log('📝 Creating lead forms...');
    for (const form of leadForms) {
      await client.createOrReplace(form);
    }
    console.log(`   ✅ ${leadForms.length} lead forms created`);

    console.log('\n🎉 Sanity content seeded successfully!');
    console.log('\n📊 Summary:');
    console.log('   - 1 Site Settings (singleton)');
    console.log('   - 1 Page Content (home-en)');
    console.log('   - 1 Navigation (en)');
    console.log('   - 1 Footer (en)');
    console.log(`   - ${testimonials.length} Testimonials`);
    console.log(`   - ${faqItems.length} FAQ Items`);
    console.log(`   - ${pricingPlans.length} Pricing Plans`);
    console.log(`   - ${leadForms.length} Lead Forms`);
    console.log('\n💡 Run `npm run sanity:dev` to open Sanity Studio and view/edit content.');
    console.log('💡 The auto-translation webhook will create other language versions when you publish English content.');

  } catch (error) {
    console.error('❌ Error seeding content:', error);
    process.exit(1);
  }
}

seedContent();

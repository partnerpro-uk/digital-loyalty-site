import { defineType, defineField } from 'sanity';

export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'document',
  icon: () => '💰',
  fields: [
    defineField({
      name: 'planId',
      title: 'Plan ID',
      type: 'string',
      description: 'Unique identifier that links all language versions (e.g., "starter", "professional")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'Language code for this version',
      options: {
        list: [
          { title: '🇺🇸 English', value: 'en' },
          { title: '🇪🇸 Spanish', value: 'es' },
          { title: '🇫🇷 French', value: 'fr' },
          { title: '🇵🇹 Portuguese', value: 'pt' },
          { title: '🇩🇪 German', value: 'de' },
          { title: '🇸🇦 Arabic', value: 'ar' },
          { title: '🇨🇳 Chinese', value: 'zh' }
        ],
        layout: 'radio'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'region',
      title: 'Region (Optional)',
      type: 'string',
      description: 'For regional pricing variants (e.g., "us", "uk", "eu")',
      options: {
        list: [
          { title: 'United States', value: 'us' },
          { title: 'United Kingdom', value: 'uk' },
          { title: 'European Union', value: 'eu' },
          { title: 'Australia', value: 'au' },
          { title: 'Canada', value: 'ca' },
          { title: 'Switzerland', value: 'ch' }
        ]
      }
    }),
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      description: 'Display name in this language',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'prices',
      title: 'Prices by Currency',
      type: 'array',
      description: 'Add prices for each currency you want to support',
      of: [{
        type: 'object',
        name: 'price',
        fields: [
          {
            name: 'currency',
            type: 'string',
            title: 'Currency',
            options: {
              list: [
                { title: 'USD - US Dollar ($)', value: 'USD' },
                { title: 'GBP - British Pound (£)', value: 'GBP' },
                { title: 'CAD - Canadian Dollar ($)', value: 'CAD' },
                { title: 'AUD - Australian Dollar ($)', value: 'AUD' },
                { title: 'EUR - Euro (€)', value: 'EUR' },
                { title: 'CHF - Swiss Franc (Fr.)', value: 'CHF' },
                { title: 'MXN - Mexican Peso ($)', value: 'MXN' },
                { title: 'ARS - Argentine Peso ($)', value: 'ARS' },
                { title: 'BRL - Brazilian Real (R$)', value: 'BRL' },
                { title: 'AED - UAE Dirham (د.إ)', value: 'AED' },
                { title: 'SAR - Saudi Riyal (ر.س)', value: 'SAR' },
                { title: 'EGP - Egyptian Pound (ج.م)', value: 'EGP' },
                { title: 'CNY - Chinese Yuan (¥)', value: 'CNY' },
                { title: 'TWD - Taiwan Dollar (NT$)', value: 'TWD' }
              ],
              layout: 'dropdown'
            },
            validation: (Rule) => Rule.required()
          },
          {
            name: 'monthly',
            type: 'number',
            title: 'Monthly Price',
            description: 'Price per month',
            validation: (Rule) => Rule.required().min(0)
          },
          {
            name: 'yearly',
            type: 'number',
            title: 'Yearly Price',
            description: 'Total yearly price',
            validation: (Rule) => Rule.required().min(0)
          },
          {
            name: 'quarterly',
            type: 'number',
            title: 'Quarterly Price (Optional)',
            description: 'Total quarterly price'
          }
        ],
        preview: {
          select: {
            currency: 'currency',
            monthly: 'monthly',
            yearly: 'yearly'
          },
          prepare({ currency, monthly, yearly }) {
            const savings = ((monthly * 12 - yearly) / (monthly * 12) * 100).toFixed(1);
            return {
              title: `${currency}`,
              subtitle: `Monthly: ${monthly} | Yearly: ${yearly} | Save ${savings}%`
            };
          }
        }
      }],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      description: 'List of features in this language',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'popular',
      title: 'Popular Plan',
      type: 'boolean',
      description: 'Mark as "Most Popular" plan',
      initialValue: false
    }),
    defineField({
      name: 'isEnterprise',
      title: 'Enterprise Plan (Contact Sales)',
      type: 'boolean',
      description: 'Enable for plans that show "Contact Sales" instead of pricing',
      initialValue: false
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text (Optional)',
      type: 'string',
      description: 'Custom button text (defaults to "Get Started" or "Contact Sales")'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display (lower numbers first)',
      initialValue: 0,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'sourceLanguage',
      title: 'Source Language',
      type: 'string',
      description: 'Original language this was created in',
      readOnly: true,
      initialValue: 'en'
    }),
    defineField({
      name: 'translationStatus',
      title: 'Translation Status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Draft', value: 'draft' },
          { title: 'Needs Review', value: 'needs_review' }
        ]
      },
      initialValue: 'draft'
    }),
    defineField({
      name: 'autoTranslated',
      title: 'Auto-Translated',
      type: 'boolean',
      description: 'Was this automatically translated?',
      initialValue: false,
      readOnly: true
    }),
    defineField({
      name: 'lastSyncedFrom',
      title: 'Last Synced From',
      type: 'reference',
      to: [{ type: 'pricingPlan' }],
      description: 'Reference to the source document',
      readOnly: true
    }),
    defineField({
      name: 'stripePriceIds',
      title: 'Stripe Price IDs (Future)',
      type: 'object',
      description: 'Stripe integration (leave empty for now)',
      fields: [
        { name: 'monthly', type: 'string', title: 'Monthly Price ID' },
        { name: 'yearly', type: 'string', title: 'Yearly Price ID' }
      ]
    })
  ],
  preview: {
    select: {
      name: 'name',
      planId: 'planId',
      language: 'language',
      popular: 'popular',
      isEnterprise: 'isEnterprise',
      order: 'order',
      prices: 'prices',
      translationStatus: 'translationStatus'
    },
    prepare({ name, planId, language, popular, isEnterprise, order, prices, translationStatus }) {
      // Calculate savings for first currency
      let savingsText = '';
      if (prices && prices.length > 0 && !isEnterprise) {
        const firstPrice = prices[0];
        const savings = ((firstPrice.monthly * 12 - firstPrice.yearly) / (firstPrice.monthly * 12) * 100).toFixed(0);
        savingsText = ` | ${savings}% savings`;
      }
      
      const langEmoji = {
        en: '🇺🇸', es: '🇪🇸', fr: '🇫🇷',
        pt: '🇵🇹', de: '🇩🇪', ar: '🇸🇦', zh: '🇨🇳'
      };
      
      const statusEmoji = {
        published: '✅',
        draft: '📝',
        needs_review: '⚠️'
      };
      
      const prefix = popular ? '⭐ ' : '';
      const suffix = isEnterprise ? ' 💼' : '';
      
      return {
        title: `${prefix}${name}${suffix}`,
        subtitle: `${langEmoji[language] || '🌐'} ${language.toUpperCase()} | ${planId} | Order: ${order}${isEnterprise ? ' | Enterprise' : savingsText} | ${statusEmoji[translationStatus] || ''}`,
      };
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'language', direction: 'asc' },
        { field: 'order', direction: 'asc' }
      ]
    },
    {
      title: 'Language',
      name: 'languageAsc',
      by: [
        { field: 'language', direction: 'asc' },
        { field: 'planId', direction: 'asc' }
      ]
    }
  ]
});



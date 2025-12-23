import { defineType, defineField } from 'sanity';
import { TranslationInput } from '../components/TranslationInput';

export const pricing = defineType({
  name: 'pricing',
  title: 'Pricing Plans',
  type: 'document',
  icon: () => '💰',
  fields: [
    defineField({
      name: 'planId',
      title: 'Plan ID',
      type: 'string',
      description: 'Unique identifier (e.g., "starter", "professional", "enterprise")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'name',
      title: 'Plan Name (Multilingual)',
      description: '✨ Fill English and click "Generate All Translations" button',
      type: 'object',
      components: {
        input: TranslationInput
      },
      fields: [
        { name: 'en', type: 'string', title: 'English', validation: Rule => Rule.required() },
        { name: 'es', type: 'string', title: 'Spanish' },
        { name: 'fr', type: 'string', title: 'French' },
        { name: 'pt', type: 'string', title: 'Portuguese' },
        { name: 'de', type: 'string', title: 'German' },
        { name: 'ar', type: 'string', title: 'Arabic' },
        { name: 'zh', type: 'string', title: 'Chinese' }
      ],
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
                { title: 'CHF - Swiss Franc (CHF)', value: 'CHF' },
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
            description: 'Price per month (e.g., 99 for $99/month)',
            validation: (Rule) => Rule.required().min(0)
          },
          {
            name: 'yearly',
            type: 'number',
            title: 'Yearly Price',
            description: 'Total yearly price (e.g., 950 for $950/year)',
            validation: (Rule) => Rule.required().min(0)
          },
          {
            name: 'quarterly',
            type: 'number',
            title: 'Quarterly Price',
            description: 'Total quarterly price (optional)'
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
      title: 'Features (Multilingual)',
      type: 'object',
      description: 'List of features included in this plan',
      fields: [
        { name: 'en', type: 'array', title: 'English', of: [{ type: 'string' }], validation: Rule => Rule.required() },
        { name: 'es', type: 'array', title: 'Spanish', of: [{ type: 'string' }] },
        { name: 'fr', type: 'array', title: 'French', of: [{ type: 'string' }] },
        { name: 'pt', type: 'array', title: 'Portuguese', of: [{ type: 'string' }] },
        { name: 'de', type: 'array', title: 'German', of: [{ type: 'string' }] },
        { name: 'ar', type: 'array', title: 'Arabic', of: [{ type: 'string' }] },
        { name: 'zh', type: 'array', title: 'Chinese', of: [{ type: 'string' }] }
      ],
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
      title: 'Button Text (Multilingual)',
      type: 'object',
      description: 'Custom button text (optional, defaults to "Get Started")',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'es', type: 'string', title: 'Spanish' },
        { name: 'fr', type: 'string', title: 'French' },
        { name: 'pt', type: 'string', title: 'Portuguese' },
        { name: 'de', type: 'string', title: 'German' },
        { name: 'ar', type: 'string', title: 'Arabic' },
        { name: 'zh', type: 'string', title: 'Chinese' }
      ]
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
      name: 'stripePriceIds',
      title: 'Stripe Price IDs (Optional - For Future)',
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
      title: 'name.en',
      planId: 'planId',
      popular: 'popular',
      isEnterprise: 'isEnterprise',
      order: 'order',
      prices: 'prices'
    },
    prepare({ title, planId, popular, isEnterprise, order, prices }) {
      // Calculate savings for first currency
      let savingsText = '';
      if (prices && prices.length > 0 && !isEnterprise) {
        const firstPrice = prices[0];
        const savings = ((firstPrice.monthly * 12 - firstPrice.yearly) / (firstPrice.monthly * 12) * 100).toFixed(0);
        savingsText = ` | ${savings}% annual savings`;
      }
      
      const prefix = popular ? '⭐ ' : '';
      const suffix = isEnterprise ? ' 💼' : '';
      
      return {
        title: `${prefix}${title}${suffix}`,
        subtitle: `${planId} | Order: ${order}${isEnterprise ? ' | Enterprise (Contact Sales)' : savingsText}`
      };
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
});


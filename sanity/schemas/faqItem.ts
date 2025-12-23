import { defineType, defineField } from 'sanity';

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  icon: () => '❓',
  fields: [
    defineField({
      name: 'faqId',
      title: 'FAQ ID',
      type: 'string',
      description: 'Unique identifier that links all language versions (e.g., "what-is-digital-loyalty")',
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
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The FAQ question',
      validation: (Rule) => Rule.required().min(10).max(200)
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      description: 'The answer to the question',
      rows: 5,
      validation: (Rule) => Rule.required().min(20).max(1000)
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Group related FAQs together',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Pricing & Billing', value: 'pricing' },
          { title: 'Technical', value: 'technical' },
          { title: 'Getting Started', value: 'getting_started' },
          { title: 'Security & Privacy', value: 'security' }
        ]
      },
      initialValue: 'general'
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
    })
  ],
  preview: {
    select: {
      question: 'question',
      category: 'category',
      language: 'language',
      order: 'order',
      translationStatus: 'translationStatus'
    },
    prepare({ question, category, language, order, translationStatus }) {
      const langEmoji: Record<string, string> = {
        en: '🇺🇸', es: '🇪🇸', fr: '🇫🇷',
        pt: '🇵🇹', de: '🇩🇪', ar: '🇸🇦', zh: '🇨🇳'
      };

      const statusEmoji: Record<string, string> = {
        published: '✅',
        draft: '📝',
        needs_review: '⚠️'
      };

      const categoryLabels: Record<string, string> = {
        general: '📋 General',
        pricing: '💰 Pricing',
        technical: '⚙️ Technical',
        getting_started: '🚀 Getting Started',
        security: '🔒 Security'
      };

      return {
        title: question,
        subtitle: `${langEmoji[language] || '🌐'} ${categoryLabels[category] || category} | #${order} ${statusEmoji[translationStatus] || ''}`
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
      title: 'By Category',
      name: 'categoryAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
});

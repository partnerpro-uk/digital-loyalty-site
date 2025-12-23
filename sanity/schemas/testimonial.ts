import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'testimonialId',
      title: 'Testimonial ID',
      type: 'string',
      description: 'Unique identifier that links all language versions (e.g., "john-doe-acme")',
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
      name: 'name',
      title: 'Person Name',
      type: 'string',
      description: 'Full name of the person giving testimonial',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Job Title / Role',
      type: 'string',
      description: 'Their role or job title',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Company or organization name',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      description: 'The testimonial text',
      rows: 4,
      validation: (Rule) => Rule.required().min(20).max(500)
    }),
    defineField({
      name: 'image',
      title: 'Person Photo',
      type: 'image',
      description: 'Photo of the person (recommended: square, min 200x200)',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo (Optional)',
      type: 'image',
      description: 'Company logo to display with testimonial'
    }),
    defineField({
      name: 'rating',
      title: 'Rating (Optional)',
      type: 'number',
      description: 'Star rating 1-5',
      options: {
        list: [
          { title: '⭐', value: 1 },
          { title: '⭐⭐', value: 2 },
          { title: '⭐⭐⭐', value: 3 },
          { title: '⭐⭐⭐⭐', value: 4 },
          { title: '⭐⭐⭐⭐⭐', value: 5 }
        ]
      },
      initialValue: 5
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Feature this testimonial prominently',
      initialValue: false
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
      name: 'name',
      company: 'company',
      language: 'language',
      featured: 'featured',
      rating: 'rating',
      image: 'image',
      translationStatus: 'translationStatus'
    },
    prepare({ name, company, language, featured, rating, image, translationStatus }) {
      const langEmoji: Record<string, string> = {
        en: '🇺🇸', es: '🇪🇸', fr: '🇫🇷',
        pt: '🇵🇹', de: '🇩🇪', ar: '🇸🇦', zh: '🇨🇳'
      };

      const statusEmoji: Record<string, string> = {
        published: '✅',
        draft: '📝',
        needs_review: '⚠️'
      };

      const stars = rating ? '⭐'.repeat(rating) : '';
      const prefix = featured ? '🌟 ' : '';

      return {
        title: `${prefix}${name}`,
        subtitle: `${langEmoji[language] || '🌐'} ${company} ${stars} ${statusEmoji[translationStatus] || ''}`,
        media: image
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
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
});

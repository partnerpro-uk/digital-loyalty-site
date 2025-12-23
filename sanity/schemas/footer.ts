import { defineType, defineField } from 'sanity';

// Language options
const languageOptions = [
  { title: '🇺🇸 English', value: 'en' },
  { title: '🇪🇸 Spanish', value: 'es' },
  { title: '🇫🇷 French', value: 'fr' },
  { title: '🇵🇹 Portuguese', value: 'pt' },
  { title: '🇩🇪 German', value: 'de' },
  { title: '🇸🇦 Arabic', value: 'ar' },
  { title: '🇨🇳 Chinese', value: 'zh' }
];

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: () => '🦶',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'Language for this footer version',
      options: {
        list: languageOptions,
        layout: 'radio'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'tagline',
      title: 'Footer Tagline',
      type: 'string',
      description: 'Short description or tagline shown in the footer'
    }),
    defineField({
      name: 'columns',
      title: 'Link Columns',
      type: 'array',
      description: 'Columns of links in the footer',
      of: [{
        type: 'object',
        name: 'footerColumn',
        fields: [
          defineField({
            name: 'title',
            title: 'Column Title',
            type: 'string',
            validation: (Rule) => Rule.required()
          }),
          defineField({
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [{
              type: 'object',
              name: 'footerLink',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Link Text',
                  type: 'string',
                  validation: (Rule) => Rule.required()
                }),
                defineField({
                  name: 'href',
                  title: 'URL',
                  type: 'string',
                  validation: (Rule) => Rule.required()
                }),
                defineField({
                  name: 'openInNewTab',
                  title: 'Open in New Tab',
                  type: 'boolean',
                  initialValue: false
                })
              ],
              preview: {
                select: { label: 'label', href: 'href' },
                prepare({ label, href }) {
                  return { title: label, subtitle: href };
                }
              }
            }]
          })
        ],
        preview: {
          select: { title: 'title', links: 'links' },
          prepare({ title, links }) {
            return {
              title: title,
              subtitle: `${links?.length || 0} links`
            };
          }
        }
      }]
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      description: 'Copyright notice (use {{year}} for current year)',
      initialValue: '© {{year}} Your Company. All rights reserved.'
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      description: 'Links like Privacy Policy, Terms of Service',
      of: [{
        type: 'object',
        name: 'legalLink',
        fields: [
          defineField({
            name: 'label',
            title: 'Link Text',
            type: 'string',
            validation: (Rule) => Rule.required()
          }),
          defineField({
            name: 'href',
            title: 'URL',
            type: 'string',
            validation: (Rule) => Rule.required()
          })
        ],
        preview: {
          select: { label: 'label', href: 'href' },
          prepare({ label, href }) {
            return { title: label, subtitle: href };
          }
        }
      }]
    }),
    defineField({
      name: 'showSocialLinks',
      title: 'Show Social Links',
      type: 'boolean',
      description: 'Display social media links from Site Settings',
      initialValue: true
    }),
    defineField({
      name: 'showNewsletter',
      title: 'Show Newsletter Signup',
      type: 'boolean',
      description: 'Display newsletter signup form',
      initialValue: false
    }),
    defineField({
      name: 'newsletterTitle',
      title: 'Newsletter Title',
      type: 'string',
      description: 'Heading for the newsletter section',
      hidden: ({ parent }) => !parent?.showNewsletter
    }),
    defineField({
      name: 'newsletterPlaceholder',
      title: 'Newsletter Placeholder',
      type: 'string',
      description: 'Placeholder text for the email input',
      hidden: ({ parent }) => !parent?.showNewsletter
    }),
    defineField({
      name: 'newsletterButtonText',
      title: 'Newsletter Button Text',
      type: 'string',
      description: 'Submit button text',
      hidden: ({ parent }) => !parent?.showNewsletter
    }),

    // Translation metadata
    defineField({
      name: 'autoTranslated',
      title: 'Auto-Translated',
      type: 'boolean',
      description: 'Was this automatically translated? Uncheck to prevent auto-updates.',
      initialValue: false
    }),
    defineField({
      name: 'lastTranslated',
      title: 'Last Translated',
      type: 'datetime',
      readOnly: true
    })
  ],
  preview: {
    select: {
      language: 'language',
      columns: 'columns',
      autoTranslated: 'autoTranslated'
    },
    prepare({ language, columns, autoTranslated }) {
      const langEmoji: Record<string, string> = {
        en: '🇺🇸', es: '🇪🇸', fr: '🇫🇷',
        pt: '🇵🇹', de: '🇩🇪', ar: '🇸🇦', zh: '🇨🇳'
      };

      const autoFlag = autoTranslated ? ' 🤖' : '';
      const columnCount = columns?.length || 0;

      return {
        title: `Footer - ${langEmoji[language] || '🌐'} ${language?.toUpperCase() || ''}${autoFlag}`,
        subtitle: `${columnCount} columns`
      };
    }
  },
  orderings: [
    {
      title: 'Language',
      name: 'language',
      by: [{ field: 'language', direction: 'asc' }]
    }
  ]
});

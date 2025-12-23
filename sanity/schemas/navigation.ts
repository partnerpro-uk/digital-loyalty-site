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

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: () => '🧭',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'Language for this navigation version',
      options: {
        list: languageOptions,
        layout: 'radio'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      description: 'Links shown in the main navigation',
      of: [{
        type: 'object',
        name: 'navItem',
        fields: [
          defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            description: 'Text shown in the navigation',
            validation: (Rule) => Rule.required()
          }),
          defineField({
            name: 'href',
            title: 'Link',
            type: 'string',
            description: 'URL or anchor (e.g., "/pricing" or "#features")',
            validation: (Rule) => Rule.required()
          }),
          defineField({
            name: 'isAnchor',
            title: 'Is Anchor Link',
            type: 'boolean',
            description: 'Check if this links to a section on the same page (e.g., #features)',
            initialValue: false
          }),
          defineField({
            name: 'openInNewTab',
            title: 'Open in New Tab',
            type: 'boolean',
            description: 'Open link in a new browser tab',
            initialValue: false
          }),
          defineField({
            name: 'highlight',
            title: 'Highlight',
            type: 'boolean',
            description: 'Make this item stand out (useful for "New" features)',
            initialValue: false
          })
        ],
        preview: {
          select: {
            label: 'label',
            href: 'href',
            highlight: 'highlight'
          },
          prepare({ label, href, highlight }) {
            return {
              title: highlight ? `⭐ ${label}` : label,
              subtitle: href
            };
          }
        }
      }]
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      description: 'Primary call-to-action button in the navigation',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'string',
          validation: (Rule) => Rule.required()
        })
      ]
    }),
    defineField({
      name: 'showLanguageSwitcher',
      title: 'Show Language Switcher',
      type: 'boolean',
      description: 'Display language selector in navigation',
      initialValue: true
    }),
    defineField({
      name: 'showThemeToggle',
      title: 'Show Theme Toggle',
      type: 'boolean',
      description: 'Display dark/light mode toggle',
      initialValue: true
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
      items: 'items',
      autoTranslated: 'autoTranslated'
    },
    prepare({ language, items, autoTranslated }) {
      const langEmoji: Record<string, string> = {
        en: '🇺🇸', es: '🇪🇸', fr: '🇫🇷',
        pt: '🇵🇹', de: '🇩🇪', ar: '🇸🇦', zh: '🇨🇳'
      };

      const autoFlag = autoTranslated ? ' 🤖' : '';
      const itemCount = items?.length || 0;

      return {
        title: `Navigation - ${langEmoji[language] || '🌐'} ${language?.toUpperCase() || ''}${autoFlag}`,
        subtitle: `${itemCount} items`
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

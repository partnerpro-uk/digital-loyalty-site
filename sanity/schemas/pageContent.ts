import { defineType, defineField } from 'sanity';

// Reusable CTA button object
const ctaButton = {
  type: 'object',
  name: 'ctaButton',
  fields: [
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Link destination (can be relative like /pricing or absolute)',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'variant',
      title: 'Style Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Filled)', value: 'primary' },
          { title: 'Secondary (Outline)', value: 'secondary' },
          { title: 'Ghost (Text only)', value: 'ghost' }
        ]
      },
      initialValue: 'primary'
    })
  ]
};

// Language options used across fields
const languageOptions = [
  { title: '🇺🇸 English', value: 'en' },
  { title: '🇪🇸 Spanish', value: 'es' },
  { title: '🇫🇷 French', value: 'fr' },
  { title: '🇵🇹 Portuguese', value: 'pt' },
  { title: '🇩🇪 German', value: 'de' },
  { title: '🇸🇦 Arabic', value: 'ar' },
  { title: '🇨🇳 Chinese', value: 'zh' }
];

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  icon: () => '📄',
  groups: [
    { name: 'meta', title: 'Page Info', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Hero' },
    { name: 'socialProof', title: 'Social Proof' },
    { name: 'problemSolution', title: 'Problem/Solution' },
    { name: 'features', title: 'Features' },
    { name: 'video', title: 'Video' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'faq', title: 'FAQ' },
    { name: 'howItWorks', title: 'How It Works' },
    { name: 'gallery', title: 'Gallery' },
    { name: 'finalCta', title: 'Final CTA' },
    { name: 'translation', title: 'Translation' }
  ],
  fields: [
    // Page Info Group
    defineField({
      name: 'pageId',
      title: 'Page ID',
      type: 'string',
      description: 'Identifies which page this content is for',
      group: 'meta',
      options: {
        list: [
          { title: 'Home Page', value: 'home' },
          { title: 'About Page', value: 'about' },
          { title: 'Pricing Page', value: 'pricing' },
          { title: 'Contact Page', value: 'contact' },
          { title: 'Features Page', value: 'features' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'Language code for this content version',
      group: 'meta',
      options: {
        list: languageOptions,
        layout: 'radio'
      },
      validation: (Rule) => Rule.required()
    }),

    // SEO Group
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title shown in browser tab and search results (50-60 characters ideal)',
          validation: (Rule) => Rule.max(70).warning('Title should be under 60 characters')
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description shown in search results (150-160 characters ideal)',
          validation: (Rule) => Rule.max(170).warning('Description should be under 160 characters')
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Image shown when page is shared on social media (1200x630 recommended)',
          options: {
            hotspot: true
          }
        }),
        defineField({
          name: 'noIndex',
          title: 'Hide from Search Engines',
          type: 'boolean',
          description: 'If enabled, search engines will not index this page',
          initialValue: false
        })
      ]
    }),

    // Hero Section Group
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          description: 'Small badge/label above the title (e.g., "New Feature")'
        }),
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          description: 'The main headline',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'titleHighlight',
          title: 'Highlighted Word',
          type: 'string',
          description: 'Word from title to highlight with gradient (must match exactly)'
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 3,
          description: 'Supporting text below the title'
        }),
        defineField({
          name: 'primaryCta',
          title: 'Primary CTA Button',
          type: 'object',
          fields: ctaButton.fields
        }),
        defineField({
          name: 'secondaryCta',
          title: 'Secondary CTA Button',
          type: 'object',
          fields: ctaButton.fields
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          description: 'Main visual for the hero section',
          options: {
            hotspot: true
          }
        }),
        defineField({
          name: 'imageDisplayType',
          title: 'Image Display Type',
          type: 'string',
          description: 'How to display the hero image',
          options: {
            list: [
              { title: 'Phone Mockup', value: 'phone' },
              { title: 'Regular Image', value: 'image' },
              { title: 'No Image (Text Only)', value: 'none' }
            ],
            layout: 'radio'
          },
          initialValue: 'phone'
        }),
        defineField({
          name: 'trustIndicators',
          title: 'Trust Indicators',
          type: 'array',
          description: 'Small trust badges below CTAs (e.g., "No credit card required")',
          of: [{ type: 'string' }]
        }),
        defineField({
          name: 'stats',
          title: 'Hero Stats',
          type: 'array',
          description: 'Key stats shown below CTA buttons (e.g., "500+ Businesses")',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', type: 'string', title: 'Value', description: 'e.g., "500+", "2M+", "98%"' },
              { name: 'label', type: 'string', title: 'Label', description: 'e.g., "Businesses", "Customers"' }
            ],
            preview: {
              select: { value: 'value', label: 'label' },
              prepare({ value, label }) {
                return { title: `${value} ${label}` };
              }
            }
          }]
        }),
        defineField({
          name: 'floatingCards',
          title: 'Floating Cards',
          type: 'array',
          description: 'Small cards that float around the hero image showcasing features',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', type: 'string', title: 'Title', description: 'e.g., "+127 points"' },
              { name: 'subtitle', type: 'string', title: 'Subtitle', description: 'e.g., "Earned today"' },
              {
                name: 'iconColor',
                type: 'string',
                title: 'Icon Color',
                options: {
                  list: [
                    { title: 'Green', value: 'green' },
                    { title: 'Purple', value: 'purple' },
                    { title: 'Amber/Orange', value: 'amber' },
                    { title: 'Blue', value: 'blue' },
                    { title: 'Pink', value: 'pink' }
                  ]
                },
                initialValue: 'purple'
              },
              {
                name: 'icon',
                type: 'string',
                title: 'Icon Type',
                options: {
                  list: [
                    { title: 'Checkmark', value: 'check' },
                    { title: 'Dollar/Currency', value: 'currency' },
                    { title: 'Star', value: 'star' },
                    { title: 'Trophy', value: 'trophy' },
                    { title: 'Heart', value: 'heart' },
                    { title: 'Lightning', value: 'lightning' }
                  ]
                },
                initialValue: 'check'
              }
            ],
            preview: {
              select: { title: 'title', subtitle: 'subtitle' },
              prepare({ title, subtitle }) {
                return { title, subtitle };
              }
            }
          }]
        })
      ]
    }),

    // Social Proof Group
    defineField({
      name: 'socialProof',
      title: 'Social Proof Section',
      type: 'object',
      group: 'socialProof',
      fields: [
        defineField({
          name: 'trustStatement',
          title: 'Trust Statement',
          type: 'string',
          description: 'E.g., "Trusted by 500+ businesses worldwide"'
        }),
        defineField({
          name: 'stats',
          title: 'Key Statistics',
          type: 'array',
          description: 'Optional stats to display (e.g., "10K+ users")',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', type: 'string', title: 'Value' },
              { name: 'label', type: 'string', title: 'Label' }
            ]
          }]
        })
      ]
    }),

    // Problem/Solution Group
    defineField({
      name: 'problemSolution',
      title: 'Problem/Solution Section',
      type: 'object',
      group: 'problemSolution',
      fields: [
        defineField({
          name: 'sectionBadge',
          title: 'Section Badge',
          type: 'string',
          description: 'Label above the section (e.g., "The Problem")'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string'
        }),
        defineField({
          name: 'problems',
          title: 'Problems',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({
                name: 'icon',
                title: 'Icon',
                type: 'string',
                description: 'Emoji or Lucide icon name (e.g., "❌" or "alert-circle")'
              }),
              defineField({
                name: 'title',
                title: 'Problem Title',
                type: 'string'
              }),
              defineField({
                name: 'description',
                title: 'Description',
                type: 'string'
              })
            ],
            preview: {
              select: { title: 'title', icon: 'icon' },
              prepare({ title, icon }) {
                return { title: title, media: () => icon || '❓' };
              }
            }
          }]
        }),
        defineField({
          name: 'solutionTitle',
          title: 'Solution Title',
          type: 'string'
        }),
        defineField({
          name: 'solutionDescription',
          title: 'Solution Description',
          type: 'text',
          rows: 3
        }),
        defineField({
          name: 'solutionHighlights',
          title: 'Solution Highlights',
          type: 'array',
          description: 'Key benefits of the solution',
          of: [{ type: 'string' }]
        })
      ]
    }),

    // Features Group
    defineField({
      name: 'features',
      title: 'Features Section',
      type: 'object',
      group: 'features',
      fields: [
        defineField({
          name: 'sectionBadge',
          title: 'Section Badge',
          type: 'string'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string'
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string'
        }),
        defineField({
          name: 'items',
          title: 'Feature Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({
                name: 'icon',
                title: 'Icon',
                type: 'string',
                description: 'Emoji or Lucide icon name'
              }),
              defineField({
                name: 'title',
                title: 'Feature Title',
                type: 'string'
              }),
              defineField({
                name: 'description',
                title: 'Description',
                type: 'text',
                rows: 2
              }),
              defineField({
                name: 'size',
                title: 'Card Size',
                type: 'string',
                description: 'Size in the bento grid',
                options: {
                  list: [
                    { title: 'Small (1x1)', value: 'small' },
                    { title: 'Medium (2x1)', value: 'medium' },
                    { title: 'Large (2x2)', value: 'large' }
                  ]
                },
                initialValue: 'small'
              })
            ],
            preview: {
              select: { title: 'title', icon: 'icon', size: 'size' },
              prepare({ title, icon, size }) {
                return {
                  title: title,
                  subtitle: `Size: ${size || 'small'}`,
                  media: () => icon || '✨'
                };
              }
            }
          }]
        })
      ]
    }),

    // Video Section Group
    defineField({
      name: 'video',
      title: 'Video Section',
      type: 'object',
      group: 'video',
      fields: [
        defineField({
          name: 'sectionBadge',
          title: 'Section Badge',
          type: 'string'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string'
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string'
        }),
        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          description: 'YouTube or Vimeo URL'
        }),
        defineField({
          name: 'thumbnailImage',
          title: 'Video Thumbnail',
          type: 'image',
          description: 'Custom thumbnail image (optional - will use video thumbnail if not set)',
          options: {
            hotspot: true
          }
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          description: 'Text on the play button (e.g., "Watch the demo")'
        })
      ]
    }),

    // Testimonials Section Group
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      group: 'testimonials',
      description: 'Section header content only - testimonial items are managed separately',
      fields: [
        defineField({
          name: 'sectionBadge',
          title: 'Section Badge',
          type: 'string'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string'
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string'
        })
      ]
    }),

    // FAQ Section Group
    defineField({
      name: 'faq',
      title: 'FAQ Section',
      type: 'object',
      group: 'faq',
      description: 'Section header content only - FAQ items are managed separately',
      fields: [
        defineField({
          name: 'sectionBadge',
          title: 'Section Badge',
          type: 'string'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string'
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string'
        })
      ]
    }),

    // How It Works Section Group
    defineField({
      name: 'howItWorks',
      title: 'How It Works Section',
      type: 'object',
      group: 'howItWorks',
      description: 'The step-by-step process section with visual illustrations',
      fields: [
        defineField({
          name: 'sectionBadge',
          title: 'Section Badge',
          type: 'string',
          description: 'Label above the section (e.g., "How It Works")'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Main section headline'
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string',
          description: 'Supporting text below the title'
        }),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          description: 'The 3 steps with visual illustrations',
          of: [{
            type: 'object',
            fields: [
              defineField({
                name: 'title',
                title: 'Step Title',
                type: 'string',
                validation: (Rule) => Rule.required()
              }),
              defineField({
                name: 'description',
                title: 'Step Description',
                type: 'text',
                rows: 3
              }),
              defineField({
                name: 'visualType',
                title: 'Visual Type',
                type: 'string',
                description: 'Which illustration to show for this step',
                options: {
                  list: [
                    { title: 'QR Code', value: 'qr' },
                    { title: 'Wallet Card', value: 'wallet' },
                    { title: 'Stamp Card', value: 'stamps' }
                  ],
                  layout: 'radio'
                },
                validation: (Rule) => Rule.required()
              }),
              // Wallet-specific fields
              defineField({
                name: 'cardTitle',
                title: 'Card Title',
                type: 'string',
                description: 'Title shown on the wallet card (e.g., "Loyalty Card")',
                hidden: ({ parent }) => parent?.visualType !== 'wallet'
              }),
              defineField({
                name: 'cardSubtitle',
                title: 'Card Subtitle',
                type: 'string',
                description: 'Subtitle shown on the wallet card (e.g., "Your Business")',
                hidden: ({ parent }) => parent?.visualType !== 'wallet'
              }),
              // Stamps-specific fields
              defineField({
                name: 'stampsCollected',
                title: 'Stamps Collected',
                type: 'number',
                description: 'Number of stamps shown as collected',
                hidden: ({ parent }) => parent?.visualType !== 'stamps',
                initialValue: 5
              }),
              defineField({
                name: 'stampsTotal',
                title: 'Total Stamps',
                type: 'number',
                description: 'Total number of stamps on the card',
                hidden: ({ parent }) => parent?.visualType !== 'stamps',
                initialValue: 10
              }),
              defineField({
                name: 'stampsLabel',
                title: 'Stamps Label',
                type: 'string',
                description: 'Label for the stamps (e.g., "Stamps Collected")',
                hidden: ({ parent }) => parent?.visualType !== 'stamps'
              })
            ],
            preview: {
              select: { title: 'title', type: 'visualType' },
              prepare({ title, type }) {
                const typeLabels: Record<string, string> = {
                  qr: '📱 QR Code',
                  wallet: '💳 Wallet',
                  stamps: '⭐ Stamps'
                };
                return {
                  title: title || 'Untitled Step',
                  subtitle: typeLabels[type] || type
                };
              }
            }
          }],
          validation: (Rule) => Rule.max(3).warning('Maximum 3 steps recommended')
        })
      ]
    }),

    // Gallery Section Group
    defineField({
      name: 'gallery',
      title: 'Gallery Section',
      type: 'object',
      group: 'gallery',
      description: 'Showcase card designs with various display options',
      fields: [
        defineField({
          name: 'sectionBadge',
          title: 'Section Badge',
          type: 'string',
          description: 'Label above the section (e.g., "Gallery")'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Main section headline'
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string',
          description: 'Supporting text below the title'
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          description: 'Text for the call-to-action button'
        }),
        defineField({
          name: 'ctaUrl',
          title: 'CTA Button URL',
          type: 'string',
          description: 'Link destination for the CTA button'
        }),
        defineField({
          name: 'items',
          title: 'Gallery Items',
          type: 'array',
          description: 'Card designs to showcase',
          of: [{
            type: 'object',
            fields: [
              defineField({
                name: 'title',
                title: 'Card Title',
                type: 'string',
                description: 'Business/card name (e.g., "Coffee Shop")',
                validation: (Rule) => Rule.required()
              }),
              defineField({
                name: 'image',
                title: 'Card Image',
                type: 'image',
                description: 'Upload a card design image',
                options: {
                  hotspot: true
                }
              }),
              defineField({
                name: 'displayType',
                title: 'Display Type',
                type: 'string',
                description: 'How to display this card',
                options: {
                  list: [
                    { title: 'Phone Mockup', value: 'phone' },
                    { title: 'Card Style', value: 'card' },
                    { title: 'Raw Image', value: 'image' }
                  ],
                  layout: 'radio'
                },
                initialValue: 'card'
              }),
              defineField({
                name: 'gradientFrom',
                title: 'Gradient Start Color',
                type: 'string',
                description: 'Hex color for gradient start (used as fallback or overlay)',
                initialValue: '#8b5cf6'
              }),
              defineField({
                name: 'gradientTo',
                title: 'Gradient End Color',
                type: 'string',
                description: 'Hex color for gradient end',
                initialValue: '#7c3aed'
              })
            ],
            preview: {
              select: { title: 'title', media: 'image', type: 'displayType' },
              prepare({ title, media, type }) {
                const typeLabels: Record<string, string> = {
                  phone: '📱 Phone',
                  card: '💳 Card',
                  image: '🖼️ Image'
                };
                return {
                  title: title || 'Untitled',
                  subtitle: typeLabels[type] || type,
                  media: media
                };
              }
            }
          }],
          validation: (Rule) => Rule.max(6).warning('Maximum 6 gallery items recommended')
        })
      ]
    }),

    // Final CTA Group
    defineField({
      name: 'finalCta',
      title: 'Final CTA Section',
      type: 'object',
      group: 'finalCta',
      fields: [
        defineField({
          name: 'title',
          title: 'Headline',
          type: 'string',
          description: 'Strong call-to-action headline'
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          description: 'Supporting text'
        }),
        defineField({
          name: 'primaryCta',
          title: 'Primary CTA Button',
          type: 'object',
          fields: ctaButton.fields
        }),
        defineField({
          name: 'secondaryCta',
          title: 'Secondary CTA Button',
          type: 'object',
          fields: ctaButton.fields
        }),
        defineField({
          name: 'trustIndicators',
          title: 'Trust Indicators',
          type: 'array',
          description: 'E.g., "No credit card required", "14-day free trial"',
          of: [{ type: 'string' }]
        })
      ]
    }),

    // Translation Metadata Group
    defineField({
      name: 'translationStatus',
      title: 'Translation Status',
      type: 'string',
      group: 'translation',
      options: {
        list: [
          { title: '✅ Published', value: 'published' },
          { title: '📝 Draft', value: 'draft' },
          { title: '⚠️ Needs Review', value: 'needs_review' }
        ]
      },
      initialValue: 'draft'
    }),
    defineField({
      name: 'autoTranslated',
      title: 'Auto-Translated',
      type: 'boolean',
      description: 'Was this content automatically translated? Uncheck to prevent auto-updates.',
      group: 'translation',
      initialValue: false
    }),
    defineField({
      name: 'lastTranslated',
      title: 'Last Translated',
      type: 'datetime',
      group: 'translation',
      readOnly: true
    }),
    defineField({
      name: 'sourceDocument',
      title: 'Source Document',
      type: 'reference',
      to: [{ type: 'pageContent' }],
      description: 'Reference to the English source document',
      group: 'translation',
      readOnly: true
    })
  ],
  preview: {
    select: {
      pageId: 'pageId',
      language: 'language',
      heroTitle: 'hero.title',
      translationStatus: 'translationStatus',
      autoTranslated: 'autoTranslated'
    },
    prepare({ pageId, language, heroTitle, translationStatus, autoTranslated }) {
      const langEmoji: Record<string, string> = {
        en: '🇺🇸', es: '🇪🇸', fr: '🇫🇷',
        pt: '🇵🇹', de: '🇩🇪', ar: '🇸🇦', zh: '🇨🇳'
      };

      const statusEmoji: Record<string, string> = {
        published: '✅',
        draft: '📝',
        needs_review: '⚠️'
      };

      const pageName = pageId?.charAt(0).toUpperCase() + pageId?.slice(1) || 'Page';
      const autoFlag = autoTranslated ? ' 🤖' : '';

      return {
        title: `${pageName} - ${langEmoji[language] || '🌐'} ${language?.toUpperCase() || ''}${autoFlag}`,
        subtitle: `${heroTitle || 'No title set'} | ${statusEmoji[translationStatus] || ''}`,
      };
    }
  },
  orderings: [
    {
      title: 'Page & Language',
      name: 'pageLanguage',
      by: [
        { field: 'pageId', direction: 'asc' },
        { field: 'language', direction: 'asc' }
      ]
    },
    {
      title: 'Language',
      name: 'language',
      by: [
        { field: 'language', direction: 'asc' },
        { field: 'pageId', direction: 'asc' }
      ]
    }
  ]
});

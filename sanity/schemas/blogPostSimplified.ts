import { defineType, defineField } from 'sanity';
import { ContentWithMarkdownImport } from '../components/ContentWithMarkdownImport';
import { LanguageControl } from '../components/LanguageControl';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'organization', title: 'Organization' },
    { name: 'translation', title: 'Translation' },
    { name: 'seo', title: 'SEO' },
    { name: 'publishing', title: 'Publishing' }
  ],
  fields: [
    // === HIDDEN FIELDS (for translations) ===
    defineField({
      name: 'masterBlogId',
      title: 'Master Blog ID',
      type: 'string',
      description: 'Links all language versions together',
      readOnly: true,
      hidden: true
    }),

    // === LANGUAGE ===
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      group: 'translation',
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
      initialValue: 'en',
      validation: Rule => Rule.required()
    }),

    // === CONTENT ===
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The main title of your blog post',
      validation: Rule => Rule.required().max(100)
    }),
    
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'URL-friendly version of the title',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      description: 'Short summary (shown in blog lists)',
      rows: 3,
      validation: Rule => Rule.max(200)
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      description: '📄 Write here or click "Import Markdown" button',
      components: {
        input: ContentWithMarkdownImport
      },
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: Rule => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Important for accessibility and SEO',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption below image'
            }
          ]
        },
        {
          type: 'code',
          title: 'Code Block',
          options: {
            language: 'javascript',
            languageAlternatives: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'Python', value: 'python' },
              { title: 'Bash', value: 'bash' },
              { title: 'JSON', value: 'json' }
            ],
            withFilename: true
          }
        }
      ],
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      group: 'content',
      description: 'Main image shown in blog lists and at top of post',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for accessibility',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    }),

    // === ORGANIZATION ===
    defineField({
      name: 'category',
      title: 'Content Category',
      type: 'reference',
      group: 'organization',
      description: '📁 What is this post about?',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'organization',
      description: '🏷️ Keywords for filtering and related posts',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }]
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'organization',
      to: [{ type: 'author' }],
      validation: Rule => Rule.required()
    }),

    // === TRANSLATION ===
    defineField({
      name: 'languageSettings',
      title: 'Translation Settings',
      type: 'object',
      group: 'translation',
      description: 'Control auto-translation behavior',
      components: {
        input: LanguageControl
      },
      fields: [
        {
          name: 'isLanguageSpecific',
          title: 'Language-Specific Content',
          type: 'boolean',
          description: 'Check if this should NOT be auto-translated',
          initialValue: false
        },
        {
          name: 'publishToLanguages',
          title: 'Translate To',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Which languages to auto-translate to',
          hidden: ({ parent }) => parent?.isLanguageSpecific === true
        },
        {
          name: 'sourceLanguage',
          title: 'Source Language',
          type: 'string',
          readOnly: true
        },
        {
          name: 'translationStatus',
          title: 'Translation Status',
          type: 'string',
          options: {
            list: [
              { title: '✅ Published', value: 'published' },
              { title: '📝 Draft', value: 'draft' },
              { title: '⚠️ Needs Review', value: 'needs_review' }
            ]
          },
          initialValue: 'draft'
        },
        {
          name: 'autoTranslated',
          title: 'Auto-Translated',
          type: 'boolean',
          readOnly: true,
          initialValue: false
        },
        {
          name: 'lastSyncedFrom',
          title: 'Last Synced From',
          type: 'reference',
          to: [{ type: 'blogPost' }],
          readOnly: true
        }
      ],
      hidden: ({ document }) => document?.language !== 'en'
    }),

    // === SEO ===
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Title for search engines (defaults to post title)',
      validation: Rule => Rule.max(60)
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      description: 'Description for search engines (defaults to excerpt)',
      rows: 3,
      validation: Rule => Rule.max(160)
    }),

    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      group: 'seo',
      description: 'Keywords for search engines',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),

    defineField({
      name: 'socialShareImage',
      title: 'Social Share Image',
      type: 'image',
      group: 'seo',
      description: 'Image for Facebook, Twitter, LinkedIn (1200x630). Defaults to thumbnail if empty.',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text'
        }
      ]
    }),

    // === PUBLISHING ===
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'publishing',
      options: {
        list: [
          { title: '📝 Draft', value: 'draft' },
          { title: '✅ Published', value: 'published' },
          { title: '📦 Archived', value: 'archived' }
        ],
        layout: 'radio'
      },
      initialValue: 'draft',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'publishing',
      description: '⭐ Pin this post to the top (homepage, category pages)',
      initialValue: false
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'publishing',
      description: 'Auto-set on first publish. Edit for scheduled posts.',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15
      }
    })
  ],

  preview: {
    select: {
      title: 'title',
      language: 'language',
      media: 'thumbnailImage',
      status: 'status',
      featured: 'featured',
      publishedAt: 'publishedAt',
      category: 'category.name.en'
    },
    prepare({ title, language, media, status, featured, publishedAt, category }) {
      const statusEmoji = {
        draft: '📝',
        published: '✅',
        archived: '📦'
      };
      
      const langEmoji = {
        en: '🇺🇸', es: '🇪🇸', fr: '🇫🇷',
        pt: '🇵🇹', de: '🇩🇪', ar: '🇸🇦', zh: '🇨🇳'
      };
      
      const featuredBadge = featured ? '⭐' : '';
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Not published';
      
      return {
        title: `${statusEmoji[status] || ''} ${featuredBadge} ${title}`,
        subtitle: `${langEmoji[language] || '🌐'} ${language?.toUpperCase()} | ${category || 'No category'} | ${date}`,
        media
      };
    }
  },

  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Published Date (Oldest)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }]
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    },
    {
      title: 'Language',
      name: 'languageAsc',
      by: [
        { field: 'language', direction: 'asc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    }
  ]
});



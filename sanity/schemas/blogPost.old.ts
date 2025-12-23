import { defineType, defineField } from 'sanity';
import { ContentWithMarkdownImport } from '../components/ContentWithMarkdownImport';
import { LanguageControl } from '../components/LanguageControl';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: () => '📝',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'design', title: 'Design & Layout' },
    { name: 'translation', title: 'Translation' },
    { name: 'seo', title: 'SEO' },
    { name: 'meta', title: 'Meta' }
  ],
  fields: [
    // === MASTER ID (Links all language versions) ===
    defineField({
      name: 'masterBlogId',
      title: 'Master Blog ID',
      type: 'string',
      group: 'translation',
      description: 'Links all language versions of this blog post',
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
    
    // === CONTENT GROUP ===
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
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
      rows: 3,
      group: 'content',
      description: 'Short description of the post (150-160 characters)',
      validation: Rule => Rule.max(160)
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      description: '📄 Use the content editor below, or click "Import Markdown" button',
      components: {
        input: ContentWithMarkdownImport
      },
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
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
              { title: 'Code', value: 'code' }
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
                      allowRelative: true,
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
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
              title: 'Caption'
            }
          ]
        },
        {
          name: 'code',
          title: 'Code Block',
          type: 'code',
          options: {
            language: 'javascript',
            languageAlternatives: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'JSON', value: 'json' },
              { title: 'Bash', value: 'bash' },
              { title: 'Python', value: 'python' }
            ]
          }
        }
      ]
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: Rule => Rule.required()
        },
        {
          name: 'languageSpecific',
          type: 'boolean',
          title: 'Language-Specific Image',
          description: 'Enable if this image contains text and needs different versions per language',
          initialValue: false
        }
      ],
      validation: Rule => Rule.required()
    }),
    
    // === DESIGN & LAYOUT ===
    defineField({
      name: 'layoutDesign',
      title: 'Layout Design',
      type: 'reference',
      to: [{ type: 'blogTemplate' }],
      group: 'design',
      description: '🎨 Choose design style (affects page layout, not content topic)',
      validation: Rule => Rule.required(),
      options: {
        filter: 'active == true' // Only show active layout types
      }
    }),
    
    // === TRANSLATION SETTINGS ===
    defineField({
      name: 'languageSettings',
      title: 'Language & Translation Settings',
      type: 'object',
      group: 'translation',
      fields: [
        {
          name: 'isLanguageSpecific',
          title: 'Language-Specific Content',
          type: 'boolean',
          description: 'Check if this content is specific to one language (won\'t auto-translate)',
          initialValue: false
        },
        {
          name: 'publishToLanguages',
          title: 'Publish to Languages',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'All Languages', value: 'all' },
              { title: '🇺🇸 English', value: 'en' },
              { title: '🇪🇸 Spanish', value: 'es' },
              { title: '🇫🇷 French', value: 'fr' },
              { title: '🇵🇹 Portuguese', value: 'pt' },
              { title: '🇩🇪 German', value: 'de' },
              { title: '🇸🇦 Arabic', value: 'ar' },
              { title: '🇨🇳 Chinese', value: 'zh' }
            ]
          },
          description: 'Select which languages to translate this content to',
          initialValue: ['all'],
          hidden: ({ parent }) => parent?.isLanguageSpecific === true
        },
        {
          name: 'sourceLanguage',
          title: 'Source Language',
          type: 'string',
          readOnly: true,
          description: 'Original language this content was created in'
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
          description: 'Was this version automatically translated?'
        },
        {
          name: 'lastSyncedFrom',
          title: 'Last Synced From',
          type: 'reference',
          to: [{ type: 'blogPost' }],
          readOnly: true,
          description: 'Reference to source document'
        }
      ]
    }),
    
    // === ORGANIZATION ===
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'content',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      group: 'content'
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      group: 'content',
      description: 'Select 2-3 related posts for internal linking',
      validation: Rule => Rule.max(3)
    }),
    
    // === SEO GROUP ===
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Override the page title for search engines (50-60 characters)',
      validation: Rule => Rule.max(60)
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Meta description for search results (150-160 characters)',
      validation: Rule => Rule.max(160)
    }),
    defineField({
      name: 'seoKeywords',
      title: 'Focus Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
      description: 'Target SEO keywords (3-5 recommended)',
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.max(10)
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      group: 'seo',
      description: 'Image for social media shares (1200x630px recommended)',
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
    
    // === META GROUP ===
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'meta',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'meta',
      validation: Rule => Rule.required(),
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      group: 'meta',
      readOnly: true
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'meta',
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
      title: 'Featured Post',
      type: 'boolean',
      group: 'meta',
      description: 'Show this post prominently on the blog homepage',
      initialValue: false
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      language: 'language',
      media: 'featuredImage',
      status: 'status',
      publishedAt: 'publishedAt',
      category: 'category.name.en',
      layoutName: 'layoutDesign.name',
      layoutCategory: 'layoutDesign.category',
      translationStatus: 'languageSettings.translationStatus'
    },
    prepare({ title, language, media, status, publishedAt, category, layoutName, layoutCategory, translationStatus }) {
      const statusEmoji = {
        draft: '📝',
        published: '✅',
        archived: '📦'
      };
      
      const langEmoji = {
        en: '🇺🇸', es: '🇪🇸', fr: '🇫🇷',
        pt: '🇵🇹', de: '🇩🇪', ar: '🇸🇦', zh: '🇨🇳'
      };
      
      const templateEmoji = {
        comparison: '⚔️',
        tutorial: '📚',
        news: '📰',
        guide: '📖',
        general: '📄'
      };
      
      const transStatusEmoji = {
        published: '✅',
        draft: '📝',
        needs_review: '⚠️'
      };
      
      return {
        title: `${statusEmoji[status] || ''} ${title}`,
        subtitle: `${langEmoji[language] || '🌐'} ${language?.toUpperCase()} | ${templateEmoji[layoutCategory] || '📄'} ${layoutName || 'No layout'} | ${category || 'No category'} | ${transStatusEmoji[translationStatus] || ''} | ${new Date(publishedAt).toLocaleDateString()}`,
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
      title: 'Language',
      name: 'languageAsc',
      by: [
        { field: 'language', direction: 'asc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Layout Type',
      name: 'layoutTypeAsc',
      by: [
        { field: 'layoutDesign.category', direction: 'asc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    }
  ]
});

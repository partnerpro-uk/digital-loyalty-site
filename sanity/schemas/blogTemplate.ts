import { defineType, defineField } from 'sanity';

export const blogTemplate = defineType({
  name: 'blogTemplate',
  title: 'Layout Design Type',
  type: 'document',
  description: '🎨 Pre-defined layout designs (5 fixed types - not content categories)',
  fields: [
    defineField({
      name: 'name',
      title: 'Template Name',
      type: 'string',
      description: 'Display name for this template',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'templateId',
      title: 'Template ID',
      type: 'string',
      description: 'Unique identifier (e.g., "competitor-vs", "tutorial-basic")',
      validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/, {
        name: 'slug',
        invert: false
      })
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'What this template is used for',
      rows: 3
    }),
    defineField({
      name: 'category',
      title: 'Template Category',
      type: 'string',
      options: {
        list: [
          { title: '⚔️ Comparison', value: 'comparison' },
          { title: '📚 Tutorial', value: 'tutorial' },
          { title: '📰 News', value: 'news' },
          { title: '📖 Guide', value: 'guide' },
          { title: '📄 General', value: 'general' }
        ],
        layout: 'radio'
      },
      initialValue: 'general',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'defaultMarkdown',
      title: 'Default Markdown Structure',
      type: 'text',
      description: 'Default markdown template users can paste and modify',
      rows: 15,
      initialValue: `# Blog Title

## Overview

Brief introduction to the topic.

## Main Content

### Section 1

Content here...

### Section 2

More content...

## Conclusion

Wrap up and call to action.
`
    }),
    defineField({
      name: 'frontendComponent',
      title: 'Frontend Component',
      type: 'string',
      description: 'Astro component name (e.g., "ComparisonLayout", "TutorialLayout")',
      initialValue: 'GeneralLayout'
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Single Column', value: 'single-column' },
          { title: 'Two Column', value: 'two-column' },
          { title: 'Wide', value: 'wide' },
          { title: 'Narrow', value: 'narrow' }
        ]
      },
      initialValue: 'single-column'
    }),
    defineField({
      name: 'colorScheme',
      title: 'Color Scheme',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Comparison (Purple)', value: 'comparison' },
          { title: 'Tutorial (Blue)', value: 'tutorial' },
          { title: 'News (Green)', value: 'news' }
        ]
      },
      initialValue: 'default'
    }),
    defineField({
      name: 'requiredSections',
      title: 'Required Sections',
      type: 'array',
      description: 'Content sections that should be included',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Overview', value: 'overview' },
          { title: 'Features', value: 'features' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Pros & Cons', value: 'pros-cons' },
          { title: 'Conclusion', value: 'conclusion' },
          { title: 'FAQ', value: 'faq' }
        ]
      }
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Is this template available for use?',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'templateId',
      category: 'category',
      active: 'active'
    },
    prepare({ title, subtitle, category, active }) {
      const categoryEmoji = {
        comparison: '⚔️',
        tutorial: '📚',
        news: '📰',
        guide: '📖',
        general: '📄'
      };
      
      return {
        title: `${categoryEmoji[category] || '📄'} ${title}${!active ? ' (Inactive)' : ''}`,
        subtitle: `ID: ${subtitle}`
      };
    }
  }
});


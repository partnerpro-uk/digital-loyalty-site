import { defineType, defineField } from 'sanity';
import { TranslationInput } from '../components/TranslationInput';

export const category = defineType({
  name: 'category',
  title: 'Content Category',
  type: 'document',
  description: '📂 What the post is ABOUT (e.g., Marketing, Technology, Customer Retention) - Create as many as you need!',
  fields: [
    defineField({
      name: 'name',
      title: 'Name (Multilingual)',
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
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.en',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 3 },
        { name: 'es', type: 'text', title: 'Spanish', rows: 3 },
        { name: 'fr', type: 'text', title: 'French', rows: 3 },
        { name: 'pt', type: 'text', title: 'Portuguese', rows: 3 },
        { name: 'de', type: 'text', title: 'German', rows: 3 },
        { name: 'ar', type: 'text', title: 'Arabic', rows: 3 },
        { name: 'zh', type: 'text', title: 'Chinese', rows: 3 }
      ]
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code for category (e.g., #8b5cf6)',
      validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
        name: 'hex color',
        invert: false
      })
    })
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'description.en'
    }
  }
});


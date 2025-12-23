import { defineType, defineField } from 'sanity';
import { TranslationTextInput } from '../components/TranslationTextInput';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for accessibility and SEO'
        }
      ]
    }),
    defineField({
      name: 'bio',
      title: 'Bio (Multilingual)',
      description: '✨ Fill English and click "Generate All Translations" button',
      type: 'object',
      components: {
        input: TranslationTextInput
      },
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 3, validation: Rule => Rule.required() },
        { name: 'es', type: 'text', title: 'Spanish', rows: 3 },
        { name: 'fr', type: 'text', title: 'French', rows: 3 },
        { name: 'pt', type: 'text', title: 'Portuguese', rows: 3 },
        { name: 'de', type: 'text', title: 'German', rows: 3 },
        { name: 'ar', type: 'text', title: 'Arabic', rows: 3 },
        { name: 'zh', type: 'text', title: 'Chinese', rows: 3 }
      ]
    }),
    defineField({
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'twitter', type: 'url', title: 'Twitter' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'website', type: 'url', title: 'Website' }
      ]
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
});


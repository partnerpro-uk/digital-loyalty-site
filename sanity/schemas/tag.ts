import { defineType, defineField } from 'sanity';
import { TranslationInput } from '../components/TranslationInput';

export const tag = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
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
      type: 'text',
      rows: 2
    })
  ],
  preview: {
    select: {
      title: 'name.en'
    }
  }
});


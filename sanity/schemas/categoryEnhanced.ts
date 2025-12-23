import { defineType, defineField } from 'sanity';
import { generateSlug } from '../lib/autoTranslate';

export const categoryEnhanced = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: () => '📁',
  fields: [
    defineField({
      name: 'name',
      title: 'Name (Multilingual)',
      type: 'object',
      description: '💡 TIP: Enter English name, then click "Auto-translate" below',
      fields: [
        { 
          name: 'en', 
          type: 'string', 
          title: 'English', 
          validation: Rule => Rule.required() 
        },
        { name: 'es', type: 'string', title: 'Spanish' },
        { name: 'fr', type: 'string', title: 'French' },
        { name: 'pt', type: 'string', title: 'Portuguese' },
        { name: 'de', type: 'string', title: 'German' },
        { name: 'ar', type: 'string', title: 'Arabic' },
        { name: 'zh', type: 'string', title: 'Chinese' }
      ],
      validation: Rule => Rule.required(),
      components: {
        input: (props) => {
          const { renderDefault } = props;
          return (
            <>
              {renderDefault(props)}
              {/* Auto-translate button would go here in a custom component */}
            </>
          );
        }
      }
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: '🔧 Auto-generated from English name',
      options: {
        source: 'name.en',
        maxLength: 96,
        slugify: (input: string) => generateSlug(input)
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description (Multilingual)',
      type: 'object',
      description: '💡 TIP: Enter English description first, others will auto-translate on publish',
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
      initialValue: '#8b5cf6',
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


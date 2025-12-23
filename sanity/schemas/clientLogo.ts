import { defineType, defineField } from 'sanity';

export const clientLogo = defineType({
  name: 'clientLogo',
  title: 'Client Logo',
  type: 'document',
  icon: () => '🏢',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      description: 'Company name (used for alt text)',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Company logo (recommended: grayscale, transparent PNG, min 200px wide)',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'url',
      title: 'Company Website (Optional)',
      type: 'url',
      description: 'Link to company website'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display (lower numbers first)',
      initialValue: 0,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this logo on the website',
      initialValue: true
    })
  ],
  preview: {
    select: {
      name: 'name',
      order: 'order',
      active: 'active',
      logo: 'logo'
    },
    prepare({ name, order, active, logo }) {
      const activeIcon = active ? '✅' : '❌';
      return {
        title: name,
        subtitle: `Order: ${order} | ${activeIcon} ${active ? 'Active' : 'Hidden'}`,
        media: logo
      };
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [
        { field: 'name', direction: 'asc' }
      ]
    }
  ]
});

import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  groups: [
    { name: 'brand', title: 'Brand', default: true },
    { name: 'theme', title: 'Theme Colors' },
    { name: 'typography', title: 'Typography' },
    { name: 'cta', title: 'CTA Behavior' },
    { name: 'social', title: 'Social Links' },
    { name: 'analytics', title: 'Analytics' }
  ],
  fields: [
    // Brand Group
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'The name of your website/company',
      group: 'brand',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'A short tagline for your site',
      group: 'brand'
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Main logo (used on light backgrounds)',
      group: 'brand',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Dark Mode)',
      type: 'image',
      description: 'Logo for dark mode (used on dark backgrounds)',
      group: 'brand',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Browser tab icon (should be square, ideally 32x32 or 64x64)',
      group: 'brand'
    }),

    // Theme Colors Group - Simple hex string inputs
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'string',
      description: 'Main brand color (hex, e.g., #8b5cf6)',
      group: 'theme',
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color (e.g., #8b5cf6)')
    }),
    defineField({
      name: 'primaryColorDark',
      title: 'Primary Color (Dark Mode)',
      type: 'string',
      description: 'Primary color for dark mode (hex)',
      group: 'theme',
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color')
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      description: 'Secondary accent color (hex)',
      group: 'theme',
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color')
    }),
    defineField({
      name: 'backgroundLight',
      title: 'Background (Light Mode)',
      type: 'string',
      description: 'Main background color for light mode (hex)',
      group: 'theme',
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color')
    }),
    defineField({
      name: 'backgroundDark',
      title: 'Background (Dark Mode)',
      type: 'string',
      description: 'Main background color for dark mode (hex)',
      group: 'theme',
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color')
    }),
    defineField({
      name: 'surfaceLight',
      title: 'Surface (Light Mode)',
      type: 'string',
      description: 'Card/surface background for light mode (hex)',
      group: 'theme',
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color')
    }),
    defineField({
      name: 'surfaceDark',
      title: 'Surface (Dark Mode)',
      type: 'string',
      description: 'Card/surface background for dark mode (hex)',
      group: 'theme',
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color')
    }),
    defineField({
      name: 'textLight',
      title: 'Text Color (Light Mode)',
      type: 'string',
      description: 'Main text color for light mode (hex)',
      group: 'theme',
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color')
    }),
    defineField({
      name: 'textDark',
      title: 'Text Color (Dark Mode)',
      type: 'string',
      description: 'Main text color for dark mode (hex)',
      group: 'theme',
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color')
    }),

    // Typography Group
    defineField({
      name: 'headingFont',
      title: 'Heading Font Family',
      type: 'string',
      description: 'Font for headings (h1, h2, h3, etc.)',
      group: 'typography',
      options: {
        list: [
          { title: 'Inter', value: 'Inter' },
          { title: 'Poppins', value: 'Poppins' },
          { title: 'Montserrat', value: 'Montserrat' },
          { title: 'Playfair Display', value: 'Playfair Display' },
          { title: 'DM Sans', value: 'DM Sans' },
          { title: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans' },
          { title: 'Outfit', value: 'Outfit' }
        ]
      },
      initialValue: 'Inter'
    }),
    defineField({
      name: 'bodyFont',
      title: 'Body Font Family',
      type: 'string',
      description: 'Font for body text and paragraphs',
      group: 'typography',
      options: {
        list: [
          { title: 'Inter', value: 'Inter' },
          { title: 'Open Sans', value: 'Open Sans' },
          { title: 'Roboto', value: 'Roboto' },
          { title: 'Lato', value: 'Lato' },
          { title: 'Source Sans Pro', value: 'Source Sans Pro' },
          { title: 'DM Sans', value: 'DM Sans' },
          { title: 'Nunito', value: 'Nunito' }
        ]
      },
      initialValue: 'Inter'
    }),

    // CTA Behavior Group
    defineField({
      name: 'ctaMode',
      title: 'Primary CTA Mode',
      type: 'string',
      description: 'What happens when users click "Get Started" or pricing buttons',
      group: 'cta',
      options: {
        list: [
          { title: 'Lead Capture Form (Modal)', value: 'form_modal' },
          { title: 'Lead Capture Form (Page)', value: 'form_page' },
          { title: 'Direct App Redirect', value: 'app_redirect' },
          { title: 'Book a Call (Calendar)', value: 'calendar' }
        ],
        layout: 'radio'
      },
      initialValue: 'form_modal'
    }),
    defineField({
      name: 'appSignupUrl',
      title: 'App Signup URL',
      type: 'url',
      description: 'URL to redirect users to for self-serve signup (e.g., https://app.yourproduct.com/signup)',
      group: 'cta',
      hidden: ({ parent }) => parent?.ctaMode !== 'app_redirect'
    }),
    defineField({
      name: 'calendarUrl',
      title: 'Calendar Booking URL',
      type: 'url',
      description: 'Calendly, Cal.com, or similar booking link (e.g., https://calendly.com/yourteam/demo)',
      group: 'cta',
      hidden: ({ parent }) => parent?.ctaMode !== 'calendar'
    }),
    defineField({
      name: 'calendarEmbedType',
      title: 'Calendar Embed Type',
      type: 'string',
      description: 'How to display the calendar',
      group: 'cta',
      options: {
        list: [
          { title: 'Embedded on Page', value: 'embed' },
          { title: 'Popup Widget', value: 'popup' },
          { title: 'Redirect to Calendar', value: 'redirect' }
        ]
      },
      initialValue: 'embed',
      hidden: ({ parent }) => parent?.ctaMode !== 'calendar'
    }),
    defineField({
      name: 'enterpriseCtaMode',
      title: 'Enterprise CTA Mode',
      type: 'string',
      description: 'What happens when users click Enterprise/Contact buttons (can differ from main CTA)',
      group: 'cta',
      options: {
        list: [
          { title: 'Same as Primary', value: 'same' },
          { title: 'Contact Form', value: 'contact_form' },
          { title: 'Book a Call (Calendar)', value: 'calendar' },
          { title: 'External Link', value: 'external' }
        ]
      },
      initialValue: 'contact_form'
    }),
    defineField({
      name: 'enterpriseCalendarUrl',
      title: 'Enterprise Calendar URL',
      type: 'url',
      description: 'Separate calendar for enterprise demos (optional)',
      group: 'cta',
      hidden: ({ parent }) => parent?.enterpriseCtaMode !== 'calendar'
    }),
    defineField({
      name: 'enterpriseExternalUrl',
      title: 'Enterprise External URL',
      type: 'url',
      description: 'External URL for enterprise inquiries',
      group: 'cta',
      hidden: ({ parent }) => parent?.enterpriseCtaMode !== 'external'
    }),
    defineField({
      name: 'passContextToApp',
      title: 'Pass Context to App',
      type: 'boolean',
      description: 'Include plan, source, and UTM params in app redirect URL',
      group: 'cta',
      initialValue: true,
      hidden: ({ parent }) => parent?.ctaMode !== 'app_redirect'
    }),
    defineField({
      name: 'showFormAfterCalendar',
      title: 'Show Contact Form After Calendar',
      type: 'boolean',
      description: 'Display a brief contact form alongside the calendar embed',
      group: 'cta',
      initialValue: false,
      hidden: ({ parent }) => parent?.ctaMode !== 'calendar'
    }),

    // Social Links Group
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Add links to your social media profiles',
      group: 'social',
      of: [{
        type: 'object',
        name: 'socialLink',
        fields: [
          defineField({
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
              list: [
                { title: 'Twitter/X', value: 'twitter' },
                { title: 'LinkedIn', value: 'linkedin' },
                { title: 'Instagram', value: 'instagram' },
                { title: 'Facebook', value: 'facebook' },
                { title: 'YouTube', value: 'youtube' },
                { title: 'TikTok', value: 'tiktok' },
                { title: 'GitHub', value: 'github' },
                { title: 'Discord', value: 'discord' }
              ]
            },
            validation: (Rule) => Rule.required()
          }),
          defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: (Rule) => Rule.required()
          })
        ],
        preview: {
          select: {
            platform: 'platform',
            url: 'url'
          },
          prepare({ platform, url }) {
            const icons: Record<string, string> = {
              twitter: '𝕏',
              linkedin: 'in',
              instagram: '📷',
              facebook: 'f',
              youtube: '▶️',
              tiktok: '♪',
              github: '🐙',
              discord: '💬'
            };
            return {
              title: platform?.charAt(0).toUpperCase() + platform?.slice(1) || 'Social Link',
              subtitle: url,
              media: () => icons[platform] || '🔗'
            };
          }
        }
      }]
    }),

    // Analytics Group
    defineField({
      name: 'posthogKey',
      title: 'PostHog API Key',
      type: 'string',
      description: 'Your PostHog project API key for analytics',
      group: 'analytics'
    }),
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      description: 'Google Analytics measurement ID (e.g., G-XXXXXXXXXX)',
      group: 'analytics'
    }),
    defineField({
      name: 'googleTagManagerId',
      title: 'Google Tag Manager ID',
      type: 'string',
      description: 'GTM container ID (e.g., GTM-XXXXXX)',
      group: 'analytics'
    })
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'tagline'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Site Settings',
        subtitle: subtitle || 'Global site configuration'
      };
    }
  }
});

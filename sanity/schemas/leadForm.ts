import { defineType, defineField } from 'sanity';

export const leadForm = defineType({
  name: 'leadForm',
  title: 'Lead Capture Forms',
  type: 'document',
  icon: () => '📝',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'fields', title: 'Form Fields' },
    { name: 'behavior', title: 'Behavior' },
    { name: 'webhooks', title: 'Webhooks' },
    { name: 'styling', title: 'Styling' }
  ],
  fields: [
    // === BASIC ===
    defineField({
      name: 'formId',
      title: 'Form ID',
      type: 'string',
      group: 'basic',
      description: 'Unique identifier (e.g., waitlist, get-started, demo-request)',
      validation: Rule => Rule.required().regex(/^[a-z0-9-]+$/, {
        name: 'lowercase-alphanumeric',
        invert: false
      }).error('Must be lowercase letters, numbers, and hyphens only')
    }),
    defineField({
      name: 'name',
      title: 'Form Name',
      type: 'string',
      group: 'basic',
      description: 'Internal name for Sanity Studio'
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      group: 'basic',
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
      name: 'heading',
      title: 'Form Heading',
      type: 'string',
      group: 'basic',
      description: 'Main heading displayed above the form'
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      group: 'basic',
      rows: 2,
      description: 'Supporting text below the heading'
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      group: 'basic',
      initialValue: 'Get Started'
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      group: 'basic',
      rows: 2,
      description: 'Message shown after successful submission'
    }),
    defineField({
      name: 'socialProofText',
      title: 'Social Proof',
      type: 'string',
      group: 'basic',
      description: 'e.g., "Join 2,000+ businesses"'
    }),

    // === FORM FIELDS ===
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      group: 'fields',
      of: [{
        type: 'object',
        name: 'formField',
        fields: [
          {
            name: 'fieldId',
            type: 'string',
            title: 'Field ID',
            description: 'e.g., email, name, company',
            validation: Rule => Rule.required()
          },
          {
            name: 'type',
            type: 'string',
            title: 'Field Type',
            options: {
              list: [
                { title: 'Email', value: 'email' },
                { title: 'Text', value: 'text' },
                { title: 'Phone', value: 'tel' },
                { title: 'Select Dropdown', value: 'select' },
                { title: 'Radio Buttons', value: 'radio' },
                { title: 'Checkbox', value: 'checkbox' },
                { title: 'Textarea', value: 'textarea' },
                { title: 'Hidden', value: 'hidden' }
              ]
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'label',
            type: 'string',
            title: 'Label'
          },
          {
            name: 'placeholder',
            type: 'string',
            title: 'Placeholder'
          },
          {
            name: 'required',
            type: 'boolean',
            title: 'Required',
            initialValue: false
          },
          {
            name: 'options',
            type: 'array',
            title: 'Options (for select/radio)',
            of: [{
              type: 'object',
              fields: [
                { name: 'label', type: 'string', title: 'Label' },
                { name: 'value', type: 'string', title: 'Value' }
              ],
              preview: {
                select: { label: 'label', value: 'value' },
                prepare({ label, value }) {
                  return { title: label, subtitle: value };
                }
              }
            }],
            hidden: ({ parent }) => !['select', 'radio'].includes(parent?.type)
          },
          {
            name: 'defaultValue',
            type: 'string',
            title: 'Default Value'
          },
          {
            name: 'validation',
            type: 'object',
            title: 'Validation',
            fields: [
              { name: 'minLength', type: 'number', title: 'Min Length' },
              { name: 'maxLength', type: 'number', title: 'Max Length' },
              { name: 'pattern', type: 'string', title: 'Pattern', description: 'Regex pattern' }
            ]
          }
        ],
        preview: {
          select: { fieldId: 'fieldId', type: 'type', required: 'required' },
          prepare({ fieldId, type, required }) {
            return {
              title: `${fieldId} (${type})`,
              subtitle: required ? '* Required' : 'Optional'
            };
          }
        }
      }]
    }),

    // === BEHAVIOR ===
    defineField({
      name: 'successAction',
      title: 'After Submit',
      type: 'string',
      group: 'behavior',
      options: {
        list: [
          { title: 'Show success message', value: 'message' },
          { title: 'Redirect to URL', value: 'redirect' },
          { title: 'Redirect to app signup', value: 'app_redirect' }
        ]
      },
      initialValue: 'message'
    }),
    defineField({
      name: 'redirectUrl',
      title: 'Redirect URL',
      type: 'string',
      group: 'behavior',
      description: 'For redirect actions. Use {plan}, {email} as placeholders.',
      hidden: ({ parent }) => parent?.successAction === 'message'
    }),
    defineField({
      name: 'passContextToRedirect',
      title: 'Pass Context to Redirect',
      type: 'boolean',
      group: 'behavior',
      description: 'Add plan, source, UTM params to redirect URL',
      initialValue: true
    }),
    defineField({
      name: 'trackingEnabled',
      title: 'Enable PostHog Tracking',
      type: 'boolean',
      group: 'behavior',
      initialValue: true
    }),

    // === WEBHOOKS ===
    defineField({
      name: 'webhooks',
      title: 'Webhook Destinations',
      type: 'array',
      group: 'webhooks',
      description: 'Configure external services to receive form submissions',
      of: [{
        type: 'object',
        name: 'webhookDestination',
        fields: [
          {
            name: 'name',
            type: 'string',
            title: 'Name',
            description: 'e.g., Zapier, Make, Slack'
          },
          {
            name: 'url',
            type: 'url',
            title: 'Webhook URL',
            validation: Rule => Rule.required()
          },
          {
            name: 'method',
            type: 'string',
            title: 'HTTP Method',
            options: { list: ['POST', 'PUT'] },
            initialValue: 'POST'
          },
          {
            name: 'headers',
            type: 'array',
            title: 'Custom Headers',
            of: [{
              type: 'object',
              fields: [
                { name: 'key', type: 'string', title: 'Header Name' },
                { name: 'value', type: 'string', title: 'Header Value' }
              ],
              preview: {
                select: { key: 'key', value: 'value' },
                prepare({ key, value }) {
                  return { title: `${key}: ${value}` };
                }
              }
            }]
          },
          {
            name: 'enabled',
            type: 'boolean',
            title: 'Enabled',
            initialValue: true
          },
          {
            name: 'secretKey',
            type: 'string',
            title: 'Secret Key (for HMAC)',
            description: 'Optional: used to sign the payload for verification'
          }
        ],
        preview: {
          select: { name: 'name', url: 'url', enabled: 'enabled' },
          prepare({ name, url, enabled }) {
            return {
              title: name || 'Webhook',
              subtitle: `${enabled ? '✅' : '❌'} ${url?.substring(0, 40)}...`
            };
          }
        }
      }]
    }),

    // === STYLING ===
    defineField({
      name: 'variant',
      title: 'Form Variant',
      type: 'string',
      group: 'styling',
      options: {
        list: [
          { title: 'Default (Card)', value: 'default' },
          { title: 'Inline (Horizontal)', value: 'inline' },
          { title: 'Full Page', value: 'fullpage' },
          { title: 'Modal/Popup', value: 'modal' }
        ]
      },
      initialValue: 'default'
    }),
    defineField({
      name: 'showLabels',
      title: 'Show Field Labels',
      type: 'boolean',
      group: 'styling',
      initialValue: true
    }),
    defineField({
      name: 'buttonVariant',
      title: 'Button Style',
      type: 'string',
      group: 'styling',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Gradient', value: 'gradient' }
        ]
      },
      initialValue: 'primary'
    }),

    // === TRANSLATION METADATA ===
    defineField({
      name: 'autoTranslated',
      title: 'Auto-Translated',
      type: 'boolean',
      readOnly: true,
      initialValue: false
    })
  ],
  preview: {
    select: {
      name: 'name',
      formId: 'formId',
      language: 'language',
      variant: 'variant'
    },
    prepare({ name, formId, language, variant }) {
      const langEmoji: Record<string, string> = {
        en: '🇺🇸', es: '🇪🇸', fr: '🇫🇷',
        pt: '🇵🇹', de: '🇩🇪', ar: '🇸🇦', zh: '🇨🇳'
      };

      return {
        title: name || formId,
        subtitle: `${langEmoji[language] || '🌐'} ${formId} • ${variant || 'default'}`
      };
    }
  },
  orderings: [
    {
      title: 'Form ID',
      name: 'formIdAsc',
      by: [
        { field: 'formId', direction: 'asc' },
        { field: 'language', direction: 'asc' }
      ]
    },
    {
      title: 'Language',
      name: 'languageAsc',
      by: [
        { field: 'language', direction: 'asc' },
        { field: 'formId', direction: 'asc' }
      ]
    }
  ]
});

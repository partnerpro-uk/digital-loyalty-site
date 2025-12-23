import { defineType, defineField } from 'sanity';

export const leadSubmission = defineType({
  name: 'leadSubmission',
  title: 'Lead Submissions',
  type: 'document',
  icon: () => '📬',
  readOnly: true, // Submissions are immutable
  fields: [
    defineField({
      name: 'formId',
      title: 'Form ID',
      type: 'string',
      description: 'Which form was submitted'
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime'
    }),
    defineField({
      name: 'data',
      title: 'Form Data',
      type: 'object',
      description: 'All submitted field values',
      fields: [
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'company', type: 'string', title: 'Company' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'message', type: 'text', title: 'Message' },
        // Additional fields stored as JSON string for flexibility
        { name: 'additionalFields', type: 'text', title: 'Additional Fields (JSON)' }
      ]
    }),
    defineField({
      name: 'context',
      title: 'Context',
      type: 'object',
      description: 'Source and tracking information',
      fields: [
        { name: 'plan', type: 'string', title: 'Selected Plan' },
        { name: 'source', type: 'string', title: 'Source Page' },
        { name: 'referrer', type: 'string', title: 'Referrer URL' },
        { name: 'utmSource', type: 'string', title: 'UTM Source' },
        { name: 'utmMedium', type: 'string', title: 'UTM Medium' },
        { name: 'utmCampaign', type: 'string', title: 'UTM Campaign' },
        { name: 'utmTerm', type: 'string', title: 'UTM Term' },
        { name: 'utmContent', type: 'string', title: 'UTM Content' },
        { name: 'language', type: 'string', title: 'Language' },
        { name: 'region', type: 'string', title: 'Region' },
        { name: 'userAgent', type: 'string', title: 'User Agent' },
        { name: 'ip', type: 'string', title: 'IP Address' }
      ]
    }),
    defineField({
      name: 'webhookResults',
      title: 'Webhook Results',
      type: 'array',
      description: 'Status of webhook deliveries',
      of: [{
        type: 'object',
        fields: [
          { name: 'destination', type: 'string', title: 'Destination' },
          { name: 'success', type: 'boolean', title: 'Success' },
          { name: 'statusCode', type: 'number', title: 'Status Code' },
          { name: 'error', type: 'string', title: 'Error Message' },
          { name: 'timestamp', type: 'datetime', title: 'Timestamp' }
        ],
        preview: {
          select: { destination: 'destination', success: 'success', statusCode: 'statusCode' },
          prepare({ destination, success, statusCode }) {
            return {
              title: destination || 'Unknown',
              subtitle: `${success ? '✅' : '❌'} Status: ${statusCode || 'N/A'}`
            };
          }
        }
      }]
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Converted', value: 'converted' },
          { title: 'Unqualified', value: 'unqualified' }
        ]
      },
      initialValue: 'new'
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Internal notes about this lead',
      readOnly: false // Allow notes to be editable
    })
  ],
  preview: {
    select: {
      email: 'data.email',
      name: 'data.name',
      formId: 'formId',
      date: 'submittedAt',
      status: 'status',
      plan: 'context.plan'
    },
    prepare({ email, name, formId, date, status, plan }) {
      const statusEmoji: Record<string, string> = {
        new: '🆕',
        contacted: '📞',
        converted: '✅',
        unqualified: '❌'
      };

      const displayName = name || email || 'Unknown';
      const dateStr = date ? new Date(date).toLocaleDateString() : 'No date';
      const planStr = plan ? ` • Plan: ${plan}` : '';

      return {
        title: `${statusEmoji[status] || '🆕'} ${displayName}`,
        subtitle: `${formId} • ${dateStr}${planStr}`
      };
    }
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'dateDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }]
    },
    {
      title: 'Oldest First',
      name: 'dateAsc',
      by: [{ field: 'submittedAt', direction: 'asc' }]
    },
    {
      title: 'By Form',
      name: 'formIdAsc',
      by: [
        { field: 'formId', direction: 'asc' },
        { field: 'submittedAt', direction: 'desc' }
      ]
    },
    {
      title: 'By Status',
      name: 'statusAsc',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'submittedAt', direction: 'desc' }
      ]
    }
  ]
});

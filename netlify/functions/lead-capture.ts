import type { Handler, HandlerEvent } from '@netlify/functions';
import { createClient } from '@sanity/client';
import crypto from 'crypto';

// Environment variables
const SANITY_PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_STUDIO_DATASET || 'production';
const SANITY_TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!SANITY_TOKEN) {
  console.error('SANITY_WRITE_TOKEN is not set');
}

// Initialize Sanity client
const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID!,
  dataset: SANITY_DATASET,
  token: SANITY_TOKEN,
  apiVersion: '2025-01-16',
  useCdn: false
});

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

interface WebhookDestination {
  name: string;
  url: string;
  method: string;
  headers?: { key: string; value: string }[];
  enabled: boolean;
  secretKey?: string;
}

interface WebhookResult {
  destination: string;
  success: boolean;
  statusCode?: number;
  error?: string;
  timestamp: string;
}

interface FormSubmissionData {
  formId: string;
  data: Record<string, string>;
  context?: {
    plan?: string;
    source?: string;
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    language?: string;
    region?: string;
  };
}

/**
 * Fire webhooks to configured destinations
 */
async function fireWebhooks(
  webhooks: WebhookDestination[],
  payload: any
): Promise<WebhookResult[]> {
  const results: WebhookResult[] = [];
  const enabledWebhooks = webhooks.filter(w => w.enabled);

  for (const webhook of enabledWebhooks) {
    const timestamp = new Date().toISOString();

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };

      // Add custom headers
      webhook.headers?.forEach(h => {
        if (h.key && h.value) {
          headers[h.key] = h.value;
        }
      });

      // Add HMAC signature if secret provided
      if (webhook.secretKey) {
        const signature = crypto
          .createHmac('sha256', webhook.secretKey)
          .update(JSON.stringify(payload))
          .digest('hex');
        headers['X-Webhook-Signature'] = `sha256=${signature}`;
      }

      // Add timestamp header
      headers['X-Webhook-Timestamp'] = timestamp;

      const response = await fetch(webhook.url, {
        method: webhook.method || 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      results.push({
        destination: webhook.name || webhook.url,
        success: response.ok,
        statusCode: response.status,
        timestamp
      });

      console.log(`[Lead Capture] Webhook ${webhook.name}: ${response.ok ? '✅' : '❌'} (${response.status})`);
    } catch (error: any) {
      console.error(`[Lead Capture] Webhook ${webhook.name} failed:`, error.message);
      results.push({
        destination: webhook.name || webhook.url,
        success: false,
        error: error.message,
        timestamp
      });
    }
  }

  return results;
}

/**
 * Main handler for lead capture
 */
export const handler: Handler = async (event: HandlerEvent) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Check server configuration
  if (!SANITY_TOKEN) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Server configuration error' })
    };
  }

  try {
    const body: FormSubmissionData = JSON.parse(event.body || '{}');
    const { formId, data, context } = body;

    // Validate required fields
    if (!formId) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing formId' })
      };
    }

    if (!data || Object.keys(data).length === 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing form data' })
      };
    }

    console.log(`[Lead Capture] Processing submission for form: ${formId}`);

    // Fetch form configuration from Sanity
    const form = await sanityClient.fetch(
      `*[_type == "leadForm" && formId == $formId][0]{
        formId,
        name,
        webhooks,
        successAction,
        redirectUrl,
        passContextToRedirect,
        successMessage,
        trackingEnabled
      }`,
      { formId }
    );

    if (!form) {
      console.error(`[Lead Capture] Form not found: ${formId}`);
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Form not found' })
      };
    }

    // Extract request metadata
    const userAgent = event.headers['user-agent'] || '';
    const forwardedFor = event.headers['x-forwarded-for'] || '';
    const ip = forwardedFor.split(',')[0]?.trim() || '';

    // Prepare submission data
    const submissionData: Record<string, any> = {
      email: data.email,
      name: data.name,
      company: data.company,
      phone: data.phone,
      message: data.message
    };

    // Store any additional fields as JSON
    const knownFields = ['email', 'name', 'company', 'phone', 'message'];
    const additionalFields: Record<string, string> = {};
    for (const [key, value] of Object.entries(data)) {
      if (!knownFields.includes(key)) {
        additionalFields[key] = value;
      }
    }
    if (Object.keys(additionalFields).length > 0) {
      submissionData.additionalFields = JSON.stringify(additionalFields);
    }

    // Create submission in Sanity
    const submission = await sanityClient.create({
      _type: 'leadSubmission',
      formId,
      submittedAt: new Date().toISOString(),
      data: submissionData,
      context: {
        plan: context?.plan,
        source: context?.source,
        referrer: context?.referrer,
        utmSource: context?.utmSource,
        utmMedium: context?.utmMedium,
        utmCampaign: context?.utmCampaign,
        utmTerm: context?.utmTerm,
        utmContent: context?.utmContent,
        language: context?.language,
        region: context?.region,
        userAgent,
        ip
      },
      status: 'new'
    });

    console.log(`[Lead Capture] Submission created: ${submission._id}`);

    // Fire webhooks if configured
    let webhookResults: WebhookResult[] = [];
    if (form.webhooks && form.webhooks.length > 0) {
      const webhookPayload = {
        formId,
        submissionId: submission._id,
        submittedAt: submission.submittedAt,
        data,
        context: {
          ...context,
          userAgent,
          ip
        }
      };

      webhookResults = await fireWebhooks(form.webhooks, webhookPayload);

      // Update submission with webhook results
      await sanityClient
        .patch(submission._id)
        .set({ webhookResults })
        .commit();
    }

    // Build response
    const response: Record<string, any> = {
      success: true,
      submissionId: submission._id
    };

    // Handle redirect
    if (form.successAction === 'redirect' || form.successAction === 'app_redirect') {
      let redirectUrl = form.redirectUrl || '';

      // Replace placeholders in URL
      redirectUrl = redirectUrl.replace('{email}', encodeURIComponent(data.email || ''));
      redirectUrl = redirectUrl.replace('{name}', encodeURIComponent(data.name || ''));
      redirectUrl = redirectUrl.replace('{company}', encodeURIComponent(data.company || ''));
      redirectUrl = redirectUrl.replace('{plan}', encodeURIComponent(context?.plan || ''));

      // Add context params if enabled
      if (form.passContextToRedirect && redirectUrl) {
        try {
          const url = new URL(redirectUrl);
          if (context?.plan) url.searchParams.set('plan', context.plan);
          if (context?.source) url.searchParams.set('source', context.source);
          if (context?.utmSource) url.searchParams.set('utm_source', context.utmSource);
          if (context?.utmMedium) url.searchParams.set('utm_medium', context.utmMedium);
          if (context?.utmCampaign) url.searchParams.set('utm_campaign', context.utmCampaign);
          if (data.email) url.searchParams.set('email', data.email);
          redirectUrl = url.toString();
        } catch (e) {
          console.error('[Lead Capture] Invalid redirect URL:', redirectUrl);
        }
      }

      if (redirectUrl) {
        response.redirect = redirectUrl;
      }
    }

    // Add success message
    if (form.successAction === 'message' || !form.successAction) {
      response.message = form.successMessage || 'Thank you for signing up!';
    }

    console.log(`[Lead Capture] ✅ Submission processed successfully`);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(response)
    };

  } catch (error: any) {
    console.error('[Lead Capture] Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};

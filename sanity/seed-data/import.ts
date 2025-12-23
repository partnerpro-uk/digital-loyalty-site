/**
 * Sanity Seed Data Import Script
 * Imports default pricing plans and blog templates
 */

import { createClient } from '@sanity/client';
import pricingPlans from './pricing-plans.json';
import blogTemplates from './blog-templates.json';

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'zutnuftx',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2025-01-16',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function importData() {
  console.log('🚀 Starting Sanity seed data import...\n');

  try {
    // Import Pricing Plans
    console.log('📊 Importing pricing plans...');
    for (const plan of pricingPlans) {
      const existingPlan = await client.fetch(
        `*[_type == "pricingPlan" && planId == $planId && language == $language][0]`,
        { planId: plan.planId, language: plan.language }
      );

      if (existingPlan) {
        console.log(`   ⚠️  Plan "${plan.name}" (${plan.language}) already exists, skipping...`);
      } else {
        await client.create(plan);
        console.log(`   ✅ Created: ${plan.name} (${plan.language})`);
      }
    }

    // Import Blog Templates
    console.log('\n🎨 Importing blog templates...');
    for (const template of blogTemplates) {
      const existingTemplate = await client.fetch(
        `*[_type == "blogTemplate" && templateId == $templateId][0]`,
        { templateId: template.templateId }
      );

      if (existingTemplate) {
        console.log(`   ⚠️  Template "${template.name}" already exists, skipping...`);
      } else {
        await client.create(template);
        console.log(`   ✅ Created: ${template.name}`);
      }
    }

    console.log('\n✨ Seed data import complete!\n');
    console.log('📝 Summary:');
    console.log(`   • ${pricingPlans.length} pricing plans`);
    console.log(`   • ${blogTemplates.length} blog templates`);
    console.log('\n🎯 Next steps:');
    console.log('   1. Visit Sanity Studio to see your data');
    console.log('   2. Translate pricing plans to other languages (auto-translate on publish)');
    console.log('   3. Create your first blog post using a template!\n');

  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
}

importData();



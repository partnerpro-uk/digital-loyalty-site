#!/usr/bin/env node

/**
 * Translation Script using DeepL API
 * 
 * This script:
 * - Reads English translation files (source of truth)
 * - Detects missing keys in target language files
 * - Translates missing keys using DeepL API
 * - Validates all keys exist across all languages
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as deepl from 'deepl-node';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LOCALES_DIR = join(__dirname, '../src/locales');
const SOURCE_LANG = 'en';
const TARGET_LANGS = ['es', 'fr', 'pt', 'de', 'ar', 'zh'];
const NAMESPACES = ['common', 'navigation', 'pages', 'seo'];

// DeepL language code mapping
const DEEPL_LANG_MAP = {
  'en': 'EN',
  'es': 'ES',
  'fr': 'FR',
  'pt': 'PT-PT',
  'de': 'DE',
  'ar': 'AR',
  'zh': 'ZH'
};

// Check if DeepL API key is set
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
if (!DEEPL_API_KEY) {
  console.error('❌ Error: DEEPL_API_KEY environment variable not set');
  console.error('Please set it in your .env file or export it:');
  console.error('export DEEPL_API_KEY="your-api-key-here"');
  process.exit(1);
}

const translator = new deepl.Translator(DEEPL_API_KEY);

/**
 * Flatten nested JSON object into dot notation
 */
function flattenObject(obj, prefix = '') {
  const flattened = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      flattened[newKey] = value;
    }
  }
  
  return flattened;
}

/**
 * Unflatten dot notation back to nested object
 */
function unflattenObject(flattened) {
  const result = {};
  
  for (const [key, value] of Object.entries(flattened)) {
    const keys = key.split('.');
    let current = result;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
  }
  
  return result;
}

/**
 * Find missing keys between source and target
 */
function findMissingKeys(sourceFlat, targetFlat) {
  const missing = {};
  
  for (const [key, value] of Object.entries(sourceFlat)) {
    if (!targetFlat[key] || targetFlat[key] === value || targetFlat[key] === '') {
      missing[key] = value;
    }
  }
  
  return missing;
}

/**
 * Translate text using DeepL
 */
async function translateText(text, targetLang) {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  try {
    const result = await translator.translateText(
      text,
      SOURCE_LANG,
      DEEPL_LANG_MAP[targetLang]
    );
    return result.text;
  } catch (error) {
    console.error(`   ⚠️  Translation error: ${error.message}`);
    return text; // Return original text on error
  }
}

/**
 * Translate missing keys
 */
async function translateMissingKeys(missingKeys, targetLang) {
  const translated = {};
  const keys = Object.keys(missingKeys);
  
  console.log(`   📝 Translating ${keys.length} keys to ${targetLang.toUpperCase()}...`);
  
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = missingKeys[key];
    
    if (Array.isArray(value)) {
      // Translate array items
      translated[key] = await Promise.all(
        value.map(item => translateText(item, targetLang))
      );
    } else if (typeof value === 'object' && value !== null) {
      // Skip nested objects (should be flattened)
      translated[key] = value;
    } else {
      translated[key] = await translateText(value, targetLang);
    }
    
    // Progress indicator
    if ((i + 1) % 10 === 0 || i === keys.length - 1) {
      process.stdout.write(`\r   ⏳ Progress: ${i + 1}/${keys.length}`);
    }
  }
  
  console.log(''); // New line after progress
  return translated;
}

/**
 * Validate translation completeness
 */
function validateTranslations() {
  console.log('\n🔍 Validating translation completeness...\n');
  
  const stats = {};
  let allComplete = true;
  
  for (const namespace of NAMESPACES) {
    const sourceFile = join(LOCALES_DIR, SOURCE_LANG, `${namespace}.json`);
    const sourceData = JSON.parse(readFileSync(sourceFile, 'utf-8'));
    const sourceFlat = flattenObject(sourceData);
    const totalKeys = Object.keys(sourceFlat).length;
    
    for (const lang of TARGET_LANGS) {
      const targetFile = join(LOCALES_DIR, lang, `${namespace}.json`);
      const targetData = JSON.parse(readFileSync(targetFile, 'utf-8'));
      const targetFlat = flattenObject(targetData);
      const missingKeys = findMissingKeys(sourceFlat, targetFlat);
      const missingCount = Object.keys(missingKeys).length;
      const coverage = ((totalKeys - missingCount) / totalKeys * 100).toFixed(1);
      
      if (!stats[lang]) {
        stats[lang] = { total: 0, missing: 0 };
      }
      
      stats[lang].total += totalKeys;
      stats[lang].missing += missingCount;
      
      if (missingCount > 0) {
        allComplete = false;
        console.log(`⚠️  ${lang}/${namespace}.json: ${missingCount} missing (${coverage}% complete)`);
      }
    }
  }
  
  console.log('\n📊 Translation Coverage:\n');
  for (const lang of TARGET_LANGS) {
    const { total, missing } = stats[lang];
    const coverage = ((total - missing) / total * 100).toFixed(1);
    const emoji = coverage === '100.0' ? '✅' : coverage > '50.0' ? '🟡' : '❌';
    console.log(`${emoji} ${lang.toUpperCase()}: ${coverage}% (${total - missing}/${total} keys)`);
  }
  
  return allComplete;
}

/**
 * Show translation statistics
 */
function showStats() {
  console.log('\n📊 Translation Statistics\n');
  
  for (const lang of [SOURCE_LANG, ...TARGET_LANGS]) {
    console.log(`\n🌐 ${lang.toUpperCase()}:`);
    
    for (const namespace of NAMESPACES) {
      const file = join(LOCALES_DIR, lang, `${namespace}.json`);
      const data = JSON.parse(readFileSync(file, 'utf-8'));
      const flat = flattenObject(data);
      const keys = Object.keys(flat);
      
      console.log(`   ${namespace}.json: ${keys.length} keys`);
    }
  }
}

/**
 * Main translation function
 */
async function translate() {
  console.log('🌍 Starting translation process...\n');
  
  for (const targetLang of TARGET_LANGS) {
    console.log(`\n🔄 Processing ${targetLang.toUpperCase()}...`);
    
    for (const namespace of NAMESPACES) {
      const sourceFile = join(LOCALES_DIR, SOURCE_LANG, `${namespace}.json`);
      const targetFile = join(LOCALES_DIR, targetLang, `${namespace}.json`);
      
      // Read source and target files
      const sourceData = JSON.parse(readFileSync(sourceFile, 'utf-8'));
      const targetData = JSON.parse(readFileSync(targetFile, 'utf-8'));
      
      // Flatten for easier key comparison
      const sourceFlat = flattenObject(sourceData);
      const targetFlat = flattenObject(targetData);
      
      // Find missing keys
      const missingKeys = findMissingKeys(sourceFlat, targetFlat);
      const missingCount = Object.keys(missingKeys).length;
      
      if (missingCount === 0) {
        console.log(`   ✅ ${namespace}.json: Up to date`);
        continue;
      }
      
      console.log(`   🔄 ${namespace}.json: ${missingCount} keys to translate`);
      
      // Translate missing keys
      const translations = await translateMissingKeys(missingKeys, targetLang);
      
      // Merge translations into target
      const mergedFlat = { ...targetFlat, ...translations };
      const mergedData = unflattenObject(mergedFlat);
      
      // Write updated target file
      writeFileSync(targetFile, JSON.stringify(mergedData, null, 2) + '\n', 'utf-8');
      console.log(`   ✅ Updated ${namespace}.json`);
    }
  }
  
  console.log('\n✨ Translation complete!\n');
}

/**
 * CLI handler
 */
async function main() {
  const command = process.argv[2];
  
  try {
    switch (command) {
      case 'validate':
        const isComplete = validateTranslations();
        process.exit(isComplete ? 0 : 1);
        break;
        
      case 'stats':
        showStats();
        break;
        
      case undefined:
      case 'translate':
        await translate();
        validateTranslations();
        break;
        
      default:
        console.log('Usage:');
        console.log('  npm run translate          - Translate missing keys');
        console.log('  npm run translate:validate - Validate translations');
        console.log('  npm run translate:stats    - Show statistics');
        process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();


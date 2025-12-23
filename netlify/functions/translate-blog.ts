import type { Handler, HandlerEvent } from '@netlify/functions';
import * as deepl from 'deepl-node';
import { createClient } from '@sanity/client';

// Environment variables
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const SANITY_PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_STUDIO_DATASET || 'production';
const SANITY_TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!DEEPL_API_KEY) {
  console.error('DEEPL_API_KEY is not set');
}

if (!SANITY_TOKEN) {
  console.error('SANITY_WRITE_TOKEN is not set');
}

// Initialize clients
const translator = DEEPL_API_KEY ? new deepl.Translator(DEEPL_API_KEY) : null;

const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID!,
  dataset: SANITY_DATASET,
  token: SANITY_TOKEN,
  apiVersion: '2025-01-16',
  useCdn: false
});

// DeepL language mapping
const DEEPL_LANG_MAP: Record<string, deepl.TargetLanguageCode> = {
  es: 'es',
  fr: 'fr',
  pt: 'pt-PT',
  de: 'de',
  ar: 'ar',
  zh: 'zh'
};

interface PortableTextBlock {
  _type: string;
  _key: string;
  children?: Array<{
    _type: string;
    _key: string;
    text: string;
    marks?: string[];
  }>;
  style?: string;
  listItem?: string;
  markDefs?: any[];
}

/**
 * Translate PortableText content blocks
 */
async function translatePortableText(
  blocks: PortableTextBlock[],
  targetLang: string
): Promise<PortableTextBlock[]> {
  if (!translator) return blocks;

  const translatedBlocks: PortableTextBlock[] = [];

  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      // Extract text from children
      const texts = block.children
        .filter(child => child._type === 'span' && child.text)
        .map(child => child.text);

      if (texts.length === 0) {
        translatedBlocks.push(block);
        continue;
      }

      const combinedText = texts.join(' ');
      
      try {
        const result = await translator.translateText(
          combinedText,
          'en',
          DEEPL_LANG_MAP[targetLang]
        );

        // Create translated block
        const translatedBlock: PortableTextBlock = {
          ...block,
          children: [{
            _type: 'span',
            _key: block.children[0]._key,
            text: result.text,
            marks: block.children[0].marks || []
          }]
        };

        translatedBlocks.push(translatedBlock);
      } catch (error) {
        console.error(`Translation error for block: ${error}`);
        translatedBlocks.push(block); // Keep original if translation fails
      }
    } else {
      // Keep images, code blocks, etc. as-is
      translatedBlocks.push(block);
    }
  }

  return translatedBlocks;
}

/**
 * Main webhook handler
 */
export const handler: Handler = async (event: HandlerEvent) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Verify webhook signature (optional but recommended)
  // const signature = event.headers['sanity-webhook-signature'];
  // if (!verifySignature(event.body, signature)) {
  //   return { statusCode: 401, body: 'Invalid signature' };
  // }

  if (!translator || !SANITY_TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error' })
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const postId = payload._id || payload.ids?.created?.[0] || payload.ids?.updated?.[0];

    if (!postId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No post ID provided' })
      };
    }

    console.log(`[Auto-Translate] Processing post: ${postId}`);

    // Fetch the post
    const post = await sanityClient.fetch(
      `*[_id == $id][0] {
        _id,
        title,
        slug,
        excerpt,
        content,
        featuredImage,
        category,
        tags,
        relatedPosts,
        seoTitle,
        seoDescription,
        keywords,
        ogImage,
        author,
        publishedAt,
        status,
        featured,
        translationStrategy,
        translationKey,
        language
      }`,
      { id: postId }
    );

    if (!post) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Post not found' })
      };
    }

    // Handle categories and tags (auto-translate multilingual fields)
    if (post._type === 'category' || post._type === 'tag') {
      console.log(`[Auto-Translate] Processing ${post._type}: ${post._id}`);
      
      // Check if name needs translation
      if (post.name?.en && (!post.name.es || !post.name.fr)) {
        console.log('[Auto-Translate] Translating name field...');
        
        const targetLanguages = ['es', 'fr', 'pt', 'de', 'ar', 'zh'];
        const nameTranslations: Record<string, string> = { en: post.name.en };
        
        for (const lang of targetLanguages) {
          if (!post.name[lang]) {
            const result = await translator.translateText(
              post.name.en,
              'en',
              DEEPL_LANG_MAP[lang]
            );
            nameTranslations[lang] = result.text;
          } else {
            nameTranslations[lang] = post.name[lang];
          }
        }
        
        // Translate description if exists
        let descriptionTranslations = post.description || {};
        if (post.description?.en && !post.description.es) {
          console.log('[Auto-Translate] Translating description field...');
          
          for (const lang of targetLanguages) {
            if (!post.description[lang]) {
              const result = await translator.translateText(
                post.description.en,
                'en',
                DEEPL_LANG_MAP[lang]
              );
              descriptionTranslations[lang] = result.text;
            }
          }
        }
        
        // Update the document
        await sanityClient
          .patch(postId)
          .set({
            name: nameTranslations,
            ...(Object.keys(descriptionTranslations).length > 1 && { description: descriptionTranslations })
          })
          .commit();
        
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: `${post._type} auto-translated successfully`,
            translations: nameTranslations
          })
        };
      }
      
      return {
        statusCode: 200,
        body: JSON.stringify({ message: `${post._type} already has translations` })
      };
    }

    // Only process blog posts if English and auto-translation is enabled
    if (post.language !== 'en' || post.translationStrategy !== 'auto') {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          message: 'No auto-translation needed',
          reason: post.language !== 'en' ? 'Not English' : 'Translation strategy is not auto'
        })
      };
    }

    // Generate translation key if not present
    const translationKey = post.translationKey || `post-${postId}`;

    // Update original post with translation key
    if (!post.translationKey) {
      await sanityClient
        .patch(postId)
        .set({ translationKey })
        .commit();
    }

    const targetLanguages = ['es', 'fr', 'pt', 'de', 'ar', 'zh'];
    const results = [];

    for (const lang of targetLanguages) {
      console.log(`[Auto-Translate] Translating to ${lang}...`);

      try {
        // Translate title
        const titleResult = await translator.translateText(
          post.title,
          'en',
          DEEPL_LANG_MAP[lang]
        );

        // Translate excerpt
        const excerptResult = post.excerpt 
          ? await translator.translateText(
              post.excerpt,
              'en',
              DEEPL_LANG_MAP[lang]
            )
          : null;

        // Translate content blocks
        const translatedContent = await translatePortableText(post.content, lang);

        // Translate SEO fields
        const seoTitleResult = post.seoTitle
          ? await translator.translateText(
              post.seoTitle,
              'en',
              DEEPL_LANG_MAP[lang]
            )
          : null;

        const seoDescriptionResult = post.seoDescription
          ? await translator.translateText(
              post.seoDescription,
              'en',
              DEEPL_LANG_MAP[lang]
            )
          : null;

        // Create translated document
        const translatedDoc = {
          _type: 'blogPost',
          _id: `${postId}-${lang}`,
          title: titleResult.text,
          slug: {
            _type: 'slug',
            current: `${post.slug.current}-${lang}`
          },
          excerpt: excerptResult?.text || post.excerpt,
          content: translatedContent,
          featuredImage: post.featuredImage,
          language: lang,
          translationStrategy: 'manual', // Translated versions use manual
          translationKey,
          originalPost: {
            _type: 'reference',
            _ref: postId
          },
          category: post.category,
          tags: post.tags || [],
          relatedPosts: post.relatedPosts || [],
          seoTitle: seoTitleResult?.text || titleResult.text,
          seoDescription: seoDescriptionResult?.text || excerptResult?.text,
          keywords: post.keywords || [],
          ogImage: post.ogImage,
          author: post.author,
          publishedAt: post.publishedAt,
          updatedAt: new Date().toISOString(),
          status: post.status,
          featured: post.featured || false
        };

        // Create or update the translated document
        await sanityClient.createOrReplace(translatedDoc);

        results.push({
          language: lang,
          success: true,
          documentId: translatedDoc._id
        });

        console.log(`[Auto-Translate] ✅ ${lang} complete`);
      } catch (error: any) {
        console.error(`[Auto-Translate] ❌ ${lang} failed:`, error.message);
        results.push({
          language: lang,
          success: false,
          error: error.message
        });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Auto-translation complete',
        originalPost: postId,
        translationKey,
        results
      })
    };
  } catch (error: any) {
    console.error('[Auto-Translate] Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Translation failed',
        message: error.message
      })
    };
  }
};


import { DocumentActionComponent } from 'sanity';
import { useState } from 'react';

// DeepL language mapping
const DEEPL_LANG_MAP: Record<string, string> = {
  es: 'ES',
  fr: 'FR',
  pt: 'PT-PT',
  de: 'DE',
  ar: 'AR',
  zh: 'ZH'
};

export const autoTranslateAction: DocumentActionComponent = (props) => {
  const { draft, type, onComplete } = props;
  const [isTranslating, setIsTranslating] = useState(false);

  // Only show for categories and tags
  if (type !== 'category' && type !== 'tag') {
    return null;
  }

  // Only show if there's English content
  const englishName = draft?.name?.en;
  if (!englishName) {
    return null;
  }

  // Check if already translated
  const hasTranslations = draft?.name?.es || draft?.name?.fr || draft?.name?.pt;

  return {
    label: hasTranslations ? 'Re-translate All' : 'Auto-Translate',
    icon: () => '🌍',
    disabled: isTranslating,
    onHandle: async () => {
      setIsTranslating(true);
      try {
        // Call our translation API endpoint
        const response = await fetch('/api/translate-field', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: englishName,
            description: draft?.description?.en || ''
          })
        });

        if (!response.ok) {
          throw new Error('Translation failed');
        }

        const translations = await response.json();

        // Patch the document with translations
        const { patch } = await import('@sanity/client');
        const client = (await import('../../sanity/lib/client')).sanityClient;

        await client
          .patch(draft._id)
          .set({
            'name.es': translations.name.es,
            'name.fr': translations.name.fr,
            'name.pt': translations.name.pt,
            'name.de': translations.name.de,
            'name.ar': translations.name.ar,
            'name.zh': translations.name.zh,
            ...(translations.description && {
              'description.es': translations.description.es,
              'description.fr': translations.description.fr,
              'description.pt': translations.description.pt,
              'description.de': translations.description.de,
              'description.ar': translations.description.ar,
              'description.zh': translations.description.zh,
            })
          })
          .commit();

        // Show success message
        alert('✅ Auto-translation complete! All fields have been filled.');
        
        // Trigger a refresh
        if (onComplete) {
          onComplete();
        }
      } catch (error) {
        console.error('Translation error:', error);
        alert('❌ Translation failed. Please check your DeepL API key and try again.');
      } finally {
        setIsTranslating(false);
      }
    }
  };
};


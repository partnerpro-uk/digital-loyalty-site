import React, { useState } from 'react';
import { set, unset } from 'sanity';
import { Stack, Button, Card, Text, TextArea, Box } from '@sanity/ui';

// DeepL language mapping
const DEEPL_LANG_MAP: Record<string, string> = {
  es: 'ES',
  fr: 'FR',
  pt: 'PT-PT',
  de: 'DE',
  ar: 'AR',
  zh: 'ZH'
};

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  pt: 'Portuguese',
  de: 'German',
  ar: 'Arabic',
  zh: 'Chinese'
};

// Define props type
interface TranslationTextInputProps {
  value?: Record<string, string>;
  onChange: (patch: any) => void;
}

export function TranslationTextInput(props: TranslationTextInputProps) {
  const { value, onChange } = props;
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get English text
  const englishText = value?.en || '';

  // Handle translation
  const handleTranslate = async () => {
    if (!englishText) {
      setError('Please fill in the English field first');
      return;
    }

    setIsTranslating(true);
    setError(null);

    try {
      // Call DeepL API
      const DEEPL_API_KEY = process.env.SANITY_STUDIO_DEEPL_API_KEY || 'fb7b90e9-5e85-477e-a235-5c1c29169319:fx';
      
      const translations: Record<string, string> = { en: englishText };

      // Translate to each language
      for (const [lang, deeplLang] of Object.entries(DEEPL_LANG_MAP)) {
        try {
          const response = await fetch('https://api-free.deepl.com/v2/translate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              auth_key: DEEPL_API_KEY,
              text: englishText,
              source_lang: 'EN',
              target_lang: deeplLang,
            }),
          });

          if (!response.ok) {
            throw new Error(`DeepL API error: ${response.status}`);
          }

          const data = await response.json();
          translations[lang] = data.translations[0].text;
        } catch (err) {
          console.error(`Translation error for ${lang}:`, err);
          translations[lang] = englishText; // Fallback to English
        }
      }

      // Update all fields
      onChange(set(translations));
      
    } catch (err) {
      console.error('Translation error:', err);
      setError('Translation failed. Please check your API key.');
    } finally {
      setIsTranslating(false);
    }
  };

  // Handle individual field changes
  const handleFieldChange = (lang: string, newValue: string) => {
    onChange(
      newValue
        ? set(newValue, [lang])
        : unset([lang])
    );
  };

  return (
    <Stack space={4}>
      {/* Generate All Button */}
      <Card padding={3} radius={2} shadow={1} tone="primary">
        <Stack space={3}>
          <Box>
            <Text size={1} weight="semibold">
              ✨ Auto-Translation
            </Text>
            <Text size={1} muted style={{ marginTop: '4px' }}>
              Fill English, then click Generate to auto-translate all languages
            </Text>
          </Box>
          <Button
            text={isTranslating ? 'Translating...' : 'Generate All Translations 🌍'}
            tone="primary"
            onClick={handleTranslate}
            disabled={!englishText || isTranslating}
            style={{ width: '100%' }}
          />
          {error && (
            <Text size={1} style={{ color: 'red' }}>
              ❌ {error}
            </Text>
          )}
        </Stack>
      </Card>

      {/* Language Fields */}
      <Stack space={3}>
        {Object.entries(LANGUAGE_NAMES).map(([lang, name]) => (
          <Card key={lang} padding={3} radius={2} border>
            <Stack space={2}>
              <Text size={1} weight="semibold">
                {name}
                {lang === 'en' && <span style={{ color: 'red' }}> *</span>}
              </Text>
              <TextArea
                value={(value?.[lang] as string) || ''}
                onChange={(event) => handleFieldChange(lang, event.currentTarget.value)}
                placeholder={
                  lang === 'en'
                    ? 'Enter text in English...'
                    : 'Auto-translates when you click Generate...'
                }
                rows={3}
                readOnly={lang !== 'en' && isTranslating}
              />
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}


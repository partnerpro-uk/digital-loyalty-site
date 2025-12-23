/**
 * Auto-translate button component for Sanity Studio
 * Adds "Auto-translate" button to multilingual fields
 */

import React, { useState } from 'react';
import { Stack, Button, Text } from '@sanity/ui';
import { autoTranslateField } from '../lib/autoTranslate';

interface Props {
  value?: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
  languages?: string[];
}

export function AutoTranslateButton({ value, onChange, languages }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAutoTranslate = async () => {
    const englishText = value?.en;
    
    if (!englishText) {
      setError('Please enter English text first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const translations = await autoTranslateField(englishText, languages);
      onChange(translations);
    } catch (err) {
      setError('Translation failed. Check your DeepL API key.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack space={2}>
      <Button
        text="🌍 Auto-translate to all languages"
        tone="primary"
        onClick={handleAutoTranslate}
        loading={loading}
        disabled={!value?.en}
      />
      {error && (
        <Text size={1} style={{ color: 'red' }}>
          {error}
        </Text>
      )}
    </Stack>
  );
}


/**
 * Language Control Component
 * Compact grid layout for translation settings
 */

import React from 'react';
import { Stack, Card, Checkbox, Text, Box, Grid, Flex, Button } from '@sanity/ui';
import { set } from 'sanity';

interface LanguageControlProps {
  value?: {
    isLanguageSpecific?: boolean;
    publishToLanguages?: string[];
  };
  onChange: (patch: any) => void;
  language: string;
}

const AVAILABLE_LANGUAGES = [
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'pt', label: 'Portuguese', flag: '🇵🇹' },
  { code: 'de', label: 'German', flag: '🇩🇪' },
  { code: 'ar', label: 'Arabic', flag: '🇸🇦' },
  { code: 'zh', label: 'Chinese', flag: '🇨🇳' }
];

export const LanguageControl: React.FC<LanguageControlProps> = ({ value, onChange, language }) => {
  const isLanguageSpecific = value?.isLanguageSpecific || false;
  const publishToLanguages = value?.publishToLanguages || [];

  // Only show for English (source language)
  if (language !== 'en') {
    return null;
  }

  const handleLanguageSpecificChange = (checked: boolean) => {
    onChange(set({ ...value, isLanguageSpecific: checked }));
  };

  const handlePublishLanguageToggle = (langCode: string) => {
    const currentLanguages = publishToLanguages || [];
    const newLanguages = currentLanguages.includes(langCode)
      ? currentLanguages.filter(l => l !== langCode)
      : [...currentLanguages, langCode];
    
    onChange(set({ ...value, publishToLanguages: newLanguages }));
  };

  const handleSelectAll = () => {
    onChange(set({ ...value, publishToLanguages: AVAILABLE_LANGUAGES.map(l => l.code) }));
  };

  const handleDeselectAll = () => {
    onChange(set({ ...value, publishToLanguages: [] }));
  };

  return (
    <Card border padding={4} radius={2}>
      <Stack space={4}>
        {/* Header */}
        <Box>
          <Text size={2} weight="semibold" style={{ display: 'block', marginBottom: '4px' }}>
            Translation Settings
          </Text>
          <Text size={1} muted>
            Control auto-translation behavior
          </Text>
        </Box>

        {/* Language-Specific Toggle */}
        <Checkbox
          checked={isLanguageSpecific}
          onChange={(event) => handleLanguageSpecificChange(event.currentTarget.checked)}
        >
          <Text size={1} weight="medium">
            🔒 Language-Specific (Don't Translate)
          </Text>
        </Checkbox>

        {isLanguageSpecific && (
          <Card padding={3} radius={2} tone="caution">
            <Text size={1}>
              ⚠️ This content will NOT be auto-translated
            </Text>
          </Card>
        )}

        {/* Languages Grid */}
        {!isLanguageSpecific && (
          <Stack space={3}>
            <Flex align="center" justify="space-between">
              <Text size={1} weight="semibold">
                Translate To:
              </Text>
              <Flex gap={2}>
                <Button
                  mode="ghost"
                  text="All"
                  fontSize={1}
                  padding={2}
                  onClick={handleSelectAll}
                  tone="primary"
                />
                <Button
                  mode="ghost"
                  text="None"
                  fontSize={1}
                  padding={2}
                  onClick={handleDeselectAll}
                />
              </Flex>
            </Flex>

            <Card padding={3} radius={2} style={{ backgroundColor: 'var(--card-bg-color)' }}>
              <Grid columns={2} gap={2}>
                {AVAILABLE_LANGUAGES.map(lang => (
                  <Card
                    key={lang.code}
                    padding={2}
                    radius={2}
                    style={{
                      cursor: 'pointer',
                      border: '1px solid var(--card-border-color)',
                      backgroundColor: publishToLanguages.includes(lang.code) 
                        ? 'var(--card-focus-ring-color)' 
                        : 'var(--card-bg-color)'
                    }}
                    onClick={() => handlePublishLanguageToggle(lang.code)}
                  >
                    <Flex align="center" gap={2}>
                      <Checkbox
                        checked={publishToLanguages.includes(lang.code)}
                        readOnly
                        style={{ pointerEvents: 'none' }}
                      />
                      <Text size={1}>
                        <span style={{ marginRight: '6px' }}>{lang.flag}</span>
                        {lang.label}
                      </Text>
                    </Flex>
                  </Card>
                ))}
              </Grid>
            </Card>

            <Text size={1} muted style={{ fontStyle: 'italic' }}>
              💡 Selected languages ({publishToLanguages.length}/6) will be auto-translated on publish
            </Text>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default LanguageControl;


/**
 * Markdown Import Field Component
 * Auto-fills blog post fields from markdown frontmatter
 */

import React from 'react';
import { ImportMarkdownButton } from './ImportMarkdownButton';
import { Box, Text, Card, Stack, Flex, Badge } from '@sanity/ui';
import { useDocumentOperation, useFormValue } from 'sanity';
import { useToast } from '@sanity/ui';

export const MarkdownImportField = (props: any) => {
  const rawDocumentId = useFormValue(['_id']) as string;
  const documentType = useFormValue(['_type']) as string;
  
  // Remove "drafts." prefix for useDocumentOperation
  const documentId = rawDocumentId?.replace(/^drafts\./, '');
  
  const { patch } = useDocumentOperation(documentId, documentType);
  const toast = useToast();
  const [importStatus, setImportStatus] = React.useState<{
    filled: string[];
    skipped: string[];
    manual: string[];
  } | null>(null);

  const handleImport = (importedData: any) => {
    if (!documentId) {
      toast.push({
        status: 'error',
        title: 'Save Draft First',
        description: 'Please save the document (Ctrl+S) before importing.'
      });
      return;
    }

    const filled: string[] = [];
    const skipped: string[] = [];
    const manual = ['Category', 'Tags', 'Author', 'Thumbnail Image'];

    console.log('Document ID (raw):', rawDocumentId);
    console.log('Document ID (clean):', documentId);
    console.log('Document Type:', documentType);
    console.log('Import data received:', importedData);
    
    try {
      // Build a single patch object with all values
      const patchData: any = {};

      // Content fields
      if (importedData.title) {
        patchData.title = importedData.title;
        filled.push('Title');
      }
      if (importedData.slug) {
        patchData.slug = importedData.slug;
        filled.push('Slug');
      }
      if (importedData.excerpt) {
        patchData.excerpt = importedData.excerpt;
        filled.push('Excerpt');
      }
      if (importedData.language) {
        patchData.language = importedData.language;
        filled.push('Language');
      }
      if (importedData.content && importedData.content.length > 0) {
        patchData.content = importedData.content;
        filled.push(`Content (${importedData.content.length} blocks)`);
      }

      // SEO fields
      if (importedData.seoTitle) {
        patchData.seoTitle = importedData.seoTitle;
        filled.push('SEO Title');
      }
      if (importedData.seoDescription) {
        patchData.seoDescription = importedData.seoDescription;
        filled.push('SEO Description');
      }
      if (importedData.seoKeywords) {
        if (Array.isArray(importedData.seoKeywords) && importedData.seoKeywords.length > 0) {
          patchData.seoKeywords = importedData.seoKeywords;
          filled.push(`SEO Keywords (${importedData.seoKeywords.length})`);
        } else if (Array.isArray(importedData.seoKeywords)) {
          skipped.push('SEO Keywords (empty array)');
        } else {
          skipped.push('SEO Keywords (not an array - check format)');
        }
      }

      // Publishing fields
      if (importedData.status) {
        patchData.status = importedData.status;
        filled.push('Status');
      }
      if (importedData.featured !== undefined) {
        patchData.featured = importedData.featured;
        filled.push('Featured');
      }
      if (importedData.publishedAt) {
        patchData.publishedAt = importedData.publishedAt;
        filled.push('Published Date');
      }

      // Translation settings
      if (importedData.languageSettings) {
        patchData.languageSettings = importedData.languageSettings;
        filled.push('Translation Settings');
      }

      console.log('Patch data:', patchData);
      console.log('Patch function:', patch);

      if (Object.keys(patchData).length > 0 && patch) {
        // Use correct Sanity patch format
        patch.execute([{ set: patchData }]);
        
        setImportStatus({ filled, skipped, manual });
        
        const successMessage = `Filled ${filled.length} fields` +
          (skipped.length > 0 ? `, skipped ${skipped.length}` : '') +
          `. Scroll down to see changes!`;
        
        toast.push({
          status: 'success',
          title: '✅ Import Successful!',
          description: successMessage,
          duration: 5000
        });

        console.log('Patches applied successfully!');
        console.log('Skipped fields:', skipped);
      } else {
        toast.push({
          status: 'warning',
          title: 'No Data to Import',
          description: 'Make sure your markdown has frontmatter with the required fields.'
        });
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.push({
        status: 'error',
        title: '❌ Import Failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  return (
    <Box>
      <ImportMarkdownButton onImport={handleImport} />
      
      {importStatus && (
        <Card padding={3} radius={2} shadow={1} tone="positive" marginTop={3}>
          <Stack space={3}>
            <Text size={1} weight="semibold">✅ Import Complete!</Text>
            
            {importStatus.filled.length > 0 && (
              <Box>
                <Text size={1} weight="semibold" style={{ color: '#2e7d32' }}>
                  Auto-filled ({importStatus.filled.length}):
                </Text>
                <Box marginTop={2}>
                  <Flex wrap="wrap" gap={1}>
                    {importStatus.filled.map((field) => (
                      <Badge key={field} tone="positive" fontSize={1}>
                        {field}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              </Box>
            )}

            {importStatus.skipped.length > 0 && (
              <Box>
                <Text size={1} weight="semibold" style={{ color: '#9e9e9e' }}>
                  ⚠️ Skipped ({importStatus.skipped.length}):
                </Text>
                <Box marginTop={2}>
                  <Flex wrap="wrap" gap={1}>
                    {importStatus.skipped.map((field) => (
                      <Badge key={field} tone="default" fontSize={1}>
                        {field}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
                <Text size={1} muted marginTop={2}>
                  These fields were empty or invalid
                </Text>
              </Box>
            )}

            <Box>
              <Text size={1} weight="semibold" style={{ color: '#ed6c02' }}>
                ⚠️ Manual Input Required ({importStatus.manual.length}):
              </Text>
              <Box marginTop={2}>
                <Flex wrap="wrap" gap={1}>
                  {importStatus.manual.map((field) => (
                    <Badge key={field} tone="caution" fontSize={1}>
                      {field}
                    </Badge>
                  ))}
                </Flex>
              </Box>
              <Text size={1} muted marginTop={2}>
                Scroll down to fill these fields
              </Text>
            </Box>
          </Stack>
        </Card>
      )}
    </Box>
  );
};

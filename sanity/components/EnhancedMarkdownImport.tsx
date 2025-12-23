/**
 * Enhanced Markdown Import Component
 * Parses markdown with YAML frontmatter and auto-fills all blog post fields
 */

import React, { useState } from 'react';
import { Button, Card, Dialog, Flex, Stack, Text, TextArea, Box } from '@sanity/ui';
import { marked } from 'marked';
import { useFormValue, set, setIfMissing } from 'sanity';

interface EnhancedMarkdownImportProps {
  onChange: (patches: any[]) => void;
}

export const EnhancedMarkdownImport: React.FC<EnhancedMarkdownImportProps> = ({ onChange }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [parseResults, setParseResults] = useState<any>(null);

  const handleImport = async () => {
    if (!markdown.trim()) {
      setIsDialogOpen(false);
      return;
    }

    try {
      // Parse frontmatter
      const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      
      if (!frontmatterMatch) {
        alert('No frontmatter found. Please use the BLOG_POST_TEMPLATE.md format.');
        return;
      }

      const [, frontmatterYaml, content] = frontmatterMatch;
      
      // Simple YAML parser (for our specific format)
      const frontmatter = parseSimpleYaml(frontmatterYaml);
      
      // Convert markdown content to PortableText blocks
      const contentBlocks = convertMarkdownToBlocks(content);

      // Prepare all patches
      const patches: any[] = [];

      // Content fields
      if (frontmatter.title) {
        patches.push(set(frontmatter.title, ['title']));
      }
      
      if (frontmatter.slug) {
        patches.push(set({ _type: 'slug', current: frontmatter.slug }, ['slug']));
      }
      
      if (frontmatter.excerpt) {
        patches.push(set(frontmatter.excerpt, ['excerpt']));
      }
      
      if (contentBlocks.length > 0) {
        patches.push(set(contentBlocks, ['content']));
      }

      // Language
      if (frontmatter.language) {
        patches.push(set(frontmatter.language, ['language']));
      }

      // SEO
      if (frontmatter.seoTitle) {
        patches.push(set(frontmatter.seoTitle, ['seoTitle']));
      }
      
      if (frontmatter.seoDescription) {
        patches.push(set(frontmatter.seoDescription, ['seoDescription']));
      }
      
      if (frontmatter.seoKeywords && Array.isArray(frontmatter.seoKeywords)) {
        patches.push(set(frontmatter.seoKeywords, ['seoKeywords']));
      }

      // Publishing
      if (frontmatter.status) {
        patches.push(set(frontmatter.status, ['status']));
      }
      
      if (typeof frontmatter.featured === 'boolean') {
        patches.push(set(frontmatter.featured, ['featured']));
      }
      
      if (frontmatter.publishedAt) {
        patches.push(set(frontmatter.publishedAt, ['publishedAt']));
      }

      // Translation settings
      if (frontmatter.languageSpecific !== undefined || frontmatter.translateTo) {
        const languageSettings: any = {};
        
        if (typeof frontmatter.languageSpecific === 'boolean') {
          languageSettings.isLanguageSpecific = frontmatter.languageSpecific;
        }
        
        if (Array.isArray(frontmatter.translateTo) && frontmatter.translateTo.length > 0) {
          languageSettings.publishToLanguages = frontmatter.translateTo;
        }
        
        if (Object.keys(languageSettings).length > 0) {
          patches.push(setIfMissing({}, ['languageSettings']));
          Object.keys(languageSettings).forEach(key => {
            patches.push(set(languageSettings[key], ['languageSettings', key]));
          });
        }
      }

      // Apply all patches
      onChange(patches);

      // Show results
      setParseResults({
        title: frontmatter.title,
        fieldsImported: Object.keys(frontmatter).length,
        blocksCreated: contentBlocks.length,
        manualFields: {
          category: frontmatter.category,
          tags: frontmatter.tags,
          author: frontmatter.author,
          thumbnailImage: frontmatter.thumbnailImage,
          socialShareImage: frontmatter.socialShareImage
        }
      });

      setMarkdown('');
      
      // Keep dialog open to show results
      setTimeout(() => {
        setIsDialogOpen(false);
        setParseResults(null);
      }, 5000);

    } catch (error) {
      console.error('Error parsing markdown:', error);
      alert(`Error parsing markdown: ${error.message}`);
    }
  };

  return (
    <>
      <Flex justify="flex-end" padding={2}>
        <Button 
          text="📄 Import Markdown" 
          onClick={() => setIsDialogOpen(true)} 
          tone="primary"
        />
      </Flex>

      {isDialogOpen && (
        <Dialog
          header="Import Markdown with Frontmatter"
          id="markdown-import-dialog"
          onClose={() => {
            setIsDialogOpen(false);
            setParseResults(null);
          }}
          width={2}
        >
          <Card padding={4}>
            {!parseResults ? (
              <Stack space={3}>
                <Text size={1}>
                  📋 <strong>Paste your markdown with YAML frontmatter</strong>
                </Text>
                <Text size={1} muted>
                  Use the BLOG_POST_TEMPLATE.md format for automatic field population.
                </Text>
                <TextArea
                  value={markdown}
                  onChange={(event) => setMarkdown(event.currentTarget.value)}
                  rows={20}
                  placeholder={`---\ntitle: "Your Post Title"\nslug: "your-post-title"\nexcerpt: "Brief description"\nlanguage: "en"\ncategory: "Marketing"\n---\n\n# Your Post Title\n\nYour content here...`}
                  style={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
                <Flex justify="space-between">
                  <Button
                    text="Cancel"
                    mode="ghost"
                    onClick={() => setIsDialogOpen(false)}
                  />
                  <Button
                    text="Import & Fill Fields"
                    onClick={handleImport}
                    tone="primary"
                  />
                </Flex>
              </Stack>
            ) : (
              <Stack space={3}>
                <Box style={{ textAlign: 'center' }}>
                  <Text size={3} weight="bold">✅ Import Successful!</Text>
                </Box>
                
                <Card padding={3} radius={2} tone="positive">
                  <Stack space={2}>
                    <Text size={1}>
                      <strong>Title:</strong> {parseResults.title}
                    </Text>
                    <Text size={1}>
                      <strong>Fields Auto-Filled:</strong> {parseResults.fieldsImported}
                    </Text>
                    <Text size={1}>
                      <strong>Content Blocks Created:</strong> {parseResults.blocksCreated}
                    </Text>
                  </Stack>
                </Card>

                {parseResults.manualFields && (
                  <Card padding={3} radius={2} tone="caution">
                    <Stack space={2}>
                      <Text size={1} weight="semibold">
                        ⚠️ Manual Actions Required:
                      </Text>
                      {parseResults.manualFields.category && (
                        <Text size={1}>
                          • Select category: <strong>{parseResults.manualFields.category}</strong>
                        </Text>
                      )}
                      {parseResults.manualFields.tags && (
                        <Text size={1}>
                          • Add tags: <strong>{parseResults.manualFields.tags.join(', ')}</strong>
                        </Text>
                      )}
                      {parseResults.manualFields.author && (
                        <Text size={1}>
                          • Select author: <strong>{parseResults.manualFields.author}</strong>
                        </Text>
                      )}
                      {parseResults.manualFields.thumbnailImage && (
                        <Text size={1}>
                          • Upload thumbnail: <strong>{parseResults.manualFields.thumbnailImage}</strong>
                        </Text>
                      )}
                    </Stack>
                  </Card>
                )}

                <Text size={1} muted style={{ textAlign: 'center' }}>
                  Dialog will close automatically in 5 seconds...
                </Text>
              </Stack>
            )}
          </Card>
        </Dialog>
      )}
    </>
  );
};

// Simple YAML parser for our specific frontmatter format
function parseSimpleYaml(yaml: string): any {
  const result: any = {};
  let currentKey: string | null = null;
  let currentArray: string[] = [];

  yaml.split('\n').forEach(line => {
    line = line.trim();
    
    if (!line || line.startsWith('#')) return;

    // Array item
    if (line.startsWith('-')) {
      const value = line.substring(1).trim().replace(/^["']|["']$/g, '');
      if (currentKey) {
        if (!result[currentKey]) result[currentKey] = [];
        result[currentKey].push(value);
      }
      return;
    }

    // Key-value pair
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      
      currentKey = key;
      
      if (value) {
        // Remove quotes
        let cleanValue: any = value.replace(/^["']|["']$/g, '');
        
        // Convert boolean strings
        if (cleanValue === 'true') cleanValue = true;
        if (cleanValue === 'false') cleanValue = false;
        
        result[key] = cleanValue;
      } else {
        // Empty value, likely an array or object follows
        result[key] = [];
      }
    }
  });

  return result;
}

// Convert markdown to PortableText blocks
function convertMarkdownToBlocks(markdown: string): any[] {
  const lines = markdown.trim().split('\n');
  const blocks: any[] = [];

  let currentParagraph: string[] = [];
  
  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'normal',
          children: [{ _key: generateKey(), _type: 'span', text, marks: [] }],
          markDefs: []
        });
      }
      currentParagraph = [];
    }
  };

  lines.forEach(line => {
    const trimmed = line.trim();
    
    // H1
    if (trimmed.startsWith('# ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h1',
        children: [{ _key: generateKey(), _type: 'span', text: trimmed.substring(2), marks: [] }],
        markDefs: []
      });
    }
    // H2
    else if (trimmed.startsWith('## ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h2',
        children: [{ _key: generateKey(), _type: 'span', text: trimmed.substring(3), marks: [] }],
        markDefs: []
      });
    }
    // H3
    else if (trimmed.startsWith('### ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h3',
        children: [{ _key: generateKey(), _type: 'span', text: trimmed.substring(4), marks: [] }],
        markDefs: []
      });
    }
    // H4
    else if (trimmed.startsWith('#### ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h4',
        children: [{ _key: generateKey(), _type: 'span', text: trimmed.substring(5), marks: [] }],
        markDefs: []
      });
    }
    // Bullet list
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _key: generateKey(), _type: 'span', text: trimmed.substring(2), marks: [] }],
        markDefs: []
      });
    }
    // Numbered list
    else if (/^\d+\.\s/.test(trimmed)) {
      flushParagraph();
      const text = trimmed.replace(/^\d+\.\s/, '');
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: [{ _key: generateKey(), _type: 'span', text, marks: [] }],
        markDefs: []
      });
    }
    // Blockquote
    else if (trimmed.startsWith('> ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'blockquote',
        children: [{ _key: generateKey(), _type: 'span', text: trimmed.substring(2), marks: [] }],
        markDefs: []
      });
    }
    // Code block
    else if (trimmed.startsWith('```')) {
      flushParagraph();
      // Note: This is simplified - in reality you'd collect all lines until closing ```
      // For now, we'll just note that it's a code block
    }
    // Empty line
    else if (!trimmed) {
      flushParagraph();
    }
    // Regular paragraph text
    else {
      currentParagraph.push(trimmed);
    }
  });

  flushParagraph();

  return blocks;
}

function generateKey(): string {
  return Math.random().toString(36).substring(2, 11);
}



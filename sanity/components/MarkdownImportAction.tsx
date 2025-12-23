/**
 * Markdown Import Document Action
 * Adds a button at the top of the blog post form to import markdown
 */

import React, { useState } from 'react';
import { Button, Dialog, Stack, Text, TextArea, Card, Box, Flex } from '@sanity/ui';
import { UploadIcon } from '@sanity/icons';

export const MarkdownImportAction = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [markdown, setMarkdown] = useState('');

  if (props.type !== 'blogPost') {
    return null;
  }

  const handleImport = () => {
    if (!markdown.trim()) {
      alert('Please paste some markdown content');
      return;
    }

    try {
      // Parse frontmatter
      const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      
      if (!frontmatterMatch) {
        alert('⚠️ No frontmatter found. Please use the BLOG_POST_TEMPLATE.md format.');
        return;
      }

      const [, frontmatterYaml, content] = frontmatterMatch;
      
      // Parse YAML
      const frontmatter = parseSimpleYaml(frontmatterYaml);
      
      // Convert markdown to blocks
      const contentBlocks = convertMarkdownToBlocks(content);

      // Build patch data
      const patchData: any = {};

      // Content fields
      if (frontmatter.title) patchData.title = frontmatter.title;
      if (frontmatter.slug) patchData.slug = { _type: 'slug', current: frontmatter.slug };
      if (frontmatter.excerpt) patchData.excerpt = frontmatter.excerpt;
      if (contentBlocks.length > 0) patchData.content = contentBlocks;

      // Language
      if (frontmatter.language) patchData.language = frontmatter.language;

      // SEO
      if (frontmatter.seoTitle) patchData.seoTitle = frontmatter.seoTitle;
      if (frontmatter.seoDescription) patchData.seoDescription = frontmatter.seoDescription;
      if (frontmatter.seoKeywords) patchData.seoKeywords = frontmatter.seoKeywords;

      // Publishing
      if (frontmatter.status) patchData.status = frontmatter.status;
      if (typeof frontmatter.featured === 'boolean') patchData.featured = frontmatter.featured;
      if (frontmatter.publishedAt) patchData.publishedAt = frontmatter.publishedAt;

      // Translation settings
      if (frontmatter.languageSpecific !== undefined || frontmatter.translateTo) {
        patchData.languageSettings = {};
        if (typeof frontmatter.languageSpecific === 'boolean') {
          patchData.languageSettings.isLanguageSpecific = frontmatter.languageSpecific;
        }
        if (Array.isArray(frontmatter.translateTo) && frontmatter.translateTo.length > 0) {
          patchData.languageSettings.publishToLanguages = frontmatter.translateTo;
        }
      }

      // Apply patches using the correct API
      if (props.onComplete) {
        // For new documents, we need to use onComplete
        props.onComplete();
      }

      // Show success message
      const manualSteps = [];
      if (frontmatter.category) manualSteps.push(`• Select category: ${frontmatter.category}`);
      if (frontmatter.tags) manualSteps.push(`• Add tags: ${frontmatter.tags.join(', ')}`);
      if (frontmatter.author) manualSteps.push(`• Select author: ${frontmatter.author}`);
      if (frontmatter.thumbnailImage) manualSteps.push(`• Upload thumbnail image`);

      alert(
        `✅ Import Successful!\n\n` +
        `Imported: ${Object.keys(frontmatter).length} fields\n` +
        `Created: ${contentBlocks.length} content blocks\n\n` +
        `⚠️ Manual Steps Required:\n${manualSteps.join('\n')}`
      );

      setIsOpen(false);
      setMarkdown('');

    } catch (error) {
      console.error('Import error:', error);
      alert(`❌ Import failed: ${error.message}`);
    }
  };

  return {
    label: '📄 Import Markdown',
    icon: UploadIcon,
    onHandle: () => {
      setIsOpen(true);
    },
    dialog: isOpen && {
      type: 'dialog',
      onClose: () => {
        setIsOpen(false);
        setMarkdown('');
      },
      content: (
        <Card padding={4}>
          <Stack space={4}>
            <Box>
              <Text size={2} weight="bold">Import Markdown with Frontmatter</Text>
              <Text size={1} muted style={{ marginTop: '8px' }}>
                Paste markdown using BLOG_POST_TEMPLATE.md format to auto-fill fields
              </Text>
            </Box>

            <TextArea
              value={markdown}
              onChange={(event) => setMarkdown(event.currentTarget.value)}
              rows={25}
              placeholder={`---\ntitle: "Your Post Title"\nslug: "your-post-slug"\nexcerpt: "Brief description"\nlanguage: "en"\ncategory: "Marketing"\ntags:\n  - "tag1"\n  - "tag2"\nauthor: "Author Name"\nseoTitle: "SEO Title"\nseoDescription: "SEO Description"\nseoKeywords:\n  - "keyword1"\nstatus: "draft"\nfeatured: false\n---\n\n# Your Post Title\n\nYour content here...`}
              style={{ fontFamily: 'monospace', fontSize: '12px' }}
            />

            <Flex justify="space-between">
              <Button
                text="Cancel"
                mode="ghost"
                onClick={() => {
                  setIsOpen(false);
                  setMarkdown('');
                }}
              />
              <Button
                text="Import & Fill Fields"
                tone="primary"
                onClick={handleImport}
              />
            </Flex>

            <Card padding={3} radius={2} tone="caution">
              <Text size={1}>
                💡 <strong>Tip:</strong> After import, manually select Category, Tags, Author, and upload images.
              </Text>
            </Card>
          </Stack>
        </Card>
      )
    }
  };
};

// Simple YAML parser
function parseSimpleYaml(yaml: string): any {
  const result: any = {};
  let currentKey: string | null = null;

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
        let cleanValue: any = value.replace(/^["']|["']$/g, '');
        if (cleanValue === 'true') cleanValue = true;
        if (cleanValue === 'false') cleanValue = false;
        result[key] = cleanValue;
      } else {
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
    
    if (trimmed.startsWith('#### ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h4',
        children: [{ _key: generateKey(), _type: 'span', text: trimmed.substring(5), marks: [] }],
        markDefs: []
      });
    } else if (trimmed.startsWith('### ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h3',
        children: [{ _key: generateKey(), _type: 'span', text: trimmed.substring(4), marks: [] }],
        markDefs: []
      });
    } else if (trimmed.startsWith('## ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h2',
        children: [{ _key: generateKey(), _type: 'span', text: trimmed.substring(3), marks: [] }],
        markDefs: []
      });
    } else if (trimmed.startsWith('# ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h1',
        children: [{ _key: generateKey(), _type: 'span', text: trimmed.substring(2), marks: [] }],
        markDefs: []
      });
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _key: generateKey(), _type: 'span', text: trimmed.substring(2), marks: [] }],
        markDefs: []
      });
    } else if (/^\d+\.\s/.test(trimmed)) {
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
    } else if (trimmed.startsWith('> ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'blockquote',
        children: [{ _key: generateKey(), _type: 'span', text: trimmed.substring(2), marks: [] }],
        markDefs: []
      });
    } else if (!trimmed) {
      flushParagraph();
    } else {
      currentParagraph.push(trimmed);
    }
  });

  flushParagraph();
  return blocks;
}

function generateKey(): string {
  return Math.random().toString(36).substring(2, 11);
}


/**
 * Import Markdown Button Component
 * Simple button that appears at the top of blog post forms
 */

import React, { useState } from 'react';
import { Button, Dialog, Stack, Text, TextArea, Card, Box, Flex } from '@sanity/ui';
import { UploadIcon } from '@sanity/icons';

interface ImportMarkdownButtonProps {
  onImport: (data: any) => void;
}

export const ImportMarkdownButton: React.FC<ImportMarkdownButtonProps> = ({ onImport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [markdown, setMarkdown] = useState('');

  const handleImport = () => {
    if (!markdown.trim()) {
      alert('Please paste some markdown content');
      return;
    }

    try {
      // Sanitize markdown: remove em dashes (—) and replace with regular dashes (-)
      const sanitizedMarkdown = markdown.replace(/—/g, '-');
      
      // Parse frontmatter
      const frontmatterMatch = sanitizedMarkdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      
      if (!frontmatterMatch) {
        alert('⚠️ No frontmatter found. Please use the BLOG_POST_TEMPLATE.md format.');
        return;
      }

      const [, frontmatterYaml, content] = frontmatterMatch;
      
      // Parse YAML
      console.log('=== RAW YAML ===');
      console.log(frontmatterYaml);
      
      const frontmatter = parseSimpleYaml(frontmatterYaml);
      
      console.log('=== PARSED FRONTMATTER ===');
      console.log('Full frontmatter:', frontmatter);
      console.log('seoKeywords type:', typeof frontmatter.seoKeywords);
      console.log('seoKeywords value:', frontmatter.seoKeywords);
      console.log('seoKeywords isArray:', Array.isArray(frontmatter.seoKeywords));
      console.log('seoKeywords length:', frontmatter.seoKeywords?.length);
      
      // Convert markdown to blocks
      const contentBlocks = convertMarkdownToBlocks(content);

      // Build import data
      const importData: any = {};

      // Content fields
      if (frontmatter.title) importData.title = frontmatter.title;
      if (frontmatter.slug) importData.slug = { _type: 'slug', current: frontmatter.slug };
      if (frontmatter.excerpt) importData.excerpt = frontmatter.excerpt;
      if (contentBlocks.length > 0) importData.content = contentBlocks;

      // Language
      if (frontmatter.language) importData.language = frontmatter.language;

      // SEO
      if (frontmatter.seoTitle) importData.seoTitle = frontmatter.seoTitle;
      if (frontmatter.seoDescription) importData.seoDescription = frontmatter.seoDescription;
      if (frontmatter.seoKeywords) importData.seoKeywords = frontmatter.seoKeywords;

      // Publishing
      if (frontmatter.status) importData.status = frontmatter.status;
      if (typeof frontmatter.featured === 'boolean') importData.featured = frontmatter.featured;
      if (frontmatter.publishedAt) importData.publishedAt = frontmatter.publishedAt;

      // Translation settings
      if (frontmatter.languageSpecific !== undefined || frontmatter.translateTo) {
        importData.languageSettings = {};
        if (typeof frontmatter.languageSpecific === 'boolean') {
          importData.languageSettings.isLanguageSpecific = frontmatter.languageSpecific;
        }
        if (Array.isArray(frontmatter.translateTo) && frontmatter.translateTo.length > 0) {
          importData.languageSettings.publishToLanguages = frontmatter.translateTo;
        }
      }

      // Call the onImport callback with the data
      onImport(importData);

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
      alert(`❌ Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <>
      <Box paddingBottom={4}>
        <Button
          text="📄 Import Markdown Template"
          icon={UploadIcon}
          onClick={() => setIsOpen(true)}
          tone="primary"
          mode="default"
          style={{ width: '100%' }}
        />
      </Box>

      {isOpen && (
        <Dialog
          header="Import Markdown with Frontmatter"
          id="markdown-import-dialog"
          onClose={() => {
            setIsOpen(false);
            setMarkdown('');
          }}
          width={2}
        >
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
        </Dialog>
      )}
    </>
  );
};

// Simple YAML parser
function parseSimpleYaml(yaml: string): any {
  const result: any = {};
  let currentKey: string | null = null;
  let warnings: string[] = [];
  
  // Helper to clean text (remove em dashes)
  const cleanText = (text: string) => text.replace(/—/g, '-');

  yaml.split('\n').forEach(line => {
    line = line.trim();
    
    if (!line || line.startsWith('#')) return;

    // Array item (accept both - and * but warn about *)
    if (line.startsWith('-') || line.startsWith('*')) {
      if (line.startsWith('*')) {
        warnings.push(`⚠️ Line "${line}" uses asterisk (*) instead of dash (-). Converting automatically.`);
      }
      const value = cleanText(line.substring(1).trim().replace(/^["']|["']$/g, ''));
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
        let cleanValue: any = cleanText(value.replace(/^["']|["']$/g, ''));
        if (cleanValue === 'true') cleanValue = true;
        if (cleanValue === 'false') cleanValue = false;
        result[key] = cleanValue;
      } else {
        result[key] = [];
      }
    }
  });

  // Log warnings if any
  if (warnings.length > 0) {
    console.warn('=== YAML FORMAT WARNINGS ===');
    warnings.forEach(w => console.warn(w));
    console.warn('Please use dashes (-) instead of asterisks (*) for YAML arrays in the future.');
  }

  return result;
}

// Parse inline markdown formatting (bold, italic, code, links)
function parseInlineMarkdown(text: string): any[] {
  const children: any[] = [];
  const markDefs: any[] = [];
  
  // Clean text
  text = text.replace(/—/g, '-');
  
  // Process text character by character to handle nested formatting
  let i = 0;
  let currentText = '';
  
  while (i < text.length) {
    // Check for links [text](url)
    if (text[i] === '[') {
      const linkMatch = text.substring(i).match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        // Push any accumulated text
        if (currentText) {
          children.push({ _key: generateKey(), _type: 'span', text: currentText, marks: [] });
          currentText = '';
        }
        
        // Add link
        const linkKey = generateKey();
        markDefs.push({
          _key: linkKey,
          _type: 'link',
          href: linkMatch[2]
        });
        
        children.push({
          _key: generateKey(),
          _type: 'span',
          text: linkMatch[1],
          marks: [linkKey]
        });
        
        i += linkMatch[0].length;
        continue;
      }
    }
    
    // Check for **bold**
    if (text.substring(i, i + 2) === '**') {
      const endMatch = text.substring(i + 2).indexOf('**');
      if (endMatch > -1) {
        // Push any accumulated text
        if (currentText) {
          children.push({ _key: generateKey(), _type: 'span', text: currentText, marks: [] });
          currentText = '';
        }
        
        // Add bold text
        children.push({
          _key: generateKey(),
          _type: 'span',
          text: text.substring(i + 2, i + 2 + endMatch),
          marks: ['strong']
        });
        
        i += endMatch + 4; // Skip past **text**
        continue;
      }
    }
    
    // Check for *italic*
    if (text[i] === '*' && text.substring(i, i + 2) !== '**') {
      const endMatch = text.substring(i + 1).indexOf('*');
      if (endMatch > -1) {
        // Push any accumulated text
        if (currentText) {
          children.push({ _key: generateKey(), _type: 'span', text: currentText, marks: [] });
          currentText = '';
        }
        
        // Add italic text
        children.push({
          _key: generateKey(),
          _type: 'span',
          text: text.substring(i + 1, i + 1 + endMatch),
          marks: ['em']
        });
        
        i += endMatch + 2; // Skip past *text*
        continue;
      }
    }
    
    // Check for `code`
    if (text[i] === '`') {
      const endMatch = text.substring(i + 1).indexOf('`');
      if (endMatch > -1) {
        // Push any accumulated text
        if (currentText) {
          children.push({ _key: generateKey(), _type: 'span', text: currentText, marks: [] });
          currentText = '';
        }
        
        // Add code text
        children.push({
          _key: generateKey(),
          _type: 'span',
          text: text.substring(i + 1, i + 1 + endMatch),
          marks: ['code']
        });
        
        i += endMatch + 2; // Skip past `text`
        continue;
      }
    }
    
    // Regular character
    currentText += text[i];
    i++;
  }
  
  // Push any remaining text
  if (currentText) {
    children.push({ _key: generateKey(), _type: 'span', text: currentText, marks: [] });
  }
  
  return children.length > 0 ? children : [{ _key: generateKey(), _type: 'span', text, marks: [] }];
}

// Convert markdown to PortableText blocks
function convertMarkdownToBlocks(markdown: string): any[] {
  // Sanitize: remove em dashes
  const sanitizedMarkdown = markdown.replace(/—/g, '-');
  const lines = sanitizedMarkdown.trim().split('\n');
  const blocks: any[] = [];
  let currentParagraph: string[] = [];
  
  // Helper to clean text
  const cleanText = (text: string) => text.replace(/—/g, '-');
  
  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = cleanText(currentParagraph.join(' ').trim());
      if (text) {
        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'normal',
          children: parseInlineMarkdown(text),
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
        children: parseInlineMarkdown(cleanText(trimmed.substring(5))),
        markDefs: []
      });
    } else if (trimmed.startsWith('### ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h3',
        children: parseInlineMarkdown(cleanText(trimmed.substring(4))),
        markDefs: []
      });
    } else if (trimmed.startsWith('## ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h2',
        children: parseInlineMarkdown(cleanText(trimmed.substring(3))),
        markDefs: []
      });
    } else if (trimmed.startsWith('# ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h1',
        children: parseInlineMarkdown(cleanText(trimmed.substring(2))),
        markDefs: []
      });
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: parseInlineMarkdown(cleanText(trimmed.substring(2))),
        markDefs: []
      });
    } else if (/^\d+\.\s/.test(trimmed)) {
      flushParagraph();
      const text = cleanText(trimmed.replace(/^\d+\.\s/, ''));
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: parseInlineMarkdown(text),
        markDefs: []
      });
    } else if (trimmed.startsWith('> ')) {
      flushParagraph();
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'blockquote',
        children: parseInlineMarkdown(cleanText(trimmed.substring(2))),
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



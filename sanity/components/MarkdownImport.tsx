/**
 * Markdown Import Component
 * Allows importing markdown content and converting it to PortableText
 */

import React, { useState } from 'react';
import { Stack, Button, Card, Text, TextArea, Dialog } from '@sanity/ui';
import { marked } from 'marked';

interface MarkdownImportProps {
  onImport: (blocks: any[]) => void;
}

// Simple markdown to PortableText converter
function markdownToPortableText(markdown: string): any[] {
  const tokens = marked.lexer(markdown);
  const blocks: any[] = [];

  tokens.forEach((token: any) => {
    switch (token.type) {
      case 'heading':
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: `h${token.depth}`,
          children: [
            {
              _type: 'span',
              _key: generateKey(),
              text: token.text,
              marks: []
            }
          ]
        });
        break;

      case 'paragraph':
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children: parseInlineContent(token.text)
        });
        break;

      case 'list':
        token.items.forEach((item: any) => {
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            listItem: token.ordered ? 'number' : 'bullet',
            children: parseInlineContent(item.text)
          });
        });
        break;

      case 'blockquote':
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'blockquote',
          children: parseInlineContent(token.text)
        });
        break;

      case 'code':
        blocks.push({
          _type: 'code',
          _key: generateKey(),
          language: token.lang || 'text',
          code: token.text
        });
        break;

      case 'space':
        // Skip empty spaces
        break;

      default:
        // For unsupported types, add as normal text
        if (token.text) {
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [{
              _type: 'span',
              _key: generateKey(),
              text: token.text,
              marks: []
            }]
          });
        }
    }
  });

  return blocks;
}

// Parse inline content (bold, italic, links, etc.)
function parseInlineContent(text: string): any[] {
  const children: any[] = [];
  
  // Simple regex-based parsing for common markdown inline elements
  // This is a simplified version - for production, you might want a more robust parser
  
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g);
  
  parts.forEach(part => {
    if (!part) return;
    
    // Bold
    if (part.startsWith('**') && part.endsWith('**')) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: part.slice(2, -2),
        marks: ['strong']
      });
    }
    // Italic
    else if (part.startsWith('*') && part.endsWith('*')) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: part.slice(1, -1),
        marks: ['em']
      });
    }
    // Code
    else if (part.startsWith('`') && part.endsWith('`')) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: part.slice(1, -1),
        marks: ['code']
      });
    }
    // Link
    else if (part.match(/\[(.*?)\]\((.*?)\)/)) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: match[1],
          marks: [{
            _type: 'link',
            _key: generateKey(),
            href: match[2]
          }]
        });
      }
    }
    // Plain text
    else {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: part,
        marks: []
      });
    }
  });
  
  return children.length > 0 ? children : [{
    _type: 'span',
    _key: generateKey(),
    text: text,
    marks: []
  }];
}

// Generate unique keys for blocks
function generateKey(): string {
  return Math.random().toString(36).substring(2, 11);
}

export const MarkdownImport: React.FC<MarkdownImportProps> = ({ onImport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleImport = () => {
    try {
      if (!markdown.trim()) {
        setError('Please enter some markdown content');
        return;
      }

      const blocks = markdownToPortableText(markdown);
      
      if (blocks.length === 0) {
        setError('No content could be parsed from the markdown');
        return;
      }

      onImport(blocks);
      setMarkdown('');
      setError(null);
      setIsOpen(false);
    } catch (err) {
      setError(`Error parsing markdown: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <>
      <Button
        text="Import Markdown"
        tone="primary"
        mode="ghost"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <Dialog
          header="Import Markdown Content"
          id="markdown-import"
          onClose={() => {
            setIsOpen(false);
            setMarkdown('');
            setError(null);
          }}
          zOffset={1000}
          width={2}
        >
          <Card padding={4}>
            <Stack space={4}>
              <Text size={1}>
                Paste your markdown content below. It will be converted to PortableText blocks.
              </Text>

              <TextArea
                placeholder="# Your markdown here&#10;&#10;This is a **bold** paragraph with *italic* text."
                rows={15}
                value={markdown}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setMarkdown(event.target.value)}
              />

              {error && (
                <Card padding={3} radius={2} shadow={1} tone="critical">
                  <Text size={1}>{error}</Text>
                </Card>
              )}

              <Stack space={2}>
                <Button
                  text="Import"
                  tone="primary"
                  onClick={handleImport}
                  disabled={!markdown.trim()}
                />
                <Button
                  text="Cancel"
                  mode="ghost"
                  onClick={() => {
                    setIsOpen(false);
                    setMarkdown('');
                    setError(null);
                  }}
                />
              </Stack>
            </Stack>
          </Card>
        </Dialog>
      )}
    </>
  );
};

export default MarkdownImport;



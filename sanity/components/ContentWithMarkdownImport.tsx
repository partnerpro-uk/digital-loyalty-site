/**
 * Custom Content Input Component
 * Wraps the default PortableText editor with a Markdown Import button
 */

import React from 'react';
import { Stack } from '@sanity/ui';
import { set } from 'sanity';
import { MarkdownImport } from './MarkdownImport';

export const ContentWithMarkdownImport = (props: any) => {
  const { value, onChange, renderDefault } = props;

  const handleMarkdownImport = (blocks: any[]) => {
    // Append the imported blocks to existing content
    const newValue = value ? [...value, ...blocks] : blocks;
    onChange(set(newValue));
  };

  return (
    <Stack space={3}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
        <MarkdownImport onImport={handleMarkdownImport} />
      </div>
      {renderDefault(props)}
    </Stack>
  );
};

export default ContentWithMarkdownImport;


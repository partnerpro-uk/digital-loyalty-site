/**
 * Auto-translate document action
 * Automatically translates multilingual fields when publishing
 */

import { DocumentActionComponent, useDocumentOperation } from 'sanity';
import { useState, useEffect } from 'react';
import { autoTranslateField } from '../lib/autoTranslate';

export const autoTranslateAction: DocumentActionComponent = (props) => {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);

    try {
      const doc = props.draft || props.published;
      
      // Auto-translate category/tag names if needed
      if ((props.type === 'category' || props.type === 'tag') && doc?.name) {
        const name = doc.name;
        
        // Check if translations are missing
        const needsTranslation = !name.es || !name.fr || !name.pt || !name.de || !name.ar || !name.zh;
        
        if (needsTranslation && name.en) {
          console.log('Auto-translating name field...');
          const translations = await autoTranslateField(name.en);
          
          patch.execute([
            {
              set: {
                name: {
                  ...name,
                  ...translations
                }
              }
            }
          ]);
          
          // Wait for patch to complete
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Auto-translate description if needed
        if (doc?.description?.en && !doc?.description?.es) {
          console.log('Auto-translating description field...');
          const descTranslations = await autoTranslateField(doc.description.en);
          
          patch.execute([
            {
              set: {
                description: {
                  ...doc.description,
                  ...descTranslations
                }
              }
            }
          ]);
          
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      // Publish the document
      publish.execute();
    } catch (error) {
      console.error('Auto-translate failed:', error);
      // Still publish even if translation fails
      publish.execute();
    } finally {
      setIsPublishing(false);
    }
  };

  return {
    disabled: publish.disabled,
    label: isPublishing ? 'Publishing & translating...' : '✨ Publish (auto-translate)',
    onHandle: handlePublish,
  };
};


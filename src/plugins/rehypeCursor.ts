import type { Element, Root, Text } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * Create a rehype plugin to replace cursor placeholder with custom cursor
 * @param cursor - The cursor to render (string or ReactNode)
 * @returns Rehype plugin function
 */
export function createRehypeCursorPlugin(cursor: React.ReactNode) {
  const CURSOR_MARKER = '\u200B__MDTYPER_CURSOR__\u200B';
  
  return () => (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      // Check if text contains cursor marker
      if (node.value && node.value.includes(CURSOR_MARKER)) {
        if (parent && typeof index === 'number') {
          // Split text by cursor marker
          const parts = node.value.split(CURSOR_MARKER);
          const newChildren: (Text | Element)[] = [];
          
          parts.forEach((part, i) => {
            // Add text before cursor
            if (part) {
              newChildren.push({
                type: 'text',
                value: part,
              });
            }
            
            // Add cursor between parts (but not after last part)
            if (i < parts.length - 1) {
              if (typeof cursor === 'string') {
                // For string cursor, add as text
                newChildren.push({
                  type: 'text',
                  value: cursor,
                });
              } else {
                // For ReactNode cursor, create placeholder element
                newChildren.push({
                  type: 'element',
                  tagName: 'span',
                  properties: {
                    'data-cursor-placeholder': 'true',
                  },
                  children: [],
                } as Element);
              }
            }
          });
          
          // Replace the text node with new children
          parent.children.splice(index, 1, ...newChildren);
        }
      }
    });
  };
}


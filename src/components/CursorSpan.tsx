import React from 'react';

interface CursorSpanProps {
  cursor: React.ReactNode;
  userSpanComponent?: React.ComponentType<any>;
  node?: any;
  [key: string]: any;
}

/**
 * Span component that handles cursor placeholder rendering
 * Falls back to user's custom span component if not a cursor placeholder
 */
export const CursorSpan: React.FC<CursorSpanProps> = ({ 
  cursor, 
  userSpanComponent, 
  node, 
  ...props 
}) => {
  // Render cursor component for placeholder
  if (props['data-cursor-placeholder'] === 'true') {
    return <>{cursor}</>;
  }
  
  // Normal span rendering - use user's custom component if provided
  if (userSpanComponent) {
    const UserSpan = userSpanComponent;
    return <UserSpan node={node} {...props} />;
  }
  
  // Default span
  return <span {...props} />;
};


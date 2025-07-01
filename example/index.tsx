import { StrictMode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import BasicDemo from './basic';
import CDMDemo from './cmd';
import KatexDemo from './katex';
import ManualStartDemo from './ManualStart';
import TypingAnimationDemo from './TypingAnimationDemo';
const App = () => {
  return (
    <div className={`ds-message `}>
      <BasicDemo />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

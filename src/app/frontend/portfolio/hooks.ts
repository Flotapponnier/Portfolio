'use client';

import { useState, useEffect } from 'react';

export const useTerminalAnimation = (text: string, delay: number = 80) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, delay);
    return () => clearInterval(typeInterval);
  }, [text, delay]);
  return displayText;
};
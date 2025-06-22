
'use client';

import { useState, useEffect } from 'react';

export default function TopBar() {
  const [displayText, setDisplayText] = useState('');
  const [titleVisible, setTitleVisible] = useState(true);
  const fullText = "STUDENT AT 42-HEILBRONN | C/C++ DEV | GENAI ENTHUSIAST";

  useEffect(() => {
    // Title fade animation cycle
    const titleCycle = () => {
      setTitleVisible(false);
      setTimeout(() => {
        setTitleVisible(true);
      }, 2000);
    };

    // Start title animation after 3 seconds, then repeat every 8 seconds
    const titleTimer = setTimeout(() => {
      titleCycle();
      setInterval(titleCycle, 8000);
    }, 3000);

    // Typewriter effect for subtitle
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);

    return () => {
      clearTimeout(titleTimer);
      clearInterval(typeInterval);
    };
  }, []);

  return (
    <header className="bg-black border-b-4 border-apple-green p-6 font-mono relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-apple-green/5 to-transparent animate-scanline pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${titleVisible
          ? 'opacity-100 transform translate-y-0'
          : 'opacity-0 transform -translate-y-4'
          }`}>
          <h1 className="text-6xl md:text-7xl font-bold text-apple-green mb-2 tracking-wider">
            <span className="inline-block animate-pulse-slow">&lt;</span>
            <span className="mx-2">FLORENT TAPPONNIER</span>
            <span className="inline-block animate-pulse-slow">/&gt;</span>
          </h1>
        </div>

        <div className="mt-4 h-8">
          <p className="text-xl text-apple-green/80 font-mono tracking-wide">
            <span className="text-lime-400 animate-blink-fast">&gt;</span>
            <span className="ml-2">{displayText}</span>
            <span className="animate-blink-cursor">█</span>
          </p>
        </div>
      </div>
    </header>
  );
}

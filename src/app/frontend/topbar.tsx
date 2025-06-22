
'use client';

import { useEffect, useState } from 'react';

export default function TopBar() {
  const [terminalText, setTerminalText] = useState('');
  const fullText = 'Student at 42 - Heilbronn C/C++ Developer | GenAI Enthusiast';

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-container">
      <header style={{ border: 'var(--border)', padding: '1rem', marginBottom: '2rem' }}>
        <h1>&lt;/&gt; Florent Tapponnier</h1>
        <p className="terminal-effect">{terminalText}</p>
        <nav>
          <ul>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a></li>
            <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Skills</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useLanguage, Language } from '../context/LanguageContext';

export default function TopBar() {
  const [terminalText, setTerminalText] = useState('');
  const { currentLanguage, setLanguage, t } = useLanguage();
  const fullText = t('header.title');

  useEffect(() => {
    let i = 0;
    setTerminalText('');
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [fullText]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const languageOptions = [
    { value: 'en', label: 'English', flag: '🇬🇧' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' }
  ];

  return (
    <div className="portfolio-container">
      <header style={{ border: 'var(--border)', padding: '1rem', marginBottom: '2rem' }}>
        <div className="header-top">
          <div className="header-left">
            <div className="profile-section">
              <div className="profile-picture">
                <img
                  src="/profile.jpg"
                  alt="Florent Tapponnier"
                  className="profile-img"
                  onError={(e) => {
                    // Fallback to a placeholder if image doesn't exist
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiMwMGZmMDAiLz4KPGV4dCB4PSI0MCIgeT0iNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAwMDAiIGZvbnQtZmFtaWx5PSJDb3VyaWVyIE5ldywgbW9ub3NwYWNlIiBmb250LXNpemU9IjE0Ij5GVDwvdGV4dD4KPC9zdmc+';
                  }}
                />
              </div>
              <div className="title-section">
                <h1>&lt;/&gt; Florent Tapponnier</h1>
                <p className="terminal-effect">{terminalText}</p>
              </div>
            </div>
          </div>

          <div className="header-right">
            <div className="language-selector">
              <label htmlFor="language-select" className="language-label">
                {t('language.select')}:
              </label>
              <select
                id="language-select"
                value={currentLanguage}
                onChange={handleLanguageChange}
                className="language-select"
              >
                {languageOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.flag} {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <nav>
          <ul>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>{t('nav.about')}</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>{t('nav.projects')}</a></li>
            <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>{t('nav.skills')}</a></li>
            <li><a href="#Formation" onClick={(e) => { e.preventDefault(); scrollToSection('Formation'); }}>{t('nav.formation')}</a></li>
            <li><a href="#languages" onClick={(e) => { e.preventDefault(); scrollToSection('languages'); }}>{t('nav.languages')}</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>{t('nav.contact')}</a></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

'use client';

import React, { useState, useCallback } from 'react';
import { useLanguage, Language } from '../../context/LanguageContext';
import { useTerminalAnimation } from './hooks';

const promptTemplates: Record<Language, string> = {
  en: `Generate a professional portfolio description for a software engineer with expertise in:
- C/C++ programming
- Artificial Intelligence
- System programming
- 42 School projects
- Docker and containerization
  #session:${Math.random().toString(36).substring(2)}`,

  fr: `Génère une description professionnelle de portfolio pour un ingénieur logiciel expert en :
- Programmation C/C++
- Intelligence Artificielle
- Programmation système
- Projets de l'école 42
- Docker et la containerisation
  #session:${Math.random().toString(36).substring(2)}`,

  de: `Erstelle eine professionelle Portfolio-Beschreibung für einen Softwareentwickler mit Fachkenntnissen in:
- C/C++ Programmierung
- Künstliche Intelligenz
- Systemprogrammierung
- 42 Schulprojekte
- Docker und Containerisierung
  #session:${Math.random().toString(36).substring(2)}`
};

const AboutSection: React.FC = () => {
  const { currentLanguage, t } = useLanguage();

  const welcomeText = useTerminalAnimation(t('about.welcome'));
  const [description, setDescription] = useState(t('about.intro1'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateDescription = useCallback(async () => {
    setLoading(true);
    setError(null);

    const promptBase = promptTemplates[currentLanguage] || promptTemplates.en;
    const prompt = promptBase + Math.random().toString(36).substring(2);

    try {
      const response = await fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate description');
      }

      // Clean leading word if needed
      const cleaned = data.description.replace(/^\S+\s+/, '');
      setDescription(cleaned);
    } catch (err) {
      setError(t('Failed to generate description. Please try again later.'));
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  }, [currentLanguage, t]);

  const scrollToContact = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="about" className="intro">
      <h2 className="intro__heading">{t('about.title')}</h2>
      <p className="intro__subheading terminal-effect">{welcomeText}</p>
      <p>{description}</p>
      <p>{t('about.intro2')}</p>
      <p>{t('about.intro3')}</p>
      <button
        className="button"
        onClick={generateDescription}
        disabled={loading}
        style={{
          background: loading ? '#f0f0f0' : '#4CAF50',
          color: loading ? '#666' : 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 15px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold'
        }}
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            <span>{t('Generating with Mixtral AI...')}</span>
          </>
        ) : (
          <>
            <span>✨</span>
            <span>{t('Regenerate with Mixtral-8x7B')}</span>
          </>
        )}
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      <a href="#contact" className="button" onClick={scrollToContact}>
        {t('about.contact')}
      </a>
    </section>
  );
};

export default AboutSection;

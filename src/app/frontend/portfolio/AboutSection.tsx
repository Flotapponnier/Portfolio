'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLanguage, Language } from '../../context/LanguageContext';
import { useTerminalAnimation } from './hooks';

const promptTemplates: Record<Language, string> = {
  en: `Generate a professional portfolio description for a software engineer with expertise in:
- C/C++ programming
- Artificial Intelligence
- System programming
- 42 School projects
- Docker and containerization
just start your text like it was me, start "As a software develloper" and end without giving me advice. just give me the text.`,
  fr: `Génère une description professionnelle de portfolio pour un ingénieur logiciel expert en :
- Programmation C/C++
- Intelligence Artificielle
- Programmation système
- Projets de l'école 42
- Docker et la containerisation
commence simplement la sentence par En temps que devellopeur logiciel, et finit sans me donner de conseil. donne moi juste le texte`,
  de: `Erstelle eine professionelle Portfolio-Beschreibung für einen Softwareentwickler mit Fachkenntnissen in:
- C/C++ Programmierung
- Künstliche Intelligenz
- Systemprogrammierung
- 42 Schulprojekte
- Docker und Containerisierung
Beginnt mit: Als Softwareentwickler bringe ich umfassende Kenntnisse in der Softwareentwicklung mit.
`
};

const AboutSection: React.FC = () => {
  const { currentLanguage, t } = useLanguage();
  const welcomeText = useTerminalAnimation(t('about.welcome'));
  const [description, setDescription] = useState(t('about.intro1'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);

  // Store full generated text to reveal gradually
  const [fullText, setFullText] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isGenerated) {
      setDescription(t('about.intro1'));
      setFullText('');
    }
  }, [currentLanguage, t, isGenerated]);

  // Effect to reveal tokens one by one without using tokenIndex state
  useEffect(() => {
    if (!fullText) return;

    const tokens = fullText.split(' ');
    let currentIndex = 0;

    setDescription(''); // reset visible description

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      currentIndex++;
      setDescription(tokens.slice(0, currentIndex).join(' '));

      if (currentIndex >= tokens.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 60); // Adjust speed here

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fullText]);

  const generateDescription = useCallback(async () => {
    setLoading(true);
    setError(null);

    const prompt = promptTemplates[currentLanguage] || promptTemplates.en;

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

      const text = data.description?.trim();
      if (!text || text.length < 10) {
        throw new Error('Generated content is too short or empty');
      }

      setFullText(text);  // Set full text for token reveal
      setIsGenerated(true);
    } catch (err) {
      setError(t('about.generation.error'));
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

      {!isGenerated && (
        <>
          <p>{t('about.intro2')}</p>
          <p>{t('about.intro3')}</p>
        </>
      )}

      <div className="button-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button
          className="button"
          onClick={generateDescription}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              <span>{t('about.generating')}</span>
            </>
          ) : (
            <>
              <span>✨</span>
              <span>{t('about.regenerate')}</span>
            </>
          )}
        </button>

        <a href="#contact" className="button" onClick={scrollToContact}>
          {t('about.contact')}
        </a>
      </div>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </section>
  );
};

export default AboutSection;

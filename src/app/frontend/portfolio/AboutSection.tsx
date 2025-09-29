'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLanguage, Language } from '../../context/LanguageContext';
import { useTerminalAnimation } from './hooks';

const promptTemplates: Record<Language, string> = {
  en: `Generate a professional portfolio description for a French developer based in Heilbronn, Germany with expertise in:
- Backend development and cloud computing
- Go programming as primary stack
- C/C++ fundamentals from 42 Heilbronn
- AI concepts including NLP, generative AI, machine learning
- Hackathons and startup ecosystem
just start your text like it was me, start "As a software developer" and end without giving me advice. just give me the text.`,
  fr: `Génère une description professionnelle de portfolio pour un développeur français basé à Heilbronn, Allemagne expert en :
- Développement backend et cloud computing
- Programmation Go comme stack principal
- Fondamentaux C/C++ de 42 Heilbronn
- Concepts d'IA incluant NLP, IA générative, apprentissage automatique
- Hackathons et écosystème startup
commence simplement la sentence par En tant que développeur logiciel, et finit sans me donner de conseil. donne moi juste le texte`,
  de: `Erstelle eine professionelle Portfolio-Beschreibung für einen französischen Entwickler mit Sitz in Heilbronn, Deutschland mit Fachkenntnissen in:
- Backend Entwicklung und Cloud Computing
- Go Programmierung als primärer Stack
- C/C++ Grundlagen von 42 Heilbronn
- KI Konzepte einschließlich NLP, generative KI, maschinelles Lernen
- Hackathons und Startup Ökosystem
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
  const [isStreaming, setIsStreaming] = useState(false);

  // Reference to abort controller for canceling streams
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!isGenerated) {
      setDescription(t('about.intro1'));
    }
  }, [currentLanguage, t, isGenerated]);

  const generateDescription = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsStreaming(true);
    setIsGenerated(true); // Immediately hide intro2 and intro3
    setDescription(''); // Clear existing description

    const prompt = promptTemplates[currentLanguage] || promptTemplates.en;

    // Create abort controller for canceling the stream
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body available');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data.trim()) {
              try {
                const parsed = JSON.parse(data);

                if (parsed.error) {
                  throw new Error(parsed.error);
                }

                if (parsed.done) {
                  setIsStreaming(false);
                  // Keep isGenerated as true to maintain the generated state
                  break;
                }

                if (parsed.token) {
                  accumulatedText += parsed.token;
                  setDescription(accumulatedText);
                }
              } catch (parseError) {
                console.warn('Failed to parse streaming data:', parseError);
              }
            }
          }
        }
      }

    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('Stream was aborted');
        // Reset to original state if aborted
        setIsGenerated(false);
      } else {
        setError(t('about.generation.error'));
        console.error('Generation error:', err);
        // Reset to original state on error
        setIsGenerated(false);
        setDescription(t('about.intro1'));
      }
    } finally {
      setLoading(false);
      setIsStreaming(false);
    }
  }, [currentLanguage, t]);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
      setIsStreaming(false);
      setIsGenerated(false);
      setDescription(t('about.intro1'));
    }
  }, [t]);

  const scrollToContact = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="about" className="intro">
      <h2 className="intro__heading">{t('about.title')}</h2>
      <p className="intro__subheading terminal-effect">{welcomeText}</p>

      <p>{description}</p>
      {isStreaming && (
        <span className="streaming-cursor" style={{ animation: 'blink 1s infinite' }}>|</span>
      )}

      {!isGenerated && (
        <>
          <p>{t('about.intro2')}</p>
          <p>{t('about.intro3')}</p>
        </>
      )}

      <div className="button-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        {!isStreaming ? (
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
        ) : (
          <button
            className="button button-stop"
            onClick={stopGeneration}
            style={{ backgroundColor: '#ff4444' }}
          >
            <span>⏹</span>
            <span>{t('about.generating')}</span>
          </button>
        )}

        <a href="#contact" className="button" onClick={scrollToContact}>
          {t('about.contact')}
        </a>
      </div>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </section>
  );
};

export default AboutSection;

'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTerminalAnimation } from './hooks';

interface LanguageSkill {
  name: string;
  flag: string;
  level: string;
  proficiency: number;
  proficiencyClass: string;
}

const LanguagesSection: React.FC = () => {
  const { t } = useLanguage();
  const instructionText = useTerminalAnimation(t('languages.instruction'));
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const languages: LanguageSkill[] = [
    { name: 'French', flag: '🇫🇷', level: 'Native', proficiency: 100, proficiencyClass: 'proficiency-native' },
    { name: 'English', flag: '🇬🇧', level: 'C2', proficiency: 95, proficiencyClass: 'proficiency-c2' },
    { name: 'Italian', flag: '🇮🇹', level: 'B1', proficiency: 60, proficiencyClass: 'proficiency-b1' },
    { name: 'Russian', flag: '🇷🇺', level: 'A2', proficiency: 40, proficiencyClass: 'proficiency-a2' },
    { name: 'German', flag: '🇩🇪', level: 'A2', proficiency: 40, proficiencyClass: 'proficiency-a2' },
    { name: 'Chinese', flag: '🇨🇳', level: 'A1', proficiency: 20, proficiencyClass: 'proficiency-a1' },
  ];

  const handleLanguageCardClick = (language: string) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(language)) {
        newSet.delete(language);
      } else {
        newSet.add(language);
      }
      return newSet;
    });
  };

  return (
    <section id="languages">
      <h2>{t('languages.title')}</h2>
      <p className="terminal-effect">{instructionText}</p>
      <div className="language-grid">
        {languages.map((lang) => {
          const isFlipped = flippedCards.has(lang.name);
          return (
            <div
              key={lang.name}
              className={`language-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => handleLanguageCardClick(lang.name)}
            >
              <div className="language-card-inner">
                <div className="language-front">
                  <div className="flag">{lang.flag}</div>
                  <h3>{lang.name}</h3>
                </div>
                <div className="language-back">
                  <h3>{lang.name}</h3>
                  <div className={`proficiency ${lang.proficiencyClass}`}>
                    <span className="level">{lang.level}</span>
                    <div className="level-bar">
                      <span style={{ width: `${lang.proficiency}%` }}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LanguagesSection;
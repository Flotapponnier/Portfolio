'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FormationSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="Formation">
      <h2>{t('formation.title')}</h2>
      <div className="project-card">
        <h3>{t('formation.school')}</h3>
        <p className="terminal-effect">{t('formation.status')}</p>
        <p>{t('formation.description')}</p>
        <p>
          <a href="https://www.42heilbronn.de/de/" target="_blank" rel="noopener noreferrer">
            link
          </a>
        </p>
      </div>
    </section>
  );
};

export default FormationSection;
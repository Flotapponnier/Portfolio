'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface SkillBarProps {
  title: string;
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ title, percentage }) => (
  <div className="skill-item">
    <h3>{title}</h3>
    <div className="skill-bar">
      <span className="skill-progress" style={{ width: `${percentage}%` }}></span>
    </div>
  </div>
);

const SkillsSection: React.FC = () => {
  const { t } = useLanguage();
  const skillsData = [
    { title: t('skills.c'), percentage: 95 },
    { title: t('skills.cpp'), percentage: 90 },
    { title: t('skills.genai'), percentage: 70 },
  ];
  const additionalSkills = [
    'Git',
    'Linux/Unix',
    'Algorithms',
    'Data Structures',
    'PyTorch',
    'Embedded Systems',
    'Dorker',
    'Vim/Neovim',
  ];

  return (
    <section id="skills">
      <h2>{t('skills.title')}</h2>
      {skillsData.map((skill, index) => (
        <SkillBar key={index} title={skill.title} percentage={skill.percentage} />
      ))}
      <h3>{t('skills.additional')}</h3>
      <div className="skills">
        {additionalSkills.map((skill, index) => (
          <span key={index} className="tag">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
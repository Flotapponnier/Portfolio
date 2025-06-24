'use client';

import React, { useState, useCallback } from 'react';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import FormationSection from './FormationSection';
import LanguagesSection from './LanguagesSection';
import ContactSection from './ContactSection';

export default function Portfolio() {
  const [sectionOrder, setSectionOrder] = useState([
    'about',
    'projects',
    'skills',
    'formation',
    'languages',
    'contact',
  ]);

  const moveSectionUp = useCallback((sectionId: string) => {
    setSectionOrder((prev) => {
      const currentIndex = prev.indexOf(sectionId);
      const newOrder = [...prev];
      if (currentIndex === 0) {
        const first = newOrder.shift()!;
        newOrder.push(first);
      } else {
        [newOrder[currentIndex - 1], newOrder[currentIndex]] = [
          newOrder[currentIndex],
          newOrder[currentIndex - 1],
        ];
      }
      return newOrder;
    });
  }, []);

  const moveSectionDown = useCallback((sectionId: string) => {
    setSectionOrder((prev) => {
      const currentIndex = prev.indexOf(sectionId);
      const newOrder = [...prev];
      if (currentIndex === prev.length - 1) {
        const last = newOrder.pop()!;
        newOrder.unshift(last);
      } else {
        [newOrder[currentIndex], newOrder[currentIndex + 1]] = [
          newOrder[currentIndex + 1],
          newOrder[currentIndex],
        ];
      }
      return newOrder;
    });
  }, []);

  const SectionControls: React.FC<{
    sectionId: string;
  }> = ({ sectionId }) => (
    <div className="section-controls">
      <button
        className="section-control-btn"
        onClick={() => moveSectionUp(sectionId)}
        title="Move section up"
      >
        ↑
      </button>
      <button
        className="section-control-btn"
        onClick={() => moveSectionDown(sectionId)}
        title="Move section down"
      >
        ↓
      </button>
    </div>
  );

  const SectionWrapper: React.FC<{
    sectionId: string;
    children: React.ReactNode;
    isFirst: boolean;
    isLast: boolean;
  }> = ({ sectionId, children, isFirst, isLast }) => (
    <div className="section-wrapper">
      <SectionControls sectionId={sectionId} isFirst={isFirst} isLast={isLast} />
      {children}
    </div>
  );

  const sectionComponents: { [key: string]: React.ComponentType } = {
    about: AboutSection,
    projects: ProjectsSection,
    skills: SkillsSection,
    formation: FormationSection,
    languages: LanguagesSection,
    contact: ContactSection,
  };

  return (
    <div className="portfolio-container">
      {sectionOrder.map((sectionId, index) => {
        const SectionComponent = sectionComponents[sectionId];
        const isFirst = index === 0;
        const isLast = index === sectionOrder.length - 1;
        return (
          <SectionWrapper
            key={sectionId}
            sectionId={sectionId}
            isFirst={isFirst}
            isLast={isLast}
          >
            <SectionComponent />
          </SectionWrapper>
        );
      })}
    </div>
  );
}

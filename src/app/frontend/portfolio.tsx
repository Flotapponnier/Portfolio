'use client';

import { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Project {
  id: number;
  title: string;
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  description: string;
  link: string;
}

interface LanguageSkill {
  name: string;
  flag: string;
  level: string;
  proficiency: number;
  proficiencyClass: string;
}

interface SkillBarProps {
  title: string;
  percentage: number;
}

const useTerminalAnimation = (text: string, delay: number = 80) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, delay);
    return () => clearInterval(typeInterval);
  }, [text, delay]);
  return displayText;
};

const SkillBar: React.FC<SkillBarProps> = ({ title, percentage }) => (
  <div className="skill-item">
    <h3>{title}</h3>
    <div className="skill-bar">
      <span className="skill-progress" style={{ width: `${percentage}%` }}></span>
    </div>
  </div>
);

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [projects, setProjects] = useState<Project[]>([]);
  const { t } = useLanguage();

  const [sectionOrder, setSectionOrder] = useState([
    'about',
    'projects',
    'skills',
    'formation',
    'languages',
    'contact'
  ]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then(data => setProjects(data))
      .catch(() => setProjects([]));
  }, []);

  const getFilteredProjects = useCallback(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((project) =>
      project.categories.some((cat) => cat.name === activeFilter)
    );
  }, [activeFilter, projects]);

  const handleFilterClick = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  const handleLanguageCardClick = useCallback((language: string) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(language)) {
        newSet.delete(language);
      } else {
        newSet.add(language);
      }
      return newSet;
    });
  }, []);

  const scrollToContact = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const moveSectionUp = useCallback((sectionId: string) => {
    setSectionOrder(prev => {
      const currentIndex = prev.indexOf(sectionId);
      const newOrder = [...prev];

      if (currentIndex === 0) {
        const first = newOrder.shift()!;
        newOrder.push(first);
      } else {
        [newOrder[currentIndex - 1], newOrder[currentIndex]] =
          [newOrder[currentIndex], newOrder[currentIndex - 1]];
      }

      return newOrder;
    });
  }, []);

  const moveSectionDown = useCallback((sectionId: string) => {
    setSectionOrder(prev => {
      const currentIndex = prev.indexOf(sectionId);
      const newOrder = [...prev];

      if (currentIndex === prev.length - 1) {
        const last = newOrder.pop()!;
        newOrder.unshift(last);
      } else {
        [newOrder[currentIndex], newOrder[currentIndex + 1]] =
          [newOrder[currentIndex + 1], newOrder[currentIndex]];
      }

      return newOrder;
    });
  }, []);

  const SectionControls = ({ sectionId, isFirst, isLast }: { sectionId: string, isFirst: boolean, isLast: boolean }) => (
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

  const SectionWrapper = ({ sectionId, children, isFirst, isLast }: {
    sectionId: string,
    children: React.ReactNode,
    isFirst: boolean,
    isLast: boolean
  }) => (
    <div className="section-wrapper">
      <SectionControls sectionId={sectionId} isFirst={isFirst} isLast={isLast} />
      {children}
    </div>
  );

  const languages: LanguageSkill[] = [
    { name: 'French', flag: '🇫🇷', level: 'Native', proficiency: 100, proficiencyClass: 'proficiency-native' },
    { name: 'English', flag: '🇬🇧', level: 'C2', proficiency: 95, proficiencyClass: 'proficiency-c2' },
    { name: 'Italian', flag: '🇮🇹', level: 'B1', proficiency: 60, proficiencyClass: 'proficiency-b1' },
    { name: 'Russian', flag: '🇷🇺', level: 'A2', proficiency: 40, proficiencyClass: 'proficiency-a2' },
    { name: 'German', flag: '🇩🇪', level: 'A2', proficiency: 40, proficiencyClass: 'proficiency-a2' },
    { name: 'Chinese', flag: '🇨🇳', level: 'A1', proficiency: 20, proficiencyClass: 'proficiency-a1' }
  ];

  const additionalSkills = ['Git', 'Linux/Unix', 'Algorithms', 'Data Structures', 'PyTorch', 'Embedded Systems', 'Dorker', 'Vim/Neovim'];

  const AboutSection = () => {
    const welcomeText = useTerminalAnimation(t('about.welcome'));
    return (
      <section id="about" className="intro">
        <h2 className="intro__heading">{t('about.title')}</h2>
        <p className="intro__subheading terminal-effect">{welcomeText}</p>
        <p>{t('about.intro1')}</p>
        <p>{t('about.intro2')}</p>
        <p>{t('about.intro3')}</p>
        <a href="#contact" className="button" onClick={scrollToContact}>
          {t('about.contact')}
        </a>
      </section>
    );
  };

  const ProjectsSection = () => {
    const filteredProjects = getFilteredProjects();

    const FilterControls = () => (
      <div className="filter-controls">
        {['all', 'c', 'cpp', 'genai', 'dorker'].map((filter) => (
          <button
            key={filter}
            className={`button ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter)}
          >
            {t(`projects.filter.${filter}`)}
          </button>
        ))}
      </div>
    );

    const ProjectCard = ({ project }: { project: Project }) => (
      <div className="project-card">
        <h3>{project.title}</h3>
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag.id} className="tag">{tag.name}</span>
          ))}
        </div>
        <p>{project.description}</p>
        <a href={project.link} className="button" target="_blank" rel="noopener noreferrer">
          {t('projects.view')}
        </a>
      </div>
    );

    return (
      <section id="projects">
        <h2>{t('projects.title')}</h2>
        <FilterControls />
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    );
  };

  const SkillsSection = () => {
    const skillsData = [
      { title: t('skills.c'), percentage: 95 },
      { title: t('skills.cpp'), percentage: 90 },
      { title: t('skills.genai'), percentage: 70 }
    ];

    return (
      <section id="skills">
        <h2>{t('skills.title')}</h2>
        {skillsData.map((skill, i) => (
          <SkillBar key={i} title={skill.title} percentage={skill.percentage} />
        ))}
        <h3>{t('skills.additional')}</h3>
        <div className="skills">
          {additionalSkills.map((skill, index) => (
            <span key={index} className="tag">{skill}</span>
          ))}
        </div>
      </section>
    );
  };

  const FormationSection = () => (
    <section id="Formation">
      <h2>{t('formation.title')}</h2>
      <div className="project-card">
        <h3>{t('formation.school')}</h3>
        <p className="terminal-effect">{t('formation.status')}</p>
        <p>{t('formation.description')}</p>
        <p>
          <a href="https://www.42heilbronn.de/de/" target="_blank" rel="noopener noreferrer">link</a>
        </p>
      </div>
    </section>
  );

  const LanguagesSection = () => {
    const instructionText = useTerminalAnimation(t('languages.instruction'));


    const LanguageCard = ({ language }: { language: LanguageSkill }) => {
      const isFlipped = flippedCards.has(language.name);

      return (
        <div
          className={`language-card ${isFlipped ? 'flipped' : ''}`}
          onClick={() => handleLanguageCardClick(language.name)}
        >
          <div className="language-card-inner">
            <div className="language-front">
              <div className="flag">{language.flag}</div>
              <h3>{language.name}</h3>
            </div>
            <div className="language-back">
              <h3>{language.name}</h3>
              <div className={`proficiency ${language.proficiencyClass}`}>
                <span className="level">{language.level}</span>
                <div className="level-bar">
                  <span style={{ width: `${language.proficiency}%` }}></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <section id="languages">
        <h2>{t('languages.title')}</h2>
        <p className="terminal-effect">{instructionText}</p>
        <div className="language-grid">
          {languages.map((lang) => (
            <LanguageCard key={lang.name} language={lang} />
          ))}
        </div>
      </section>
    );
  };

  const ContactSection = () => {
    const contactItems = [
      { title: 'Email', link: 'mailto:florent.tapponnier@gmail.com', text: t('contact.email') },
      { title: 'GitHub', link: 'https://github.com/Flotapponnier/', text: '@Flotapponnier' },
      { title: 'LinkedIn', link: 'https://www.linkedin.com/in/florent-tapponnier-26324a17a/', text: 'Florent Tapponnier' },
      { title: 'Twitter', link: 'https://x.com/FlorentTppnr', text: '@FlorentTppnr' }
    ];

    return (
      <section id="contact">
        <h2>{t('contact.title')}</h2>
        <div className="contact-grid">
          {contactItems.map((item) => (
            <div key={item.title} className="contact-item">
              <h3>{item.title}</h3>
              <a href={item.link} target="_blank" rel="noopener noreferrer">{item.text}</a>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const sectionComponents: { [key: string]: React.ComponentType } = {
    about: AboutSection,
    projects: ProjectsSection,
    skills: SkillsSection,
    formation: FormationSection,
    languages: LanguagesSection,
    contact: ContactSection
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

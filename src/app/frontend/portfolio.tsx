
'use client';

import { useEffect, useState, useCallback } from 'react';

// Interfaces
interface Project {
  title: string;
  categories: string[];
  tags: string[];
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

// Custom Hooks
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

// Components
const SkillBar: React.FC<SkillBarProps> = ({ title, percentage }) => {
  return (
    <div className="skill-item">
      <h3>{title}</h3>
      <div className="skill-bar">
        <span className="skill-progress" style={{ width: `${percentage}%` }}></span>
      </div>
    </div>
  );
};

// Main Portfolio Component
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  // Data
  const projects: Project[] = [
    {
      title: 'Minishell',
      categories: ['c'],
      tags: ['C', 'Bash'],
      description: 'Minishell is a very complete project made with Peu77\'s (who made a very good job) who mostly work in the parsing part, i mostly work in the execution part. Reproducing bash behavior including : pipe / and / or / parenthesis / redirection',
      link: 'https://github.com/Peu77/minishell'
    },
    {
      title: 'Inception',
      categories: ['dorker'],
      tags: ['Dorker', 'Virtual Machine', 'bash'],
      description: 'Inception project is a docker-compose project that will deploy and connect 3 docker container containing : Nginx / Wordpress / Mariadb, deploying on a reverse proxy a wordpress website connected to a database',
      link: 'https://github.com/Flotapponnier/Inception-42'
    },
    {
      title: 'Cub3d',
      categories: ['c'],
      tags: ['C', 'Mlx', 'Raycasting'],
      description: 'made with ilindaniel Cub3d is a graphic game made with the MLX42 library that copying the famous first 3d game with Raycasting Wolfenstein made by John Carmack. I mostly focus on the DDA and Brensham\'s Line algorithm, where my partner focus on texture and parsing',
      link: 'https://github.com/Flotapponnier/Cub3d'
    }
  ];

  const languages: LanguageSkill[] = [
    { name: 'French', flag: '🇫🇷', level: 'Native', proficiency: 100, proficiencyClass: 'proficiency-native' },
    { name: 'English', flag: '🇬🇧', level: 'C2', proficiency: 95, proficiencyClass: 'proficiency-c2' },
    { name: 'Italian', flag: '🇮🇹', level: 'B1', proficiency: 60, proficiencyClass: 'proficiency-b1' },
    { name: 'Russian', flag: '🇷🇺', level: 'A2', proficiency: 40, proficiencyClass: 'proficiency-a2' },
    { name: 'German', flag: '🇩🇪', level: 'A2', proficiency: 40, proficiencyClass: 'proficiency-a2' },
    { name: 'Chinese', flag: '🇨🇳', level: 'A1', proficiency: 20, proficiencyClass: 'proficiency-a1' }
  ];

  const additionalSkills = ['Git', 'Linux/Unix', 'Algorithms', 'Data Structures', 'PyTorch', 'Embedded Systems', 'Dorker', 'Vim/Neovim'];

  // Event Handlers
  const handleFilterClick = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  const handleLanguageCardClick = useCallback((language: string) => {
    setFlippedCards(prev => {
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

  // Utility Functions
  const getFilteredProjects = useCallback(() => {
    return projects.filter(project => {
      if (activeFilter === 'all') return true;
      return project.categories.includes(activeFilter);
    });
  }, [activeFilter, projects]);

  // Section Components
  const AboutSection = () => {
    const welcomeText = useTerminalAnimation('Welcome to my digital realm');

    return (
      <section id="about" className="intro">
        <h2 className="intro__heading">HELLO WORLD</h2>
        <p className="intro__subheading terminal-effect">{welcomeText}</p>
        <p>My name is Florent Tapponnier, i'm from France and have been intensively to gain value and skill during the year 2024 - 2025</p>
        <p>With the help of the 42 school i become proificient in C/C++ developemment and now i have a growing interest in Generative AI.</p>
        <p>Currently, I'm focused on applying these skills to the emerging field of GenAI development, with taking an interest in ML/DL/NLP/LLM/AI Agent</p>
        <a href="#contact" className="button" onClick={scrollToContact}>
          Get in touch
        </a>
      </section>
    );
  };

  const ProjectsSection = () => {
    const filteredProjects = getFilteredProjects();

    const FilterControls = () => (
      <div className="filter-controls">
        {['all', 'c', 'cpp', 'genai', 'dorker'].map(filter => (
          <button
            key={filter}
            className={`button ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
    );

    const ProjectCard = ({ project }: { project: Project }) => (
      <div className="project-card">
        <h3>{project.title}</h3>
        <div className="tags">
          {project.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className="tag">{tag}</span>
          ))}
        </div>
        <p>{project.description}</p>
        <a href={project.link} className="button" target="_blank" rel="noopener noreferrer">
          View Project
        </a>
      </div>
    );

    return (
      <section id="projects">
        <h2>Projects</h2>
        <FilterControls />
        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>
    );
  };

  const SkillsSection = () => {
    const skillsData = [
      { title: 'C Programming', percentage: 95 },
      { title: 'C++ Programming', percentage: 90 },
      { title: 'Generative AI', percentage: 70 }
    ];

    return (
      <section id="skills">
        <h2>Technical Skills</h2>

        {skillsData.map((skill, index) => (
          <SkillBar key={index} title={skill.title} percentage={skill.percentage} />
        ))}

        <h3>Additional Skills</h3>
        <div className="skills">
          {additionalSkills.map((skill, index) => (
            <span key={index} className="tag">{skill}</span>
          ))}
        </div>
      </section>
    );
  };

  const FormationSection = () => {
    return (
      <section id="Formation">
        <h2>Formation</h2>
        <div className="project-card">
          <h3>Heilbronn - 42 school</h3>
          <p className="terminal-effect">Alumni</p>
          <p>Joining the 42 school, giving me access to the network of programming, increasing and made me diving in the world of embedded systems and computer science</p>
          <p>
            <a href="https://www.42heilbronn.de/de/" target="_blank" rel="noopener noreferrer">
              link
            </a>
          </p>
        </div>
      </section>
    );
  };

  const LanguagesSection = () => {
    const instructionText = useTerminalAnimation('Click on flags to reveal proficiency level');

    const LanguageCard = ({ language }: { language: LanguageSkill }) => {
      const isFlipped = flippedCards.has(language.name);

      return (
        <div
          className={`language-card ${isFlipped ? 'flipped' : ''}`}
          onClick={() => handleLanguageCardClick(language.name)}
        >
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
      );
    };

    return (
      <section id="languages">
        <h2>Language Skills</h2>
        <p className="terminal-effect">{instructionText}</p>
        <div className="language-grid">
          {languages.map((language, index) => (
            <LanguageCard key={index} language={language} />
          ))}
        </div>
      </section>
    );
  };

  const ContactSection = () => {
    const contactItems = [
      {
        title: 'Email',
        link: 'mailto:florent.tapponnier@gmail.com',
        text: 'Send mail'
      },
      {
        title: 'GitHub',
        link: 'https://github.com/Flotapponnier/',
        text: '@Flotapponnier'
      },
      {
        title: 'LinkedIn',
        link: 'https://www.linkedin.com/in/florent-tapponnier-26324a17a/',
        text: 'Florent Tapponnier'
      },
      {
        title: 'Twitter',
        link: 'https://x.com/FlorentTppnr',
        text: '@FlorentTppnr'
      }
    ];

    return (
      <section id="contact">
        <h2>Contact</h2>
        <div className="contact-grid">
          {contactItems.map((item, index) => (
            <div key={index} className="contact-item">
              <h3>{item.title}</h3>
              <a
                href={item.link}
                target={item.link.startsWith('mailto:') ? undefined : "_blank"}
                rel={item.link.startsWith('mailto:') ? undefined : "noopener noreferrer"}
              >
                {item.text}
              </a>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Main Render
  return (
    <div className="portfolio-container">
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <FormationSection />
      <LanguagesSection />
      <ContactSection />
    </div>
  );
}

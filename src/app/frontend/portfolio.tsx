'use client';

import { useEffect, useState } from 'react';

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

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [terminalTexts, setTerminalTexts] = useState<{ [key: string]: string }>({});

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

  const terminalTextsToAnimate = {
    'intro-subheading': 'Welcome to my digital realm',
    'languages-instruction': 'Click on flags to reveal proficiency level'
  };

  useEffect(() => {
    Object.entries(terminalTextsToAnimate).forEach(([key, text]) => {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          setTerminalTexts(prev => ({
            ...prev,
            [key]: text.substring(0, i + 1)
          }));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 80);
    });
  }, []);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleLanguageCardClick = (language: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(language)) {
        newSet.delete(language);
      } else {
        newSet.add(language);
      }
      return newSet;
    });
  };

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    return project.categories.includes(activeFilter);
  });

  return (
    <div className="portfolio-container">
      <section id="about" className="intro">
        <h2 className="intro__heading">HELLO WORLD</h2>
        <p className="intro__subheading terminal-effect">{terminalTexts['intro-subheading'] || ''}</p>
        <p>My name is Florent Tapponnier, i'm from France and have been intensively to gain value and skill during the year 2024 - 2025</p>
        <p>With the help of the 42 school i become proificient in C/C++ developemment and now i have a growing interest in Generative AI.</p>
        <p>Currently, I'm focused on applying these skills to the emerging field of GenAI development, with taking an interest in ML/DL/NLP/LLM/AI Agent</p>
        <a href="#contact" className="button" onClick={(e) => {
          e.preventDefault();
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}>Get in touch</a>
      </section>

      <section id="projects">
        <h2>Projects</h2>
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

        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <div key={index} className="project-card">
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
          ))}
        </div>
      </section>

      <section id="skills">
        <h2>Technical Skills</h2>

        <div className="skill-item">
          <h3>C Programming</h3>
          <div className="skill-bar">
            <span className="skill-progress" style={{ width: '95%' }}></span>
          </div>
        </div>

        <div className="skill-item">
          <h3>C++ Programming</h3>
          <div className="skill-bar">
            <span className="skill-progress" style={{ width: '90%' }}></span>
          </div>
        </div>

        <div className="skill-item">
          <h3>Generative AI</h3>
          <div className="skill-bar">
            <span className="skill-progress" style={{ width: '70%' }}></span>
          </div>
        </div>

        <h3>Additional Skills</h3>
        <div className="skills">
          {['Git', 'Linux/Unix', 'Algorithms', 'Data Structures', 'PyTorch', 'Embedded Systems', 'Dorker', 'Vim/Neovim'].map((skill, index) => (
            <span key={index} className="tag">{skill}</span>
          ))}
        </div>
      </section>

      <section id="Formation">
        <h2>Formation</h2>
        <div className="project-card">
          <h3>Heilbronn - 42 school</h3>
          <p className="terminal-effect">Alumni</p>
          <p>Joining the 42 school, giving me access to the network of programming, increasing and made me diving in the world of embedded systems and computer science</p>
          <p><a href="https://www.42heilbronn.de/de/" target="_blank" rel="noopener noreferrer">link</a></p>
        </div>
      </section>

      <section id="languages">
        <h2>Language Skills</h2>
        <p className="terminal-effect">{terminalTexts['languages-instruction'] || ''}</p>
        <div className="language-grid">
          {languages.map((language, index) => (
            <div
              key={index}
              className={`language-card ${flippedCards.has(language.name) ? 'flipped' : ''}`}
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
          ))}
        </div>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <div className="contact-grid">
          <div className="contact-item">
            <h3>Email</h3>
            <a href="mailto:florent.tapponnier@gmail.com">Send mail</a>
          </div>
          <div className="contact-item">
            <h3>GitHub</h3>
            <a href="https://github.com/Flotapponnier/" target="_blank" rel="noopener noreferrer">@Flotapponnier</a>
          </div>
          <div className="contact-item">
            <h3>LinkedIn</h3>
            <a href="https://www.linkedin.com/in/florent-tapponnier-26324a17a/" target="_blank" rel="noopener noreferrer">Florent Tapponnier</a>
          </div>
          <div className="contact-item">
            <h3>Twitter</h3>
            <a href="https://x.com/FlorentTppnr" target="_blank" rel="noopener noreferrer">@FlorentTppnr</a>
          </div>
        </div>
      </section>
    </div>
  );
}

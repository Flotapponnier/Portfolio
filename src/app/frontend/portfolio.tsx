
'use client';

import { useState, useEffect } from 'react';

interface Project {
  title: string;
  categories: string[];
  tags: string[];
  description: string;
  link: string;
}

interface Language {
  name: string;
  flag: string;
  level: string;
  percentage: number;
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [welcomeText, setWelcomeText] = useState('');
  const [languageText, setLanguageText] = useState('');
  const [mounted, setMounted] = useState(false);

  const welcomeMessage = "WELCOME TO MY DIGITAL REALM";
  const languageMessage = "CLICK FLAGS TO REVEAL SKILL LEVEL";

  const projects: Project[] = [
    {
      title: "MINISHELL",
      categories: ["c"],
      tags: ["C", "BASH", "UNIX"],
      description: "Advanced shell implementation with full bash compatibility. Features include pipes, redirections, environment variables, and built-in commands. Collaborative project focusing on system programming and process management.",
      link: "https://github.com/Peu77/minishell"
    },
    {
      title: "INCEPTION",
      categories: ["docker"],
      tags: ["DOCKER", "NGINX", "WORDPRESS"],
      description: "Multi-container application deployment using Docker Compose. Orchestrates Nginx reverse proxy, WordPress CMS, and MariaDB database in isolated containers with custom networking and volume management.",
      link: "https://github.com/Flotapponnier/Inception-42"
    },
    {
      title: "CUB3D",
      categories: ["c"],
      tags: ["C", "RAYCASTING", "MLX"],
      description: "3D game engine inspired by Wolfenstein 3D. Implements raycasting algorithms, DDA line drawing, and real-time rendering using MLX42 graphics library. Features texture mapping and collision detection.",
      link: "https://github.com/Flotapponnier/Cub3d"
    }
  ];

  const languages: Language[] = [
    { name: "FRENCH", flag: "🇫🇷", level: "NATIVE", percentage: 100 },
    { name: "ENGLISH", flag: "🇬🇧", level: "C2", percentage: 95 },
    { name: "ITALIAN", flag: "🇮🇹", level: "B1", percentage: 60 },
    { name: "RUSSIAN", flag: "🇷🇺", level: "A2", percentage: 40 },
    { name: "GERMAN", flag: "🇩🇪", level: "A2", percentage: 40 },
    { name: "CHINESE", flag: "🇨🇳", level: "A1", percentage: 20 }
  ];

  const skills = [
    { name: "C PROGRAMMING", level: 95 },
    { name: "C++ DEVELOPMENT", level: 90 },
    { name: "GENERATIVE AI", level: 75 }
  ];

  const additionalSkills = [
    "GIT", "LINUX/UNIX", "ALGORITHMS", "DATA STRUCTURES",
    "PYTORCH", "EMBEDDED SYSTEMS", "DOCKER", "VIM/NEOVIM"
  ];

  const filterCategories = [
    { id: 'all', label: 'ALL' },
    { id: 'c', label: 'C/C++' },
    { id: 'docker', label: 'DOCKER' },
    { id: 'genai', label: 'GENAI' }
  ];

  useEffect(() => {
    setMounted(true);

    // Typewriter effects
    let welcomeIndex = 0;
    const welcomeInterval = setInterval(() => {
      if (welcomeIndex < welcomeMessage.length) {
        setWelcomeText(welcomeMessage.substring(0, welcomeIndex + 1));
        welcomeIndex++;
      } else {
        clearInterval(welcomeInterval);
      }
    }, 60);

    setTimeout(() => {
      let langIndex = 0;
      const langInterval = setInterval(() => {
        if (langIndex < languageMessage.length) {
          setLanguageText(languageMessage.substring(0, langIndex + 1));
          langIndex++;
        } else {
          clearInterval(langInterval);
        }
      }, 50);
    }, 2000);

    return () => clearInterval(welcomeInterval);
  }, []);

  const filteredProjects = projects.filter(project =>
    activeFilter === 'all' || project.categories.includes(activeFilter)
  );

  const toggleLanguageCard = (language: string) => {
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

  if (!mounted) return null;

  return (
    <div className="bg-black text-apple-green font-mono space-y-12 relative">
      {/* Background grid pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      {/* HELLO WORLD Section */}
      <section className="terminal-window">
        <div className="terminal-header">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-apple-green/60 text-sm">ABOUT.EXE</span>
        </div>
        <div className="terminal-content">
          <h2 className="text-6xl font-bold mb-6 text-lime-400 tracking-wider">
            HELLO WORLD
          </h2>
          <p className="text-2xl mb-8 text-apple-green/80">
            <span className="text-lime-400 animate-blink-fast">&gt;</span>
            <span className="ml-2">{welcomeText}</span>
            <span className="animate-blink-cursor">█</span>
          </p>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>FLORENT TAPPONNIER - FRENCH DEVELOPER</p>
            <p>INTENSIVE SKILL DEVELOPMENT 2024-2025</p>
            <p>42 SCHOOL GRADUATE • C/C++ SPECIALIST</p>
            <p>CURRENT FOCUS: GENAI • ML/DL • NLP • LLM • AI AGENTS</p>
          </div>
          <button className="retro-button mt-8">
            INITIALIZE_CONTACT.EXE
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section className="terminal-window">
        <div className="terminal-header">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-apple-green/60 text-sm">PROJECTS.EXE</span>
        </div>
        <div className="terminal-content">
          <h2 className="text-4xl font-bold mb-8 text-lime-400 tracking-wider">
            PROJECT_ARCHIVE
          </h2>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3 mb-8">
            {filterCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 font-bold tracking-wide transition-all duration-200 ${activeFilter === category.id
                    ? 'bg-apple-green text-black border-2 border-apple-green'
                    : 'border-2 border-apple-green text-apple-green hover:bg-apple-green/10'
                  }`}
              >
                [{category.label}]
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div key={index} className="project-card group">
                <div className="project-header">
                  <h3 className="text-xl font-bold text-lime-400 tracking-wide">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-apple-green/80 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-button-small w-full text-center"
                >
                  ACCESS_PROJECT
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="terminal-window">
        <div className="terminal-header">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-apple-green/60 text-sm">SKILLS.EXE</span>
        </div>
        <div className="terminal-content">
          <h2 className="text-4xl font-bold mb-8 text-lime-400 tracking-wider">
            SKILL_MATRIX
          </h2>

          <div className="space-y-6 mb-8">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">{skill.name}</h3>
                  <span className="text-lime-400 font-bold">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-6 text-lime-400">ADDITIONAL_MODULES</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {additionalSkills.map((skill, index) => (
              <div key={index} className="tag-large">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formation Section */}
      <section className="terminal-window">
        <div className="terminal-header">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-apple-green/60 text-sm">EDUCATION.EXE</span>
        </div>
        <div className="terminal-content">
          <h2 className="text-4xl font-bold mb-8 text-lime-400 tracking-wider">
            TRAINING_LOG
          </h2>
          <div className="education-card">
            <h3 className="text-2xl font-bold text-lime-400 mb-2">42 HEILBRONN</h3>
            <p className="text-apple-green/80 mb-4 text-lg">
              <span className="text-lime-400">&gt;</span> ALUMNI STATUS
            </p>
            <p className="text-apple-green/80 leading-relaxed mb-4">
              PEER-TO-PEER LEARNING ECOSYSTEM<br />
              SYSTEMS PROGRAMMING • ALGORITHMS • UNIX<br />
              PROJECT-BASED CURRICULUM • NO TEACHERS
            </p>
            <a
              href="https://www.42heilbronn.de/de/"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button-small"
            >
              VIEW_INSTITUTION
            </a>
          </div>
        </div>
      </section>

      {/* Language Skills Section */}
      <section className="terminal-window">
        <div className="terminal-header">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-apple-green/60 text-sm">LANGUAGES.EXE</span>
        </div>
        <div className="terminal-content">
          <h2 className="text-4xl font-bold mb-6 text-lime-400 tracking-wider">
            LANGUAGE_PROTOCOLS
          </h2>
          <p className="text-xl mb-8 text-apple-green/80">
            <span className="text-lime-400 animate-blink-fast">&gt;</span>
            <span className="ml-2">{languageText}</span>
            <span className="animate-blink-cursor">█</span>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {languages.map((language, index) => (
              <div
                key={index}
                onClick={() => toggleLanguageCard(language.name)}
                className="language-card"
              >
                <div className={`language-inner ${flippedCards.has(language.name) ? 'flipped' : ''
                  }`}>
                  {/* Front */}
                  <div className="language-front">
                    <div className="text-6xl mb-3 filter drop-shadow-glow">
                      {language.flag}
                    </div>
                    <h3 className="text-lg font-bold tracking-wide">{language.name}</h3>
                  </div>

                  {/* Back */}
                  <div className="language-back">
                    <h3 className="text-lg font-bold mb-4 tracking-wide">{language.name}</h3>
                    <div className="w-full">
                      <div className="text-center mb-3">
                        <span className="text-lime-400 font-bold text-xl">{language.level}</span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-progress"
                          style={{ width: `${language.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="terminal-window">
        <div className="terminal-header">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-apple-green/60 text-sm">CONTACT.EXE</span>
        </div>
        <div className="terminal-content">
          <h2 className="text-4xl font-bold mb-8 text-lime-400 tracking-wider">
            COMMUNICATION_PORTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "EMAIL", link: "mailto:florent.tapponnier@gmail.com", text: "SEND_MESSAGE" },
              { title: "GITHUB", link: "https://github.com/Flotapponnier/", text: "@FLOTAPPONNIER" },
              { title: "LINKEDIN", link: "https://www.linkedin.com/in/florent-tapponnier-26324a17a/", text: "CONNECT_PROFESSIONAL" },
              { title: "TWITTER", link: "https://x.com/FlorentTppnr", text: "@FLORENTTPPNR" }
            ].map((contact, index) => (
              <div key={index} className="contact-card">
                <h3 className="text-xl font-bold text-lime-400 mb-4 tracking-wide">
                  {contact.title}
                </h3>
                <a
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-button-small w-full text-center"
                >
                  {contact.text}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

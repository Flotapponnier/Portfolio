'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface Project {
  id: number;
  title: string;
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  description: string;
  link: string;
}

const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => setProjects([]));
  }, []);

  const getFilteredProjects = useCallback(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((project) =>
      project.categories.some((cat) => cat.name === activeFilter)
    );
  }, [activeFilter, projects]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <section id="projects">
      <h2>{t('projects.title')}</h2>
      <div className="filter-controls">
        {['all', 'c', 'cpp', 'genai', 'docker'].map((filter) => (
          <button
            key={filter}
            className={`button ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter)}
          >
            {t(`projects.filter.${filter}`)}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {getFilteredProjects().map((project) => (
          <div key={project.id} className="project-card">
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
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;

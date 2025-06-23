'use client';

import React, { useEffect, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
}

const PASSWORD = 'admin123';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    link: '',
    categories: '',
    tags: ''
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('admin-auth');
    if (stored === PASSWORD) {
      setIsAuthenticated(true);
    } else {
      const userInput = prompt('Enter admin password:');
      if (userInput === PASSWORD) {
        localStorage.setItem('admin-auth', PASSWORD);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        window.location.href = '/';
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchProjects();
  }, [isAuthenticated]);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (e) {
      console.error('Failed to fetch projects:', e);
      alert('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(id: number) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        // Refresh page after successful deletion
        window.location.reload();
      } else {
        const error = await res.json();
        alert(`Failed to delete project: ${error.error}`);
      }
    } catch (e) {
      console.error('Error deleting project:', e);
      alert('Error deleting project');
    }
  }

  async function saveProject() {
    const categories = newProject.categories.split(',').map(s => s.trim()).filter(Boolean);
    const tags = newProject.tags.split(',').map(s => s.trim()).filter(Boolean);

    if (!newProject.title || !newProject.description || !newProject.link) {
      alert('Title, description, and link are required');
      return;
    }

    const body = {
      title: newProject.title,
      description: newProject.description,
      link: newProject.link,
      categories,
      tags
    };

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/projects/${editId}` : '/api/projects';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        // Reset form and refresh page after successful save/update
        setNewProject({ title: '', description: '', link: '', categories: '', tags: '' });
        setEditId(null);
        window.location.reload();
      } else {
        const error = await res.json();
        alert(`Error saving project: ${error.error}`);
      }
    } catch (e) {
      console.error('Error saving project:', e);
      alert('Error saving project');
    }
  }

  function startEdit(project: Project) {
    setEditId(project.id);
    setNewProject({
      title: project.title,
      description: project.description,
      link: project.link,
      categories: project.categories.map(c => c.name).join(', '),
      tags: project.tags.map(t => t.name).join(', ')
    });
  }

  if (isAuthenticated === null) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return <p>Redirecting...</p>;
  }

  return (
    <main className="admin-container">
      <h1>Admin - Manage Projects</h1>
      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th className="admin-th">Title</th>
              <th className="admin-th">Categories</th>
              <th className="admin-th">Tags</th>
              <th className="admin-th">Description</th>
              <th className="admin-th">Link</th>
              <th className="admin-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} className="admin-row">
                <td className="admin-td">{project.title}</td>
                <td className="admin-td">{project.categories.map(c => c.name).join(', ')}</td>
                <td className="admin-td">{project.tags.map(t => t.name).join(', ')}</td>
                <td className="admin-td">{project.description}</td>
                <td className="admin-td">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="admin-link">
                    Link
                  </a>
                </td>
                <td className="admin-td">
                  <button onClick={() => startEdit(project)} className="admin-button">
                    Edit
                  </button>
                  <button onClick={() => deleteProject(project.id)} className="admin-button delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <section className="admin-form">
        <h2>{editId ? 'Edit Project' : 'Add New Project'}</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Title *"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            className="admin-input"
            required
          />
          <input
            type="text"
            placeholder="Description *"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="admin-input"
            required
          />
          <input
            type="url"
            placeholder="Link *"
            value={newProject.link}
            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
            className="admin-input"
            required
          />
          <input
            type="text"
            placeholder="Categories (comma separated)"
            value={newProject.categories}
            onChange={(e) => setNewProject({ ...newProject, categories: e.target.value })}
            className="admin-input"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={newProject.tags}
            onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
            className="admin-input"
          />
          <button onClick={saveProject} className="admin-button save">
            {editId ? 'Save Changes' : 'Add Project'}
          </button>
          {editId && (
            <button onClick={() => { setEditId(null); setNewProject({ title: '', description: '', link: '', categories: '', tags: '' }) }} className="admin-button cancel">
              Cancel Edit
            </button>
          )}
        </div>
      </section>
    </main>
  );
}


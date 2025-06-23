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

export default function AdminPage() {
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
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }

  async function deleteProject(id: number) {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    if (res.ok) fetchProjects();
  }

  async function saveProject() {
    const categories = newProject.categories.split(',').map(s => s.trim()).filter(Boolean);
    const tags = newProject.tags.split(',').map(s => s.trim()).filter(Boolean);

    const body = {
      title: newProject.title,
      description: newProject.description,
      link: newProject.link,
      categories,
      tags
    };

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/projects/${editId}` : '/api/projects';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      setNewProject({ title: '', description: '', link: '', categories: '', tags: '' });
      setEditId(null);
      fetchProjects();
    } else {
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

  return (
    <main style={{ padding: '2rem', maxWidth: 900, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Admin - Manage Projects</h1>
      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
          <thead>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Categories</th>
              <th style={thStyle}>Tags</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Link</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={tdStyle}>{project.title}</td>
                <td style={tdStyle}>{project.categories.map(c => c.name).join(', ')}</td>
                <td style={tdStyle}>{project.tags.map(t => t.name).join(', ')}</td>
                <td style={tdStyle}>{project.description}</td>
                <td style={tdStyle}>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
                    Link
                  </a>
                </td>
                <td style={tdStyle}>
                  <button onClick={() => startEdit(project)} style={buttonStyle}>
                    Edit
                  </button>
                  <button onClick={() => deleteProject(project.id)} style={{ ...buttonStyle, backgroundColor: '#e74c3c' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <section style={{ border: '1px solid #ccc', padding: 15, borderRadius: 6 }}>
        <h2>{editId ? 'Edit Project' : 'Add New Project'}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            style={inputStyle}
          />
          <input
            type="url"
            placeholder="Link"
            value={newProject.link}
            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Categories (comma separated)"
            value={newProject.categories}
            onChange={(e) => setNewProject({ ...newProject, categories: e.target.value })}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={newProject.tags}
            onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
            style={inputStyle}
          />
          <button onClick={saveProject} style={{ ...buttonStyle, backgroundColor: '#27ae60', color: 'white', fontWeight: 'bold' }}>
            {editId ? 'Save Changes' : 'Add Project'}
          </button>
          {editId && (
            <button onClick={() => { setEditId(null); setNewProject({ title: '', description: '', link: '', categories: '', tags: '' }) }} style={{ ...buttonStyle, backgroundColor: '#95a5a6' }}>
              Cancel Edit
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px',
  backgroundColor: '#f4f4f4',
};

const tdStyle: React.CSSProperties = {
  padding: '8px',
  verticalAlign: 'top',
};

const buttonStyle: React.CSSProperties = {
  marginRight: 8,
  padding: '6px 12px',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  backgroundColor: '#2980b9',
  color: 'white',
};

const inputStyle: React.CSSProperties = {
  padding: 8,
  fontSize: 16,
  borderRadius: 4,
  border: '1px solid #ccc',
};

import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import CodeWindow from '../components/CodeWindow';
import { Trash2, Plus } from 'lucide-react';

const EditProjectsPage = () => {
  const { projects, addProject, updateProject, deleteProject, loading } = useContent();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    stack: '',
    demo: '',
    repo: '',
    imageUrl: '',
    order: 0,
  });

  const handleNewProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProjectChange = (id: string, field: string, value: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      updateProject(id, { [field]: value });
    }
  };

  const handleSubmitNewProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Convert stack string to array
      const stackArray = newProject.stack
        .split(',')
        .map((tech) => tech.trim())
        .filter((tech) => tech !== '');
      
      await addProject({
        name: newProject.name,
        description: newProject.description,
        stack: stackArray,
        demo: newProject.demo,
        repo: newProject.repo,
        imageUrl: newProject.imageUrl,
        order: projects.length + 1,
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      // Reset form
      setNewProject({
        name: '',
        description: '',
        stack: '',
        demo: '',
        repo: '',
        imageUrl: '',
        order: 0,
      });
      
      setShowNewProjectForm(false);
    } catch (err) {
      console.error('Error adding project:', err);
      setError('Failed to add project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
      } catch (err) {
        console.error('Error deleting project:', err);
        setError('Failed to delete project. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--editor-function)]"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-4 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="text-[var(--editor-comment)]">// Edit Projects</span>
        </h1>
        
        <button
          onClick={() => setShowNewProjectForm(!showNewProjectForm)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--editor-type)] text-black rounded hover:bg-opacity-80 transition-colors"
        >
          <Plus size={16} />
          <span>{showNewProjectForm ? 'Cancel' : 'New Project'}</span>
        </button>
      </div>
      
      {error && (
        <div className="p-3 bg-[#1E1E1E] border-l-4 border-red-500 text-red-400 mb-4">
          <span className="code-comment">// {error}</span>
        </div>
      )}
      
      {success && (
        <div className="p-3 bg-[#1E1E1E] border-l-4 border-green-500 text-green-400 mb-4">
          <span className="code-comment">// Project saved successfully!</span>
        </div>
      )}
      
      {/* New Project Form */}
      {showNewProjectForm && (
        <CodeWindow title="newProject.js">
          <form onSubmit={handleSubmitNewProject} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                name:
              </label>
              <input
                type="text"
                name="name"
                value={newProject.name}
                onChange={handleNewProjectChange}
                className="terminal-input w-full"
                placeholder="Project Name"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                description:
              </label>
              <textarea
                name="description"
                value={newProject.description}
                onChange={handleNewProjectChange}
                className="terminal-input w-full min-h-[80px]"
                placeholder="Project description..."
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                stack: <span className="text-[var(--editor-comment)]">// Comma separated</span>
              </label>
              <input
                type="text"
                name="stack"
                value={newProject.stack}
                onChange={handleNewProjectChange}
                className="terminal-input w-full"
                placeholder="React, Node.js, MongoDB"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                demo:
              </label>
              <input
                type="text"
                name="demo"
                value={newProject.demo}
                onChange={handleNewProjectChange}
                className="terminal-input w-full"
                placeholder="https://example.com"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                repo:
              </label>
              <input
                type="text"
                name="repo"
                value={newProject.repo}
                onChange={handleNewProjectChange}
                className="terminal-input w-full"
                placeholder="https://github.com/username/repo"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                imageUrl:
              </label>
              <input
                type="text"
                name="imageUrl"
                value={newProject.imageUrl}
                onChange={handleNewProjectChange}
                className="terminal-input w-full"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="terminal-button w-full"
              >
                {isSubmitting ? 'Adding...' : 'Add Project'}
              </button>
            </div>
          </form>
        </CodeWindow>
      )}
      
      {/* Existing Projects */}
      <div className="space-y-6 mt-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <CodeWindow 
              key={project.id} 
              title={`${project.name.toLowerCase().replace(/\s+/g, '-')}.js`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                      name:
                    </label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                      className="terminal-input w-full"
                      placeholder="Project Name"
                    />
                  </div>
                  
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
                    className="ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                    description:
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                    className="terminal-input w-full min-h-[80px]"
                    placeholder="Project description..."
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                    stack: <span className="text-[var(--editor-comment)]">// Comma separated</span>
                  </label>
                  <input
                    type="text"
                    value={project.stack.join(', ')}
                    onChange={(e) => {
                      const stackArray = e.target.value
                        .split(',')
                        .map((tech) => tech.trim())
                        .filter((tech) => tech !== '');
                      updateProject(project.id, { stack: stackArray });
                    }}
                    className="terminal-input w-full"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                      demo:
                    </label>
                    <input
                      type="text"
                      value={project.demo}
                      onChange={(e) => handleProjectChange(project.id, 'demo', e.target.value)}
                      className="terminal-input w-full"
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                      repo:
                    </label>
                    <input
                      type="text"
                      value={project.repo}
                      onChange={(e) => handleProjectChange(project.id, 'repo', e.target.value)}
                      className="terminal-input w-full"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                    imageUrl:
                  </label>
                  <input
                    type="text"
                    value={project.imageUrl}
                    onChange={(e) => handleProjectChange(project.id, 'imageUrl', e.target.value)}
                    className="terminal-input w-full"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </CodeWindow>
          ))
        ) : (
          <div className="bg-[#2D2D2D] rounded-md p-6 text-center">
            <p className="text-[var(--editor-comment)]">// No projects found</p>
            <p className="text-gray-400 mt-2">Add your first project using the "New Project" button</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProjectsPage;
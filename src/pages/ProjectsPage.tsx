import React, { useState } from 'react';
import CodeWindow from '../components/CodeWindow';
import { useContent } from '../contexts/ContentContext';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsPage = () => {
  const { projects, loading } = useContent();
  const [activeProject, setActiveProject] = useState<string | null>(null);
  
  const handleProjectClick = (id: string) => {
    setActiveProject(id === activeProject ? null : id);
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
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        <span className="text-[var(--editor-comment)]">// Projects</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div 
              key={project.id}
              className="bg-[#2D2D2D] rounded-md overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="relative">
                {/* Project Image */}
                <div className="aspect-video bg-[#1E1E1E] flex items-center justify-center overflow-hidden">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.name} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-[var(--editor-comment)]">
                      {project.name}.js
                    </div>
                  )}
                </div>
                
                {/* Project filename tab */}
                <div className="absolute top-0 left-0 bg-[#252526] px-3 py-1 text-sm font-mono rounded-br">
                  {project.name.toLowerCase().replace(/\s+/g, '-')}.js
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[var(--editor-function)] mb-2">
                  {project.name}
                </h3>
                
                <p className="text-sm text-gray-300 mb-4">
                  {project.description}
                </p>
                
                {/* Tech stack as tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 text-xs font-mono rounded bg-[#1E1E1E] text-[var(--editor-type)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex items-center gap-3 mt-auto">
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1 px-3 py-1 bg-[var(--editor-type)] text-black text-sm font-medium rounded hover:bg-opacity-80 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} />
                      <span>Demo</span>
                    </a>
                  )}
                  
                  {project.repo && (
                    <a 
                      href={project.repo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-[#333] text-white text-sm font-medium rounded hover:bg-[#444] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <div className="text-[var(--editor-comment)] text-lg">// No projects found</div>
            <p className="text-gray-400 mt-2">Projects will appear here once added</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { useContent } from '../contexts/ContentContext';
import TypingEffect from '../components/TypingEffect';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { profile, loading } = useContent();
  
  const heroCode = `
// Welcome to my portfolio
const Developer = {
  name: "${profile?.name || 'Developer Name'}",
  role: "${profile?.role || 'Full Stack Developer'}",
  passion: "Building innovative web solutions",
  skills: [${profile?.skills?.map(skill => `"${skill}"`).join(', ') || '"JavaScript", "React", "Node.js"'}],
  
  sayHello() {
    return "Welcome to my portfolio!";
  }
};

// Feel free to explore my projects
console.log(Developer.sayHello());
`;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--editor-function)]"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-4 md:py-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            <span className="text-[var(--editor-comment)]">// Hello, I'm</span> <br />
            <span className="text-[var(--editor-function)]">{profile?.name || 'Developer Name'}</span>
          </h1>
          
          <div className="text-xl mb-6">
            <TypingEffect 
              sequence={[
                'A Web Developer', 
                2000,
                'A UX Designer', 
                2000,
                `A ${profile?.role || 'Full Stack Developer'}`, 
                4000
              ]}
              className="text-[var(--editor-string)] font-semibold"
            />
          </div>
          
          <p className="mb-6 text-gray-300">
            {profile?.bio || 'Passionate about creating scalable web applications and solving complex problems with clean, elegant code.'}
          </p>
          
          <Link 
            to="/projects" 
            className="inline-flex items-center px-6 py-3 bg-[var(--editor-function)] hover:bg-opacity-80 text-black font-medium rounded transition-all duration-200"
          >
            <span>View Projects</span>
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
        
        <div className="w-full md:w-1/2">
          <CodeBlock code={heroCode} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
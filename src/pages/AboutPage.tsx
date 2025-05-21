import React from 'react';
import CodeBlock from '../components/CodeBlock';
import CodeWindow from '../components/CodeWindow';
import { useContent } from '../contexts/ContentContext';
import { Download } from 'lucide-react';

const AboutPage = () => {
  const { profile, loading } = useContent();
  
  // Create about me code block in JSON format
  const aboutMeCode = `
const aboutMe = {
  name: "${profile?.name || 'Rohan Rajbanshi'}",
  role: "${profile?.role || 'Full Stack Developer'}",
  skills: [
    ${profile?.skills?.map(skill => `"${skill}"`).join(',\n    ') || '"JavaScript", "React", "Node.js"'}
  ],
  bio: \`${profile?.bio || 'Passionate about creating scalable web applications and solving complex problems with clean, elegant code.'}\`,
  experience: [
    {
      position: "junior developer",
      company: "pending.",
      period: "2020 - Present",
      description: "Leading development team on enterprise projects."
    },
    {
      position: "UI/UX designer",
      company: "CODE IT",
      period: "2024 - 2025",
      description: "Created responsive web applications for clients."
    }
  ],
  education: {
    degree: "B.TECH. Computer Science",
    institution: "Nitte Meenakshi Institute of Technology",
    year: 2024-2028
  }
};

export default aboutMe;
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
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        <span className="text-[var(--editor-comment)]">// About Me</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CodeWindow title="about.js">
            <CodeBlock code={aboutMeCode} />
          </CodeWindow>
        </div>
        
        <div className="space-y-6">
          {/* Profile Image */}
          <div className="bg-[#2D2D2D] rounded-md overflow-hidden shadow-md p-4">
            <div className="text-[var(--editor-comment)] text-sm mb-2">// Profile</div>
            <div className="aspect-square relative rounded-md overflow-hidden bg-[#1E1E1E] flex items-center justify-center">
              {profile?.avatarUrl ? (
                <img 
                  src={profile.avatarUrl} 
                  alt={profile.name} 
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="text-[var(--editor-comment)] text-center p-4">
                  <div className="border-2 border-dashed border-gray-600 rounded-full w-24 h-24 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-3xl">{profile?.name?.charAt(0) || 'D'}</span>
                  </div>
                  <p className="text-sm">Profile Image</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Resume */}
          <div className="bg-[#2D2D2D] rounded-md overflow-hidden shadow-md p-4">
            <div className="text-[var(--editor-comment)] text-sm mb-2">// Resume</div>
            <a 
              href={profile?.resumeUrl || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-[#1E1E1E] hover:bg-[#333] text-white rounded transition-colors"
            >
              <span>download resume.pdf</span>
              <Download size={18} />
            </a>
          </div>
          
          {/* Social Links */}
          <div className="bg-[#2D2D2D] rounded-md overflow-hidden shadow-md p-4">
            <div className="text-[var(--editor-comment)] text-sm mb-2">// Connect</div>
            <div className="space-y-2 font-mono text-sm">
              {profile?.socialLinks?.github && (
                <a 
                  href={profile.socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-2 bg-[#1E1E1E] hover:bg-[#333] text-[var(--editor-string)] rounded transition-colors"
                >
                  $ open https://github.com/username
                </a>
              )}
              {profile?.socialLinks?.linkedin && (
                <a 
                  href={profile.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-2 bg-[#1E1E1E] hover:bg-[#333] text-[var(--editor-string)] rounded transition-colors"
                >
                  $ open https://linkedin.com/in/username
                </a>
              )}
              {profile?.socialLinks?.twitter && (
                <a 
                  href={profile.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-2 bg-[#1E1E1E] hover:bg-[#333] text-[var(--editor-string)] rounded transition-colors"
                >
                  $ open https://twitter.com/username
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
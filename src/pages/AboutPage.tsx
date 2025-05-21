import React from 'react';
import { Download } from 'lucide-react'; // Assuming Lucide icons for Download

// TypeScript interfaces for props
interface Profile {
  avatarUrl?: string;
  name?: string;
  resumeUrl?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

interface AboutPageProps {
  loading?: boolean;
  profile?: Profile;
  aboutMeCode?: string;
}

// Placeholder components (replace with your actual implementations)
const CodeWindow: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#2D2D2D] rounded-md shadow-md p-4">
    <div className="text-[var(--editor-comment)] text-sm mb-2">{title}</div>
    {children}
  </div>
);

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <pre className="bg-[#1E1E1E] p-4 rounded-md text-white">{code}</pre>
);

const AboutPage: React.FC<AboutPageProps> = ({ loading = false, profile = {}, aboutMeCode = '// No code provided' }) => {
  // Fallback profile data
  const defaultProfile: Profile = {
    name: 'User',
    avatarUrl: '',
    resumeUrl: '#',
    socialLinks: {},
  };
  const mergedProfile = { ...defaultProfile, ...profile };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full" aria-label="Loading content">
        <div
          className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--editor-function)]"
          role="status"
        />
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-4 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        <span className="text-[var(--editor-comment)]">// About Me</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Code Window */}
        <div className="md:col-span-2">
          <CodeWindow title="about.js">
            <CodeBlock code={aboutMeCode} />
          </CodeWindow>
        </div>

        {/* Right Section: Profile, Resume, Social Links */}
        <div className="space-y-6">
          {/* Profile Image */}
          <div className="bg-[#2D2D2D] rounded-md overflow-hidden shadow-md p-4">
            <div className="text-[var(--editor-comment)] text-sm mb-2">// Profile</div>
            <div className="aspect-square relative rounded-md overflow-hidden bg-[#1E1E1E] flex items-center justify-center">
              {mergedProfile.avatarUrl ? (
                <img
                  src={mergedProfile.avatarUrl}
                  alt={`${mergedProfile.name}'s profile picture`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              ) : (
                <div className="text-[var(--editor-comment)] text-center p-4">
                  <div className="border-2 border-dashed border-gray-600 rounded-full w-24 h-24 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-3xl">{mergedProfile.name.charAt(0)}</span>
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
              href={mergedProfile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-[#1E1E1E] hover:bg-[#333] text-white rounded transition-colors"
              aria-label="Download resume"
            >
              <span>download resume.pdf</span>
              <Download size={18} aria-hidden="true" />
            </a>
          </div>

          {/* Social Links */}
          <div className="bg-[#2D2D2D] rounded-md overflow-hidden shadow-md p-4">
            <div className="text-[var(--editor-comment)] text-sm mb-2">// Connect</div>
            <div className="space-y-2 font-mono text-sm">
              {mergedProfile.socialLinks?.github && (
                <a
                  href={mergedProfile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 bg-[#1E1E1E] hover:bg-[#333] text-[var(--editor-string)] rounded transition-colors"
                  aria-label="Visit GitHub profile"
                >
                  $ open https://github.com/{mergedProfile.name}
                </a>
              )}
              {mergedProfile.socialLinks?.linkedin && (
                <a
                  href={mergedProfile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 bg-[#1E1E1E] hover:bg-[#333] text-[var(--editor-string)] rounded transition-colors"
                  aria-label="Visit LinkedIn profile"
                >
                  $ open https://linkedin.com/in/{mergedProfile.name}
                </a>
              )}
              {mergedProfile.socialLinks?.twitter && (
                <a
                  href={mergedProfile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 bg-[#1E1E1E] hover:bg-[#333] text-[var(--editor-string)] rounded transition-colors"
                  aria-label="Visit Twitter profile"
                >
                  $ open https://twitter.com/{mergedProfile.name}
                </a>
              )}
              {!mergedProfile.socialLinks?.github &&
                !mergedProfile.socialLinks?.linkedin &&
                !mergedProfile.socialLinks?.twitter && (
                  <p className="text-[var(--editor-comment)] text-sm">
                    // No social links provided
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
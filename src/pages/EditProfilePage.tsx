import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import CodeWindow from '../components/CodeWindow';
import CodeBlock from '../components/CodeBlock';

const EditProfilePage = () => {
  const { profile, updateProfile, loading } = useContent();
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    role: profile?.role || '',
    bio: profile?.bio || '',
    skills: profile?.skills?.join(', ') || '',
    avatarUrl: profile?.avatarUrl || '',
    resumeUrl: profile?.resumeUrl || '',
    socialLinks: {
      github: profile?.socialLinks?.github || '',
      linkedin: profile?.socialLinks?.linkedin || '',
      twitter: profile?.socialLinks?.twitter || '',
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Convert skills string to array
      const skillsArray = formData.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill !== '');
      
      await updateProfile({
        name: formData.name,
        role: formData.role,
        bio: formData.bio,
        skills: skillsArray,
        avatarUrl: formData.avatarUrl,
        resumeUrl: formData.resumeUrl,
        socialLinks: formData.socialLinks,
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--editor-function)]"></div>
      </div>
    );
  }

  const profileCode = `
// Current profile data
const profile = {
  name: "${profile?.name || 'Developer Name'}",
  role: "${profile?.role || 'Full Stack Developer'}",
  bio: \`${profile?.bio || 'Developer bio goes here...'}\`,
  skills: [${profile?.skills?.map(skill => `"${skill}"`).join(', ') || ''}],
  socialLinks: {
    github: "${profile?.socialLinks?.github || ''}",
    linkedin: "${profile?.socialLinks?.linkedin || ''}",
    twitter: "${profile?.socialLinks?.twitter || ''}"
  }
};

// Edit this data in the form below
export default profile;
`;

  return (
    <div className="container max-w-5xl mx-auto px-4 py-4 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        <span className="text-[var(--editor-comment)]">// Edit Profile</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <CodeWindow title="profile.js">
            <CodeBlock code={profileCode} />
          </CodeWindow>
        </div>
        
        <div>
          <CodeWindow title="editProfile.js">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-[#1E1E1E] border-l-4 border-red-500 text-red-400">
                  <span className="code-comment">// {error}</span>
                </div>
              )}
              
              {success && (
                <div className="p-3 bg-[#1E1E1E] border-l-4 border-green-500 text-green-400">
                  <span className="code-comment">// Profile updated successfully!</span>
                </div>
              )}
              
              <div>
                <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                  name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="terminal-input w-full"
                  placeholder="Your Name"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                  role:
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="terminal-input w-full"
                  placeholder="Full Stack Developer"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                  bio:
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="terminal-input w-full min-h-[100px]"
                  placeholder="Write a short bio about yourself..."
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                  skills: <span className="text-[var(--editor-comment)]">// Comma separated</span>
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="terminal-input w-full"
                  placeholder="JavaScript, React, Node.js"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                  avatarUrl:
                </label>
                <input
                  type="text"
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleChange}
                  className="terminal-input w-full"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                  resumeUrl:
                </label>
                <input
                  type="text"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  className="terminal-input w-full"
                  placeholder="https://example.com/resume.pdf"
                />
              </div>
              
              <div className="p-3 bg-[#1E1E1E] rounded">
                <label className="block mb-2 text-sm text-[var(--editor-variable)]">
                  socialLinks:
                </label>
                
                <div className="ml-4 space-y-3">
                  <div>
                    <label className="block mb-1 text-xs text-[var(--editor-variable)]">
                      github:
                    </label>
                    <input
                      type="text"
                      name="socialLinks.github"
                      value={formData.socialLinks.github}
                      onChange={handleChange}
                      className="terminal-input w-full text-sm"
                      placeholder="https://github.com/username"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-xs text-[var(--editor-variable)]">
                      linkedin:
                    </label>
                    <input
                      type="text"
                      name="socialLinks.linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleChange}
                      className="terminal-input w-full text-sm"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-xs text-[var(--editor-variable)]">
                      twitter:
                    </label>
                    <input
                      type="text"
                      name="socialLinks.twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleChange}
                      className="terminal-input w-full text-sm"
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="terminal-button w-full"
                >
                  {isSubmitting ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </CodeWindow>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
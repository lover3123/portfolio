import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import CodeWindow from '../components/CodeWindow';

const EditContactPage = () => {
  const { contactInfo, updateContactInfo, loading } = useContent();
  const [formData, setFormData] = useState({
    email: contactInfo?.email || '',
    phone: contactInfo?.phone || '',
    location: contactInfo?.location || '',
    socialLinks: {
      github: contactInfo?.socialLinks?.github || '',
      linkedin: contactInfo?.socialLinks?.linkedin || '',
      twitter: contactInfo?.socialLinks?.twitter || '',
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
      await updateContactInfo({
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        socialLinks: formData.socialLinks,
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating contact info:', err);
      setError('Failed to update contact info. Please try again.');
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

  return (
    <div className="container max-w-5xl mx-auto px-4 py-4 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        <span className="text-[var(--editor-comment)]">// Edit Contact Information</span>
      </h1>
      
      <CodeWindow title="contactInfo.js">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-[#1E1E1E] border-l-4 border-red-500 text-red-400">
              <span className="code-comment">// {error}</span>
            </div>
          )}
          
          {success && (
            <div className="p-3 bg-[#1E1E1E] border-l-4 border-green-500 text-green-400">
              <span className="code-comment">// Contact information updated successfully!</span>
            </div>
          )}
          
          <div>
            <label className="block mb-1 text-sm text-[var(--editor-variable)]">
              email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="terminal-input w-full"
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm text-[var(--editor-variable)]">
              phone: <span className="text-[var(--editor-comment)]">// Optional</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="terminal-input w-full"
              placeholder="+1 (123) 456-7890"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm text-[var(--editor-variable)]">
              location: <span className="text-[var(--editor-comment)]">// Optional</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="terminal-input w-full"
              placeholder="San Francisco, CA"
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
              {isSubmitting ? 'Updating...' : 'Update Contact Info'}
            </button>
          </div>
        </form>
      </CodeWindow>
    </div>
  );
};

export default EditContactPage;
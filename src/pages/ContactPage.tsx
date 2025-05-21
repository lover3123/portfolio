import React, { useState } from 'react';
import CodeWindow from '../components/CodeWindow';
import Terminal from '../components/Terminal';
import { useContent } from '../contexts/ContentContext';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const { contactInfo, loading } = useContent();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting } 
  } = useForm<ContactFormInputs>();
  
  const onSubmit = async (data: ContactFormInputs) => {
    try {
      // In a real app, you would send this data to your backend/email service
      console.log('Contact form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormSubmitted(true);
      setFormError(null);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError('Something went wrong. Please try again.');
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
        <span className="text-[var(--editor-comment)]">// Contact Me</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <CodeWindow title="contact.js">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-[var(--editor-variable)]" htmlFor="name">
                  <span className="code-keyword">const</span> name = <span className="code-function">input</span>(<span className="code-string">"Your Name"</span>);
                </label>
                <input
                  id="name"
                  type="text"
                  className="terminal-input w-full"
                  placeholder="John Doe"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    <span className="code-comment">// {errors.name.message}</span>
                  </p>
                )}
              </div>
              
              <div>
                <label className="block mb-1 text-sm text-[var(--editor-variable)]" htmlFor="email">
                  <span className="code-keyword">const</span> email = <span className="code-function">input</span>(<span className="code-string">"Your Email"</span>);
                </label>
                <input
                  id="email"
                  type="email"
                  className="terminal-input w-full"
                  placeholder="example@example.com"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    <span className="code-comment">// {errors.email.message}</span>
                  </p>
                )}
              </div>
              
              <div>
                <label className="block mb-1 text-sm text-[var(--editor-variable)]" htmlFor="message">
                  <span className="code-keyword">const</span> message = <span className="code-function">textarea</span>(<span className="code-string">"Your Message"</span>);
                </label>
                <textarea
                  id="message"
                  className="terminal-input w-full min-h-[120px]"
                  placeholder="Hello, I'd like to discuss a project..."
                  {...register('message', { required: 'Message is required' })}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    <span className="code-comment">// {errors.message.message}</span>
                  </p>
                )}
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="terminal-button w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Processing</span>
                      <span className="animate-blink ml-1">_</span>
                    </>
                  ) : (
                    <>
                      <span className="code-function">submit</span>
                      (<span className="code-variable">contactForm</span>);
                    </>
                  )}
                </button>
              </div>
              
              {formSubmitted && (
                <div className="mt-4 p-3 bg-[#1E1E1E] border-l-4 border-green-500 text-green-400">
                  <span className="code-comment">// Message sent successfully!</span>
                </div>
              )}
              
              {formError && (
                <div className="mt-4 p-3 bg-[#1E1E1E] border-l-4 border-red-500 text-red-400">
                  <span className="code-comment">// {formError}</span>
                </div>
              )}
            </form>
          </CodeWindow>
        </div>
        
        <div className="space-y-6">
          <div className="bg-[#2D2D2D] rounded-md shadow-md p-4">
            <div className="text-[var(--editor-comment)] text-sm mb-2">// Contact Info</div>
            <Terminal welcomeMessage="Connect with me via:">
              {contactInfo?.email && (
                <div className="mb-1">
                  <span className="text-blue-400">$ </span>
                  <span className="text-[var(--editor-string)]">echo {contactInfo.email}</span>
                </div>
              )}
              {contactInfo?.phone && (
                <div className="mb-1">
                  <span className="text-blue-400">$ </span>
                  <span className="text-[var(--editor-string)]">echo {contactInfo.phone}</span>
                </div>
              )}
              {contactInfo?.location && (
                <div className="mb-1">
                  <span className="text-blue-400">$ </span>
                  <span className="text-[var(--editor-string)]">echo "{contactInfo.location}"</span>
                </div>
              )}
            </Terminal>
          </div>
          
          <div className="bg-[#2D2D2D] rounded-md shadow-md p-4">
            <div className="text-[var(--editor-comment)] text-sm mb-2">// Social Links</div>
            <div className="space-y-2 font-mono text-sm">
              {contactInfo?.socialLinks?.github && (
                <a 
                  href={contactInfo.socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-[#1E1E1E] hover:bg-[#333] text-white rounded transition-colors"
                >
                  <Github size={18} className="text-[var(--editor-variable)]" />
                  <span className="text-[var(--editor-string)]">github.com/username</span>
                </a>
              )}
              {contactInfo?.socialLinks?.linkedin && (
                <a 
                  href={contactInfo.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-[#1E1E1E] hover:bg-[#333] text-white rounded transition-colors"
                >
                  <Linkedin size={18} className="text-[var(--editor-variable)]" />
                  <span className="text-[var(--editor-string)]">linkedin.com/in/username</span>
                </a>
              )}
              {contactInfo?.socialLinks?.twitter && (
                <a 
                  href={contactInfo.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-[#1E1E1E] hover:bg-[#333] text-white rounded transition-colors"
                >
                  <Twitter size={18} className="text-[var(--editor-variable)]" />
                  <span className="text-[var(--editor-string)]">twitter.com/username</span>
                </a>
              )}
              {contactInfo?.email && (
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 p-2 bg-[#1E1E1E] hover:bg-[#333] text-white rounded transition-colors"
                >
                  <Mail size={18} className="text-[var(--editor-variable)]" />
                  <span className="text-[var(--editor-string)]">{contactInfo.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
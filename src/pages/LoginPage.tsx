import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CodeWindow from '../components/CodeWindow';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/edit/profile');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        <span className="text-[var(--editor-comment)]">// Admin Login</span>
      </h1>
      
      <CodeWindow title="login.js">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-[#1E1E1E] border-l-4 border-red-500 text-red-400 mb-4">
              <span className="code-comment">// {error}</span>
            </div>
          )}
          
          <div>
            <label className="block mb-1 text-sm text-[var(--editor-variable)]" htmlFor="email">
              <span className="code-keyword">const</span> email = <span className="code-function">input</span>(<span className="code-string">"Admin Email"</span>);
            </label>
            <input
              id="email"
              type="email"
              className="terminal-input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm text-[var(--editor-variable)]" htmlFor="password">
              <span className="code-keyword">const</span> password = <span className="code-function">input</span>(<span className="code-string">"Password"</span>, <span className="code-string">"password"</span>);
            </label>
            <input
              id="password"
              type="password"
              className="terminal-input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="terminal-button w-full flex items-center justify-center"
            >
              {loading ? (
                <>
                  <span className="animate-pulse">Authenticating</span>
                  <span className="animate-blink ml-1">_</span>
                </>
              ) : (
                <>
                  <span className="code-function">authenticate</span>
                  (<span className="code-variable">login</span>);
                </>
              )}
            </button>
          </div>
        </form>
      </CodeWindow>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>// Use your admin credentials to access edit mode</p>
      </div>
    </div>
  );
};

export default LoginPage;
import React from 'react';
import CodeWindow from '../components/CodeWindow';
import CodeBlock from '../components/CodeBlock';
import { useContent } from '../contexts/ContentContext';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const { services, loading } = useContent();
  
  // Generate services code in JSON format
  const servicesCode = `
const services = [
  ${services.map(service => `{
    id: "${service.id}",
    title: "${service.title}",
    description: "${service.description}"
  }`).join(',\n  ')}
];

// Specialized expertise for your projects
export default services;
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
        <span className="text-[var(--editor-comment)]">// Services</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CodeWindow title="services.js">
            <CodeBlock 
              code={services.length > 0 ? servicesCode : '// No services available yet'}
            />
          </CodeWindow>
        </div>
        
        <div className="space-y-6">
          <div className="bg-[#2D2D2D] rounded-md shadow-md p-4">
            <div className="text-[var(--editor-comment)] text-sm mb-2">// Services Offered</div>
            
            {services.length > 0 ? (
              <div className="space-y-3 font-mono text-sm">
                {services.map((service) => (
                  <div key={service.id} className="p-3 bg-[#1E1E1E] rounded">
                    <div className="text-[var(--editor-function)] font-semibold mb-1">
                      {service.title}
                    </div>
                    <div className="text-gray-300 text-xs">
                      {service.description}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-[#1E1E1E] text-[var(--editor-comment)] rounded">
                No services defined yet
              </div>
            )}
          </div>
          
          <div className="bg-[#2D2D2D] rounded-md shadow-md p-4">
            <div className="text-[var(--editor-comment)] text-sm mb-2">// Need a service?</div>
            <Link
              to="/contact"
              className="block w-full p-3 bg-[var(--editor-function)] text-black text-center font-medium rounded hover:bg-opacity-80 transition-colors"
            >
              $ contact --help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
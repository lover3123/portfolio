import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import CodeWindow from '../components/CodeWindow';
import { Trash2, Plus } from 'lucide-react';

const EditServicesPage = () => {
  const { services, addService, updateService, deleteService, loading } = useContent();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    icon: '',
    order: 0,
  });

  const handleNewServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (id: string, field: string, value: string) => {
    const service = services.find((s) => s.id === id);
    if (service) {
      updateService(id, { [field]: value });
    }
  };

  const handleSubmitNewService = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await addService({
        title: newService.title,
        description: newService.description,
        icon: newService.icon,
        order: services.length + 1,
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      // Reset form
      setNewService({
        title: '',
        description: '',
        icon: '',
        order: 0,
      });
      
      setShowNewServiceForm(false);
    } catch (err) {
      console.error('Error adding service:', err);
      setError('Failed to add service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
      } catch (err) {
        console.error('Error deleting service:', err);
        setError('Failed to delete service. Please try again.');
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
          <span className="text-[var(--editor-comment)]">// Edit Services</span>
        </h1>
        
        <button
          onClick={() => setShowNewServiceForm(!showNewServiceForm)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--editor-type)] text-black rounded hover:bg-opacity-80 transition-colors"
        >
          <Plus size={16} />
          <span>{showNewServiceForm ? 'Cancel' : 'New Service'}</span>
        </button>
      </div>
      
      {error && (
        <div className="p-3 bg-[#1E1E1E] border-l-4 border-red-500 text-red-400 mb-4">
          <span className="code-comment">// {error}</span>
        </div>
      )}
      
      {success && (
        <div className="p-3 bg-[#1E1E1E] border-l-4 border-green-500 text-green-400 mb-4">
          <span className="code-comment">// Service saved successfully!</span>
        </div>
      )}
      
      {/* New Service Form */}
      {showNewServiceForm && (
        <CodeWindow title="newService.js">
          <form onSubmit={handleSubmitNewService} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                title:
              </label>
              <input
                type="text"
                name="title"
                value={newService.title}
                onChange={handleNewServiceChange}
                className="terminal-input w-full"
                placeholder="Service Title"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                description:
              </label>
              <textarea
                name="description"
                value={newService.description}
                onChange={handleNewServiceChange}
                className="terminal-input w-full min-h-[80px]"
                placeholder="Service description..."
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                icon: <span className="text-[var(--editor-comment)]">// Lucide icon name</span>
              </label>
              <input
                type="text"
                name="icon"
                value={newService.icon}
                onChange={handleNewServiceChange}
                className="terminal-input w-full"
                placeholder="Code, Database, Server, etc."
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="terminal-button w-full"
              >
                {isSubmitting ? 'Adding...' : 'Add Service'}
              </button>
            </div>
          </form>
        </CodeWindow>
      )}
      
      {/* Existing Services */}
      <div className="space-y-6 mt-6">
        {services.length > 0 ? (
          services.map((service) => (
            <CodeWindow 
              key={service.id} 
              title={`${service.title.toLowerCase().replace(/\s+/g, '-')}.js`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                      title:
                    </label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                      className="terminal-input w-full"
                      placeholder="Service Title"
                    />
                  </div>
                  
                  <button 
                    onClick={() => handleDeleteService(service.id)}
                    className="ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                    description:
                  </label>
                  <textarea
                    value={service.description}
                    onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                    className="terminal-input w-full min-h-[80px]"
                    placeholder="Service description..."
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm text-[var(--editor-variable)]">
                    icon: <span className="text-[var(--editor-comment)]">// Lucide icon name</span>
                  </label>
                  <input
                    type="text"
                    value={service.icon}
                    onChange={(e) => handleServiceChange(service.id, 'icon', e.target.value)}
                    className="terminal-input w-full"
                    placeholder="Code, Database, Server, etc."
                  />
                </div>
              </div>
            </CodeWindow>
          ))
        ) : (
          <div className="bg-[#2D2D2D] rounded-md p-6 text-center">
            <p className="text-[var(--editor-comment)]">// No services found</p>
            <p className="text-gray-400 mt-2">Add your first service using the "New Service" button</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditServicesPage;
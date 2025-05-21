import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  Briefcase, 
  Code, 
  Mail, 
  LogIn, 
  LogOut, 
  Menu, 
  X, 
  Settings, 
  FileEdit,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Close sidebar on navigation for mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--editor-bg)]">
      {/* Mobile sidebar toggle */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-[#333] p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar - like VS Code's explorer */}
      <div 
        className={`fixed md:static left-0 top-0 h-full z-40 bg-[#252526] w-64 transition-transform duration-300 shadow-xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Explorer header */}
          <div className="border-b border-gray-700 px-4 py-3 font-bold text-white flex items-center">
            <Code className="mr-2" size={18} />
            <span>EXPLORER</span>
          </div>
          
          {/* Directory structure */}
          <div className="p-2 font-semibold text-sm text-gray-400 flex items-center">
            <ChevronRight size={18} className="transform rotate-90" />
            <span>PORTFOLIO</span>
          </div>
          
          {/* Navigation links styled as files */}
          <nav className="flex-1 overflow-y-auto text-sm">
            <NavLink to="/" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
              <Home size={18} className="mr-2" /> index.js
            </NavLink>
            <NavLink to="/about" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
              <User size={18} className="mr-2" /> about.js
            </NavLink>
            <NavLink to="/projects" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
              <Code size={18} className="mr-2" /> projects.js
            </NavLink>
            <NavLink to="/services" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
              <Briefcase size={18} className="mr-2" /> services.js
            </NavLink>
            <NavLink to="/contact" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
              <Mail size={18} className="mr-2" /> contact.js
            </NavLink>
            
            {/* Authentication links */}
            {!currentUser ? (
              <NavLink to="/login" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
                <LogIn size={18} className="mr-2" /> login.js
              </NavLink>
            ) : (
              <>
                {/* Admin section */}
                <div className="mt-4 p-2 font-semibold text-sm text-gray-400 flex items-center">
                  <ChevronRight size={18} className="transform rotate-90" />
                  <span>ADMIN</span>
                </div>
                
                <NavLink to="/edit/profile" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
                  <FileEdit size={18} className="mr-2" /> profile.js
                </NavLink>
                <NavLink to="/edit/projects" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
                  <FileEdit size={18} className="mr-2" /> projects.js
                </NavLink>
                <NavLink to="/edit/services" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
                  <FileEdit size={18} className="mr-2" /> services.js
                </NavLink>
                <NavLink to="/edit/contact" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
                  <FileEdit size={18} className="mr-2" /> contact.js
                </NavLink>
                
                <button 
                  onClick={handleLogout}
                  className="sidebar-item"
                >
                  <LogOut size={18} className="mr-2" /> logout.js
                </button>
              </>
            )}
          </nav>
          
          {/* Footer */}
          <div className="border-t border-gray-700 p-2 text-xs text-gray-500">
            <div className="flex items-center">
              <Settings size={14} className="mr-1" />
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Tab bar (like editor tabs) */}
        <div className="bg-[#252526] border-b border-gray-700 flex items-center h-9 overflow-x-auto">
          <div className="px-4 py-1 bg-[#1E1E1E] text-white border-r border-gray-700 flex items-center">
            {(() => {
              // Determine which "file" is open based on path
              const path = location.pathname;
              if (path === '/') return <><Home size={14} className="mr-1" /> index.js</>;
              if (path === '/about') return <><User size={14} className="mr-1" /> about.js</>;
              if (path === '/projects') return <><Code size={14} className="mr-1" /> projects.js</>;
              if (path === '/services') return <><Briefcase size={14} className="mr-1" /> services.js</>;
              if (path === '/contact') return <><Mail size={14} className="mr-1" /> contact.js</>;
              if (path === '/login') return <><LogIn size={14} className="mr-1" /> login.js</>;
              if (path.includes('/edit')) return <><FileEdit size={14} className="mr-1" /> {path.split('/').pop()}.js</>;
              return 'file.js';
            })()}
          </div>
        </div>
        
        {/* Content area with code editor styling */}
        <div className="flex-1 overflow-y-auto p-0 md:p-4 bg-[var(--editor-bg)]">
          <Outlet />
        </div>
        
        {/* Status bar */}
        <div className="bg-[#007ACC] text-white text-xs px-4 py-1 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Ln 1, Col 1</span>
            <span>UTF-8</span>
          </div>
          <div>
            {currentUser ? 'Logged in • Edit Mode Available' : 'Read Only'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
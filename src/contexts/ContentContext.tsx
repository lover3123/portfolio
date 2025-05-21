import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

// Types for our data
export interface Profile {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  avatarUrl: string;
  resumeUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    [key: string]: string;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  demo: string;
  repo: string;
  imageUrl: string;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    [key: string]: string;
  };
}

interface ContentContextType {
  profile: Profile | null;
  projects: Project[];
  services: Service[];
  contactInfo: ContactInfo | null;
  loading: boolean;
  isOnline: boolean;
  error: string | null;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  addProject: (project: Omit<Project, 'id'>) => Promise<string>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addService: (service: Omit<Service, 'id'>) => Promise<string>;
  updateService: (id: string, data: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  updateContactInfo: (data: Partial<ContactInfo>) => Promise<void>;
  retryFetch: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setError(null);
      fetchData(); // Retry fetching when coming back online
    };

    const handleOffline = () => {
      setIsOnline(false);
      setError('You are currently offline. Please check your internet connection.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch data function
  const fetchData = async () => {
    if (!navigator.onLine) {
      setError('You are currently offline. Please check your internet connection.');
      setLoading(false);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Fetch profile
      const profileDoc = await getDoc(doc(db, 'content', 'profile'));
      if (profileDoc.exists()) {
        setProfile(profileDoc.data() as Profile);
      }

      // Fetch projects
      const projectsQuery = query(collection(db, 'projects'), orderBy('order'));
      const projectsSnapshot = await getDocs(projectsQuery);
      const projectsList: Project[] = [];
      projectsSnapshot.forEach((doc) => {
        projectsList.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(projectsList);

      // Fetch services
      const servicesQuery = query(collection(db, 'services'), orderBy('order'));
      const servicesSnapshot = await getDocs(servicesQuery);
      const servicesList: Service[] = [];
      servicesSnapshot.forEach((doc) => {
        servicesList.push({ id: doc.id, ...doc.data() } as Service);
      });
      setServices(servicesList);

      // Fetch contact info
      const contactDoc = await getDoc(doc(db, 'content', 'contact'));
      if (contactDoc.exists()) {
        setContactInfo(contactDoc.data() as ContactInfo);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      setError('Failed to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchData();
  }, []);

  // Retry function for manual refresh
  const retryFetch = async () => {
    if (!navigator.onLine) {
      setError('Still offline. Please check your internet connection.');
      return;
    }
    await fetchData();
  };

  // Update functions
  const updateProfile = async (data: Partial<Profile>) => {
    if (!currentUser) throw new Error('Not authenticated');
    if (!navigator.onLine) throw new Error('You are currently offline');
    
    try {
      const profileRef = doc(db, 'content', 'profile');
      const profileDoc = await getDoc(profileRef);
      
      if (profileDoc.exists()) {
        await updateDoc(profileRef, data);
        setProfile(prev => prev ? { ...prev, ...data } : null);
      } else {
        await setDoc(profileRef, data);
        setProfile(data as Profile);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    if (!currentUser) throw new Error('Not authenticated');
    if (!navigator.onLine) throw new Error('You are currently offline');
    
    try {
      const newProjectRef = doc(collection(db, 'projects'));
      await setDoc(newProjectRef, project);
      
      const newProject = { id: newProjectRef.id, ...project };
      setProjects(prev => [...prev, newProject]);
      
      return newProjectRef.id;
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    if (!currentUser) throw new Error('Not authenticated');
    if (!navigator.onLine) throw new Error('You are currently offline');
    
    try {
      const projectRef = doc(db, 'projects', id);
      await updateDoc(projectRef, data);
      
      setProjects(prev => 
        prev.map(project => 
          project.id === id ? { ...project, ...data } : project
        )
      );
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    if (!currentUser) throw new Error('Not authenticated');
    if (!navigator.onLine) throw new Error('You are currently offline');
    
    try {
      await deleteDoc(doc(db, 'projects', id));
      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    if (!currentUser) throw new Error('Not authenticated');
    if (!navigator.onLine) throw new Error('You are currently offline');
    
    try {
      const newServiceRef = doc(collection(db, 'services'));
      await setDoc(newServiceRef, service);
      
      const newService = { id: newServiceRef.id, ...service };
      setServices(prev => [...prev, newService]);
      
      return newServiceRef.id;
    } catch (error) {
      console.error("Error adding service:", error);
      throw error;
    }
  };

  const updateService = async (id: string, data: Partial<Service>) => {
    if (!currentUser) throw new Error('Not authenticated');
    if (!navigator.onLine) throw new Error('You are currently offline');
    
    try {
      const serviceRef = doc(db, 'services', id);
      await updateDoc(serviceRef, data);
      
      setServices(prev => 
        prev.map(service => 
          service.id === id ? { ...service, ...data } : service
        )
      );
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  };

  const deleteService = async (id: string) => {
    if (!currentUser) throw new Error('Not authenticated');
    if (!navigator.onLine) throw new Error('You are currently offline');
    
    try {
      await deleteDoc(doc(db, 'services', id));
      setServices(prev => prev.filter(service => service.id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error;
    }
  };

  const updateContactInfo = async (data: Partial<ContactInfo>) => {
    if (!currentUser) throw new Error('Not authenticated');
    if (!navigator.onLine) throw new Error('You are currently offline');
    
    try {
      const contactRef = doc(db, 'content', 'contact');
      const contactDoc = await getDoc(contactRef);
      
      if (contactDoc.exists()) {
        await updateDoc(contactRef, data);
        setContactInfo(prev => prev ? { ...prev, ...data } : null);
      } else {
        await setDoc(contactRef, data);
        setContactInfo(data as ContactInfo);
      }
    } catch (error) {
      console.error("Error updating contact info:", error);
      throw error;
    }
  };

  const value = {
    profile,
    projects,
    services,
    contactInfo,
    loading,
    isOnline,
    error,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
    updateContactInfo,
    retryFetch
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
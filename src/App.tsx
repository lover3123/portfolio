import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import EditProfilePage from './pages/EditProfilePage';
import EditProjectsPage from './pages/EditProjectsPage';
import EditServicesPage from './pages/EditServicesPage';
import EditContactPage from './pages/EditContactPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        
        {/* Protected routes for editing */}
        <Route path="edit" element={<ProtectedRoute />}>
          <Route path="profile" element={<EditProfilePage />} />
          <Route path="projects" element={<EditProjectsPage />} />
          <Route path="services" element={<EditServicesPage />} />
          <Route path="contact" element={<EditContactPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
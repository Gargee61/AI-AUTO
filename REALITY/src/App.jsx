import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import LeadsAnalytics from './pages/LeadsAnalytics';
import SiteVisits from './pages/SiteVisits';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simple entrance delay for glassmorphic effect
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'projects': return <Projects />;
      case 'leads': return <LeadsAnalytics />;
      case 'visits': return <SiteVisits />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`app-container ${isLoaded ? 'loaded' : ''}`} style={{ display: 'flex', minHeight: '100vh', opacity: isLoaded ? 1 : 0, transition: 'opacity 0.8s ease' }}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header />
        <div className="content-area" style={{ flex: 1 }}>
          {renderPage()}
        </div>
      </main>

      {/* Decorative Background Shapes */}
      <div className="bg-decoration" style={{
        position: 'fixed', zIndex: -1, top: '20%', left: '80%',
        width: '100px', height: '100px',
        background: 'linear-gradient(135deg, var(--pivot-blue-light), transparent)',
        clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
        filter: 'blur(20px)', opacity: 0.2
      }}></div>
    </div>
  );
}

export default App;

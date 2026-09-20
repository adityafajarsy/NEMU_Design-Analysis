import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { AnalysisProvider, useAnalysis } from './context/AnalysisContext';
import { LandingPage } from './pages/LandingPage';
import { InspectorPage } from './pages/InspectorPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProgressiveAuthModal } from './components/auth/ProgressiveAuthModal';
import { AuthenticateWithRedirectCallback } from '@clerk/react';
import { api } from './services/api';

const MainRouter = () => {
  const [view, setView] = useState('landing'); // 'landing' | 'dashboard' | 'inspector'
  const { setActiveAnalysis, activeAnalysis } = useAnalysis();

  // Handle URL navigation and browser back button
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const match = path.match(/^\/analyze\/(.+)/);
      if (match && match[1]) {
        const id = match[1];
        if (id !== 'pending-scan') {
          api.getAnalysis(id).then(res => {
            if (res?.analysis) {
              setActiveAnalysis(res.analysis);
            }
          }).catch(err => console.warn('Could not auto-load analysis by URL:', err));
        }
        setView('inspector');
      } else if (path === '/dashboard') {
        setView('dashboard');
      } else {
        setView('landing');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setActiveAnalysis]);

  const navigateTo = (newView, url = null) => {
    setView(newView);
    const targetUrl = url || (newView === 'landing' ? '/' : `/${newView}`);
    window.history.pushState({}, '', targetUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInspect = async (id) => {
    try {
      if (id === 'pending-scan' || (activeAnalysis && (activeAnalysis._id === id || activeAnalysis.slug === id))) {
        navigateTo('inspector', `/analyze/${id}`);
        return;
      }
      const res = await api.getAnalysis(id);
      if (res?.analysis) {
        setActiveAnalysis(res.analysis);
        navigateTo('inspector', `/analyze/${id}`);
      }
    } catch (err) {
      console.error('Failed to load reference for inspector:', err);
    }
  };

  if (window.location.pathname === '/sso-callback') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#0789D8] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-[#7C8387]">Menyambungkan akun Google...</p>
        </div>
        <AuthenticateWithRedirectCallback />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#111111] antialiased">
      {view === 'landing' && (
        <LandingPage
          onInspect={handleInspect}
          onNavigate={navigateTo}
        />
      )}

      {view === 'dashboard' && (
        <DashboardPage
          onInspect={handleInspect}
          onNavigate={navigateTo}
        />
      )}

      {view === 'inspector' && (
        <InspectorPage
          onBack={() => navigateTo('dashboard')}
          onNavigate={navigateTo}
        />
      )}

      {/* Global Progressive Auth Modal */}
      <ProgressiveAuthModal />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AnalysisProvider>
          <MainRouter />
        </AnalysisProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

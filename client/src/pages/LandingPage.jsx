import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { BrandStrip } from '../components/landing/BrandStrip';
import { AboutSection } from '../components/landing/AboutSection';
import { FeatureGrid } from '../components/landing/FeatureGrid';
import { FinalCTA } from '../components/landing/FinalCTA';
import { Footer } from '../components/layout/Footer';
import { useAnalysis } from '../context/AnalysisContext';

export const LandingPage = ({ onInspect, onNavigate }) => {
  const { loadDemo } = useAnalysis();

  const handleTrySample = async (slug) => {
    const analysis = await loadDemo(slug);
    if (analysis) onInspect(analysis._id);
  };

  const handleTriggerUpload = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section with Atmospheric Sky and Floating Orbiting Cards */}
      <div 
        className="hero-clouds-bg relative overflow-hidden"
        style={{ backgroundImage: "url('/hero-img.webp')" }}
      >
        <Navbar variant="hero" onNavigate={onNavigate} currentView="landing" />
        <HeroSection onInspect={onInspect} />
      </div>

      {/* Used by creatives at Spotify, Adobe, Figma... */}
      <BrandStrip />

      {/* About NEMU + Bento Box Showcase */}
      <AboutSection onTrySample={handleTrySample} />

      {/* 4 Core Dimensions of Visual DNA */}
      <FeatureGrid onTrySample={handleTrySample} />

      {/* High-conversion closing banner */}
      <FinalCTA onNavigate={onNavigate} onTriggerUpload={handleTriggerUpload} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

const AnalysisContext = createContext(null);

export const AnalysisProvider = ({ children }) => {
  const [activeAnalysis, setActiveAnalysisState] = useState(() => {
    try {
      const cached = sessionStorage.getItem('nemu_active_analysis');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const setActiveAnalysis = useCallback((val) => {
    setActiveAnalysisState(val);
    try {
      if (val && !val.isPending) {
        sessionStorage.setItem('nemu_active_analysis', JSON.stringify(val));
      } else if (!val) {
        sessionStorage.removeItem('nemu_active_analysis');
      }
    } catch {}
  }, []);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0); // 1..5
  const [guestScansLeft, setGuestScansLeft] = useState(2);
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(false);

  const { addToast } = useToast();
  const { openAuthModal, user, setCredits, credits, isGuest } = useAuth();

  const loadRecent = useCallback(async (query = '') => {
    try {
      setLoadingRecent(true);
      const res = await api.getRecent(query);
      if (res?.analyses) {
        setRecentAnalyses(res.analyses);
      }
    } catch (err) {
      console.warn('Failed to load recent analyses:', err);
    } finally {
      setLoadingRecent(false);
    }
  }, []);

  useEffect(() => {
    loadRecent();
  }, [loadRecent, user]);

  const loadDemo = async (slug) => {
    try {
      setIsAnalyzing(true);
      setAnalysisStep(1);
      
      const res = await api.getDemo(slug);
      
      if (res?.analysis) {
        setActiveAnalysis(res.analysis);
      }

      setIsAnalyzing(false);
      setAnalysisStep(0);
      return res?.analysis;
    } catch (err) {
      setIsAnalyzing(false);
      setAnalysisStep(0);
      addToast({
        title: 'Demo load failed',
        description: err.message,
        type: 'error'
      });
      throw err;
    }
  };

  // Step 1: Check credits from server. Returns true if upload is allowed, false if blocked.
  // Call this BEFORE navigating so we don't navigate when quota is exceeded.
  const canUpload = async () => {
    try {
      const meRes = await api.getMe();
      const serverCredits = meRes?.credits !== undefined ? meRes.credits : credits;
      const isUserLoggedIn = Boolean(meRes?.user || user || !isGuest);
      setCredits(serverCredits);
      if (serverCredits <= 0) {
        if (!isUserLoggedIn) {
          openAuthModal('register');
          addToast({
            title: 'Batas Kuota Tamu',
            description: 'Kuota tamu kamu habis. Buat akun gratis sekarang untuk dapat +2 kredit ekstra & simpan riwayat!',
            type: 'info',
            duration: 7000
          });
        } else {
          addToast({
            title: 'Kredit Akun Habis',
            description: 'Kredit akun Anda sudah habis (0 kredit tersisa). Silakan hubungi admin atau tunggu isi ulang kredit.',
            type: 'error',
            duration: 6000
          });
        }
        return false;
      }
      return true;
    } catch {
      // Fallback to cached state if server unreachable
      if (credits <= 0) {
        const isUserLoggedIn = Boolean(user || !isGuest);
        if (!isUserLoggedIn) {
          openAuthModal('register');
          addToast({
            title: 'Batas Kuota Tamu',
            description: 'Kuota tamu kamu habis. Buat akun gratis sekarang untuk dapat +2 kredit ekstra & simpan riwayat!',
            type: 'info',
            duration: 7000
          });
        } else {
          addToast({
            title: 'Kredit Akun Habis',
            description: 'Kredit akun Anda sudah habis (0 kredit tersisa).',
            type: 'error',
            duration: 6000
          });
        }
        return false;
      }
      return true;
    }
  };

  // Step 2: Do the actual upload. Call this AFTER canUpload() passes AND after navigating to inspector.
  // Fire-and-forget from the caller — skeleton loading is shown immediately via pending state.
  const uploadAndAnalyze = async (file) => {
    if (!file) return;

    // Set pending state immediately so Inspector renders skeleton right away
    const localPreviewUrl = URL.createObjectURL(file);
    setActiveAnalysis({
      _id: 'pending-scan',
      originalFilename: file.name,
      imageUrl: localPreviewUrl,
      isPending: true,
      visualDna: null
    });
    setIsAnalyzing(true);
    setAnalysisStep(1);

    try {
      const formData = new FormData();
      formData.append('image', file);

      // Realistic step progression while backend multimodal AI runs
      const timer2 = setTimeout(() => setAnalysisStep(2), 1200);
      const timer3 = setTimeout(() => setAnalysisStep(3), 2800);
      const timer4 = setTimeout(() => setAnalysisStep(4), 5200);
      const timer5 = setTimeout(() => setAnalysisStep(5), 8000);

      const res = await api.uploadImage(formData);

      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      setAnalysisStep(6);

      if (res.creditsLeft !== undefined) {
        setCredits(res.creditsLeft);
        setGuestScansLeft(res.creditsLeft);
      } else if (res.guestScansLeft !== undefined) {
        setCredits(res.guestScansLeft);
        setGuestScansLeft(res.guestScansLeft);
      }

      setTimeout(() => {
        setActiveAnalysis(res.analysis);
        setIsAnalyzing(false);
        setAnalysisStep(0);
        loadRecent();
        window.history.replaceState({}, '', `/analyze/${res.analysis._id}`);
        addToast({
          title: 'Analisis Selesai!',
          description: `Visual DNA untuk "${res.analysis.originalFilename}" berhasil dibedah.`
        });
      }, 400);

      return res.analysis;
    } catch (err) {
      setIsAnalyzing(false);
      setAnalysisStep(0);
      setActiveAnalysis(null); // Clear pending state so Inspector doesn't stay stuck

      if (err.data?.quotaExceeded) {
        setCredits(0);
        setGuestScansLeft(0);
        const isUserLoggedIn = Boolean(user || !isGuest);
        if (!isUserLoggedIn) {
          openAuthModal('register');
          addToast({
            title: 'Batas Kuota Tamu',
            description: 'Kuota tamu kamu habis (3/3 scan). Buat akun gratis sekarang untuk dapat +2 kredit ekstra & simpan riwayat!',
            type: 'info',
            duration: 7000
          });
        } else {
          addToast({
            title: 'Kredit Akun Habis',
            description: err.data?.error || 'Kredit akun Anda sudah habis (0 kredit tersisa).',
            type: 'error',
            duration: 6000
          });
        }
      } else {
        addToast({
          title: 'Gagal menganalisis gambar',
          description: err.message || 'Pastikan file adalah gambar PNG, JPG, atau WEBP yang valid.',
          type: 'error'
        });
      }
      // Don't rethrow — caller already navigated, just show toast
    }
  };


  const toggleFavorite = async (id) => {
    try {
      const res = await api.toggleFavorite(id);
      if (activeAnalysis && activeAnalysis._id === id) {
        setActiveAnalysis(prev => ({ ...prev, isFavorite: res.isFavorite }));
      }
      setRecentAnalyses(prev => prev.map(a => a._id === id ? { ...a, isFavorite: res.isFavorite } : a));
      addToast({
        title: res.isFavorite ? 'Added to favorites' : 'Removed from favorites'
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnalysisContext.Provider value={{
      activeAnalysis,
      setActiveAnalysis,
      isAnalyzing,
      analysisStep,
      guestScansLeft,
      recentAnalyses,
      loadingRecent,
      loadRecent,
      loadDemo,
      canUpload,
      uploadAndAnalyze,
      toggleFavorite
    }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) throw new Error('useAnalysis must be used within an AnalysisProvider');
  return context;
};

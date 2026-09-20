import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useUser, useClerk } from '@clerk/react';
import { api } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { isSignedIn, user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const { signOut: clerkSignOut } = useClerk();

  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(3);
  const [isGuest, setIsGuest] = useState(true);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('register'); // 'register' | 'login'
  const { addToast } = useToast();

  const isSyncingRef = useRef(false);

  useEffect(() => {
    checkUser();
  }, []);

  // Listen for Clerk sign-in / Google OAuth completion
  useEffect(() => {
    if (!clerkLoaded) return;

    if (isSignedIn && clerkUser) {
      const email = clerkUser.primaryEmailAddress?.emailAddress;
      if (email && (!user || user.email !== email.toLowerCase()) && !isSyncingRef.current) {
        syncClerkSession(email, clerkUser);
      }
    }
  }, [clerkLoaded, isSignedIn, clerkUser, user]);

  const syncClerkSession = async (email, cUser) => {
    isSyncingRef.current = true;
    try {
      let activeAnalysisId = null;
      try {
        const cached = sessionStorage.getItem('nemu_active_analysis');
        if (cached) activeAnalysisId = JSON.parse(cached)?._id;
      } catch {}

      const res = await api.clerkSync({
        email,
        name: cUser.fullName || cUser.firstName || email.split('@')[0],
        avatarUrl: cUser.imageUrl,
        clerkId: cUser.id,
        activeAnalysisId
      });
      if (res?.user) {
        setUser(res.user);
        setCredits(res.credits !== undefined ? res.credits : (res.user.credits ?? 2));
        setIsGuest(false);
        setAuthModalOpen(false);
        addToast({
          title: res.isNewUser ? 'Akun Google Terhubung!' : 'Selamat datang kembali!',
          description: res.isNewUser
            ? `Bonus +2 kredit ekstra telah ditambahkan (Total: ${res.credits ?? res.user.credits} kredit).`
            : `Masuk sebagai ${res.user.name}`
        });
      }
    } catch (err) {
      console.error('[AuthContext] Error syncing Clerk user:', err);
    } finally {
      isSyncingRef.current = false;
    }
  };

  const checkUser = async () => {
    try {
      const res = await api.getMe();
      if (res?.user) {
        setUser(res.user);
        setCredits(res.credits !== undefined ? res.credits : (res.user.credits ?? 2));
        setIsGuest(false);
      } else {
        setUser(null);
        setCredits(res?.credits !== undefined ? res.credits : 3);
        setIsGuest(true);
      }
    } catch (err) {
      // Not logged in or guest
      setUser(null);
      setCredits(3);
      setIsGuest(true);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.login({ email, password });
      setUser(res.user);
      setCredits(res.credits !== undefined ? res.credits : (res.user?.credits ?? 2));
      setIsGuest(false);
      setAuthModalOpen(false);
      addToast({
        title: 'Selamat datang kembali!',
        description: `Masuk sebagai ${res.user.name}`
      });
      return res.user;
    } catch (err) {
      addToast({
        title: 'Gagal masuk',
        description: err.message,
        type: 'error'
      });
      throw err;
    }
  };

  const sendOtp = async (email, name) => {
    try {
      const res = await api.sendOtp({ email, name });
      addToast({
        title: 'Kode OTP Terkirim!',
        description: `Silakan cek inbox email ${email}`
      });
      return res;
    } catch (err) {
      addToast({
        title: 'Gagal kirim OTP',
        description: err.message,
        type: 'error'
      });
      throw err;
    }
  };

  const register = async (name, email, password, activeAnalysisId = null, otp = '') => {
    try {
      const res = await api.register({ name, email, password, activeAnalysisId, otp });
      setUser(res.user);
      setCredits(res.credits !== undefined ? res.credits : (res.user?.credits ?? 2));
      setIsGuest(false);
      setAuthModalOpen(false);
      addToast({
        title: 'Akun Berhasil Dibuat!',
        description: `Bonus +2 kredit ekstra telah ditambahkan (Total: ${res.credits ?? res.user?.credits} kredit).`
      });
      // Sync fresh data from DB to ensure credits are accurate
      setTimeout(() => checkUser(), 500);
      return res.user;
    } catch (err) {
      addToast({
        title: 'Pendaftaran gagal',
        description: err.message,
        type: 'error'
      });
      throw err;
    }
  };


  const logout = async () => {
    try {
      if (isSignedIn && clerkSignOut) {
        try {
          await clerkSignOut();
        } catch (e) {
          console.warn('Clerk sign out notice:', e);
        }
      }
      await api.logout();
      setUser(null);
      setIsGuest(true);
      addToast({
        title: 'Berhasil Keluar',
        description: 'Anda sekarang dalam mode tamu.'
      });
      checkUser();
    } catch (err) {
      console.error(err);
    }
  };

  const openAuthModal = (tab = 'register') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      credits,
      setCredits,
      isGuest,
      loading,
      authModalOpen,
      setAuthModalOpen,
      authModalTab,
      setAuthModalTab,
      openAuthModal,
      login,
      sendOtp,
      register,
      logout,
      checkUser

    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

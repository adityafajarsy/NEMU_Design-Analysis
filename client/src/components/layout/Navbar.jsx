import React from 'react';
import { ArrowRight, Sparkles, User as UserIcon, LogOut } from 'lucide-react';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ variant = 'hero', onNavigate, currentView = 'landing' }) => {
  const { user, credits, openAuthModal, logout } = useAuth();
  const isHero = variant === 'hero';

  return (
    <header className={`w-full z-40 transition-colors duration-200 ${isHero ? 'bg-transparent text-white' : 'bg-white text-[#111111] border-b border-[#DDE2E4]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
              <path
                d="M10 28V14C10 9 14 6 18 8C20 9 20 12 20 12V28M20 12C20 12 20 9 22 8C26 6 30 9 30 14V28"
                stroke={isHero ? '#FFFFFF' : '#0789D8'}
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-bold text-2xl tracking-tight">NEMU</span>
        </div>

        {/* Center Nav Links (Desktop) */}
        {isHero && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => onNavigate('landing')}
              className="relative flex items-center gap-1 text-white hover:text-white/80 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF3D] mr-0.5"></span>
              Beranda
            </button>
            <a href="#features" className="text-white/85 hover:text-white transition-colors">Fitur</a>
            <a href="#about" className="text-white/85 hover:text-white transition-colors">Tentang</a>
            <a href="#how-it-works" className="text-white/85 hover:text-white transition-colors">Cara Kerja</a>
            <button onClick={() => onNavigate('dashboard')} className="text-white/85 hover:text-white transition-colors">Jelajahi</button>
          </nav>
        )}

        {/* Right CTA / Auth */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Credit Balance Badge */}
              <div className={`flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full border ${
                isHero
                  ? 'bg-black/30 border-white/20 text-[#C8FF3D]'
                  : 'bg-[#C8FF3D]/20 border-[#9ecc23]/40 text-[#111111]'
              }`}>
                <span>⚡</span>
                <span>{credits !== undefined ? credits : 2} Kredit</span>
              </div>

              {/* Profile Avatar & Name */}
              <button
                onClick={() => onNavigate('dashboard')}
                title="Buka Dashboard"
                className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1.5 rounded-full transition-colors ${
                  isHero ? 'text-white hover:bg-white/10' : 'text-[#111111] hover:bg-[#F7F8F8]'
                }`}
              >
                <img
                  src={user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=0789D8`}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-[#C8FF3D]"
                />
                <span className="max-w-[70px] sm:max-w-none truncate">{user.name}</span>
              </button>

              <button
                onClick={logout}
                title="Keluar"
                className={`p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer ${
                  isHero ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-[#7C8387] hover:text-[#D94B4B] hover:bg-[#F7F8F8]'
                }`}
              >
                <LogOut className="w-4 h-4" />
              </button>

              <Button
                variant="primary"
                size="sm"
                className="hidden md:inline-flex"
                onClick={() => onNavigate('dashboard')}
              >
                Dashboard
              </Button>
            </div>
          ) : (
            <>
              <button
                onClick={() => openAuthModal('login')}
                className={`text-sm font-medium transition-colors cursor-pointer ${isHero ? 'text-white hover:text-white/80' : 'text-[#111111] hover:text-[#0789D8]'}`}
              >
                Masuk
              </button>

              <Button
                variant="primary"
                size="sm"
                iconRight={<ArrowRight className="w-4 h-4" />}
                onClick={() => openAuthModal('register')}
              >
                Mulai Sekarang
              </Button>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

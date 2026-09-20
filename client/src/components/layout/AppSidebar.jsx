import React from 'react';
import { Home, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AppSidebar = ({ currentTab = 'home', onSelectTab, onNavigate }) => {
  const { user, logout, credits, isGuest, openAuthModal } = useAuth();

  const navItems = [
    { id: 'home', label: 'Beranda', icon: <Home className="w-4 h-4" /> }
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#DDE2E4] h-screen sticky top-0 flex flex-col justify-between p-5 select-none shrink-0 hidden md:flex">
      
      {/* Top Brand Logo */}
      <div className="flex flex-col gap-8">
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#0789D8] flex items-center justify-center text-white font-bold text-sm shadow-xs transition-transform group-hover:scale-105">
            N
          </div>
          <span className="font-bold text-xl tracking-tight text-[#111111]">NEMU</span>
        </div>

        {/* Navigation Rail Links matching ref-image.png */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${isActive ? 'bg-[#F7F8F8] text-[#111111] font-bold shadow-xs' : 'text-[#7C8387] hover:text-[#111111] hover:bg-[#F7F8F8]'}`}
              >
                <span className={isActive ? 'text-[#0789D8]' : 'text-[#7C8387]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile Section with Live Credit Counter */}
      <div className="pt-4 border-t border-[#DDE2E4] flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt={user?.name || 'Guest'}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-[#0789D8]/30 shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#111111] truncate">
              {user?.name || 'Desainer Tamu'}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                credits > 0 
                  ? 'bg-[#C8FF3D]/25 border-[#9ecc23]/40 text-[#111111]' 
                  : 'bg-[#D94B4B]/10 border-[#D94B4B]/20 text-[#D94B4B]'
              }`}>
                ⚡ {isGuest ? `${credits}/3 Kredit` : `${credits} Kredit`}
              </span>
              {isGuest && (
                <button
                  onClick={() => openAuthModal('register')}
                  title="Daftar untuk dapat +2 kredit ekstra"
                  className="text-[10px] text-[#0789D8] font-bold hover:underline cursor-pointer"
                >
                  +2 Ekstra
                </button>
              )}
            </div>
          </div>
        </div>

        {user && (
          <button
            onClick={logout}
            title="Keluar"
            className="p-1.5 text-[#7C8387] hover:text-[#D94B4B] hover:bg-[#F7F8F8] rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>

    </aside>
  );
};

import React, { useState, useRef } from 'react';
import { AppSidebar } from '../components/layout/AppSidebar';
import { SearchFilterBar } from '../components/dashboard/SearchFilterBar';
import { RecentGrid } from '../components/dashboard/RecentGrid';
import { Upload, Plus, Sparkles, Image as ImageIcon, Home } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';

export const DashboardPage = ({ onInspect, onNavigate }) => {
  const fileInputRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('home');
  const [search, setSearch] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const { recentAnalyses, uploadAndAnalyze, canUpload, isAnalyzing, analysisStep, toggleFavorite } = useAnalysis();
  const { user, credits, isGuest, openAuthModal } = useAuth();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ok = await canUpload();
    if (!ok) return;
    onInspect('pending-scan');
    uploadAndAnalyze(file);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const ok = await canUpload();
    if (!ok) return;
    onInspect('pending-scan');
    uploadAndAnalyze(file);
  };

  // Filter items
  const filteredAnalyses = recentAnalyses.filter(item => {
    if (favoritesOnly && !item.isFavorite) return false;
    if (selectedStyle && selectedStyle !== 'All') {
      const hasStyle = item.visualDna?.style?.moodKeywords?.some(k => 
        k.toLowerCase().includes(selectedStyle.toLowerCase())
      );
      if (!hasStyle) return false;
    }
    if (search) {
      const q = search.toLowerCase();
      const matchName = item.originalFilename?.toLowerCase().includes(q);
      const matchStyle = item.visualDna?.style?.primaryName?.toLowerCase().includes(q);
      const matchFont = item.visualDna?.typography?.matchedGoogleFonts?.some(f => f.fontFamily.toLowerCase().includes(q));
      if (!matchName && !matchStyle && !matchFont) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F8F8] flex">
      {/* Left Application Rail matching ref-image.png */}
      <AppSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onNavigate={onNavigate}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">

        {/* Mobile-only top bar — sidebar is hidden on small screens */}
        <div className="flex sm:hidden items-center justify-between px-4 py-3 bg-white border-b border-[#DDE2E4] sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="font-black text-base tracking-tight text-[#111111]">NEMU</span>
            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${
              credits > 0 
                ? 'bg-[#C8FF3D]/25 border-[#9ecc23]/40 text-[#111111]' 
                : 'bg-[#D94B4B]/10 border-[#D94B4B]/20 text-[#D94B4B]'
            }`}>
              ⚡ {isGuest ? `${credits}/3 Kredit` : `${credits} Kredit`}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            {isGuest && (
              <button
                onClick={() => openAuthModal('register')}
                className="text-[11px] text-[#0789D8] font-bold hover:underline cursor-pointer"
              >
                +2 Ekstra
              </button>
            )}
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#7C8387] hover:text-[#111111] transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              Ke Beranda
            </button>
          </div>
        </div>

        {/* Top Header Strip */}
        <div className="p-6 sm:p-10 max-w-7xl w-full mx-auto flex flex-col gap-8">
          
          {/* Welcome Greeting & Editorial Title matching ref-image.png */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center justify-between sm:justify-start gap-2 mb-1">
                <span className="text-xs font-semibold text-[#7C8387]">
                  Halo, {user?.name || 'Kreator'}.
                </span>
                <span className={`sm:hidden inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border shadow-2xs ${
                  credits > 0 
                    ? 'bg-[#C8FF3D]/25 border-[#9ecc23]/40 text-[#111111]' 
                    : 'bg-[#D94B4B]/10 border-[#D94B4B]/20 text-[#D94B4B]'
                }`}>
                  ⚡ {isGuest ? `${credits}/3 Kredit` : `${credits} Kredit`}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] leading-tight">
                Koleksi Referensi & <span className="italic font-serif">Bedah Desain.</span>
              </h1>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Baru
            </Button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
          />

          {/* Quick Dropzone & Hero Panel Grid matching ref-image.png */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Quick Upload Dotted Dropzone (6 cols) */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="lg:col-span-6 bg-white rounded-3xl p-8 border-2 border-dashed border-[#DDE2E4] hover:border-[#0789D8] transition-colors cursor-pointer flex flex-col items-center justify-center text-center group shadow-xs hover:shadow-card min-h-[220px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#0789D8]/10 text-[#0789D8] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>

              <h3 className="text-base font-bold text-[#111111] mb-1">
                Tarik gambar ke sini atau <span className="text-[#0789D8] underline">klik untuk memilih file</span>
              </h3>
              <p className="text-xs text-[#7C8387]">
                Format PNG, JPG, WEBP hingga 10MB
              </p>

            </div>

            {/* Inset Recent Preview Mini-Gallery (6 cols) matching ref-image.png */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#DDE2E4] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7C8387]">
                  Contoh Pilihan
                </span>
                <button
                  onClick={() => onInspect('demo-new-normal')}
                  className="text-xs font-semibold text-[#0789D8] hover:underline cursor-pointer"
                >
                  Lihat Hasil Bedah →
                </button>
              </div>

              <div 
                onClick={() => onInspect('demo-new-normal')}
                className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-black cursor-pointer group shadow-xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80"
                  alt="The New Normal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-xs font-mono text-[#C8FF3D] font-bold">01 / Contoh</span>
                  <p className="text-sm font-bold truncate">Contemporary Brutalism & Editorial Typographic</p>
                </div>
              </div>
            </div>

          </div>

          {/* Search & Style Filter Toolbar */}
          <SearchFilterBar
            search={search}
            setSearch={setSearch}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            favoritesOnly={favoritesOnly}
            setFavoritesOnly={setFavoritesOnly}
          />

          {/* Main Visual Archive Grid */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#111111]">
                {favoritesOnly ? 'Referensi Favorit' : selectedStyle ? `Referensi ${selectedStyle}` : 'Riwayat Analisis Terakhir'}
              </h2>
              <span className="text-xs text-[#7C8387] font-mono">
                {filteredAnalyses.length} referensi
              </span>
            </div>

            <RecentGrid
              analyses={filteredAnalyses}
              onInspect={onInspect}
              onToggleFavorite={toggleFavorite}
              onTriggerUpload={() => fileInputRef.current?.click()}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

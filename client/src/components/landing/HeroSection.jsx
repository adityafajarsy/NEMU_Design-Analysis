import React, { useRef, useState } from 'react';
import { Play, ArrowRight, Upload, Sparkles, Plus, Image as ImageIcon } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useAnalysis } from '../../context/AnalysisContext';

export const HeroSection = ({ onInspect }) => {
  const fileInputRef = useRef(null);
  const { uploadAndAnalyze, canUpload, loadDemo, isAnalyzing, analysisStep } = useAnalysis();
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // 1. Check credits (shows toast+modal if blocked)
    const ok = await canUpload();
    if (!ok) return;
    // 2. Navigate immediately — skeleton loading shows right away
    onInspect('pending-scan');
    // 3. Upload in background (sets pending state, then fills in result)
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

  const handleDemoClick = async (slug = 'new-normal') => {
    if (isDemoLoading) return;
    try {
      setIsDemoLoading(true);
      const analysis = await loadDemo(slug);
      if (analysis) onInspect(analysis._id);
    } catch (err) {
      console.error('Failed to load demo:', err);
    } finally {
      setIsDemoLoading(false);
    }
  };

  return (
    <section className="relative w-full pt-6 pb-20 overflow-hidden text-white bg-transparent">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        
        {/* Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.04] mt-4 mb-6">
          Bingung font apa dan <span className="italic font-normal font-serif text-white">warna apa?</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed font-normal">
          Tinggal drag gambar referensi kamu ke sini. NEMU bisa kok nemuin font, warna, gaya visual, sampai prompt AI-nya dalam hitungan detik.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Button
            id="btn-see-demo"
            variant="dark-pill"
            size="md"
            isLoading={isDemoLoading}
            icon={!isDemoLoading ? <Play className="w-4 h-4 fill-white text-white" /> : null}
            onClick={() => handleDemoClick('new-normal')}
          >
            {isDemoLoading ? 'Membuka Demo...' : 'Coba Demo'}
          </Button>

          <Button
            id="btn-start-analyzing"
            variant="primary"
            size="md"
            iconRight={<ArrowRight className="w-4 h-4" />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Gambar
          </Button>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
        />

        {/* Full composition: [left cards] [center image] [right cards] as flex row */}
        <div 
          className="w-full flex items-center justify-center gap-3 2xl:gap-5 my-6 px-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >

          {/* === LEFT SIDE: Style Analysis + Color Palette === */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">

            {/* Card 1: Style Analysis */}
            <div className="bg-white/95 text-[#111111] p-3 2xl:p-4 rounded-2xl shadow-floating border border-white/40 flex flex-col gap-2 w-[140px] h-[110px] 2xl:w-[180px] 2xl:h-[140px] text-left backdrop-blur-md transform -rotate-2 hover:rotate-0 transition-transform duration-300 overflow-hidden">
              <span className="text-[10px] 2xl:text-xs font-semibold tracking-wider text-[#7C8387] uppercase shrink-0">Style Analysis</span>
              <div className="grid grid-cols-2 gap-1.5 2xl:gap-2">
                <span className="text-[9px] 2xl:text-xs bg-[#F7F8F8] px-1.5 py-0.5 rounded font-mono font-medium text-[#111111] border border-[#DDE2E4] truncate">Brutalism</span>
                <span className="text-[9px] 2xl:text-xs bg-[#F7F8F8] px-1.5 py-0.5 rounded font-mono font-medium text-[#111111] border border-[#DDE2E4] truncate">Editorial</span>
                <span className="text-[9px] 2xl:text-xs bg-[#F7F8F8] px-1.5 py-0.5 rounded font-mono font-medium text-[#111111] border border-[#DDE2E4] truncate">Typography</span>
                <span className="text-[9px] 2xl:text-xs bg-[#F7F8F8] px-1.5 py-0.5 rounded font-mono font-medium text-[#111111] border border-[#DDE2E4] truncate">Minimal</span>
              </div>
            </div>

            {/* Card 2: Color Palette */}
            <div className="bg-white/95 text-[#111111] p-3 2xl:p-4 rounded-2xl shadow-floating border border-white/40 flex flex-col justify-between w-[140px] h-[110px] 2xl:w-[180px] 2xl:h-[140px] text-left backdrop-blur-md transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <span className="text-[10px] 2xl:text-xs font-semibold tracking-wider text-[#7C8387] uppercase">Color Palette</span>
              <div className="flex items-center gap-1.5 2xl:gap-2">
                <div className="w-[18px] h-[32px] 2xl:w-[24px] 2xl:h-[40px] rounded-md bg-[#111111] shadow-xs" title="#111111" />
                <div className="w-[18px] h-[32px] 2xl:w-[24px] 2xl:h-[40px] rounded-md bg-[#0789D8] shadow-xs" title="#0789D8" />
                <div className="w-[18px] h-[32px] 2xl:w-[24px] 2xl:h-[40px] rounded-md bg-[#C8FF3D] shadow-xs" title="#C8FF3D" />
                <div className="w-[18px] h-[32px] 2xl:w-[24px] 2xl:h-[40px] rounded-md bg-[#DDE2E4] shadow-xs" title="#DDE2E4" />
              </div>
              <div className="flex items-center justify-between text-[10px] 2xl:text-xs text-[#7C8387] font-mono">
                <span>#111111</span>
                <span>#0789D8</span>
              </div>
            </div>

          </div>

          {/* Central Specimen Container */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative group flex-shrink-0 w-full max-w-[420px] 2xl:max-w-[560px] aspect-[16/9] rounded-3xl overflow-hidden shadow-hero border-4 border-white/30 bg-[#111111] cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Specimen image */}
            <img
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80"
              alt="The New Normal - Design Reference"
              className="w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity"
            />

            {/* Poster Overlay Label */}
            <div className="absolute top-4 left-5 text-left text-white drop-shadow-md select-none">
              <p className="font-black text-2xl sm:text-3xl leading-none uppercase tracking-tighter">THE<br />NEW<br />NORMAL</p>
            </div>

            {/* Interactive Upload Pill Center Bottom */}
            <div className="absolute bottom-4 right-4 2xl:bottom-5 2xl:right-5 bg-white/90 hover:bg-white text-[#111111] px-4 2xl:px-5 py-2 2xl:py-2.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2 text-xs sm:text-sm 2xl:text-base font-semibold transition-all group-hover:bg-[#C8FF3D]">
              <Plus className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#111111]" />
              <span>Upload gambar apa saja</span>
            </div>

            {/* Drag & drop overlay hover indicator */}
            <div className="absolute inset-0 bg-[#0789D8]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white font-medium p-4">
              <Upload className="w-8 h-8 animate-bounce text-[#C8FF3D]" />
              <p className="text-sm font-semibold">Tarik gambar ke sini atau klik untuk upload</p>
              <p className="text-xs text-white/80">Format PNG, JPG, WEBP hingga 10MB</p>
            </div>

          </div>

          {/* === RIGHT SIDE: Typography + AI Prompts === */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            {/* Card 3: Typography */}
            <div className="bg-white/95 text-[#111111] p-3 2xl:p-4 rounded-2xl shadow-floating border border-white/40 flex flex-col justify-between w-[140px] h-[110px] 2xl:w-[180px] 2xl:h-[140px] text-left backdrop-blur-md transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <span className="text-[10px] 2xl:text-xs font-semibold tracking-wider text-[#7C8387] uppercase">Typography</span>
              <div className="flex items-center gap-2 2xl:gap-3">
                <span className="text-3xl 2xl:text-4xl font-bold font-serif text-[#111111] leading-none">Aa</span>
                <div className="flex flex-col text-[10px] 2xl:text-xs text-[#3E4346] leading-tight">
                  <span className="font-semibold text-[#111111]">Inter</span>
                  <span className="text-[#7C8387]">DM Sans</span>
                  <span className="text-[#7C8387]">Plus Jakarta Sans</span>
                </div>
              </div>
              <div></div>
            </div>

            {/* Card 4: AI Prompts */}
            <div className="bg-white/95 text-[#111111] p-3 2xl:p-4 rounded-2xl shadow-floating border border-white/40 flex flex-col justify-between w-[140px] h-[110px] 2xl:w-[180px] 2xl:h-[140px] text-left backdrop-blur-md transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <span className="text-[10px] 2xl:text-xs font-semibold tracking-wider text-[#7C8387] uppercase">AI Prompts</span>
              <div className="flex flex-col gap-1 2xl:gap-1.5 text-[10px] 2xl:text-xs font-medium">
                <div className="flex items-center gap-1.5 2xl:gap-2 text-[#111111]">
                  <span className="w-2 h-2 rounded-full bg-[#0789D8] shrink-0"></span>
                  Midjourney v6
                </div>
                <div className="flex items-center gap-1.5 2xl:gap-2 text-[#7C8387]">
                  <span className="w-2 h-2 rounded-full bg-[#E53935] shrink-0"></span>
                  Pinterest Visual
                </div>
                <div className="flex items-center gap-1.5 2xl:gap-2 text-[#7C8387]">
                  <span className="w-2 h-2 rounded-full bg-[#111111] shrink-0"></span>
                  Are.na Channels
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>

        {/* Instant Demo References Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-medium text-white/90">
          <span className="text-white/70">Atau coba contoh referensi langsung:</span>
          <button
            onClick={() => handleDemoClick('new-normal')}
            className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            🎨 The New Normal (Editorial)
          </button>
          <button
            onClick={() => handleDemoClick('better-things')}
            className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            ⚡ Better Things Ahead (Warm Riso)
          </button>
          <button
            onClick={() => handleDemoClick('swiss-minimal')}
            className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            🏛️ Swiss Minimal (Zurich Grid)
          </button>
        </div>

        {/* Social Proof Strip */}
        <div className="flex items-center gap-3 mt-10 text-white/85 text-xs sm:text-sm select-none">
          <div className="flex -space-x-2">
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80" alt="Creative" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" alt="Creative" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" alt="Creative" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" alt="Creative" />
            <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#111111] text-white text-[10px] font-bold ring-2 ring-white">+</div>
          </div>
          <span>Dipercaya oleh 10.000+ desainer & kreator</span>
        </div>
      </div>
    </section>
  );
};

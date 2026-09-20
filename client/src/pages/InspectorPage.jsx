import React, { useRef } from 'react';
import { ArrowLeft, Download, Heart, Loader2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { ImageCanvas } from '../components/inspector/ImageCanvas';
import { StylePanel } from '../components/inspector/StylePanel';
import { TypographyPanel } from '../components/inspector/TypographyPanel';
import { PalettePanel } from '../components/inspector/PalettePanel';
import { CompositionPanel } from '../components/inspector/CompositionPanel';
import { PromptStudio } from '../components/inspector/PromptStudio';
import { AssetCardExport } from '../components/inspector/AssetCardExport';
import { InspectorSkeleton } from '../components/inspector/InspectorSkeleton';
import { useAnalysis } from '../context/AnalysisContext';

export const InspectorPage = ({ onBack, onNavigate }) => {
  const { activeAnalysis, isAnalyzing, analysisStep, toggleFavorite } = useAnalysis();
  const exportCardRef = useRef(null);

  const isAnalyzeRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/analyze/');

  if (!activeAnalysis) {
    if (isAnalyzeRoute) {
      return (
        <div className="min-h-screen bg-[#F7F8F8]">
          <InspectorSkeleton />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-[#F7F8F8] flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-xl font-bold text-[#111111] mb-2">Belum ada analisis yang dipilih</h3>
        <p className="text-sm text-[#7C8387] mb-6">Pilih referensi dari dashboard atau upload gambar baru.</p>
        <Button variant="primary" onClick={() => onNavigate('dashboard')}>
          Buka Dashboard
        </Button>
      </div>
    );
  }

  const isPending = isAnalyzing || activeAnalysis.isPending || !activeAnalysis.visualDna;
  const { visualDna, imageUrl, originalFilename, _id, isFavorite } = activeAnalysis;

  const handleDownloadCard = () => {
    if (isPending) return;
    if (exportCardRef.current) {
      exportCardRef.current();
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F8] flex flex-col">
      
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#DDE2E4] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        
        {/* Left: Back Action & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#0789D8] transition-colors cursor-pointer bg-[#F7F8F8] hover:bg-[#EEF1F2] px-3 py-1.5 rounded-full border border-[#DDE2E4]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Hasil Analisis</span>
          </button>

          <span className="hidden md:inline text-xs text-[#7C8387] font-mono truncate max-w-xs">
            {originalFilename}
          </span>

          {/* Visual Category Badge */}
          {visualDna?.mediaType && !isPending && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#DDE2E4] text-[#111111] shadow-2xs">
              <span>{visualDna.mediaType.icon || '🎨'}</span>
              <span>{visualDna.mediaType.label || 'Desain Grafis'}</span>
            </div>
          )}

          {isPending && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0789D8] bg-[#0789D8]/10 px-2.5 py-1 rounded-full border border-[#0789D8]/20">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Memproses Visual DNA...</span>
            </span>
          )}
        </div>

        {/* Right Action Suite */}
        <div className="flex items-center gap-2.5">
          <button
            disabled={isPending}
            onClick={() => toggleFavorite(_id)}
            title={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${isPending ? 'opacity-40 cursor-not-allowed' : ''} ${isFavorite ? 'bg-[#D94B4B]/10 border-[#D94B4B]/30 text-[#D94B4B]' : 'bg-white border-[#DDE2E4] text-[#7C8387] hover:text-[#111111]'}`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#D94B4B]' : ''}`} />
          </button>

          {/* Black pill Download Button */}
          <Button
            variant="secondary"
            size="sm"
            disabled={isPending}
            className={isPending ? 'opacity-40 cursor-not-allowed' : ''}
            icon={<Download className="w-4 h-4 text-white" />}
            onClick={handleDownloadCard}
          >
            Export Kartu
          </Button>
        </div>

      </header>

      {/* Main 50/50 Desktop Split Layout */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left 6 Columns: Image Canvas (Sticky on Desktop) */}
        <div className="lg:col-span-6 lg:sticky lg:top-20 h-[520px] lg:h-[calc(100vh-104px)]">
          <ImageCanvas
            imageUrl={imageUrl}
            alt={originalFilename}
          />
        </div>

        {/* Right 6 Columns: Intelligence Deck (Scrollable) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {isPending ? (
            <InspectorSkeleton analysisStep={analysisStep} />
          ) : (
            <div className="flex flex-col gap-6 transition-all duration-500">
              {/* Random / Test Asset Notice Banner */}
              {visualDna?.mediaType?.category === 'random_test' && (
                <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-amber-900 shadow-2xs">
                  <div className="text-xl shrink-0 mt-0.5">🎲</div>
                  <div className="flex-1 text-xs sm:text-sm">
                    <div className="font-bold mb-0.5">Aset Non-Desain / Uji Coba Terdeteksi</div>
                    <p className="text-amber-800/90 leading-relaxed">
                      {visualDna?.mediaType?.reason || 'Gambar ini terdeteksi sebagai dokumen, tangkapan layar acak, atau objek non-desain. NEMU tetap membedah palet warna dan komposisi visualnya secara objektif.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Style Panel */}
              <StylePanel style={visualDna?.style} />

              {/* Typography & Live Font Playground: Only shown if image has detectable typography */}
              {visualDna?.mediaType?.hasTypography !== false && (
                <TypographyPanel typography={visualDna?.typography} />
              )}

              {/* Color Palette & Dominance Swatches */}
              <PalettePanel colorPalette={visualDna?.colorPalette} />

              {/* Composition & Grid Architecture */}
              <CompositionPanel composition={visualDna?.composition} />

              {/* AI Prompts & Pinterest Style Keywords */}
              <PromptStudio prompts={visualDna?.prompts} styleInfo={visualDna?.style} />
            </div>
          )}
        </div>

      </main>

      {/* Hidden Asset Card for High-Res PNG Download */}
      {!isPending && activeAnalysis && (
        <AssetCardExport
          analysis={activeAnalysis}
          triggerRef={exportCardRef}
        />
      )}

    </div>
  );
};

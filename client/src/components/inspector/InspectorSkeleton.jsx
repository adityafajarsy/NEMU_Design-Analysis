import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, Palette, Type, Layout, Wand2, Compass, Clock } from 'lucide-react';

export const InspectorSkeleton = ({ analysisStep = 1 }) => {
  const [elapsed, setElapsed] = useState('0.0');

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const sec = ((Date.now() - startTime) / 1000).toFixed(1);
      setElapsed(sec);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Compute realistic progress percentage based on step
  const getProgress = (step) => {
    switch (step) {
      case 1: return 22; // Uploading & color extraction
      case 2: return 42; // Palette & contrast assessment
      case 3: return 64; // Finding styles & aesthetic lineage
      case 4: return 84; // Look-alike fonts & typography classification
      case 5: return 94; // Composition, Pinterest keywords & prompt
      case 6: return 100;
      default: return 18;
    }
  };

  const getStepText = (step) => {
    switch (step) {
      case 1:
        return '01 / 05 Mengunggah & membaca data gambar...';
      case 2:
        return '02 / 05 Mengekstrak palet warna dominan & rasio kontras...';
      case 3:
        return '03 / 05 Menganalisis style & aliran visual desain...';
      case 4:
        return '04 / 05 Mendeteksi font & mencocokkan Google Fonts gratis...';
      case 5:
        return '05 / 05 Menyusun komposisi layout & prompt gambar generator...';
      case 6:
        return '05 / 05 Finalisasi dekonstruksi Visual DNA...';
      default:
        return 'Membedah elemen estetika visual...';
    }
  };

  const percentage = getProgress(analysisStep);

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn">
      {/* 1. TOP LIVE PROGRESS BANNER */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-[#DDE2E4] flex flex-col gap-4">
        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0789D8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0789D8]"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#0789D8]" />
              Menganalisis Visual DNA...
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Real-time Elapsed Seconds Badge */}
            <span className="text-xs font-mono font-semibold text-[#3E4346] bg-[#F7F8F8] px-2.5 py-1 rounded-full border border-[#DDE2E4] flex items-center gap-1.5 shadow-2xs">
              <Clock className="w-3 h-3 text-[#0789D8]" />
              <span>{elapsed}s</span>
            </span>

            {/* Percentage Badge */}
            <span className="text-xs font-mono font-bold text-[#111111] bg-[#F7F8F8] px-3 py-1 rounded-full border border-[#DDE2E4]">
              {percentage}%
            </span>
          </div>
        </div>

        {/* 24-Segment Precision Progress Bar (Swiss Grid Style) */}
        <div className="w-full flex items-center gap-[3px] h-2 my-0.5">
          {Array.from({ length: 24 }).map((_, index) => {
            const filledCount = Math.max(1, Math.round((percentage / 100) * 24));
            const isFilled = index < filledCount;
            const isHead = index === filledCount - 1 && percentage < 100;

            return (
              <div
                key={index}
                className={`flex-1 h-2 rounded-[2px] transition-all duration-300 ${
                  isHead
                    ? 'bg-[#C8FF3D] shadow-[0_0_8px_rgba(200,255,61,0.85)] ring-1 ring-[#9ecc23] animate-pulse'
                    : isFilled
                    ? 'bg-[#0789D8]'
                    : 'bg-[#EEF1F2] border border-[#DDE2E4]/60'
                }`}
              />
            );
          })}
        </div>

        {/* Step Status Text */}
        <div className="flex items-center text-xs pt-1">
          <span className="font-semibold text-[#111111] flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-[#0789D8] animate-spin shrink-0" />
            <span className="tracking-tight">{getStepText(analysisStep)}</span>
          </span>
        </div>
      </div>

      {/* 2. SKELETON: STYLE & ALIRAN VISUAL */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-[#DDE2E4] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-5 w-24 bg-gray-100 rounded-full animate-pulse" />
        </div>

        <div className="space-y-2 mt-1">
          <div className="h-7 w-3/4 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-7 w-20 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-7 w-24 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-7 w-18 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-7 w-28 bg-gray-100 rounded-full animate-pulse" />
        </div>

        {/* Texture & Lighting Shimmer Box */}
        <div className="p-3.5 rounded-2xl bg-[#F7F8F8] border border-[#DDE2E4] flex items-center gap-3 mt-1">
          <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse shrink-0" />
          <div className="h-3.5 w-4/5 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* 3. SKELETON: TIPOGRAFI & DETEKSI FONT */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-[#DDE2E4] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-[#7C8387]" />
            <div className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
        </div>

        {/* Classification Big Box */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F7F8F8] border border-[#DDE2E4]">
          <div className="w-14 h-14 rounded-2xl bg-white border border-[#DDE2E4] flex items-center justify-center font-serif text-2xl font-bold text-gray-300 animate-pulse shrink-0">
            Aa
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-4/5 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>

        {/* Matched Fonts Shimmer List */}
        <div className="space-y-2.5 pt-1">
          <div className="p-3.5 rounded-2xl bg-white border border-[#DDE2E4] flex items-center justify-between">
            <div className="space-y-1.5 flex-1">
              <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#DDE2E4] flex items-center justify-between">
            <div className="space-y-1.5 flex-1">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* 4. SKELETON: PALET WARNA & DOMINASI */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-[#DDE2E4] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#7C8387]" />
            <div className="h-3 w-36 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-5 w-28 bg-gray-100 rounded-full animate-pulse" />
        </div>

        {/* 5 Swatches Stack Shimmer */}
        <div className="grid grid-cols-5 gap-2 pt-1">
          {[42, 24, 16, 11, 7].map((pct, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="w-full h-16 rounded-2xl bg-gray-200 animate-pulse" />
              <div className="h-3 w-10 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* 5. SKELETON: KOMPOSISI & LAYOUT */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-[#DDE2E4] flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4 text-[#7C8387]" />
          <div className="h-3 w-36 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="h-5 w-2/3 bg-gray-200 rounded-lg animate-pulse" />
        <div className="space-y-2 pt-1">
          <div className="h-3.5 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-3.5 w-5/6 bg-gray-100 rounded animate-pulse" />
          <div className="h-3.5 w-4/6 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>

      {/* 6. SKELETON: PROMPT STUDIO & PINTEREST KEYWORDS */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-[#DDE2E4] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#7C8387]" />
            <div className="h-3 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
        </div>

        {/* Keyword Pills Shimmer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="h-10 rounded-2xl bg-[#F7F8F8] border border-[#DDE2E4] animate-pulse" />
          <div className="h-10 rounded-2xl bg-[#F7F8F8] border border-[#DDE2E4] animate-pulse" />
        </div>

        {/* Prompt Box Shimmer */}
        <div className="h-24 rounded-2xl bg-[#F7F8F8] border border-[#DDE2E4] animate-pulse" />
      </div>
    </div>
  );
};

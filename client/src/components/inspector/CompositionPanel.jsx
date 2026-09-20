import React from 'react';
import { Grid, Target, CheckCircle2 } from 'lucide-react';

export const CompositionPanel = ({ composition }) => {
  if (!composition) return null;

  const {
    layoutType = 'Asymmetrical 3-Column Urban Grid',
    focalPoint = 'Upper left typographic mass framing architectural shadow',
    whitespaceDensity = 'balanced',
    rulesAndGuidelines = [
      'Establish high typographic weight against architectural neutral textures',
      'Anchor primary message with 80% column fill ratio',
      'Use deep cerulean blue as grounding base with terracotta orange as punch accent'
    ]
  } = composition;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-[#DDE2E4] flex flex-col gap-4">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7C8387] flex items-center gap-1.5">
          <Grid className="w-4 h-4 text-[#0789D8]" />
          Komposisi & Tata Letak
        </span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F7F8F8] text-[#111111] border border-[#DDE2E4]">
          {whitespaceDensity === 'spacious' ? 'Ruang Kosong: Sangat Lega' : whitespaceDensity === 'minimal' ? 'Ruang Kosong: Padat & Rapat' : 'Ruang Kosong: Seimbang'}
        </span>
      </div>

      {/* Layout Type and Focal Point */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#F7F8F8] border border-[#DDE2E4]">
          <span className="text-[11px] font-bold text-[#7C8387] uppercase tracking-wider block mb-1">
            Hierarki Grid
          </span>
          <p className="text-xs sm:text-sm font-bold text-[#111111]">
            {layoutType}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F7F8F8] border border-[#DDE2E4]">
          <span className="text-[11px] font-bold text-[#7C8387] uppercase tracking-wider block mb-1">
            Titik Fokus
          </span>
          <p className="text-xs sm:text-sm font-bold text-[#111111]">
            {focalPoint}
          </p>
        </div>
      </div>

      {/* Actionable Rules & Guidelines */}
      {rulesAndGuidelines.length > 0 && (
        <div className="flex flex-col gap-2 pt-2 border-t border-[#DDE2E4]/60">
          <span className="text-[11px] font-bold text-[#7C8387] uppercase tracking-wider">
            Panduan Arahan Kreatif
          </span>
          <div className="flex flex-col gap-2">
            {rulesAndGuidelines.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3E4346]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0789D8] shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

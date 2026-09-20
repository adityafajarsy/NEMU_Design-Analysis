import React, { useState } from 'react';
import { Palette, Copy, Check, ShieldCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const PalettePanel = ({ colorPalette }) => {
  const { addToast } = useToast();
  const [copiedHex, setCopiedHex] = useState(null);

  const swatches = colorPalette?.dominantSwatches || [
    { hex: '#111111', rgb: [17, 17, 17], dominancePercentage: 42, role: 'primary' },
    { hex: '#2A7BB5', rgb: [42, 123, 181], dominancePercentage: 24, role: 'secondary' },
    { hex: '#D65038', rgb: [214, 80, 56], dominancePercentage: 16, role: 'accent' },
    { hex: '#D9DFE3', rgb: [217, 223, 227], dominancePercentage: 11, role: 'background' },
    { hex: '#8A9499', rgb: [138, 148, 153], dominancePercentage: 7, role: 'muted' }
  ];

  const [selectedHex, setSelectedHex] = useState(null);
  const activeSwatch = (selectedHex && swatches.find(s => s.hex === selectedHex)) || swatches[0];

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    addToast({
      title: `Kode ${hex} Disalin`,
      description: 'Kode warna hex berhasil disalin ke clipboard.'
    });
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const contrast = colorPalette?.contrastAssessment || {
    bgHex: '#D9DFE3',
    textHex: '#111111',
    wcagRatio: 12.8,
    isAccessible: true
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-[#DDE2E4] flex flex-col gap-5">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7C8387] flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-[#E53935]" />
          Palet Warna & Swatch
        </span>
        <span className="text-xs font-mono font-medium text-[#7C8387]">
          {swatches.length} warna diekstrak
        </span>
      </div>

      {/* Swatches Visual Bar matching ref-image.png */}
      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5">
        {swatches.map((swatch, idx) => {
          const isSelected = activeSwatch?.hex === swatch.hex;
          return (
            <button
              key={`${swatch.hex}-${idx}`}
              onClick={() => {
                setSelectedHex(swatch.hex);
                handleCopy(swatch.hex);
              }}
              className={`group flex flex-col items-center gap-1.5 p-1 rounded-2xl transition-all cursor-pointer ${isSelected ? 'scale-105' : 'hover:scale-102'}`}
            >
              <div
                style={{ backgroundColor: swatch.hex }}
                className={`w-full aspect-square rounded-xl shadow-xs border transition-all ${isSelected ? 'ring-3 ring-[#111111] ring-offset-2 border-transparent' : 'border-black/10'}`}
              />
              <span className="text-[10px] font-mono font-bold text-[#111111]">
                {swatch.dominancePercentage}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Selected Swatch Inspect Bar matching ref-image.png (#AABBCC HEX [copy]) */}
      {activeSwatch && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#F7F8F8] border border-[#DDE2E4]">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div
              style={{ backgroundColor: activeSwatch.hex }}
              className="w-10 h-10 rounded-xl border border-black/10 shrink-0 shadow-xs"
            />
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold text-[#111111]">
                {activeSwatch.hex}
              </span>
              <span className="text-[11px] text-[#7C8387] font-mono">
                RGB({activeSwatch.rgb?.join(', ') || '0, 0, 0'}) • {
                  activeSwatch.role === 'primary' ? 'Warna Utama' :
                  activeSwatch.role === 'secondary' ? 'Warna Sekunder' :
                  activeSwatch.role === 'accent' ? 'Warna Aksen' :
                  activeSwatch.role === 'background' ? 'Warna Latar' :
                  activeSwatch.role === 'muted' ? 'Warna Redup' : activeSwatch.role
                }
              </span>
            </div>
          </div>

          <button
            onClick={() => handleCopy(activeSwatch.hex)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white hover:bg-[#EEF1F2] text-[#111111] border border-[#DDE2E4] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            {copiedHex === activeSwatch.hex ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#42A95C]" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#7C8387]" />
                <span>Salin HEX</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* WCAG Contrast Assessment */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8F8] border border-[#DDE2E4] text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#42A95C]" />
          <span className="text-[#3E4346]">
            Kontras Background/Teks: <strong className="font-mono text-[#111111]">{contrast.wcagRatio}:1</strong>
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#42A95C]/15 text-[#42A95C] font-bold text-[11px]">
          {contrast.wcagRatio >= 4.5 ? 'Lolos WCAG AAA' : 'Peringatan Kontras Rendah'}
        </span>
      </div>
    </div>
  );
};

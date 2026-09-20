import React, { useState, useEffect, useMemo } from 'react';
import { Type, ExternalLink, SlidersHorizontal, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { loadGoogleFont, loadMultipleGoogleFonts } from '../../utils/fontLoader';

// Helper to deduce generic CSS font fallback based on name or classification
function getFontFallback(fontName = '', classification = '') {
  const combined = `${fontName} ${classification}`.toLowerCase();
  if (combined.includes('serif') && !combined.includes('sans')) return 'serif';
  if (combined.includes('mono') || combined.includes('code')) return 'monospace';
  if (combined.includes('cursive') || combined.includes('script') || combined.includes('handwriting')) return 'cursive';
  return 'sans-serif';
}

const DEFAULT_MATCHED_FONTS = [
  { fontFamily: 'Inter', confidence: 0.95, googleFontsUrl: 'https://fonts.google.com/specimen/Inter', suggestedWeight: '800 ExtraBold', role: 'Headline / Display' },
  { fontFamily: 'DM Sans', confidence: 0.91, googleFontsUrl: 'https://fonts.google.com/specimen/DM+Sans', suggestedWeight: '700 Bold', role: 'Body / Secondary' },
  { fontFamily: 'Plus Jakarta Sans', confidence: 0.88, googleFontsUrl: 'https://fonts.google.com/specimen/Plus+Jakarta+Sans', suggestedWeight: '800 ExtraBold', role: 'Headline Alternative' }
];
const EMPTY_ARRAY = [];

export const TypographyPanel = ({ typography }) => {
  // ── derive data (safe even if typography is null) ──────────────────────────
  const classification = typography?.classification || 'Neo-Grotesque Display Sans';
  const characteristics = typography?.characteristics || 'High uniform stroke weight, tight aperture, geometric proportions';
  const detectedHeadlineStyle = typography?.detectedHeadlineStyle || 'All-caps, vertical stack, tight tracking';
  const detectedFonts = typography?.detectedFonts || EMPTY_ARRAY;
  const matchedGoogleFonts = typography?.matchedGoogleFonts || DEFAULT_MATCHED_FONTS;

  const [selectedFontFamily, setSelectedFontFamily] = useState(() => {
    return matchedGoogleFonts[0]?.fontFamily || 'Inter';
  });
  const [testText, setTestText] = useState('THE NEW NORMAL');
  const [fontSize, setFontSize] = useState(42);
  const [fontWeight, setFontWeight] = useState(700);
  const [showPlayground, setShowPlayground] = useState(true);
  const [loadedFontsMap, setLoadedFontsMap] = useState({});

  // Compile list of detected font roles in design (fallback gracefully if not present)
  const effectiveDetectedFonts = useMemo(() => {
    if (Array.isArray(detectedFonts) && detectedFonts.length > 0) {
      return detectedFonts;
    }

    // Synthesize structured roles from matchedGoogleFonts and classification
    const roles = [];
    if (matchedGoogleFonts[0]) {
      roles.push({
        role: 'Headline / Judul Utama',
        sampleText: detectedHeadlineStyle || 'Sample Headline',
        classification: classification,
        letterformTraits: characteristics,
        matchedGoogleFont: matchedGoogleFonts[0]
      });
    }
    if (matchedGoogleFonts[1]) {
      roles.push({
        role: 'Body / Teks Pendukung',
        sampleText: 'Paragraf editorial & copy deskriptif desain',
        classification: matchedGoogleFonts[1].fontFamily.toLowerCase().includes('sans') ? 'Modern Clean Sans' : 'Readable Body Serif',
        letterformTraits: 'Keterbacaan tinggi, x-height seimbang, open counters',
        matchedGoogleFont: matchedGoogleFonts[1]
      });
    }
    if (matchedGoogleFonts[2]) {
      roles.push({
        role: 'Accent / Alternatif Teks',
        sampleText: 'Label, nomor visual, atau caption pelengkap',
        classification: 'Complementary Display Style',
        letterformTraits: 'Harmonisasi kontras visual dengan headline',
        matchedGoogleFont: matchedGoogleFonts[2]
      });
    }
    return roles;
  }, [detectedFonts, matchedGoogleFonts, classification, characteristics, detectedHeadlineStyle]);

  // Track analysis changes from outside; NEVER reset selected font on internal user clicks
  const lastTypographyRef = React.useRef(typography);
  useEffect(() => {
    if (typography && typography !== lastTypographyRef.current) {
      lastTypographyRef.current = typography;
      const initialFont =
        matchedGoogleFonts[0]?.fontFamily ||
        effectiveDetectedFonts[0]?.matchedGoogleFont?.fontFamily ||
        'Inter';
      setSelectedFontFamily(initialFont);

      const initialSample =
        effectiveDetectedFonts[0]?.sampleText ||
        'THE NEW NORMAL';
      if (initialSample && initialSample.length < 35) {
        setTestText(initialSample);
      }
    }
  }, [typography, matchedGoogleFonts, effectiveDetectedFonts]);

  // Preload all fonts in parallel
  useEffect(() => {
    const allFontFamilies = [
      ...matchedGoogleFonts.map(f => f.fontFamily),
      ...effectiveDetectedFonts.map(d => d.matchedGoogleFont?.fontFamily)
    ].filter(Boolean);

    const markLoaded = (family) => {
      setLoadedFontsMap(prev => ({ ...prev, [family]: true }));
    };

    loadMultipleGoogleFonts(allFontFamilies, markLoaded);
  }, [matchedGoogleFonts, effectiveDetectedFonts]);

  // Handle loading when selected font changes
  useEffect(() => {
    if (selectedFontFamily) {
      loadGoogleFont(selectedFontFamily, (family) => {
        setLoadedFontsMap(prev => ({ ...prev, [family]: true }));
      });
    }
  }, [selectedFontFamily]);

  // ── NOW safe to guard ──────────────────────────────────────────────────────
  if (!typography) return null;

  const isCurrentFontLoaded = Boolean(loadedFontsMap[selectedFontFamily]);
  const fallbackGeneric = getFontFallback(selectedFontFamily, classification);

  // Helper: select a font and ensure playground is visible
  const selectFont = (fontFamily, sampleText) => {
    if (!fontFamily) return;
    setSelectedFontFamily(fontFamily);
    setShowPlayground(true);
    if (sampleText && typeof sampleText === 'string') {
      setTestText(sampleText);
    }
    loadGoogleFont(fontFamily, (family) => {
      setLoadedFontsMap(prev => ({ ...prev, [family]: true }));
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-[#DDE2E4] flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#DDE2E4]/60 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C8387] flex items-center gap-1.5">
            <Type className="w-4 h-4 text-[#111111]" />
            Analisis Tipografi & Deteksi Font Desain
          </span>
          <p className="text-xs text-[#7C8387] mt-0.5">
            Daftar peran font yang ditemukan pada gambar dan alternatif Google Fonts gratisnya
          </p>
        </div>
        <button
          onClick={() => setShowPlayground(!showPlayground)}
          className="text-xs font-semibold text-[#0789D8] hover:text-[#0878B8] transition-colors flex items-center gap-1 cursor-pointer shrink-0"
        >
          {showPlayground ? 'Sembunyikan Tester' : 'Tes Font →'}
        </button>
      </div>

      {/* SECTION 1: Font yang Terdeteksi dalam Desain */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0789D8]" />
            Font yang Ditemukan pada Gambar ({effectiveDetectedFonts.length} Peran Tipografi)
          </span>
          <span className="text-[11px] text-[#7C8387]">
            Klik kartu untuk coba ketik font ini
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {effectiveDetectedFonts.map((detected, idx) => {
            const fontName = detected.matchedGoogleFont?.fontFamily || 'Inter';
            const isSelected = selectedFontFamily === fontName;
            const fontFallback = getFontFallback(fontName, detected.classification);

            return (
              <div
                key={idx}
                onClick={() => selectFont(fontName, detected.sampleText)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 relative group ${
                  isSelected
                    ? 'bg-[#111111] text-white border-[#111111] shadow-card'
                    : 'bg-[#F7F8F8] text-[#111111] border-[#DDE2E4] hover:border-[#0789D8]'
                }`}
              >
                <div>
                  {/* Role Badge & Match % */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-[#C8FF3D]' : 'bg-[#DDE2E4] text-[#111111]'
                      }`}
                    >
                      {detected.role}
                    </span>
                    <span
                      className={`font-mono text-xs font-bold ${
                        isSelected ? 'text-[#C8FF3D]' : 'text-[#0789D8]'
                      }`}
                    >
                      {Math.round((detected.matchedGoogleFont?.confidence || 0.92) * 100)}% Match
                    </span>
                  </div>

                  {/* Font Specimen Preview */}
                  <div className="my-2">
                    <span
                      className="text-2xl sm:text-3xl font-bold tracking-tight block truncate"
                      style={{
                        fontFamily: `"${fontName}", ${fontFallback}`,
                        fontWeight: detected.matchedGoogleFont?.suggestedWeight?.includes('Bold') ? 700 : 500
                      }}
                    >
                      {fontName}
                    </span>
                    <span className={`text-xs block mt-0.5 font-medium ${isSelected ? 'text-white/80' : 'text-[#7C8387]'}`}>
                      {detected.classification}
                    </span>
                  </div>

                  {/* Sample text from image */}
                  {detected.sampleText && (
                    <div
                      className={`text-xs p-2 rounded-xl mt-2 font-mono ${
                        isSelected ? 'bg-white/10 text-white/90' : 'bg-white border border-[#DDE2E4] text-[#3E4346]'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-[#7C8387] block mb-0.5">Teks di Gambar:</span>
                      "{detected.sampleText}"
                    </div>
                  )}

                  {/* Letterform traits description */}
                  {detected.letterformTraits && (
                    <p className={`text-[11px] mt-2 leading-relaxed ${isSelected ? 'text-white/70' : 'text-[#7C8387]'}`}>
                      {detected.letterformTraits}
                    </p>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className={`pt-2 border-t flex items-center justify-between text-xs ${isSelected ? 'border-white/20' : 'border-[#DDE2E4]'}`}>
                  <span className={`text-[11px] ${isSelected ? 'text-white/70' : 'text-[#7C8387]'}`}>
                    Google Font: <strong>{fontName}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectFont(fontName, detected.sampleText);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#C8FF3D] text-[#111111]'
                        : 'bg-white border border-[#DDE2E4] text-[#0789D8] hover:bg-[#0789D8] hover:text-white'
                    }`}
                  >
                    {isSelected ? 'Sedang Diuji' : 'Coba Ketik'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Alternatif Google Fonts Gratis Terdekat */}
      <div className="flex flex-col gap-2 pt-2 border-t border-[#DDE2E4]/60">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#7C8387] uppercase tracking-wider">
            Alternatif Google Fonts Gratis Terdekat Lainnya
          </span>
          <span className="text-[11px] text-[#7C8387]">
            Klik kartu untuk tes ketik
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {matchedGoogleFonts.map((font, idx) => {
            const isSelected = font.fontFamily === selectedFontFamily;
            const fontFallback = getFontFallback(font.fontFamily, font.category);

            return (
              <div
                key={font.fontFamily || idx}
                onClick={() => selectFont(font.fontFamily)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.98] ${
                  isSelected
                    ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                    : 'bg-[#F7F8F8] text-[#111111] border-[#DDE2E4] hover:border-[#0789D8] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-base font-bold truncate"
                    style={{ fontFamily: `"${font.fontFamily}", ${fontFallback}` }}
                  >
                    {font.fontFamily}
                  </span>
                  <a
                    href={font.googleFontsUrl || `https://fonts.google.com/specimen/${encodeURIComponent(font.fontFamily)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Buka spesimen di Google Fonts"
                    className={`p-1 rounded transition-colors ${
                      isSelected ? 'text-[#C8FF3D] hover:text-white' : 'text-[#7C8387] hover:text-[#0789D8]'
                    }`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex items-center justify-between text-[11px] mt-1">
                  <span className={isSelected ? 'text-white/70' : 'text-[#7C8387]'}>
                    {font.suggestedWeight || '400 Regular'}
                  </span>
                  <span className={`font-mono font-bold ${isSelected ? 'text-[#C8FF3D]' : 'text-[#0789D8]'}`}>
                    {Math.round((font.confidence || 0.9) * 100)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: Live Interactive Typography Playground */}
      {showPlayground && selectedFontFamily && (
        <div className="mt-2 pt-4 border-t border-[#DDE2E4] flex flex-col gap-3.5">
          {/* Controls bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#0789D8]" />
              <span className="text-xs font-bold text-[#111111]">
                Area Tes Ketik:{' '}
                <span className="font-bold text-[#0789D8]">{selectedFontFamily}</span>
              </span>

              {/* Live Loading Badge */}
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] font-medium">
                {isCurrentFontLoaded ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    Font Aktif
                  </>
                ) : (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin text-[#0789D8]" />
                    Memuat...
                  </>
                )}
              </span>
            </div>

            {/* Slider & Weight Controls */}
            <div className="flex items-center gap-4">
              {/* Weight Selector */}
              <div className="flex items-center gap-1 bg-[#F7F8F8] border border-[#DDE2E4] rounded-lg p-0.5 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setFontWeight(400)}
                  className={`px-2 py-0.5 rounded ${fontWeight === 400 ? 'bg-white text-[#111111] shadow-xs' : 'text-[#7C8387] hover:text-[#111111]'}`}
                >
                  Regular
                </button>
                <button
                  type="button"
                  onClick={() => setFontWeight(700)}
                  className={`px-2 py-0.5 rounded ${fontWeight === 700 ? 'bg-white text-[#111111] shadow-xs' : 'text-[#7C8387] hover:text-[#111111]'}`}
                >
                  Bold
                </button>
              </div>

              {/* Font Size Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#7C8387] font-mono min-w-[28px]">{fontSize}px</span>
                <input
                  type="range"
                  min="18"
                  max="72"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-24 accent-[#0789D8] h-1.5 bg-[#DDE2E4] rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Editable Text Sandbox Box */}
          <div className="relative rounded-2xl bg-[#F7F8F8] border-2 border-[#DDE2E4] focus-within:border-[#0789D8] transition-colors p-5 min-h-[110px] flex items-center overflow-x-auto shadow-inner">
            <input
              type="text"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              style={{
                fontFamily: `"${selectedFontFamily}", ${fallbackGeneric}`,
                fontSize: `${fontSize}px`,
                fontWeight: fontWeight,
                lineHeight: 1.15
              }}
              className="w-full bg-transparent text-[#111111] border-none outline-none tracking-tight"
              placeholder={`Ketik teks untuk mencoba tampilan font ${selectedFontFamily}...`}
            />
          </div>

          {/* Quick presets & helper note */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#7C8387]">
            <span>
              💡 Ketik teks apa pun di atas untuk menguji ketebalan, proporsi, dan visual font <strong>{selectedFontFamily}</strong>.
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#7C8387]">Preset:</span>
              {['THE NEW NORMAL', 'Visual Intelligence', 'Editorial 2026', 'Abc 123'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTestText(preset)}
                  className="px-2 py-0.5 rounded bg-[#F7F8F8] border border-[#DDE2E4] hover:border-[#0789D8] hover:text-[#0789D8] transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

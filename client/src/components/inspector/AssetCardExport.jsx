import React, { useRef, useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { useToast } from '../../context/ToastContext';
import { API_BASE } from '../../services/api';

export const AssetCardExport = ({ analysis, onExportDone, triggerRef }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const { addToast } = useToast();
  const [inlineImage, setInlineImage] = useState(null);

  // Helper to convert any image URL into a pure Base64 Data URL
  // This completely bypasses Safari / WebKit's strict foreignObject CORS restrictions
  const convertUrlToBase64 = async (url) => {
    if (!url) return null;
    if (url.startsWith('data:')) return url;

    // Strategy 1: Direct CORS fetch
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (response.ok) {
        const blob = await response.blob();
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }
    } catch (e) {
      console.warn('[AssetCardExport] Direct fetch failed, trying backend proxy:', e.message);
    }

    // Strategy 2: Backend image proxy (guaranteed Access-Control-Allow-Origin: *)
    try {
      const proxyUrl = `${API_BASE}/analysis/proxy-image?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      if (response.ok) {
        const blob = await response.blob();
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }
    } catch (e) {
      console.warn('[AssetCardExport] Proxy fetch failed, trying canvas fallback:', e.message);
    }

    // Strategy 3: Offscreen Canvas draw
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || 800;
          canvas.height = img.naturalHeight || 600;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg', 0.95));
        } catch (err) {
          resolve(url);
        }
      };
      img.onerror = () => resolve(url);
      img.src = url;
    });
  };

  // Pre-convert image on mount or when imageUrl changes
  useEffect(() => {
    let isMounted = true;
    if (analysis?.imageUrl) {
      convertUrlToBase64(analysis.imageUrl).then((base64) => {
        if (isMounted && base64) {
          setInlineImage(base64);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [analysis?.imageUrl]);

  const handleDownload = async () => {
    if (!cardRef.current || !analysis) return;

    try {
      addToast({
        title: 'Membuat Kartu Visual...',
        description: 'Merender kartu aset PNG resolusi tinggi.'
      });

      // Ensure base64 image is ready
      let activeImage = inlineImage;
      if (!activeImage && analysis.imageUrl) {
        activeImage = await convertUrlToBase64(analysis.imageUrl);
        if (activeImage) setInlineImage(activeImage);
      }

      // Ensure DOM image is fully decoded before html-to-image captures it
      if (imgRef.current) {
        if (!imgRef.current.complete) {
          await new Promise((resolve) => {
            imgRef.current.onload = resolve;
            imgRef.current.onerror = resolve;
          });
        }
        if (imgRef.current.decode) {
          try {
            await imgRef.current.decode();
          } catch (_) {
            // Ignore decode errors if already loaded
          }
        }
      }

      // Small delay to ensure WebKit paints the layout tree
      await new Promise((res) => setTimeout(res, 80));

      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        cacheBust: false, // Must be false when using Base64
        skipFonts: false
      });

      const link = document.createElement('a');
      link.download = `nemu-${(analysis.originalFilename || 'visual-card').replace(/\.[^/.]+$/, "")}.png`;
      link.href = dataUrl;
      link.click();

      addToast({
        title: 'Export Selesai!',
        description: 'Kartu visual aset berhasil diunduh.'
      });
      if (onExportDone) onExportDone();
    } catch (err) {
      console.error('Asset card export failed:', err);
      addToast({
        title: 'Gagal Mengexport',
        description: 'Gagal mengexport kartu. Silakan coba lagi.',
        type: 'error'
      });
    }
  };

  // Expose trigger to parent ref
  if (triggerRef) {
    triggerRef.current = handleDownload;
  }

  if (!analysis) return null;

  const mediaType = analysis.visualDna?.mediaType;
  const style = analysis.visualDna?.style;
  const typography = analysis.visualDna?.typography;
  const colorPalette = analysis.visualDna?.colorPalette;
  const composition = analysis.visualDna?.composition;
  const swatches = colorPalette?.dominantSwatches || [];
  const topFont = typography?.matchedGoogleFonts?.[0] || { fontFamily: 'Inter', suggestedWeight: '800 ExtraBold' };

  return (
    /* Offscreen container that stays rendered in memory (avoiding WebKit -left-9999px culling) */
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -9999,
        opacity: 0,
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    >
      {/* 2x Renderable Visual Summary Card (1200x675 / 16:9) */}
      <div
        ref={cardRef}
        className="w-[1200px] h-[675px] bg-[#111111] text-white p-12 flex flex-col justify-between rounded-none overflow-hidden relative"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0789D8] flex items-center justify-center font-bold text-lg text-white">
              N
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight text-white block">NEMU</span>
              <span className="text-xs text-[#7C8387] tracking-widest uppercase font-mono">Visual Reference Intelligence</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {mediaType && (
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/15 font-semibold text-xs flex items-center gap-1.5">
                <span>{mediaType.icon}</span>
                <span>{mediaType.label}</span>
              </span>
            )}
            <span className="px-4 py-1.5 rounded-full bg-[#C8FF3D] text-[#111111] font-bold text-xs">
              {style?.primaryName || 'Design DNA'}
            </span>
          </div>
        </div>

        {/* Middle Body Grid */}
        <div className="grid grid-cols-12 gap-8 items-center flex-1 my-6">
          {/* Specimen Thumbnail */}
          <div className="col-span-5 h-[360px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
            <img
              ref={imgRef}
              src={inlineImage || analysis.imageUrl}
              alt="Reference"
              crossOrigin="anonymous"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Extracted Intelligence */}
          <div className="col-span-7 flex flex-col justify-between h-[360px] pl-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0789D8] font-bold">
                Movement & Lineage
              </span>
              <h3 className="text-3xl font-bold tracking-tight text-white mt-1 mb-3 leading-tight">
                {style?.primaryName}
              </h3>
              <p className="text-sm text-[#7C8387] leading-relaxed line-clamp-3">
                {style?.movementHistory}
              </p>
            </div>

            {/* Typography Match or Photography Composition Box */}
            {mediaType?.hasTypography === false ? (
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">📸</span>
                  <div>
                    <span className="text-[11px] font-mono text-[#7C8387] uppercase block">Visual Focus</span>
                    <span className="text-lg font-bold text-white">Fotografi Murni</span>
                    <span className="text-xs text-[#7C8387] block truncate max-w-sm">
                      {composition?.layoutType || 'Komposisi & Pencahayaan Alami'}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-[#C8FF3D]">
                  {Math.round((style?.confidence || 0.95) * 100)}% Match
                </span>
              </div>
            ) : (
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold font-serif text-white">Aa</span>
                  <div>
                    <span className="text-[11px] font-mono text-[#7C8387] uppercase block">Matched Typeface</span>
                    <span className="text-lg font-bold text-white">{topFont.fontFamily}</span>
                    <span className="text-xs text-[#7C8387] block">{topFont.suggestedWeight}</span>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-[#C8FF3D]">
                  {Math.round((topFont.confidence || 0.9) * 100)}% Match
                </span>
              </div>
            )}

            {/* Color Swatches */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#7C8387] block mb-2 font-bold">
                Extracted Palette
              </span>
              <div className="grid grid-cols-5 gap-3">
                {swatches.slice(0, 5).map((s, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div
                      style={{ backgroundColor: s.hex }}
                      className="w-full h-12 rounded-xl border border-white/20 shadow-sm"
                    />
                    <span className="font-mono text-xs font-bold text-white text-center">
                      {s.hex}
                    </span>
                    <span className="text-[10px] text-[#7C8387] text-center font-mono">
                      {s.dominancePercentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/15 pt-4 flex items-center justify-between text-xs text-[#7C8387] font-mono">
          <span>Decoded by NEMU • nemu.design</span>
          <span>{analysis.originalFilename}</span>
        </div>
      </div>
    </div>
  );
};


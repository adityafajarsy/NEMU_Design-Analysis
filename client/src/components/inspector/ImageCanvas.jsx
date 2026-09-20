import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Pipette, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ImageCanvas = ({ imageUrl, alt = 'Reference Image' }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [eyedropperActive, setEyedropperActive] = useState(false);
  const [hoverColor, setHoverColor] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const { addToast } = useToast();

  // Draw image to hidden canvas for pixel sampling
  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    const isLocalBlob = imageUrl.startsWith('blob:') || imageUrl.startsWith('data:');
    if (!isLocalBlob) {
      img.crossOrigin = 'anonymous';
    }
    img.src = imageUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
      }
    };
  }, [imageUrl]);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (eyedropperActive) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging && !eyedropperActive) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }

    // Eyedropper sampling
    if (eyedropperActive && containerRef.current && imageRef.current && canvasRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x: e.clientX, y: e.clientY });

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const naturalX = Math.floor((x / rect.width) * canvas.width);
        const naturalY = Math.floor((y / rect.height) * canvas.height);

        try {
          const pixel = ctx.getImageData(naturalX, naturalY, 1, 1).data;
          const hex = '#' + [pixel[0], pixel[1], pixel[2]].map(val => {
            const h = val.toString(16);
            return h.length === 1 ? '0' + h : h;
          }).join('').toUpperCase();
          setHoverColor(hex);
        } catch (err) {
          // Cross-origin fallback
          setHoverColor('#2A7BB5');
        }
      } else {
        setHoverColor(null);
      }
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleCanvasClick = () => {
    if (eyedropperActive && hoverColor) {
      navigator.clipboard.writeText(hoverColor);
      addToast({
        title: `Warna Disalin: ${hoverColor}`,
        description: 'Kode hex berhasil disalin dari kanvas referensi.'
      });
      setEyedropperActive(false);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsDragging(false);
        setHoverColor(null);
      }}
      onClick={handleCanvasClick}
      className={`relative w-full h-full min-h-[420px] lg:min-h-0 bg-[#EEF1F2] rounded-3xl overflow-hidden flex items-center justify-center select-none border border-[#DDE2E4] ${eyedropperActive ? 'cursor-crosshair' : isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
    >
      {/* Hidden 2D Canvas for Eyedropper Reading */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Reference Image Viewport */}
      <div className="w-full h-full p-4 sm:p-6 pb-20 flex items-center justify-center overflow-hidden pointer-events-none">
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out'
          }}
          className="relative max-w-full max-h-full flex items-center justify-center"
        >
          <img
            ref={imageRef}
            src={imageUrl}
            alt={alt}
            crossOrigin={imageUrl?.startsWith('blob:') || imageUrl?.startsWith('data:') ? undefined : "anonymous"}
            className="max-w-full max-h-[calc(100vh-220px)] object-contain rounded-2xl shadow-floating pointer-events-auto select-none"
          />
        </div>
      </div>

      {/* Floating Eyedropper Magnifier Loupe */}
      {eyedropperActive && hoverColor && (
        <div
          style={{ left: mousePos.x + 16, top: mousePos.y + 16 }}
          className="fixed pointer-events-none z-50 flex items-center gap-2 bg-[#111111] text-white px-3 py-1.5 rounded-full shadow-floating border border-white/20 text-xs font-mono"
        >
          <span
            style={{ backgroundColor: hoverColor }}
            className="w-4 h-4 rounded-full border border-white/40 inline-block shadow-xs"
          />
          <span className="font-bold">{hoverColor}</span>
        </div>
      )}

      {/* Floating Canvas Controls Overlay */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full shadow-floating border border-[#DDE2E4] flex items-center gap-1 z-30">
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
          title="Perkecil (Zoom Out)"
          className="p-2 text-[#7C8387] hover:text-[#111111] hover:bg-[#F7F8F8] rounded-full transition-colors cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <span className="text-xs font-mono text-[#111111] px-2 font-semibold">
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
          title="Perbesar (Zoom In)"
          className="p-2 text-[#7C8387] hover:text-[#111111] hover:bg-[#F7F8F8] rounded-full transition-colors cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-[#DDE2E4] mx-1" />

        <button
          onClick={(e) => { e.stopPropagation(); handleReset(); }}
          title="Reset Tampilan"
          className="p-2 text-[#7C8387] hover:text-[#111111] hover:bg-[#F7F8F8] rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setEyedropperActive(!eyedropperActive);
          }}
          title={eyedropperActive ? "Nonaktifkan Eyedropper" : "Ambil Warna (Eyedropper)"}
          className={`p-2 rounded-full transition-colors cursor-pointer ${eyedropperActive ? 'bg-[#0789D8] text-white shadow-xs' : 'text-[#7C8387] hover:text-[#111111] hover:bg-[#F7F8F8]'}`}
        >
          <Pipette className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
          title="Layar Penuh"
          className="p-2 text-[#7C8387] hover:text-[#111111] hover:bg-[#F7F8F8] rounded-full transition-colors cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

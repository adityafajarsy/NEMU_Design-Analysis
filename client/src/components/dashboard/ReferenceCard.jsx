import React from 'react';
import { Heart, ArrowUpRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ReferenceCard = ({ analysis, onInspect, onToggleFavorite }) => {
  if (!analysis) return null;

  const mediaType = analysis.visualDna?.mediaType;
  const style = analysis.visualDna?.style;
  const typography = analysis.visualDna?.typography;
  const swatches = analysis.visualDna?.colorPalette?.dominantSwatches || [];
  const topFont = typography?.matchedGoogleFonts?.[0]?.fontFamily;

  const overlayBadge = mediaType?.hasTypography === false
    ? `${mediaType?.icon || '📸'} ${mediaType?.label || 'Fotografi'}`
    : (topFont ? `T ${topFont}` : `${mediaType?.icon || '🎨'} ${mediaType?.label || 'Desain'}`);

  return (
    <div
      onClick={() => onInspect(analysis._id)}
      className="group bg-white rounded-xl sm:rounded-3xl overflow-hidden shadow-2xs sm:shadow-xs hover:shadow-card border border-[#DDE2E4] transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-square sm:aspect-[4/3] bg-[#F7F8F8] overflow-hidden">
        <img
          src={analysis.thumbnailUrl || analysis.imageUrl}
          alt={analysis.originalFilename || 'Reference'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Favorite Heart Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(analysis._id);
          }}
          className={`absolute top-1.5 right-1.5 sm:top-3 sm:right-3 p-1 sm:p-2 rounded-full backdrop-blur-md transition-all ${
            analysis.isFavorite 
              ? 'bg-white text-[#D94B4B] shadow-xs' 
              : 'bg-black/30 text-white hover:bg-white hover:text-[#D94B4B]'
          }`}
        >
          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${analysis.isFavorite ? 'fill-[#D94B4B]' : ''}`} />
        </button>

        {/* Overlay Chip (Desktop only to keep mobile cards clean) */}
        <div className="hidden sm:inline-flex items-center gap-1 absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white">
          {overlayBadge}
        </div>
      </div>

      {/* Card Info */}
      <div className="p-2 sm:p-5 flex flex-col justify-between flex-1 gap-1.5 sm:gap-3">
        <div>
          <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
            {mediaType?.icon && (
              <span className="text-[10px] sm:text-xs shrink-0">{mediaType.icon}</span>
            )}
            <span className="text-[9px] sm:text-[10px] font-bold text-[#0789D8] uppercase tracking-wider truncate">
              {mediaType?.label || style?.moodKeywords?.[0] || 'Desain Grafis'}
            </span>
          </div>
          <h4 className="text-[11px] sm:text-sm font-bold text-[#111111] line-clamp-1 leading-snug group-hover:text-[#0789D8] transition-colors">
            {style?.primaryName || analysis.originalFilename}
          </h4>
        </div>

        {/* Color Palette Mini-Bar */}
        <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-[#DDE2E4]/60">
          <div className="flex items-center gap-1 sm:gap-1.5">
            {swatches.slice(0, 4).map((s, idx) => (
              <span
                key={idx}
                style={{ backgroundColor: s.hex }}
                className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full border border-black/10 shadow-2xs shrink-0"
              />
            ))}
          </div>

          <span className="hidden sm:flex text-xs font-semibold text-[#7C8387] group-hover:text-[#111111] transition-colors items-center gap-0.5">
            Bedah <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};

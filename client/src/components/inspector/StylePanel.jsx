import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

export const StylePanel = ({ style }) => {
  if (!style) return null;

  const {
    primaryName = 'Contemporary Editorial Design',
    confidence = 0.95,
    movementHistory = '',
    moodKeywords = ['Editorial', 'Modernist', 'Typography'],
    textureAndLighting = ''
  } = style;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-[#DDE2E4] flex flex-col gap-4">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7C8387] flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-[#0789D8]" />
          Style & Aliran Visual
        </span>
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#F7F8F8] text-[#111111] border border-[#DDE2E4]">
          {Math.round(confidence * 100)}% Kecocokan
        </span>
      </div>

      {/* Primary Movement Name */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight mb-2">
          {primaryName}
        </h3>
        {movementHistory && (
          <p className="text-xs sm:text-sm text-[#3E4346] leading-relaxed">
            {movementHistory}
          </p>
        )}
      </div>

      {/* Mood Keywords / Style Badges Strip matching ref-image.png */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-[#DDE2E4]/60">
        {moodKeywords.map((tag) => (
          <Badge key={tag} variant="neutral" size="sm">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Texture & Lighting Notes */}
      {textureAndLighting && (
        <div className="bg-[#F7F8F8] rounded-xl p-3 border border-[#DDE2E4]/60 text-xs text-[#7C8387] flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-[#0789D8] shrink-0 mt-0.5" />
          <span><strong className="text-[#111111]">Tekstur & Cahaya:</strong> {textureAndLighting}</span>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { ReferenceCard } from './ReferenceCard';
import { Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export const RecentGrid = ({
  analyses = [],
  onInspect,
  onToggleFavorite,
  onTriggerUpload
}) => {
  if (analyses.length === 0) {
    return (
      <div className="w-full py-16 bg-white rounded-3xl border border-[#DDE2E4] p-8 flex flex-col items-center justify-center text-center shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-[#F7F8F8] border border-[#DDE2E4] flex items-center justify-center text-[#7C8387] mb-4">
          <ImageIcon className="w-7 h-7" />
        </div>
        <h4 className="text-lg font-bold text-[#111111] mb-1">Belum ada referensi yang sesuai filter</h4>
        <p className="text-xs text-[#7C8387] max-w-sm mb-6">
          Upload screenshot atau gambar desain untuk mulai mengumpulkan referensi visualmu.
        </p>
        <Button variant="primary" size="sm" onClick={onTriggerUpload}>
          Upload Referensi
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
      {analyses.map((item) => (
        <ReferenceCard
          key={item._id}
          analysis={item}
          onInspect={onInspect}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export const FinalCTA = ({ onNavigate, onTriggerUpload }) => {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    } else if (onTriggerUpload) {
      onTriggerUpload();
    }
  };

  return (
    <section className="w-full bg-[#0789D8] text-white py-20 relative overflow-hidden">
      {/* Subtle cloud glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C8FF3D]" />
          Bedah Referensi Instan
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
          Siap membongkar referensi <span className="italic font-serif">desain favoritmu?</span>
        </h2>

        <p className="text-base sm:text-lg text-white/90 max-w-xl mb-10 leading-relaxed">
          Masukkan gambar referensi apapun sekarang dan dapatkan seluruh elemen desainnya tanpa biaya.
        </p>

        <Button
          variant="primary"
          size="lg"
          iconRight={<ArrowRight className="w-5 h-5" />}
          onClick={handleClick}
          className="shadow-xl hover:scale-105"
        >
          Upload Gambar Sekarang
        </Button>

        <p className="text-xs text-white/70 mt-4">
          Tanpa perlu registrasi • Mendukung PNG, JPG, WEBP
        </p>
      </div>
    </section>
  );
};

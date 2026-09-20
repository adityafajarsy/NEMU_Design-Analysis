import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const FeatureGrid = ({ onTrySample }) => {
  const features = [
    {
      num: '01',
      tag: 'STYLE DNA',
      title: 'DNA Style & Aliran Desain',
      description: 'Mendeteksi aliran visual secara akurat — mulai dari Swiss Style, Acid Graphics, Editorial, hingga Neo-Brutalism.',
      visual: (
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-medium text-[#7C8387] bg-white border border-[#DDE2E4] px-2 py-1">
          <span className="w-1.5 h-1.5 bg-[#0789D8] inline-block"></span>
          <span>SWISS / ACID / BRUTAL</span>
        </div>
      )
    },
    {
      num: '02',
      tag: 'TYPOGRAPHY',
      title: 'Deteksi Font & Google Fonts',
      description: 'Mengenali jenis tipografi dan menyajikan alternatif Google Fonts gratis yang bisa dites ketik langsung di tempat.',
      visual: (
        <div className="flex items-baseline gap-1 text-[#111111]">
          <span className="font-serif italic text-base font-bold">Aa</span>
          <span className="font-sans text-xs text-[#7C8387]">/ Sans</span>
        </div>
      )
    },
    {
      num: '03',
      tag: 'COLOR MATRIX',
      title: 'Palet Warna & Rasio Kontras',
      description: 'Ekstrak kode HEX, RGB, persentase dominasi, dan validasi rasio kontras standar WCAG AAA otomatis.',
      visual: (
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#111111] border border-black/10"></span>
          <span className="w-3 h-3 bg-[#0789D8]"></span>
          <span className="w-3 h-3 bg-[#C8FF3D]"></span>
          <span className="text-[10px] font-mono text-[#7C8387] ml-1">AAA</span>
        </div>
      )
    },
    {
      num: '04',
      tag: 'GENERATIVE',
      title: 'Studio Prompt AI Siap Pakai',
      description: 'Format prompt generative terstruktur siap copy-paste ke Midjourney v6, Pinterest visual search, atau Flux.',
      visual: (
        <div className="text-[10px] font-mono font-bold text-[#0789D8] bg-[#0789D8]/5 border border-[#0789D8]/20 px-2 py-0.5">
          &gt; prompt.txt
        </div>
      )
    }
  ];

  return (
    <section id="features" className="w-full bg-white py-16 sm:py-24 border-b border-[#DDE2E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-[#0789D8]"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0789D8]">
              FITUR UTAMA
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] leading-tight mb-4">
            4 Elemen Utama yang Dibongkar NEMU.
          </h2>
          <p className="text-sm sm:text-lg text-[#7C8387] max-w-2xl mx-auto">
            Semua contekan yang kamu butuhkan untuk mengubah gambar inspirasi jadi keputusan desain nyata.
          </p>
        </div>

        {/* Studio Matrix Grid (Sharp, Editorial, Non-Generic) */}
        <div className="border-t border-l border-[#DDE2E4] bg-white">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {features.map((feat) => (
              <div
                key={feat.title}
                onClick={() => onTrySample('new-normal')}
                className="group border-r border-b border-[#DDE2E4] p-4 sm:p-7 flex flex-col justify-between hover:bg-[#F9FAFB] transition-colors duration-200 cursor-pointer relative"
              >
                {/* Top Meta Bar */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
                    <span className="text-xs font-mono font-bold text-[#111111] tracking-wider">
                      [{feat.num}]
                    </span>
                    {feat.visual}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-lg font-bold text-[#111111] mb-2 leading-snug group-hover:text-[#0789D8] transition-colors">
                    {feat.title}
                  </h3>

                  {/* Description (desktop / sm+) */}
                  <p className="text-xs text-[#7C8387] leading-relaxed hidden sm:block">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom Action Line */}
                <div className="mt-4 sm:mt-8 pt-3 border-t border-[#F0F2F3] flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-mono uppercase text-[#7C8387] group-hover:text-[#0789D8] transition-colors">
                    {feat.tag}
                  </span>
                  <div className="flex items-center gap-1 text-[#111111] group-hover:text-[#0789D8] text-xs font-semibold transition-colors">
                    <span className="hidden sm:inline">Coba</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};


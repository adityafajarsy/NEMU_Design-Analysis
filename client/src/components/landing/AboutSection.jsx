import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export const AboutSection = ({ onTrySample }) => {
  return (
    <section id="about" className="w-full bg-[#F7F8F8] py-20 border-b border-[#DDE2E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Intro Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0789D8] mb-3 block">
              TENTANG NEMU
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] leading-[1.1] mb-6">
              Solusi cerdas membaca referensi visual untuk desainer dan <span className="italic font-serif">kreator.</span> <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#C8FF3D] ml-1"></span>
            </h2>
            <p className="text-base sm:text-lg text-[#3E4346] leading-relaxed max-w-2xl">
              NEMU membantu kamu membedah referensi visual jadi data nyata yang siap dipakai. Mulai dari nama font, palet warna, sampai prompt AI, tanpa perlu menebak-nebak lagi.
            </p>
          </div>

          {/* Metric Stats */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 pt-4 lg:pt-8 border-t lg:border-t-0 border-[#DDE2E4]">
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">40 Juta+</span>
              <span className="text-xs text-[#7C8387] mt-1 font-medium leading-relaxed">Desainer aktif di seluruh dunia</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">80%</span>
              <span className="text-xs text-[#7C8387] mt-1 font-medium leading-relaxed">Desainer kesulitan menentukan font & style dari referensi yang mereka lihat</span>
            </div>
          </div>

        </div>

        {/* Modular Showcase Bento Grid matching ref-image.png */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Editorial Specimen Card (4 cols) */}
          <div 
            onClick={() => onTrySample('better-things')}
            className="md:col-span-4 relative rounded-3xl overflow-hidden shadow-card border border-[#DDE2E4] min-h-[380px] group cursor-pointer bg-[#0789D8]"
          >
            <img
              src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80"
              alt="Desain keren berawal dari referensi tepat"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-7 flex flex-col justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#C8FF3D]"></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/80">Contoh 02</span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-2">
                  Desain keren selalu berawal dari referensi tepat.
                </h3>
                <span className="text-xs text-white/80 font-medium group-hover:text-[#C8FF3D] transition-colors flex items-center gap-1">
                  Klik untuk lihat hasil bedah →
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: How It Works Steps (4 cols) */}
          <div id="how-it-works" className="md:col-span-4 bg-white rounded-3xl p-7 shadow-card border border-[#DDE2E4] flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7C8387] block mb-5">
                CARA KERJA
              </span>

              <div className="flex flex-col gap-5">
                {[
                  { step: '1', title: 'Drag & Drop Gambar', desc: 'Masukkan gambar referensi dari web atau galerimu.' },
                  { step: '2', title: 'Bedah Otomatis', desc: 'NEMU menganalisis style, komposisi, dan elemen visualnya.' },
                  { step: '3', title: 'Dapatkan Elemen', desc: 'Dapatkan font, palet warna, kode hex, dan prompt AI dalam hitungan detik.' },
                  { step: '4', title: 'Langsung Eksekusi', desc: 'Terapkan langsung ke projek desain atau client brief kamu.' }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-[#F7F8F8] border border-[#DDE2E4] text-[#111111] font-bold text-xs flex items-center justify-center shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111111]">{item.title}</h4>
                      <p className="text-xs text-[#7C8387] leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Dark "More Than a Color Picker" Card (4 cols) */}
          <div className="md:col-span-4 bg-[#111111] text-white rounded-3xl p-7 shadow-card border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-3">
                Lebih dari sekadar color picker.
              </h3>
              <p className="text-xs text-[#7C8387] leading-relaxed mb-6">
                NEMU membaca komposisi dan rasio kontras warna secara matematis, siap pakai di Figma atau web.
              </p>

              {/* Inset visual specimen mockup */}
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-white/5 p-3 flex flex-col gap-3">
                <div className="h-28 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=80"
                    alt="Dominant aesthetic swatch"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="bg-white/10 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-white/60 uppercase font-semibold block">Dominan</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#111111] ring-1 ring-white/30"></span>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#2A7BB5]"></span>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#D65038]"></span>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#D9DFE3]"></span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-[#C8FF3D]">64%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#7C8387]">
              <span>Standar Kontras WCAG</span>
              <span className="text-[#C8FF3D] font-semibold">Lolos AAA</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

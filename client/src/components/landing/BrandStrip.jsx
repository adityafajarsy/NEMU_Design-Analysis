import React from "react";

export const BrandStrip = () => {
  const brands = [
    { name: "Pinterest", icon: "📌" },
    { name: "Behance", icon: "🅱" },
    { name: "Dribbble", icon: "🏀" },
    { name: "Awwwards", icon: "🏆" },
    { name: "Muzli", icon: "🎨" },
    { name: "Magnific", icon: "✨" },
  ];

  return (
    <section className="w-full bg-white border-b border-[#DDE2E4] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-[11px] font-bold tracking-widest text-[#7C8387] uppercase shrink-0">
          DIPAKAI KREATOR & DESAINER YANG CARI REFERENSI DARI
        </span>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 sm:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center gap-2 text-sm font-semibold text-[#111111] hover:text-[#0789D8] transition-colors"
            >
              <span className="text-base">{brand.icon}</span>
              <span>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

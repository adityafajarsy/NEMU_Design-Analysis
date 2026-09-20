import React from 'react';
import { Search, Heart, Filter, X } from 'lucide-react';

export const SearchFilterBar = ({
  search,
  setSearch,
  selectedStyle,
  setSelectedStyle,
  favoritesOnly,
  setFavoritesOnly
}) => {
  const styles = [
    'Semua',
    'Brutalism',
    'Editorial',
    'Typography',
    'Modernist',
    'Swiss',
    'Minimal',
    'Warm'
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-white p-4 rounded-2xl border border-[#DDE2E4] shadow-xs">
      
      {/* Search Input */}
      <div className="relative flex items-center w-full sm:w-80">
        <Search className="w-4 h-4 text-[#7C8387] absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari style, font, atau kata kunci..."
          className="w-full bg-[#F7F8F8] text-xs sm:text-sm text-[#111111] placeholder:text-[#7C8387] pl-10 pr-8 py-2.5 rounded-xl border border-[#DDE2E4] focus:outline-none focus:border-[#0789D8]"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-2.5 p-1 text-[#7C8387] hover:text-[#111111]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Style Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1">
        {styles.map((styleName) => {
          const isActive = (styleName === 'Semua' && !selectedStyle) || selectedStyle === styleName;
          return (
            <button
              key={styleName}
              onClick={() => setSelectedStyle(styleName === 'Semua' ? '' : styleName)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer select-none whitespace-nowrap ${isActive ? 'bg-[#111111] text-white' : 'bg-[#F7F8F8] text-[#7C8387] hover:text-[#111111] hover:bg-[#EEF1F2]'}`}
            >
              {styleName}
            </button>
          );
        })}

        {/* Favorite Filter Toggle */}
        <button
          onClick={() => setFavoritesOnly(!favoritesOnly)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer flex items-center gap-1.5 select-none whitespace-nowrap ${favoritesOnly ? 'bg-[#D94B4B] text-white' : 'bg-[#F7F8F8] text-[#7C8387] hover:text-[#D94B4B]'}`}
        >
          <Heart className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-white' : ''}`} />
          <span>Favorit</span>
        </button>
      </div>

    </div>
  );
};

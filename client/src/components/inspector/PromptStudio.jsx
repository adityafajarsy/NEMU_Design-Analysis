import React, { useState } from 'react';
import { Sparkles, Copy, Check, ExternalLink, Search, Wand2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const PromptStudio = ({ prompts, styleInfo }) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedKeywordIndex, setCopiedKeywordIndex] = useState(null);
  const [copiedAllKeywords, setCopiedAllKeywords] = useState(false);
  const { addToast } = useToast();

  // Extract Pinterest keywords
  const rawKeywords = prompts?.pinterestKeywords?.length > 0 
    ? prompts.pinterestKeywords 
    : (prompts?.pinterestSearch?.length > 0 ? prompts.pinterestSearch : []);

  const keywordsList = rawKeywords.length > 0 ? rawKeywords : [
    styleInfo?.primaryName ? `${styleInfo.primaryName} design` : 'modern graphic design',
    styleInfo?.moodKeywords?.[0] ? `${styleInfo.moodKeywords[0]} visual reference` : 'editorial layout aesthetic',
    styleInfo?.moodKeywords?.[1] ? `${styleInfo.moodKeywords[1]} poster inspiration` : 'typography poster design',
    'creative direction reference'
  ];

  // Clean any legacy Midjourney flags and format as clean natural language GPT Image prompt
  const cleanPrompt = (text = '') => {
    return text
      .replace(/--ar\s+[0-9:]+/gi, '')
      .replace(/--v\s+[0-9.]+/gi, '')
      .replace(/--q\s+[0-9.]+/gi, '')
      .replace(/--stylize\s+[0-9]+/gi, '')
      .replace(/--s\s+[0-9]+/gi, '')
      .replace(/--chaos\s+[0-9]+/gi, '')
      .replace(/--no\s+[a-zA-Z0-9,\s]+/gi, '')
      .replace(/,(\s*,)+/g, ',')
      .replace(/,\s*\./g, '.')
      .trim();
  };

  // Extract AI Generation Prompt
  const rawPrompt = prompts?.aiGenerationPrompt || prompts?.midjourney || (
    styleInfo?.primaryName 
      ? `A high-impact editorial poster in ${styleInfo.primaryName.toLowerCase()} style. Features ${styleInfo.moodKeywords?.join(', ') || 'striking composition'}, bold typography, tactile lighting, and a polished contemporary aesthetic.`
      : 'A striking editorial poster with clean modernist composition, bold typography, sophisticated lighting, and high-contrast artistic balance.'
  );

  const aiPrompt = cleanPrompt(rawPrompt);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(aiPrompt);
    setCopiedPrompt(true);
    addToast({
      title: 'Prompt Gambar Disalin',
      description: 'Prompt gambar (gaya GPT Image / DALL-E) berhasil disalin ke clipboard.'
    });
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyKeyword = (keyword, index) => {
    navigator.clipboard.writeText(keyword);
    setCopiedKeywordIndex(index);
    addToast({
      title: 'Kata Kunci Disalin',
      description: `"${keyword}" siap dicari di Pinterest.`
    });
    setTimeout(() => setCopiedKeywordIndex(null), 1800);
  };

  const handleCopyAllKeywords = () => {
    navigator.clipboard.writeText(keywordsList.join(', '));
    setCopiedAllKeywords(true);
    addToast({
      title: 'Semua Kata Kunci Disalin',
      description: 'Daftar kata kunci berhasil disalin ke clipboard.'
    });
    setTimeout(() => setCopiedAllKeywords(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-[#DDE2E4] flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EEF1F2] pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7C8387] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#C8FF3D] fill-[#C8FF3D]" />
          Referensi Gaya & Prompt Generator
        </span>
        <span className="text-[11px] font-mono text-[#0789D8] font-semibold">
          1-Klik Salin
        </span>
      </div>

      {/* SECTION 1: KATA KUNCI PINTEREST */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#E60023]/10 text-[#E60023]">
              <Search className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-sm font-bold text-[#111111]">
                Kata Kunci Pencarian Pinterest
              </h4>
              <p className="text-xs text-[#7C8387]">
                Gunakan kata kunci ini di Pinterest untuk menemukan referensi karya dengan gaya serupa.
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyAllKeywords}
            className="self-start sm:self-auto text-xs font-semibold text-[#0789D8] hover:text-[#066ba8] flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#EEF1F2] transition-colors cursor-pointer"
          >
            {copiedAllKeywords ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#42A95C]" />
                <span className="text-[#42A95C]">Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Semua</span>
              </>
            )}
          </button>
        </div>

        {/* Pinterest Keyword Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {keywordsList.map((keyword, index) => {
            const isCopied = copiedKeywordIndex === index;
            const pinterestSearchUrl = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(keyword)}`;

            return (
              <div
                key={index}
                className="group flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-[#F7F8F8] hover:bg-[#F0F2F3] border border-[#DDE2E4] transition-all"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E60023] shrink-0" />
                  <span className="text-xs font-medium text-[#111111] truncate" title={keyword}>
                    {keyword}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {/* Copy Individual Keyword */}
                  <button
                    onClick={() => handleCopyKeyword(keyword, index)}
                    title="Salin kata kunci"
                    className="p-1.5 rounded-lg bg-white hover:bg-[#EEF1F2] border border-[#DDE2E4] text-[#7C8387] hover:text-[#111111] transition-all cursor-pointer active:scale-95"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-[#42A95C]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Open Directly in Pinterest */}
                  <a
                    href={pinterestSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Buka pencarian di Pinterest"
                    className="p-1.5 rounded-lg bg-white hover:bg-[#E60023] hover:text-white border border-[#DDE2E4] text-[#7C8387] transition-all cursor-pointer active:scale-95 flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: PROMPT GENERATOR AI */}
      <div className="flex flex-col gap-3 pt-2 border-t border-[#EEF1F2]">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#C8FF3D]/30 text-[#111111]">
            <Wand2 className="w-4 h-4" />
          </span>
          <div>
            <h4 className="text-sm font-bold text-[#111111]">
              Prompt Generate AI (Gaya & Tipe Serupa)
            </h4>
            <p className="text-xs text-[#7C8387]">
              Prompt deskriptif untuk menghasilkan gambar baru dengan estetika, pencahayaan, dan komposisi serupa.
            </p>
          </div>
        </div>

        {/* Prompt Output Box */}
        <div className="relative group rounded-2xl bg-[#F7F8F8] border border-[#DDE2E4] p-4 flex flex-col justify-between">
          <p className="text-xs sm:text-sm font-mono text-[#111111] leading-relaxed pr-10 selection:bg-[#C8FF3D]">
            {aiPrompt}
          </p>

          {/* Floating Copy Button */}
          <button
            onClick={handleCopyPrompt}
            title="Salin prompt generate AI"
            className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-white hover:bg-[#EEF1F2] border border-[#DDE2E4] text-[#111111] transition-all shadow-xs cursor-pointer active:scale-95"
          >
            {copiedPrompt ? (
              <Check className="w-4 h-4 text-[#42A95C]" />
            ) : (
              <Copy className="w-4 h-4 text-[#7C8387] group-hover:text-[#111111]" />
            )}
          </button>
        </div>
      </div>

      {/* Footer Info Tip */}
      <div className="p-3 rounded-2xl bg-[#F7F8F8] border border-[#DDE2E4] flex items-start gap-2.5">
        <span className="text-sm shrink-0">💡</span>
        <span className="text-[11px] text-[#7C8387] leading-relaxed">
          Gunakan <strong>kata kunci Pinterest</strong> untuk mengeksplorasi ribuan referensi visual di internet, atau gunakan <strong>prompt gambar</strong> di AI image generator (seperti ChatGPT / DALL-E) untuk membuat karya baru dengan tipe dan atmosfer serupa.
        </span>
      </div>
    </div>
  );
};

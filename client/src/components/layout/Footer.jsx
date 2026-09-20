import React, { useState } from 'react';
import { PrivacyPolicyModal } from '../common/PrivacyPolicyModal';

export const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-white border-t border-[#DDE2E4] py-12 text-[#7C8387] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#0789D8] flex items-center justify-center text-white font-bold text-xs">
              N
            </div>
            <span className="font-bold text-sm text-[#111111]">NEMU</span>
            <span className="text-[#DDE2E4]">|</span>
            <span>Visual Reference Intelligence</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium">
            <a href="#about" className="hover:text-[#111111] transition-colors">Tentang</a>
            <a href="#features" className="hover:text-[#111111] transition-colors">Fitur</a>
            <a href="#how-it-works" className="hover:text-[#111111] transition-colors">Cara Kerja</a>
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-[#111111] transition-colors cursor-pointer font-medium"
            >
              Kebijakan Privasi
            </button>
            <span className="hidden sm:inline text-[#DDE2E4]">|</span>
            <span>© 2026 NEMU Inc.</span>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Dialog Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </>
  );
};

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-md',
  className = ''
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className={`relative bg-white rounded-3xl shadow-floating border border-[#DDE2E4] w-full ${maxWidth} p-5 sm:p-6 z-10 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-200 ${className}`}>
        {/* Absolute Close Action Button */}
        <button
          onClick={onClose}
          aria-label="Tutup modal"
          className="absolute top-4 right-4 text-[#7C8387] hover:text-[#111111] bg-[#F7F8F8] hover:bg-[#EEF1F2] p-1.5 rounded-full transition-colors cursor-pointer z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {title && (
          <div className="flex items-center justify-between mb-3 pr-8">
            <h3 className="text-lg font-bold text-[#111111] tracking-tight">{title}</h3>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

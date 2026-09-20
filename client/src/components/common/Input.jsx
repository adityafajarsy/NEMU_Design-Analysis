import React from 'react';

export const Input = ({
  label,
  error,
  icon,
  rightElement,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#3E4346]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-[#7C8387] pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-white text-[#111111] placeholder:text-[#7C8387] border border-[#DDE2E4] rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:border-[#0789D8] focus:ring-2 focus:ring-[#0789D8]/15 ${icon ? 'pl-10' : ''} ${rightElement ? 'pr-10' : ''} ${error ? 'border-[#D94B4B] focus:border-[#D94B4B] focus:ring-[#D94B4B]/15' : ''} ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 text-[#7C8387] flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs text-[#D94B4B] font-medium mt-0.5">{error}</span>
      )}
    </div>
  );
};

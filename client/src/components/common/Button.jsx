import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconRight,
  isLoading = false,
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5 rounded-full',
    md: 'px-6 py-2.5 text-sm gap-2 rounded-full',
    lg: 'px-8 py-3.5 text-base gap-2.5 rounded-full',
    icon: 'p-2.5 rounded-full aspect-square'
  };

  const variantStyles = {
    primary: 'bg-[#C8FF3D] hover:bg-[#DFFF78] text-[#111111] font-semibold shadow-sm hover:shadow-glow-lime',
    secondary: 'bg-[#111111] hover:bg-[#25282A] text-white shadow-sm',
    'dark-pill': 'bg-[#111111]/80 hover:bg-[#111111] text-white border border-white/15 backdrop-blur-md',
    outline: 'bg-white hover:bg-[#F7F8F8] text-[#111111] border border-[#DDE2E4]',
    ghost: 'bg-transparent hover:bg-[#EEF1F2] text-[#111111]',
    'blue-pill': 'bg-[#0789D8] hover:bg-[#0878B8] text-white'
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
          {iconRight && <span className="shrink-0">{iconRight}</span>}
        </>
      )}
    </button>
  );
};

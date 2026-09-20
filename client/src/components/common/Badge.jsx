import React from 'react';

export const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  icon,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-2.5 py-1 text-[11px]',
    md: 'px-3.5 py-1.5 text-xs',
    lg: 'px-4 py-2 text-sm'
  };

  const variantStyles = {
    neutral: 'bg-[#F7F8F8] text-[#111111] border border-[#DDE2E4]',
    dark: 'bg-[#111111] text-white',
    lime: 'bg-[#C8FF3D] text-[#111111] font-semibold',
    blue: 'bg-[#0789D8]/10 text-[#0789D8] border border-[#0789D8]/20',
    white: 'bg-white text-[#111111] border border-[#DDE2E4] shadow-xs'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full tracking-tight select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

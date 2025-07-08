import React from 'react';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-pcd-accent text-white hover:bg-opacity-90',
  secondary: 'bg-pcd-card-bg border border-pcd-border text-pcd-text-dark hover:bg-pcd-bg-soft',
  ghost: 'bg-transparent text-pcd-text-dark hover:bg-pcd-bg-soft',
};

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button' }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={`px-4 py-2 rounded-lg font-medium transition-colors ${variantClasses[variant]} ${className}`.trim()}>
      {children}
    </button>
  );
};

export default Button;

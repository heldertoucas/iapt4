/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    className?: string;
    disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, onClick, variant = 'primary', className = '', disabled, ...props }: ButtonProps) => {
    const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none';

    const variantClasses = {
        primary: 'bg-pcd-accent text-white hover:bg-opacity-90',
        secondary: 'bg-pcd-accent-light text-pcd-accent hover:bg-pcd-accent hover:text-white',
        ghost: 'bg-transparent border-2 border-pcd-accent text-pcd-accent hover:bg-pcd-accent hover:text-white',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
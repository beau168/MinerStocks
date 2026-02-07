import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'secondary', className = '', ...props }) => {
    let variantClasses = '';

    switch (variant) {
        case 'primary':
            variantClasses = 'bg-primary text-white hover:bg-blue-700';
            break;
        case 'secondary':
            variantClasses = 'bg-surface-dark border border-border-dark text-text-bright hover:text-white hover:bg-surface-darker';
            break;
        case 'ghost':
            variantClasses = 'text-text-secondary hover:bg-surface-dark hover:text-white';
            break;
    }

    return (
        <button
            className={`px-4 py-1.5 rounded transition-colors disabled:opacity-30 ${variantClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

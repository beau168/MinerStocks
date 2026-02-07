import React, { type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { }

export const Select: React.FC<SelectProps> = ({ className = '', ...props }) => {
    return (
        <div className="relative w-full">
            <select
                className={`w-full bg-white dark:bg-surface-dark/50 border border-gray-300 dark:border-border-dark text-slate-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none cursor-pointer custom-select ${className}`}
                {...props}
            />
        </div>
    );
};

import React, { type InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
    return (
        <label className={`flex items-center gap-3 cursor-pointer group ${className}`}>
            <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark text-primary focus:ring-offset-white dark:focus:ring-offset-surface-darker focus:ring-primary"
                {...props}
            />
            <span className="text-xs text-slate-600 dark:text-text-secondary group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                {label}
            </span>
        </label>
    );
};

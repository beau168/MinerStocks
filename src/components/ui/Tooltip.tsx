import React from 'react';

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    return (
        <span className="tooltip cursor-help underline decoration-dotted decoration-text-secondary/50 underline-offset-4 relative inline-block">
            {children}
            <span className="tooltiptext">{text}</span>
        </span>
    );
};

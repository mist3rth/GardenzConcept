import React from 'react';

interface HempLeafProps {
    /** Icon size in pixels (matches Lucide API) */
    size?: number;
    /** Additional CSS classes */
    className?: string;
    /** Stroke width (default: 2, matches Lucide) */
    strokeWidth?: number;
    /** Fill color (default: none for outline style) */
    fill?: string;
}

/**
 * Custom hemp/cannabis leaf icon — 7 leaflets fan shape.
 * API-compatible with Lucide icons (size, className, strokeWidth).
 */
export const HempLeaf: React.FC<HempLeafProps> = ({
    size = 24,
    className = '',
    strokeWidth = 2,
    fill = 'none',
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        {/* Center leaflet (tallest) */}
        <path d="M12 2 C10.5 5.5, 9.5 8, 10 11 C10.5 8, 11 5.5, 12 2 Z" />
        <path d="M12 2 C13.5 5.5, 14.5 8, 14 11 C13.5 8, 13 5.5, 12 2 Z" />

        {/* Inner left leaflet */}
        <path d="M12 11 C10 9, 7 7.5, 4.5 7.5 C7 8.5, 9.5 10, 12 11 Z" />
        {/* Inner right leaflet */}
        <path d="M12 11 C14 9, 17 7.5, 19.5 7.5 C17 8.5, 14.5 10, 12 11 Z" />

        {/* Mid left leaflet */}
        <path d="M12 11 C9.5 10.5, 6 10, 3 10.5 C6 11.2, 9 11.5, 12 11 Z" />
        {/* Mid right leaflet */}
        <path d="M12 11 C14.5 10.5, 18 10, 21 10.5 C18 11.2, 15 11.5, 12 11 Z" />

        {/* Outer left leaflet (smallest) */}
        <path d="M12 12 C9.5 12.5, 6.5 13.5, 5 15 C7 13.8, 9.5 13, 12 12 Z" />
        {/* Outer right leaflet (smallest) */}
        <path d="M12 12 C14.5 12.5, 17.5 13.5, 19 15 C17 13.8, 14.5 13, 12 12 Z" />

        {/* Stem */}
        <line x1="12" y1="11" x2="12" y2="22" />
    </svg>
);

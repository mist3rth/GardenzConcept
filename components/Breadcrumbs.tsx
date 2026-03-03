import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    action?: () => void;
    path?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    onHomeClick?: () => void;
    theme?: 'light' | 'dark';
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onHomeClick, theme = 'light' }) => {
    // Styles dynamiques selon le thème (Dark pour Extreme, Light pour le reste)
    const textClass = theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gardenz-dark';
    const activeClass = theme === 'dark' ? 'text-white font-bold' : 'text-gardenz-dark font-bold';
    const separatorClass = theme === 'dark' ? 'text-gray-600' : 'text-gray-300';
    const homeIconClass = theme === 'dark' ? 'text-gardenz-cyan' : 'text-gardenz-green';

    return (
        /* Scroll horizontal sur mobile pour garder tous les liens accessibles */
        <nav
            className="overflow-x-auto pb-1 mb-6 animate-fade-in font-sans"
            aria-label="Fil d'Ariane"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
            <div className="flex items-center whitespace-nowrap text-xs md:text-sm font-medium min-w-max">
                <Link
                    to="/"
                    className={`flex items-center gap-1 transition-colors group shrink-0 ${textClass}`}
                    aria-label="Retour à l'accueil"
                    onClick={onHomeClick}
                >
                    <Home size={16} className={`group-hover:scale-110 transition-transform ${homeIconClass}`} />
                    <span className="hidden md:inline ml-1">Accueil</span>
                </Link>

                {items.map((item, index) => (
                    <div key={index} className="flex items-center shrink-0">
                        <ChevronRight size={14} className={`mx-1.5 ${separatorClass}`} />
                        {item.path ? (
                            <Link to={item.path} className={`transition-colors underline-offset-4 hover:underline ${textClass}`}>
                                {item.label}
                            </Link>
                        ) : item.action ? (
                            <button onClick={item.action} className={`transition-colors underline-offset-4 hover:underline ${textClass}`}>
                                {item.label}
                            </button>
                        ) : (
                            <span className={`${activeClass} max-w-[200px] truncate`}>
                                {item.label}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
};

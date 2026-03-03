
import React, { useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { Clock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';
import { SEOHead } from './SEOHead';

interface BlogPageProps { }

export const BlogPage: React.FC<BlogPageProps> = () => {
    const [activeCategory, setActiveCategory] = useState<string>('Tous');
    const [displayCount, setDisplayCount] = useState(9);

    // FILTRES MIS À JOUR SELON LA STRATÉGIE
    const categories = ['Tous', 'Bien-être', 'eXtreme Lab', 'Lifestyle', 'Culture', 'Guide'];

    // Filter posts
    const filteredPosts = activeCategory === 'Tous'
        ? BLOG_POSTS
        : BLOG_POSTS.filter(post => post.category === activeCategory);

    // Pagination Logic
    const visiblePosts = filteredPosts.slice(0, displayCount);
    const featuredPost = BLOG_POSTS[0]; // The first post is featured
    const gridPosts = visiblePosts.filter(p => p.id !== featuredPost.id); // Exclude featured from grid if present

    const handleLoadMore = () => {
        setDisplayCount(prev => prev + 6);
    };

    return (
        <div className="bg-gardenz-white min-h-screen font-sans">
            <SEOHead 
                title="Le Journal | Culture CBD, eXtreme Lab et Lifestyle | Gardenz" 
                description="Explorez le Gardenz Journal. Actualités CBD, guides de vaporisation, décryptage des cannabinoïdes et culture urbaine."
            />
            {/* A. EN-TÊTE */}
            <div className="bg-[#111] pt-32 pb-24 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gardenz-green/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gardenz-terra/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        LE GARDENZ <span className="text-gardenz-green drop-shadow-[0_0_15px_rgba(56,118,29,0.4)]">JOURNAL</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Décryptage moléculaire, Culture urbaine et Lifestyle décomplexé. <br />L'expertise du Clan, sans filtre.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* B. ARTICLE ÉPINGLÉ (HERO) */}
                {activeCategory === 'Tous' && featuredPost && (
                    <Link
                        to={`/blog/${featuredPost.id}`}
                        className="group relative rounded-[2.5rem] overflow-hidden aspect-[16/9] md:aspect-[21/9] cursor-pointer mb-20 shadow-2xl border border-white/10 block"
                    >
                        <img
                            src={getAssetUrl(featuredPost.image)}
                            alt={featuredPost.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>

                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:max-w-3xl">
                            <span className="bg-gardenz-green text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-4 inline-block">
                                À la une
                            </span>
                            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-gardenz-green transition-colors">
                                {featuredPost.title}
                            </h2>
                            <p className="text-gray-300 text-lg mb-6 line-clamp-2">
                                {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                                <span className="flex items-center gap-2"><User size={16} /> {featuredPost.author}</span>
                                <span className="flex items-center gap-2"><Clock size={16} /> {featuredPost.readTime}</span>
                                <span className="text-white font-bold flex items-center gap-2 ml-auto md:ml-0 group-hover:translate-x-2 transition-transform">
                                    Lire l'article <ArrowRight size={18} />
                                </span>
                            </div>
                        </div>
                    </Link>
                )}

                {/* C. NAVIGATION DES THÈMES */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all
                        ${activeCategory === cat
                                    ? 'bg-gardenz-dark text-white shadow-lg transform scale-105'
                                    : 'bg-white border border-gray-200 text-gray-500 hover:border-gardenz-dark hover:text-gardenz-dark'
                                }
                    `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* D. GRILLE D'ARTICLES */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
                    {visiblePosts.length > 0 ? (
                        gridPosts.map(post => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.id}`}
                                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-gardenz-green/30 transition-all cursor-pointer flex flex-col h-full"
                            >
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img
                                        src={getAssetUrl(post.image)}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-gardenz-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                                        <span>{post.date}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-gardenz-dark mb-4 line-clamp-2 group-hover:text-gardenz-green transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-gardenz-dark mt-auto group-hover:translate-x-2 transition-transform uppercase tracking-widest">
                                        Lire la suite <ArrowRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-500 italic">
                            Aucun article pour le moment dans cette catégorie.
                        </div>
                    )}
                </div>

                {/* E. PAGINATION */}
                {visiblePosts.length < filteredPosts.length && (
                    <div className="text-center mb-20">
                        <button
                            onClick={handleLoadMore}
                            className="bg-white border-2 border-gardenz-dark text-gardenz-dark px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gardenz-dark hover:text-white transition-all shadow-lg active:scale-95"
                        >
                            Charger plus d'articles
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

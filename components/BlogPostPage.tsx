import React, { useState } from 'react';
import { BLOG_POSTS, ALL_PRODUCTS } from '../constants';
import { ArrowLeft, Clock, Calendar, User, Share2, Facebook, Twitter, Link as LinkIcon, ArrowRight, CheckCircle, ArrowUp } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Link, useParams } from 'react-router-dom';

interface BlogPostPageProps { }

export const BlogPostPage: React.FC<BlogPostPageProps> = () => {
    const { id: postId } = useParams();
    const post = BLOG_POSTS.find(p => p.id === postId);

    // Form state corresponding to NewsletterSection
    const [email, setEmail] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'new' | 'existing'>('idle');
    const [isHovering, setIsHovering] = useState(false);

    if (!post) return <div>Article non trouvé</div>;

    // Get Related Products
    const relatedProducts = post.relatedProducts
        ? ALL_PRODUCTS.filter(p => post.relatedProducts?.includes(p.id))
        : [];

    // Get Related Articles (Same Category)
    const relatedPosts = BLOG_POSTS
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 3);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
            });
        } else {
            // Fallback
            alert("Lien copié dans le presse-papier !");
        }
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'news2@gardenz.fr') {
            setSubscriptionStatus('existing');
        } else {
            setSubscriptionStatus('new');
        }
    };

    const handleReset = () => {
        setSubscriptionStatus('idle');
        setEmail('');
    };

    return (
        <div className="bg-gardenz-white min-h-screen font-sans">

            {/* HEADER NAV */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-40 pt-24 pb-4 px-6 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link
                        to="/blog"
                        className="flex items-center gap-2 text-gray-500 hover:text-gardenz-dark transition-colors font-medium text-sm"
                    >
                        <ArrowLeft size={18} /> Retour au Journal
                    </Link>
                    <span className="text-xs font-bold text-gardenz-green uppercase tracking-widest bg-gardenz-green/10 px-3 py-1 rounded-full">
                        {post.category}
                    </span>
                </div>
            </div>

            {/* ARTICLE CONTENT */}
            <article className="max-w-4xl mx-auto px-6 py-12">

                {/* Header Info */}
                <div className="text-center mb-12">
                    <h1 className="font-display text-3xl md:text-5xl font-bold text-gardenz-dark mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
                        <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
                        <span className="flex items-center gap-2"><Clock size={16} /> {post.readTime}</span>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="rounded-[2rem] overflow-hidden shadow-2xl mb-16 aspect-video">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Body */}
                    <div className="lg:w-3/4">
                        <div className="prose prose-lg prose-stone max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-gardenz-green prose-a:no-underline hover:prose-a:underline">
                            <p className="lead font-medium text-xl text-gray-600 mb-8 border-l-4 border-gardenz-green pl-6 italic">
                                {post.excerpt}
                            </p>
                            {/* Simulating Rich Text Rendering */}
                            <div dangerouslySetInnerHTML={{ __html: typeof post.content === 'string' ? post.content : '' }} />

                            {/* If content is just a string in mock, we display it. In real app, this would be a Rich Text Renderer */}
                            <p className="text-gray-700 leading-relaxed">
                                {/* Fallback mock text filler for length if content is short */}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <h3 className="text-2xl font-bold text-gardenz-dark mt-8 mb-4">L'avis de l'expert</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 my-6">
                                <li>Point important numéro 1 sur le sujet.</li>
                                <li>Détail technique crucial à retenir.</li>
                                <li>Conseil d'utilisation pour maximiser l'expérience.</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                En conclusion, {post.title.toLowerCase()} représente une facette essentielle de la culture Gardenz. N'hésitez pas à explorer nos produits pour vous faire votre propre avis.
                            </p>
                        </div>

                        {/* Share Block */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                            <span className="font-bold text-gardenz-dark">Partager cet article :</span>
                            <div className="flex gap-4">
                                <button onClick={handleShare} className="p-2 rounded-full bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors"><Facebook size={20} /></button>
                                <button onClick={handleShare} className="p-2 rounded-full bg-gray-50 hover:bg-sky-50 text-gray-600 hover:text-sky-500 transition-colors"><Twitter size={20} /></button>
                                <button onClick={handleShare} className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gardenz-dark transition-colors"><LinkIcon size={20} /></button>
                            </div>
                        </div>

                        {/* Author Bio */}
                        <div className="mt-12 bg-gray-50 p-8 rounded-2xl flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-gardenz-dark flex items-center justify-center text-white font-bold text-xl shrink-0">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gardenz-dark text-lg">{post.author}</h4>
                                <p className="text-sm text-gray-500 mb-2">Expert Gardenz & Passionné</p>
                                <p className="text-sm text-gray-600">
                                    Toujours à la recherche des dernières tendances et des meilleures variétés pour vous offrir une expertise sans filtre.
                                </p>
                            </div>
                        </div>
                        
                        {/* Newsletter In-Content */}
                        <div className="mt-12 bg-[#111] p-8 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[250px]">
                            
                            {/* Background Ambience */}
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gardenz-magenta/10 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                            
                            {subscriptionStatus === 'idle' ? (
                                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 z-10 animate-fade-in relative">
                                    <div className="text-left md:w-1/2 space-y-4">
                                        <div>
                                            <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-2 uppercase italic tracking-tighter">
                                                NE RATEZ PAS <span className="text-gardenz-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">LA VIBE.</span>
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                Drops exclusifs, accès prioritaires et astuces. Ajoutez une dose de Gardenz dans votre inbox.
                                            </p>
                                        </div>
                                        
                                        <div 
                                            className="inline-flex items-center gap-3 bg-gardenz-green/10 border border-gardenz-green/30 p-3 rounded-xl backdrop-blur-sm cursor-default transition-colors hover:bg-gardenz-green/20"
                                            onMouseEnter={() => setIsHovering(true)}
                                            onMouseLeave={() => setIsHovering(false)}
                                        >
                                            <span className={`text-2xl inline-block ${isHovering ? 'animate-bounce' : ''}`}>🎁</span>
                                            <div>
                                                <p className="text-gardenz-green font-bold text-sm">
                                                    "ON VOUS OFFRE -20%"
                                                </p>
                                                <p className="text-gardenz-green/80 text-[10px] leading-tight mt-0.5">
                                                    Sur votre première commande.<br/>Sans minimum d'achat.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-1/2">
                                        <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                                            <div>
                                                <label htmlFor="blog-email" className="block text-xs font-bold uppercase text-gray-500 tracking-widest mb-2">Votre adresse email</label>
                                                <input 
                                                    id="blog-email"
                                                    type="email" 
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="vibe@gardenz.fr" 
                                                    className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gardenz-cyan focus:ring-1 focus:ring-gardenz-cyan transition-colors" 
                                                />
                                            </div>
                                            <button 
                                                type="submit"
                                                className="w-full bg-gardenz-cyan text-black font-bold uppercase tracking-widest px-6 py-3.5 rounded-lg hover:bg-white hover:text-gardenz-cyan transition-all shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] transform hover:-translate-y-0.5"
                                            >
                                                S'abonner
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center animate-scale-up space-y-4 z-10 py-4 max-w-lg">
                                    <div className="w-16 h-16 bg-gardenz-cyan/10 rounded-full flex items-center justify-center text-gardenz-cyan mx-auto mb-2 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                                        <CheckCircle size={32} />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-bold text-white mb-2 uppercase leading-tight">
                                            {subscriptionStatus === 'new' ? 'VOUS FAITES PARTIE DU MOUVEMENT. 🤝' : 'RAVI DE VOUS REVOIR ! 👋'}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {subscriptionStatus === 'new' 
                                                ? "Presque fini ! Vous allez recevoir un email pour valider votre inscription (double opt-in)." 
                                                : "Vous êtes déjà inscrit à notre newsletter ! Merci de votre fidélité."}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={handleReset}
                                        className="inline-flex mt-4 text-gardenz-cyan hover:text-white font-bold text-sm tracking-widest uppercase transition-colors"
                                    >
                                        Retour à l'article
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar: Related Products */}
                    <aside className="lg:w-1/4 space-y-8">
                        {relatedProducts.length > 0 && (
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-32">
                                <h3 className="font-display font-bold text-lg mb-6">Produits Cités</h3>
                                <div className="space-y-6">
                                    {relatedProducts.map(product => (
                                        <Link key={product.id} to={`/produit/${product.id}`} className="group cursor-pointer block">
                                            <div className="aspect-square rounded-xl overflow-hidden mb-3 border border-gray-100">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                            </div>
                                            <h4 className="font-bold text-sm text-gardenz-dark group-hover:text-gardenz-green transition-colors line-clamp-1">{product.name}</h4>
                                            <span className="text-sm font-medium text-gray-500">{product.price.toFixed(2)}€</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                    </aside>

                </div>

            </article>

            {/* RELATED ARTICLES */}
            <section className="bg-gray-50 py-20 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="font-display text-3xl font-bold text-gardenz-dark mb-10 text-center">Plus de Vibe à lire</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedPosts.map(p => (
                            <Link
                                key={p.id}
                                to={`/blog/${p.id}`}
                                onClick={() => window.scrollTo(0, 0)}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group block"
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <span className="text-xs font-bold text-gardenz-green uppercase tracking-widest mb-2 block">{p.category}</span>
                                    <h3 className="font-bold text-lg text-gardenz-dark mb-2 line-clamp-2 group-hover:text-gardenz-green transition-colors">{p.title}</h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
                                        <span>{p.readTime}</span>
                                        <ArrowRight size={14} className="ml-auto group-hover:translate-x-1 transition-transform text-gardenz-dark" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};


import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';

// Critical/Layout components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
// HomePage is critical for LCP on the root path, usually kept eager, but let's lazy load the rest.
import { HomePage } from './components/HomePage';

// Lazy loaded pages
const ShopsPage = lazy(() => import('./components/ShopsPage').then(module => ({ default: module.ShopsPage })));
const FaqPage = lazy(() => import('./components/FaqPage').then(module => ({ default: module.FaqPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then(module => ({ default: module.ContactPage })));
const AdnPage = lazy(() => import('./components/AdnPage').then(module => ({ default: module.AdnPage })));
const IndexMoleculairePage = lazy(() => import('./components/IndexMoleculairePage').then(module => ({ default: module.IndexMoleculairePage })));
const TraceabilityPage = lazy(() => import('./components/TraceabilityPage').then(module => ({ default: module.TraceabilityPage })));
const ShopPage = lazy(() => import('./components/ShopPage').then(module => ({ default: module.ShopPage })));
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage').then(module => ({ default: module.ProductDetailPage })));
const DeliveryPage = lazy(() => import('./components/DeliveryPage').then(module => ({ default: module.DeliveryPage })));
const LegalPage = lazy(() => import('./components/LegalPage').then(module => ({ default: module.LegalPage })));
const MentionsLegalesPage = lazy(() => import('./components/MentionsLegalesPage').then(module => ({ default: module.MentionsLegalesPage })));
const PrivacyPage = lazy(() => import('./components/PrivacyPage').then(module => ({ default: module.PrivacyPage })));
const CookieManagementPage = lazy(() => import('./components/CookieManagementPage').then(module => ({ default: module.CookieManagementPage })));
const LoginPage = lazy(() => import('./components/LoginPage').then(module => ({ default: module.LoginPage })));
const MyAccountPage = lazy(() => import('./components/MyAccountPage').then(module => ({ default: module.MyAccountPage })));
const LoyaltyReferralPage = lazy(() => import('./components/LoyaltyReferralPage').then(module => ({ default: module.LoyaltyReferralPage })));
const AffiliatePage = lazy(() => import('./components/AffiliatePage').then(module => ({ default: module.AffiliatePage })));
const PartnerPage = lazy(() => import('./components/PartnerPage').then(module => ({ default: module.PartnerPage })));
const BlogPage = lazy(() => import('./components/BlogPage').then(module => ({ default: module.BlogPage })));
const BlogPostPage = lazy(() => import('./components/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const ProtocolePage = lazy(() => import('./components/ProtocolePage').then(module => ({ default: module.ProtocolePage })));
const NotFoundPage = lazy(() => import('./components/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';
import { CookieProvider } from './context/CookieContext';
import { CookieBanner } from './components/CookieBanner';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutProvider } from './context/CheckoutContext';
import { CheckoutLayout } from './components/Checkout/CheckoutLayout';
import { ChatBot } from './components/ChatBot';
import { Product } from './types';
import { AudioProvider } from './context/AudioContext';
import { GlobalMusicPlayer } from './components/GlobalMusicPlayer';
import { AuthProvider } from './context/AuthContext';
import { PageLoader } from './components/PageLoader';

// Wrapper for scrolling to top on route change
const ScrollToTopOnchange = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// Main App Layout Component
const AppLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);

    const isHome = location.pathname === '/';
    const isAdn = location.pathname === '/adn';
    const isIndex = location.pathname === '/index-moleculaire';
    const isTraceability = location.pathname === '/tracabilite';

    // Background logic
    const globalBgClass = (isHome || isAdn || isIndex || isTraceability) ? 'bg-gardenz-black' : 'bg-gardenz-white';

    const handleProductClick = (id: string) => {
        navigate(`/produit/${id}`);
    };

    const handleQuickView = (product: Product) => {
        setQuickViewProduct(product);
    };

    if (location.pathname === '/connexion') {
        return (
            <div className="min-h-screen bg-gardenz-black font-sans selection:bg-gardenz-green selection:text-white">
                <Suspense fallback={<PageLoader fullScreen />}>
                    <LoginPage />
                </Suspense>
                <CookieBanner />
            </div>
        );
    }

    if (location.pathname === '/commande') {
        return (
            <CheckoutProvider>
                <CheckoutLayout />
            </CheckoutProvider>
        );
    }

    return (
            <div className={`min-h-screen ${globalBgClass} font-sans selection:bg-gardenz-green selection:text-white transition-colors duration-700 relative`}>
                <ScrollToTopOnchange />
                {isHome && (
                    <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                )}

                <Navbar
                    currentPage={isHome ? 'home' : location.pathname.substring(1)}
                    onProductClick={handleProductClick}
                />

                <CartDrawer />

                <QuickViewModal
                    isOpen={!!quickViewProduct}
                    onClose={() => setQuickViewProduct(null)}
                    product={quickViewProduct}
                />

                <CookieBanner />

                <main className="relative z-10">
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/" element={<HomePage onProductClick={handleProductClick} onQuickView={handleQuickView} />} />
                            <Route path="/boutique" element={<ShopPageWrapper onProductClick={handleProductClick} onQuickView={handleQuickView} />} />
                            <Route path="/produit/:id" element={<ProductDetailPageWrapper onProductClick={handleProductClick} onQuickView={handleQuickView} />} />

                            <Route path="/boutiques" element={<ShopsPage />} />
                            <Route path="/faq" element={<FaqPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/adn" element={<AdnPage />} />
                            <Route path="/index-moleculaire" element={<IndexMoleculairePage />} />
                            <Route path="/tracabilite" element={<TraceabilityPage />} />
                            <Route path="/livraison" element={<DeliveryPage />} />
                            <Route path="/cgv" element={<LegalPage />} />
                            <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
                            <Route path="/confidentialite" element={<PrivacyPage />} />
                            <Route path="/cookies" element={<CookieManagementPage />} />
                            <Route path="/mon-compte" element={<MyAccountPage />} />
                            <Route path="/fidelite" element={<LoyaltyReferralPage />} />
                            <Route path="/affiliation" element={<AffiliatePage />} />
                            <Route path="/pros" element={<PartnerPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:id" element={<BlogPostPage />} />
                            <Route path="/protocole" element={<ProtocolePage />} />

                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Suspense>
                </main>

                <Footer />
                <ChatBot />
                <ScrollToTop />
                <GlobalMusicPlayer />
            </div>
    );
};

// Wrappers to extract params and feed to existing components (Temporary Step)
import { useSearchParams, useParams } from 'react-router-dom';

const ShopPageWrapper: React.FC<any> = ({ onProductClick, onQuickView }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Read from URL
    const currentUniverse = searchParams.get('filter') || 'All';
    const currentCategory = searchParams.get('category') || 'All';
    const currentUsage = searchParams.get('usage') || 'All';
    const currentIntensity = searchParams.get('intensity') || 'All';
    const currentMolecule = searchParams.get('molecule') || 'All';

    // Fake State for Quality Filters (Not in URL yet for simplicity, but could be)
    // For a real migration, these should be in URL key 'q' or similar.
    const [qualityFilters, setQualityFilters] = React.useState({ labTested: false, fullSpectrum: false, premium: false });

    // Setters update URL
    const handleFilterChange = (updates: { universe?: string; category?: string; usage?: string; intensity?: string; molecule?: string }) => {
        const newParams = new URLSearchParams(searchParams);

        if (updates.universe !== undefined) updates.universe === 'All' ? newParams.delete('filter') : newParams.set('filter', updates.universe);
        if (updates.category !== undefined) updates.category === 'All' ? newParams.delete('category') : newParams.set('category', updates.category);
        if (updates.usage !== undefined) updates.usage === 'All' ? newParams.delete('usage') : newParams.set('usage', updates.usage);
        if (updates.intensity !== undefined) updates.intensity === 'All' ? newParams.delete('intensity') : newParams.set('intensity', updates.intensity);
        if (updates.molecule !== undefined) updates.molecule === 'All' ? newParams.delete('molecule') : newParams.set('molecule', updates.molecule);

        setSearchParams(newParams);
    };

    return (
        <ShopPage
            currentUniverse={currentUniverse}
            currentCategory={currentCategory}
            currentUsage={currentUsage}
            currentIntensity={currentIntensity}
            currentMolecule={currentMolecule}
            currentQualityFilters={qualityFilters}
            onFilterChange={handleFilterChange}
            onQualityFilterChange={(k, v) => setQualityFilters(p => ({ ...p, [k]: v }))}
            onProductClick={onProductClick}
            onQuickView={onQuickView}
        />
    );
};

const ProductDetailPageWrapper: React.FC<any> = ({ onProductClick, onQuickView }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    if (!id) return null;
    return (
        <ProductDetailPage
            productId={id}
            onBack={() => navigate(-1)}
            onProductClick={onProductClick}
            onQuickView={onQuickView}
        />
    );
};



function App() {
    return (
        <Router>
            <CookieProvider>
                <CartProvider>
                    <AudioProvider>
                        <AuthProvider>
                            <AppLayout />
                        </AuthProvider>
                    </AudioProvider>
                </CartProvider>
            </CookieProvider>
        </Router>
    );
}

export default App;

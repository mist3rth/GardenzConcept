
import React, { useState, useMemo } from 'react';
import {
    ShieldCheck, Microscope, QrCode, FileText, Search,
    FlaskConical, Activity, ArrowRight, Download, Filter,
    Check, AlertCircle, Info, ChevronRight, ShoppingCart, Bell, X
} from 'lucide-react';
import { ALL_PRODUCTS } from '../constants';
import { Link } from 'react-router-dom';

interface LabResult {
    id: string;
    productName: string;
    lotNumber: string;
    date: string;
    universe: 'wellness' | 'extreme';
    category: string;
    molecules: { name: string; value: number }[];
    status: 'PASS';
    productId: string;
}

const MOCK_LAB_RESULTS: LabResult[] = [
    {
        id: 'lr1', productName: 'Moonrock Ice', lotNumber: 'GZ-2025-E01-X', date: '12/05/2025', universe: 'extreme', category: 'Concentrés',
        molecules: [{ name: 'THCP', value: 25 }, { name: 'CBD', value: 15 }, { name: 'THC', value: 0.28 }], status: 'PASS', productId: 'e1'
    },
    {
        id: 'lr2', productName: 'Huile CBD Sommeil', lotNumber: 'GZ-2025-W01-S', date: '10/05/2025', universe: 'wellness', category: 'Huiles',
        molecules: [{ name: 'CBD', value: 20 }, { name: 'CBN', value: 5 }, { name: 'THC', value: 0.05 }], status: 'PASS', productId: 'w1'
    },
    {
        id: 'lr3', productName: 'Amnesia Haze Bio', lotNumber: 'GZ-2025-W02-F', date: '08/05/2025', universe: 'wellness', category: 'Fleurs',
        molecules: [{ name: 'CBD', value: 12 }, { name: 'THC', value: 0.22 }], status: 'PASS', productId: 'w2'
    },
    {
        id: 'lr4', productName: 'Diamonds THCP Pur', lotNumber: 'GZ-2025-E02-D', date: '05/05/2025', universe: 'extreme', category: 'Concentrés',
        molecules: [{ name: 'THCP', value: 94 }, { name: 'THC', value: 0.18 }], status: 'PASS', productId: 'e2'
    },
    {
        id: 'lr5', productName: 'Hash Lebanais THCP', lotNumber: 'GZ-2025-E03-R', date: '03/05/2025', universe: 'extreme', category: 'Résines',
        molecules: [{ name: 'THCP', value: 18 }, { name: 'CBD', value: 10 }, { name: 'THC', value: 0.25 }], status: 'PASS', productId: 'e3'
    },
    {
        id: 'lr6', productName: 'Huile CBN Nuit Profonde', lotNumber: 'GZ-2025-W03-H', date: '01/05/2025', universe: 'wellness', category: 'Huiles',
        molecules: [{ name: 'CBN', value: 10 }, { name: 'CBD', value: 5 }, { name: 'THC', value: 0.02 }], status: 'PASS', productId: 'w4'
    },
    {
        id: 'lr7', productName: 'Vape Pen Focus Menthe', lotNumber: 'GZ-2025-W04-V', date: '28/04/2025', universe: 'wellness', category: 'Vape',
        molecules: [{ name: 'CBG', value: 40 }, { name: 'CBD', value: 20 }, { name: 'THC', value: 0.00 }], status: 'PASS', productId: 'w5'
    },
    {
        id: 'lr8', productName: 'Orange Bud Indoor', lotNumber: 'GZ-2025-W05-F', date: '25/04/2025', universe: 'wellness', category: 'Fleurs',
        molecules: [{ name: 'CBD', value: 11 }, { name: 'THC', value: 0.21 }], status: 'PASS', productId: 'w8'
    },
    {
        id: 'lr9', productName: 'Triple Filtered THCP', lotNumber: 'GZ-2025-E04-R', date: '22/04/2025', universe: 'extreme', category: 'Résines',
        molecules: [{ name: 'THCP', value: 35 }, { name: 'THC', value: 0.29 }], status: 'PASS', productId: 'e15'
    },
    {
        id: 'lr10', productName: 'Huile CBG Énergie', lotNumber: 'GZ-2025-W06-H', date: '20/04/2025', universe: 'wellness', category: 'Huiles',
        molecules: [{ name: 'CBG', value: 15 }, { name: 'CBD', value: 10 }, { name: 'THC', value: 0.04 }], status: 'PASS', productId: 'w9'
    },
    {
        id: 'lr11', productName: 'Alien Kush HHCP-O', lotNumber: 'GZ-2025-E05-F', date: '18/04/2025', universe: 'extreme', category: 'Fleurs',
        molecules: [{ name: 'HHCP-O', value: 15 }, { name: 'THC', value: 0.28 }], status: 'PASS', productId: 'e23'
    },
    {
        id: 'lr12', productName: 'Gummies Delta-9 Limit', lotNumber: 'GZ-2025-E06-G', date: '15/04/2025', universe: 'extreme', category: 'Comestibles',
        molecules: [{ name: 'D9-THC', value: 0.29 }, { name: 'CBD', value: 10 }], status: 'PASS', productId: 'e3'
    },
    {
        id: 'lr13', productName: 'Shatter HHC-P Gold', lotNumber: 'GZ-2025-E07-C', date: '12/04/2025', universe: 'extreme', category: 'Concentrés',
        molecules: [{ name: 'HHC-P', value: 88 }, { name: 'THC', value: 0.15 }], status: 'PASS', productId: 'e4'
    },
    {
        id: 'lr14', productName: 'Purple Haze THCH', lotNumber: 'GZ-2025-E08-F', date: '10/04/2025', universe: 'extreme', category: 'Fleurs',
        molecules: [{ name: 'THCH', value: 12 }, { name: 'THC', value: 0.24 }], status: 'PASS', productId: 'e27'
    },
    {
        id: 'lr15', productName: 'Icerock Blue', lotNumber: 'GZ-2025-E09-C', date: '08/04/2025', universe: 'extreme', category: 'Concentrés',
        molecules: [{ name: 'THCP', value: 65 }, { name: 'CBD', value: 15 }, { name: 'THC', value: 0.20 }], status: 'PASS', productId: 'e11'
    },
    {
        id: 'lr16', productName: 'Fleurs Straw-Haze Bio', lotNumber: 'GZ-2025-W07-F', date: '05/04/2025', universe: 'wellness', category: 'Fleurs',
        molecules: [{ name: 'CBD', value: 14 }, { name: 'THC', value: 0.19 }], status: 'PASS', productId: 'w13'
    },
    {
        id: 'lr17', productName: 'Pods Extreme THCP 95%', lotNumber: 'GZ-2025-E10-V', date: '02/04/2025', universe: 'extreme', category: 'Vape',
        molecules: [{ name: 'THCP', value: 95 }, { name: 'THC', value: 0.00 }], status: 'PASS', productId: 'e26'
    },
    {
        id: 'lr18', productName: 'Huile Routine Détente', lotNumber: 'GZ-2025-W08-H', date: '30/03/2025', universe: 'wellness', category: 'Huiles',
        molecules: [{ name: 'CBD', value: 10 }, { name: 'THC', value: 0.03 }], status: 'PASS', productId: 'w24'
    },
    {
        id: 'lr19', productName: 'Double Zero THCB', lotNumber: 'GZ-2025-E11-R', date: '28/03/2025', universe: 'extreme', category: 'Résines',
        molecules: [{ name: 'THCB', value: 24 }, { name: 'THC', value: 0.27 }], status: 'PASS', productId: 'e32'
    },
    {
        id: 'lr20', productName: 'Gelato THCP Soft', lotNumber: 'GZ-2025-E12-F', date: '25/03/2025', universe: 'extreme', category: 'Fleurs',
        molecules: [{ name: 'THCP', value: 5 }, { name: 'CBD', value: 12 }, { name: 'THC', value: 0.22 }], status: 'PASS', productId: 'e8'
    },
];

interface TraceabilityPageProps { }

export const TraceabilityPage: React.FC<TraceabilityPageProps> = () => {
    const [filterUniverse, setFilterUniverse] = useState<'All' | 'wellness' | 'extreme'>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedResult, setSelectedResult] = useState<LabResult | null>(null);

    const filteredResults = useMemo(() => {
        return MOCK_LAB_RESULTS.filter(res => {
            const matchUniverse = filterUniverse === 'All' || res.universe === filterUniverse;
            const matchSearch = res.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                res.lotNumber.toLowerCase().includes(searchQuery.toLowerCase());
            return matchUniverse && matchSearch;
        });
    }, [filterUniverse, searchQuery]);

    return (
        <div className="bg-[#0A0A0A] min-h-screen font-sans text-white lab-grid">

            {/* 1. THE TRUST HEADER */}
            <header className="pt-32 pb-16 px-6 border-b border-white/5 relative">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-lab-pass/30 bg-lab-pass/5 text-lab-pass text-[10px] font-mono uppercase tracking-[0.2em] mb-6">
                            <ShieldCheck size={14} /> 0.0% d'incertitude moléculaire
                        </div>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tighter uppercase leading-[0.9]">
                            LABORATOIRE & <br /><span className="text-outline-white italic">TRAÇABILITÉ</span>
                        </h1>
                        <p className="text-gray-400 font-mono text-sm leading-relaxed border-l-2 border-white/10 pl-6">
                            LA PUISSANCE SANS CONTRÔLE N'EST QU'UN RISQUE. <br />
                            NOTRE ADN REPOSE SUR LA TRANSPARENCE RADICALE. NOUS NE STOCKONS AUCUN PRODUIT DONT NOUS NE POUVONS PROUVER LA PURETÉ PAR AUDIT TIERS ISO-9001.
                        </p>
                    </div>

                    {/* Widget Live Status */}
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-4 backdrop-blur-md min-w-[280px]">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live Audit Status</span>
                            <div className="w-2 h-2 rounded-full bg-lab-pass animate-pulse glow-green"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-4">
                            <div>
                                <p className="text-2xl font-mono font-bold text-white">842</p>
                                <p className="text-[9px] text-gray-500 uppercase">Lots Archivés</p>
                            </div>
                            <div>
                                <p className="text-2xl font-mono font-bold text-lab-pass">100%</p>
                                <p className="text-[9px] text-gray-500 uppercase">Conformité</p>
                            </div>
                        </div>
                        <p className="text-[9px] text-gray-400 italic">Mise à jour : {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </header>

            {/* 2. SEARCH & FILTER BAR (Sticky) */}
            <div className="sticky top-20 z-40 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 py-4">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                        <button
                            onClick={() => setFilterUniverse('All')}
                            className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${filterUniverse === 'All' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                        >Tout</button>
                        <button
                            onClick={() => setFilterUniverse('extreme')}
                            className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${filterUniverse === 'extreme' ? 'bg-gardenz-cyan text-black' : 'text-gray-500 hover:text-white'}`}
                        >eXtreme Lab</button>
                        <button
                            onClick={() => setFilterUniverse('wellness')}
                            className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${filterUniverse === 'wellness' ? 'bg-gardenz-green text-white' : 'text-gray-500 hover:text-white'}`}
                        >Bien-être</button>
                    </div>

                    <div className="flex-1 relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="Entrer N° de lot (ex: GZ-2025...) ou nom du produit"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-lab-pass transition-colors font-mono"
                        />
                    </div>

                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-lg bg-white/5 transition-all">
                        <Bell size={14} /> S'abonner aux nouveaux rapports
                    </button>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* 3. LAB-RESULT FEED */}
                <div className="mb-12">
                    <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tighter border-l-4 border-lab-pass pl-6">
                        Index des Certificats d'Analyses <span className="text-lab-pass">(CoA)</span> par Lot
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {filteredResults.map((res) => (
                        <div key={res.id} className="bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-lab-pass/40 transition-all group flex flex-col">
                            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-lab-pass shadow-[0_0_8px_#00FF41]"></span>
                                    <span className="text-[10px] font-mono font-bold text-lab-pass">[PASS] ISO-CERT</span>
                                </div>
                                <span className="text-[10px] font-mono text-gray-500">{res.lotNumber}</span>
                            </div>

                            <div className="p-6 flex-grow">
                                <h3 className="font-display font-bold text-xl mb-1 group-hover:text-lab-pass transition-colors">{res.productName}</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6">{res.category}</p>

                                <div className="space-y-4">
                                    {res.molecules.map((mol, idx) => (
                                        <div key={idx}>
                                            <div className="flex justify-between text-[10px] font-mono mb-1">
                                                <span className="text-gray-400">{mol.name}</span>
                                                <span className="text-white font-bold">{mol.value}%</span>
                                            </div>
                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${mol.name === 'THC' ? 'bg-red-500/50' : 'bg-lab-pass'}`}
                                                    style={{ width: `${mol.value}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 border-t border-white/5 bg-black/40 flex items-center justify-between">
                                <button
                                    onClick={() => setSelectedResult(res)}
                                    className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white flex items-center gap-2"
                                >
                                    Détails Lab <ChevronRight size={12} />
                                </button>
                                <Link
                                    to={`/produit/${res.productId}`}
                                    className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-lab-pass hover:text-black transition-all flex items-center gap-2"
                                >
                                    Acheter <ShoppingCart size={12} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 4. GUIDE TECHNIQUE (User Education) */}
                <section className="bg-[#111] border border-white/10 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden mb-24">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gardenz-cyan/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

                    <div className="relative z-10 max-w-4xl">
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 uppercase tracking-tight">
                            COMMENT DÉCRYPTER UN <span className="text-lab-pass">COA</span> ?
                        </h2>
                        <p className="text-gray-400 mb-12 text-lg">
                            Le Certificat d'Analyse (COA) est le document légal émis par un laboratoire indépendant. Ne vous contentez pas d'une promesse, exigez la preuve scientifique.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="border-l-2 border-lab-pass pl-6">
                                    <h4 className="font-mono font-bold text-white mb-2 uppercase tracking-widest text-sm">Cannabinoid Profile</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Indique la concentration exacte de chaque molécule (CBD, CBG, THCP, etc.). Le taux de <strong className="text-white">Delta-9-THC</strong> doit impérativement être inférieur à 0,3% pour être conforme à la loi française.
                                    </p>
                                </div>
                                <div className="border-l-2 border-lab-pass pl-6">
                                    <h4 className="font-mono font-bold text-white mb-2 uppercase tracking-widest text-sm">LOQ (Limit of Quantitation)</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        C'est le seuil en dessous duquel le laboratoire ne peut plus quantifier avec précision. Un résultat "ND" (Non Détecté) signifie que la présence est inférieure au LOQ.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <div className="border-l-2 border-lab-pass pl-6">
                                    <h4 className="font-mono font-bold text-white mb-2 uppercase tracking-widest text-sm">Terpene Analysis</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Le spectre moléculaire des arômes. Les terpènes (Myrcène, Limonène, etc.) définissent non seulement le goût mais modulent l'effet d'entourage pour une biodisponibilité accrue.
                                    </p>
                                </div>
                                <div className="border-l-2 border-lab-pass pl-6">
                                    <h4 className="font-mono font-bold text-white mb-2 uppercase tracking-widest text-sm">Contaminant Screening</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        La partie cruciale de l'EEAT. Nous testons l'absence totale de métaux lourds (Plomb, Mercure), de solvants résiduels et de pesticides.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. PROTOCOLE D'EXPERTISE (EEAT) */}
                <div className="text-center mb-24">
                    <h2 className="font-display text-3xl font-bold mb-16 uppercase">NOTRE PROTOCOLE <span className="text-lab-pass">CHIRURGICAL</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: <Search size={24} />, title: "Sourcing", text: "Audit physique des fermes européennes." },
                            { icon: <Microscope size={24} />, title: "Triple Test", text: "Producteur + Labo Tiers + Contre-expertise." },
                            { icon: <Activity size={24} />, title: "Spectroscopie", text: "Validation du profil terpénique." },
                            { icon: <ShieldCheck size={24} />, title: "Certificat", text: "Émission du COA lié au numéro de lot." }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-lab-pass mb-6 group hover:border-lab-pass transition-colors">
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-sm mb-2">{item.title}</h4>
                                <p className="text-xs text-gray-500 px-4">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA FINAL */}
                <div className="bg-gradient-to-r from-gardenz-dark to-black p-10 md:p-16 rounded-[3rem] border border-white/10 text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-lab-pass/5 blur-3xl opacity-30"></div>
                    <h3 className="font-display text-3xl font-bold mb-6 relative z-10">PRÊT À EXPLORER LA <span className="text-lab-pass">PURETÉ CERTIFIÉE ?</span></h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link to="/boutique?filter=extreme" className="bg-gardenz-magenta text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(255,0,255,0.4)] transition-all block">Gamme eXtreme Lab</Link>
                        <Link to="/boutique?filter=wellness" className="bg-gardenz-green text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(56,118,29,0.4)] transition-all block">Gamme Bien-être</Link>
                    </div>
                </div>

            </main>

            {/* MODAL DEEP DIVE (SIMULATED) */}
            {selectedResult && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="modal-traceability-title">
                    <div 
                        className="absolute inset-0 bg-black/90 backdrop-blur-md" 
                        onClick={() => setSelectedResult(null)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedResult(null); }}
                        role="button"
                        tabIndex={-1}
                        aria-label="Fermer les détails du laboratoire"
                    ></div>
                    <div className="relative w-full max-w-5xl bg-[#111] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
                        <button onClick={() => setSelectedResult(null)} aria-label="Fermer la modale" className="absolute top-6 right-6 text-gray-500 hover:text-white z-50 p-2"><X size={24} /></button>

                        {/* Preview PDF Area */}
                        <div className="md:w-1/2 bg-white/5 p-8 flex flex-col items-center justify-center border-r border-white/10 overflow-y-auto">
                            <div className="w-full aspect-[1/1.41] bg-white rounded-lg shadow-2xl p-8 text-black flex flex-col">
                                <div className="flex justify-between border-b-2 border-black pb-4 mb-8">
                                    <span className="font-mono text-[10px] font-bold">ANALYSE GARDENZ</span>
                                    <span className="font-mono text-[10px]">{selectedResult.lotNumber}</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-4 bg-gray-200 w-3/4"></div>
                                    <div className="h-4 bg-gray-100 w-full"></div>
                                    <div className="h-32 border-2 border-dashed border-gray-200 flex items-center justify-center">
                                        <FlaskConical className="text-gray-300" size={48} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-8 bg-gray-50"></div>
                                        <div className="h-8 bg-gray-50"></div>
                                    </div>
                                </div>
                                <div className="mt-auto pt-8 flex justify-center">
                                    <div className="px-4 py-2 border-2 border-black font-bold text-xs uppercase">Certifié ISO-9001</div>
                                </div>
                            </div>
                            <button className="mt-8 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-lab-pass transition-colors">
                                <Download size={16} /> Télécharger l'original
                            </button>
                        </div>

                        {/* Analysis Side */}
                        <div className="md:w-1/2 p-10 overflow-y-auto">
                            <h3 id="modal-traceability-title" className="font-display text-2xl font-bold mb-2 uppercase tracking-tighter">{selectedResult.productName}</h3>
                            <p className="text-lab-pass font-mono text-xs font-bold mb-8">Audit du lot : {selectedResult.lotNumber}</p>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Activity size={14} className="text-lab-pass" /> Analyse simplifiée par le Lab
                                    </h4>
                                    <p className="text-sm text-gray-300 leading-relaxed italic">
                                        "Ce lot présente une concentration de {selectedResult.molecules[0].name} supérieure à la moyenne saisonnière, favorisant une synergie accrue avec les terpènes environnants. Pureté certifiée sans solvants résiduels."
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <span className="text-[9px] text-gray-500 uppercase">THC Content</span>
                                        <p className="font-mono text-lg font-bold text-white">0.28%</p>
                                        <p className="text-[9px] text-lab-pass uppercase font-bold mt-1">Légal & Conforme</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <span className="text-[9px] text-gray-500 uppercase">Purity Level</span>
                                        <p className="font-mono text-lg font-bold text-white">99.8%</p>
                                        <p className="text-[9px] text-lab-pass uppercase font-bold mt-1">Zéro Résidu</p>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/5">
                                    <Link
                                        to={`/produit/${selectedResult.productId}`}
                                        className="w-full bg-lab-pass text-black py-4 rounded-xl font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white transition-all shadow-lg"
                                    >
                                        Acheter ce lot <ShoppingCart size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

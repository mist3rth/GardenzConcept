
import React, { useState } from 'react';
import { ChevronDown, Scale, Mail, FileText, Shield, Globe, CreditCard, Truck, RefreshCcw, Lock, User, AlertTriangle, Link, Cookie, MessageSquare } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

interface LegalPageProps { }

export const LegalPage: React.FC<LegalPageProps> = () => {
    const [openSection, setOpenSection] = useState<string | null>('art1');

    const toggleSection = (id: string) => {
        setOpenSection(openSection === id ? null : id);
    };

    const scrollToSection = (id: string) => {
        setOpenSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // --- I. CGU DATA ---
    const cguData = [
        {
            id: 'art1',
            title: 'Article 1 - Mentions Légales',
            icon: <Scale size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>L'édition du site Gardenz.Fr est assurée par la <strong>Société REPUBLIK GARDEN</strong>, au capital de 200 euros, immatriculée au RCS de Paris sous le numéro <strong>888 056 413</strong>, dont le siège social est situé au <strong>4 rue Beaurepaire</strong>.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Numéro de téléphone :</strong> 06 68 52 72 66</li>
                        <li><strong>Adresse e-mail :</strong> contact@gardenz.fr</li>
                        <li><strong>Directeur de la publication :</strong> Benjamin Vigoureux</li>
                        <li><strong>Hébergeur :</strong> IONOS</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'art2',
            title: 'Article 2 - Accès au site',
            icon: <Globe size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>Le site Gardenz.Fr permet un accès gratuit aux services suivants : <strong>Vente de produits à base de cannabis légal.</strong></p>
                    <p>Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet.</p>
                    <div className="bg-red-50 text-red-600 p-3 rounded border border-red-100 font-bold text-xs">
                        Âge Requis : Le site est destiné aux Utilisateurs âgés d'au moins 18 ans.
                    </div>
                    <p>Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.</p>
                </div>
            )
        },
        {
            id: 'art3',
            title: 'Article 3 - Collecte des Données',
            icon: <Lock size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée, conformément à la loi n°78-17 du 6 janvier 1978.</p>
                    <p>L'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles, exerçable directement sur son compte ou par demande par email à l'adresse <strong>contact@gardenz.fr</strong>.</p>
                    <p>Pour l'utilisation détaillée des données, veuillez consulter les Mentions Légales.</p>
                </div>
            )
        },
        {
            id: 'art4',
            title: 'Article 4 - Propriété Intellectuelle',
            icon: <FileText size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) sont protégés par le Code de la propriété intellectuelle, notamment par le droit d'auteur.</p>
                    <p>La marque <strong>Gardenz</strong> est une marque déposée par la société SAS REPUBLIK GARDEN. Toute représentation, reproduction ou exploitation partielle ou totale de cette marque est strictement prohibée.</p>
                    <p>L'Utilisateur s'engage à une utilisation des contenus du site dans un cadre strictement privé. Toute utilisation à des fins commerciales et publicitaires est strictement interdite.</p>
                    <p className="text-xs italic">Toute reproduction totale ou partielle de ce site sans l’autorisation expresse de l’exploitant constituerait une contrefaçon (article L 335-2 et suivants du Code de la propriété intellectuelle). L’utilisateur qui reproduit, copie ou publie un contenu protégé doit citer l’auteur et sa source (article L122-5).</p>
                </div>
            )
        },
        {
            id: 'art5',
            title: 'Article 5 - Responsabilité',
            icon: <AlertTriangle size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>Les sources des informations diffusées sur le site Gardenz.Fr sont réputées fiables, mais le site ne garantit pas qu’il soit exempt de défauts, d’erreurs ou d’omissions. Les informations sont présentées à titre indicatif et général sans valeur contractuelle.</p>
                    <p>Le site ne peut être tenu responsable de la modification des dispositions administratives et juridiques survenant après la publication des informations.</p>
                    <p>Le site Gardenz.Fr ne peut être tenu pour responsable d’éventuels virus qui pourraient infecter le matériel informatique de l’Internaute.</p>
                    <p>La responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et insurmontable d'un tiers.</p>
                </div>
            )
        },
        {
            id: 'art6',
            title: 'Article 6 - Liens Hypertextes',
            icon: <Link size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>Des liens hypertextes peuvent être présents sur le site. L’Utilisateur est informé qu’en cliquant sur ces liens, il sortira du site Gardenz.Fr.</p>
                    <p>Gardenz.Fr n’a pas de contrôle sur les pages web auxquelles aboutissent ces liens et ne saurait, en aucun cas, être responsable de leur contenu.</p>
                </div>
            )
        },
        {
            id: 'art7',
            title: 'Article 7 - Cookies',
            icon: <Cookie size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>L’Utilisateur est informé que lors de ses visites sur le site, un cookie peut s’installer automatiquement sur son logiciel de navigation.</p>
                    <p>Les cookies ne contiennent pas d’information personnelle et sont utilisés pour améliorer l'expérience sur Gardenz.Fr.</p>
                    <p>En naviguant sur le site, l’Utilisateur accepte leur utilisation, mais doit donner son consentement pour l'utilisation de certains d'entre eux. L’Utilisateur peut désactiver ces cookies via les paramètres de son navigateur.</p>
                </div>
            )
        },
        {
            id: 'art8',
            title: "Article 8 - Publication par l'Utilisateur",
            icon: <MessageSquare size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>Le site permet aux membres de publier les contenus suivants : Commentaires et notes.</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Règles de Publication :</strong> Le membre s’engage à respecter la Netiquette et les règles de droit en vigueur.</li>
                        <li><strong>Modération :</strong> Le site peut exercer une modération sur les publications et se réserve le droit de refuser leur mise en ligne sans avoir à s’en justifier.</li>
                        <li><strong>Cession de Droits :</strong> En publiant, le membre cède à la société éditrice le droit non exclusif et gratuit de représenter, reproduire, adapter, modifier, diffuser et distribuer sa publication.</li>
                        <li><strong>Responsabilité :</strong> Tout contenu mis en ligne par l'utilisateur est de sa seule responsabilité.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'art9',
            title: 'Article 9 - Droit Applicable',
            icon: <Scale size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>Les présentes CGU sont régies par la loi française. En cas de litige non résolu à l'amiable, et sauf disposition d'ordre public contraire, les tribunaux de Paris sont compétents pour connaître de tout litige relatif à l'interprétation ou à l'exécution du présent contrat.</p>
                </div>
            )
        }
    ];

    // --- II. CGV DATA ---
    const cgvData = [
        {
            id: 'art10',
            title: 'Article 10 - Objet des CGV',
            icon: <FileText size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>Les CGV déterminent les droits et obligations des parties dans le cadre de la vente des produits proposés par Gardenz.Fr au Client. Toute commande passée sur le site implique l'acceptation sans réserve de ces conditions.</p>
                </div>
            )
        },
        {
            id: 'art11',
            title: 'Article 11 - Produits',
            icon: <Shield size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>Les produits proposés sont ceux qui figurent dans le catalogue publié sur le site Gardenz.Fr. Chaque produit est présenté avec un descriptif reprenant ses principales caractéristiques (composition, concentration en CBD/THC, etc.).</p>
                    <p><strong>Conformité :</strong> Les produits sont conformes à la législation française et européenne en vigueur.</p>
                    <p><strong>Limitation :</strong> Les photographies n'entrent pas dans le champ contractuel. En cas de non-conformité avérée entre la photographie et le produit, la société ne saurait engager sa responsabilité.</p>
                </div>
            )
        },
        {
            id: 'art12',
            title: 'Article 12 - Prix',
            icon: <CreditCard size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>Les prix des produits sont indiqués en <strong>Euros (€) toutes taxes comprises (TTC)</strong>.</p>
                    <p><strong>Frais Annexes :</strong> Ils ne comprennent pas les frais de livraison, lesquels sont facturés en supplément et sont indiqués avant la validation de la commande.</p>
                    <p><strong>Modification :</strong> La société se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix figurant au catalogue le jour de la commande sera le seul applicable à l'Acheteur.</p>
                </div>
            )
        },
        {
            id: 'art13',
            title: 'Article 13 - Commande',
            icon: <User size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>L'Acheteur qui souhaite acheter un produit doit suivre le processus de commande en ligne.</p>
                    <p><strong>Validation :</strong> La validation de la commande vaut acceptation des prix et des descriptions des produits.</p>
                    <p><strong>Confirmation :</strong> La vente ne sera considérée comme définitive qu'après l'envoi à l'Acheteur de la confirmation de l'acceptation de la commande par courrier électronique et après encaissement de l'intégralité du prix.</p>
                </div>
            )
        },
        {
            id: 'art14',
            title: 'Article 14 - Paiement',
            icon: <CreditCard size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>Le paiement est exigible immédiatement à la commande. L'Acheteur peut effectuer le règlement par <strong>Carte Bancaire</strong>.</p>
                    <p><strong>Sécurité :</strong> Les paiements sont sécurisés via notre prestataire de paiement agréé, assurant la confidentialité totale des informations bancaires.</p>
                </div>
            )
        },
        {
            id: 'art15',
            title: 'Article 15 - Livraison',
            icon: <Truck size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>Les livraisons sont faites à l’adresse indiquée par le Client dans le bon de commande.</p>
                    <p><strong>Zones :</strong> La livraison est assurée en France Métropolitaine, DOM-TOM et Europe.</p>
                    <p><strong>Délais :</strong> Les délais de livraison ne sont donnés qu’à titre indicatif et comprennent le temps de préparation de la commande.</p>
                    <p><strong>Risques :</strong> Le transfert des risques à l'Acheteur s'opère à la remise des produits au transporteur.</p>
                </div>
            )
        },
        {
            id: 'art16',
            title: 'Article 16 - Droit de Rétractation',
            icon: <RefreshCcw size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>Conformément à l’article L221-18 du Code de la Consommation, l'Acheteur dispose d'un délai de <strong>quatorze (14) jours francs</strong> à compter de la réception des produits pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.</p>
                    <p><strong>Conditions de retour :</strong> Les produits doivent être retournés dans leur emballage d'origine, en parfait état et <strong>non ouverts</strong>.</p>
                    <p><strong>Remboursement :</strong> Le remboursement sera effectué par virement bancaire dans un délai de 14 jours suivant la réception et la vérification du produit.</p>
                </div>
            )
        },
        {
            id: 'art17',
            title: 'Article 17 - Garanties',
            icon: <Shield size={20} />,
            content: (
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>Tous les produits fournis par le vendeur bénéficient de la garantie légale de conformité prévue aux articles L. 217-4 et suivants du Code de la Consommation et de la garantie des vices cachés prévues aux articles 1641 et suivants du Code Civil.</p>
                </div>
            )
        }
    ];

    return (
        <div className="bg-gardenz-white min-h-screen font-sans">

            {/* I. HEADER URBAN CHIC */}
            <div className="bg-[#111] pt-32 pb-24 px-6 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gardenz-cyan/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gardenz-magenta/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        CGU & <span className="text-gardenz-cyan drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">CGV</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Conditions Générales d'Utilisation et de Vente. <br />
                        Transparence et cadre légal pour une expérience sereine.
                    </p>
                </div>
            </div>

            {/* II. MAIN CONTENT LAYOUT */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT: STICKY NAVIGATION (Table of Contents) */}
                    <aside className="hidden lg:block w-1/4">
                        <div className="sticky top-32 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-display font-bold text-lg mb-6 text-gardenz-dark border-b border-gray-100 pb-2">Sommaire</h3>

                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">I. Utilisation (CGU)</h4>
                                <ul className="space-y-2">
                                    {cguData.map((item) => (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => scrollToSection(item.id)}
                                                className={`text-sm font-medium transition-all duration-200 flex items-center gap-2 w-full text-left truncate
                                            ${openSection === item.id
                                                        ? 'text-gardenz-cyan font-bold pl-2 border-l-2 border-gardenz-cyan'
                                                        : 'text-gray-500 hover:text-gardenz-dark'
                                                    }
                                        `}
                                            >
                                                {item.title.split(' - ')[0]}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">II. Vente (CGV)</h4>
                                <ul className="space-y-2">
                                    {cgvData.map((item) => (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => scrollToSection(item.id)}
                                                className={`text-sm font-medium transition-all duration-200 flex items-center gap-2 w-full text-left truncate
                                            ${openSection === item.id
                                                        ? 'text-gardenz-cyan font-bold pl-2 border-l-2 border-gardenz-cyan'
                                                        : 'text-gray-500 hover:text-gardenz-dark'
                                                    }
                                        `}
                                            >
                                                {item.title.split(' - ')[0]}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <RouterLink to="/contact" className="flex items-center gap-2 text-sm font-bold text-gardenz-dark hover:text-gardenz-cyan transition-colors">
                                    <Mail size={16} /> Service Juridique
                                </RouterLink>
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT: ACCORDION CONTENT */}
                    <div className="flex-1 lg:w-3/4 space-y-8">

                        {/* SECTION I - CGU */}
                        <div>
                            <h2 className="font-display text-2xl font-bold text-gardenz-dark mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-gardenz-dark text-white flex items-center justify-center text-sm font-bold">I</span>
                                Conditions Générales d'Utilisation
                            </h2>
                            <div className="space-y-4">
                                {cguData.map((item) => (
                                    <div
                                        id={item.id}
                                        key={item.id}
                                        className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden
                                    ${openSection === item.id
                                                ? 'border-gardenz-cyan/30 shadow-lg shadow-gardenz-cyan/5'
                                                : 'border-gray-100 hover:border-gray-300'
                                            }
                                `}
                                    >
                                        <button
                                            onClick={() => toggleSection(item.id)}
                                            className={`w-full flex items-center justify-between p-6 text-left transition-colors
                                        ${openSection === item.id ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}
                                    `}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0
                                            ${openSection === item.id
                                                        ? 'bg-gardenz-cyan text-white shadow-md'
                                                        : 'bg-gray-100 text-gray-400'
                                                    }
                                        `}>
                                                    {item.icon}
                                                </div>
                                                <span className={`font-display font-bold text-lg ${openSection === item.id ? 'text-gardenz-dark' : 'text-gray-600'}`}>
                                                    {item.title}
                                                </span>
                                            </div>

                                            <div className={`transition-transform duration-300 ${openSection === item.id ? 'rotate-180 text-gardenz-cyan' : 'text-gray-400'}`}>
                                                <ChevronDown size={20} />
                                            </div>
                                        </button>

                                        <div
                                            className={`transition-all duration-300 ease-in-out ${openSection === item.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
                                        >
                                            <div className="p-6 pt-2 border-t border-gray-100">
                                                {item.content}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECTION II - CGV */}
                        <div className="pt-8">
                            <h2 className="font-display text-2xl font-bold text-gardenz-dark mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-gardenz-dark text-white flex items-center justify-center text-sm font-bold">II</span>
                                Conditions Générales de Vente
                            </h2>
                            <div className="space-y-4">
                                {cgvData.map((item) => (
                                    <div
                                        id={item.id}
                                        key={item.id}
                                        className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden
                                    ${openSection === item.id
                                                ? 'border-gardenz-green/30 shadow-lg shadow-gardenz-green/5'
                                                : 'border-gray-100 hover:border-gray-300'
                                            }
                                `}
                                    >
                                        <button
                                            onClick={() => toggleSection(item.id)}
                                            className={`w-full flex items-center justify-between p-6 text-left transition-colors
                                        ${openSection === item.id ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}
                                    `}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0
                                            ${openSection === item.id
                                                        ? 'bg-gardenz-green text-white shadow-md'
                                                        : 'bg-gray-100 text-gray-400'
                                                    }
                                        `}>
                                                    {item.icon}
                                                </div>
                                                <span className={`font-display font-bold text-lg ${openSection === item.id ? 'text-gardenz-dark' : 'text-gray-600'}`}>
                                                    {item.title}
                                                </span>
                                            </div>

                                            <div className={`transition-transform duration-300 ${openSection === item.id ? 'rotate-180 text-gardenz-green' : 'text-gray-400'}`}>
                                                <ChevronDown size={20} />
                                            </div>
                                        </button>

                                        <div
                                            className={`transition-all duration-300 ease-in-out ${openSection === item.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
                                        >
                                            <div className="p-6 pt-2 border-t border-gray-100">
                                                {item.content}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* III. FOOTER HELP BANNER */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="bg-[#111] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-display text-2xl font-bold text-white mb-4">Une question sur nos conditions ?</h3>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                            Notre équipe est à votre disposition pour vous éclairer sur tous les aspects juridiques et commerciaux.
                        </p>
                        <RouterLink to="/contact" className="inline-flex items-center gap-2 bg-gardenz-cyan text-gardenz-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-colors shadow-lg hover:shadow-gardenz-cyan/20">
                            <Mail size={18} /> Nous Contacter
                        </RouterLink>
                    </div>
                </div>
            </div>

        </div>
    );
};

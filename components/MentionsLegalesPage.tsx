
import React, { useState } from 'react';
import { ChevronDown, Building2, User, Server, Globe, Lock, AlertTriangle, Link as LinkIcon, Eye, Database, Cookie, Mail, Gavel, Scale } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

interface MentionsLegalesPageProps { }

export const MentionsLegalesPage: React.FC<MentionsLegalesPageProps> = () => {
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

  // --- DATA STRUCTURE ---
  const sections = [
    {
      id: 'section1',
      title: "I. IDENTITÉ ET COORDONNÉES",
      articles: [
        {
          id: 'art1',
          title: "Article 1 : Identification de l'Éditeur",
          icon: <Building2 size={20} />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>Le site Gardenz.Fr est édité par la société :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Dénomination sociale :</strong> REPUBLIK GARDEN</li>
                <li><strong>Forme juridique :</strong> SAS</li>
                <li><strong>Capital social :</strong> 200 euros</li>
                <li><strong>Numéro RCS :</strong> 888 056 413 (Paris)</li>
                <li><strong>Siège social :</strong> 4 rue Beaurepaire, 75010 Paris</li>
                <li><strong>Numéro de TVA intracommunautaire :</strong> FR75888056413</li>
              </ul>
            </div>
          )
        },
        {
          id: 'art2',
          title: "Article 2 : Contact et Direction",
          icon: <User size={20} />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Téléphone :</strong> 06 68 52 72 66</li>
                <li><strong>E-mail :</strong> contact@gardenz.fr</li>
                <li><strong>Directeur de la Publication :</strong> Benjamin Vigoureux</li>
              </ul>
            </div>
          )
        },
        {
          id: 'art3',
          title: "Article 3 : Hébergement du Site",
          icon: <Server size={20} />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>L'hébergement du site Gardenz.Fr est assuré par la société :</p>
              <p><strong>Nom :</strong> IONOS</p>
            </div>
          )
        }
      ]
    },
    {
      id: 'section2',
      title: "II. CONDITIONS D'UTILISATION",
      articles: [
        {
          id: 'art4',
          title: "Article 4 : Conditions d'Accès",
          icon: <Globe size={20} />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>Le site Gardenz.Fr propose les services suivants : <strong>Vente de produits à base de cannabis légal.</strong></p>
              <p><strong>Accès :</strong> Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet.</p>
              <div className="bg-red-50 text-red-600 p-3 rounded border border-red-100 font-bold text-xs">
                Âge Minimum : L'accès est réservé aux Utilisateurs âgés d'au moins 18 ans.
              </div>
              <p><strong>Frais :</strong> Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge exclusive.</p>
            </div>
          )
        },
        {
          id: 'art5',
          title: "Article 5 : Propriété Intellectuelle",
          icon: <Lock size={20} />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>L’ensemble des contenus présents sur le site (marques, logos, signes, textes, images, son, etc.) sont protégés par le Code de la propriété intellectuelle et le droit d'auteur.</p>
              <p><strong>Marque :</strong> La marque Gardenz est une marque déposée par la société SAS REPUBLIK GARDEN. Toute représentation, reproduction ou exploitation partielle ou totale de cette marque, de quelque nature que ce soit, est totalement prohibée.</p>
              <p><strong>Utilisation des Contenus :</strong> L'Utilisateur s'engage à une utilisation des contenus du site dans un cadre strictement privé. Toute utilisation à des fins commerciales et publicitaires est strictement interdite.</p>
              <p><strong>Contrefaçon :</strong> Toute représentation totale ou partielle de ce site sans l’autorisation expresse de l’exploitant du site Internet constituerait une contrefaçon sanctionnée par l’article L 335-2 et suivants du Code de la propriété intellectuelle.</p>
              <p className="italic text-xs">Citation : Il est rappelé, conformément à l’article L122-5 du Code de propriété intellectuelle, que l’utilisateur qui reproduit, copie ou publie un contenu protégé doit citer l’auteur et sa source.</p>
            </div>
          )
        },
        {
          id: 'art6',
          title: "Article 6 : Responsabilité de l'Éditeur",
          icon: <AlertTriangle size={20} />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p><strong>Fiabilité des Informations :</strong> Les sources des informations diffusées sur le site Gardenz.Fr sont réputées fiables. Néanmoins, l'éditeur ne garantit pas que le site soit exempt de défauts, d’erreurs ou d’omissions. Les informations communiquées sont présentées à titre indicatif et général sans valeur contractuelle.</p>
              <p><strong>Évolution Législative :</strong> Malgré des mises à jour régulières, le site Gardenz.Fr ne peut être tenu responsable de la modification des dispositions administratives et juridiques survenant après sa publication.</p>
              <p><strong>Utilisation :</strong> Le site ne peut être tenu responsable de l’utilisation et de l’interprétation de l’information contenue sur ce site.</p>
              <p><strong>Dommages Informatiques :</strong> Le site Gardenz.Fr ne peut être tenu pour responsable d’éventuels virus qui pourraient infecter l’ordinateur ou tout matériel informatique de l’Internaute.</p>
              <p><strong>Force Majeure :</strong> La responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et insurmontable d'un tiers.</p>
            </div>
          )
        },
        {
          id: 'art7',
          title: "Article 7 : Liens Hypertextes",
          icon: <LinkIcon size={20} />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>Des liens hypertextes peuvent être présents sur le site. L’Utilisateur est informé qu’en cliquant sur ces liens, il sortira du site Gardenz.Fr.</p>
              <p>L’Éditeur n’a pas de contrôle sur les pages web sur lesquelles aboutissent ces liens et ne saurait, en aucun cas, être responsable de leur contenu.</p>
            </div>
          )
        }
      ]
    },
    {
      id: 'section3',
      title: "III. PROTECTION DES DONNÉES",
      articles: [
        {
          id: 'art8',
          title: "Article 8 : Politique de Confidentialité",
          icon: <Eye size={20} />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés, et au Règlement Général sur la Protection des Données (RGPD).</p>
            </div>
          )
        },
        {
          id: 'art9',
          title: "Article 9 : Données Collectées",
          icon: <Database size={20} />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>Les données personnelles collectées comprennent notamment les informations d'identification, de connexion et de navigation. Elles sont utilisées pour :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Assurer la bonne utilisation et l’accès aux services du site (Article 4).</li>
                <li>Gérer les commandes et la relation client (CGV).</li>
                <li>Permettre la publication de contenus (commentaires et notes).</li>
                <li>Garantir l'exercice des droits de l'Utilisateur.</li>
              </ul>
            </div>
          )
        },
        {
          id: 'art10',
          title: "Article 10 : Droits de l'Utilisateur",
          icon: <User size={20} />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>En vertu de la loi Informatique et Libertés, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles.</p>
              <p><strong>Exercice des droits :</strong> L'Utilisateur peut exercer ce droit soit directement sur son compte client, soit par demande écrite et motivée par email à l'adresse <strong>contact@gardenz.fr</strong>.</p>
            </div>
          )
        },
        {
          id: 'art11',
          title: "Article 11 : Cookies",
          icon: <Cookie size={20} />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>L’Utilisateur est informé que lors de ses visites sur le site, un cookie peut s’installer automatiquement sur son logiciel de navigation.</p>
              <p><strong>Nature :</strong> Les cookies sont de petits fichiers stockés temporairement, nécessaires à l’utilisation du site. Ils ne contiennent pas d’information personnelle.</p>
              <p><strong>Acceptation :</strong> En naviguant sur le site, L’utilisateur accepte l'utilisation de ces traceurs techniques.</p>
              <p><strong>Consentement :</strong> L’utilisateur doit toutefois donner son consentement pour l'utilisation de certains cookies non essentiels.</p>
              <p><strong>Gestion :</strong> L’Utilisateur pourra désactiver ces cookies par l’intermédiaire des paramètres figurant au sein de son logiciel de navigation.</p>
            </div>
          )
        }
      ]
    },
    {
      id: 'section4',
      title: "IV. DROIT APPLICABLE",
      articles: [
        {
          id: 'art12',
          title: "Article 12 : Droit Applicable et Litiges",
          icon: <Gavel size={20} />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>Les présentes Mentions Légales sont régies par la loi française. En cas de litige non résolu à l'amiable, et sauf disposition d'ordre public contraire, les tribunaux de Paris sont compétents pour connaître de tout litige relatif à l'interprétation ou à l'exécution du présent contrat.</p>
            </div>
          )
        }
      ]
    }
  ];

  return (
    <div className="bg-gardenz-white min-h-screen font-sans">

      {/* I. HEADER URBAN CHIC */}
      <div className="bg-[#111] pt-32 pb-24 px-6 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gardenz-green/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gardenz-terra/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            MENTIONS <span className="text-gardenz-green drop-shadow-[0_0_15px_rgba(56,118,29,0.4)]">LÉGALES</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Identification, Responsabilités et Protection des Données.<br />
            La transparence au service de la confiance.
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

              <div className="space-y-6">
                {sections.map(section => (
                  <div key={section.id}>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.articles.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => scrollToSection(item.id)}
                            className={`text-sm font-medium transition-all duration-200 flex items-center gap-2 w-full text-left truncate
                                              ${openSection === item.id
                                ? 'text-gardenz-green font-bold pl-2 border-l-2 border-gardenz-green'
                                : 'text-gray-500 hover:text-gardenz-dark'
                              }
                                          `}
                          >
                            {item.title.split(':')[0]}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <RouterLink
                  to="/contact"
                  className="flex items-center gap-2 text-sm font-bold text-gardenz-dark hover:text-gardenz-green transition-colors"
                >
                  <Mail size={16} /> Service Contact
                </RouterLink>
              </div>
            </div>
          </aside>

          {/* RIGHT: ACCORDION CONTENT */}
          <div className="flex-1 lg:w-3/4 space-y-12">

            {sections.map((section, idx) => (
              <div key={section.id}>
                <h2 className="font-display text-2xl font-bold text-gardenz-dark mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-gardenz-dark text-white flex items-center justify-center text-sm font-bold">{['I', 'II', 'III', 'IV'][idx]}</span>
                  {section.title.split('. ')[1]}
                </h2>
                <div className="space-y-4">
                  {section.articles.map((item) => (
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
            ))}

          </div>

        </div>
      </div>

      {/* III. FOOTER HELP BANNER */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-[#111] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-gardenz-green"></div>
          <div className="relative z-10">
            <h3 className="font-display text-2xl font-bold text-white mb-4">Une question sur vos données ?</h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Nous nous engageons à protéger votre vie privée. Pour toute demande d'accès ou de suppression, contactez-nous.
            </p>
            <RouterLink
              to="/contact"
              className="inline-flex items-center gap-2 bg-gardenz-green text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-gardenz-green transition-colors shadow-lg"
            >
              <Mail size={18} /> Nous Contacter
            </RouterLink>
          </div>
        </div>
      </div>

    </div>
  );
};

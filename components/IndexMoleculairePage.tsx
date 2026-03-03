
import React, { useState } from 'react';
import {
  FlaskConical, ShieldCheck, Activity, Target,
  Microscope, Atom, ArrowRight, TriangleAlert
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface MoleculeProps {
  id: string;
  name: string;
  baseline: string;
  technical: string;
  profile: string;
  cta: string;
  color: string;
  intensity: 'Soft' | 'Medium' | 'Hardcore';
}

interface IndexMoleculairePageProps { }

const MOLECULES: MoleculeProps[] = [
  // --- SOFT (5) ---
  {
    id: 'cbd',
    name: 'CBD',
    intensity: 'Soft',
    baseline: 'L’équilibre quotidien sans compromis.',
    technical: 'Phytocannabinoïde extrait via CO2 supercritique. Module les récepteurs CB2 sans saturer le système nerveux central. Régulateur d’homéostasie pur.',
    profile: 'Calme diffus, réduction de l’inflammation physique et clarté mentale constante. Le "daily driver" par excellence.',
    cta: 'Stabiliser ma vibe',
    color: 'text-gardenz-green'
  },
  {
    id: 'cbg',
    name: 'CBG',
    intensity: 'Soft',
    baseline: 'Le focus à l’état pur.',
    technical: 'La "molécule mère". Interaction directe avec les récepteurs adrénergiques. Maximise la synthèse de l’anandamide (molécule du plaisir).',
    profile: 'Boost cognitif limpide. Pas de palpitations, juste une vision tunnel sur vos objectifs. Idéal pour le deep-work.',
    cta: 'Débloquer le focus',
    color: 'text-gardenz-green'
  },
  {
    id: 'cbn',
    name: 'CBN',
    intensity: 'Soft',
    baseline: 'Le bouton "Off" de votre esprit.',
    technical: 'Issu de la dégradation naturelle du THC. Affinité élective pour les récepteurs liés aux cycles circadiens et à la sédation.',
    profile: 'Lourdeur physique apaisante. Prépare le cerveau à la phase de sommeil profond sans effet brumeux au réveil.',
    cta: 'Activer la phase REM',
    color: 'text-gardenz-green'
  },
  {
    id: 'cbc',
    name: 'CBC',
    intensity: 'Soft',
    baseline: 'Le catalyseur d’humeur.',
    technical: 'Se lie aux récepteurs TRPV1. Amplifie l’effet d’entourage en synergie avec le CBD pour une efficacité décuplée sur le stress.',
    profile: 'Sentiment de bien-être subtil. Agit comme un bouclier émotionnel contre l’anxiété latente du quotidien.',
    cta: 'Optimiser l’entourage',
    color: 'text-gardenz-green'
  },
  {
    id: 'h4-cbd',
    name: 'H4-CBD',
    intensity: 'Soft',
    baseline: 'Le CBD turbo-chargé.',
    technical: 'CBD hydrogéné. Affinité 100x supérieure pour les récepteurs CB1 par rapport au CBD classique. Structure stable et biodisponible.',
    profile: 'Relaxation musculaire profonde et "chill" mental perceptible, sans aucune altération cognitive. La version 2.0 de la détente.',
    cta: 'Passer au CBD 2.0',
    color: 'text-gardenz-green'
  },
  // --- MEDIUM (4) ---
  {
    id: 'hhc',
    name: 'HHC',
    intensity: 'Medium',
    baseline: 'Le voyage sans turbulences.',
    technical: 'Hexahydrocannabinol. Forme saturée qui résiste à l’oxydation. Interaction propre avec les capteurs centraux CB1.',
    profile: 'Euphorie légère et distorsion temporelle douce. Une alternative stable pour ceux qui cherchent un high récréatif contrôlé.',
    cta: 'Lancer le voyage',
    color: 'text-[#FF9F1C]'
  },
  {
    id: 'thcv',
    name: 'THCV',
    intensity: 'Medium',
    baseline: 'L’énergie sans la fringale.',
    technical: 'Chaîne carbonée courte. Antagoniste des récepteurs CB1 à faible dose. Agit comme un coupe-faim moléculaire naturel.',
    profile: 'Stimulation quasi-immédiate. Euphorie cérébrale et contrôle total de l’appétit. La molécule des esprits actifs.',
    cta: 'Saturer l’énergie',
    color: 'text-[#FF9F1C]'
  },
  {
    id: 'hhca',
    name: 'HHCA',
    intensity: 'Medium',
    baseline: 'La puissance à retardement.',
    technical: 'Acétate de HHC. Molécule hautement stable. Nécessite une dé-acétylation hépatique pour s’activer dans l’organisme.',
    profile: 'Montée progressive débouchant sur un plateau durable d’intensité sensorielle. Parfait pour les sessions longue durée.',
    cta: 'Planifier le trip',
    color: 'text-[#FF9F1C]'
  },
  {
    id: 'd9',
    name: 'Delta-9-THC',
    intensity: 'Medium',
    baseline: 'L’étalon-or, version légale.',
    technical: 'Micro-dosé sous le seuil des 0.3%. Spectre complet préservé pour un effet d’entourage authentique et non-agressif.',
    profile: 'L’expérience cannabique traditionnelle. Détente totale, immersion sonore et joie décomplexée. Le classique indétrônable.',
    cta: 'Choisir la tradition',
    color: 'text-[#FF9F1C]'
  },
  // --- HARDCORE (6) ---
  {
    id: 'thcp',
    name: 'THCP',
    intensity: 'Hardcore',
    baseline: 'L’affinité réceptrice absolue.',
    technical: 'Chaîne heptyle à 7 atomes de carbone. Liaison aux récepteurs CB1 jusqu’à 33 fois plus forte que le THC conventionnel.',
    profile: 'Impact massif. Intensité physique et psychique extrême. Réservé aux membres du Clan à haute tolérance.',
    cta: 'Défier ma tolérance',
    color: 'text-gardenz-magenta'
  },
  {
    id: 'hhcp-o',
    name: 'HHCP-O',
    intensity: 'Hardcore',
    baseline: 'L’endurance moléculaire record.',
    technical: 'Combinaison de la chaîne latérale longue du THCP et de la biodisponibilité de l’acétate. Résistance métabolique accrue.',
    profile: 'Effets ultra-persistants. Un plateau d’intensité qui peut franchir la barre des 8 heures. Prévoyez votre planning.',
    cta: 'Engager l’endurance',
    color: 'text-gardenz-magenta'
  },
  {
    id: 'thc-o',
    name: 'THC-O',
    intensity: 'Hardcore',
    baseline: 'L’acétate de haute voltige.',
    technical: 'Acétate de Delta-8 ou Delta-9. Prodrogue métabolisée pour une puissance 300% supérieure au THC de base.',
    profile: 'Sensation "aérienne" et introspective. Une profondeur psychique qui frôle l’expérience spirituelle. Pour initiés uniquement.',
    cta: 'Explorer l’introspection',
    color: 'text-gardenz-magenta'
  },
  {
    id: 'hhc-p',
    name: 'HHC-P',
    intensity: 'Hardcore',
    baseline: 'Le champion du body-high.',
    technical: 'Forme hydrogénée du THCP. Sa structure sature les récepteurs CB1 et CB2 pour un impact systémique total.',
    profile: 'Une lourdeur physique monumentale couplée à une euphorie cérébrale intense. Le choix ultime pour le "couch-lock".',
    cta: 'Maîtriser la force',
    color: 'text-gardenz-magenta'
  },
  {
    id: 'thch',
    name: 'THC-H',
    intensity: 'Hardcore',
    baseline: 'L’euphorie physique pure.',
    technical: 'Chaîne hexyle rare. Focalisation sur les récepteurs nerveux périphériques pour un impact corporel sans précédent.',
    profile: 'Sensation de flottement physique intense. Un "body-buzz" joyeux qui déconnecte du stress en quelques minutes.',
    cta: 'Scanner l’hexyle',
    color: 'text-gardenz-magenta'
  },
  {
    id: 'thcb',
    name: 'THC-B',
    intensity: 'Hardcore',
    baseline: 'La rapidité foudroyante.',
    technical: 'Chaîne butyle. Liaison instantanée aux récepteurs CB1. Métabolisme ultra-rapide pour un effet immédiat.',
    profile: 'Montée éclair. Idéal pour ceux qui cherchent un impact "kick-start" puissant et une durée d’action plus courte.',
    cta: 'Saisir l’instant',
    color: 'text-gardenz-magenta'
  }
];

export const IndexMoleculairePage: React.FC<IndexMoleculairePageProps> = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Soft' | 'Medium' | 'Hardcore'>('All');
  const navigate = useNavigate();

  const filteredMolecules = activeFilter === 'All'
    ? MOLECULES
    : MOLECULES.filter(m => m.intensity === activeFilter);

  return (
    <div className="bg-[#0A0A0A] min-h-screen font-sans text-white">

      {/* 1. HERO : LE LABO CONCEPT */}
      <div className="pt-40 pb-24 px-6 relative overflow-hidden text-center border-b border-white/5">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gardenz-green/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gardenz-magenta/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-8 animate-fade-in">
            <Microscope size={14} className="text-gardenz-cyan" /> Intelligence Moléculaire
          </div>
          <h1 className="font-display text-5xl md:text-8xl font-bold mb-8 tracking-tighter uppercase leading-[0.85]">
            L’INDEX <br /><span className="text-outline-white">MOLÉCULAIRE</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
            Le décryptage de l'avant-garde. Comprenez la science derrière la Vibe. <br />
            <span className="text-white">15 molécules isolées pour une précision absolue de vos effets.</span>
          </p>
        </div>
      </div>

      {/* 2. NAVIGATION FILTRÉE STICKY */}
      <div className="sticky top-20 z-40 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-4">
          {['All', 'Soft', 'Medium', 'Hardcore'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f as any)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border
                        ${activeFilter === f
                  ? (f === 'Soft' ? 'bg-gardenz-green text-white border-gardenz-green shadow-[0_0_20px_rgba(56,118,29,0.3)]' : f === 'Medium' ? 'bg-[#FF9F1C] text-black border-[#FF9F1C] shadow-[0_0_20px_rgba(255,159,28,0.2)]' : f === 'Hardcore' ? 'bg-gardenz-magenta text-white border-gardenz-magenta shadow-[0_0_20px_rgba(255,0,255,0.3)]' : 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]')
                  : 'bg-transparent border-white/10 text-gray-500 hover:text-white hover:border-white/30'}
                    `}
            >
              {f === 'All' ? 'Toutes' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* 3. GRILLE DE MOLÉCULES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMolecules.map((m) => (
            <div
              key={m.id}
              id={m.id}
              className={`group bg-[#111] border border-white/5 rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 flex flex-col h-full relative overflow-hidden
                ${activeFilter === 'All'
                  ? 'hover:border-gardenz-green/50 hover:shadow-[0_0_30px_rgba(56,118,29,0.15)]'
                  : m.intensity === 'Soft' ? 'hover:border-gardenz-green/50 hover:shadow-[0_0_30px_rgba(56,118,29,0.15)]' : m.intensity === 'Medium' ? 'hover:border-[#FF9F1C]/50 hover:shadow-[0_0_30px_rgba(255,159,28,0.15)]' : 'hover:border-gardenz-magenta/50 hover:shadow-[0_0_30px_rgba(255,0,255,0.15)]'
                }
              `}
            >
              {/* Background ID Glow */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 opacity-10 blur-3xl rounded-full ${m.intensity === 'Soft' ? 'bg-gardenz-green' : m.intensity === 'Medium' ? 'bg-[#FF9F1C]' : 'bg-gardenz-magenta'}`}></div>

              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 ${m.color}`}>
                  <Atom size={28} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-white/10 bg-white/5`}>
                  {m.intensity}
                </span>
              </div>

              <h2 className="font-display text-3xl font-bold mb-2 uppercase tracking-tighter">{m.name}</h2>
              <p className={`font-bold text-sm mb-6 italic ${m.color}`}>{m.baseline}</p>

              <div className="space-y-6 flex-grow relative z-10">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <FlaskConical size={12} /> Fiche Technique
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed italic">
                    {m.technical}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Activity size={12} /> Profil d'expérience
                  </h4>
                  <p className="text-sm text-white font-medium leading-relaxed">
                    {m.profile}
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 relative z-10">
                <Link
                  to={`/boutique?filter=${m.intensity === 'Soft' ? 'wellness' : 'extreme'}&molecule=${encodeURIComponent(m.name)}`}
                  className={`w-full py-4 rounded-xl font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all transform active:scale-95 block text-center
                            ${m.intensity === 'Soft' ? 'bg-gardenz-green/10 text-gardenz-green border border-gardenz-green/30 hover:bg-gardenz-green hover:text-white' :
                      m.intensity === 'Medium' ? 'bg-[#FF9F1C]/10 text-[#FF9F1C] border border-[#FF9F1C]/30 hover:bg-[#FF9F1C] hover:text-black' :
                        'bg-gardenz-magenta/10 text-gardenz-magenta border border-gardenz-magenta/30 hover:bg-gardenz-magenta hover:text-white'}
                        `}>
                  {m.cta} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 4. SECTION RÉASSURANCE LABO */}
        <div className="mt-32 bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gardenz-cyan/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h3 className="font-display text-4xl font-bold mb-6 uppercase tracking-tighter leading-none">
                ZÉRO RÉSIDU. <br /><span className="text-gardenz-cyan">100% TRANSPARENCE.</span>
              </h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Chaque lot Gardenz passe par un protocole de test en trois étapes. <br />
                On ne vous vend pas des molécules, on vous vend de la confiance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gardenz-cyan/20 flex items-center justify-center text-gardenz-cyan shrink-0"><ShieldCheck size={20} /></div>
                  <div>
                    <h5 className="font-bold text-sm">Labo Indépendant</h5>
                    <p className="text-xs text-gray-500">Analyses certifiées COA disponibles sur chaque produit.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gardenz-cyan/20 flex items-center justify-center text-gardenz-cyan shrink-0"><Target size={20} /></div>
                  <div>
                    <h5 className="font-bold text-sm">Purification CO2</h5>
                    <p className="text-xs text-gray-500">Aucun solvant chimique. Uniquement le meilleur de la plante.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200"
                className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 transition-all duration-1000"
                alt="Laboratoire Gardenz"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="animate-ping w-3 h-3 bg-gardenz-cyan rounded-full"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Analyse en temps réel du lot #GZ-2026-X</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FINAL WARNING BLOCK */}
      <div className="bg-red-500/5 py-20 px-6 border-t border-red-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <TriangleAlert size={48} className="text-red-500 mx-auto mb-6 animate-pulse" />
          <h3 className="font-display text-2xl font-bold text-white mb-4 uppercase tracking-widest">Avertissement de sécurité</h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
            Les molécules Medium et Hardcore possèdent des effets psychoactifs puissants. Leur usage est strictement interdit aux mineurs et aux femmes enceintes. Ne conduisez jamais après consommation. Gardenz décline toute responsabilité en cas de mésusage ou de non-respect des dosages recommandés.
          </p>
        </div>
      </div>

    </div>
  );
};

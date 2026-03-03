# Architecture Système - Gardenz

## Vue d'ensemble

L'architecture de Gardenz est une **Single Page Application (SPA)** full front-end, optimisée pour la performance, l'extensibilité et la maintenabilité. Elle est conçue pour évoluer de manière documentée vers une architecture hybride (SSR/ISR) ou connectée à un backend dédié.

---

## 1. Diagramme Haut-Niveau

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVIGATEUR / CLIENT                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    REACT SPA (Vite)                  │    │
│  │                                                     │    │
│  │  ┌────────────┐   ┌──────────────┐  ┌───────────┐  │    │
│  │  │  Routing   │   │   Context    │  │    UI     │  │    │
│  │  │ (RR Dom)   │──▶│  (Auth/Cart) │  │Components │  │    │
│  │  └────────────┘   └──────────────┘  └───────────┘  │    │
│  │         │                                    │       │    │
│  │         ▼                                    ▼       │    │
│  │  ┌────────────────────────────────────────────────┐ │    │
│  │  │         DATA LAYER (constants.ts + types.ts)   │ │    │
│  │  │  Products · Blog · Reviews · Config · FAQ       │ │    │
│  │  └────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          │ HTTP                              │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Gemini AI API (Google)                  │    │
│  │         ↖ RAG Chatbot · Recommandations              │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Arborescence des Fichiers

```
gardenz/
├── public/                  # Assets statiques (favicon, robots.txt)
│
├── src/ (= racine du projet)
│   ├── index.html           # Point d'entrée HTML, balise <div id="root">
│   ├── main.tsx             # Bootstrap React (ReactDOM.createRoot)
│   ├── App.tsx              # Router principal, déclaration des routes
│   ├── index.css            # Styles globaux + Directives Tailwind
│   ├── types.ts             # Interfaces TypeScript (Product, Review, BlogPost…)
│   ├── constants.ts         # Base de données mock (Produits, Blog, FAQ)
│   │
│   ├── components/          # Composants réutilisables & Pages
│   │   ├── Navbar.tsx           # Navigation + Mega Menu Desktop
│   │   ├── Footer.tsx           # Pied de page global
│   │   ├── ProductCard.tsx      # Carte produit de la grille
│   │   ├── ProductDetailPage.tsx # Page fiche produit (PDP)
│   │   ├── QuickViewModal.tsx   # Modale d'aperçu produit
│   │   ├── CartDrawer.tsx       # Tiroir panier
│   │   ├── ChatBot.tsx          # Assistant IA RAG
│   │   ├── MusicPlayer.tsx      # Lecteur audio flottant (Style Spotify) — Lifestyle only
│   │   ├── SEOHead.tsx          # Injection des meta tags & JSON-LD Schema.org
│   │   ├── CookieBanner.tsx     # Bannière de consentement RGPD
│   │   ├── SearchOverlay.tsx    # Overlay de recherche globale
│   │   └── [...]Pages.tsx       # Pages Lazy-Loaded (Home, Shop, Blog, FAQ…)
│   │
│   └── context/             # State global (Context API)
│       ├── AuthContext.tsx      # Authentification (isAuthenticated, login, logout)
│       └── CartContext.tsx      # Panier (items, addToCart, removeFromCart…)
│
├── images/                  # Images produits (WebP/AVIF)
├── medias/                  # Vidéos et certificats PDF
│
├── docs/                    # 📐 Documentation projet (ce répertoire)
│   ├── architecture.md          # Ce fichier
│   ├── fonctionnel.md
│   ├── technique.md
│   ├── solutions.md
│   └── synthese_client.md
│
├── tailwind.config.js       # Config Tailwind (palette, extend, plugins)
├── vite.config.ts           # Config Vite (alias, optimisations)
├── tsconfig.json            # Config TypeScript (strict mode)
└── package.json             # Dépendances et scripts NPM
```

---

## 3. Flux de Données (Data Flow)

### 3.1 Flux standard (lecture de produits)

```
constants.ts
   │
   │  ALL_PRODUCTS = [...WELLNESS_PRODUCTS, ...EXTREME_PRODUCTS, ...LIFESTYLE_PRODUCTS]
   │
   └──▶ Composant consommateur (ex: ShopPage.tsx)
            │
            │  .filter() / .find() selon les QueryParams de l'URL
            │
            └──▶ ProductCard.tsx  ──▶  QuickViewModal.tsx
                                   └──▶  ProductDetailPage.tsx
```

### 3.2 Flux du Panier

```
Utilisateur (clique "Ajouter au panier")
   │
   └──▶ CartContext.addToCart(product, qty)
            │
            │  Mise à jour du state React (in-memory)
            │
            ├──▶ CartDrawer.tsx (ReactDOM re-render)
            └──▶ Navbar.tsx (badge compteur)
```

### 3.3 Flux de l'Assistant IA (RAG)

```
Utilisateur (saisit une question)
   │
   └──▶ ChatBot.tsx
            │
            │  1. Cherche "contexte" dans constants.ts (produits, FAQ, blog)
            │  2. Construit le prompt enrichi (question + contexte)
            │
            └──▶ API Gemini (Google AI)
                     │
                     │  Réponse JSON (texte + produits recommandés)
                     │
                     └──▶ ChatBot.tsx (affiche réponse + <ProductCard /> inline)
```

---

## 4. Routing (Pages Disponibles)

| Chemin URL           | Composant chargé       | Description                     |
| -------------------- | ---------------------- | ------------------------------- |
| `/`                  | `HomePage`             | Accueil animé, bénéfices, hero  |
| `/boutique`          | `ShopPage`             | Catalogue filtrable (PLP)       |
| `/produit/:id`       | `ProductDetailPage`    | Fiche Produit (PDP)             |
| `/blog`              | `BlogPage`             | Index des articles              |
| `/blog/:id`          | `BlogPostPage`         | Article individuel              |
| `/protocole`         | `ProtocolePage`        | Guide de dosage (Bien-être)     |
| `/index-moleculaire` | `IndexMoleculairePage` | Encyclopédie moléculaire        |
| `/fidelite`          | `LoyaltyReferralPage`  | Programme Clan Gardenz          |
| `/connexion`         | `LoginPage`            | Authentification                |
| `/mon-compte`        | `MyAccountPage`        | Espace utilisateur (protégé)    |
| `/cookies`           | `CookieManagementPage` | Gestion du consentement RGPD    |
| `/adn`               | `AdnPage`              | Histoire & valeurs de la marque |
| `/livraison`         | `DeliveryPage`         | Informations de livraison       |
| `/faq`               | `FaqPage`              | Questions fréquentes            |
| `/contact`           | `ContactPage`          | Formulaire de contact           |
| `/boutiques`         | `ShopsPage`            | Trouver un distributeur         |

> **Note :** Toutes les routes sont chargées dynamiquement (`React.lazy()`) pour minimiser le bundle initial.

---

## 5. Gestion des États Globaux

| Contexte      | Données gérées                                   | Consommateurs principaux              |
| ------------- | ------------------------------------------------ | ------------------------------------- |
| `AuthContext` | `isAuthenticated`, `userEmail`, `login/logout`   | Navbar, MyAccountPage, LoginPage      |
| `CartContext` | `items[]`, `cartCount`, `addToCart`, `setIsOpen` | Navbar, CartDrawer, ProductDetailPage |

---

## 6. Stratégie SEO & Performances

```
Build Vite
   │
   ├── Code Splitting par route (Lazy Loading)
   ├── Tree-shaking (suppression du code inutilisé)
   └── Minification JS + CSS
          │
          └──▶ dist/
                  ├── index.html          (~2 KB)
                  ├── assets/index.css    (~124 KB → ~18 KB gzip)
                  └── assets/*.js         (chunks séparés par route)

SEOHead.tsx (par page)
   ├── <title> (60 chars max)
   ├── <meta name="description"> (155 chars)
   ├── <meta property="og:*"> (Open Graph)
   └── <script type="application/ld+json"> (Schema.org Product/Article)
```

---

## 7. Environnement & Déploiement

| Environnement    | Commande          | Output         |
| ---------------- | ----------------- | -------------- |
| Développement    | `npm run dev`     | Vite HMR local |
| Production       | `npm run build`   | `dist/`        |
| Prévisualisation | `npm run preview` | Serve dist/    |

**Variables d'Environnement critiques (`.env.local`) :**

```bash
VITE_GEMINI_API_KEY=<votre_clé_API_Google_AI>
```

---

_Documentation générée le 24/02/2026 — Architecture v1.0 — Gardenz Platform_

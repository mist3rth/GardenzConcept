# Documentation Technique - Gardenz

## 1. Stack Technologique (Front-End)

Le projet est bâti sur une stack moderne, pensée pour la performance extrême et la maintenabilité à long terme.

- **Core :** React 18 (Functional Components & Hooks).
- **Typage :** TypeScript (Strict mode, absence totale de `any`).
- **Styling :** Tailwind CSS pour du styling utilitaire, garantissant un très faible poids du CSS final.
- **Routing :** React Router (`react-router-dom`) avec Lazy Loading (Code Splitting) dynamique des vues.
- **Build Tool :** Vite.js pour un HMR instantané en développement et des builds ultra-optimisés en production.
- **Iconographie :** Lucide React (SVGs allégés et paramétrables).

## 2. Architecture & Arborescence

Respect strict des principes DRY (Don't Repeat Yourself) et KISS (Keep It Simple, Stupid).

- `/components` : Composants UI réutilisables (Boutons, Modales, Produits, Layouts). Les vues entières (Pages) y sont également hébergées et chargées de manière asynchrone.
- `/context` : Gestion des états globaux via la Context API (`AuthContext`, `CartContext`).
- `/types.ts` : Définition des interfaces TypeScript (`Product`, `Review`, `BlogPost`, etc.) assurant un contrat de données strict.
- `/constants.ts` : Base de données statique (Mock) centralisant catalogues, articles et configurations.
- `/index.css` : Styles globaux minimes (polices, scrollbars personnalisées, corrections de curseurs) et configuration Tailwind (directives `@tailwind`).

## 3. Performance & Core Web Vitals (SEO)

La priorité technique #1 est la vitesse et l'indexation.

- **LCP (Largest Contentful Paint) :** Les routes sont découpées (`React.lazy()`). Les images lourdes utilisent les formats WebP/AVIF.
- **CLS (Cumulative Layout Shift) :** Dimensions réservées pour les médias (ratios fixes via Tailwind `aspect-square`, `aspect-video`).
- **SEO Technique :** Composant `<SEOHead />` injectant dynamiquement des balises `meta`, des `title` précis et le **balisage Schema.org (JSON-LD)** pour propulser les Rich Snippets Google.

## 4. Accessibilité (A11Y)

Conçu pour être certifiable WCAG AA.

- **Sémantique :** Utilisation de balises HTML5 (`<nav>`, `<main>`, `<article>`).
- **Navigation Clavier :** Contour (Focus) visible, support de navigation native (tabulations, escape pour fermer les modales).
- **ARIA :** Attributs `aria-label`, `aria-live`, et `role` déployés systématiquement sur les éléments UI complexes (Mégamenu, Tiroirs, Filtres interactifs).

## 5. Animation (Motion Design)

Utilisation stricte d'animations CSS matérielles (`transform`, `opacity`) évitant les reflows du navigateur, tout en conservant une allure "Premium" (Fade-in, slide, underline interactif). L'ensemble est respectueux des préférences utilisateur (animations fluides mais non obstructives).

## 6. Intelligence Artificielle (RAG Chatbot)

Intégration d'un assistant conversationnel propulsé par l'IA.

- **Architecture RAG (Retrieval-Augmented Generation) :** Le bot interroge la base de connaissances locale (produits, articles de blog, FAQ) avant de générer une réponse, garantissant l'exactitude scientifique et commerciale.
- **Interface Intégrée :** Le composant de chat rend des éléments UI avancés (cartes produits interactives avec bouton d'ajout au panier direct) directement dans le flux de la discussion.
- **Gestion de l'historique :** Maintien du contexte de conversation complet permettant des interactions fluides et mémorisées.

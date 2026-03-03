
import React from 'react';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
  isHot?: boolean;
  tags: string[];
  intensity?: 'Soft' | 'Medium' | 'Hardcore';
  universe?: 'wellness' | 'extreme' | 'lifestyle';
  stock?: number;
  isLimited?: boolean;
  hasGift?: boolean;
  isTeamChoice?: boolean;
  molecule?: string;
  origin?: 'usa' | 'france' | 'italy' | 'holland';
  vibe?: string;
  profil?: string;
  gout?: string;
  capacity?: string;
  concentrationDisplay?: string;
  totalConcentration?: string;
  // SEO & Content Fields
  metaTitle?: string;
  metaDescription?: string;
  shortDescription?: string;
  benefits?: string[];
  labCertificate?: string; // URL to PDF
  composition?: string[];
  usageTips?: string;
  checklist?: string[]; // For "Rituel" tab: interactive daily checklist
  dosage?: {
    base: string; // e.g. "3 gouttes"
    max: string;  // e.g. "9 gouttes"
    unit: string; // e.g. "gouttes"
  };
  // Media
  images?: string[]; // Gallery images
  video?: string; // Product video URL (mp4/webm)
  seoContent?: {
    heading: string;
    subheading: string;
    description: string; // HTML allowed or markdown
    features: { title: string; content: string }[]; // Interest/Desire details
    expertQuote?: { author: string; role: string; text: string; image?: string };
    scientificSources?: { title: string; url: string }[];
  };
  tieredPrices?: {
    amount: number;
    unit: string;
    price: number;
    label?: string;
    discountBadge?: string;
  }[];
}

export interface NavItem {
  label: string;
  href: string;
  type?: 'page' | 'filter';
  filterValue?: string;
}

export type Theme = 'wellness' | 'extreme';

export interface Review {
  id: string;
  author: string;
  role?: string;
  image: string;
  rating: number;
  text: string;
  universe: 'Bien-être' | 'eXtreme Lab';
  productCategory: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'Bien-être' | 'eXtreme Lab' | 'Lifestyle' | 'Culture' | 'Guide';
  author: string;
  date: string;
  readTime: string;
  relatedProducts?: string[];
}

export interface Address {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  delay: string;
  icon: React.ReactNode;
}

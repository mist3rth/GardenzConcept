
export interface FilterNode {
  id: string;
  label: string;
  description?: string;
  filters: {
    primary?: 'usage' | 'intensity' | 'category';
    options: {
      usage?: string[];
      categories: string[];
      intensities?: {
        id: 'Soft' | 'Medium' | 'Hardcore';
        molecules: string[];
      }[];
    };
  };
}

export interface GlobalFilter {
  priceRange: { min: number; max: number };
  qualityFlags: {
    id: string;
    label: string;
    triggerCategories?: string[];
    triggerUniverse?: string;
    triggerPrice?: number;
  }[];
}

export const FILTER_TREE: { root: { universes: FilterNode[]; global: GlobalFilter } } = {
  root: {
    universes: [
      {
        id: 'wellness',
        label: 'Bien-être',
        description: "Produits axés sur le bien-être, sans effet psychotrope intense.",
        filters: {
          primary: 'usage',
          options: {
            usage: ['Relaxation', 'Sommeil', 'Stress', 'Focus'],
            categories: [
              'Fleurs', 
              'Huiles', 
              'Comestibles', 
              'Vape', 
              'Résines', 
              'Concentrés', 
              'Boissons', 
              'Bien-être', 
              'Cosmétique', 
              'Gélules'
            ]
          }
        }
      },
      {
        id: 'extreme',
        label: 'eXtreme Lab',
        description: "Nouvelles molécules et expériences intenses.",
        filters: {
          primary: 'intensity',
          options: {
            categories: [
              'Fleurs', 
              'Huiles', 
              'Comestibles', 
              'Vape', 
              'Résines', 
              'Concentrés', 
              'Gélules'
            ],
            intensities: [
              {
                id: 'Soft',
                molecules: ['CBD', 'CBG', 'CBC', 'CBN', 'H4-CBD']
              },
              {
                id: 'Medium',
                molecules: ['THCV', 'HHC', 'Delta-9-THC', 'HHCA']
              },
              {
                id: 'Hardcore',
                molecules: ['HHCP-O', 'THC-O', 'HHC-P', 'THCP', 'THCH', 'THCB']
              }
            ]
          }
        }
      },
      {
        id: 'lifestyle',
        label: 'LifeStyle',
        description: "Vêtements, Accessoires et Culture.",
        filters: {
          primary: 'category',
          options: {
            categories: ['Vêtements', 'Accessoires', 'Livres', 'Musique']
          }
        }
      }
    ],
    global: {
      priceRange: { min: 0, max: 400 },
      qualityFlags: [
        { 
          id: 'labTested', 
          label: 'Testé en Laboratoire', 
          triggerCategories: ['Fleurs', 'Résines', 'Concentrés', 'Vape'] 
        },
        { 
          id: 'fullSpectrum', 
          label: 'Full Spectrum', 
          triggerUniverse: 'wellness'
        },
        { 
          id: 'premium', 
          label: 'Premium (+60€)', 
          triggerPrice: 60 
        }
      ]
    }
  }
};

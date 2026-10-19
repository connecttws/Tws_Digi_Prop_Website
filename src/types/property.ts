export type PropertyStatus = 'for-sale' | 'for-rent';
export type LifestyleCategory = 'contemporary' | 'family' | 'retreat';
export type PropertyType = 
  | 'Modernist Villa'
  | 'Architectural Residence'
  | 'City Townhouse'
  | 'Sky Penthouse'
  | 'Coastal Sanctuary'
  | 'Country Masseria';

export interface Property {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  city: string;
  country: string;
  neighborhood: string;
  price: number;
  priceDisplay: string;
  status: PropertyStatus;
  type: PropertyType;
  lifestyle: LifestyleCategory;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  areaSqM: number;
  yearBuilt: number;
  architect?: string;
  featured?: boolean;
  spotlight?: boolean;
  heroImage: string;
  gallery: string[];
  overview: string;
  narrative: string;
  architectureDetails: string[];
  amenities: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  floorPlanInfo?: {
    levels: number;
    description: string;
  };
  has3DModel?: boolean;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  heroImage: string;
  excerpt: string;
  content: string[];
  quote?: string;
  author: {
    name: string;
    role: string;
  };
}

export interface ViewingRequest {
  propertyId: string;
  propertyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  inquiryType: 'in-person' | 'private-virtual' | 'architectural-dossier';
  notes?: string;
}

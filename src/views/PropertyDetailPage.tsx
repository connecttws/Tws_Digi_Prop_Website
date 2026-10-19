"use client";

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Box, 
  Image, 
  Share2, 
  Heart, 
  Check, 
  Calendar, 
  MapPin, 
  Maximize, 
  ShieldCheck,
  Compass
} from 'lucide-react';
import { Property } from '../types/property';
import { PROPERTIES } from '../data/properties';
import { ClientVillaViewer } from '../components/3d/ClientVillaViewer';
import { ImageLightbox } from '../components/common/ImageLightbox';
import { PropertyCard } from '../components/common/PropertyCard';

interface PropertyDetailPageProps {
  slug: string;
  onNavigate: (route: string) => void;
  onOpenViewing: (property: Property) => void;
  onSelectProperty: (slug: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenViewing,
  onSelectProperty
}) => {
  const property = PROPERTIES.find((p) => p.slug === slug) || PROPERTIES[0];
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | '3d'>(
    property.has3DModel ? '3d' : 'photos'
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Related properties (excluding current)
  const relatedProperties = PROPERTIES.filter((p) => p.id !== property.id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const openLightboxAt = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-[#F7F5F0]">
      
      {/* Lightbox Component */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={property.gallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
        title={`${property.title} — ${property.location}`}
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-8 text-xs">
          <button
            onClick={() => onNavigate('/properties')}
            className="flex items-center space-x-1.5 text-[#5C5C57] hover:text-[#242522] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Portfolio</span>
          </button>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center space-x-1.5 text-xs transition-colors ${
                isSaved ? 'text-rose-600 font-medium' : 'text-[#5C5C57] hover:text-[#242522]'
              }`}
            >
              <Heart size={14} className={isSaved ? 'fill-current' : ''} />
              <span>{isSaved ? 'Saved to Dossier' : 'Save Property'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-1.5 text-[#5C5C57] hover:text-[#242522] transition-colors"
            >
              <Share2 size={14} />
              <span>{copiedShare ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Top Header Section */}
        <div className="pb-8 border-b border-[#242522]/10 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            
            <div>
              <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.2em] text-[#A69B8A] mb-2 font-medium">
                <span>{property.location}</span>
                <span>•</span>
                <span>{property.type}</span>
                {property.architect && (
                  <>
                    <span>•</span>
                    <span>Arch. {property.architect}</span>
                  </>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-serif text-[#242522] font-normal leading-tight">
                {property.title}
              </h1>

              <p className="mt-2 text-sm md:text-base text-[#5C5C57] font-light max-w-2xl">
                {property.subtitle}
              </p>
            </div>

            {/* Price & Primary Action */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4">
              <div className="text-left lg:text-right">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#A69B8A] block">
                  {property.status === 'for-sale' ? 'Asking Valuation' : 'Private Lease Rate'}
                </span>
                <span className="text-2xl md:text-3xl font-serif text-[#242522] font-normal">
                  {property.priceDisplay}
                </span>
              </div>

              <button
                onClick={() => onOpenViewing(property)}
                className="px-6 py-3 bg-[#242522] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B79A69] hover:text-[#242522] transition-colors rounded-xs flex items-center space-x-2"
              >
                <span>Arrange Private Viewing</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

          </div>

          {/* Key Metric Strip */}
          <div className="mt-8 pt-6 border-t border-[#242522]/5 flex flex-wrap gap-8 text-xs text-[#242522]">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A69B8A] block">Bedrooms</span>
              <span className="text-base font-serif font-medium">{property.bedrooms} Suites</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A69B8A] block">Bathrooms</span>
              <span className="text-base font-serif font-medium">{property.bathrooms} Full Baths</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A69B8A] block">Interior Area</span>
              <span className="text-base font-serif font-medium">{property.areaSqFt.toLocaleString()} sq ft ({property.areaSqM} m²)</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A69B8A] block">Year Completed</span>
              <span className="text-base font-serif font-medium">{property.yearBuilt}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A69B8A] block">Tenure</span>
              <span className="text-base font-serif font-medium">Freehold Title</span>
            </div>
          </div>
        </div>

        {/* Media Presentation Stage (3D Spatial Tour or Photography Gallery) */}
        <div className="mb-14">
          
          {/* Media Mode Tabs */}
          <div className="flex items-center space-x-3 mb-4">
            {property.has3DModel && (
              <button
                onClick={() => setActiveMediaTab('3d')}
                className={`flex items-center space-x-2 px-4 py-2 text-xs uppercase tracking-wider rounded-xs transition-colors border ${
                  activeMediaTab === '3d'
                    ? 'bg-[#242522] text-[#F7F5F0] border-[#242522] font-semibold'
                    : 'bg-white text-[#5C5C57] border-[#242522]/15 hover:border-[#242522]'
                }`}
              >
                <Box size={14} className="text-[#B79A69]" />
                <span>3D Spatial Tour</span>
              </button>
            )}

            <button
              onClick={() => setActiveMediaTab('photos')}
              className={`flex items-center space-x-2 px-4 py-2 text-xs uppercase tracking-wider rounded-xs transition-colors border ${
                activeMediaTab === 'photos'
                  ? 'bg-[#242522] text-[#F7F5F0] border-[#242522] font-semibold'
                  : 'bg-white text-[#5C5C57] border-[#242522]/15 hover:border-[#242522]'
              }`}
            >
              <Image size={14} />
              <span>Architectural Photography ({property.gallery.length})</span>
            </button>
          </div>

          {/* Interactive 3D Canvas or Photo Gallery */}
          {activeMediaTab === '3d' && property.has3DModel ? (
            <div className="w-full h-[580px] md:h-[680px] bg-white border border-[#242522]/15 shadow-sm overflow-hidden">
              <ClientVillaViewer 
                initialLighting="golden-hour" 
                initialCamera="pool" 
                className="h-full"
              />
            </div>
          ) : (
            /* Photographic Editorial Gallery Grid */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Primary Lead Image */}
              <div 
                className="md:col-span-8 aspect-[16/10] overflow-hidden bg-[#E9E2D8] cursor-pointer group relative"
                onClick={() => openLightboxAt(0)}
              >
                <img
                  src={property.gallery[0]}
                  alt={`${property.title} view 1`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute bottom-4 left-4 bg-[#242522]/90 text-white text-[10px] uppercase tracking-widest px-3 py-1.5 flex items-center space-x-1.5">
                  <Maximize size={12} />
                  <span>Expand Gallery</span>
                </div>
              </div>

              {/* Supporting Vertical Stack */}
              <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4">
                {property.gallery.slice(1, 3).map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-[16/10] overflow-hidden bg-[#E9E2D8] cursor-pointer group relative"
                    onClick={() => openLightboxAt(idx + 1)}
                  >
                    <img
                      src={img}
                      alt={`${property.title} view ${idx + 2}`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Two-Column Editorial Details & Viewing Scheduler */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview & Narrative */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A69B8A] font-medium block mb-3">
                ARCHITECTURAL NARRATIVE
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#242522] mb-4">
                An Atmosphere of Unhurried Elegance
              </h2>
              <div className="text-sm md:text-base text-[#52524E] font-light leading-relaxed space-y-4">
                <p>{property.overview}</p>
                <p>{property.narrative}</p>
              </div>
            </div>

            {/* Architectural & Structural Highlights */}
            <div className="pt-8 border-t border-[#242522]/10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A69B8A] font-medium block mb-3">
                CRAFT & MATERIALITY
              </span>
              <h3 className="text-xl font-serif text-[#242522] mb-4">
                Construction & Engineering Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.architectureDetails.map((detail, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-4 bg-white border border-[#242522]/10">
                    <span className="text-[#B79A69] font-serif text-lg leading-none">0{idx + 1}</span>
                    <p className="text-xs text-[#52524E] font-light leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Specifications Table */}
            <div className="pt-8 border-t border-[#242522]/10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A69B8A] font-medium block mb-3">
                VERIFIED SPECIFICATIONS
              </span>
              <h3 className="text-xl font-serif text-[#242522] mb-4">
                Estate Dimensions & Structural Dossier
              </h3>
              <div className="bg-white border border-[#242522]/10 divide-y divide-[#242522]/5">
                {property.specifications.map((spec, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 text-xs">
                    <span className="text-[#7A7A74] uppercase tracking-wider">{spec.label}</span>
                    <span className="text-[#242522] font-medium mt-1 sm:mt-0">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities & Life Conveniences */}
            <div className="pt-8 border-t border-[#242522]/10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A69B8A] font-medium block mb-3">
                AMENITIES
              </span>
              <h3 className="text-xl font-serif text-[#242522] mb-4">
                Private Amenities & Wellness Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs text-[#242522] font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B79A69]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Sidebar Enquiry Panel (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            
            <div className="p-8 bg-white border border-[#242522]/15 shadow-sm rounded-xs">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B79A69] font-medium block mb-1">
                PRIVATE REPRESENTATION
              </span>
              <h3 className="text-xl font-serif text-[#242522] mb-2">
                Inquire on This Residence
              </h3>
              <p className="text-xs text-[#6B6B67] font-light leading-relaxed mb-6">
                Connect with our senior advisory partner representing {property.title}.
              </p>

              <div className="space-y-3 mb-6 text-xs text-[#242522]">
                <div className="flex justify-between py-2 border-b border-[#242522]/5">
                  <span className="text-[#8C8C85]">Reference</span>
                  <span className="font-mono text-[11px]">{property.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#242522]/5">
                  <span className="text-[#8C8C85]">Availability</span>
                  <span className="text-emerald-700 font-medium">Verified Active</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#242522]/5">
                  <span className="text-[#8C8C85]">Advisory Fee</span>
                  <span>Fiduciary Structured</span>
                </div>
              </div>

              <button
                onClick={() => onOpenViewing(property)}
                className="w-full py-3.5 bg-[#242522] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B79A69] hover:text-[#242522] transition-colors rounded-xs flex items-center justify-center space-x-2"
              >
                <span>Schedule Private Viewing</span>
                <ArrowUpRight size={14} />
              </button>

              <div className="mt-4 flex items-center justify-center space-x-1.5 text-[10px] text-[#8C8C85]">
                <ShieldCheck size={12} className="text-[#B79A69]" />
                <span>Confidentiality Guaranteed</span>
              </div>
            </div>

            {/* Direct Curator Contact Box */}
            <div className="p-6 bg-[#FAF8F5] border border-[#242522]/10 text-xs text-[#52524E]">
              <p className="font-serif text-sm text-[#242522] mb-1">Prefer a Direct Conversation?</p>
              <p className="font-light text-[11px] leading-relaxed mb-3">
                Reach out directly to our private desk to discuss requirements or acquire the full architectural drawing package.
              </p>
              <p className="font-mono text-[#242522]">+1 (310) 844-9200</p>
              <p className="text-[#A69B8A] text-[11px]">advisory@atelierestates.com</p>
            </div>

          </div>

        </div>

        {/* Related Residences Section */}
        <div className="mt-24 pt-16 border-t border-[#242522]/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A69B8A] font-medium block">
                COMPLEMENTARY LIVING
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#242522]">
                Residences of Equal Caliber
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/properties')}
              className="text-xs uppercase tracking-[0.18em] text-[#242522] hover:text-[#B79A69] transition-colors"
            >
              View Full Portfolio →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

"use client";

import React from 'react';
import { Property } from '../../types/property';
import { ArrowUpRight, Box, Compass } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (slug: string) => void;
  onQuickView3D?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onQuickView3D
}) => {
  return (
    <article className="group flex flex-col bg-white border border-[#242522]/10 overflow-hidden transition-all duration-300 hover:border-[#242522]/30 hover:shadow-md">
      
      {/* Property Imagery with Quiet Hover Reveal */}
      <div 
        className="relative w-full aspect-[4/3] overflow-hidden bg-[#E9E2D8] cursor-pointer"
        onClick={() => onSelect(property.slug)}
      >
        <img
          src={property.heroImage}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Status & Type Pill */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <span className="bg-[#242522]/90 text-[#F7F5F0] text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-xs">
            {property.status === 'for-sale' ? 'For Sale' : 'Private Lease'}
          </span>
          <span className="bg-white/95 text-[#242522] text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-xs border border-[#242522]/10">
            {property.type}
          </span>
        </div>

        {/* 3D Model Badge if available */}
        {property.has3DModel && (
          <div className="absolute top-4 right-4">
            <span className="bg-[#B79A69] text-[#242522] text-[10px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 rounded-xs flex items-center space-x-1 shadow-xs">
              <Box size={12} />
              <span>3D Spatial Tour</span>
            </span>
          </div>
        )}

        {/* Price overlay along bottom of image */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-between text-white">
          <p className="text-lg md:text-xl font-serif tracking-wide font-normal">
            {property.priceDisplay}
          </p>
          <span className="text-[11px] text-white/80 font-light tracking-wider">
            {property.areaSqFt.toLocaleString()} sq ft · {property.areaSqM} m²
          </span>
        </div>
      </div>

      {/* Property Information Body */}
      <div className="p-6 flex flex-col flex-grow justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#A69B8A] mb-1.5">
            <span>{property.location}</span>
          </div>

          <h3 
            onClick={() => onSelect(property.slug)}
            className="text-xl font-serif text-[#242522] tracking-normal font-normal cursor-pointer hover:text-[#B79A69] transition-colors line-clamp-1"
          >
            {property.title}
          </h3>

          <p className="text-xs text-[#52524E] font-light mt-2 line-clamp-2 leading-relaxed">
            {property.subtitle}
          </p>
        </div>

        {/* Specifications & Actions */}
        <div className="mt-6 pt-4 border-t border-[#242522]/10 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-[#242522]/80 font-light">
            <span>{property.bedrooms} Bed</span>
            <span className="text-[#A69B8A]">•</span>
            <span>{property.bathrooms} Bath</span>
            {property.architect && (
              <>
                <span className="text-[#A69B8A] hidden sm:inline">•</span>
                <span className="text-[11px] text-[#A69B8A] hidden sm:inline truncate max-w-[120px]">
                  {property.architect.split(' ')[0]} Arch.
                </span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {property.has3DModel && onQuickView3D && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView3D(property);
                }}
                className="text-[11px] uppercase tracking-[0.15em] text-[#242522] hover:text-[#B79A69] p-1.5 border border-[#242522]/20 hover:border-[#B79A69] rounded-xs transition-colors"
                title="Launch 3D Interactive Spatial View"
              >
                <Box size={14} />
              </button>
            )}

            <button
              onClick={() => onSelect(property.slug)}
              className="text-[11px] uppercase tracking-[0.18em] text-[#242522] group-hover:text-[#B79A69] flex items-center space-x-1 transition-colors"
            >
              <span>Explore</span>
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

      </div>

    </article>
  );
};

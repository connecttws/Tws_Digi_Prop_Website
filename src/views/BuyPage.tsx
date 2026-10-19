"use client";

import React from 'react';
import { ArrowUpRight, ShieldCheck, Key, FileCheck, Landmark } from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/common/PropertyCard';
import { Property } from '../types/property';

interface BuyPageProps {
  onSelectProperty: (slug: string) => void;
  onOpenViewing: (property: Property) => void;
  onOpenConsultation: () => void;
  onQuickView3D: (property: Property) => void;
}

export const BuyPage: React.FC<BuyPageProps> = ({
  onSelectProperty,
  onOpenViewing,
  onOpenConsultation,
  onQuickView3D
}) => {
  const saleProperties = PROPERTIES.filter((p) => p.status === 'for-sale');

  return (
    <div className="pt-28 md:pt-36 pb-24 bg-[#F7F5F0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#A69B8A] font-medium block mb-3">
            ESTATE ACQUISITIONS
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#242522] font-normal leading-tight mb-4">
            Residences for Acquisition.
          </h1>
          <p className="text-base text-[#5C5C57] font-light leading-relaxed">
            A curated portfolio of permanent architectural sanctuaries, historic estates, 
            and contemporary hillside villas held for private conveyance.
          </p>
        </div>

        {/* Buying Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-white border border-[#242522]/10">
            <Landmark size={20} className="text-[#B79A69] mb-3" />
            <h4 className="font-serif text-base text-[#242522] mb-1">Architectural Provenance</h4>
            <p className="text-xs text-[#6B6B67] font-light leading-relaxed">
              Every acquisition is vetted for structural craftsmanship, architectural heritage, and zoning integrity.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#242522]/10">
            <Key size={20} className="text-[#B79A69] mb-3" />
            <h4 className="font-serif text-base text-[#242522] mb-1">Discreet Off-Market Search</h4>
            <p className="text-xs text-[#6B6B67] font-light leading-relaxed">
              Access unlisted private sales and family estate transfers that never enter public channels.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#242522]/10">
            <FileCheck size={20} className="text-[#B79A69] mb-3" />
            <h4 className="font-serif text-base text-[#242522] mb-1">Fiduciary Representation</h4>
            <p className="text-xs text-[#6B6B67] font-light leading-relaxed">
              Single-mandate representation dedicated entirely to negotiating the optimal terms for the buyer.
            </p>
          </div>
        </div>

        {/* Properties for Sale Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif text-[#242522]">
              Current Available Estates ({saleProperties.length})
            </h2>
            <button
              onClick={onOpenConsultation}
              className="text-xs uppercase tracking-wider text-[#242522] hover:text-[#B79A69] transition-colors"
            >
              Request Off-Market Dossier →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {saleProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={onSelectProperty}
                onQuickView3D={onQuickView3D}
              />
            ))}
          </div>
        </div>

        {/* Custom Acquisition Intake Banner */}
        <div className="p-10 bg-white border border-[#242522]/10 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-serif text-[#242522] mb-2">Commission a Targeted Search</h3>
          <p className="text-xs text-[#5C5C57] font-light leading-relaxed mb-6">
            If your target geography, acreage, or architectural period is not currently listed, 
            our private acquisition team will conduct a targeted discreet search.
          </p>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 bg-[#242522] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B79A69] hover:text-[#242522] transition-colors rounded-xs"
          >
            Commission Private Search
          </button>
        </div>

      </div>
    </div>
  );
};

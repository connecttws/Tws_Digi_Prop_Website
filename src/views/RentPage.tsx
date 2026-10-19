"use client";

import React from 'react';
import { ArrowUpRight, Sparkles, Shield, Clock } from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/common/PropertyCard';
import { Property } from '../types/property';

interface RentPageProps {
  onSelectProperty: (slug: string) => void;
  onOpenViewing: (property: Property) => void;
  onOpenConsultation: () => void;
  onQuickView3D: (property: Property) => void;
}

export const RentPage: React.FC<RentPageProps> = ({
  onSelectProperty,
  onOpenViewing,
  onOpenConsultation,
  onQuickView3D
}) => {
  const leaseProperties = PROPERTIES.filter((p) => p.status === 'for-rent');

  return (
    <div className="pt-28 md:pt-36 pb-24 bg-[#F7F5F0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#A69B8A] font-medium block mb-3">
            CURATED LEASEHOLDS
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#242522] font-normal leading-tight mb-4">
            Private Residences for Lease.
          </h1>
          <p className="text-base text-[#5C5C57] font-light leading-relaxed">
            Seasonal Mediterranean sanctuaries, historic Italian masserie, and metropolitan pied-à-terres 
            available for discerning multi-month or annual tenancy.
          </p>
        </div>

        {/* Tenancy Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-white border border-[#242522]/10">
            <Shield size={20} className="text-[#B79A69] mb-3" />
            <h4 className="font-serif text-base text-[#242522] mb-1">Confidential Tenancy</h4>
            <p className="text-xs text-[#6B6B67] font-light leading-relaxed">
              Discreet vetting and bilateral privacy agreements safeguard identity and household affairs.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#242522]/10">
            <Sparkles size={20} className="text-[#B79A69] mb-3" />
            <h4 className="font-serif text-base text-[#242522] mb-1">Estate Turnkey Readiness</h4>
            <p className="text-xs text-[#6B6B67] font-light leading-relaxed">
              Fully provisioned residences with dedicated maintenance managers, optional private culinary staff, and groundskeeping.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#242522]/10">
            <Clock size={20} className="text-[#B79A69] mb-3" />
            <h4 className="font-serif text-base text-[#242522] mb-1">Flexible Terms</h4>
            <p className="text-xs text-[#6B6B67] font-light leading-relaxed">
              Custom structures ranging from seasonal summer retreats (3–6 months) to multi-year diplomatic leases.
            </p>
          </div>
        </div>

        {/* Available Leasehold Properties */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif text-[#242522]">
              Current Available Leaseholds ({leaseProperties.length})
            </h2>
            <button
              onClick={onOpenConsultation}
              className="text-xs uppercase tracking-wider text-[#242522] hover:text-[#B79A69] transition-colors"
            >
              Custom Lease Request →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaseProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={onSelectProperty}
                onQuickView3D={onQuickView3D}
              />
            ))}
          </div>
        </div>

        {/* Tenancy Consultation Banner */}
        <div className="p-10 bg-white border border-[#242522]/10 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-serif text-[#242522] mb-2">Request Seasonal Tenancy Portfolio</h3>
          <p className="text-xs text-[#5C5C57] font-light leading-relaxed mb-6">
            Looking for an off-market summer villa in Cap d'Antibes or an autumn retreat in Tuscany? 
            Connect with our residential tenancy desk.
          </p>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 bg-[#242522] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B79A69] hover:text-[#242522] transition-colors rounded-xs"
          >
            Inquire on Private Leases
          </button>
        </div>

      </div>
    </div>
  );
};

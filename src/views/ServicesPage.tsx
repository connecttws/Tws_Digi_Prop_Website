"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (route: string) => void;
  onOpenConsultation: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenConsultation }) => {
  const services = [
    {
      num: '01',
      title: 'Private Property Acquisition & Buyer Advisory',
      tagline: 'A bespoke search mandate tailored to your life rhythms and architectural sensibilities.',
      description: 'We act exclusively on behalf of discriminating buyers to unearth exceptional residences—both publicly listed and discreetly held off-market. From initial spatial brief through structural forensics, contract negotiation, and escrow completion, we ensure complete fiduciary protection.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      action: 'Commission a Buyer Mandate'
    },
    {
      num: '02',
      title: 'Architectural Curation & Global Estate Marketing',
      tagline: 'Presenting exceptional homes through cinematic editorial photography and spatial 3D experiences.',
      description: 'We reject generic real estate marketing. For each property we represent, we commission world-class architectural photography, produce narrative editorial literature, and construct interactive 3D spatial models to engage qualified global collectors and connoisseurs.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      action: 'Discuss Listing Representation'
    },
    {
      num: '03',
      title: 'Architectural Restoration & Historical Advisory',
      tagline: 'Preserving historical soul while integrating contemporary mechanical refinement.',
      description: 'Many of the world’s most enchanting residences carry historical designations or require sensitive architectural revival. Our advisory network coordinates with heritage conservationists, structural engineers, and interior artisans to safeguard legacy while optimizing modern livability.',
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      action: 'Inquire on Restoration Advisory'
    },
    {
      num: '04',
      title: 'Private Lease & Curated Seasonal Tenancies',
      tagline: 'Discreet luxury leasing for collectors, artists, and global executives.',
      description: 'For property owners seeking to lease premier estates or individuals requiring seasonal coastal retreats or prime metropolitan sanctuaries, we manage verified tenancies with full background protocols and white-glove estate care.',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      action: 'Explore Curated Leasing'
    }
  ];

  return (
    <div className="pt-28 md:pt-36 pb-24 bg-[#F7F5F0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#A69B8A] font-medium block mb-3">
            ADVISORY CAPABILITIES
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#242522] font-normal leading-tight mb-6">
            Considered Real Estate Services.
          </h1>
          <p className="text-base md:text-lg text-[#5C5C57] font-light leading-relaxed">
            Every engagement is structured around absolute discretion, architectural expertise, 
            and transparent client representation.
          </p>
        </div>

        {/* Alternating Magazine Services Layout */}
        <div className="space-y-24 md:space-y-32">
          {services.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div 
                key={service.num}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-[#242522]/10 last:border-b-0"
              >
                
                {/* Visual Image */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="aspect-[16/10] overflow-hidden bg-[#E9E2D8] border border-[#242522]/10 shadow-sm">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-103"
                    />
                  </div>
                </div>

                {/* Editorial Content */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'} space-y-5`}>
                  <span className="text-3xl font-serif text-[#B79A69] block">
                    {service.num}
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-serif text-[#242522] font-normal leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs uppercase tracking-wider text-[#A69B8A] font-medium">
                    {service.tagline}
                  </p>

                  <p className="text-xs md:text-sm text-[#52524E] font-light leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={onOpenConsultation}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#242522] hover:text-[#B79A69] transition-colors group"
                    >
                      <span>{service.action}</span>
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-10 md:p-14 bg-[#242522] text-[#F7F5F0] rounded-xs text-center max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B79A69] font-medium block mb-3">
            PRIVATE ENGAGEMENT
          </span>
          <h3 className="text-2xl md:text-3xl font-serif mb-4 text-white">
            Discuss Your Property Requirements
          </h3>
          <p className="text-xs md:text-sm text-[#D8D2C6] font-light leading-relaxed mb-8 max-w-lg mx-auto">
            Our advisory partners are available for confidential consultations at our private salons 
            or via secure video appointment.
          </p>
          <button
            onClick={onOpenConsultation}
            className="px-8 py-3.5 bg-[#B79A69] text-[#242522] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors rounded-xs"
          >
            Schedule Consultation
          </button>
        </div>

      </div>
    </div>
  );
};

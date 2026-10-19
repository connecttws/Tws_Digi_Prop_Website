"use client";

import React from 'react';
import { ArrowUpRight, Compass, Shield, Award, Sparkles } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: string) => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="pt-28 md:pt-36 pb-24 bg-[#F7F5F0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Page Hero */}
        <div className="max-w-3xl mb-20">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#A69B8A] font-medium block mb-3">
            AGENCY ETHOS & FOUNDATION
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#242522] font-normal leading-[1.1] mb-6">
            Property Is Personal.<br />
            <span className="italic text-[#8C7E6C]">So Are We.</span>
          </h1>
          <p className="text-base md:text-lg text-[#5C5C57] font-light leading-relaxed">
            We believe finding the right place begins with understanding the life you want to create. 
            ATELIER ESTATES was founded to discard transactional haste in favor of architectural discernment, 
            deep patience, and unyielding client advocacy.
          </p>
        </div>

        {/* Lead Image & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-7">
            <div className="aspect-[16/10] overflow-hidden bg-[#E9E2D8] border border-[#242522]/10 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80"
                alt="Architectural Consultation Salon"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 text-sm text-[#52524E] font-light leading-relaxed">
            <h3 className="text-2xl font-serif text-[#242522] font-normal">
              A Departure From the Ordinary Brokerage
            </h3>
            <p>
              Conventional real estate measures success by speed and volume. We measure our practice 
              by the longevity of the relationships we nurture and the architectural integrity of the spaces we represent.
            </p>
            <p>
              Every residence in our portfolio undergoes rigorous architectural review. We examine daylight orientation, 
              structural integrity, acoustic privacy, and the quiet nuances that make a home a sanctuary.
            </p>
            <div className="pt-2">
              <div className="flex items-center space-x-3 text-xs uppercase tracking-wider text-[#242522] font-medium">
                <span className="w-6 h-[1px] bg-[#B79A69]" />
                <span>Beverly Hills · Mayfair · Kyoto</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="py-20 border-t border-b border-[#242522]/10 mb-28">
          <div className="max-w-xl mb-14">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#A69B8A] font-medium block mb-2">
              OUR PILLARS
            </span>
            <h2 className="text-3xl font-serif text-[#242522]">
              How We Guide You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-[#242522]/10">
              <span className="text-2xl font-serif text-[#B79A69] block mb-4">01</span>
              <h4 className="text-lg font-serif text-[#242522] mb-3">Architectural Curation</h4>
              <p className="text-xs text-[#6B6B67] font-light leading-relaxed">
                We represent residences with unmistakable architectural vision—homes built with honest stone, 
                natural timbers, and spaces calibrated for genuine well-being.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#242522]/10">
              <span className="text-2xl font-serif text-[#B79A69] block mb-4">02</span>
              <h4 className="text-lg font-serif text-[#242522] mb-3">Absolute Discretion</h4>
              <p className="text-xs text-[#6B6B67] font-light leading-relaxed">
                Our off-market representation protects client privacy completely. Viewings and negotiations are conducted 
                with strict bilateral confidentiality agreements.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#242522]/10">
              <span className="text-2xl font-serif text-[#B79A69] block mb-4">03</span>
              <h4 className="text-lg font-serif text-[#242522] mb-3">Fiduciary Clarity</h4>
              <p className="text-xs text-[#6B6B67] font-light leading-relaxed">
                We provide unbiased, rigorous guidance on property valuation, structural condition, and zoning 
                regulations so you make decisions with absolute confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Advisory Principals */}
        <div className="mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A69B8A] font-medium block mb-2">
                LEADERSHIP & ADVISORY
              </span>
              <h2 className="text-3xl font-serif text-[#242522]">
                Our Partners
              </h2>
            </div>
            <p className="text-xs text-[#7A7A74] max-w-sm font-light mt-3 md:mt-0">
              A multidisciplinary partnership uniting architectural scholarship, legal precision, and discreet private brokerage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Julian Thorne',
                role: 'Managing Partner & Architectural Curator',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
                bio: 'Former architectural historian at the Royal Academy; two decades advising private family offices on prime estate acquisitions.'
              },
              {
                name: 'Elena Vance-Ross',
                role: 'Partner, European & Mediterranean Mandates',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
                bio: 'Specialist in Grade-listed historical restorations and contemporary coastal architecture across the Côte d’Azur and London.'
              },
              {
                name: 'Kenji Takahashi',
                role: 'Director of Asian Sanctuaries & 3D Spatial Systems',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
                bio: 'Trained at Todai Architecture; pioneers interactive spatial computational visualization and Kyoto timber heritage acquisitions.'
              }
            ].map((p, idx) => (
              <div key={idx} className="bg-white border border-[#242522]/10 overflow-hidden">
                <div className="aspect-[3/4] bg-[#E9E2D8] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover filter grayscale contrast-105" />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-serif text-[#242522]">{p.name}</h4>
                  <p className="text-[11px] uppercase tracking-wider text-[#B79A69] mt-0.5 mb-3">{p.role}</p>
                  <p className="text-xs text-[#6B6B67] font-light leading-relaxed">{p.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Action */}
        <div className="p-10 md:p-14 bg-white border border-[#242522]/10 text-center max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B79A69] font-medium block mb-2">
            CONVERSATION
          </span>
          <h3 className="text-2xl md:text-3xl font-serif text-[#242522] mb-3">
            Start a Conversation With Us
          </h3>
          <p className="text-xs md:text-sm text-[#5C5C57] font-light leading-relaxed mb-8 max-w-lg mx-auto">
            Whether you are considering a confidential sale, seeking a quiet sanctuary, 
            or exploring the architectural landscape, our advisory desk welcomes your inquiry.
          </p>
          <button
            onClick={onOpenConsultation}
            className="px-8 py-3.5 bg-[#242522] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B79A69] hover:text-[#242522] transition-colors rounded-xs"
          >
            Request Private Consultation
          </button>
        </div>

      </div>
    </div>
  );
};

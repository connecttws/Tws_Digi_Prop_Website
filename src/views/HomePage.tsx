"use client";

import React, { useState } from 'react';
import { ArrowUpRight, ArrowDown, ChevronRight, Box, Image, Sparkles, Compass } from 'lucide-react';
import { PROPERTIES, LIFESTYLES } from '../data/properties';
import { PropertyCard } from '../components/common/PropertyCard';
import { ClientVillaViewer } from '../components/3d/ClientVillaViewer';
import { Property } from '../types/property';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onOpenViewing: (property?: Property) => void;
  onSelectProperty: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenViewing,
  onSelectProperty,
}) => {
  const [spotlightViewMode, setSpotlightViewMode] = useState<'3d' | 'photo'>('3d');

  // Spotlight property: The Glasshouse Residence
  const spotlightProp = PROPERTIES.find((p) => p.slug === 'the-glasshouse-residence') || PROPERTIES[0];

  // Featured 3 properties for discovery section: Glasshouse, Quiet Corner, Garden House
  const featuredDiscovery = [
    PROPERTIES.find((p) => p.slug === 'the-glasshouse-residence')!,
    PROPERTIES.find((p) => p.slug === 'a-quiet-corner-in-the-city')!,
    PROPERTIES.find((p) => p.slug === 'the-garden-house')!,
  ].filter(Boolean);

  const scrollToDiscovery = () => {
    const el = document.getElementById('discovery-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#F7F5F0]">
      
      {/* SECTION 1: CINEMATIC HERO */}
      <section className="relative w-full h-[100vh] min-h-[640px] flex items-end pb-16 md:pb-24 overflow-hidden">
        {/* Full Viewport Architectural Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
            alt="The Glasshouse Residence at Dusk"
            className="w-full h-full object-cover object-center scale-100 animate-in fade-in zoom-in-95 duration-1000"
          />
          {/* Subtle dark gradient overlay for effortless typography legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />
        </div>

        {/* Content Positioned Left-Of-Center */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 w-full">
          <div className="max-w-2xl text-white">
            
            {/* Eyebrow */}
            <p className="text-[11px] md:text-xs font-sans tracking-[0.28em] uppercase text-[#E9E2D8] mb-4 font-light">
              EXCEPTIONAL PROPERTIES. CONSIDERED LIVING.
            </p>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-[1.08] tracking-tight text-white mb-6">
              A Place That Feels Like Yours.
            </h1>

            {/* Supporting line */}
            <p className="text-base sm:text-lg md:text-xl font-sans text-[#E9E2D8]/90 font-light leading-relaxed max-w-xl mb-10">
              Discover spaces that reflect your ambitions, your lifestyle, and the way you want to live.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => onNavigate('/properties')}
                className="px-8 py-4 bg-[#F7F5F0] text-[#242522] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B79A69] hover:text-white transition-all duration-300 rounded-xs shadow-lg text-center"
              >
                Explore Properties
              </button>

              <button
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center justify-center space-x-2 text-xs uppercase tracking-[0.2em] text-white hover:text-[#B79A69] transition-colors py-3 group"
              >
                <span>Discover Our Approach</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

          </div>

          {/* Understated Location & Scroll Indicator */}
          <div className="mt-16 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-white/70 font-light">
            <span className="tracking-widest uppercase text-[10px]">
              Bel Air Foothills · Residence 01
            </span>

            <button
              onClick={scrollToDiscovery}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to Discover</span>
              <ArrowDown size={14} className="animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: REFINED PROPERTY DISCOVERY */}
      <section id="discovery-section" className="py-24 md:py-32 bg-[#F7F5F0]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#A69B8A] mb-3 font-medium">
                A CURATED COLLECTION
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-[#242522] font-normal leading-tight">
                Find the Place You Keep Imagining.
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-sm md:text-base text-[#5C5C57] max-w-md font-light leading-relaxed">
              From architectural residences to welcoming family homes, discover properties selected for the way you want to live.
            </p>
          </div>

          {/* Editorial Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Primary Large Featured Property (Col 1-7) */}
            <div className="lg:col-span-7">
              <div className="group relative bg-white border border-[#242522]/10 overflow-hidden shadow-xs hover:border-[#242522]/30 transition-all">
                <div 
                  className="aspect-[16/10] overflow-hidden bg-[#E9E2D8] cursor-pointer"
                  onClick={() => onSelectProperty(featuredDiscovery[0].slug)}
                >
                  <img
                    src={featuredDiscovery[0].heroImage}
                    alt={featuredDiscovery[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#242522]/90 text-[#F7F5F0] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-xs">
                      Flagship Residence
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#A69B8A] mb-2">
                    <span>{featuredDiscovery[0].location}</span>
                    <span className="font-serif text-lg text-[#242522] normal-case">{featuredDiscovery[0].priceDisplay}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectProperty(featuredDiscovery[0].slug)}
                    className="text-2xl md:text-3xl font-serif text-[#242522] hover:text-[#B79A69] transition-colors cursor-pointer"
                  >
                    {featuredDiscovery[0].title}
                  </h3>

                  <p className="mt-3 text-sm text-[#5C5C57] font-light leading-relaxed max-w-xl">
                    {featuredDiscovery[0].overview}
                  </p>

                  <div className="mt-6 pt-6 border-t border-[#242522]/10 flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-[#242522] font-light">
                      <span>{featuredDiscovery[0].bedrooms} Bedrooms</span>
                      <span className="text-[#A69B8A]">•</span>
                      <span>{featuredDiscovery[0].bathrooms} Bathrooms</span>
                      <span className="text-[#A69B8A]">•</span>
                      <span>{featuredDiscovery[0].areaSqFt.toLocaleString()} sq ft</span>
                    </div>

                    <button
                      onClick={() => onSelectProperty(featuredDiscovery[0].slug)}
                      className="text-xs uppercase tracking-[0.2em] text-[#242522] group-hover:text-[#B79A69] flex items-center space-x-1"
                    >
                      <span>View Residence</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Stacked Secondary Featured Properties (Col 8-12) */}
            <div className="lg:col-span-5 flex flex-col space-y-8">
              {featuredDiscovery.slice(1, 3).map((prop) => (
                <div 
                  key={prop.id}
                  className="group bg-white border border-[#242522]/10 overflow-hidden hover:border-[#242522]/30 transition-all"
                >
                  <div 
                    className="aspect-[16/9] overflow-hidden bg-[#E9E2D8] cursor-pointer"
                    onClick={() => onSelectProperty(prop.slug)}
                  >
                    <img
                      src={prop.heroImage}
                      alt={prop.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#A69B8A] mb-1">
                      <span>{prop.location}</span>
                      <span className="font-serif text-base text-[#242522] normal-case">{prop.priceDisplay}</span>
                    </div>

                    <h4 
                      onClick={() => onSelectProperty(prop.slug)}
                      className="text-xl font-serif text-[#242522] hover:text-[#B79A69] transition-colors cursor-pointer"
                    >
                      {prop.title}
                    </h4>

                    <div className="mt-4 pt-4 border-t border-[#242522]/10 flex items-center justify-between text-xs text-[#5C5C57]">
                      <span>{prop.bedrooms} Bed · {prop.bathrooms} Bath · {prop.areaSqM} m²</span>
                      <button
                        onClick={() => onSelectProperty(prop.slug)}
                        className="text-[11px] uppercase tracking-[0.16em] text-[#242522] hover:text-[#B79A69] flex items-center space-x-1"
                      >
                        <span>View</span>
                        <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Section Footer CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={() => onNavigate('/properties')}
              className="inline-flex items-center space-x-3 px-8 py-3.5 bg-transparent border border-[#242522] text-[#242522] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#242522] hover:text-[#F7F5F0] transition-colors rounded-xs"
            >
              <span>View All Properties</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 3: EMOTIONAL BRAND STATEMENT */}
      <section className="py-28 md:py-40 bg-[#242522] text-[#F7F5F0] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#B79A69] block mb-4">
                THE SENSE OF BELONGING
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-[1.14] tracking-tight">
                More Than an Address.<br />
                <span className="italic text-[#E9E2D8]">A Way of Life.</span>
              </h2>

              <div className="mt-8 space-y-5 text-sm md:text-base text-[#D8D2C6] font-light leading-relaxed max-w-xl">
                <p>
                  The morning light in your favourite room. A garden that slows the day down. 
                  A place where the ordinary becomes meaningful.
                </p>
                <p className="text-[#A69B8A]">
                  We believe the right property is not simply somewhere you live. 
                  It is somewhere your life unfolds.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                  alt="Considered Architecture & Light"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-xs text-white/90 font-light italic">
                  “Architecture is a backdrop for life, measured not in square feet but in moments of stillness.”
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: EXPLORE BY LIFESTYLE */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#A69B8A] mb-3 font-medium">
              FIND YOUR KIND OF PLACE
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#242522] font-normal">
              Different Spaces. Different Possibilities.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LIFESTYLES.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate(`/properties?lifestyle=${item.id}`)}
                className="group relative cursor-pointer flex flex-col bg-[#F7F5F0] overflow-hidden border border-[#242522]/10 hover:border-[#242522]/40 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#E9E2D8]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-serif text-[#242522] group-hover:text-[#B79A69] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#5C5C57] font-light leading-relaxed">
                      {item.tagline}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#242522]/10 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#242522]">
                    <span>Explore Collection</span>
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: FEATURED PROPERTY SPOTLIGHT WITH 3D SPATIAL ARCHITECTURE EXPERIENCE */}
      <section className="py-24 md:py-32 bg-[#F7F5F0] border-t border-b border-[#242522]/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#B79A69] font-medium block mb-2">
                PROPERTY SPOTLIGHT & SPATIAL TOUR
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#242522] font-normal leading-tight">
                Designed to Be Lived In.<br />Made to Be Remembered.
              </h2>
            </div>

            {/* Toggle between 3D Spatial Walkthrough and High-Res Photography */}
            <div className="mt-6 md:mt-0 flex items-center space-x-2 bg-white p-1 rounded-xs border border-[#242522]/15 shadow-xs">
              <button
                onClick={() => setSpotlightViewMode('3d')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-xs transition-colors ${
                  spotlightViewMode === '3d'
                    ? 'bg-[#242522] text-[#F7F5F0] font-medium'
                    : 'text-[#5C5C57] hover:text-[#242522]'
                }`}
              >
                <Box size={14} className="text-[#B79A69]" />
                <span>3D Spatial Walkthrough</span>
              </button>

              <button
                onClick={() => setSpotlightViewMode('photo')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-xs transition-colors ${
                  spotlightViewMode === 'photo'
                    ? 'bg-[#242522] text-[#F7F5F0] font-medium'
                    : 'text-[#5C5C57] hover:text-[#242522]'
                }`}
              >
                <Image size={14} />
                <span>Architectural Stills</span>
              </button>
            </div>
          </div>

          {/* Interactive Viewer / Gallery Stage */}
          <div className="bg-white border border-[#242522]/15 overflow-hidden shadow-sm">
            {spotlightViewMode === '3d' ? (
              <div className="w-full h-[580px] md:h-[650px] relative">
                <ClientVillaViewer 
                  initialLighting="golden-hour" 
                  initialCamera="pool" 
                  className="h-full"
                />
              </div>
            ) : (
              <div className="w-full h-[580px] md:h-[650px] relative overflow-hidden bg-black">
                <img
                  src={spotlightProp.heroImage}
                  alt={spotlightProp.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8 text-white">
                  <p className="text-sm font-light italic max-w-lg">
                    “The continuous 25-meter black granite reflection pool mirroring the shifting sky from dawn to dusk.”
                  </p>
                </div>
              </div>
            )}

            {/* Editorial Information Bar Overlapping Bottom */}
            <div className="p-8 md:p-10 bg-[#FAF8F5] border-t border-[#242522]/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.2em] text-[#A69B8A] mb-1">
                  <span>{spotlightProp.location}</span>
                  <span>•</span>
                  <span>{spotlightProp.architect}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-serif text-[#242522]">
                  {spotlightProp.title}
                </h3>

                <p className="mt-2 text-xs md:text-sm text-[#5C5C57] font-light leading-relaxed max-w-2xl">
                  {spotlightProp.overview}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#242522] font-light">
                  <span className="bg-white px-2.5 py-1 border border-[#242522]/10 rounded-xs">
                    {spotlightProp.bedrooms} Bedrooms
                  </span>
                  <span className="bg-white px-2.5 py-1 border border-[#242522]/10 rounded-xs">
                    {spotlightProp.bathrooms} Bathrooms
                  </span>
                  <span className="bg-white px-2.5 py-1 border border-[#242522]/10 rounded-xs">
                    {spotlightProp.areaSqFt.toLocaleString()} sq ft ({spotlightProp.areaSqM} m²)
                  </span>
                  <span className="bg-white px-2.5 py-1 border border-[#242522]/10 rounded-xs">
                    {spotlightProp.priceDisplay}
                  </span>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
                <button
                  onClick={() => onSelectProperty(spotlightProp.slug)}
                  className="w-full py-3.5 bg-[#242522] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B79A69] hover:text-[#242522] transition-colors rounded-xs flex items-center justify-center space-x-2"
                >
                  <span>Explore This Property</span>
                  <ArrowUpRight size={14} />
                </button>

                <button
                  onClick={() => onOpenViewing(spotlightProp)}
                  className="w-full py-3.5 bg-transparent border border-[#242522] text-[#242522] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#242522] hover:text-[#F7F5F0] transition-colors rounded-xs text-center"
                >
                  Schedule Private Viewing
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: THE AGENCY DIFFERENCE */}
      <section className="py-24 md:py-32 bg-[#E9E2D8]/40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden border border-[#242522]/10 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                  alt="Private Architectural Consultation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Editorial Content */}
            <div className="lg:col-span-6 lg:pl-6">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#A69B8A] font-medium block mb-3">
                OUR PHILOSOPHY
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#242522] font-normal leading-tight mb-6">
                Finding the Right Property Should Feel Different.
              </h2>
              
              <p className="text-sm md:text-base text-[#5C5C57] font-light leading-relaxed mb-8">
                A property decision is about more than square footage. It is about priorities, 
                possibilities, and finding a place that feels right for you. 
                We take the time to understand what matters, present relevant opportunities, 
                and guide you through the property journey with clarity.
              </p>

              {/* Three Principles */}
              <div className="space-y-6 pt-4 border-t border-[#242522]/10 mb-10">
                <div>
                  <h4 className="text-sm font-serif font-semibold text-[#242522] tracking-wide">
                    Thoughtful Selection
                  </h4>
                  <p className="text-xs text-[#6B6B67] font-light mt-1">
                    Properties chosen around your specific lifestyle priorities and architectural values.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-serif font-semibold text-[#242522] tracking-wide">
                    Personal Guidance
                  </h4>
                  <p className="text-xs text-[#6B6B67] font-light mt-1">
                    A considered, discreet advisory relationship from discovery through final execution.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-serif font-semibold text-[#242522] tracking-wide">
                    Clear Communication
                  </h4>
                  <p className="text-xs text-[#6B6B67] font-light mt-1">
                    Transparent, unvarnished insight into provenance, physical structure, and investment merits.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#242522] hover:text-[#B79A69] transition-colors"
              >
                <span>Get to Know Us</span>
                <span>→</span>
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: A SIMPLE, PERSONALISED JOURNEY */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          
          <div className="text-center max-w-xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#A69B8A] font-medium block mb-2">
              THE METHOD
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#242522] font-normal">
              From First Look to New Beginnings.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: '01',
                step: 'Discover',
                desc: 'Tell us what you are looking for and what matters most in your daily life.'
              },
              {
                num: '02',
                step: 'Explore',
                desc: 'Review suitable architectural residences and arrange confidential private viewings.'
              },
              {
                num: '03',
                step: 'Decide',
                desc: 'Receive transparent dossier analysis to help you make a fully informed decision.'
              },
              {
                num: '04',
                step: 'Move Forward',
                desc: 'Receive meticulous fiduciary guidance through the closing steps of your acquisition.'
              }
            ].map((item, idx) => (
              <div 
                key={item.num}
                className="relative flex flex-col p-6 bg-[#F7F5F0] border border-[#242522]/10"
              >
                <span className="text-3xl font-serif text-[#B79A69] mb-4">
                  {item.num}
                </span>
                <h4 className="text-lg font-serif text-[#242522] mb-2 font-normal">
                  {item.step}
                </h4>
                <p className="text-xs text-[#5C5C57] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => onNavigate('/contact')}
              className="text-xs uppercase tracking-[0.2em] text-[#242522] hover:text-[#B79A69] transition-colors inline-flex items-center space-x-1"
            >
              <span>Begin Your Consultation Today</span>
              <span>→</span>
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 8: A FEW WORDS FROM OUR CLIENTS */}
      <section className="py-24 md:py-32 bg-[#F7F5F0] border-t border-[#242522]/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#A69B8A] font-medium block mb-2">
              PERSPECTIVES
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#242522] font-normal">
              Trust Is Built One Experience at a Time.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-[#242522]/10 flex flex-col justify-between">
              <p className="text-sm font-serif italic text-[#242522] leading-relaxed">
                “Atelier Estates understood that we were looking for quiet light rather than ostentatious square footage. 
                They showed us three homes, and each was an architectural revelation.”
              </p>
              <div className="mt-6 pt-4 border-t border-[#242522]/10">
                <p className="text-xs font-semibold text-[#242522]">Charles & Miranda H.</p>
                <p className="text-[11px] text-[#A69B8A] font-light">Acquisition in Bel Air Foothills</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-[#242522]/10 flex flex-col justify-between">
              <p className="text-sm font-serif italic text-[#242522] leading-relaxed">
                “Discretion was paramount for our family. The team arranged private viewings without any public exposure, 
                and provided structural engineering appraisals that proved indispensable.”
              </p>
              <div className="mt-6 pt-4 border-t border-[#242522]/10">
                <p className="text-xs font-semibold text-[#242522]">Dr. Soren K.</p>
                <p className="text-[11px] text-[#A69B8A] font-light">Mayfair Townhouse Purchase</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-[#242522]/10 flex flex-col justify-between">
              <p className="text-sm font-serif italic text-[#242522] leading-relaxed">
                “The interactive 3D spatial models allowed us to study the exact solar angles in Kyoto before flying in. 
                The actual residence exceeded every expectation.”
              </p>
              <div className="mt-6 pt-4 border-t border-[#242522]/10">
                <p className="text-xs font-semibold text-[#242522]">Yuki & Kenzo T.</p>
                <p className="text-[11px] text-[#A69B8A] font-light">Higashiyama Residence</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 9: CLOSING CINEMATIC CTA */}
      <section className="relative py-28 md:py-36 bg-[#242522] overflow-hidden text-center text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80"
            alt="Dusk Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#242522]/85" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#B79A69] font-medium block mb-4">
            BEGIN THE JOURNEY
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight mb-6 text-white">
            Your Next Chapter Starts Somewhere.
          </h2>

          <p className="text-sm md:text-base text-[#D8D2C6] font-light leading-relaxed mb-10 max-w-lg mx-auto">
            Tell us what home means to you. Let's find a place worth coming back to.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => onNavigate('/contact')}
              className="w-full sm:w-auto px-8 py-4 bg-[#B79A69] text-[#242522] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors rounded-xs shadow-xl"
            >
              Let's Find Your Place
            </button>

            <button
              onClick={() => onNavigate('/properties')}
              className="text-xs uppercase tracking-[0.2em] text-[#F7F5F0] hover:text-[#B79A69] transition-colors py-3 inline-flex items-center space-x-1"
            >
              <span>Browse Properties</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

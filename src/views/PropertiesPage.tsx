"use client";

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, Box, ArrowUpRight, Check } from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/common/PropertyCard';
import { Property, PropertyStatus, LifestyleCategory } from '../types/property';

interface PropertiesPageProps {
  onSelectProperty: (slug: string) => void;
  onQuickView3D: (property: Property) => void;
  initialLifestyle?: string | null;
  initialStatus?: PropertyStatus | 'all';
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  onSelectProperty,
  onQuickView3D,
  initialLifestyle = null,
  initialStatus = 'all'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | 'all'>(initialStatus);
  const [lifestyleFilter, setLifestyleFilter] = useState<string>(initialLifestyle || 'all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [minBedrooms, setMinBedrooms] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'area'>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filtered and sorted properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((item) => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        const matchArch = item.architect?.toLowerCase().includes(q);
        if (!matchTitle && !matchLoc && !matchArch) return false;
      }

      // Status filter
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;

      // Lifestyle filter
      if (lifestyleFilter !== 'all' && item.lifestyle !== lifestyleFilter) return false;

      // Type filter
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;

      // Bedrooms
      if (minBedrooms > 0 && item.bedrooms < minBedrooms) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'area') return b.areaSqFt - a.areaSqFt;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, statusFilter, lifestyleFilter, typeFilter, minBedrooms, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setLifestyleFilter('all');
    setTypeFilter('all');
    setMinBedrooms(0);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    searchQuery !== '' || 
    statusFilter !== 'all' || 
    lifestyleFilter !== 'all' || 
    typeFilter !== 'all' || 
    minBedrooms > 0;

  return (
    <div className="pt-28 md:pt-36 pb-24 bg-[#F7F5F0] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Page Header */}
        <div className="mb-12">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#A69B8A] font-medium block mb-3">
            CURATED RESIDENTIAL PORTFOLIO
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-[#242522] font-normal leading-tight">
            Find a Property That Fits Your Life.
          </h1>
          <p className="mt-3 text-sm md:text-base text-[#5C5C57] font-light max-w-xl">
            Explore thoughtfully selected properties and discover what feels right for you.
          </p>
        </div>

        {/* Refined Filter Bar */}
        <div className="bg-white border border-[#242522]/10 p-5 md:p-6 mb-10 shadow-xs">
          
          {/* Top Row: Search & Status Selector */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-5 border-b border-[#242522]/10">
            
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A69B8A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, architect, or residence name..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-[#F7F5F0] border border-[#242522]/10 rounded-xs focus:outline-hidden focus:border-[#B79A69] text-[#242522]"
              />
            </div>

            {/* Status Pills */}
            <div className="flex items-center space-x-1.5 self-start md:self-auto overflow-x-auto">
              {[
                { id: 'all', label: 'All Portfolio' },
                { id: 'for-sale', label: 'For Sale' },
                { id: 'for-rent', label: 'Private Lease' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStatusFilter(s.id as any)}
                  className={`px-3 py-1.5 text-[11px] uppercase tracking-wider rounded-xs transition-colors border ${
                    statusFilter === s.id
                      ? 'bg-[#242522] text-[#F7F5F0] border-[#242522]'
                      : 'bg-white text-[#242522]/70 border-[#242522]/15 hover:border-[#242522]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

          </div>

          {/* Bottom Row: Detailed Dropdown Filters */}
          <div className="pt-4 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center">
              
              {/* Lifestyle Filter */}
              <select
                value={lifestyleFilter}
                onChange={(e) => setLifestyleFilter(e.target.value)}
                className="bg-[#F7F5F0] border border-[#242522]/10 px-3 py-1.5 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
              >
                <option value="all">Lifestyle: All Spaces</option>
                <option value="contemporary">Contemporary Living</option>
                <option value="family">Family Homes</option>
                <option value="retreat">Private Retreats</option>
              </select>

              {/* Property Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-[#F7F5F0] border border-[#242522]/10 px-3 py-1.5 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
              >
                <option value="all">Typology: All Types</option>
                <option value="Modernist Villa">Modernist Villa</option>
                <option value="City Townhouse">City Townhouse</option>
                <option value="Architectural Residence">Architectural Residence</option>
                <option value="Sky Penthouse">Sky Penthouse</option>
                <option value="Coastal Sanctuary">Coastal Sanctuary</option>
                <option value="Country Masseria">Country Masseria</option>
              </select>

              {/* Bedrooms Filter */}
              <select
                value={minBedrooms}
                onChange={(e) => setMinBedrooms(parseInt(e.target.value))}
                className="bg-[#F7F5F0] border border-[#242522]/10 px-3 py-1.5 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
              >
                <option value={0}>Bedrooms: Any</option>
                <option value={3}>3+ Bedrooms</option>
                <option value={4}>4+ Bedrooms</option>
                <option value={5}>5+ Bedrooms</option>
              </select>

              {/* Reset Control */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center space-x-1 text-xs text-[#A69B8A] hover:text-[#242522] transition-colors py-1 px-2"
                >
                  <RotateCcw size={12} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {/* Sort Control */}
            <div className="flex items-center space-x-2">
              <span className="text-[11px] uppercase tracking-wider text-[#A69B8A]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-[#242522] font-medium border-b border-[#242522]/30 py-1 focus:outline-hidden cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-desc">Price: Highest First</option>
                <option value="price-asc">Price: Lowest First</option>
                <option value="area">Area: Largest Square Footage</option>
              </select>
            </div>

          </div>

        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between mb-8 text-xs text-[#6B6B67]">
          <span>
            Showing <strong className="text-[#242522]">{filteredProperties.length}</strong> of {PROPERTIES.length} verified residences
          </span>
          {hasActiveFilters && (
            <span className="text-[#B79A69] italic">Filtered by criteria</span>
          )}
        </div>

        {/* Property Grid: 3 columns on large screens */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={onSelectProperty}
                onQuickView3D={onQuickView3D}
              />
            ))}
          </div>
        ) : (
          /* Empty Results State */
          <div className="bg-white border border-[#242522]/10 p-16 text-center max-w-lg mx-auto">
            <span className="text-3xl font-serif text-[#A69B8A] block mb-2">No matching residences</span>
            <p className="text-xs text-[#5C5C57] leading-relaxed mb-6">
              We could not find properties matching your current filter selections. 
              Our private desk holds confidential off-market mandates not displayed publicly.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#242522] text-[#F7F5F0] text-xs uppercase tracking-[0.18em] rounded-xs hover:bg-[#B79A69] hover:text-[#242522] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

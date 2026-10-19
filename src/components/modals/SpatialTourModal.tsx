"use client";

import React from 'react';
import { X, Box, ArrowUpRight } from 'lucide-react';
import { Property } from '../../types/property';
import { ClientVillaViewer } from '../3d/ClientVillaViewer';

interface SpatialTourModalProps {
  property: Property | null;
  onClose: () => void;
  onOpenViewing: (property: Property) => void;
}

export const SpatialTourModal: React.FC<SpatialTourModalProps> = ({
  property,
  onClose,
  onOpenViewing
}) => {
  if (!property) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#161715]/90 flex flex-col justify-between p-2 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full h-full flex flex-col bg-[#F7F5F0] border border-white/20 shadow-2xl rounded-xs overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Minimal Navigation Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#242522] text-[#F7F5F0] z-20">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#B79A69]" />
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#B79A69] block">
                Live 3D Spatial Walkthrough
              </span>
              <h3 className="text-sm font-serif text-white tracking-wide">
                {property.title} — {property.location}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                onClose();
                onOpenViewing(property);
              }}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-[#B79A69] text-[#242522] text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-white transition-colors"
            >
              <span>Schedule Viewing</span>
              <ArrowUpRight size={13} />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-hidden"
              aria-label="Close 3D Tour"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 3D Canvas Body */}
        <div className="relative flex-grow w-full h-full overflow-hidden bg-[#F7F5F0]">
          <ClientVillaViewer 
            initialLighting="golden-hour" 
            initialCamera="pool" 
            className="w-full h-full"
          />
        </div>

      </div>
    </div>
  );
};

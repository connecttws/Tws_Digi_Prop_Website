"use client";

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  title?: string;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
  title
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#161715]/95 flex flex-col justify-between p-4 md:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Header */}
      <div 
        className="flex items-center justify-between text-[#F7F5F0] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#B79A69]">
            Architectural Gallery
          </span>
          <h4 className="text-sm md:text-base font-serif text-white tracking-wide">
            {title || 'Property Perspective'}
          </h4>
        </div>

        <div className="flex items-center space-x-6">
          <span className="text-xs font-mono text-[#A69B8A]">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-hidden"
            aria-label="Close Lightbox"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div 
        className="relative flex-grow flex items-center justify-center my-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Gallery view ${currentIndex + 1}`}
          className="max-h-[82vh] max-w-[92vw] object-contain select-none shadow-2xl transition-all duration-300"
        />

        {/* Previous Button */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
          className="absolute left-2 md:left-6 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors focus:outline-hidden"
          aria-label="Previous Image"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Button */}
        <button
          onClick={() => onNavigate((currentIndex + 1) % images.length)}
          className="absolute right-2 md:right-6 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors focus:outline-hidden"
          aria-label="Next Image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div 
        className="flex justify-center items-center space-x-2 overflow-x-auto py-2 z-10 max-w-xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={`w-14 h-10 shrink-0 overflow-hidden rounded-xs border transition-all ${
              currentIndex === i ? 'border-[#B79A69] opacity-100 scale-105' : 'border-transparent opacity-40 hover:opacity-80'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

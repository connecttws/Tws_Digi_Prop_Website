"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

interface FooterProps {
  onNavigate?: (route: string) => void;
  onOpenConsultation?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate: propOnNavigate,
  onOpenConsultation: propOnOpenConsultation,
  onOpenPrivacy: propOnOpenPrivacy,
  onOpenTerms: propOnOpenTerms
}) => {
  const router = useRouter();
  let modalContext: ReturnType<typeof useModal> | null = null;
  try {
    modalContext = useModal();
  } catch {
    // Context fallback
  }

  const handleNav = (route: string) => {
    if (propOnNavigate) {
      propOnNavigate(route);
    } else {
      router.push(route);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onOpenConsultation = propOnOpenConsultation ?? (() => modalContext?.openViewing());
  const onOpenPrivacy = propOnOpenPrivacy ?? (() => modalContext?.openLegal('privacy'));
  const onOpenTerms = propOnOpenTerms ?? (() => modalContext?.openLegal('terms'));

  return (
    <footer className="bg-[#242522] text-[#F7F5F0] pt-20 pb-12 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Philosophy */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-2xl font-serif tracking-[0.2em] uppercase font-light text-white block">
                ATELIER ESTATES
              </span>
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#B79A69] block mt-1">
                REAL ESTATE & ARCHITECTURAL ADVISORY
              </span>
              
              <p className="mt-6 text-[#A69B8A] text-sm leading-relaxed max-w-md font-light">
                We believe the right property is not simply somewhere you live. 
                It is somewhere your life unfolds. Curating exceptional contemporary residences, 
                architectural pavilions, and private sanctuaries across the world’s most considered landscapes.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#B79A69] hover:text-white transition-colors"
              >
                <span>Request Private Consultation</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-2">
            <h5 className="text-[11px] uppercase tracking-[0.22em] text-[#A69B8A] font-medium mb-5">
              Explore
            </h5>
            <ul className="space-y-3">
              {[
                { label: 'All Properties', route: '/properties' },
                { label: 'Properties for Sale', route: '/buy' },
                { label: 'Private Residences for Lease', route: '/rent' },
                { label: 'Advisory Services', route: '/services' },
              ].map((item) => (
                <li key={item.route}>
                  <button
                    onClick={() => handleNav(item.route)}
                    className="text-sm text-[#D8D2C6] hover:text-[#B79A69] transition-colors font-light"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h5 className="text-[11px] uppercase tracking-[0.22em] text-[#A69B8A] font-medium mb-5">
              Company
            </h5>
            <ul className="space-y-3">
              {[
                { label: 'About the Agency', route: '/about' },
                { label: 'Architectural Journal', route: '/journal' },
                { label: 'Direct Enquiry', route: '/contact' },
              ].map((item) => (
                <li key={item.route}>
                  <button
                    onClick={() => handleNav(item.route)}
                    className="text-sm text-[#D8D2C6] hover:text-[#B79A69] transition-colors font-light"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations & Private Desk */}
          <div className="md:col-span-3">
            <h5 className="text-[11px] uppercase tracking-[0.22em] text-[#A69B8A] font-medium mb-5">
              Private Desk
            </h5>
            <div className="space-y-4 text-xs text-[#D8D2C6] font-light leading-relaxed">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#A69B8A]">Curator Direct</span>
                <p className="text-sm text-[#F7F5F0] font-normal mt-0.5">advisory@atelierestates.com</p>
                <p className="text-[#A69B8A]">+1 (310) 844-9200</p>
              </div>

              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#A69B8A]">Advisory Salons</span>
                <p className="text-[#D8D2C6]">Beverly Hills · Mayfair London · Kyoto</p>
              </div>

              <div className="pt-2 text-[11px] text-[#A69B8A]">
                <p>Private viewings arranged strictly by advance appointment.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#A69B8A] font-light space-y-4 md:space-y-0">
          <p>© 2026 ATELIER ESTATES LLC. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#F7F5F0] transition-colors focus:outline-hidden"
            >
              Privacy Policy
            </button>
            <span className="text-white/20">/</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-[#F7F5F0] transition-colors focus:outline-hidden"
            >
              Terms & Conditions
            </button>
            <span className="text-white/20">/</span>
            <span className="text-[#B79A69]/80 text-[11px]">Quiet Luxury Architecture</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

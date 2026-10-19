"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

interface HeaderProps {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentRoute: propCurrentRoute, 
  onNavigate: propOnNavigate, 
  onOpenConsultation: propOnOpenConsultation 
}) => {
  const pathname = usePathname();
  const router = useRouter();
  let modalContext: ReturnType<typeof useModal> | null = null;
  try {
    modalContext = useModal();
  } catch {
    // Context fallback
  }

  const currentRoute = propCurrentRoute ?? pathname ?? '/';
  const onNavigate = propOnNavigate ?? ((route: string) => {
    router.push(route);
  });
  const onOpenConsultation = propOnOpenConsultation ?? (() => {
    modalContext?.openViewing();
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Properties', route: '/properties' },
    { label: 'Buy', route: '/buy' },
    { label: 'Rent', route: '/rent' },
    { label: 'About', route: '/about' },
    { label: 'Services', route: '/services' },
    { label: 'Journal', route: '/journal' },
    { label: 'Contact', route: '/contact' },
  ];

  const handleLinkClick = (route: string) => {
    onNavigate(route);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine if header text should be white initially (only on home hero when not scrolled)
  const isHomeHero = currentRoute === '/' && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F7F5F0]/95 border-b border-[#242522]/10 py-4 shadow-xs backdrop-blur-xs'
            : isHomeHero
            ? 'bg-gradient-to-b from-black/60 via-black/25 to-transparent py-6 text-white'
            : 'bg-[#F7F5F0] border-b border-[#242522]/10 py-5 text-[#242522]'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {/* Left Brand Wordmark */}
          <button
            onClick={() => handleLinkClick('/')}
            className="text-left group focus:outline-hidden"
          >
            <div className="flex flex-col">
              <span
                className={`text-xl md:text-2xl font-serif tracking-[0.18em] uppercase transition-colors font-medium ${
                  isScrolled || !isHomeHero ? 'text-[#242522]' : 'text-white'
                }`}
              >
                ATELIER ESTATES
              </span>
              <span
                className={`text-[9px] tracking-[0.28em] uppercase font-sans -mt-0.5 transition-colors ${
                  isScrolled || !isHomeHero ? 'text-[#A69B8A]' : 'text-white/70'
                }`}
              >
                REAL ESTATE & ARCHITECTURE
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route || (link.route !== '/' && currentRoute.startsWith(link.route));
              return (
                <button
                  key={link.route}
                  onClick={() => handleLinkClick(link.route)}
                  className={`text-[12px] uppercase tracking-[0.18em] transition-all relative py-1 focus:outline-hidden ${
                    isScrolled || !isHomeHero
                      ? isActive
                        ? 'text-[#242522] font-semibold'
                        : 'text-[#242522]/70 hover:text-[#242522]'
                      : isActive
                      ? 'text-white font-semibold'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-[1px] ${
                        isScrolled || !isHomeHero ? 'bg-[#B79A69]' : 'bg-white'
                      }`} 
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Far Right Action CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onOpenConsultation}
              className={`text-[11px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-xs transition-all duration-300 border flex items-center space-x-2 focus:outline-hidden ${
                isScrolled || !isHomeHero
                  ? 'border-[#242522] text-[#242522] hover:bg-[#242522] hover:text-[#F7F5F0]'
                  : 'border-white text-white hover:bg-white hover:text-[#242522]'
              }`}
            >
              <span>Find Your Place</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 focus:outline-hidden ${
                isScrolled || !isHomeHero ? 'text-[#242522]' : 'text-white'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F7F5F0] flex flex-col justify-between pt-28 pb-12 px-8 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col space-y-6">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#A69B8A] mb-2 font-medium">Navigation</p>
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => handleLinkClick(link.route)}
                className={`text-2xl font-serif text-left py-1 tracking-wide ${
                  currentRoute === link.route ? 'text-[#B79A69] italic' : 'text-[#242522]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-[#242522]/10 flex flex-col space-y-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3.5 bg-[#242522] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center space-x-2 rounded-xs"
            >
              <span>Find Your Place</span>
              <ArrowUpRight size={14} />
            </button>
            <p className="text-[11px] text-[#A69B8A] text-center tracking-wider">
              Los Angeles · London · Kyoto · Cap d’Antibes
            </p>
          </div>
        </div>
      )}
    </>
  );
};

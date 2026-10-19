"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Property } from '@/types/property';
import { ViewingModal } from '@/components/modals/ViewingModal';
import { SpatialTourModal } from '@/components/modals/SpatialTourModal';
import { LegalModal } from '@/components/modals/LegalModal';

interface ModalContextType {
  openViewing: (property?: Property | null) => void;
  openQuick3D: (property: Property) => void;
  openLegal: (type: 'privacy' | 'terms') => void;
  closeModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isViewingOpen, setIsViewingOpen] = useState(false);
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null);
  const [quick3DProperty, setQuick3DProperty] = useState<Property | null>(null);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);

  const openViewing = (property?: Property | null) => {
    setViewingProperty(property || null);
    setIsViewingOpen(true);
  };

  const openQuick3D = (property: Property) => {
    setQuick3DProperty(property);
  };

  const openLegal = (type: 'privacy' | 'terms') => {
    setLegalType(type);
  };

  const closeModals = () => {
    setIsViewingOpen(false);
    setViewingProperty(null);
    setQuick3DProperty(null);
    setLegalType(null);
  };

  return (
    <ModalContext.Provider value={{ openViewing, openQuick3D, openLegal, closeModals }}>
      {children}

      <ViewingModal
        isOpen={isViewingOpen}
        initialProperty={viewingProperty}
        onClose={() => {
          setIsViewingOpen(false);
          setViewingProperty(null);
        }}
      />

      <SpatialTourModal
        property={quick3DProperty}
        onClose={() => setQuick3DProperty(null)}
        onOpenViewing={(prop) => openViewing(prop)}
      />

      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

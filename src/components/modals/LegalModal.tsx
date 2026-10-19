"use client";

import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#161715]/80 flex items-center justify-center p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#F7F5F0] border border-[#242522]/15 shadow-2xl p-6 md:p-10 my-8 text-[#242522] rounded-xs max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#242522]/60 hover:text-[#242522] transition-colors focus:outline-hidden"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B79A69] font-medium block">
          Legal Framework
        </span>

        <h2 className="text-2xl font-serif text-[#242522] mt-1 mb-6">
          {isPrivacy ? 'Privacy & Confidentiality Policy' : 'Terms of Representation & Engagement'}
        </h2>

        <div className="space-y-4 text-xs text-[#52524E] leading-relaxed font-light">
          {isPrivacy ? (
            <>
              <p>
                <strong>1. Commitment to Client Confidentiality:</strong> ATELIER ESTATES operates under stringent fiduciary discretion. 
                All high-net-worth individual records, identity documents, private banking attestations, and viewing schedules remain encrypted and are never sold or shared with commercial marketing syndicates.
              </p>
              <p>
                <strong>2. Data Gathering & Private Consultation:</strong> Information transmitted via this platform (such as verified contact numbers, 
                budgetary guidelines, and architectural briefs) is utilized exclusively to provide tailored property representation and schedule authorized private viewings.
              </p>
              <p>
                <strong>3. Non-Disclosure Protocols:</strong> For select off-market estates and confidential architectural residences, viewers may be required 
                to countersign a bilateral Non-Disclosure Agreement (NDA) prior to the release of structural plans or geographic coordinates.
              </p>
              <p>
                <strong>4. Inquiries & Data Rights:</strong> To amend, inspect, or request full purging of your confidential file from our records, 
                contact the Data Governance Officer directly at <code>compliance@atelierestates.com</code>.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Scope of Representation:</strong> ATELIER ESTATES provides boutique advisory, architectural curation, and transaction brokerage for prime residential properties. 
                All descriptive details, square footage, architectural attributions, and boundary depictions are presented with rigorous care but remain subject to independent survey and contract verification.
              </p>
              <p>
                <strong>2. Verified Inventory & Availability:</strong> All residential estates exhibited on this digital portal are subject to prior sale, lease, 
                or withdrawal by owner instruction. No marketing representations shall constitute a binding unilateral offer to contract.
              </p>
              <p>
                <strong>3. Intellectual Property:</strong> All bespoke architectural imagery, 3D spatial models, interactive walkthroughs, and editorial narratives 
                remain the exclusive copyrighted property of ATELIER ESTATES LLC and affiliated architectural photographers.
              </p>
              <p>
                <strong>4. Anti-Money Laundering & KYC:</strong> Prior to the formal execution of residential conveyance or escrow deposit, 
                prospective purchasers are subject to standard international Know-Your-Customer (KYC) verification in accordance with applicable local real estate statutory regulations.
              </p>
            </>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-[#242522]/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#242522] text-[#F7F5F0] text-xs uppercase tracking-[0.16em] hover:bg-[#B79A69] hover:text-[#242522] transition-colors rounded-xs"
          >
            I Acknowledge
          </button>
        </div>

      </div>
    </div>
  );
};

"use client";

import React, { useState } from 'react';
import { X, CheckCircle, Calendar, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Property, ViewingRequest } from '../../types/property';
import { PROPERTIES } from '../../data/properties';

interface ViewingModalProps {
  isOpen: boolean;
  initialProperty?: Property | null;
  onClose: () => void;
}

export const ViewingModal: React.FC<ViewingModalProps> = ({
  isOpen,
  initialProperty,
  onClose
}) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    initialProperty?.id || PROPERTIES[0].id
  );
  const [inquiryType, setInquiryType] = useState<ViewingRequest['inquiryType']>('in-person');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('morning');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const currentProp = PROPERTIES.find((p) => p.id === selectedPropertyId) || initialProperty || PROPERTIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name and confidential email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setNotes('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#161715]/80 flex items-center justify-center p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#F7F5F0] border border-[#242522]/15 shadow-2xl p-6 md:p-10 my-8 text-[#242522] rounded-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#242522]/60 hover:text-[#242522] transition-colors focus:outline-hidden"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B79A69] font-medium block">
                Private Advisory Service
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#242522] font-normal mt-1">
                Arrange a Confidential Viewing
              </h2>
              <p className="text-xs text-[#6B6B67] mt-1.5 font-light leading-relaxed">
                Every property viewing is curated individually. Select your preference for an in-person private walkthrough, 
                an interactive 3D spatial consultation, or a sealed architectural dossier.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Property Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#242522] mb-1.5 font-medium">
                  Selected Residence
                </label>
                <select
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  className="w-full bg-white border border-[#242522]/15 px-3 py-2.5 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
                >
                  {PROPERTIES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} — {p.location} ({p.priceDisplay})
                    </option>
                  ))}
                </select>
              </div>

              {/* Consultation Format Tabs */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#242522] mb-1.5 font-medium">
                  Format of Engagement
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'in-person', label: 'In-Person Viewing' },
                    { id: 'private-virtual', label: '3D Spatial Session' },
                    { id: 'architectural-dossier', label: 'Sealed Dossier' },
                  ].map((tab) => (
                    <button
                      type="button"
                      key={tab.id}
                      onClick={() => setInquiryType(tab.id as any)}
                      className={`py-2 text-[11px] uppercase tracking-[0.12em] rounded-xs border transition-colors ${
                        inquiryType === tab.id
                          ? 'bg-[#242522] text-[#F7F5F0] border-[#242522] font-medium'
                          : 'bg-white text-[#242522]/80 border-[#242522]/15 hover:border-[#242522]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Two-Column Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#242522] mb-1 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Lord Alistair Vance"
                    className="w-full bg-white border border-[#242522]/15 px-3 py-2 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#242522] mb-1 font-medium">
                    Confidential Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alistair@vance-holdings.com"
                    className="w-full bg-white border border-[#242522]/15 px-3 py-2 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
                  />
                </div>
              </div>

              {/* Phone & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#242522] mb-1 font-medium">
                    Phone / Signal
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white border border-[#242522]/15 px-3 py-2 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#242522] mb-1 font-medium">
                    Preferred Time Window
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-white border border-[#242522]/15 px-3 py-2 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
                  >
                    <option value="morning">Morning (10:00 — 12:30)</option>
                    <option value="afternoon">Afternoon (14:00 — 16:30)</option>
                    <option value="twilight">Twilight / Golden Hour (17:30 — 19:30)</option>
                    <option value="flexible">Flexible / Contact Curator</option>
                  </select>
                </div>
              </div>

              {/* Special notes */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#242522] mb-1 font-medium">
                  Specific Requests or Privacy Guidelines
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mention any requirements, arrival protocols, or financial representation..."
                  className="w-full bg-white border border-[#242522]/15 px-3 py-2 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>
              )}

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-[10px] text-[#8C8C85]">
                  <ShieldCheck size={13} className="text-[#B79A69]" />
                  <span>Strict NDA & confidentiality standards apply</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#242522] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B79A69] hover:text-[#242522] transition-colors rounded-xs flex items-center space-x-2"
                >
                  <span>Submit Appointment</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#B79A69]/20 text-[#B79A69] mx-auto flex items-center justify-center">
              <CheckCircle size={28} />
            </div>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B79A69] font-medium block">
              Appointment Dossier Logged
            </span>

            <h3 className="text-2xl font-serif text-[#242522]">
              Thank You, {fullName}.
            </h3>

            <p className="text-xs text-[#5C5C57] max-w-md mx-auto leading-relaxed font-light">
              Your inquiry for <strong className="font-normal text-[#242522]">{currentProp.title}</strong> has been transmitted 
              to our private advisory partner. A dedicated advisor will reach out to <span className="font-mono">{email}</span> within 
              two business hours with the verified property dossier and scheduling confirmation.
            </p>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 border border-[#242522] text-[#242522] text-xs uppercase tracking-[0.18em] hover:bg-[#242522] hover:text-[#F7F5F0] transition-colors rounded-xs"
              >
                Return to Exploration
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

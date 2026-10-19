"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight, CheckCircle, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [interest, setInterest] = useState<'buying' | 'renting' | 'selling' | 'advisory'>('buying');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [locationPref, setLocationPref] = useState('Los Angeles Foothills');
  const [budgetRange, setBudgetRange] = useState('$10M — $25M');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please complete your name and confidential email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
  };

  return (
    <div className="pt-28 md:pt-36 pb-24 bg-[#F7F5F0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#A69B8A] font-medium block mb-3">
            PRIVATE INQUIRY & ADVISORY
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#242522] font-normal leading-tight mb-4">
            Tell Us What You're Looking For.
          </h1>
          <p className="text-sm md:text-base text-[#5C5C57] font-light leading-relaxed">
            A first conversation is all it takes to start exploring your options. 
            All inquiries are held in strict confidential custody.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#242522]/10 p-8 md:p-12 shadow-xs">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Interest Selector */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-[#242522] mb-2 font-medium">
                    I am interested in:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'buying', label: 'Buying' },
                      { id: 'renting', label: 'Renting' },
                      { id: 'selling', label: 'Selling' },
                      { id: 'advisory', label: 'Advisory' }
                    ].map((tab) => (
                      <button
                        type="button"
                        key={tab.id}
                        onClick={() => setInterest(tab.id as any)}
                        className={`py-2 text-[11px] uppercase tracking-wider rounded-xs border transition-colors ${
                          interest === tab.id
                            ? 'bg-[#242522] text-[#F7F5F0] border-[#242522] font-semibold'
                            : 'bg-white text-[#5C5C57] border-[#242522]/15 hover:border-[#242522]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] text-[#242522] mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Eleanor Sinclair"
                      className="w-full bg-[#F7F5F0] border border-[#242522]/15 px-3 py-2.5 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
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
                      placeholder="e.g. eleanor@sinclair.com"
                      className="w-full bg-[#F7F5F0] border border-[#242522]/15 px-3 py-2.5 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
                    />
                  </div>
                </div>

                {/* Phone & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] text-[#242522] mb-1 font-medium">
                      Phone / Mobile
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 012-3456"
                      className="w-full bg-[#F7F5F0] border border-[#242522]/15 px-3 py-2.5 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] text-[#242522] mb-1 font-medium">
                      Preferred Location
                    </label>
                    <select
                      value={locationPref}
                      onChange={(e) => setLocationPref(e.target.value)}
                      className="w-full bg-[#F7F5F0] border border-[#242522]/15 px-3 py-2.5 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
                    >
                      <option value="Los Angeles Foothills">Los Angeles & Bel Air Foothills</option>
                      <option value="London Mayfair">Central London & Mayfair</option>
                      <option value="Kyoto Higashiyama">Kyoto & Kansai Heritage</option>
                      <option value="Cote d Azur">French Riviera & Côte d’Azur</option>
                      <option value="New York TriBeCa">New York City & Hamptons</option>
                      <option value="Aspen Alpine">Aspen Valley & Alpine Retreats</option>
                      <option value="Global Multiple">Multi-Region Search</option>
                    </select>
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#242522] mb-1 font-medium">
                    Anticipated Budget / Valuation Scope
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#242522]/15 px-3 py-2.5 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
                  >
                    <option value="$5M — $10M">$5,000,000 — $10,000,000</option>
                    <option value="$10M — $25M">$10,000,000 — $25,000,000</option>
                    <option value="$25M — $50M+">$25,000,000 — $50,000,000+</option>
                    <option value="Lease Range">Private Lease ($20,000 — $100,000+ / mo)</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#242522] mb-1 font-medium">
                    Your Requirements or Architectural Vision
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe the atmosphere, privacy needs, architectural era, or specific properties you wish to discuss..."
                    className="w-full bg-[#F7F5F0] border border-[#242522]/15 p-3 text-xs text-[#242522] rounded-xs focus:outline-hidden focus:border-[#B79A69]"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>
                )}

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-1.5 text-[10px] text-[#8C8C85]">
                    <ShieldCheck size={14} className="text-[#B79A69]" />
                    <span>Protected under strict fiduciary confidentiality</span>
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#242522] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B79A69] hover:text-[#242522] transition-colors rounded-xs flex items-center justify-center space-x-2"
                  >
                    <span>Start a Conversation</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>

              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#B79A69]/20 text-[#B79A69] mx-auto flex items-center justify-center">
                  <CheckCircle size={32} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B79A69] font-medium block">
                  Confidential Inquiry Received
                </span>
                <h3 className="text-2xl font-serif text-[#242522]">
                  We Have Received Your Brief, {name}.
                </h3>
                <p className="text-xs text-[#5C5C57] max-w-md mx-auto leading-relaxed font-light">
                  A partner from our private advisory desk has been designated to review your inquiry. 
                  We will contact you at <span className="font-mono text-[#242522]">{email}</span> within one business day 
                  to coordinate next steps.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 border border-[#242522] text-xs uppercase tracking-wider rounded-xs hover:bg-[#242522] hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Salons & Verified Office Directory (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-white border border-[#242522]/10 p-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B79A69] font-medium block mb-3">
                DIRECT CONTACT
              </span>
              <h3 className="text-xl font-serif text-[#242522] mb-4">
                The Advisory Desk
              </h3>
              
              <div className="space-y-4 text-xs text-[#52524E]">
                <div className="flex items-start space-x-3">
                  <Mail size={16} className="text-[#B79A69] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A69B8A] block">Curator Email</span>
                    <a href="mailto:advisory@atelierestates.com" className="text-sm font-serif hover:text-[#B79A69] transition-colors">
                      advisory@atelierestates.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone size={16} className="text-[#B79A69] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A69B8A] block">Private Line</span>
                    <a href="tel:+13108449200" className="text-sm font-mono hover:text-[#B79A69] transition-colors">
                      +1 (310) 844-9200
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Advisory Salons */}
            <div className="bg-white border border-[#242522]/10 p-8 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B79A69] font-medium block">
                GLOBAL SALONS
              </span>

              <div className="space-y-4 text-xs text-[#52524E]">
                <div>
                  <h5 className="font-serif text-sm text-[#242522]">Beverly Hills Salon</h5>
                  <p className="font-light mt-0.5">9600 Wilshire Boulevard, Suite 400</p>
                  <p className="text-[11px] text-[#A69B8A]">Beverly Hills, CA 90212</p>
                </div>

                <div className="pt-3 border-t border-[#242522]/10">
                  <h5 className="font-serif text-sm text-[#242522]">Mayfair Salon</h5>
                  <p className="font-light mt-0.5">28 Grosvenor Street</p>
                  <p className="text-[11px] text-[#A69B8A]">Mayfair, London W1K 4QR</p>
                </div>

                <div className="pt-3 border-t border-[#242522]/10">
                  <h5 className="font-serif text-sm text-[#242522]">Kyoto Pavilion</h5>
                  <p className="font-light mt-0.5">Higashiyama-ku, Kiyomizu 4-chome</p>
                  <p className="text-[11px] text-[#A69B8A]">Kyoto 605-0862, Japan</p>
                </div>
              </div>

              <p className="text-[11px] text-[#A69B8A] italic pt-2">
                All salon consultations are hosted strictly by appointment.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

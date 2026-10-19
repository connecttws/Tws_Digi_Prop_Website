"use client";

import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Clock, BookOpen, Quote } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { JournalArticle } from '../types/property';

interface JournalPageProps {
  selectedArticleSlug?: string | null;
  onSelectArticle: (slug: string | null) => void;
  onNavigate: (route: string) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({
  selectedArticleSlug,
  onSelectArticle,
  onNavigate
}) => {
  const activeArticle = selectedArticleSlug 
    ? JOURNAL_ARTICLES.find((a) => a.slug === selectedArticleSlug) || null
    : null;

  if (activeArticle) {
    return (
      <div className="pt-28 md:pt-36 pb-24 bg-[#F7F5F0]">
        <div className="max-w-[900px] mx-auto px-6 md:px-10">
          
          {/* Back button */}
          <button
            onClick={() => onSelectArticle(null)}
            className="flex items-center space-x-1.5 text-xs text-[#5C5C57] hover:text-[#242522] transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            <span>Return to Journal</span>
          </button>

          {/* Article Header */}
          <div className="mb-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B79A69] font-medium block mb-2">
              {activeArticle.category} · {activeArticle.readTime}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-[#242522] font-normal leading-tight mb-4">
              {activeArticle.title}
            </h1>
            <p className="text-sm md:text-base text-[#5C5C57] font-light italic mb-6">
              {activeArticle.subtitle}
            </p>

            <div className="flex items-center space-x-4 text-xs text-[#7A7A74] pt-4 border-t border-[#242522]/10">
              <span>By {activeArticle.author.name}</span>
              <span>•</span>
              <span>{activeArticle.author.role}</span>
              <span>•</span>
              <span>{activeArticle.date}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="aspect-[16/9] overflow-hidden bg-[#E9E2D8] mb-12 border border-[#242522]/10">
            <img
              src={activeArticle.heroImage}
              alt={activeArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Excerpt Lead */}
          <p className="text-lg md:text-xl font-serif text-[#242522] leading-relaxed mb-8 font-light italic border-l-2 border-[#B79A69] pl-6">
            “{activeArticle.excerpt}”
          </p>

          {/* Content Body */}
          <div className="space-y-6 text-sm md:text-base text-[#4A4A46] leading-relaxed font-light mb-12">
            {activeArticle.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Quote Block if available */}
          {activeArticle.quote && (
            <div className="my-10 p-8 bg-white border border-[#242522]/10 text-center">
              <Quote size={20} className="mx-auto text-[#B79A69] mb-3" />
              <p className="font-serif text-lg md:text-xl text-[#242522] italic mb-3">
                “{activeArticle.quote}”
              </p>
              <span className="text-[11px] uppercase tracking-wider text-[#A69B8A]">
                — Architectural Notes
              </span>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="pt-10 border-t border-[#242522]/10 flex items-center justify-between">
            <button
              onClick={() => onSelectArticle(null)}
              className="text-xs uppercase tracking-wider text-[#242522] hover:text-[#B79A69]"
            >
              ← Back to Journal Index
            </button>
            <button
              onClick={() => onNavigate('/properties')}
              className="text-xs uppercase tracking-wider text-[#242522] hover:text-[#B79A69]"
            >
              Explore Properties →
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-36 pb-24 bg-[#F7F5F0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#A69B8A] font-medium block mb-3">
            EDITORIAL DISPATCHES
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#242522] font-normal leading-tight mb-4">
            The Architectural Journal.
          </h1>
          <p className="text-base text-[#5C5C57] font-light leading-relaxed">
            Essays, interviews, and observations on living spaces, honest materiality, 
            and the subtle art of residential serenity.
          </p>
        </div>

        {/* Featured First Article */}
        <div 
          onClick={() => onSelectArticle(JOURNAL_ARTICLES[0].slug)}
          className="group cursor-pointer bg-white border border-[#242522]/10 overflow-hidden mb-16 hover:border-[#242522]/30 transition-all shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#E9E2D8]">
              <img
                src={JOURNAL_ARTICLES[0].heroImage}
                alt={JOURNAL_ARTICLES[0].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
            </div>
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B79A69] font-medium block mb-2">
                  Featured Essay · {JOURNAL_ARTICLES[0].readTime}
                </span>
                <h2 className="text-2xl md:text-3xl font-serif text-[#242522] group-hover:text-[#B79A69] transition-colors leading-snug">
                  {JOURNAL_ARTICLES[0].title}
                </h2>
                <p className="mt-3 text-xs md:text-sm text-[#5C5C57] font-light leading-relaxed">
                  {JOURNAL_ARTICLES[0].excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[#242522]/10 flex items-center justify-between text-xs text-[#242522]">
                <span className="font-light text-[#A69B8A]">{JOURNAL_ARTICLES[0].author.name}</span>
                <span className="uppercase tracking-[0.18em] font-medium flex items-center space-x-1 group-hover:text-[#B79A69]">
                  <span>Read Essay</span>
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {JOURNAL_ARTICLES.slice(1).map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article.slug)}
              className="group cursor-pointer bg-white border border-[#242522]/10 overflow-hidden hover:border-[#242522]/30 transition-all flex flex-col justify-between"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#E9E2D8]">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>

              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#B79A69] font-medium block mb-2">
                    {article.category} · {article.readTime}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-[#242522] group-hover:text-[#B79A69] transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-xs text-[#5C5C57] font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#242522]/10 flex items-center justify-between text-xs text-[#242522]">
                  <span className="font-light text-[#A69B8A]">{article.date}</span>
                  <span className="uppercase tracking-[0.16em] flex items-center space-x-1 group-hover:text-[#B79A69]">
                    <span>Read</span>
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

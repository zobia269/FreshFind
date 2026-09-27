import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Volume2, Bookmark, BookmarkCheck, ArrowUpRight, Sparkles, Thermometer, Link2, Check
} from 'lucide-react';
import { getProduceImage } from '../data/imageData';

export default function ProduceCard({ 
  entry, 
  onSelect, 
  isBookmarked, 
  onToggleBookmark,
  currentMonthIndex 
}) {
  const isInSeasonNow = entry.peakMonths && entry.peakMonths.includes(currentMonthIndex);
  const [linkCopied, setLinkCopied] = useState(false);

  // Absolute permalink so the copied text is usable outside this app too
  const permalink = `${window.location.origin}/dictionary/${entry.id}`;

  const handleCopyLink = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(permalink);
    } catch {
      // Clipboard API can be blocked; fall back to a temporary prompt
      window.prompt('Copy this link:', permalink);
    }
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleSpeak = (e) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(entry.name);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'fruit': return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'vegetable': return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      case 'fungi': return 'bg-stone-200 text-stone-900 border-stone-300';
      case 'herb': return 'bg-teal-100 text-teal-900 border-teal-200';
      case 'jargon': return 'bg-indigo-100 text-indigo-900 border-indigo-200';
      case 'prep': return 'bg-cyan-100 text-cyan-900 border-cyan-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const cardImage = getProduceImage(entry);

  return (
    <div 
      onClick={() => onSelect(entry)}
      className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden"
    >
      {/* Photo header: always exactly the card's width, height derived from the ratio */}
      <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden bg-slate-100">
        <img
          src={cardImage}
          alt={entry.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Legibility scrim so the overlaid badges stay readable on any photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-slate-950/25" />

        {/* Top Header: Category, In-Season, Pronunciation, Bookmark */}
        <div className="absolute top-0 inset-x-0 p-3 flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getCategoryColor(entry.category)}`}>
              {entry.category}
            </span>
            {isInSeasonNow && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-600 text-white flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-300 animate-pulse" />
                In Season
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Copy deep permalink */}
            <button
              onClick={handleCopyLink}
              className={`p-1.5 rounded-lg transition-colors backdrop-blur-sm ${
                linkCopied
                  ? 'bg-lime-400 text-slate-950'
                  : 'text-white/90 hover:text-emerald-300 hover:bg-white/20'
              }`}
              title={linkCopied ? 'Link copied!' : 'Copy link to this entry'}
            >
              {linkCopied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            </button>

            {/* Pronunciation button */}
            <button
              onClick={handleSpeak}
              className="p-1.5 text-white/90 hover:text-emerald-300 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm"
              title={`Listen to pronunciation: ${entry.pronunciation || entry.name}`}
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Bookmark Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(entry.id);
              }}
              className={`p-1.5 rounded-lg transition-all backdrop-blur-sm ${
                isBookmarked 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-400' 
                  : 'text-white/90 hover:text-emerald-300 hover:bg-white/20'
              }`}
              title={isBookmarked ? 'Remove from Market Basket' : 'Save to Market Basket'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex-1">

        {/* Title & Scientific Name */}
        <div className="mb-2.5">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors truncate">
            {entry.name}
          </h3>
          {entry.pronunciation && (
            <p className="text-[11px] font-mono text-emerald-700/80">
              /{entry.pronunciation}/
            </p>
          )}
          {entry.scientificName && (
            <p className="text-xs text-slate-500 italic truncate font-serif">
              {entry.scientificName}
            </p>
          )}
        </div>

        {/* Short Definition */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
          {entry.shortDefinition}
        </p>

        {/* Sensory Ripeness Cue Box */}
        {entry.ripenessGuide && (
          <div className="bg-slate-50 rounded-xl p-2.5 mb-3 border border-slate-100 space-y-1 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-500 font-semibold uppercase tracking-wider text-[9px]">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Ripeness Sensory Cue:</span>
            </div>
            <p className="text-slate-700 line-clamp-1 italic">
              "{entry.ripenessGuide.feel || entry.ripenessGuide.look || entry.ripenessGuide.smell}"
            </p>
          </div>
        )}

        {/* Flavor / Culinary Pairing tags */}
        {entry.pairings && entry.pairings.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {entry.pairings.slice(0, 3).map((p, idx) => (
              <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                +{p}
              </span>
            ))}
            {entry.pairings.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-400">
                +{entry.pairings.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Info: Season & Price & Deep Dive Link */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {entry.priceTier && (
            <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]" title={`Market Price Tier: ${entry.priceTier}`}>
              {entry.priceTier}
            </span>
          )}
          {entry.brixScore && (
            <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md truncate max-w-[120px]" title={`Sugar Rating: ${entry.brixScore}`}>
              {entry.brixScore.split(' ')[0]}
            </span>
          )}
        </div>

        {/* Real link: middle-click and "copy link address" both work */}
        <Link
          to={`/dictionary/${entry.id}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform text-xs hover:text-emerald-900 hover:underline"
          title={`Permalink: /dictionary/${entry.id}`}
        >
          Inspect
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

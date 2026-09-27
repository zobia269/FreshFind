import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowRight, Sparkles, CalendarDays } from 'lucide-react';
import ProduceCard from './ProduceCard';
import { DICTIONARY_ENTRIES, MONTHS } from '../data/dictionaryData';

const SPOTLIGHT_COUNT = 4;

/** House favourites that keep the row useful even outside the harvest window. */
const SIGNATURE_IDS = [
  'black-mission-fig',
  'meyer-lemon',
  'morel-mushroom',
  'fuyu-persimmon',
  'finger-lime',
  'romanesco',
  'lions-mane',
  'buddhas-hand',
];

/**
 * Picks what the home page shows in the spotlight row: everything peaking this
 * month first, then the signature entries once those run out, de-duplicated so
 * a favourite that is already in season is not shown twice.
 */
function pickSpotlight(currentMonthIndex) {
  const inSeason = DICTIONARY_ENTRIES.filter(
    entry => entry.peakMonths && entry.peakMonths.includes(currentMonthIndex)
  );
  const signatures = DICTIONARY_ENTRIES.filter(entry => SIGNATURE_IDS.includes(entry.id));

  const picks = [];
  const seen = new Set();
  for (const entry of [...inSeason, ...signatures]) {
    if (seen.has(entry.id)) continue;
    seen.add(entry.id);
    picks.push(entry);
    if (picks.length === SPOTLIGHT_COUNT) break;
  }
  return picks;
}

export default function ProduceSpotlight({ onSelectEntry, bookmarkedProduceIds, onToggleProduceBookmark }) {
  const currentMonthIndex = new Date().getMonth();
  const currentMonthName = MONTHS[currentMonthIndex];

  const spotlight = useMemo(() => pickSpotlight(currentMonthIndex), [currentMonthIndex]);

  if (spotlight.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      {/* Centered section header */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
          <Sprout className="w-3.5 h-3.5" />
          From the Produce Guide
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-serif">
          What's Fresh <span className="text-emerald-600">{currentMonthName}</span> Looks Like
        </h2>

        <p className="text-sm text-slate-600 leading-relaxed">
          Peaking right now at nearby stalls. Every card carries the ripeness cue, peak months and
          price tier, so you can pick with confidence before you reach the market.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link
            to="/dictionary"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Full Produce Guide</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-600 bg-white border border-slate-200/80">
            <CalendarDays className="w-3.5 h-3.5 text-amber-500" />
            {DICTIONARY_ENTRIES.length} entries indexed
          </span>
        </div>
      </div>

      {/* Card row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {spotlight.map(entry => (
          <ProduceCard
            key={entry.id}
            entry={entry}
            onSelect={onSelectEntry}
            isBookmarked={bookmarkedProduceIds.includes(entry.id)}
            onToggleBookmark={onToggleProduceBookmark}
            currentMonthIndex={currentMonthIndex}
          />
        ))}
      </div>

      {/* Centered link back into the Produce Guide section */}
      <div className="text-center pt-2">
        <Link
          to="/dictionary"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-900 group"
        >
          Browse all {DICTIONARY_ENTRIES.length} produce guides
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

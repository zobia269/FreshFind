import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Sparkles, 
  ArrowUpDown, 
  RotateCcw,
  BookOpen,
  Apple,
  Carrot,
  TreePine,
  Sparkle,
  Tag,
  Utensils
} from 'lucide-react';
import ProduceCard from './ProduceCard';
import { CATEGORIES } from '../data/dictionaryData';

const ALPHABET = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

/**
 * Reads a real Brix reading out of brixScore, or null when the field does not
 * hold one.
 *
 * brixScore is only an actual sugar measurement for some entries ("9 - 11° Bx").
 * For the rest it is a free-text tasting note, and its first number means
 * something else entirely: "50 - 200 Scoville" is pepper heat, "20-40% higher
 * sugars" is a percentage, "Equal to Grade 1 produce" is a grade. Requiring the
 * "Bx" unit keeps those out of the ranking instead of sorting Scoville against
 * degrees Brix.
 */
function parseBrix(value) {
  if (!value || !/\bBx\b/i.test(value)) return null;
  const match = /(\d+(?:\.\d+)?)/.exec(value);
  return match ? parseFloat(match[1]) : null;
}

/**
 * How many months away the next peak month is, counting from the current one.
 * Used by the "peak season" sort so the nearest upcoming harvest leads.
 */
function nextPeakMonth(entry, currentMonthIndex) {
  const months = entry.peakMonths;
  if (!months || months.length === 0) return 12;
  let best = 12;
  for (const m of months) {
    const delta = (m - currentMonthIndex + 12) % 12;
    if (delta < best) best = delta;
  }
  return best;
}

export default function DictionaryGrid({ 
  entries, 
  selectedCategory, 
  setSelectedCategory, 
  searchQuery, 
  setSearchQuery, 
  onSelectEntry, 
  bookmarkedIds, 
  onToggleBookmark,
  isInSeasonOnly,
  setIsInSeasonOnly
}) {
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [selectedPrice, setSelectedPrice] = useState('ALL');
  const [sortBy, setSortBy] = useState('name-asc');
  
  const currentMonthIndex = new Date().getMonth();

  // Category Icon helper
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'fruit': return Apple;
      case 'vegetable': return Carrot;
      case 'fungi': return TreePine;
      case 'herb': return Sparkle;
      case 'jargon': return Tag;
      case 'prep': return Utensils;
      default: return BookOpen;
    }
  };

  // Filter & Sort Logic
  const filteredEntries = useMemo(() => {
    return entries.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Letter filter
      if (selectedLetter !== 'ALL') {
        const firstLetter = item.name.charAt(0).toUpperCase();
        if (firstLetter !== selectedLetter) return false;
      }

      // Price filter
      if (selectedPrice !== 'ALL') {
        if (!item.priceTier || !item.priceTier.includes(selectedPrice)) return false;
      }

      // In Season filter
      if (isInSeasonOnly) {
        if (!item.peakMonths || !item.peakMonths.includes(currentMonthIndex)) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesAlt = item.altNames && item.altNames.some(a => a.toLowerCase().includes(q));
        const matchesSci = item.scientificName && item.scientificName.toLowerCase().includes(q);
        const matchesDef = item.shortDefinition.toLowerCase().includes(q);
        const matchesPairing = item.pairings && item.pairings.some(p => p.toLowerCase().includes(q));
        const matchesUses = item.culinaryUses && item.culinaryUses.some(u => u.toLowerCase().includes(q));
        if (!matchesName && !matchesAlt && !matchesSci && !matchesDef && !matchesPairing && !matchesUses) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);

        // Location / growing origin
        case 'origin-asc': return (a.origin || '').localeCompare(b.origin || '');
        case 'origin-desc': return (b.origin || '').localeCompare(a.origin || '');

        case 'price-asc': return (a.priceTier || '').length - (b.priceTier || '').length;
        case 'price-desc': return (b.priceTier || '').length - (a.priceTier || '').length;

        // Sugar content. Entries with no actual Brix reading rank last rather
        // than being compared on an unrelated number.
        case 'brix-desc':
        case 'brix-asc': {
          const aBrix = parseBrix(a.brixScore);
          const bBrix = parseBrix(b.brixScore);
          if (aBrix === null && bBrix === null) return a.name.localeCompare(b.name);
          if (aBrix === null) return 1;
          if (bBrix === null) return -1;
          return sortBy === 'brix-desc' ? bBrix - aBrix : aBrix - bBrix;
        }

        // In-season-right-now first, then soonest peak month
        case 'season': {
          const aIn = a.peakMonths?.includes(currentMonthIndex) ? 0 : 1;
          const bIn = b.peakMonths?.includes(currentMonthIndex) ? 0 : 1;
          if (aIn !== bIn) return aIn - bIn;
          return nextPeakMonth(a, currentMonthIndex) - nextPeakMonth(b, currentMonthIndex);
        }

        default: return 0;
      }
    });
  }, [entries, selectedCategory, selectedLetter, selectedPrice, isInSeasonOnly, searchQuery, sortBy, currentMonthIndex]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedLetter('ALL');
    setSelectedPrice('ALL');
    setSearchQuery('');
    setIsInSeasonOnly(false);
    setSortBy('name-asc');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Category Pills Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => {
          const Icon = getCategoryIcon(cat.id);
          const isSelected = selectedCategory === cat.id;
          const count = cat.id === 'all' 
            ? entries.length 
            : entries.filter(e => e.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-emerald-200 shadow-md ring-2 ring-emerald-500'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* A-Z Alphabet Quick Bar */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-xs flex items-center justify-between gap-1 overflow-x-auto text-xs font-semibold">
        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold px-2 shrink-0">
          Index:
        </span>
        <div className="flex items-center gap-1">
          {ALPHABET.map(letter => {
            const isSelected = selectedLetter === letter;
            return (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Controls: Seasonality toggle, Price filter, Sorting, Result count */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
        
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Seasonality Quick Toggle */}
          <button
            onClick={() => setIsInSeasonOnly(!isInSeasonOnly)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              isInSeasonOnly
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isInSeasonOnly ? 'bg-lime-300' : 'bg-slate-300'}`} />
            <span>In Season This Month</span>
          </button>

          {/* Price Tier Selector */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
            <span className="text-[11px] text-slate-400 px-2 font-medium">Price:</span>
            {['ALL', '$', '$$', '$$$', '$$$$'].map(tier => (
              <button
                key={tier}
                onClick={() => setSelectedPrice(tier)}
                className={`px-2 py-0.5 rounded-md font-bold text-xs transition-all ${
                  selectedPrice === tier
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {(selectedCategory !== 'all' || selectedLetter !== 'ALL' || selectedPrice !== 'ALL' || searchQuery || isInSeasonOnly) && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs text-rose-600 hover:bg-rose-50 font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}

        </div>

        {/* Right side: Sorting & count */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500">
            Showing <strong className="text-slate-900">{filteredEntries.length}</strong> items
          </span>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-hidden focus:border-emerald-500"
            >
              <optgroup label="Name">
                <option value="name-asc">Alphabetical (A - Z)</option>
                <option value="name-desc">Alphabetical (Z - A)</option>
              </optgroup>
              <optgroup label="Location / Origin">
                <option value="origin-asc">Origin (A - Z)</option>
                <option value="origin-desc">Origin (Z - A)</option>
              </optgroup>
              <optgroup label="Season">
                <option value="season">In Season First</option>
              </optgroup>
              <optgroup label="Price">
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </optgroup>
              <optgroup label="Sugar (Brix)">
                <option value="brix-desc">Sugar (High to Low)</option>
                <option value="brix-asc">Sugar (Low to High)</option>
              </optgroup>
            </select>
          </div>
        </div>

      </div>

      {/* Produce Grid */}
      {filteredEntries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEntries.map(entry => (
            <ProduceCard
              key={entry.id}
              entry={entry}
              onSelect={onSelectEntry}
              isBookmarked={bookmarkedIds.includes(entry.id)}
              onToggleBookmark={onToggleBookmark}
              currentMonthIndex={currentMonthIndex}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
            🧺
          </div>
          <h3 className="text-lg font-bold text-slate-800 font-serif">
            No Market Entries Found
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We couldn't find any produce matching your current filter combination or search query "{searchQuery}".
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 shadow-md transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
}

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Sparkles, ArrowRight, Sun, CloudRain, Snowflake, Leaf } from 'lucide-react';
import { MONTHS } from '../data/dictionaryData';

export default function SeasonalCalendar({ entries, onSelectEntry }) {
  const currentMonthIndex = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Filter entries that have peakMonths including selectedMonth
  const inSeasonEntries = entries.filter(item => {
    if (!item.peakMonths) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    return item.peakMonths.includes(selectedMonth);
  });

  // Season name helper
  const getSeasonInfo = (monthIdx) => {
    if (monthIdx >= 2 && monthIdx <= 4) {
      return { name: 'Spring Harvest', icon: Leaf, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    }
    if (monthIdx >= 5 && monthIdx <= 7) {
      return { name: 'Summer Abundance', icon: Sun, color: 'text-amber-600 bg-amber-50 border-amber-200' };
    }
    if (monthIdx >= 8 && monthIdx <= 10) {
      return { name: 'Autumn Bounty', icon: CloudRain, color: 'text-orange-600 bg-orange-50 border-orange-200' };
    }
    return { name: 'Winter Citrus & Roots', icon: Snowflake, color: 'text-blue-600 bg-blue-50 border-blue-200' };
  };

  const currentSeason = getSeasonInfo(selectedMonth);
  const SeasonIcon = currentSeason.icon;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Calendar Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <CalendarIcon className="w-3.5 h-3.5" />
          12-Month Market Wheel
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 font-serif">
          Seasonal Harvest Calendar
        </h2>
        <p className="text-sm text-slate-600">
          Discover what fruits, vegetables, and wild fungi reach peak Brix sweetness and field maturity each month of the year.
        </p>
      </div>

      {/* 12-Month Interactive Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SeasonIcon className={`w-5 h-5 ${currentSeason.color.split(' ')[0]}`} />
            <span className="text-sm font-bold text-slate-800">
              Selected: <span className="text-emerald-700">{MONTHS[selectedMonth]}</span> — {currentSeason.name}
            </span>
          </div>

          <button
            onClick={() => setSelectedMonth(currentMonthIndex)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 px-3 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors"
          >
            Jump to Today ({MONTHS[currentMonthIndex]})
          </button>
        </div>

        {/* 12 Month Grid Buttons */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
          {MONTHS.map((m, idx) => {
            const isCurrent = idx === currentMonthIndex;
            const isSelected = idx === selectedMonth;

            return (
              <button
                key={m}
                onClick={() => setSelectedMonth(idx)}
                className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300 scale-105'
                    : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 border-slate-200'
                }`}
              >
                <span className="uppercase tracking-wider text-[11px]">{m.substring(0, 3)}</span>
                {isCurrent && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${isSelected ? 'bg-white text-emerald-800' : 'bg-emerald-600 text-white'}`}>
                    Now
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          {['all', 'fruit', 'vegetable', 'fungi', 'herb'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                categoryFilter === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All In-Season' : cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-medium">
          <strong>{inSeasonEntries.length}</strong> items in peak season for {MONTHS[selectedMonth]}
        </span>
      </div>

      {/* Produce Results Grid for Selected Month */}
      {inSeasonEntries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {inSeasonEntries.map(entry => (
            <div
              key={entry.id}
              onClick={() => onSelectEntry(entry)}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
                    {entry.emoji}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {entry.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate mt-1">
                      {entry.name}
                    </h3>
                    <p className="text-xs text-slate-400 italic font-serif truncate">
                      {entry.scientificName}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {entry.shortDefinition}
                </p>

                {entry.ripenessGuide && (
                  <p className="text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-lg line-clamp-1 italic">
                    "{entry.ripenessGuide.look || entry.ripenessGuide.smell}"
                  </p>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Peak: {entry.peakSeason}</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  View Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-2">
          <p className="text-sm font-semibold text-slate-600">
            No entries found in this category for {MONTHS[selectedMonth]}.
          </p>
          <button
            onClick={() => setCategoryFilter('all')}
            className="text-xs font-bold text-emerald-600 underline"
          >
            Show all produce in-season
          </button>
        </div>
      )}

      {/* Why Buy In Season Educational Callout */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold font-serif text-emerald-300">
          The 3 Agronomic Advantages of Seasonal Market Shopping
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-1 bg-white/5 p-4 rounded-2xl border border-white/10">
            <strong className="text-white text-sm block">1. Peak Brix Sugars</strong>
            <p className="leading-relaxed">
              Produce ripened on the vine synthesizes significantly higher soluble sugars, terpenes, and antioxidants than out-of-season cold-stored crops.
            </p>
          </div>
          <div className="space-y-1 bg-white/5 p-4 rounded-2xl border border-white/10">
            <strong className="text-white text-sm block">2. Economics & 40% Savings</strong>
            <p className="leading-relaxed">
              When a crop is at harvest peak, farmers experience a harvest glut. Market prices drop naturally, making peak-season produce the highest value purchase.
            </p>
          </div>
          <div className="space-y-1 bg-white/5 p-4 rounded-2xl border border-white/10">
            <strong className="text-white text-sm block">3. Zero Extended Cold Chain</strong>
            <p className="leading-relaxed">
              Supermarket produce averages 1,500 miles of refrigerated transit. Local seasonal items are typically picked within 24 to 48 hours of your market visit.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}



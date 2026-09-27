import React from 'react';
import { Link } from 'react-router-dom';
import {
  Store,
  BookOpen,
  CalendarCheck,
  ShoppingBasket,
  ArrowRight,
  MapPinned,
} from 'lucide-react';
import { FARMERS_MARKETS } from '../data/marketData';
import { DICTIONARY_ENTRIES } from '../data/dictionaryData';

/**
 * Every card here points at something the site really does: three are real
 * routes, the basket card opens the global drawer instead of navigating.
 */
const HIGHLIGHTS = [
  {
    id: 'markets',
    to: '/markets',
    icon: Store,
    accent: 'bg-emerald-100 text-emerald-700',
    title: 'Live Market Timetable',
    description:
      'Every stall with its operating days, opening hours, distance and a live open/closed badge — switch between cards, a weekly schedule table and a map view.',
    meta: `${FARMERS_MARKETS.length} verified markets`,
  },
  {
    id: 'dictionary',
    to: '/dictionary',
    icon: BookOpen,
    accent: 'bg-amber-100 text-amber-700',
    title: 'Produce Guide & Ripeness',
    description:
      'Look, feel and smell cues for picking perfectly ripe produce, plus peak months, Brix sugar readings, price tiers and storage tips.',
    meta: `${DICTIONARY_ENTRIES.length} indexed entries`,
  },
  {
    id: 'planner',
    to: '/planner',
    icon: CalendarCheck,
    accent: 'bg-teal-100 text-teal-700',
    title: 'Visit Planner',
    description:
      'Pick a market, day and arrival time, then generate a printable itinerary with parking notes and your own shopping checklist.',
    meta: 'Print or share your plan',
  },
  {
    id: 'basket',
    action: 'basket',
    icon: ShoppingBasket,
    accent: 'bg-indigo-100 text-indigo-700',
    title: 'Market Basket',
    description:
      'Save markets and produce as you browse, attach personal notes, then export or share the list with your household.',
    meta: 'Bookmarks stay on this device',
  },
];

export default function FeatureHighlights({ onOpenBasket }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {HIGHLIGHTS.map(item => {
          const Icon = item.icon;

          const inner = (
            <>
              <div className="flex items-start justify-between gap-3">
                <span className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${item.accent}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900 font-serif group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-700 transition-colors">
                <MapPinned className="w-3 h-3" />
                {item.meta}
              </span>
            </>
          );

          const className =
            'group bg-white rounded-3xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col gap-4 text-left cursor-pointer h-full';

          return item.action === 'basket' ? (
            <button key={item.id} type="button" onClick={onOpenBasket} className={className}>
              {inner}
            </button>
          ) : (
            <Link key={item.id} to={item.to} className={className}>
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

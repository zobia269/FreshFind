import React from 'react';
import { 
  Store, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Navigation
} from 'lucide-react';
import HeroCanvasBackground from './HeroCanvasBackground';
import HeroVideoBackdrop from './HeroVideoBackdrop';
import VisitorCounter from './VisitorCounter';
import { FARMERS_MARKETS, getMarketLiveStatus } from '../data/marketData';
import { MONTHS } from '../data/dictionaryData';

export default function HeroSection({
  onNavigate,
  onSelectMarket,
  onSelectEntry,
  featuredEntry,
}) {
  const currentMonthIndex = new Date().getMonth();
  const currentMonthName = MONTHS[currentMonthIndex];

  // Find markets open today or featured
  const openMarkets = FARMERS_MARKETS.filter(m => getMarketLiveStatus(m).isOpen);
  const displayMarkets = openMarkets.length > 0 ? openMarkets : FARMERS_MARKETS.slice(0, 2);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60">
      
      {/* Market footage, dimmed and tinted into the grow-light palette */}
      <HeroVideoBackdrop />

      {/* Animated canvas backdrop: drifting grow-light blobs + rising spore particles */}
      <HeroCanvasBackground />

      {/* Static radial glow for depth on top of the canvas */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Vignette so the wordmark and body copy always stay legible over the animation */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_28%_38%,rgba(2,6,23,0.55)_0%,rgba(2,6,23,0.25)_45%,transparent_75%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-t from-slate-950/70 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* Main Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Resident Problem/Solution */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Live Harvest & Market Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Current Harvest Window: <strong>{currentMonthName}</strong></span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-serif leading-tight">
              Fresh <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-300">Find</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-200 mt-1">
                Discover Local Farmers Markets & Fresh Produce
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Bringing local farmers and residents together on a single platform. Know exactly <strong>where markets are located</strong>, <strong>operating days and hours</strong>, and <strong>what fresh produce is in peak season</strong> before planning your visit.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('markets')}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <Store className="w-4 h-4" />
                <span>Browse Farmers Markets</span>
              </button>

              <button
                onClick={() => onNavigate('planner')}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4 text-emerald-300" />
                <span>Plan Your Market Visit</span>
              </button>

              <button
                onClick={() => onNavigate('dictionary')}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-emerald-300 hover:text-white transition-colors"
              >
                <span>Produce Guide & Ripeness</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Resident Solution Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-900/60 max-w-lg">
              <div>
                <p className="text-xl sm:text-2xl font-black text-emerald-400 font-serif">6</p>
                <p className="text-[11px] text-slate-400">Verified Regional Markets</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-teal-400 font-serif">60+</p>
                <p className="text-[11px] text-slate-400">Heirloom & Fresh Finds</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-lime-400 font-serif">100%</p>
                <p className="text-[11px] text-slate-400">Client-Side & Offline</p>
              </div>
            </div>

          </div>

          {/* Right Column: Highlight Grid / Carousel (Visit Counter, Markets Open Today + Featured Produce) */}
          <div className="lg:col-span-5 space-y-4">

            {/* Visit activity for this browser */}
            <VisitorCounter />
            
            {/* Markets Open Now Card */}
            <div className="bg-slate-900/90 rounded-3xl p-5 border border-emerald-800/50 shadow-xl space-y-3 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Market Highlight
                </span>
                <span className="text-[11px] text-slate-400">
                  {openMarkets.length > 0 ? `${openMarkets.length} Open Now` : 'Next Market Open'}
                </span>
              </div>

              {displayMarkets.map(m => {
                const status = getMarketLiveStatus(m);
                return (
                  <div
                    key={m.id}
                    onClick={() => onSelectMarket(m)}
                    className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
                        {m.name}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status.color}`}>
                        {status.badgeText}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        {m.area} ({m.distance})
                      </span>
                      <span className="font-mono text-emerald-200">{m.hoursDisplay}</span>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => onNavigate('markets')}
                className="w-full text-center text-xs text-emerald-400 hover:text-emerald-300 font-bold py-1 transition-colors"
              >
                View Complete Schedule Timetable →
              </button>
            </div>

            {/* Featured Fresh Find Card */}
            {featuredEntry && (
              <div
                onClick={() => onSelectEntry(featuredEntry)}
                className="bg-emerald-950/70 rounded-3xl p-4 border border-emerald-700/40 shadow-lg flex items-center gap-4 cursor-pointer hover:border-emerald-400 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
                  {featuredEntry.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      Fresh Find of the Day
                    </span>
                    <span className="text-[10px] text-slate-400">Peak {featuredEntry.peakSeason}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm truncate group-hover:text-emerald-300">
                    {featuredEntry.name}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-1 italic">
                    "{featuredEntry.ripenessGuide?.feel || featuredEntry.ripenessGuide?.look}"
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}

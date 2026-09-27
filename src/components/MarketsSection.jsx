import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Store, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Search, 
  Filter, 
  Navigation, 
  ArrowRight, 
  ArrowUpDown,
  Grid, 
  Table as TableIcon, 
  Map as MapIcon, 
  Bookmark, 
  BookmarkCheck,
  Star,
  Sparkles,
  Link2,
  Check
} from 'lucide-react';
import { FARMERS_MARKETS, getMarketLiveStatus, DAYS_OF_WEEK } from '../data/marketData';
import { getMarketImage } from '../data/imageData';

/** distance is stored for display, e.g. "1.2 km away". Pull out the number. */
function parseDistance(value) {
  const match = /(\d+(?:\.\d+)?)/.exec(value || '');
  return match ? parseFloat(match[1]) : Number.POSITIVE_INFINITY;
}

/** Per-card state for the "copy permalink" button. */
function useCopiedLink(permalink) {
  const [copied, setCopied] = useState(false);

  const copy = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(permalink);
    } catch {
      window.prompt('Copy this link:', permalink);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return [copied, copy];
}

/**
 * A single market card. Extracted into its own component so the copy-link hook
 * is called once per card rather than inside the parent's .map() callback.
 */
function MarketCard({ market, isBookmarked, onSelect, onPlanVisit, onToggleBookmark }) {
  const status = getMarketLiveStatus(market);
  const [linkCopied, handleCopyLink] = useCopiedLink(
    `${window.location.origin}/markets/${market.id}`
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Card Header: photo fills the card width, content overlays it */}
        <div className="relative w-full aspect-[16/9] shrink-0 overflow-hidden">
          <img
            src={getMarketImage(market)}
            alt={market.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/55 to-emerald-950/30" />

          <div className="absolute inset-0 p-5 text-white flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border backdrop-blur-sm ${status.color}`}>
                {status.badgeText}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleCopyLink}
                  className={`p-1.5 rounded-lg transition-colors backdrop-blur-sm ${
                    linkCopied
                      ? 'bg-lime-400 text-slate-950'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                  title={linkCopied ? 'Link copied!' : 'Copy link to this market'}
                >
                  {linkCopied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => onToggleBookmark(market.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isBookmarked ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                  title={isBookmarked ? 'Saved in Market Basket' : 'Save to Market Basket'}
                >
                  {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 1. MANDATORY ELEMENT: Market Name */}
            <h3
              onClick={() => onSelect(market)}
              className="text-lg font-bold font-serif hover:text-emerald-300 transition-colors cursor-pointer"
            >
              {market.name}
            </h3>

            {/* 2. MANDATORY ELEMENT: Location & Area */}
            <div className="flex items-center gap-1.5 text-xs text-emerald-100">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{market.address} ({market.distance})</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4 text-xs">

          {/* 3. MANDATORY ELEMENT: Operating Days & Hours */}
          <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 space-y-1">
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5 font-bold text-emerald-950">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Days: {market.openDays.join(', ')}</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hours: {market.hoursDisplay}</span>
            </div>
            <p className="text-[11px] text-emerald-800 italic pt-0.5">
              {status.reason}
            </p>
          </div>

          {/* Description Box */}
          <p className="text-slate-600 leading-relaxed line-clamp-2">
            {market.description}
          </p>

          {/* 4. MANDATORY ELEMENT: Produce Types Available */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Fresh Produce Available:
            </span>
            <div className="flex flex-wrap gap-1">
              {market.produceTypes.map((p, i) => (
                <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {p}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
        {/* Real link: middle-click and "copy link address" both work */}
        <Link
          to={`/markets/${market.id}`}
          onClick={(e) => e.stopPropagation()}
          className="text-slate-700 hover:text-emerald-700 font-bold hover:underline"
          title={`Permalink: /markets/${market.id}`}
        >
          View Details
        </Link>

        <button
          onClick={() => onPlanVisit(market)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-xs active:scale-95"
        >
          <span>Plan Visit</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function MarketsSection({ 
  onSelectMarket, 
  onPlanVisit, 
  bookmarkedMarketIds, 
  onToggleMarketBookmark,
  initialSearchQuery = ''
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedDay, setSelectedDay] = useState('ALL');
  const [selectedArea, setSelectedArea] = useState('ALL');
  const [selectedProduce, setSelectedProduce] = useState('ALL');
  const [viewMode, setViewMode] = useState('cards'); // 'cards', 'schedule', 'map'
  const [sortBy, setSortBy] = useState('distance-asc');
  const [selectedMapMarket, setSelectedMapMarket] = useState(FARMERS_MARKETS[0]);

  // Extract distinct areas & produce types
  const areas = useMemo(() => {
    return ['ALL', ...new Set(FARMERS_MARKETS.map(m => m.area))];
  }, []);

  const allProduceTypes = useMemo(() => {
    const set = new Set();
    FARMERS_MARKETS.forEach(m => m.produceTypes.forEach(p => set.add(p)));
    return ['ALL', ...set];
  }, []);

  // Filter logic (Product or Location search requirement)
  const filteredMarkets = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return FARMERS_MARKETS.filter(market => {
      // Day filter
      if (selectedDay !== 'ALL') {
        if (!market.openDays.includes(selectedDay)) return false;
      }

      // Area filter
      if (selectedArea !== 'ALL' && market.area !== selectedArea) {
        return false;
      }

      // Produce Type filter
      if (selectedProduce !== 'ALL') {
        if (!market.produceTypes.includes(selectedProduce)) return false;
      }

      // Search bar matches Market Name, Location/Area, or Produce Types
      if (q) {
        const matchesName = market.name.toLowerCase().includes(q);
        const matchesArea = market.area.toLowerCase().includes(q);
        const matchesAddress = market.address.toLowerCase().includes(q);
        const matchesProduce = market.produceTypes.some(p => p.toLowerCase().includes(q));
        if (!matchesName && !matchesArea && !matchesAddress && !matchesProduce) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);

        // Location
        case 'area-asc': return a.area.localeCompare(b.area);
        case 'area-desc': return b.area.localeCompare(a.area);
        case 'distance-asc': return parseDistance(a.distance) - parseDistance(b.distance);
        case 'distance-desc': return parseDistance(b.distance) - parseDistance(a.distance);

        case 'rating-desc': return b.rating - a.rating || a.name.localeCompare(b.name);
        case 'stalls-desc': return b.stallCount - a.stallCount || a.name.localeCompare(b.name);
        case 'time-asc': return a.openTimeHours - b.openTimeHours;

        default: return 0;
      }
    });
  }, [searchQuery, selectedDay, selectedArea, selectedProduce, sortBy]);

  return (
    <section id="markets-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 scroll-mt-20">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-100 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            <span>Farmers Market Directory</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-serif">
            Local Markets, Schedules & Maps
          </h2>
          <p className="text-sm text-slate-600 max-w-xl">
            Never miss a harvest day. Find nearby farmers markets, real-time operating hours, and freshly available local produce.
          </p>
        </div>

        {/* View Mode Switcher (Cards, Schedule Table, Map) */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 text-xs font-bold self-start md:self-auto">
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              viewMode === 'cards' 
                ? 'bg-white text-emerald-800 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Market Cards</span>
          </button>

          <button
            onClick={() => setViewMode('schedule')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              viewMode === 'schedule' 
                ? 'bg-white text-emerald-800 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-4 h-4" />
            <span>Schedule Table</span>
          </button>

          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              viewMode === 'map' 
                ? 'bg-white text-emerald-800 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Interactive Map</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar (Requirement #3) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Main Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by market name, area, or produce (e.g. Peach, Downtown)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          {/* Day Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-hidden focus:border-emerald-500 font-medium"
            >
              <option value="ALL">All Days</option>
              {DAYS_OF_WEEK.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Area Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-hidden focus:border-emerald-500 font-medium truncate"
            >
              {areas.map(a => (
                <option key={a} value={a}>Area: {a}</option>
              ))}
            </select>
          </div>

          {/* Produce Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedProduce}
              onChange={(e) => setSelectedProduce(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-hidden focus:border-emerald-500 font-medium truncate"
            >
              <option value="ALL">All Produce</option>
              {allProduceTypes.filter(p => p !== 'ALL').map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Active search status + sorting */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-900">{filteredMarkets.length}</strong> of {FARMERS_MARKETS.length} Farmers Markets
          </span>

          <div className="flex items-center gap-3">
            {(searchQuery || selectedDay !== 'ALL' || selectedArea !== 'ALL' || selectedProduce !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDay('ALL');
                  setSelectedArea('ALL');
                  setSelectedProduce('ALL');
                }}
                className="text-emerald-700 hover:text-emerald-900 font-bold"
              >
                Reset Filters
              </button>
            )}

            {/* Sorting */}
            <label className="flex items-center gap-1.5 text-slate-600 font-medium">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="sr-only sm:not-sr-only">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-1.5 px-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-hidden focus:border-emerald-500"
              >
                <optgroup label="Name">
                  <option value="name-asc">Alphabetical (A - Z)</option>
                  <option value="name-desc">Alphabetical (Z - A)</option>
                </optgroup>
                <optgroup label="Location">
                  <option value="area-asc">Area (A - Z)</option>
                  <option value="area-desc">Area (Z - A)</option>
                  <option value="distance-asc">Nearest First</option>
                  <option value="distance-desc">Farthest First</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="rating-desc">Highest Rated</option>
                  <option value="stalls-desc">Most Stalls</option>
                  <option value="time-asc">Opens Earliest</option>
                </optgroup>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* VIEW 1: CARDS GRID (With 4 Mandatory Elements) */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map(market => (
            <MarketCard
              key={market.id}
              market={market}
              isBookmarked={bookmarkedMarketIds.includes(market.id)}
              onSelect={onSelectMarket}
              onPlanVisit={onPlanVisit}
              onToggleBookmark={onToggleMarketBookmark}
            />
          ))}
        </div>
      )}

      {/* VIEW 2: SCHEDULE TIMETABLE (Weekly Schedule Grid) */}
      {viewMode === 'schedule' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Master Weekly Farmers Market Timetable
            </h3>
            <span className="text-xs text-slate-500">All local regional schedules</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="p-3.5 rounded-l-xl">Market Name</th>
                  <th className="p-3.5">Area & Location</th>
                  <th className="p-3.5">Open Days</th>
                  <th className="p-3.5">Operating Hours</th>
                  <th className="p-3.5">Live Status</th>
                  <th className="p-3.5 rounded-r-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredMarkets.map(m => {
                  const status = getMarketLiveStatus(m);
                  return (
                    <tr key={m.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">
                        {m.name}
                      </td>
                      <td className="p-3.5">
                        <span className="font-semibold block">{m.area}</span>
                        <span className="text-[11px] text-slate-400">{m.address}</span>
                      </td>
                      <td className="p-3.5 font-medium text-emerald-800">
                        {m.openDays.join(', ')}
                      </td>
                      <td className="p-3.5 font-mono text-slate-600">
                        {m.hoursDisplay}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${status.color}`}>
                          {status.badgeText}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => onPlanVisit(m)}
                          className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700"
                        >
                          Plan Visit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: INTERACTIVE SIMULATED MAP */}
      {viewMode === 'map' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Regional Market Pin Locator
              </h3>
              <p className="text-xs text-slate-500">
                Click on any map pin or market item to preview coordinates, travel distance, and direct routes.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              📍 6 Verified Market Hubs
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Visual Simulated Map Canvas */}
            <div className="lg:col-span-8 relative h-[380px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 p-4 flex flex-col justify-between shadow-inner">
              
              {/* Decorative Map Grid Lines & Roads */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-emerald-500/20 transform -rotate-12 pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-1/3 w-1 bg-teal-500/20 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-1/4 w-1 bg-emerald-500/20 pointer-events-none" />

              {/* Map Header Overlay */}
              <div className="relative z-10 flex items-center justify-between text-xs text-emerald-300 bg-slate-950/80 p-2.5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="flex items-center gap-1.5 font-mono">
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  Center: {selectedMapMarket.coordinates.lat}° N, {selectedMapMarket.coordinates.lng}° E
                </span>
                <span className="font-bold text-white">Active Pin: {selectedMapMarket.name}</span>
              </div>

              {/* Pins on the Map */}
              <div className="relative z-10 w-full h-full flex items-center justify-around flex-wrap p-4">
                {FARMERS_MARKETS.map((m, idx) => {
                  const isSelected = selectedMapMarket.id === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMapMarket(m)}
                      className={`group relative flex flex-col items-center transition-all ${
                        isSelected ? 'scale-125 z-20' : 'opacity-80 hover:opacity-100 hover:scale-110'
                      }`}
                    >
                      <div className={`p-2 rounded-2xl shadow-xl flex items-center justify-center ${
                        isSelected 
                          ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-300 animate-bounce' 
                          : 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        <Store className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5 whitespace-nowrap shadow-md ${
                        isSelected ? 'bg-white text-slate-900 font-extrabold' : 'bg-slate-900/90 text-slate-300'
                      }`}>
                        {m.area.split(' ')[0]} ({m.distance})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Map Footer Tip */}
              <div className="relative z-10 text-[10px] text-slate-400 text-center bg-slate-950/80 py-1.5 rounded-lg border border-white/5">
                Simulated Interactive GPS Grid. Select a pin to view full market schedule and directions below.
              </div>

            </div>

            {/* Selected Map Market Detail Panel */}
            <div className="lg:col-span-4 bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                Selected Market
              </span>
              
              <h4 className="text-base font-bold font-serif text-slate-900">
                {selectedMapMarket.name}
              </h4>
              
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{selectedMapMarket.address} ({selectedMapMarket.distance})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{selectedMapMarket.openDays.join(', ')}: {selectedMapMarket.hoursDisplay}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <span>🚗 Parking:</span>
                  <span>{selectedMapMarket.parking}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <button
                  onClick={() => onPlanVisit(selectedMapMarket)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <span>Plan Visit to {selectedMapMarket.area.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

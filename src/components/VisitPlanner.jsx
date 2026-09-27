import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckSquare, 
  Square, 
  Printer, 
  Share2, 
  Sparkles, 
  Car, 
  ShoppingBag,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { FARMERS_MARKETS } from '../data/marketData';

export default function VisitPlanner({ initialMarket, entries }) {
  const [selectedMarketId, setSelectedMarketId] = useState(
    initialMarket ? initialMarket.id : FARMERS_MARKETS[0].id
  );
  
  const currentMarket = FARMERS_MARKETS.find(m => m.id === selectedMarketId) || FARMERS_MARKETS[0];
  const [plannedDay, setPlannedDay] = useState(currentMarket.openDays[0] || 'Saturday');
  const [plannedTime, setPlannedTime] = useState('09:00 AM');
  const [transportMode, setTransportMode] = useState('Car (Parking on-site)');
  const [selectedItems, setSelectedItems] = useState([
    'Heirloom Tomatoes', 'Fresh Leafy Greens', 'Raw Farm Honey'
  ]);
  const [customItemInput, setCustomItemInput] = useState('');
  const [planGenerated, setPlanGenerated] = useState(false);

  const toggleItem = (item) => {
    setSelectedItems(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleAddCustomItem = (e) => {
    e.preventDefault();
    if (customItemInput.trim()) {
      if (!selectedItems.includes(customItemInput.trim())) {
        setSelectedItems([...selectedItems, customItemInput.trim()]);
      }
      setCustomItemInput('');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyPlan = () => {
    const text = `📅 FreshFind Market Visit Itinerary:
Market: ${currentMarket.name}
Location: ${currentMarket.address}
Day & Time: ${plannedDay} at ${plannedTime}
Transport: ${transportMode}
Target Shopping Checklist:
${selectedItems.map(i => `  [ ] ${i}`).join('\n')}

Parking & Logistics: ${currentMarket.parking}`;
    navigator.clipboard.writeText(text);
    alert('Visit Plan copied to clipboard!');
  };

  return (
    <section id="planner-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 scroll-mt-20">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Interactive Resident Solution</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 font-serif">
          Farmers Market Visit Planner
        </h2>
        <p className="text-sm text-slate-600">
          Solve the scheduling mystery. Coordinate operating hours, location, target harvest items, and arrival times for a seamless weekend market visit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Input Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-bold font-serif text-slate-900 flex items-center gap-2">
            <span>Configure Your Visit Itinerary</span>
          </h3>

          {/* 1. Choose Market */}
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-slate-700 block">
              1. Select Farmers Market:
            </label>
            <select
              value={selectedMarketId}
              onChange={(e) => {
                setSelectedMarketId(e.target.value);
                const nextM = FARMERS_MARKETS.find(m => m.id === e.target.value);
                if (nextM && nextM.openDays.length > 0) {
                  setPlannedDay(nextM.openDays[0]);
                }
              }}
              className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 font-medium focus:outline-hidden focus:border-emerald-500 bg-white"
            >
              {FARMERS_MARKETS.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} — {m.area} ({m.distance})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Choose Day & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                2. Market Open Day:
              </label>
              <select
                value={plannedDay}
                onChange={(e) => setPlannedDay(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 font-medium focus:outline-hidden focus:border-emerald-500 bg-white"
              >
                {currentMarket.openDays.map(day => (
                  <option key={day} value={day}>{day} ({currentMarket.hoursDisplay})</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                3. Estimated Arrival Time:
              </label>
              <select
                value={plannedTime}
                onChange={(e) => setPlannedTime(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 font-medium focus:outline-hidden focus:border-emerald-500 bg-white"
              >
                <option value="08:00 AM">8:00 AM — Opening bell (First Pick)</option>
                <option value="09:30 AM">9:30 AM — Morning peak fresh energy</option>
                <option value="11:30 AM">11:30 AM — Midday brunch & browse</option>
                <option value="01:00 PM">1:00 PM — Late hour (Canning deals)</option>
              </select>
            </div>
          </div>

          {/* 3. Transport Mode */}
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-slate-700 block">
              4. Transportation Mode:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {['Car (Parking lot)', 'Walking / Bicycle', 'Public Transit / Bus'].map(mode => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTransportMode(mode)}
                  className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                    transportMode === mode 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Target Produce Checklist */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-slate-700 block">
              5. Target Shopping Checklist:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Heirloom Tomatoes',
                'Fresh Leafy Greens',
                'Wild Mushrooms',
                'Raw Farm Honey',
                'Artisan Sourdough',
                'Stone Fruits (Peaches)',
                'Pasture-Raised Farm Eggs',
                'Local Goat Cheese'
              ].map(item => {
                const checked = selectedItems.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleItem(item)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-colors ${
                      checked 
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold' 
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {checked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                    <span className="truncate">{item}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom item adder */}
            <form onSubmit={handleAddCustomItem} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Add custom item (e.g. Ramp compound butter)..."
                value={customItemInput}
                onChange={(e) => setCustomItemInput(e.target.value)}
                className="flex-1 p-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
              >
                Add Item
              </button>
            </form>
          </div>

          <button
            type="button"
            onClick={() => setPlanGenerated(true)}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Generate Itinerary Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Generated Itinerary Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              Verified Visit Itinerary
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-emerald-200 font-mono">
              Ready to Export
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold font-serif text-white">
              {currentMarket.name}
            </h3>
            <p className="text-xs text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{currentMarket.address} ({currentMarket.distance})</span>
            </p>
          </div>

          {/* Schedule Summary Box */}
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Scheduled Date:</span>
              <span className="font-bold text-emerald-300">{plannedDay}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Target Arrival:</span>
              <span className="font-bold text-white">{plannedTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Market Hours:</span>
              <span className="font-mono text-slate-200">{currentMarket.hoursDisplay}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Parking / Transit:</span>
              <span className="text-slate-200">{currentMarket.parking}</span>
            </div>
          </div>

          {/* Checklist preview */}
          <div className="space-y-2 text-xs">
            <span className="text-slate-400 font-bold block">
              Shopping Checklist ({selectedItems.length} items):
            </span>
            <ul className="space-y-1.5 max-h-36 overflow-y-auto">
              {selectedItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2 bg-emerald-950/60 p-2 rounded-xl border border-emerald-800/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expert Resident Tip */}
          <div className="p-3 bg-emerald-900/40 rounded-xl border border-emerald-600/30 text-[11px] text-emerald-200 space-y-1">
            <strong className="block text-white font-bold">💡 Resident Pro-Tip:</strong>
            <p>
              Remember to bring insulated reusable tote bags and small cash denominations for quick grower transactions.
            </p>
          </div>

          {/* Actions: Copy & Print */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleCopyPlan}
              className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/20 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Copy Itinerary</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Itinerary</span>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}

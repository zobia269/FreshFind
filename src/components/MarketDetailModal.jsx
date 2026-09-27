import React, { useEffect } from 'react';
import { X, MapPin, Clock, Calendar, Phone, Car, Store, Navigation, Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';
import { getMarketLiveStatus } from '../data/marketData';

export default function MarketDetailModal({ 
  market, 
  onClose, 
  onPlanVisit, 
  isBookmarked, 
  onToggleBookmark 
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!market) return null;
  const status = getMarketLiveStatus(market);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 my-8">
        
        {/* Header with Green Theme */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${status.color}`}>
                {status.badgeText}
              </span>
              <span className="text-xs text-emerald-200">
                {market.distance}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
              {market.name}
            </h3>

            <p className="text-xs text-slate-200 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{market.address}</span>
            </p>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
          
          {/* Schedule & Hours Block */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 space-y-2">
            <h4 className="font-bold text-emerald-950 font-serif text-sm">
              Operating Schedule & Timings
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Open Days: <strong>{market.openDays.join(', ')}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Hours: <strong>{market.hoursDisplay}</strong></span>
              </div>
            </div>
            <p className="text-emerald-800 italic pt-1">
              Current Status: {status.reason}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-slate-400 uppercase font-bold text-[10px] tracking-wider">
              About This Farmers Market
            </h4>
            <p className="text-slate-700 leading-relaxed text-sm">
              {market.description}
            </p>
          </div>

          {/* Fresh Produce Available */}
          <div className="space-y-2">
            <h4 className="text-slate-400 uppercase font-bold text-[10px] tracking-wider">
              Available Fresh Produce Types
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {market.produceTypes.map((p, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 font-semibold text-xs">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Logistics: Parking & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-1">
                <Car className="w-3.5 h-3.5 text-emerald-600" />
                <span>Parking & Transit</span>
              </div>
              <p className="text-slate-600">{market.parking}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Information Desk</span>
              </div>
              <p className="text-slate-600">{market.phone}</p>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={() => onToggleBookmark(market.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold transition-all border ${
              isBookmarked 
                ? 'bg-emerald-100 border-emerald-300 text-emerald-900' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4" />}
            <span>{isBookmarked ? 'Market Saved' : 'Save Market'}</span>
          </button>

          <button
            onClick={() => {
              onPlanVisit(market);
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md active:scale-95"
          >
            <span>Plan My Visit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}

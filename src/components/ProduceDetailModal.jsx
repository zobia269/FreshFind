import React, { useEffect } from 'react';
import { 
  X, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  CheckCircle, 
  AlertTriangle, 
  Thermometer, 
  Sparkles, 
  Utensils, 
  Lightbulb, 
  Compass,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function ProduceDetailModal({ 
  entry, 
  onClose, 
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

  if (!entry) return null;

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead = `${entry.name}. ${entry.scientificName ? entry.scientificName + '.' : ''} ${entry.shortDefinition}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert(`Link for ${entry.name} copied to clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 my-8">
        
        {/* Modal Top Header Bar */}
        <div className="relative bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 p-6 sm:p-8 text-white">
          
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Big Emoji Icon */}
            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-5xl shadow-inner shrink-0">
              {entry.emoji}
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-300">
                  {entry.category}
                </span>
                {entry.priceTier && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-white">
                    Price: {entry.priceTier}
                  </span>
                )}
                <span className="text-xs text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  {entry.peakSeason}
                </span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
                  {entry.name}
                </h2>
                <button
                  onClick={handleSpeak}
                  className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-emerald-300 transition-colors"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {entry.pronunciation && (
                <p className="text-xs font-mono text-emerald-300">
                  Phonetic: /{entry.pronunciation}/
                </p>
              )}

              {entry.scientificName && (
                <p className="text-sm italic font-serif text-slate-300">
                  {entry.scientificName}
                </p>
              )}
            </div>

            {/* Actions: Bookmark & Share */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => onToggleBookmark(entry.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                  isBookmarked
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                <span>{isBookmarked ? 'In Basket' : 'Save to Basket'}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20"
                title="Copy share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[72vh] overflow-y-auto">
          
          {/* Detailed Description */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Overview & Agronomic History
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {entry.detailedDescription || entry.shortDefinition}
            </p>
            {entry.origin && (
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>Geographic Origin: <strong>{entry.origin}</strong></span>
              </p>
            )}
          </div>

          {/* SENSORY RIPENESS GUIDE */}
          {entry.ripenessGuide && (
            <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <h4 className="text-sm font-bold text-emerald-950 font-serif">
                    Sensory Ripeness Masterclass
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  How to Pick the Best
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Look */}
                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <span className="text-emerald-600 font-black">1.</span>
                    <span>Visual Test (Look)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {entry.ripenessGuide.look}
                  </p>
                </div>

                {/* Feel */}
                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <span className="text-emerald-600 font-black">2.</span>
                    <span>Tactile Test (Feel)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {entry.ripenessGuide.feel}
                  </p>
                </div>

                {/* Smell */}
                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <span className="text-emerald-600 font-black">3.</span>
                    <span>Aroma Test (Smell)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {entry.ripenessGuide.smell}
                  </p>
                </div>

              </div>

              {/* Avoid Callout */}
              {entry.ripenessGuide.avoid && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">What to Avoid: </strong>
                    <span>{entry.ripenessGuide.avoid}</span>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* STORAGE & ETHYLENE */}
          {entry.storage && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-slate-700" />
                <h4 className="text-sm font-bold text-slate-900 font-serif">
                  Storage & Shelf-Life Protocol
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Location</span>
                  <span className="font-semibold text-slate-800">{entry.storage.location}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Optimal Temperature</span>
                  <span className="font-semibold text-slate-800">{entry.storage.temp}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Ethylene Sensitivity</span>
                  <span className="font-semibold text-slate-800">{entry.ethyleneSensitivity || 'Standard'}</span>
                </div>
              </div>

              {entry.storage.proTip && (
                <div className="bg-emerald-950 text-white p-4 rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Market Insider Tip</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    {entry.storage.proTip}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* CULINARY PAIRINGS & APPLICATIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Culinary Uses */}
            {entry.culinaryUses && entry.culinaryUses.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-emerald-700" />
                  <h4 className="text-sm font-bold text-slate-900 font-serif">
                    Chef Culinary Applications
                  </h4>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {entry.culinaryUses.map((use, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Flavor Pairings & Substitutes */}
            <div className="space-y-4">
              {entry.pairings && entry.pairings.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Classic Flavor Pairings
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.pairings.map((p, i) => (
                      <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-900 border border-emerald-200">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {entry.substitutes && entry.substitutes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Culinary Substitutes
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.substitutes.map((s, i) => (
                      <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {entry.brixScore && (
                <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 text-xs text-blue-950">
                  <span className="font-bold block text-blue-900 mb-0.5">Brix Sugar Index</span>
                  <span>{entry.brixScore}</span>
                </div>
              )}
            </div>

          </div>

          {/* FUN FACT */}
          {entry.funFact && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100/80 flex items-start gap-3">
              <span className="text-2xl shrink-0">💡</span>
              <div className="space-y-0.5 text-xs text-amber-950">
                <h5 className="font-bold text-amber-900">Did You Know?</h5>
                <p className="leading-relaxed text-amber-900/90">{entry.funFact}</p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>FreshFind Market Dictionary</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>

    </div>
  );
}

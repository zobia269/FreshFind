import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Clock, Utensils, HelpCircle, RefreshCw } from 'lucide-react';
import { RIPENESS_INSPECTOR_ITEMS } from '../data/dictionaryData';

export default function RipenessInspector({ onSelectEntry, entries }) {
  const [selectedItemId, setSelectedItemId] = useState(RIPENESS_INSPECTOR_ITEMS[0].id);
  const [indicatorValues, setIndicatorValues] = useState({
    firmness: 1,
    stemCap: 1,
    skinColor: 1
  });

  const activeItem = RIPENESS_INSPECTOR_ITEMS.find(item => item.id === selectedItemId) || RIPENESS_INSPECTOR_ITEMS[0];
  const result = activeItem.calculateResult(
    indicatorValues.firmness,
    indicatorValues.stemCap,
    indicatorValues.skinColor
  );

  const handleReset = () => {
    setIndicatorValues({ firmness: 1, stemCap: 1, skinColor: 1 });
  };

  const getScoreColorClass = (score) => {
    if (score >= 85) return 'text-emerald-500 from-emerald-500 to-teal-500';
    if (score >= 60) return 'text-lime-500 from-lime-500 to-emerald-500';
    if (score >= 40) return 'text-amber-500 from-amber-500 to-orange-500';
    return 'text-rose-500 from-rose-500 to-red-500';
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Diagnostic Tool
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 font-serif">
          The Freshness & Ripeness Inspector
        </h2>
        <p className="text-sm text-slate-600">
          Simulate sensory indicators (touch, stem scar, fragrance) to diagnose ripeness status, storage instructions, and optimal culinary use.
        </p>
      </div>

      {/* Produce Selector Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        {RIPENESS_INSPECTOR_ITEMS.map(item => {
          const isSelected = item.id === selectedItemId;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedItemId(item.id);
                setIndicatorValues({ firmness: 1, stemCap: 1, skinColor: 1 });
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-400 scale-105'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
              }`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Indicator Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeItem.emoji}</span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  {activeItem.name} Sensory Indicators
                </h3>
                <p className="text-xs text-slate-500">Adjust the 3 parameters based on what you observe</p>
              </div>
            </div>
            
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-700 font-semibold transition-colors"
              title="Reset indicators"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          {/* Indicator 1: Firmness */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">
                1. {activeItem.indicators.firmness.label}
              </span>
              <span className="text-slate-400 text-[11px]">Tactile feel</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeItem.indicators.firmness.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setIndicatorValues({ ...indicatorValues, firmness: idx })}
                  className={`p-3 rounded-xl text-xs text-left transition-all border font-medium ${
                    indicatorValues.firmness === idx
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full border mb-1.5 flex items-center justify-center text-[10px] ${indicatorValues.firmness === idx ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'}">
                    {indicatorValues.firmness === idx ? '✓' : ''}
                  </div>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Indicator 2: Stem Button / Scar */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">
                2. {activeItem.indicators.stemCap.label}
              </span>
              <span className="text-slate-400 text-[11px]">Harvest check</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeItem.indicators.stemCap.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setIndicatorValues({ ...indicatorValues, stemCap: idx })}
                  className={`p-3 rounded-xl text-xs text-left transition-all border font-medium ${
                    indicatorValues.stemCap === idx
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full border mb-1.5 flex items-center justify-center text-[10px] ${indicatorValues.stemCap === idx ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'}">
                    {indicatorValues.stemCap === idx ? '✓' : ''}
                  </div>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Indicator 3: Skin Color / Aroma */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">
                3. {activeItem.indicators.skinColor.label}
              </span>
              <span className="text-slate-400 text-[11px]">Visual & scent</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeItem.indicators.skinColor.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setIndicatorValues({ ...indicatorValues, skinColor: idx })}
                  className={`p-3 rounded-xl text-xs text-left transition-all border font-medium ${
                    indicatorValues.skinColor === idx
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full border mb-1.5 flex items-center justify-center text-[10px] ${indicatorValues.skinColor === idx ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'}">
                    {indicatorValues.skinColor === idx ? '✓' : ''}
                  </div>
                  {opt}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Diagnostic Result Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 space-y-6">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Live Freshness Diagnosis
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-slate-300">
              {activeItem.name}
            </span>
          </div>

          {/* Score Meter */}
          <div className="space-y-2">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Ripeness Index</span>
                <span className={`text-4xl font-black font-serif bg-gradient-to-r ${getScoreColorClass(result.score)} bg-clip-text text-transparent`}>
                  {result.score}%
                </span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300">
                {result.status}
              </span>
            </div>

            {/* Gauge Bar */}
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div 
                className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${getScoreColorClass(result.score)}`}
                style={{ width: `${result.score}%` }}
              />
            </div>
          </div>

          {/* Verdict Box */}
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Sensory Verdict</span>
            </div>
            <p className="text-slate-200 leading-relaxed text-sm">
              {result.verdict}
            </p>
          </div>

          {/* Immediate Action / Culinary Use */}
          <div className="bg-emerald-900/50 rounded-2xl p-4 border border-emerald-600/40 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-teal-300 font-bold">
              <Utensils className="w-4 h-4" />
              <span>Recommended Kitchen Preparation</span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              {result.culinaryUse}
            </p>
          </div>

          {/* Market Insight Footnote */}
          <p className="text-[11px] text-slate-400 italic">
            * Note: Supermarket produce is often chilled in cold ethylene storage rooms; true farmers market finds ripen more rapidly at room temperature.
          </p>

        </div>

      </div>

    </section>
  );
}

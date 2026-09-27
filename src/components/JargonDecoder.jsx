import React, { useState } from 'react';
import { Tag, Sparkles, Scale, BookOpen, Layers, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { BRIX_REFERENCE_DATA } from '../data/dictionaryData';

export default function JargonDecoder({ entries, onSelectEntry }) {
  const [sliderBrix, setSliderBrix] = useState(14);
  const [activeTab, setActiveTab] = useState('brix'); // 'brix', 'heirloom', 'glossary'

  // Determine sweetness tier from sliderBrix
  const currentTier = BRIX_REFERENCE_DATA.find(
    tier => sliderBrix >= tier.brixMin && sliderBrix <= tier.brixMax
  ) || BRIX_REFERENCE_DATA[2];

  // Helper for sample produce at current slider Brix
  const getBrixProduceExamples = (brix) => {
    if (brix <= 6) return 'Cucumber, Lemon juice, Iceberg Lettuce, Pale Tomato';
    if (brix <= 10) return 'Standard Supermarket Watermelon, Early Strawberry, Green Bell Pepper';
    if (brix <= 14) return 'Peak Farmers Market Honeycrisp, Ripe Cantaloupe, Sweet Corn, Meyer Lemon';
    if (brix <= 19) return 'Dry-Farmed Heirloom Peach, Fuyu Persimmon, Sweet Cherries';
    if (brix <= 25) return 'Black Mission Fig, Wine Grapes, Ripe Pawpaw Custard';
    return 'Fruit Sorbet Base, Artisanal Fig Jam, Late Harvest Ice Wine';
  };

  const jargonEntries = entries.filter(e => e.category === 'jargon');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
          <Tag className="w-3.5 h-3.5" />
          Market Decoding Center
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 font-serif">
          Market Jargon & Brix Refractometer
        </h2>
        <p className="text-sm text-slate-600">
          Demystify agricultural certifications, Brix sugar ratings, and open-pollinated heirlooms with interactive diagnostic tools.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('brix')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'brix'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📐 Brix Refractometer Simulator
          </button>
          <button
            onClick={() => setActiveTab('heirloom')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'heirloom'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌾 Heirloom vs Hybrid vs GMO
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'glossary'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏷️ Market Term Glossary
          </button>
        </div>
      </div>

      {/* VIEW 1: BRIX REFRACTOMETER SIMULATOR */}
      {activeTab === 'brix' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Interactive Slider */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Interactive Refractometer Gauge
                </span>
                <h3 className="text-2xl font-bold font-serif text-slate-900">
                  Dial in Brix Degrees (°Bx)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Drag the slider to test produce sugar concentration. 1° Brix equals 1 gram of dissolved sucrose per 100 grams of plant sap.
                </p>
              </div>

              {/* Slider Component */}
              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Reading Level:</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black font-serif text-emerald-700">
                      {sliderBrix}°
                    </span>
                    <span className="text-sm font-bold text-slate-400">Bx</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={sliderBrix}
                  onChange={(e) => setSliderBrix(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                  <span>2° (Watery)</span>
                  <span>10° (Grocery Standard)</span>
                  <span>16° (Peak Heirloom)</span>
                  <span>30° (Syrup/Nectar)</span>
                </div>
              </div>

              {/* Real-world foods at this score */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 space-y-1.5 text-xs">
                <span className="font-bold text-emerald-950 block">
                  Typical Produce at {sliderBrix}° Bx:
                </span>
                <p className="text-emerald-900 font-medium">
                  {getBrixProduceExamples(sliderBrix)}
                </p>
              </div>
            </div>

            {/* Right: Optical Refractometer Blue-Sky Reticle Simulation */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-64 rounded-full border-8 border-slate-800 shadow-2xl bg-gradient-to-b from-sky-400 via-sky-300 to-white overflow-hidden flex flex-col items-center justify-center p-4">
                
                {/* Simulated Refractometer Boundary Horizon */}
                <div 
                  className="absolute inset-x-0 bottom-0 bg-blue-900/80 border-t-2 border-white transition-all duration-300"
                  style={{ height: `${(sliderBrix / 32) * 100}%` }}
                />

                {/* Reticle Tick Lines */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between py-2 text-white font-mono text-[9px] pointer-events-none opacity-90 drop-shadow-md">
                  <div className="border-b border-white/50 w-full text-right pr-2">30°</div>
                  <div className="border-b border-white/50 w-full text-right pr-2">25°</div>
                  <div className="border-b border-white/50 w-full text-right pr-2">20°</div>
                  <div className="border-b border-white/50 w-full text-right pr-2">15°</div>
                  <div className="border-b border-white/50 w-full text-right pr-2">10°</div>
                  <div className="border-b border-white/50 w-full text-right pr-2">5°</div>
                </div>

                {/* Center Badge */}
                <div className="absolute z-20 bg-slate-900/90 text-white px-3 py-1 rounded-full text-xs font-bold border border-white/30 backdrop-blur-md">
                  {sliderBrix}° Bx: {currentTier.level}
                </div>
              </div>

              <span className="text-[11px] text-slate-400 font-mono mt-3">
                Simulated Optical Reticle Viewfinder
              </span>
            </div>

          </div>

          {/* Reference Table */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              The Agricultural Brix Index Reference
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {BRIX_REFERENCE_DATA.map((tier, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-2xl border text-xs space-y-1 transition-all ${
                    sliderBrix >= tier.brixMin && sliderBrix <= tier.brixMax
                      ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{tier.level}</span>
                    <span>{tier.emoji}</span>
                  </div>
                  <span className="font-mono text-emerald-700 font-bold block text-[11px]">
                    {tier.brixMin}° - {tier.brixMax}° Bx
                  </span>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {tier.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: HEIRLOOM VS HYBRID VS GMO */}
      {activeTab === 'heirloom' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Plant Breeding Demystified
            </span>
            <h3 className="text-2xl font-bold font-serif text-slate-900">
              Heirloom vs. Hybrid (F1) vs. GMO
            </h3>
            <p className="text-xs text-slate-500">
              Understand why heirlooms taste richer, why hybrids are uniform, and what actually appears at the farmers market.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="p-3.5 rounded-l-xl">Trait</th>
                  <th className="p-3.5 text-emerald-800 bg-emerald-50/80">🌾 Heirloom Cultivar</th>
                  <th className="p-3.5">🌽 Commercial Hybrid (F1)</th>
                  <th className="p-3.5 rounded-r-xl">🧬 Genetically Engineered (GMO)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Pollination</td>
                  <td className="p-3.5 bg-emerald-50/40 font-semibold text-emerald-900">Open-pollinated by wind, bees, or hand for 50+ years.</td>
                  <td className="p-3.5">Controlled cross-breeding of two specific parent lines.</td>
                  <td className="p-3.5">Laboratory molecular gene splicing across species.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Flavor Profile</td>
                  <td className="p-3.5 bg-emerald-50/40 font-semibold text-emerald-900">Exceptional, complex, sweet, aromatic; bred solely for taste.</td>
                  <td className="p-3.5">Uniform, mild, sometimes diluted due to water retention.</td>
                  <td className="p-3.5">Not bred for flavor (bred for herbicide tolerance/shelf life).</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Seed Viability</td>
                  <td className="p-3.5 bg-emerald-50/40 font-semibold text-emerald-900">True-to-type. You can save seeds and grow identical plants.</td>
                  <td className="p-3.5">Seeds do not come true; segregates into random traits.</td>
                  <td className="p-3.5">Patented proprietary germplasm. Seed saving is illegal.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Shelf Life</td>
                  <td className="p-3.5 bg-emerald-50/40 font-semibold text-emerald-900">Delicate, thin skins (2-4 days). Eat promptly.</td>
                  <td className="p-3.5">Thick cellular walls, durable for cross-country trucking.</td>
                  <td className="p-3.5">Engineered to retard pectin breakdown for long transit.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Presence at Market</td>
                  <td className="p-3.5 bg-emerald-50/40 font-semibold text-emerald-900">Star attraction at boutique farmers markets.</td>
                  <td className="p-3.5">Common in commercial farm stalls and supermarkets.</td>
                  <td className="p-3.5">Essentially non-existent in fresh market produce (mostly soy/corn feed).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: MARKET JARGON GLOSSARY CARDS */}
      {activeTab === 'glossary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jargonEntries.map(entry => (
            <div
              key={entry.id}
              onClick={() => onSelectEntry(entry)}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{entry.emoji}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    Market Jargon
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {entry.name}
                  </h3>
                  {entry.scientificName && (
                    <p className="text-xs text-slate-400 italic">
                      {entry.scientificName}
                    </p>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {entry.shortDefinition}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
                <span>View Full Definition & Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}

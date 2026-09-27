import React from 'react';
import { Heart, Sparkles, BookOpen, ShieldCheck, ShoppingBasket } from 'lucide-react';
import logoImg from '../assets/imagelogo.avif';


export default function Footer({ onOpenDictionary, onOpenInspector, onOpenQuiz }) {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 5 Golden Rules of Market Shopping */}
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-emerald-900/40 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-xs">
            <Sparkles className="w-4 h-4" />
            <span>The FreshFind Shopping Philosophy</span>
          </div>

          <h3 className="text-xl font-bold font-serif text-white">
            5 Golden Rules of Farmers Market Shopping
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-white/5 space-y-1">
              <strong className="text-emerald-400 block font-bold">1. Arrive Early or Late</strong>
              <p className="text-slate-400 leading-relaxed">
                Early birds secure rare limited finds (ramps, morels). Late shoppers snag great bulk deals on ripe canning seconds.
              </p>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-white/5 space-y-1">
              <strong className="text-emerald-400 block font-bold">2. Talk to Your Grower</strong>
              <p className="text-slate-400 leading-relaxed">
                Ask: <em>"What variety is this?"</em> and <em>"When was it harvested?"</em> Growers love sharing field stories and cooking advice.
              </p>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-white/5 space-y-1">
              <strong className="text-emerald-400 block font-bold">3. Embrace Ugly Produce</strong>
              <p className="text-slate-400 leading-relaxed">
                Catfacing and scarring on heirlooms are marks of natural pollination and high sun sugar, not degradation.
              </p>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-white/5 space-y-1">
              <strong className="text-emerald-400 block font-bold">4. Trust Your Nose</strong>
              <p className="text-slate-400 leading-relaxed">
                If a melon, peach, or tomato doesn't smell aromatic at the stem, it lacks volatile aromatic sweetness.
              </p>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-white/5 space-y-1">
              <strong className="text-emerald-400 block font-bold">5. Prep Upon Arrival</strong>
              <p className="text-slate-400 leading-relaxed">
                Trim root tops immediately to stop them drawing moisture. Store climacteric fruit on the counter to finish ripening.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation & Brand */}
        
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-slate-900 pt-8">
          
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-2">
              <div className="https://img.magnific.com/premium-vector/cute-man-farmer-modern-logo-organic-fruit-vegetable-shop_71208-1128.jpg?semt=ais_hybrid&w=740&q=80">
                
                
              </div>
              <img 
 
  src={logoImg} 
  alt="FreshFind Logo" 
  className="w-10 h-10 rounded-full object-cover border border-emerald-500/30" 
/>
 
              <span className="text-lg font-bold text-white font-serif">
                Fresh<span className="text-emerald-500">Find</span> Market Dictionary
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              An open-source interactive encyclopedia celebrating agricultural biodiversity, heirloom preservation, and farm-to-table culinary knowledge.
            </p>
          </div>

          <div className="md:col-span-7 flex flex-wrap items-center justify-start md:justify-end gap-6 text-xs text-slate-400">
            <button onClick={onOpenDictionary} className="hover:text-emerald-400 transition-colors">
              Directory Catalog
            </button>
            <button onClick={onOpenInspector} className="hover:text-emerald-400 transition-colors">
              Ripeness Calculator
            </button>
            <button onClick={onOpenQuiz} className="hover:text-emerald-400 transition-colors">
              Market Master Quiz
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">
              Handcrafted for foodies & local market explorers
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}

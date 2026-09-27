import React from 'react';
import { Heart, ShieldCheck, Sparkles, Store, BookOpen, Calendar } from 'lucide-react';

const PILLARS = [
  {
    icon: Sparkles,
    accent: 'text-emerald-400',
    title: '100% Client-Side',
    body: 'Instant offline search with zero server lag or latency.',
  },
  {
    icon: Store,
    accent: 'text-teal-400',
    title: 'Direct Farm-Gate',
    body: 'Supporting independent growers and small regenerative family farms.',
  },
  {
    icon: ShieldCheck,
    accent: 'text-lime-400',
    title: 'Sensory Science',
    body: 'Empowering shoppers to identify truly ripe, peak-flavor produce.',
  },
];

const COVERAGE = [
  {
    icon: Store,
    title: 'Regional Market Directory',
    body: 'Verified stall counts, canopy details and live operating timetables for every certified market in the region.',
  },
  {
    icon: BookOpen,
    title: 'Produce Encyclopedia',
    body: 'Heirloom varieties, catfacing, peak-season windows and farm-to-table usage notes for fruits and vegetables.',
  },
  {
    icon: Calendar,
    title: 'Visit Planner',
    body: 'Build a resident itinerary around arrival time, transport mode and the rare seasonal items you are hunting for.',
  },
];

export default function AboutSection() {
  return (
    <section id="about-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 scroll-mt-20">

      {/* About Us Mission Block */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Our Mission & Purpose</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif leading-tight">
            About <span className="text-emerald-400">FreshFind</span>: Connecting Residents with Regional Growers
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            For urban and suburban residents, finding out <em>where</em> local markets operate, <em>which days</em> they are open, and <em>what seasonal crops</em> are available at any given hour used to be frustratingly disorganized.
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            <strong>FreshFind</strong> solves this by aggregating regional farmers markets, live operating timetables, seasonal ripeness science, and sensory selection guides onto a single, lightning-fast web platform.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-emerald-900/60 text-xs">
            {PILLARS.map(({ icon: Icon, accent, title, body }) => (
              <div key={title} className="space-y-1">
                <span className={`font-bold block text-sm flex items-center gap-1.5 ${accent}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {title}
                </span>
                <p className="text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What FreshFind Covers */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold font-serif text-slate-900">
            What <span className="text-emerald-600">FreshFind</span> Covers
          </h3>
          <p className="text-xs text-slate-500 max-w-2xl">
            Every screen in this app exists to answer one of three questions a shopper asks before leaving the house.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COVERAGE.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="font-bold font-serif text-slate-900 text-sm">{title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

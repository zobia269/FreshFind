import React from 'react';
import { Eye, MousePointerClick, CalendarCheck } from 'lucide-react';
import useVisitorCounter from '../hooks/useVisitorCounter';

const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;

/**
 * Visit activity card for the top-right of the home page hero.
 *
 * These numbers come from this browser's localStorage, so they describe this
 * device only. The caption says so, because a local count presented as a site
 * total would be misleading.
 */
export default function VisitorCounter() {
  const { todayVisits, totalVisits, activeDays } = useVisitorCounter();

  return (
    <div
      title="Counts the visits recorded by this browser. A site-wide total would need an analytics service or a backend."
      className="bg-slate-900/90 rounded-3xl px-4 py-3.5 border border-emerald-800/50 shadow-xl backdrop-blur-xl flex items-center gap-3.5"
    >
      <div className="relative w-11 h-11 rounded-2xl bg-emerald-500/15 text-emerald-300 flex items-center justify-center shrink-0">
        <Eye className="w-5 h-5" />
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-lime-400 animate-ping" />
      </div>

      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-white font-serif leading-none">
            {todayVisits}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
            {todayVisits === 1 ? 'visit today' : 'visits today'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <MousePointerClick className="w-3 h-3 text-emerald-400" />
            {plural(totalVisits, 'total visit')}
          </span>
          <span className="flex items-center gap-1">
            <CalendarCheck className="w-3 h-3 text-emerald-400" />
            {plural(activeDays, 'active day')}
          </span>
          <span className="text-slate-500">on this device</span>
        </div>
      </div>
    </div>
  );
}
